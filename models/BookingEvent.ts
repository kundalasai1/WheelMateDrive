import type {Model as MongooseModel, InferSchemaType as MongooseInferSchemaType} from "mongoose";
import {Schema,model,models} from "mongoose";
const schema=new Schema({bookingId:{type:Schema.Types.ObjectId,ref:"Booking",required:true,index:true},type:{type:String,required:true,index:true},fromStatus:String,toStatus:String,actorId:{type:Schema.Types.ObjectId,ref:"User"},actorRole:String,message:{type:String,maxlength:500},metadata:{type:Schema.Types.Mixed}},{timestamps:true});
schema.index({bookingId:1,createdAt:1});
export const BookingEventModel=(models.BookingEvent??model("BookingEvent",schema)) as MongooseModel<MongooseInferSchemaType<typeof schema>>;
