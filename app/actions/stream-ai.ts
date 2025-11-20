"use server";

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

// Optional input validation (still manual, but tiny)
const schema = z.object({ prompt: z.string().min(1) });

export async function streamAiAction(input: unknown) {
  const { prompt } = schema.parse(input); // throws on invalid

  const result = await streamText({
    model: openai("gpt-4o"),
    prompt,
  });

  // This returns a ReadableStream that Next.js knows how to stream
  return result.toTextStreamResponse();
}
