import {requireUser} from "@/lib/auth/session";import {CustomerNav} from "@/components/customer/customer-nav";
export default async function Layout({children}:{children:React.ReactNode}){await requireUser(["customer"]);return <div className="container customer-shell"><CustomerNav/><div className="customer-content">{children}</div></div>}
