import { Nextjs } from "@/components/landing/svg/next-js"
import { Prisma } from "@/components/landing/svg/prisma"
import { Resend } from "@/components/landing/svg/resend"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Database, LockIcon, Mail, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-secondary via-background to-background" />

      <div className="relative max-w-6xl">
        <main className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
           
            <div className="flex flex-col gap-6">
           
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-border text-sm text-foreground/90">
                  <Zap className="w-4 h-4" />
                  Next.js
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-border text-sm text-foreground/90">
                  <Database className="w-4 h-4" />
                  Prisma ORM
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-border text-sm text-foreground/90">
                  <Mail className="w-4 h-4" />
                  Resend
                </div>
              </div>

            
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
                Authentication Made{" "}
                <span className="bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Simple & Secure
                </span>
              </h1>

             
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                A production-ready authentication starter kit built with Next.js, Prisma ORM, and Resend. Get your app
                up and running in minutes with best practices baked in.
              </p>

            
             
                <Button size="lg" className="bg-primary max-w-sm mmtext-primary-foreground hover:bg-primary/90 font-medium" asChild>
                  <Link href="/login">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
            </div>

            {/* Right Column - Feature Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Card className="bg-card/50 border-border backdrop-blur-sm p-6 hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent">
                    <Nextjs className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-card-foreground">Next.js 16</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Built on the latest Next.js with App Router, Server Actions, and React 19 features.
                </p>
              </Card>

              <Card className="bg-card/50 border-border backdrop-blur-sm p-6 hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent">
                    <Prisma className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-card-foreground">Prisma ORM</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Type-safe database access with automatic migrations and intuitive data modeling.
                </p>
              </Card>

              <Card className="bg-card/50 border-border backdrop-blur-sm p-6 hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent">
                    <Resend className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-card-foreground">Resend Email</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Beautiful transactional emails for verification, password resets, and notifications.
                </p>
              </Card>

              <Card className="bg-card/50 border-border backdrop-blur-sm p-6 hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent">
              <LockIcon className="size-4 text-accent-foreground"/>
                  </div>
                  <h3 className="font-semibold text-card-foreground">Secure by Default</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Industry-standard security with bcrypt hashing, JWT tokens, and CSRF protection.
                </p>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
