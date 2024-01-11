import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAIApi from "openai"
import Configuration from "openai";
import { env } from "~/env.mjs"

const configuration = new Configuration({
    apiKey: env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);


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

        // TODO: make fetch request to the Dalle API
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "This is a test",
            temperature: 0,
            max_tokens: 7,
        })

        return {
            message: 'success',
        }
    }),
});
