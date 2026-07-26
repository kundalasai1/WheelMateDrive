import type {Model as MongooseModel, InferSchemaType as MongooseInferSchemaType} from "mongoose";
import {Schema,model,models} from "mongoose";
const schema=new Schema({type:{type:String,enum:["customer_driver","customer_support","admin_driver"],required:true,index:true},bookingId:{type:Schema.Types.ObjectId,ref:"Booking",index:true},participants:[{type:Schema.Types.ObjectId,ref:"User",required:true}],lastMessageAt:{type:Date,default:Date.now,index:true},closedAt:Date},{timestamps:true});
schema.index({participants:1,lastMessageAt:-1});export const ConversationModel=(models.Conversation??model("Conversation",schema)) as MongooseModel<MongooseInferSchemaType<typeof schema>>;
