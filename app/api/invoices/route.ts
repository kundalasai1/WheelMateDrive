import {NextRequest,NextResponse} from "next/server";import {getCurrentUser} from "@/lib/auth/session";import {connectDB} from "@/lib/db/mongoose";import {InvoiceModel} from "@/models/Invoice";
export async function GET(req:NextRequest){const u=await getCurrentUser();if(!u)return NextResponse.json({error:'Unauthorised'},{status:401});await connectDB();const q:uany={};if(u.role==='customer')q.customerId=u.id;return NextResponse.json(await InvoiceModel.find(q).sort({issuedAt:-1}).lean())}
type uany=Record<string,unknown>;
