import { prisma } from "@/lib/prisma";
import { router, authenticatedProcedure } from "../init";
import { z } from "zod";
import { generateSlug } from "random-word-slugs";

export const appRouter = router({
  create: authenticatedProcedure.input(z.object({ 
    name: z.string(),
    description: z.string(),
  }))
    .mutation(async ({ input , ctx }) => {
       return await prisma.form.create({
      
        data:{
            name: input.name || generateSlug(2),
            description: input.description ?? "",
            userId: ctx.session.userId,
        }
       })
    }),

 getAll: authenticatedProcedure.query(async ({ ctx }) => {
    return await prisma.form.findMany({ 
      where: {
         userId: ctx.session.userId,
      }
    })
  }),

  delete: authenticatedProcedure.input(z.object({
    id: z.string(),
  })).mutation(async ({ input, ctx }) => {
    return await prisma.form.delete({
      where: {
        id: input.id,
        userId: ctx.session.userId,
      }
    })
  }),
});

export type AppRouter = typeof appRouter;
