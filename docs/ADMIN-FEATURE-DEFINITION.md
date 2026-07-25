# WheelMateDrive Admin — Feature Definition

This build no longer leaves the demo administrator dashboard as display-only cards. The main admin modules are linked and usable in demo mode without MongoDB.

## Overview
Shows operational totals for bookings, drivers, KYC review and customers. Every module card opens its corresponding workspace.

## Bookings
Search by booking number, customer, route, city or driver. Change the trip status through the workflow and export the visible operational dataset as CSV. In live mode, booking records come from MongoDB.

## Dispatch
Displays bookings that need driver allocation and the pool of approved online drivers. `Auto match` assigns an eligible demo driver. In live mode, the existing dispatch API ranks real driver profiles.

## Drivers
Shows identity, licence, city, rating, completed trips, KYC and availability. Admin can move a driver through under-review, approved, more-information-required, rejected and suspended states. Non-approved drivers remain unavailable for dispatch.

## Pricing
Admin can define pricing per city and trip type: base fare, included kilometres, per-kilometre and per-hour charge, minimum fare, night/weekend surcharge, waiting fee, outstation allowance, food/overnight allowance, platform fee, GST and surge multiplier. Demo rules persist in browser localStorage; live rules persist through the MongoDB pricing API.

## Analytics
Calculates revenue, booking totals, active driver/customer totals, city demand, peak hours, cancellation rate and customer retention. Demo mode uses representative data; live mode calculates from database records.

## Reviews
Moderate customer-to-driver and driver-to-customer feedback. Reviews can be pending, published, hidden or flagged.

## Demo versus live behaviour
Demo mode is an operational preview. Changes are intentionally local and do not affect a production database. Live behaviour requires MongoDB and a real database admin account. Payment capture, maps, email, WhatsApp, cloud uploads and push delivery require their provider credentials from `.env.local`.
