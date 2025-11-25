import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const submissionId = await ctx.db.insert("submissions", {
      text: args.text,
      status: "pending",
      createdAt: Date.now(),
    });
    return submissionId;
  },
});

export const get = query({
  args: {
    id: v.id("submissions"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("submissions"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const complete = mutation({
  args: {
    id: v.id("submissions"),
    result: v.object({
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
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "completed",
      result: args.result,
      completedAt: Date.now(),
    });
  },
});

export const fail = mutation({
  args: {
    id: v.id("submissions"),
    error: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "failed",
      error: args.error,
      completedAt: Date.now(),
    });
  },
});
