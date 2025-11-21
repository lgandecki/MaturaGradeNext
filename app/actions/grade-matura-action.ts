"use server";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { gradeMatura } from "./helpers/grade-matura";

const inputSchema = z.object({
  text: z.string().min(200).max(10000),
});

export const gradeMaturaAction = actionClient.inputSchema(inputSchema).action(async ({ parsedInput: { text } }) => {
  return gradeMatura(text);
});
