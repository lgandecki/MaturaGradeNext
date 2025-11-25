"use server";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { after } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { gradeMatura } from "./helpers/grade-matura";

const inputSchema = z.object({
  text: z.string().min(200).max(10000),
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const gradeMaturaAction = actionClient.inputSchema(inputSchema).action(async ({ parsedInput: { text } }) => {
  // 1. Create submission in Convex immediately
  const submissionId = await convex.mutation(api.submissions.create, { text });

  // 2. Schedule background grading (runs after response is sent)
  after(async () => {
    try {
      // Update status to processing
      await convex.mutation(api.submissions.updateStatus, {
        id: submissionId,
        status: "processing",
      });

      // Run the actual grading
      const { gradingResult } = await gradeMatura(text);

      // Store the result
      await convex.mutation(api.submissions.complete, {
        id: submissionId,
        result: gradingResult,
      });
    } catch (error) {
      // Mark as failed
      await convex.mutation(api.submissions.fail, {
        id: submissionId,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // 3. Return submission ID immediately (doesn't wait for grading)
  return { submissionId };
});
