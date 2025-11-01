"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { EyeIcon, MailIcon } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      })

      if (result.error) {
        setError(result.error.message || "Failed to sign in")
        return
      }

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("[v0] Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true)
    setError(null)

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      })
    } catch (err) {
      setError("Failed to sign in with Google")
      console.error("[v0] Google sign in error:", err)
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-10 h-10">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-normal text-center">Welcome back</h1>

      {/* Google Sign In */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-14 text-base rounded-full border-gray-200 hover:bg-gray-50 bg-transparent"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign in with Google
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                <InputGroup className="h-14 rounded-full bg-gray-50 border-0 text-base">
                  <InputGroupAddon>
                  <MailIcon className="w-4 h-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="email"
                    placeholder="Enter Your Password"
                    className="focus:border-0 focus:ring-0 focus:outline-none focus:shadow-none focus:ring-offset-0"
                    {...field}
                  />
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputGroup className="h-14 rounded-full bg-gray-50 border-0 text-base">
                  <InputGroupAddon>
                  <EyeIcon className="w-4 h-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="password"
                    placeholder="Enter Your Password"
                    className="focus:border-0 focus:ring-0 focus:outline-none focus:shadow-none focus:ring-offset-0"
                    {...field}
                  />
                  </InputGroup>
                 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <div className="text-sm text-red-600 text-center">{error}</div>}

          <Button
            type="submit"
            className="w-full h-14 text-base rounded-full bg-black hover:bg-black/90"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Continue"}
          </Button>
        </form>
      </Form>

      {/* Terms */}
      <p className="text-sm text-gray-500 text-center">
        By proceeding, you accept the{" "}
        <a href="/terms" className="underline">
          Terms
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
      </p>

      {/* Signup Link */}
      <p className="text-sm text-center">
        Don't have an account?{" "}
        <a href="/signup" className="underline font-medium">
          Sign up
        </a>
      </p>
    </div>
  )
}
