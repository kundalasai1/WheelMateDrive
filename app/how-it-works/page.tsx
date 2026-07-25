import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck, KeyRound, MapPinned } from "lucide-react";

export const metadata={title:"How It Works"};
const steps=[
  [MapPinned,"Share your journey","Enter pickup, destination, trip type, date and time. Your details continue directly into the booking form."],
  [CalendarCheck,"Review the fare","Check the indicative price, journey schedule and final server-calculated fare before confirming."],
  [BadgeCheck,"Meet a verified driver","Track assignment status and review the driver profile before the journey begins."],
  [KeyRound,"Start safely with OTP","Share the trip OTP only after the correct driver arrives, then track progress until completion."],
] as const;
export default function Page(){return <main><section className="subpage-hero"><div className="container"><span className="eyebrow">SIMPLE BY DESIGN</span><h1>Book a trusted driver in four clear steps</h1><p>WheelMateDrive keeps the complete journey—from planning and driver assignment to safety and payment—in one transparent flow.</p><Link href="/book" className="btn btn-primary">Start booking <ArrowRight size={18}/></Link></div></section><section className="section"><div className="container feature-page-grid">{steps.map(([Icon,title,text],i)=><article className="feature-page-card" key={title}><span className="feature-page-number">0{i+1}</span><Icon/><h2>{title}</h2><p>{text}</p></article>)}</div></section><section className="section page-callout"><div className="container"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Your car stays familiar. The driving becomes effortless.</h2></div><Link href="/book">Book a verified driver <ArrowRight size={18}/></Link></div></section></main>}
