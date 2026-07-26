import type {Model as MongooseModel, InferSchemaType as MongooseInferSchemaType} from "mongoose";
import {Schema,model,models} from "mongoose";
const schema=new Schema({bookingId:{type:Schema.Types.ObjectId,ref:"Booking",required:true,index:true},driverId:{type:Schema.Types.ObjectId,ref:"User",required:true,index:true},lat:{type:Number,required:true},lng:{type:Number,required:true},accuracy:Number,heading:Number,speed:Number,recordedAt:{type:Date,default:Date.now,index:true}},{timestamps:true});
schema.index({bookingId:1,recordedAt:-1});
export const TripLocationModel=(models.TripLocation??model("TripLocation",schema)) as MongooseModel<MongooseInferSchemaType<typeof schema>>;
