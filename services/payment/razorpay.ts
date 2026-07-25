import crypto from "node:crypto";

const apiBase = "https://api.razorpay.com/v1";

function credentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new Error("RAZORPAY_NOT_CONFIGURED");
  return { keyId, keySecret };
}

export async function createRazorpayOrder(input: {amountPaise:number; receipt:string; notes?:Record<string,string>}) {
  const {keyId,keySecret}=credentials();
  const response=await fetch(`${apiBase}/orders`,{
    method:"POST",
    headers:{Authorization:`Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,"Content-Type":"application/json"},
    body:JSON.stringify({amount:input.amountPaise,currency:"INR",receipt:input.receipt,notes:input.notes??{}}),
    cache:"no-store"
  });
  const data=await response.json();
  if(!response.ok) throw new Error(data?.error?.description??"Unable to create payment order");
  return data as {id:string;amount:number;currency:string;receipt:string;status:string};
}

export function verifyPaymentSignature(orderId:string,paymentId:string,signature:string){
  const secret=process.env.RAZORPAY_KEY_SECRET;
  if(!secret) throw new Error("RAZORPAY_NOT_CONFIGURED");
  const expected=crypto.createHmac("sha256",secret).update(`${orderId}|${paymentId}`).digest("hex");
  return expected.length===signature.length&&crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature));
}

export function verifyWebhookSignature(rawBody:string,signature:string){
  const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
  if(!secret) throw new Error("RAZORPAY_WEBHOOK_NOT_CONFIGURED");
  const expected=crypto.createHmac("sha256",secret).update(rawBody).digest("hex");
  return expected.length===signature.length&&crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature));
}
