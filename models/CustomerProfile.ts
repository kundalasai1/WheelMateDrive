import type {Model as MongooseModel, InferSchemaType as MongooseInferSchemaType} from "mongoose";
import {Schema,model,models,type InferSchemaType} from "mongoose";
const schema=new Schema({userId:{type:Schema.Types.ObjectId,ref:"User",required:true,unique:true,index:true},fullName:{type:String,required:true,trim:true},address:String,emergencyContact:String,preferredLanguage:{type:String,default:"English"},emailNotifications:{type:Boolean,default:true},pushNotifications:{type:Boolean,default:true},marketingMessages:{type:Boolean,default:false}},{timestamps:true});
export type CustomerProfile=InferSchemaType<typeof schema>;export const CustomerProfileModel=(models.CustomerProfile??model("CustomerProfile",schema)) as MongooseModel<MongooseInferSchemaType<typeof schema>>;
