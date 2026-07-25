import {Schema,model,models,type InferSchemaType} from "mongoose";
const schema=new Schema({userId:{type:Schema.Types.ObjectId,ref:"User",required:true,index:true},tokenHash:{type:String,required:true,unique:true,index:true},expiresAt:{type:Date,required:true},lastSeenAt:{type:Date,default:Date.now},ip:String,userAgent:String,revokedAt:Date},{timestamps:true});
schema.index({expiresAt:1},{expireAfterSeconds:0});
export type Session=InferSchemaType<typeof schema>;
export const SessionModel=models.Session??model("Session",schema);
