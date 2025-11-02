import { SignupForm } from "@/components/auth/signup-form"
import { requireUnAuth } from "@/lib/auth-utils"

export default async function SignupPage() {
  await requireUnAuth();
  return <SignupForm />

}
