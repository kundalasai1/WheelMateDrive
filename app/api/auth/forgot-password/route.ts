import {NextRequest,NextResponse} from "next/server";
import {forgotPasswordSchema} from "@/lib/validation/auth";
import {connectDB} from "@/lib/db/mongoose";
import {UserModel} from "@/models/User";
import {issueAuthToken} from "@/services/auth-tokens";
export async function POST(req:NextRequest){const parsed=forgotPasswordSchema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({ok:true});await connectDB();const user=await UserModel.findOne({email:parsed.data.email}).lean();let resetToken:string|undefined;if(user)resetToken=await issueAuthToken(String(user._id),"reset_password",30);return NextResponse.json({ok:true,resetToken:process.env.NODE_ENV==="development"?resetToken:undefined})}
