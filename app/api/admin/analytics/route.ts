import {NextResponse} from "next/server";
import {getCurrentUser} from "@/lib/auth/session";
import {connectDB} from "@/lib/db/mongoose";
import {BookingModel} from "@/models/Booking";
import {PaymentModel} from "@/models/Payment";
import {UserModel} from "@/models/User";
export async function GET(){const user=await getCurrentUser();if(!user||!["admin","operations"].includes(user.role))return NextResponse.json({error:"Forbidden"},{status:403});await connectDB();const [bookings,completed,activeDrivers,customers,revenueAgg,statuses]=await Promise.all([BookingModel.countDocuments(),BookingModel.countDocuments({status:"trip_completed"}),UserModel.countDocuments({role:"driver",status:"active"}),UserModel.countDocuments({role:"customer",status:"active"}),PaymentModel.aggregate([{$match:{status:"captured"}},{$group:{_id:null,total:{$sum:"$amount"}}}]),BookingModel.aggregate([{$group:{_id:"$status",count:{$sum:1}}},{$sort:{count:-1}}])]);return NextResponse.json({bookings,completed,activeDrivers,customers,revenue:revenueAgg[0]?.total??0,statuses});}
