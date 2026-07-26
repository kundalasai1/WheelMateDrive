import Link from "next/link";
const links=[["/admin/dashboard","Overview"],["/admin/bookings","Bookings"],["/admin/dispatch","Dispatch"],["/admin/drivers","Drivers"],["/admin/pricing","Pricing"],["/admin/analytics","Analytics"],["/admin/reviews","Reviews"]] as const;
export function AdminNav(){return <nav className="admin-nav" aria-label="Admin navigation">{links.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav>}
