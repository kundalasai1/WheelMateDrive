import { Schema, model, models, type InferSchemaType } from "mongoose";
const userSchema=new Schema({email:{type:String,required:true,unique:true,lowercase:true,trim:true,index:true},phone:{type:String,trim:true,index:true},passwordHash:{type:String,required:true,select:false},role:{type:String,enum:["customer","driver","admin","support","operations"],required:true,index:true},emailVerifiedAt:{type:Date},status:{type:String,enum:["active","blocked","suspended"],default:"active",index:true}},{timestamps:true});
export type User=InferSchemaType<typeof userSchema>;
export const UserModel=models.User ?? model("User",userSchema);
