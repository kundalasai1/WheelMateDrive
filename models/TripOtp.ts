import {Schema,model,models} from "mongoose";
const schema=new Schema({bookingId:{type:Schema.Types.ObjectId,ref:"Booking",required:true,index:true},otpHash:{type:String,required:true},expiresAt:{type:Date,required:true,index:{expireAfterSeconds:0}},verifiedAt:Date,attempts:{type:Number,default:0},maxAttempts:{type:Number,default:5}},{timestamps:true});
export const TripOtpModel=models.TripOtp??model("TripOtp",schema);
