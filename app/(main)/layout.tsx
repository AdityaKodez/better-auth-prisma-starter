import AppSidebar from "@/components/app-sidebar";
import { Sideheader } from "@/components/side-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
children
}:{children : React.ReactNode}) {
return(
    <>
    <SidebarProvider>
    <AppSidebar/>
    <SidebarInset>
    <Sideheader/>
    <main className="w-full">
    {children}
    </main>
    </SidebarInset>
    </SidebarProvider>
    </>
)
}