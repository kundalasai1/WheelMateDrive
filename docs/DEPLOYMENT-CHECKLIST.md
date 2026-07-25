# Production deployment checklist

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run test`
5. `npm run build`
6. Add production environment variables in Vercel.
7. Restrict Google/Razorpay/Cloudinary keys.
8. Configure Razorpay webhook and verify signatures.
9. Verify email domain and test invoice emails.
10. Seed the first admin securely, then remove temporary credentials.
11. Confirm database indexes, backups and monitoring.
12. Test customer booking, driver assignment, payment, notifications, invoice and admin pricing.
