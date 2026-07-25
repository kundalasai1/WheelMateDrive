import { createHmac, timingSafeEqual } from "node:crypto";

export const DEMO_ADMIN_COOKIE = "wheelmate_demo_admin";
export const DEMO_ADMIN_EMAIL = process.env.DEMO_ADMIN_EMAIL ?? "demo.admin@wheelmatedrive.in";
export const DEMO_ADMIN_PASSWORD = process.env.DEMO_ADMIN_PASSWORD ?? "DemoAdmin@2026";

export function isDemoAdminEnabled(): boolean {
  return process.env.ENABLE_DEMO_ADMIN === "true" || process.env.NODE_ENV !== "production";
}

function secret(): string {
  return process.env.AUTH_SECRET ?? "wheelmate-demo-development-secret-change-me";
}

export function createDemoAdminToken(): string {
  const payload = `demo-admin:${DEMO_ADMIN_EMAIL}`;
  const signature = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

export function verifyDemoAdminToken(token: string | undefined): boolean {
  if (!token || !isDemoAdminEnabled()) return false;
  const [encoded, suppliedSignature] = token.split(".");
  if (!encoded || !suppliedSignature) return false;

  try {
    const payload = Buffer.from(encoded, "base64url").toString("utf8");
    if (payload !== `demo-admin:${DEMO_ADMIN_EMAIL}`) return false;
    const expectedSignature = createHmac("sha256", secret()).update(payload).digest("hex");
    const expected = Buffer.from(expectedSignature, "hex");
    const supplied = Buffer.from(suppliedSignature, "hex");
    return expected.length === supplied.length && timingSafeEqual(expected, supplied);
  } catch {
    return false;
  }
}
