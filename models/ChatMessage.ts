import type {Model as MongooseModel, InferSchemaType as MongooseInferSchemaType} from "mongoose";
import {Schema,model,models} from "mongoose";
const schema=new Schema({conversationId:{type:Schema.Types.ObjectId,ref:"Conversation",required:true,index:true},senderId:{type:Schema.Types.ObjectId,ref:"User",required:true},text:{type:String,maxlength:2000},imageUrl:String,emoji:String,readBy:[{userId:{type:Schema.Types.ObjectId,ref:"User"},readAt:{type:Date,default:Date.now}}]},{timestamps:true});
schema.index({conversationId:1,createdAt:1});export const ChatMessageModel=(models.ChatMessage??model("ChatMessage",schema)) as MongooseModel<MongooseInferSchemaType<typeof schema>>;
