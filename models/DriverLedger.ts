import type {Model as MongooseModel, InferSchemaType as MongooseInferSchemaType} from "mongoose";
import {Schema,model,models} from "mongoose";
const schema=new Schema({driverId:{type:Schema.Types.ObjectId,ref:"User",required:true,index:true},bookingId:{type:Schema.Types.ObjectId,ref:"Booking",index:true},kind:{type:String,enum:["trip","incentive","bonus","penalty","withdrawal"],required:true,index:true},amount:{type:Number,required:true},description:{type:String,required:true},status:{type:String,enum:["pending","approved","paid","rejected"],default:"approved",index:true},reference:String},{timestamps:true});
schema.index({driverId:1,createdAt:-1});export const DriverLedgerModel=(models.DriverLedger??model("DriverLedger",schema)) as MongooseModel<MongooseInferSchemaType<typeof schema>>;
