import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const generateRouter = createTRPCRouter({
    generateIcon: protectedProcedure.input(
        z.object({
            prompt: z.string(),
        })
    )
    .mutation(async ({ctx, input}) => {
        const result = await ctx.prisma.user.updateMany({
            where: {
                id: ctx.session.user.id,
                credits:
            },
            data: {
            }
        });
        return {
            message: 'success',
        }
    }),
});
