import {NextResponse} from "next/server";
import {z} from "zod";
import {getCurrentUser} from "@/lib/auth/session";
import {connectDB} from "@/lib/db/mongoose";
import {BookingModel} from "@/models/Booking";
import {PaymentModel} from "@/models/Payment";
import {createRazorpayOrder} from "@/services/payment/razorpay";

const schema=z.object({bookingId:z.string().min(1)});
export async function POST(req:Request){
  const user=await getCurrentUser();
  if(!user||user.role!=="customer")return NextResponse.json({error:"Customer authentication required"},{status:401});
  try{
    const {bookingId}=schema.parse(await req.json());
    await connectDB();
    const booking=await BookingModel.findOne({_id:bookingId,customerId:user.id});
    if(!booking)return NextResponse.json({error:"Booking not found"},{status:404});
    if(booking.paymentStatus==="paid")return NextResponse.json({error:"Booking is already paid"},{status:409});
    const amountPaise=Math.round(Number(booking.fare.total)*100);
    const order=await createRazorpayOrder({amountPaise,receipt:booking.bookingNumber,notes:{bookingId:String(booking._id),customerId:user.id}});
    await PaymentModel.findOneAndUpdate({bookingId:booking._id,customerId:user.id},{$set:{amount:booking.fare.total,currency:"INR",method:"upi",status:"initiated",provider:"razorpay",providerOrderId:order.id,providerReference:order.id}},{upsert:true,new:true});
    return NextResponse.json({order,keyId:process.env.RAZORPAY_KEY_ID,bookingNumber:booking.bookingNumber});
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Unable to create payment order"},{status:400});}
}
