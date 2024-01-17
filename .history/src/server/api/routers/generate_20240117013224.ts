import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import { env } from "~/env.mjs";

const openai = new OpenAI({
    apiKey: env.DALLE_API_KEY
});

async function generateIcon(prompt: string): Promise<string> {
    if (env.MOCK_DALLE_API === 'true') {
        // Return the mock URL when MOCK_DALLE_API is set to "true"
        return 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-HktVRlV6WKIU0gg12LNod9Sk/user-jeXW3dut9v8l8b7wwDkG4vDE/img-S8HMWjZ6jiTZDVz7frTVUG3B.png...';
    } else {
        // Only call the OpenAI API when MOCK_DALLE_API is not set to "true"
        const response = await openai.images.generate({
            prompt: prompt,
        });
        // Make sure you are handling the response correctly, and it returns a string URL
        return response.data?.[0]?.url ?? undefined;
    }
}

export const generateRouter = createTRPCRouter({
    generateIcon: protectedProcedure.input(
        z.object({
            prompt: z.string(),
        })
    )
    .mutation(async ({ctx, input}) => {
        const {count} = await ctx.prisma.user.updateMany({
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
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'You do not have enough credits to generate an icon.',
            });
        }

        const url = await generateIcon(input.prompt);

        return {
           imageUrl: url,
        }
    }),
});
