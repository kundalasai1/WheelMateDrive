import {requireUser} from "@/lib/auth/session";
import {connectDB} from "@/lib/db/mongoose";
import {BookingModel} from "@/models/Booking";
import {UserModel} from "@/models/User";
import {demoBookings,demoDrivers} from "@/lib/demo/admin-data";

export default async function Page() {
  const user = await requireUser(["admin"]);
  let bookings = demoBookings.map(x => ({
    ...x,
    createdAt: x.schedule,
    paymentStatus: x.status === 'completed' ? 'paid' : 'pending',
    fare: { total: x.fare },
    customerId: x.customer
  }));
  let drivers = demoDrivers.length;
  let customers = 412;

  if (!user.isDemo) {
    await connectDB();
    const [bookingsResult, driversResult, customersResult] = await Promise.all([
      BookingModel.find().lean(),
      UserModel.countDocuments({ role: 'driver' }),
      UserModel.countDocuments({ role: 'customer' })
    ]);
    bookings = bookingsResult.map(b => ({
      id: String(b._id),
      route: `${b.pickup.address} → ${b.destination.address}`,
      city: b.city,
      status: b.status,
      schedule: new Date(b.scheduledAt).toISOString(),
      customer: String(b.customerId),
      driver: b.driverId ? String(b.driverId) : "Unassigned",
      createdAt: new Date(b.createdAt).toISOString(),
      paymentStatus: b.paymentStatus,
      fare: { total: Number(b.fare?.total ?? 0) },
      customerId: String(b.customerId),
    }));
    drivers = driversResult;
    customers = customersResult;
  }

  const revenue = bookings.filter((b: { paymentStatus: string; status: string }) => b.paymentStatus === 'paid' || b.status === 'completed')
    .reduce((s: number, b: { fare?: { total: number } }) => s + Number(b.fare?.total || 0), 0);

  const cancelled = bookings.filter((b: { status: string }) => b.status === 'cancelled').length;

  const cities = Object.entries(
    bookings.reduce((a: Record<string, number>, b: { city: string }) => {
      a[b.city] = (a[b.city] || 0) + 1;
      return a;
    }, {})
  ).sort((a: [string, number], b: [string, number]) => b[1] - a[1]);

  const hours = Array.from({ length: 24 }, (_, h) => ({
    h,
    count: bookings.filter((b: { createdAt: Date | string }) => new Date(b.createdAt).getHours() === h).length
  }));

  return (
    <main className="container section">
      <p className="eyebrow">ADVANCED ANALYTICS</p>
      <h1>Business intelligence</h1>
      <p className="muted admin-lead">
        Track revenue, demand, cancellations, retention and city performance. Demo analytics use representative sample operations.
      </p>
      <div className="metric-grid">
        <article className="metric">
          <span>Revenue</span>
          <strong>₹{revenue.toLocaleString('en-IN')}</strong>
        </article>
        <article className="metric">
          <span>Bookings</span>
          <strong>{bookings.length}</strong>
        </article>
        <article className="metric">
          <span>Drivers</span>
          <strong>{drivers}</strong>
        </article>
        <article className="metric">
          <span>Customers</span>
          <strong>{customers}</strong>
        </article>
      </div>
      <div className="analytics-grid">
        <article className="card">
          <h2>City-wise bookings</h2>
          {cities.map(([city, count]) => (
            <div className="bar-row" key={city}>
              <span>{city}</span>
              <div>
                <i
                  style={{
                    width: `${Math.max(8, Math.min(100, count / Math.max(1, bookings.length) * 100))}%`
                  }}
                />
              </div>
              <strong>{count}</strong>
            </div>
          ))}
        </article>
        <article className="card">
          <h2>Peak booking hours</h2>
          <div className="heatmap">
            {hours.map(x => {
              const count = x.count;
              return (
                <span
                  key={x.h}
                  title={`${x.h}:00 — ${count} bookings`}
                  style={{
                    opacity: 0.2 + Math.min(0.8, count / Math.max(1, bookings.length) * 8)
                  }}
                >
                  {x.h}
                </span>
              );
            })}
          </div>
        </article>
        <article className="card">
          <h2>Cancellation analysis</h2>
          <p className="big-stat">{bookings.length ? ((cancelled / bookings.length) * 100).toFixed(1) : 0}%</p>
          <p className="muted">{cancelled} cancelled bookings</p>
        </article>
        <article className="card">
          <h2>Customer retention</h2>
          <p className="big-stat">
            {customers
              ? Math.round(
                  new Set(bookings.map((b: { customerId: unknown }) => String(b.customerId))).size / customers * 100
                )
              : 0
            }%
          </p>
          <p className="muted">Customers with at least one booking</p>
        </article>
      </div>
    </main>
  );
}
