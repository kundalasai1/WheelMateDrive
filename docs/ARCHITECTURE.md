# Architecture

WheelMateDrive uses a modular monolith on Next.js App Router. Public, customer, driver and admin surfaces share a design system while APIs enforce identity and permission checks server-side. MongoDB stores transactional and CMS data. Cloudinary, Razorpay, maps and SMTP are isolated behind integration modules so secrets never reach browser code.

## Layers
- `app/`: routes and route handlers
- `components/`: reusable UI and layout
- `lib/db`: database lifecycle
- `lib/security`: authentication/security primitives
- `lib/validation`: shared Zod contracts
- `models/`: MongoDB schemas and indexes
- `scripts/`: operational commands
- `tests/`: automated checks
