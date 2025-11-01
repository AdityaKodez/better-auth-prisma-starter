import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
export const useGetForms = () => {
    const trpc = useTRPC();
    return useQuery(trpc.DashboardRoute.getForms.queryOptions())
  }
  