import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const generateRouter = createTRPCRouter({
    generateIcon: publicProcedure.input(
        z.object({
            prompt: z.string(),
        })
    )
});
