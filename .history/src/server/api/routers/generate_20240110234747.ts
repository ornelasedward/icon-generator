import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const generateRouter = createTRPCRouter({
    generateIcon: protectedProcedure.input(
        z.object({
            prompt: z.string(),
        })
    )
    .mutation(async ({ctx, input}) => {
        const {count} result = await ctx.prisma.user.updateMany({
            where: {
                id: ctx.session.user.id,
                credits: {
                    gte: 1,
                }
            },
            data: {
                credits: {
                    decrement: 1,
                }
            }
        });

        if (count <= 0) {
            return {
                message: 'no credits',
            }
        }

        console.log(result);

        return {
            message: 'success',
        }
    }),
});
