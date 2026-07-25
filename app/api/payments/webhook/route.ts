import {NextResponse} from "next/server";
import {connectDB} from "@/lib/db/mongoose";
import {PaymentModel} from "@/models/Payment";
import {BookingModel} from "@/models/Booking";
import {verifyWebhookSignature} from "@/services/payment/razorpay";
export async function POST(req:Request){const raw=await req.text();const signature=req.headers.get("x-razorpay-signature")??"";try{if(!verifyWebhookSignature(raw,signature))return NextResponse.json({error:"Invalid signature"},{status:400});const event=JSON.parse(raw);await connectDB();const entity=event?.payload?.payment?.entity;if(entity?.order_id){const status=event.event==="payment.captured"?"captured":event.event==="payment.failed"?"failed":undefined;if(status){const p=await PaymentModel.findOneAndUpdate({providerOrderId:entity.order_id},{$set:{status,providerPaymentId:entity.id,paidAt:status==="captured"?new Date():undefined}},{new:true});if(p&&status==="captured")await BookingModel.updateOne({_id:p.bookingId},{$set:{paymentStatus:"paid"}});}}return NextResponse.json({ok:true});}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Webhook failed"},{status:400});}}
