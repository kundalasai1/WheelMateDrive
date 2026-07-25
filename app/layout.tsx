import type {Metadata, Viewport} from "next";
import "./globals.css";
import {Inter, Manrope} from "next/font/google";
import {PwaManager} from "@/components/pwa/pwa-manager";
import {Header} from "@/components/layout/header";
import {Footer} from "@/components/layout/footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {default: "WheelMateDrive — Verified Drivers for Your Car", template: "%s | WheelMateDrive"},
  description: "Book a trusted professional driver for your own car.",
  manifest: "/manifest.webmanifest",
};

const inter=Inter({subsets:["latin"],variable:"--font-body",display:"swap"});
const manrope=Manrope({subsets:["latin"],variable:"--font-heading",display:"swap"});

export const viewport: Viewport = {themeColor: "#071e3d", width: "device-width", initialScale: 1};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${manrope.variable}`}><body><a href="#main" className="sr-only focus:not-sr-only">Skip to content</a><Header/><main id="main"><PwaManager/>{children}</main><Footer/></body></html>;
}
