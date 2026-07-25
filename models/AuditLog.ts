import {Schema,model,models} from "mongoose";
const schema=new Schema({actorId:{type:Schema.Types.ObjectId,ref:"User",index:true},role:String,action:{type:String,required:true,index:true},resource:{type:String,required:true},resourceId:String,ip:String,userAgent:String,metadata:{type:Schema.Types.Mixed,default:{}}},{timestamps:true});
schema.index({createdAt:-1});
export const AuditLogModel=models.AuditLog??model("AuditLog",schema);
