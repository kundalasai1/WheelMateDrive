import {connectDB} from "@/lib/db/mongoose";
import {AuditLogModel} from "@/models/AuditLog";
export async function audit(input:{actorId?:string;role?:string;action:string;resource:string;resourceId?:string;ip?:string;userAgent?:string;metadata?:Record<string,unknown>}){await connectDB();await AuditLogModel.create(input)}
