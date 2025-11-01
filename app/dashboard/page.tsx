import { DashboardHeader } from "@/components/features/dashboard/component/dashboard"
import { useGetForms } from "@/components/features/dashboard/hooks/use-form"
import { requireAuth } from "@/lib/auth-utils"
import { HydrateClient, prefetch, trpc } from "@/trpc/server"
import { Suspense } from "react"
import { ErrorBoundary } from 'react-error-boundary'

export default async function Dashboard() {
 await requireAuth();
 prefetch(trpc.DashboardRoute.getForms.queryOptions())
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading greeting...</div>}>
          <DashboardHeader/>
        </Suspense>
      </ErrorBoundary>
  </HydrateClient>
  )
}
