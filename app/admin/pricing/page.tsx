import {requireUser} from "@/lib/auth/session";
import {PricingManager} from "@/components/admin/pricing-manager";
export default async function PricingPage(){const user=await requireUser(["admin"]);return <main className="container section"><p className="eyebrow">PRICING CONTROL</p><h1 className="admin-title">Admin-manageable fares</h1><p className="muted admin-lead">Define base fares, distance charges, allowances, GST, surge and availability by city and trip type. New rules apply to new estimates.</p><PricingManager demoMode={!!user.isDemo}/></main>}
