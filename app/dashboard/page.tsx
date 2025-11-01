import { requireAuth } from "@/lib/auth-utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SignOutButton } from "@/components/auth/sign-out-button"
import { CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function Dashboard() {
  const session = await requireAuth()
  const user = session?.user
  const getInitials = (name?: string | null, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    return email?.slice(0, 2).toUpperCase() || "U"
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
              <CardTitle>Authentication Status</CardTitle>
              </div>
            <SignOutButton />
            </div>
            <CardDescription>Your current session information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <Avatar className="size-12 ">
                <AvatarImage src={user?.image || undefined} alt={user?.name || user?.email || ""} />
                <AvatarFallback className="text-base">{getInitials(user?.name, user?.email)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{user?.name || "User"}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <Badge variant="outline" className="gap-1">
                <div className="size-2 rounded-full bg-green-600 dark:bg-green-400" />
                Authenticated
              </Badge>
            </div>

            {/* Session Info */}
            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Session ID</span>
                <span className="font-mono text-xs">{session?.session?.id?.slice(0, 8)}...</span>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}
