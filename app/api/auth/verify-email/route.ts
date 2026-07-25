import {NextRequest,NextResponse} from "next/server";
import {consumeAuthToken} from "@/services/auth-tokens";
import {UserModel} from "@/models/User";
export async function POST(req:NextRequest){const token=String((await req.json()).token??"");const record=await consumeAuthToken(token,"verify_email");if(!record)return NextResponse.json({error:"Token is invalid or expired"},{status:400});await UserModel.updateOne({_id:record.userId},{$set:{emailVerifiedAt:new Date()}});return NextResponse.json({ok:true})}
