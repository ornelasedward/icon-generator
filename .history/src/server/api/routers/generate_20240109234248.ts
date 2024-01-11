import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const generateRouter = createTRPCRouter({
    generateIcon: publicProcedure.input(
        z.object({
            prompt: z.string(),
        })
    )
    .mutation(({ctx, input}) => {
        console.log(`we are here`, input.prompt);

        //TODO: verify user has enough credits to generate icon
        return {
            message: 'success',
        }
    }),
});
