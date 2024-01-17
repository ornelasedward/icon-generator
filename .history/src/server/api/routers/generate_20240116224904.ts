import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import { env } from "~/env.mjs";

const openai = new OpenAI({
    apiKey: env.DALLE_API_KEY
});

// Function to check if MOCK_DALLE_API is true and return mock URL
async function generateIcon(prompt: string): Promise<string> {
    if (env.MOCK_DALLE_API === 'true') {
        return 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-HktVRlV6WKIU0gg12LNod9Sk/user-jeXW3dut9v8l8b7wwDkG4vDE/img-S8HMWjZ6jiTZDVz7frTVUG3B.png?st=2024-01-17T02%3A58%3A14Z&se=2024-01-17T04%3A58%3A14Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-16T17%3A18%3A45Z&ske=2024-01-17T17%3A18%3A45Z&sks=b&skv=2021-08-06&sig=iDxZAQx1sNCpXNeQmjKEJRztIWNl6LSsY9/9YWFAUMs%3D';
    } else {
        const response = await openai.images.generate({
            prompt: prompt,
        });
        return response.data;
    }
}
