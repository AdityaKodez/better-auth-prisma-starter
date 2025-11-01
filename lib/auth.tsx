import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./prisma"
import { emailOTP } from "better-auth/plugins"
import { Resend } from "resend"
import AuthenticationEmail from "@/components/resend/verify-email"

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || "onboarding@resend.dev",
          to: email,
          subject: type === "sign-in" ? "Sign in to your account" : "Verify your email",
           react:AuthenticationEmail({
            userEmail : email,
            verificationCode:otp,
            
           })
        })
      },
    }),
  ],
})
