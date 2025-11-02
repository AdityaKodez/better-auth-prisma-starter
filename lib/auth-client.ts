'use client'

import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"

// Use current origin for client-side, fallback to env or localhost
const baseURL = 
  typeof window !== 'undefined' 
    ? window.location.origin 
    : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")

export const authClient = createAuthClient({
  baseURL,
  plugins: [emailOTPClient()],
})

export const { signIn, signUp, signOut, useSession } = authClient
