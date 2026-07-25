import { BookingForm } from "@/components/ui/booking-form";

export const metadata = { title: "Book a Driver" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const query = await searchParams;
  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="eyebrow">BOOKING</div>
          <h1 className="mt-3 text-4xl font-black">Tell us your journey plan</h1>
          <p className="muted mt-3">Your homepage route details are carried forward automatically. Review them, calculate the final fare, and confirm securely.</p>
          <BookingForm initialData={{
            pickupAddress: one(query.pickup),
            destinationAddress: one(query.destination),
            tripType: one(query.tripType),
            scheduledAt: one(query.dateTime),
            fareMin: one(query.fareMin),
            fareMax: one(query.fareMax),
          }} />
        </div>
      </div>
    </section>
  );
}
