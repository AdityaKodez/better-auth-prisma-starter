
import { DashboardContainer, DashboardList } from "@/components/features/dashboard/dashboard";
import { requireAuth } from "@/lib/auth-utils"
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
export default async function Dashboard() {
  await requireAuth(); 
  void prefetch(trpc.getAll.queryOptions())
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardList/>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}
