import {Schema,model,models} from "mongoose";
const schema=new Schema({userId:{type:Schema.Types.ObjectId,ref:"User",required:true,index:true},ip:String,userAgent:String,success:{type:Boolean,default:true},reason:String},{timestamps:true});schema.index({userId:1,createdAt:-1});export const LoginEventModel=models.LoginEvent??model("LoginEvent",schema);
