import {Schema,model,models} from "mongoose";
const schema=new Schema({name:{type:String,required:true,unique:true,index:true},permissions:{type:[String],default:[]},description:String},{timestamps:true});
export const RoleModel=models.Role??model("Role",schema);
