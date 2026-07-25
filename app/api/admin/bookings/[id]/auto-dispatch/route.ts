import {NextResponse} from "next/server";
import {getCurrentUser} from "@/lib/auth/session";
import {autoDispatchBooking} from "@/services/dispatch/auto-dispatch";

const allowed = ["admin", "operations"];

export async function POST(_: Request, {params}: {params: Promise<{id: string}>}) {
  const user = await getCurrentUser();
  if (!user || !allowed.includes(user.role)) return NextResponse.json({error: "Forbidden"}, {status: 403});
  try {
    const {id} = await params;
    const result = await autoDispatchBooking(id, user.id, user.role);
    return NextResponse.json({ok: true, ...result});
  } catch (error) {
    return NextResponse.json({error: error instanceof Error ? error.message : "Dispatch failed"}, {status: 400});
  }
}
