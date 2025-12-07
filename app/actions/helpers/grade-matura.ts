import { generateObject } from "ai";
import { z } from "zod";
import officialGrading from "./prompts/official-grading.md";
import gradingSystemPrompt from "./prompts/grading-system-prompt.md";
import guardialSystemPrompt from "./prompts/guardial-system-prompt.md";
import { getCloudflareGatewayGoogleModel } from "./getCloudflareGatewayGoogleModel";
import { mockResult } from "./mockResult";

const google = getCloudflareGatewayGoogleModel();
export const gradeMatura = async (text: string): Promise<{ gradingResult: ServerGradingResult }> => {
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 30000));
    return { gradingResult: mockResult };
  }
  const { object: check } = await generateObject({
    model: google("gemini-2.5-flash-lite"),
    schema: z.object({
      pass: z.boolean(),
    }),
    system: guardialSystemPrompt,
    prompt: text,
  });
  console.log("check", check);
  if (check.pass) {
    console.log("check passed, running with gemini-3-pro-preview");
    const { object } = await generateObject({
      model: google("gemini-3-pro-preview"),
      schema: z.object({
        gradingResult: returnGradingSchema(),
      }),
      system: `${gradingSystemPrompt}\n${officialGrading}`,
      prompt: "Oceń poniższe wypracowanie: " + text,
    });
    console.log("object", object);
    return object;
  }

  throw new Error("INVALID_INPUT");
};

export function returnGradingSchema() {
  return z.object({
    totalScore: z.number().max(35).min(0),
    criteria: z.object({
      formalRequirements: z.object({
        points: z.number().min(0).max(1),
        reasons: z.object({
          cardinalError: z.boolean(),
          missingReading: z.boolean(),
          irrelevant: z.boolean(),
          notArgumentative: z.boolean(),
        }),
      }),
      literaryCompetencies: z.object({
        points: z.number().min(0).max(16),
        factualErrors: z.number(),
      }),
      structure: z.object({
        points: z.number().min(0).max(3),
      }),
      coherence: z.object({
        points: z.number().min(0).max(3),
        coherenceErrors: z.number(),
      }),
      style: z.object({
        points: z.number().min(0).max(1),
      }),
      language: z.object({
        points: z.number().min(0).max(7),
        languageErrors: z.number(),
      }),
      spelling: z.object({
        points: z.number().min(0).max(2),
        spellingErrors: z.number(),
      }),
      punctuation: z.object({
        points: z.number().min(0).max(2),
        punctuationErrors: z.number(),
      }),
    }),
    feedback: z.string(),
    errors: z.array(z.string()),
    suggestions: z.array(z.string()),
  });
}

export type ServerGradingResult = z.infer<ReturnType<typeof returnGradingSchema>>;
