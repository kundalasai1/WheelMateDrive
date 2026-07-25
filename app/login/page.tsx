import Image from "next/image";
import Link from "next/link";
import {AuthForm} from "@/components/auth/auth-form";
import {BadgeCheck,Clock3,Headphones,MapPinned} from "lucide-react";

export default function LoginPage(){return <main className="login-page">
  <section className="login-visual">
    <div className="login-brand"><Image src="/brand/wheelmate-logo.webp" alt="WheelMateDrive" width={190} height={72} priority/></div>
    <div className="login-visual-content">
      <p className="login-kicker">YOUR CAR · OUR PROFESSIONAL DRIVER</p>
      <h1>Every journey,<br/><span>managed with confidence.</span></h1>
      <p>Access bookings, drivers, live operations, pricing and analytics from one secure workspace.</p>
      <div className="login-trust-grid">
        <article><BadgeCheck/><div><strong>Verified drivers</strong><span>Identity and licence checks</span></div></article>
        <article><MapPinned/><div><strong>Live operations</strong><span>Bookings and route visibility</span></div></article>
        <article><Clock3/><div><strong>24 × 7 access</strong><span>Manage trips at any time</span></div></article>
        <article><Headphones/><div><strong>Priority support</strong><span>Connected assistance</span></div></article>
      </div>
    </div>
    <div className="login-route-art" aria-hidden="true"><i/><i/><i/></div>
    <p className="login-copyright">© 2026 WheelMateDrive. Built for safer journeys.</p>
  </section>
  <section className="login-panel">
    <div className="login-panel-inner">
      <Link className="login-back" href="/">← Back to home</Link>
      <div className="login-mobile-logo"><Image src="/brand/wheelmate-logo.webp" alt="WheelMateDrive" width={178} height={68} priority/></div>
      <div className="login-welcome"><p>WELCOME BACK</p><h2>Continue to WheelMateDrive</h2><span>Use your registered account or open the demo administrator workspace.</span></div>
      <AuthForm mode="login"/>
      <p className="login-register">New customer? <Link href="/register/customer">Create account</Link><span>·</span>Driver? <Link href="/register/driver">Apply here</Link></p>
      <div className="login-security-note"><ShieldMini/>Your connection and session are protected using secure, HTTP-only cookies.</div>
    </div>
  </section>
</main>}

function ShieldMini(){return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" stroke="currentColor" strokeWidth="1.8"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
