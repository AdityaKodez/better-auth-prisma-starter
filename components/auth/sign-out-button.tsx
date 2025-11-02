'use client'

import { signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SignOutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const result = await signOut()
      
      // Check for errors
      if (result?.error) {
        console.error("Sign out error:", result.error)
        // Still redirect even if there's an error
        router.push("/login")
        router.refresh()
        return
      }
      
      // Success - redirect to login
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Sign out failed:", error)
      // Still redirect on error
      router.push("/login")
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      disabled={isLoading}
      className="gap-2"
    >
      <LogOut className="size-4" />
      {isLoading ? "Signing out..." : "Sign Out"}
    </Button>
  )
}

