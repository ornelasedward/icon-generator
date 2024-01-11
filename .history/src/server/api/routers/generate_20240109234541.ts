import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const generateRouter = createTRPCRouter({
    generateIcon: protectedProcedure.input(
        z.object({
            prompt: z.string(),
        })
    )
    .mutation(({ctx, input}) => {
        console.log(`we are here`, input.prompt);

        //TODO: verify user has enough credits to generate icon
        ctx.prisma.user.updateMany({
            where: {
                id: 1,
                credits: {
                    gte: 1,
                }
            },
        });
        return {
            message: 'success',
        }
    }),
});
