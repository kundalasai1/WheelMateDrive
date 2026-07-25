import {Schema,model,models} from "mongoose";
const schema=new Schema({userId:{type:Schema.Types.ObjectId,ref:"User",required:true,index:true},title:{type:String,required:true,maxlength:120},message:{type:String,required:true,maxlength:500},type:{type:String,default:"info"},link:String,readAt:Date},{timestamps:true});
schema.index({userId:1,readAt:1,createdAt:-1});export const NotificationModel=models.Notification??model("Notification",schema);
