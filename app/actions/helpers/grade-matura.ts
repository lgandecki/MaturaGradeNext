import { generateObject } from "ai";
import { z } from "zod";
import officialGrading from "./prompts/official-grading.md";
import gradingSystemPrompt from "./prompts/grading-system-prompt.md";
import guardialSystemPrompt from "./prompts/guardial-system-prompt.md";
import { getCloudflareGatewayGoogleModel } from "./getCloudflareGatewayGoogleModel";

const google = getCloudflareGatewayGoogleModel();
export const gradeMatura = async (text: string) => {
  const { object: check } = await generateObject({
    model: google("gemini-3-pro-preview"),
    schema: z.object({
      pass: z.boolean(),
    }),
    system: guardialSystemPrompt,
    prompt: text,
  });
  if (check.pass) {
    const { object } = await generateObject({
      model: google("gemini-3-pro-preview"),
      schema: z.object({
        gradingResult: returnGradingSchema(),
      }),
      system: `${gradingSystemPrompt}\n${officialGrading}`,
      prompt: "Oceń poniższe wypracowanie: " + text,
    });
    return object;
  }

  throw new Error("Invalid input");
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
