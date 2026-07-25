# WheelMateDrive UI & Booking Fixes

## Fixed
- Quick-booking fare no longer overlaps the date/time field.
- Homepage pickup, destination, trip type, date/time and indicative fare are transferred to `/book`.
- Booking form is automatically prefilled from the homepage query.
- How It Works, Safety and Services now contain complete responsive content instead of placeholders.
- Added animated WheelMateDrive logo loading screen through `app/loading.tsx`.
- Header now uses the WheelMateDrive shield-and-steering-wheel logo.
- Removed unused `@hookform/resolvers` and `react-hook-form` packages that caused the Valibot peer dependency conflict.

## Install
Delete old generated dependency files before using this package:

```powershell
rmdir /s /q node_modules
del package-lock.json
npm cache verify
npm install
npm run dev
```

The project intentionally ships without `node_modules`, `.next`, or secret environment files.
