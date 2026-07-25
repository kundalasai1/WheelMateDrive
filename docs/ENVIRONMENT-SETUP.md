# WheelMateDrive environment setup

Copy `.env.example` to `.env.local`. Never commit `.env.local`.

## MongoDB Atlas
Create a free Atlas project, cluster and database user, allow your deployment IPs, then copy the connection string into `MONGODB_URI`. Atlas has a free shared tier; paid pricing depends on region and cluster size.

## Authentication secret
Run `openssl rand -base64 32` or `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` and store the result in `AUTH_SECRET`.

## Google Maps Platform
Create a Google Cloud project, enable Maps JavaScript API, Places API and Routes/Distance Matrix features used by the app. Create separate browser and server keys. Restrict the browser key by domain and the server key by server IP/API. Google provides monthly usage credits; charges depend on API and request volume.

## Razorpay
Create a Razorpay account, use Test Mode keys first, and configure the deployed webhook URL as `/api/payments/webhook`. Store the webhook secret separately. Razorpay charges transaction fees based on payment method and account plan; verify current pricing in the Razorpay dashboard before launch.

## Resend email
Verify your sending domain, create an API key, and set `EMAIL_FROM` to an address on that domain. Resend has a limited free allowance and paid plans for higher volume.

## Cloudinary
Create a cloud, copy cloud name/API key/API secret, and configure signed uploads for production. A free allowance is available; paid plans depend on storage, transformations and bandwidth.

## WhatsApp Cloud API
Create a Meta app, add WhatsApp, register a number, and create a long-lived access token. Template messages may require approval and conversation-based charges apply by market/category.

## Vercel deployment
Import the Git repository, add every production variable in Project Settings → Environment Variables, set `NEXT_PUBLIC_APP_URL` to the final HTTPS domain, deploy, then run the production smoke checklist.
