import { z } from "zod";
export const gradingResultSchema = z.object({
  totalScore: z.number(),
  maxTotalScore: z.number(),
  criteria: z.object({
    formalRequirements: z.object({
      points: z.number(),
      reasons: z.object({
        cardinalError: z.boolean(),
        missingReading: z.boolean(),
        irrelevant: z.boolean(),
        notArgumentative: z.boolean(),
      }),
    }),
    literaryCompetencies: z.object({
      points: z.number(),
      maxPoints: z.number(),
      factualErrors: z.number(),
    }),
    structure: z.object({
      points: z.number(),
      maxPoints: z.number(),
    }),
    coherence: z.object({
      points: z.number(),
      maxPoints: z.number(),
      coherenceErrors: z.number(),
    }),
    style: z.object({
      points: z.number(),
      maxPoints: z.number(),
    }),
    language: z.object({
      points: z.number(),
      maxPoints: z.number(),
      languageErrors: z.number(),
    }),
    spelling: z.object({
      points: z.number(),
      maxPoints: z.number(),
      spellingErrors: z.number(),
    }),
    punctuation: z.object({
      points: z.number(),
      maxPoints: z.number(),
      punctuationErrors: z.number(),
    }),
  }),
  feedback: z.string(),
  errors: z.array(z.string()),
  suggestions: z.array(z.string()),
});

export type GradingResult = z.infer<typeof gradingResultSchema>;
