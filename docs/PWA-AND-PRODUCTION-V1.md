# WheelMateDrive PWA and Production v1

## Eight-second install alert
The install prompt appears **8 seconds after the first eligible page load**. It does not interrupt users who already installed the app. If dismissed, it remains hidden for seven days.

- Android/desktop Chromium: uses the native `beforeinstallprompt` event.
- iPhone/iPad: shows Safari **Share → Add to Home Screen** instructions.
- Installed PWA: no install alert is shown.
- A newly deployed service worker displays an update banner.

## PWA capabilities
- Standalone application display
- 192px and 512px normal and maskable icons
- Offline fallback page
- Cached app shell and runtime assets
- Booking, bookings and notifications shortcuts
- Push notification service-worker handler
- Notification click deep links
- App update notification

## Provider-dependent production features
The source includes live application flows, models and APIs. These require valid credentials in `.env.local`/Vercel:

- MongoDB Atlas: persistent users, bookings, pricing, conversations and records
- Google Maps: autocomplete, distance, ETA and route data
- Razorpay: payments and webhook verification
- Resend: transactional email
- WhatsApp Cloud API: template messages
- VAPID/Web Push provider: remote push delivery
- Cloudinary or another object store: production chat/KYC images

A provider-ready feature is not live until its credentials, domain and webhook are configured.

## Deployment gate
Run before deployment:

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

Then configure every required variable listed in `.env.example` in the Vercel project and redeploy.
