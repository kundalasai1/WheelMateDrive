import {connectDB} from "@/lib/db/mongoose";
import {BookingModel} from "@/models/Booking";
import {BookingAssignmentModel} from "@/models/BookingAssignment";
import {BookingEventModel} from "@/models/BookingEvent";
import {DriverProfileModel} from "@/models/DriverProfile";
import {NotificationModel} from "@/models/Notification";
import {rankDispatchCandidates} from "./scoring";

export async function autoDispatchBooking(bookingId: string, actorId: string, actorRole: string) {
  await connectDB();
  const booking = await BookingModel.findById(bookingId);
  if (!booking) throw new Error("Booking not found");
  if (!["pending", "searching_driver"].includes(booking.status)) {
    throw new Error(`Booking cannot be dispatched from ${booking.status}`);
  }

  const profiles = await DriverProfileModel.find({
    isAvailable: true,
    kycStatus: "approved",
    city: {$regex: `^${escapeRegex(booking.city)}$`, $options: "i"},
  }).lean();

  const previous = await BookingAssignmentModel.find({bookingId, status: {$in: ["rejected", "cancelled"]}})
    .select("driverId")
    .lean();
  const excluded = new Set(previous.map(item => String(item.driverId)));

  const ranked = rankDispatchCandidates(
    profiles
      .filter(profile => !excluded.has(String(profile.userId)))
      .map(profile => ({
        id: String(profile.userId),
        city: profile.city ?? undefined,
        averageRating: profile.averageRating,
        completedTrips: profile.completedTrips,
        transmissionExperience: profile.transmissionExperience,
        isAvailable: profile.isAvailable,
        kycStatus: profile.kycStatus,
      })),
    {city: booking.city, transmissionType: booking.transmissionType},
  );

  const winner = ranked[0];
  if (!winner) {
    const fromStatus = booking.status;
    booking.status = "searching_driver";
    await booking.save();
    await BookingEventModel.create({
      bookingId,
      type: "dispatch_no_match",
      fromStatus,
      toStatus: "searching_driver",
      actorId,
      actorRole,
      message: "No eligible driver was available in the booking city",
    });
    return {matched: false, candidates: 0};
  }

  const fromStatus = booking.status;
  booking.set("driverId", winner.id);
  booking.status = "driver_assigned";
  await booking.save();

  await BookingAssignmentModel.findOneAndUpdate(
    {bookingId, driverId: winner.id},
    {$set: {assignedBy: actorId, status: "pending", respondedAt: null}},
    {upsert: true, new: true},
  );

  await BookingEventModel.create({
    bookingId,
    type: "auto_dispatch_assigned",
    fromStatus,
    toStatus: "driver_assigned",
    actorId,
    actorRole,
    message: `Automatically matched driver with dispatch score ${winner.score}`,
    metadata: {score: winner.score, reasons: winner.reasons, candidateCount: ranked.length},
  });

  await NotificationModel.create({
    userId: winner.id,
    type: "new_assignment",
    title: "New trip assignment",
    message: `${booking.bookingNumber}: ${booking.pickup.address} to ${booking.destination.address}`,
    link: `/driver/bookings`,
  });

  return {matched: true, driverId: winner.id, score: winner.score, reasons: winner.reasons, candidates: ranked.length};
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
