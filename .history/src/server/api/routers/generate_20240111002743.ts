import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import { env } from "~/env.mjs";

const configuration = new OpenAI({
  apiKey: env.DALLE_API_KEY,
});

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure.input(
    z.object({
      prompt: z.string(),
    })
  )
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: 1,
          },
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You do not have enough credits to generate an icon.",
        });
      }

      // Make a fetch request to the DALL·E API (OpenAI)
      const response = await configuration.images.create({
        prompt: input.prompt,
        n: 1,
        size: "1024x1024",
      });

      const url = response.data[0]?.url;

      return {
        imageUrl: url,
      };
    }),
});
