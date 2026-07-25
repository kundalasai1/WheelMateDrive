import {requireUser} from "@/lib/auth/session";
import {connectDB} from "@/lib/db/mongoose";
import {BookingModel} from "@/models/Booking";
import {BookingActions} from "@/components/driver/booking-actions";

export default async function Page() {
  const user = await requireUser(["driver"]);
  await connectDB();
  const rows = await BookingModel.find({driverId: user.id}).sort({scheduledAt: 1}).lean();
  return <main className="container section"><div className="portal-head"><div><p className="eyebrow">DRIVER WORKSPACE</p><h1>My trips</h1><p className="muted">Accept assignments and update each trip as it progresses.</p></div><a className="btn btn-secondary" href="/driver/dashboard">Dashboard</a></div><div className="trip-grid">{rows.map(booking => <article className="card trip-card" key={String(booking._id)}><div className="trip-card-head"><div><span className="eyebrow">{booking.bookingNumber}</span><h2>{booking.pickup.address}</h2></div><span className={`status-pill status-${booking.status}`}>{booking.status.replaceAll("_", " ")}</span></div><div className="trip-route"><span className="route-dot"/><div><small>Destination</small><strong>{booking.destination.address}</strong></div></div><div className="trip-meta"><span><small>Scheduled</small>{new Date(booking.scheduledAt).toLocaleString("en-IN")}</span><span><small>Vehicle</small>{booking.vehicleType} · {booking.transmissionType}</span><span><small>Fare</small>₹{booking.fare.total.toLocaleString("en-IN")}</span></div><BookingActions bookingId={String(booking._id)} status={booking.status}/></article>)}{!rows.length && <div className="card empty-state"><h2>No assignments yet</h2><p className="muted">Go online from your dashboard to become eligible for new trips.</p></div>}</div></main>;
}
