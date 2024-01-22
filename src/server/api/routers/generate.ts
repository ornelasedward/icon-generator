import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import { env } from "~/env.mjs";
import { b64Image } from "~/data/b64Image";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: env.ACCESS_KEY_ID,
        secretAccessKey: env.SECRET_ACCESS_KEY,
    },
    region: "us-east-1",
})

const BUCKET_NAME = 'dalle-icon-generator-app';

const openai = new OpenAI({
    apiKey: env.DALLE_API_KEY
});

async function generateIcon(prompt: string): Promise<string | undefined> {
    if (env.MOCK_DALLE_API === "true") {
        return b64Image;
    } else {
        const response = await openai.images.generate({
            prompt: prompt,
            response_format: 'b64_json'
        });
        return response.data?.[0]?.b64_json;
    }
}

export const generateRouter = createTRPCRouter({
    generateIcon: protectedProcedure.input(
        z.object({
            prompt: z.string(),
            color: z.string(),
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
        
        const finalPrompt = `Craft a premium-quality, text-free logo that exemplifies minimalism and modern design aesthetics. The logo should be constructed from high-contrast, abstract geometric shapes or elegant letterforms that intuitively suggest the theme of ${input.prompt}, without the use of any words or letters. It should be striking in ${input.color}, and crafted with the precision necessary for scalable vector graphics (SVG) format. The final design should be easily identifiable, reflecting a startup’s commitment to simplicity, elegance, and innovation.`;

        const base64EncodedImage = await generateIcon(finalPrompt);

        const icon = await ctx.prisma.icon.create({
            data: {
                prompt: input.prompt,
                userId: ctx.session.user.id,
            },
        });

        // TODO: Save the generated image to the s3 bucket
        try {
            await s3.putObject({
                Bucket: BUCKET_NAME,
                Body: Buffer.from(base64EncodedImage!, "base64"),
                Key: icon.id,
                ContentEncoding: 'base64',
                ContentType: 'image/gif',
            }).promise();
        } catch (error) {
            console.error("Error uploading to S3:", error);
            // Handle the error appropriately
        }
        
        return {
           imageUrl: `https://${BUCKET_NAME}.s3.us-east-2.amazonaws.com/${icon.id}`,
        }
    }),
});
