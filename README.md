# WheelMateDrive

Production-oriented Next.js foundation for a verified-driver booking platform where the driver operates the customer's own car.

## Included in this foundation
- Next.js 16.2 App Router, React 19.2, TypeScript strict mode and Tailwind CSS 4.3
- Responsive premium navy/blue public UI
- Home, booking, service, safety, process and login routes
- Customer, driver and admin dashboard route foundations
- MongoDB connection helper and initial User/Booking schemas
- Booking validation, password hashing helper and security headers
- PWA manifest foundation and health API
- Environment template, scripts, test foundation and architecture docs

## Run locally
1. Install Node.js 22.
2. Copy `.env.local.example` to `.env.local`.
3. Add MongoDB Atlas credentials when database testing is required.
4. Run `npm install`.
5. Run `npm run dev`.

## Verification
Run `npm run check`.

## Delivery roadmap
The repository is structured for authentication/RBAC, full booking workflow, pricing, KYC, payments, CMS, support, analytics, notifications, PWA service worker, testing and deployment.

## Phase 2: Authentication

The project now includes MongoDB-backed registration, login, logout, opaque HTTP-only sessions, email verification tokens, password reset tokens, server-side role protection, audit logs, customer profiles, driver profiles and a secure admin creation script.

Create an administrator with:

```bash
ADMIN_EMAIL=owner@example.com ADMIN_PASSWORD='replace-with-a-long-password' npm run create-admin
```

See `docs/AUTHENTICATION.md` for details.


## Phase 3
Booking, pricing, assignment and OTP workflow are implemented. See `docs/PHASE3_COMPLETION_REPORT.md`.

## Phase 4: Customer Portal
Phase 4 adds the complete MongoDB-backed customer workspace: dashboard, booking details, addresses, favourites, payments, notifications, profile, support tickets, referrals and settings. See `docs/PHASE4_COMPLETION.md`.

## Phase 7 Premium Homepage

The homepage now follows the supplied WheelMateDrive visual reference with a white/blue premium hero, the supplied professional driver and car artwork, a responsive quick-booking widget, statistics, service cards, safety panel, testimonials and final CTA. See `docs/PHASE7_COMPLETION.md`.

## Phase 9
Driver operations, profile/KYC workflow, availability controls, earnings view and admin driver management are included. See `docs/PHASE9_COMPLETION.md`.
