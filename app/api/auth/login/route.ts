import {NextRequest,NextResponse} from "next/server";
import {connectDB} from "@/lib/db/mongoose";
import {loginSchema} from "@/lib/validation/auth";
import {verifyPassword} from "@/lib/security/password";
import {UserModel} from "@/models/User";
import {createSession} from "@/lib/auth/session";
import {assertSameOrigin,getClientIp} from "@/lib/http/request";
import {audit} from "@/services/audit";
import {createDemoAdminToken,DEMO_ADMIN_COOKIE,DEMO_ADMIN_EMAIL,DEMO_ADMIN_PASSWORD,isDemoAdminEnabled} from "@/lib/auth/demo-admin";

export async function POST(req:NextRequest){
  try{
    assertSameOrigin(req);
    const parsed=loginSchema.safeParse(await req.json());
    if(!parsed.success)return NextResponse.json({error:"Enter a valid email and password"},{status:400});

    if(isDemoAdminEnabled()&&parsed.data.email===DEMO_ADMIN_EMAIL.toLowerCase()&&parsed.data.password===DEMO_ADMIN_PASSWORD){
      const response=NextResponse.json({ok:true,role:"admin",demo:true});
      response.cookies.set(DEMO_ADMIN_COOKIE,createDemoAdminToken(),{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"lax",
        path:"/",
        maxAge:60*60*8,
      });
      return response;
    }

    await connectDB();
    const user=await UserModel.findOne({email:parsed.data.email}).select("+passwordHash");
    const valid=user&&await verifyPassword(parsed.data.password,user.passwordHash);
    if(!valid){
      await audit({action:"auth.login_failed",resource:"user",ip:getClientIp(req),userAgent:req.headers.get("user-agent")??undefined,metadata:{email:parsed.data.email}});
      return NextResponse.json({error:"Invalid email or password"},{status:401});
    }
    if(user.status!=="active")return NextResponse.json({error:"Account is not active"},{status:403});
    await createSession(String(user._id),{ip:getClientIp(req),userAgent:req.headers.get("user-agent")??undefined});
    await audit({actorId:String(user._id),role:user.role,action:"auth.login",resource:"session",ip:getClientIp(req),userAgent:req.headers.get("user-agent")??undefined});
    return NextResponse.json({ok:true,role:user.role});
  }catch(error){
    console.error("login",error);
    if(error instanceof Error&&error.message==="INVALID_ORIGIN"){
      return NextResponse.json({error:"This login request came from an unapproved app URL. Open the site using NEXT_PUBLIC_APP_URL."},{status:403});
    }
    const message=error instanceof Error&&error.message.includes("MONGODB_URI")
      ? "Database is not configured. Use Demo Admin or configure MongoDB."
      : "Unable to sign in. Please try again.";
    return NextResponse.json({error:message},{status:500});
  }
}
