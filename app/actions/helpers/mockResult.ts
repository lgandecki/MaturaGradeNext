import { ServerGradingResult } from "./grade-matura";

export const mockResult: ServerGradingResult = {
  totalScore: 10,
  criteria: {
    formalRequirements: {
      points: 1,
      reasons: { cardinalError: false, missingReading: false, irrelevant: false, notArgumentative: false },
    },
    literaryCompetencies: { points: 1, factualErrors: 0 },
    structure: { points: 1 },
    coherence: { points: 1, coherenceErrors: 0 },
    style: { points: 1 },
    language: { points: 1, languageErrors: 0 },
    spelling: { points: 1, spellingErrors: 0 },
    punctuation: { points: 1, punctuationErrors: 0 },
  },
  feedback: "Test feedback",
  errors: ["Test error"],
  suggestions: ["Test suggestion"],
};
