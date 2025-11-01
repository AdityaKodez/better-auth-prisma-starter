import { DashboardRoute } from "@/components/features/dashboard/routers/route";
import { router } from "../init";

export const appRouter = router({
    DashboardRoute,
});

export type AppRouter = typeof appRouter;
