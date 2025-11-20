"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

const inputSchema = z.object({
  name: z.string().min(1),
});

export const greetAction = actionClient.inputSchema(inputSchema).action(async ({ parsedInput: { name } }) => {
  console.log(__dirname);
  return {
    message: `Hello, ${name}, from ${__dirname}!`,
  };
});
