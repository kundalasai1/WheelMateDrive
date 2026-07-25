import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Headphones, MapPin, Navigation, ShieldCheck } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, label: "Verified Drivers" },
  { icon: Navigation, label: "Live Tracking" },
  { icon: Headphones, label: "24/7 Support" },
];

export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="hero-badge">
            <ShieldCheck size={17} /> Trusted drivers, on demand
          </div>
          <h1>
            Your car.<br />
            <span>Our verified driver.</span>
          </h1>
          <p>
            Book a trusted professional driver for local, scheduled and outstation journeys in the comfort of your own car.
          </p>
          <div className="hero-actions">
            <Link href="/book" className="btn btn-primary">
              Book a Driver <ArrowRight size={18} />
            </Link>
            <Link href="/book?type=scheduled" className="btn btn-outline-blue">
              Schedule a Ride <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-trust-row">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="hero-trust-item">
                <span><Icon size={18} /></span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-label="Verified WheelMateDrive driver standing beside a customer-owned car">
          <div className="hero-image-halo" />
          <Image
            src="/hero-driver-car.webp"
            alt="Professional Indian driver standing beside a white car with an illustrated city route"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
            className="hero-image"
          />
          <div className="hero-image-fade" />
          <div className="availability-card">
            <span className="availability-dot" />
            <div>
              <strong>Drivers available nearby</strong>
              <small>Fast assignment in active service areas</small>
            </div>
          </div>
          <div className="route-card">
            <MapPin size={18} />
            <div>
              <strong>Own-car journeys</strong>
              <small>Local • Scheduled • Outstation</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
