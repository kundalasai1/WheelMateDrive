import {requireUser} from "@/lib/auth/session";
import {LogoutButton} from "@/components/auth/logout-button";
import {connectDB} from "@/lib/db/mongoose";
import {BookingModel} from "@/models/Booking";
import {DriverProfileModel} from "@/models/DriverProfile";
import {UserModel} from "@/models/User";

export default async function Page(){
  const user=await requireUser(["admin","operations","support"]);
  let metrics={bookings:128,drivers:34,pendingKyc:6,customers:412};
  let databaseConnected=false;
  if(!user.isDemo){
    try{
      await connectDB();
      const [bookings,drivers,pendingKyc,customers]=await Promise.all([BookingModel.countDocuments(),DriverProfileModel.countDocuments(),DriverProfileModel.countDocuments({kycStatus:{$in:["submitted","under_review"]}}),UserModel.countDocuments({role:"customer"})]);
      metrics={bookings,drivers,pendingKyc,customers};databaseConnected=true;
    }catch(error){console.error("Admin dashboard database error",error)}
  }
  const demo=user.isDemo||!databaseConnected;
  return <main className="container section">
    {demo&&<div className="demo-mode-banner"><strong>Demo administrator mode</strong><span>Showing safe sample data. Connect MongoDB and use a database admin account for live operations.</span></div>}
    <div className="portal-head"><div><p className="eyebrow">ADMINISTRATION</p><h1>Operations dashboard</h1><p className="muted">Authenticated as {user.role}: {user.email}</p></div><LogoutButton/></div>
    <div className="metric-grid"><article className="metric"><span>Bookings</span><strong>{metrics.bookings}</strong></article><article className="metric"><span>Drivers</span><strong>{metrics.drivers}</strong></article><article className="metric"><span>KYC queue</span><strong>{metrics.pendingKyc}</strong></article><article className="metric"><span>Customers</span><strong>{metrics.customers}</strong></article></div>
    <div className="grid-3"><article className="card portal-card"><h2>Driver operations</h2><p className="muted">Review KYC and driver readiness.</p><a className="btn btn-primary" href="/admin/drivers">Manage drivers</a></article><article className="card portal-card"><h2>Bookings</h2><p className="muted">Assign drivers and manage trip status.</p><a className="btn btn-secondary" href="/admin/bookings">Open bookings</a></article><article className="card portal-card"><h2>Analytics</h2><p className="muted">Track revenue and operational performance.</p><a className="btn btn-secondary" href="/admin/analytics">View analytics</a></article></div>
  </main>;
}
