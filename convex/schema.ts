import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  submissions: defineTable({
    // Input
    text: v.string(),

    // Ownership
    sessionId: v.optional(v.string()), // UUID for anonymous users
    userId: v.optional(v.id("users")), // For logged-in users

    // Status
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),

    // Timestamps
    createdAt: v.number(),
    completedAt: v.optional(v.number()),

    // Error (if failed)
    error: v.optional(v.string()),

    // Result (when completed)
    result: v.optional(
      v.object({
        totalScore: v.number(),
        criteria: v.object({
          formalRequirements: v.object({
            points: v.number(),
            reasons: v.object({
              cardinalError: v.boolean(),
              missingReading: v.boolean(),
              irrelevant: v.boolean(),
              notArgumentative: v.boolean(),
            }),
          }),
          literaryCompetencies: v.object({
            points: v.number(),
            factualErrors: v.number(),
          }),
          structure: v.object({ points: v.number() }),
          coherence: v.object({
            points: v.number(),
            coherenceErrors: v.number(),
          }),
          style: v.object({ points: v.number() }),
          language: v.object({
            points: v.number(),
            languageErrors: v.number(),
          }),
          spelling: v.object({
            points: v.number(),
            spellingErrors: v.number(),
          }),
          punctuation: v.object({
            points: v.number(),
            punctuationErrors: v.number(),
          }),
        }),
        feedback: v.string(),
        errors: v.array(v.string()),
        suggestions: v.array(v.string()),
      })
    ),
  })
    .index("by_sessionId", ["sessionId"])
    .index("by_userId", ["userId"]),
});
