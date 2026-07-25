const ordered = ["pending", "searching_driver", "driver_assigned", "confirmed", "driver_en_route", "driver_arrived", "trip_started", "trip_completed"];

export function BookingTimeline({status}: {status: string}) {
  const current = ordered.indexOf(status);
  return <ol className="booking-progress">{ordered.map((step, index) => <li key={step} className={index < current ? "done" : index === current ? "active" : ""}><span>{index < current ? "✓" : index + 1}</span><div><strong>{step.replaceAll("_", " ")}</strong>{index === current && <small>Current stage</small>}</div></li>)}</ol>;
}
