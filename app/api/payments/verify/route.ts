import {NextResponse} from "next/server";
import {z} from "zod";
import {getCurrentUser} from "@/lib/auth/session";
import {connectDB} from "@/lib/db/mongoose";
import {PaymentModel} from "@/models/Payment";
import {BookingModel} from "@/models/Booking";
import {verifyPaymentSignature} from "@/services/payment/razorpay";
import {createNotification} from "@/services/notifications";
const schema=z.object({razorpay_order_id:z.string(),razorpay_payment_id:z.string(),razorpay_signature:z.string()});
export async function POST(req:Request){const user=await getCurrentUser();if(!user||user.role!=="customer")return NextResponse.json({error:"Unauthorised"},{status:401});try{const data=schema.parse(await req.json());if(!verifyPaymentSignature(data.razorpay_order_id,data.razorpay_payment_id,data.razorpay_signature))return NextResponse.json({error:"Invalid payment signature"},{status:400});await connectDB();const payment=await PaymentModel.findOneAndUpdate({providerOrderId:data.razorpay_order_id,customerId:user.id},{$set:{providerPaymentId:data.razorpay_payment_id,providerSignature:data.razorpay_signature,status:"captured",paidAt:new Date()}},{new:true});if(!payment)return NextResponse.json({error:"Payment record not found"},{status:404});await BookingModel.updateOne({_id:payment.bookingId},{$set:{paymentStatus:"paid"}});await createNotification({userId:user.id,title:"Payment successful",message:`Payment of ₹${payment.amount} was received.`,type:"payment",link:`/customer/bookings/${payment.bookingId}`});return NextResponse.json({ok:true});}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Verification failed"},{status:400});}}
