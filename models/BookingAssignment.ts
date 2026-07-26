import type {Model as MongooseModel, InferSchemaType as MongooseInferSchemaType} from "mongoose";
import {Schema,model,models} from "mongoose";
const schema=new Schema({bookingId:{type:Schema.Types.ObjectId,ref:"Booking",required:true,index:true},driverId:{type:Schema.Types.ObjectId,ref:"User",required:true,index:true},assignedBy:{type:Schema.Types.ObjectId,ref:"User",required:true},status:{type:String,enum:["pending","accepted","rejected","cancelled"],default:"pending",index:true},rejectionReason:{type:String,maxlength:300},respondedAt:Date},{timestamps:true});
schema.index({bookingId:1,driverId:1},{unique:true});
export const BookingAssignmentModel=(models.BookingAssignment??model("BookingAssignment",schema)) as MongooseModel<MongooseInferSchemaType<typeof schema>>;
