# Demo Administrator

WheelMateDrive includes an optional database-free administrator preview.

## Credentials

- Email: `demo.admin@wheelmatedrive.in`
- Password: `DemoAdmin@2026`

Select **Use Demo Admin** on the login page to fill these values automatically, then select **Sign in securely**.

## Environment controls

```env
ENABLE_DEMO_ADMIN=true
DEMO_ADMIN_EMAIL=demo.admin@wheelmatedrive.in
DEMO_ADMIN_PASSWORD=DemoAdmin@2026
AUTH_SECRET=replace-with-a-long-random-secret
```

The demo session uses a signed, HTTP-only cookie and expires after eight hours. It does not create a database user and shows sample dashboard data.

For a private production deployment, set `ENABLE_DEMO_ADMIN=false`. Never use the demo password as a real administrator password.
