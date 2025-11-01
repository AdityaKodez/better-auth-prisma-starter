import { VerifyEmailForm } from "@/components/auth/verify-email-form"
import { Suspense } from "react"

function VerifyEmailContent() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <VerifyEmailForm />
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gray-100 items-center justify-center">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(150, 150)">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180
              const x2 = Math.cos(angle) * 120
              const y2 = Math.sin(angle) * 120
              return <line key={i} x1="0" y1="0" x2={x2} y2={y2} stroke="black" strokeWidth="1" />
            })}
          </g>
        </svg>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
