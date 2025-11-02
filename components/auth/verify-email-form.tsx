"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

const verifySchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
})

type VerifyFormValues = z.infer<typeof verifySchema>

export function VerifyEmailForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      otp: "",
    },
  })

  async function onSubmit(data: VerifyFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authClient.emailOtp.verifyEmail({
        email,
        otp: data.otp,
      })

      if (result.error) {
        toast.error(result.error.message || "Something went wrong")
        setError(result.error.message || "Invalid OTP")
        return
      }

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("[v0] Verify email error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleResendOTP() {
    setIsResending(true)
    setError(null)

    try {
      const result = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      })

      if (result.error) {
        setError("Failed to resend OTP")
        return
      }

      // Show success message
      setError("OTP sent successfully!")
      setTimeout(() => setError(null), 3000)
    } catch (err) {
      setError("Failed to resend OTP")
      console.error("[v0] Resend OTP error:", err)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-10 h-10">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-normal">Verify your email</h1>
        <p className="text-muted-foreground">
          We sent a verification code to <strong>{email}</strong>
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter 6-digit code"
                    className="h-14 rounded-full bg-muted border-0 text-base text-center tracking-widest"
                    maxLength={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className={`text-sm text-center ${error.includes("success") ? "text-primary" : "text-destructive"}`}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-14 text-base rounded-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>
      </Form>

      {/* Resend */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={isResending}
          className="text-sm underline hover:no-underline disabled:opacity-50"
        >
          {isResending ? "Sending..." : "Resend code"}
        </button>
      </div>
    </div>
  )
}
