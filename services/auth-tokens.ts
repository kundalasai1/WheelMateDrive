import {connectDB} from "@/lib/db/mongoose";
import {AuthTokenModel} from "@/models/AuthToken";
import {createOpaqueToken,hashToken} from "@/lib/auth/token";
export async function issueAuthToken(userId:string,purpose:"verify_email"|"reset_password",minutes:number){await connectDB();await AuthTokenModel.deleteMany({userId,purpose,usedAt:{$exists:false}});const token=createOpaqueToken();await AuthTokenModel.create({userId,purpose,tokenHash:hashToken(token),expiresAt:new Date(Date.now()+minutes*60000)});return token}
export async function consumeAuthToken(token:string,purpose:"verify_email"|"reset_password"){await connectDB();return AuthTokenModel.findOneAndUpdate({tokenHash:hashToken(token),purpose,usedAt:{$exists:false},expiresAt:{$gt:new Date()}},{$set:{usedAt:new Date()}},{new:true})}
