import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAI from "openai"; // Updated import
import { env } from "~/env.mjs";

const openai = new OpenAI({
    apiKey: env.DALLE_API_KEY
});

async function generateIcon(prompt: string): Promise<string | undefined> {
    if (env.MOCK_DALLE === 'true') {
        return 'https://picsum.photos/seed/1/200/300';
    } else {
        const response = await openai.images.generate({
            prompt: prompt,
        });
        
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

        const url = await generateIcon(input.prompt); // Updated to match the new response structure

        return {
           imageUrl: url,
        }
    }),
});
