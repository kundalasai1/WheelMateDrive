import type {Model as MongooseModel, InferSchemaType as MongooseInferSchemaType} from "mongoose";
import {Schema,model,models} from "mongoose";
const schema=new Schema({customerId:{type:Schema.Types.ObjectId,ref:"User",required:true,index:true},label:{type:String,required:true,trim:true,maxlength:40},address:{type:String,required:true,trim:true,maxlength:300},lat:Number,lng:Number,isDefault:{type:Boolean,default:false}},{timestamps:true});
schema.index({customerId:1,label:1},{unique:true});export const CustomerAddressModel=(models.CustomerAddress??model("CustomerAddress",schema)) as MongooseModel<MongooseInferSchemaType<typeof schema>>;
