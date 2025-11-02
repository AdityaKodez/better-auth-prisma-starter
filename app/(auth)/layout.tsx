import Image from "next/image"
import type React from "react"

export default function AuthLayout({
    children
}:{
    children: React.ReactNode
}) {
    return(
        <div className="min-h-full flex w-full">
          <div className="flex-1 flex items-center justify-center py-4">
            {children}
          </div>
          <div className="hidden lg:flex flex-1 bg-background items-center justify-center">
  <div className="relative w-full h-full">
    <Image
      src="/nice.jpg"
      alt="auth"
      fill
      priority
      className="object-cover"
    />
  </div>
</div>

      </div>
    )
}