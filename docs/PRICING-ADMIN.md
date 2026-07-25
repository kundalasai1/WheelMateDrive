# Admin-manageable pricing

Pricing is stored in MongoDB using `PricingRule`. Admins can manage city and trip-type rules at `/admin/pricing`.

Editable values include base fare, included kilometres, per-kilometre rate, per-hour rate, minimum fare, night/weekend surcharge, waiting charge, outstation allowance, food/overnight allowance, platform fee, GST percentage, surge multiplier, active state and effective dates.

The booking estimate API reads the active rule. Changes affect new estimates only; already-created bookings retain their fare snapshot for auditability.
