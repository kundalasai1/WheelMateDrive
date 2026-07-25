# Authentication and Access Control

Phase 2 uses opaque random session tokens stored only in HTTP-only cookies. Only SHA-256 token hashes are stored in MongoDB. Sessions expire after seven days, can be revoked on logout, and are invalidated after a password reset.

## Implemented flows

- Customer and driver registration
- Login and logout
- Current-session endpoint
- Email-verification tokens
- Password-reset tokens
- Server-side role protection for customer, driver and admin portals
- Audit records for registration, login, failed login and admin creation

## Development token delivery

Until an SMTP provider is configured, verification and reset tokens are returned only when `NODE_ENV=development`. Production responses never expose these tokens. Connect the email service before deployment.

## Security notes

- Passwords are hashed with bcrypt at cost 12.
- Cookies are HTTP-only, `SameSite=Lax`, and `Secure` in production.
- Registration uses a MongoDB transaction.
- Generic forgot-password responses reduce account enumeration.
- Roles are assigned server-side and are never accepted from arbitrary client input.
