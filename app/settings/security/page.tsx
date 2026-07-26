import {requireUser} from "@/lib/auth/session";import {connectDB} from "@/lib/db/mongoose";import {SessionModel} from "@/models/Session";import {LoginEventModel} from "@/models/LoginEvent";

interface SessionData {
  _id: string | object;
  userAgent?: string | null;
  ip?: string | null;
  createdAt: Date;
}

interface LoginEventData {
  _id: string | object;
  createdAt: Date;
  ip?: string | null;
  userAgent?: string | null;
  success: boolean;
}

export default async function Page(){const u=await requireUser();await connectDB();const [sessions,events]=await Promise.all([SessionModel.find({userId:u.id,revokedAt:{$exists:false},expiresAt:{$gt:new Date()}}).sort({createdAt:-1}).lean(),LoginEventModel.find({userId:u.id}).sort({createdAt:-1}).limit(30).lean()]);return <main className="container section"><p className="eyebrow">ENTERPRISE SECURITY</p><h1>Security centre</h1><div className="analytics-grid"><article className="card"><h2>Two-factor authentication</h2><p>Protect sign-in with a time-based authenticator code.</p><button className="btn btn-primary">Set up 2FA</button></article><article className="card"><h2>Password policy</h2><ul><li>Minimum 10 characters</li><li>Uppercase, lowercase and number</li><li>Blocked breached/common passwords</li><li>Session revocation after reset</li></ul></article></div><h2>Active sessions</h2><div className="card table-wrap"><table><tbody>{sessions.map((s:SessionData)=><tr key={String(s._id)}><td>{s.userAgent||'Unknown device'}</td><td>{s.ip||'Unknown IP'}</td><td>{new Date(s.createdAt).toLocaleString('en-IN')}</td><td><button className="btn btn-secondary">Revoke</button></td></tr>)}</tbody></table></div><h2>Login history</h2><div className="card table-wrap"><table><tbody>{events.map((e:LoginEventData)=><tr key={String(e._id)}><td>{new Date(e.createdAt).toLocaleString('en-IN')}</td><td>{e.ip||'—'}</td><td>{e.userAgent||'—'}</td><td>{e.success?'Successful':'Failed'}</td></tr>)}{!events.length&&<tr><td>No login events recorded yet.</td></tr>}</tbody></table></div></main>}
