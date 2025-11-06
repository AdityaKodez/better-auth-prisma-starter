"use client"
import { authClient } from "@/lib/auth-client"
import { useQueryClient } from "@tanstack/react-query"
import {
    BarChartIcon,
    BlocksIcon,
    CreditCardIcon,
    FolderOpenIcon,
    HistoryIcon,
    KeyIcon,
    LogOutIcon,
    SettingsIcon,
    StarIcon,
    ToyBrick
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "./ui/sidebar"
import HomeIcon from "./logo/home-icon"

 const menuItems = [
   {
    title: "main",
    items:[
        {
            title: "Home",
            icon: HomeIcon,
            url:"/dashboard",
        },
       {
        title:"Templates",
        icon: BlocksIcon,
        url:"/templates",
       },
       {
        title:"Analytics",
        icon: BarChartIcon,
        url:"/executions",
       },
       {
        title:"Integrations",
        icon: ToyBrick,
        url:"/integrations",
       }
    ]
   }
 ]

 const AppSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
   return (
     <Sidebar collapsible="icon">
        <SidebarHeader>
        <SidebarMenuItem>
            <SidebarMenuButton asChild className={"gap-x-4 h-12 px-4"}>
                <Link href={"/"} prefetch>
                <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                <span className="font-semibold text-sm">FormZy</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        </SidebarHeader>
        <SidebarContent>
            {
                menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            {
                                group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                        tooltip={item.title} 
                                        isActive={
                                         item.url ==="/" ? pathname === item.url : pathname.startsWith(item.url)
                                        }
                                        asChild
                                        className={"gap-x-4 h-10 px-4 mb-1"}>
                                            <Link href={item.url} prefetch>
                                            <item.icon className="w-5 h-5"/>
                                            <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarGroupContent>
                        </SidebarGroup>
                ))
                          
            }
        </SidebarContent>

        <SidebarFooter>
       <SidebarSeparator/>
            <SidebarMenu>
                  <SidebarMenuButton
                tooltip={"Sign out"}
                className={"gap-x-4 h-8 px-4"}
                onClick={() => {
                    authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                router.push("/login")
                            }
                        }
                    });
                }}
                >
                    <LogOutIcon className="w-5 h-5"/>
                <span className="text-xs">Sign out</span>


                </SidebarMenuButton>
                <SidebarMenuButton className="gap-x-4 h-8 px-4">
                    <SettingsIcon className="size-4"/>
                    <span className=" text-xs">Settings</span>
                </SidebarMenuButton>
            </SidebarMenu>
        </SidebarFooter>
     </Sidebar>
   )
 }
 
 export default AppSidebar