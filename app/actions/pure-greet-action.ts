"use server";

import { z } from "zod";

const inputSchema = z.object({
  name: z.string().min(1),
});

export async function greetAction(rawInput: unknown) {
  const parsed = inputSchema.safeParse(rawInput);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const { name } = parsed.data;

  console.log(__dirname);
  return {
    message: `Hello, ${name}, from ${__dirname}!`,
  };
}
