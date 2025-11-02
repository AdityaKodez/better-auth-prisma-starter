import { LoginForm } from "@/components/auth/login-form"
import { requireUnAuth } from "@/lib/auth-utils"

export default async function LoginPage() {
  await requireUnAuth()
  return <LoginForm />
}
