import {AuthForm} from "@/components/auth/auth-form";
export default function Page(){return <main className="auth-shell container"><div><h1>Forgot password</h1><p className="muted">We return the same response whether an account exists, reducing account-enumeration risk.</p></div><AuthForm mode="forgot"/></main>}
