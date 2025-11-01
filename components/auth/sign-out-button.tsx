'use client'

import { signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function SignOutButton() {
  const router = useRouter()
  
  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      className="gap-2"
    >
      <LogOut className="size-4" />
      Sign Out
    </Button>
  )
}

