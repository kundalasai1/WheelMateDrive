import {NextRequest,NextResponse} from "next/server";
import {resetPasswordSchema} from "@/lib/validation/auth";
import {consumeAuthToken} from "@/services/auth-tokens";
import {hashPassword} from "@/lib/security/password";
import {UserModel} from "@/models/User";
import {SessionModel} from "@/models/Session";
export async function POST(req:NextRequest){const parsed=resetPasswordSchema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({error:"Invalid request"},{status:400});const token=await consumeAuthToken(parsed.data.token,"reset_password");if(!token)return NextResponse.json({error:"Token is invalid or expired"},{status:400});await UserModel.updateOne({_id:token.userId},{$set:{passwordHash:await hashPassword(parsed.data.password)}});await SessionModel.updateMany({userId:token.userId,revokedAt:{$exists:false}},{$set:{revokedAt:new Date()}});return NextResponse.json({ok:true})}
