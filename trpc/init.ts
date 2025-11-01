import { cache } from "react";
import superjson from "superjson";
import { TRPCError, initTRPC } from "@trpc/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return {
    session,
    user: session?.user,
  };
});

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
export const authenticatedProcedure = t.procedure.use(async (opts) => {
  if (!opts.ctx.user || !opts.ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }
  return opts.next({
    ctx: {
      user: opts.ctx.user,
      session: opts.ctx.session,
    },
  });
});
