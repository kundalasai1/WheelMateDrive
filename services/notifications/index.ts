import {NotificationModel} from "@/models/Notification";

export async function createNotification(input:{userId:string;title:string;message:string;type?:string;link?:string}){
  return NotificationModel.create({...input,type:input.type??"system"});
}
