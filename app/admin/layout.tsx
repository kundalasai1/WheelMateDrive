import {AdminNav} from "@/components/admin/admin-nav";
export default function AdminLayout({children}:{children:React.ReactNode}){return <div className="admin-shell"><AdminNav/>{children}</div>}
