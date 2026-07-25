"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, CarFront, MapPin, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

const tripPrices: Record<string, [number, number]> = {
  Local: [399, 650],
  Scheduled: [450, 750],
  "Full Day": [1199, 1699],
  Outstation: [650, 820],
  "Airport Transfer": [599, 899],
};

export function QuickBooking() {
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState("Outstation");
  const [dateTime, setDateTime] = useState("");
  const [swapped, setSwapped] = useState(false);
  const [error, setError] = useState("");

  const fare = useMemo(() => tripPrices[tripType] ?? [399, 650], [tripType]);

  function swapLocations() {
    setPickup(destination);
    setDestination(pickup);
    setSwapped((value) => !value);
  }

  function submit() {
    if (!pickup.trim() || !destination.trim() || !dateTime) {
      setError("Enter pickup, destination, and date & time to continue.");
      return;
    }
    setError("");
    const query = new URLSearchParams({
      pickup: pickup.trim(),
      destination: destination.trim(),
      tripType,
      dateTime,
      fareMin: String(fare[0]),
      fareMax: String(fare[1]),
    });
    router.push(`/book?${query.toString()}`);
  }

  return (
    <section className="quick-booking-wrap" aria-label="Quick booking">
      <div className="container">
        <div className="quick-booking-card">
          <div className="quick-booking-heading">
            <div><span>Quick booking</span><h2>Where can we drive you?</h2></div>
            <div className="nearby-chip"><span /> Drivers available nearby</div>
          </div>

          <div className="booking-grid">
            <label className="booking-field pickup-field">
              <span>Pickup</span>
              <div className="booking-control"><MapPin size={18} /><input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Enter pickup" /></div>
            </label>

            <button type="button" className={`swap-button ${swapped ? "swapped" : ""}`} onClick={swapLocations} aria-label="Swap pickup and destination"><RefreshCw size={16} /></button>

            <label className="booking-field destination-field">
              <span>Destination</span>
              <div className="booking-control"><MapPin size={18} /><input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Where to?" /></div>
            </label>

            <label className="booking-field trip-field">
              <span>Trip type</span>
              <div className="booking-control"><CarFront size={18} /><select value={tripType} onChange={(e) => setTripType(e.target.value)}>{Object.keys(tripPrices).map((type) => <option key={type}>{type}</option>)}</select></div>
            </label>

            <label className="booking-field datetime-field">
              <span>Date &amp; time</span>
              <div className="booking-control"><CalendarDays size={18} /><input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} /></div>
            </label>

            <div className="fare-box" aria-live="polite"><span>Estimated fare</span><strong>₹{fare[0]}–₹{fare[1]}</strong></div>

            <button type="button" className="btn btn-primary booking-submit" onClick={submit}>Book a Driver <ArrowRight size={18} /></button>
          </div>
          {error && <p className="quick-booking-error" role="alert">{error}</p>}
        </div>
      </div>
    </section>
  );
}
