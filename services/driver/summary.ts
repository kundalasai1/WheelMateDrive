import {connectDB} from "@/lib/db/mongoose";
import {BookingModel} from "@/models/Booking";
import {DriverProfileModel} from "@/models/DriverProfile";

export async function getDriverSummary(userId:string){
  await connectDB();
  const [profile,active,completed,earningsAgg]=await Promise.all([
    DriverProfileModel.findOne({userId}).lean(),
    BookingModel.countDocuments({driverId:userId,status:{$in:["assigned","driver_enroute","driver_arrived","in_progress"]}}),
    BookingModel.countDocuments({driverId:userId,status:"completed"}),
    BookingModel.aggregate([{$match:{driverId:new (await import("mongoose")).Types.ObjectId(userId),status:"completed"}},{$group:{_id:null,total:{$sum:"$fare.total"}}}])
  ]);
  return {profile,active,completed,earnings:Number(earningsAgg[0]?.total??0)};
}
