
import { requireAuth } from "@/lib/auth-utils"
export default async function Dashboard() {
 await requireAuth();
  return (
   <div>
    Dashboard
   </div>
  )
}
