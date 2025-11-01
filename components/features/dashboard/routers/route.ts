import { authenticatedProcedure, router } from "@/trpc/init";
import { prisma } from "@/lib/prisma";
import z from "zod";

export const DashboardRoute = router({
    getForms : authenticatedProcedure.query(async ({ctx}) => {
         const forms = await prisma.form.findMany({
            where: {
                userId: ctx.user.id
            },
            select: {
                id: true,
                title: true,
                description: true,
                published: boolean,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                updatedAt: 'desc'
            }
         });
         return forms;
    }),
    getById: authenticatedProcedure.input(z.object({
        id: z.string(),
    })).query(async ({ctx, input}) => {
        const { id } = input;
        return prisma.form.findFirst({
            where: {
                id,
                userId: ctx.user.id
            }
        });
    })
});

export type dashboardRoute = typeof DashboardRoute;
