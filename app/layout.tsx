import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { TRPCReactProvider } from "@/trpc/client"
import { Analytics } from "@vercel/analytics/next"
import {Google_Sans_Code , JetBrains_Mono} from 'next/font/google'
import "./globals.css"
import { Toaster } from "sonner"

const googleSans = Google_Sans_Code({
  subsets: ["latin"],
  variable: "--font-google-sans",
})

const jetMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-JetBrains_Mono",
})

export const metadata = {
  title: "Better Auth Starter",
  description: "Authentication starter with Better Auth, Prisma, and Neon",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${googleSans.variable} ${jetMono.variable} h-full`} suppressHydrationWarning>
      <body>
      <TRPCReactProvider>
      <ThemeProvider attribute={"class"}
      defaultTheme="light"
      >
      {children}
      </ThemeProvider>
      <Analytics />
      <Toaster/>
      </TRPCReactProvider>
        </body>
    </html>
  )
}
