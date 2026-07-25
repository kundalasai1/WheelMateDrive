import {Schema,model,models} from "mongoose";
const schema=new Schema({userId:{type:Schema.Types.ObjectId,ref:"User",required:true,index:true},purpose:{type:String,enum:["verify_email","reset_password"],required:true,index:true},tokenHash:{type:String,required:true,unique:true,index:true},expiresAt:{type:Date,required:true},usedAt:Date},{timestamps:true});
schema.index({expiresAt:1},{expireAfterSeconds:0});
export const AuthTokenModel=models.AuthToken??model("AuthToken",schema);
