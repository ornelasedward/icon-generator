import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
const { Configuration , OpenAI } = require("openai");
const Configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAI(configuration);
const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "This is a test",
    temperature: 0,
    max_tokens: 7,
})


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

        return {
            message: 'success',
        }
    }),
});
