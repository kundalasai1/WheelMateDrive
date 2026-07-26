import type {Model as MongooseModel, InferSchemaType as MongooseInferSchemaType} from "mongoose";
import {Schema,model,models} from "mongoose";
const schema=new Schema({customerId:{type:Schema.Types.ObjectId,ref:"User",required:true,index:true},name:{type:String,required:true,trim:true,maxlength:80},pickup:{type:String,required:true,maxlength:300},destination:{type:String,required:true,maxlength:300},tripType:{type:String,default:"local"},vehicleType:{type:String,default:"sedan"}},{timestamps:true});
schema.index({customerId:1,createdAt:-1});export const FavouriteModel=(models.Favourite??model("Favourite",schema)) as MongooseModel<MongooseInferSchemaType<typeof schema>>;
