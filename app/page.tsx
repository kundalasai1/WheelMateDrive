import Link from "next/link";
import { ArrowRight, CalendarClock,  Headphones, MapPinned, Plane, Route, ShieldCheck, Star, UserCheck } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { QuickBooking } from "@/components/home/quick-booking";

const services = [
  { icon: MapPinned, title: "Local drives", description: "Shopping, meetings, hospital visits or a full day in the city.", price: "From ₹399" },
  { icon: CalendarClock, title: "Scheduled rides", description: "Reserve a verified driver for the exact date and time you need.", price: "Book up to 30 days" },
  { icon: Route, title: "Outstation trips", description: "Comfortable long-distance travel in your own car, without the fatigue.", price: "From ₹5/km" },
  { icon: Plane, title: "Airport transfers", description: "Reliable airport pickup and drop support with clear status updates.", price: "On-time service" },
];

const steps = [
  ["Tell us your plan", "Add pickup, destination and when you need a driver."],
  ["Meet your match", "Review your verified driver profile and arrival time."],
  ["Start with OTP", "Share the secure trip OTP only after the driver arrives."],
  ["Pay & rate", "See the final fare, pay securely and share your experience."],
];

const safety = [
  [UserCheck, "Multi-step verification", "Aadhaar, licence, selfie and background review."],
  [Route, "Live trip sharing", "Keep trusted contacts informed throughout the trip."],
  [ShieldCheck, "One-tap SOS", "Reach support and your emergency contact immediately."],
  [Headphones, "Privacy-first calling", "Connect without exposing personal phone numbers."],
];

export default function Home() {
  return (
    <>
      <Hero />
      <QuickBooking />

      <section className="stats-strip">
        <div className="container stats-grid">
          <div><strong>4.9/5</strong><span>Customer rating</span></div>
          <div><strong>1,200+</strong><span>Verified drivers</span></div>
          <div><strong>28,000+</strong><span>Safe trips completed</span></div>
          <div><strong>12 min</strong><span>Average assignment</span></div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <div className="section-intro split-intro">
            <div><span className="eyebrow">Drive your way</span><h2>A driver for every plan</h2></div>
            <p>Stay in the comfort of your own car. We handle the driving, from a quick city errand to an overnight journey.</p>
          </div>
          <div className="service-grid">
            {services.map(({ icon: Icon, title, description, price }) => (
              <article className="service-card" key={title}>
                <span className="service-icon"><Icon /></span>
                <h3>{title}</h3>
                <p>{description}</p>
                <strong>{price}</strong>
                <Link href="/book" aria-label={`Book ${title}`}><ArrowRight size={18} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section how-section">
        <div className="container">
          <span className="eyebrow">Simple by design</span>
          <h2>Ready in four clear steps</h2>
          <div className="steps-grid">
            {steps.map(([title, description], index) => (
              <article className="step-card" key={title}>
                <div className="step-number">{String(index + 1).padStart(2, "0")}</div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section safety-wrap">
        <div className="container safety-panel">
          <div className="safety-copy">
            <span className="eyebrow">Safety, built into every trip</span>
            <h2>Confidence from pickup to drop</h2>
            <p>Every trip includes identity checks, secure start verification, live status and a direct safety channel.</p>
            <Link href="/safety">Explore the safety centre <ArrowRight size={18} /></Link>
          </div>
          <div className="safety-grid">
            {safety.map(([Icon, title, description]) => {
              const SafetyIcon = Icon as typeof ShieldCheck;
              return <article key={title as string}><SafetyIcon /><div><h3>{title as string}</h3><p>{description as string}</p></div></article>;
            })}
          </div>
        </div>
      </section>

      <section className="section testimonial-section">
        <div className="container">
          <span className="eyebrow">People trust WheelMateDrive</span>
          <h2>Real journeys. Real peace of mind.</h2>
          <div className="testimonial-grid">
            <article>
              <div className="stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={18} fill="currentColor" />)}</div>
              <blockquote>“The driver reached on time, handled our automatic car confidently and kept us updated throughout.”</blockquote>
              <footer><span>A</span><div><strong>Ananya Reddy</strong><small>Bengaluru local drive</small></div></footer>
            </article>
            <article>
              <div className="stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={18} fill="currentColor" />)}</div>
              <blockquote>“Booking for my parents was simple. Live tracking and the start OTP made the entire experience feel safe.”</blockquote>
              <footer><span>V</span><div><strong>Vikram S.</strong><small>Hindupur to Bengaluru</small></div></footer>
            </article>
          </div>
        </div>
      </section>

      <section className="final-cta-wrap">
        <div className="container final-cta">
          <div><span>The road is yours again</span><h2>Where can we drive you today?</h2></div>
          <Link href="/book">Book a verified driver <ArrowRight size={19} /></Link>
        </div>
      </section>
    </>
  );
}
