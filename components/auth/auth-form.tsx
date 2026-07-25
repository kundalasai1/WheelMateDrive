"use client";
import {FormEvent,useState} from "react";
import {useRouter} from "next/navigation";
import {Eye,EyeOff,LockKeyhole,Mail,ShieldCheck,Sparkles} from "lucide-react";

type Mode="login"|"customer"|"driver"|"forgot"|"reset"|"verify";
const DEMO_EMAIL="demo.admin@wheelmatedrive.in";
const DEMO_PASSWORD="DemoAdmin@2026";

export function AuthForm({mode}:{mode:Mode}){
  const router=useRouter();
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");
  const [busy,setBusy]=useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setError("");setMessage("");
    try{
      const data=Object.fromEntries(new FormData(e.currentTarget));
      if(mode==="customer"||mode==="driver"){
        data.role=mode;
        if(mode==="driver")data.languages=String(data.languages||"").split(",").map(x=>x.trim()).filter(Boolean);
      }
      const path=mode==="customer"||mode==="driver"?"register":mode;
      const res=await fetch(`/api/auth/${path}`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)});
      const json=await res.json();
      if(!res.ok){setError(json.error??"Request failed");return}
      if(mode==="login"||mode==="customer"||mode==="driver"){
        router.push(`/${json.role}/dashboard`);router.refresh();return;
      }
      setMessage(mode==="forgot"?"Password reset instructions created. Check the configured email service.":"Request completed successfully.");
    }catch{
      setError("Network error. Check the server and try again.");
    }finally{setBusy(false)}
  }

  function useDemoAdmin(){setEmail(DEMO_EMAIL);setPassword(DEMO_PASSWORD);setError("");}

  if(mode==="login")return <form className="login-form" onSubmit={submit}>
    <div className="login-form-head">
      <div className="login-lock"><LockKeyhole size={20}/></div>
      <div><span>Secure portal</span><strong>Sign in to your account</strong></div>
    </div>
    <label className="login-field">
      <span>Email address</span>
      <div className="login-input-wrap"><Mail size={19}/><input name="email" type="email" placeholder="name@company.com" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/></div>
    </label>
    <label className="login-field">
      <span>Password</span>
      <div className="login-input-wrap"><LockKeyhole size={19}/><input name="password" type={showPassword?"text":"password"} placeholder="Enter your password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}/><button className="password-toggle" type="button" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword?"Hide password":"Show password"}>{showPassword?<EyeOff size={19}/>:<Eye size={19}/>}</button></div>
    </label>
    <div className="login-options"><label className="remember-me"><input type="checkbox"/> Keep me signed in</label><a href="/forgot-password">Forgot password?</a></div>
    {error&&<p className="form-error" role="alert">{error}</p>}
    <button className="login-submit" disabled={busy}>{busy?<><span className="button-spinner"/>Signing in…</>:<><ShieldCheck size={19}/>Sign in securely</>}</button>
    <div className="login-divider"><span>or preview the platform</span></div>
    <button className="demo-login-button" type="button" onClick={useDemoAdmin}><Sparkles size={18}/><span><strong>Use Demo Admin</strong><small>No MongoDB connection required</small></span></button>
    <p className="demo-credentials"><span>Demo email</span><code>{DEMO_EMAIL}</code><span>Password</span><code>{DEMO_PASSWORD}</code></p>
  </form>;

  const common=<><label>Full name<input name="fullName" required /></label><label>Email<input name="email" type="email" required /></label><label>Phone<input name="phone" placeholder="+919876543210" required /></label><label>Password<input name="password" type="password" required minLength={8}/></label></>;
  return <form className="auth-form card" onSubmit={submit}>{(mode==="customer"||mode==="driver")&&common}{mode==="customer"&&<><label>Address<textarea name="address"/></label><label>Emergency contact<input name="emergencyContact"/></label></>}{mode==="driver"&&<><label>City<input name="city" required/></label><label>Driving licence number<input name="drivingLicenceNumber" required/></label><label>Driving experience (years)<input name="drivingExperienceYears" type="number" min="0" required/></label><label>Languages, comma separated<input name="languages" defaultValue="Telugu, English" required/></label><label>Address<textarea name="address"/></label><label>Emergency contact<input name="emergencyContact"/></label></>}{mode==="forgot"&&<label>Email<input name="email" type="email" required/></label>}{mode==="reset"&&<><label>Reset token<input name="token" required/></label><label>New password<input name="password" type="password" required/></label></>}{mode==="verify"&&<label>Verification token<input name="token" required/></label>}{error&&<p className="form-error">{error}</p>}{message&&<p className="form-success">{message}</p>}<button className="btn btn-primary" disabled={busy}>{busy?"Please wait…":mode==="customer"?"Create customer account":mode==="driver"?"Create driver account":mode==="forgot"?"Send reset link":mode==="reset"?"Reset password":"Verify email"}</button></form>;
}
