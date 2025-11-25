import { ServerGradingResult } from "./actions/helpers/grade-matura";
import { GradingResult } from "./HomeClient";

export const serverGradingToUi = (serverData: ServerGradingResult): GradingResult => ({
  totalScore: serverData.totalScore,
  maxTotalScore: 35, // Hardcoded constant
  feedback: serverData.feedback,
  errors: serverData.errors,
  suggestions: serverData.suggestions,
  criteria: {
    formalRequirements: {
      ...serverData.criteria.formalRequirements,
      // Formal requirements doesn't usually have a "maxPoints" displayed in the same way,
      // but if your UI needs it, you can add it here.
    },
    literaryCompetencies: {
      ...serverData.criteria.literaryCompetencies,
      maxPoints: 16,
    },
    structure: {
      ...serverData.criteria.structure,
      maxPoints: 3,
    },
    coherence: {
      ...serverData.criteria.coherence,
      maxPoints: 3,
    },
    style: {
      ...serverData.criteria.style,
      maxPoints: 1,
    },
    language: {
      ...serverData.criteria.language,
      maxPoints: 7,
    },
    spelling: {
      ...serverData.criteria.spelling,
      maxPoints: 2,
    },
    punctuation: {
      ...serverData.criteria.punctuation,
      maxPoints: 2,
    },
  },
});
