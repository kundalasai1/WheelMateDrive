import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {connectDB} from "@/lib/db/mongoose";
import {SESSION_COOKIE,SESSION_TTL_DAYS,type UserRole} from "./constants";
import {createOpaqueToken,hashToken} from "./token";
import {SessionModel} from "@/models/Session";
import {UserModel} from "@/models/User";
import {DEMO_ADMIN_COOKIE,DEMO_ADMIN_EMAIL,verifyDemoAdminToken} from "./demo-admin";

export async function createSession(userId:string,meta:{ip?:string;userAgent?:string}){await connectDB();const token=createOpaqueToken();const expiresAt=new Date(Date.now()+SESSION_TTL_DAYS*86400000);await SessionModel.create({userId,tokenHash:hashToken(token),expiresAt,...meta});const store=await cookies();store.set(SESSION_COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",expires:expiresAt});}

export async function destroySession(){
  const store=await cookies();
  const demoToken=store.get(DEMO_ADMIN_COOKIE)?.value;
  if(demoToken) store.delete(DEMO_ADMIN_COOKIE);
  const token=store.get(SESSION_COOKIE)?.value;
  if(token){
    try{await connectDB();await SessionModel.updateOne({tokenHash:hashToken(token),revokedAt:{$exists:false}},{$set:{revokedAt:new Date()}})}catch(error){console.warn("Unable to revoke database session",error)}
  }
  store.delete(SESSION_COOKIE);
}

export async function getCurrentUser(){
  const store=await cookies();
  const demoToken=store.get(DEMO_ADMIN_COOKIE)?.value;
  if(verifyDemoAdminToken(demoToken)){
    return {id:"demo-admin",email:DEMO_ADMIN_EMAIL,phone:"",role:"admin" as UserRole,emailVerified:true,isDemo:true};
  }
  const token=store.get(SESSION_COOKIE)?.value;
  if(!token)return null;
  await connectDB();
  const session=await SessionModel.findOne({tokenHash:hashToken(token),revokedAt:{$exists:false},expiresAt:{$gt:new Date()}}).lean();
  if(!session)return null;
  const user=await UserModel.findById(session.userId).lean();
  if(!user||user.status!=="active")return null;
  return {id:String(user._id),email:user.email,phone:user.phone,role:user.role as UserRole,emailVerified:!!user.emailVerifiedAt,isDemo:false};
}

export async function requireUser(roles?:UserRole[]):Promise<NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>>{const user=await getCurrentUser();if(!user){redirect("/login");throw new Error("UNREACHABLE")}if(roles&&!roles.includes(user.role)){redirect("/unauthorised");throw new Error("UNREACHABLE")}return user;}
