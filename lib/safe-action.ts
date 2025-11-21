import { createSafeActionClient } from "next-safe-action";
import { checkBotId } from "botid/server";

export const actionClient = createSafeActionClient().use(async ({ next }) => {
  // 1. Check BotID status before the action runs
  const verification = await checkBotId();

  // 2. If it's a bot, throw an error or return a specific failure
  if (verification.isBot) {
    throw new Error("Bot detected. Access denied.");
  }

  // 3. If human, continue to the actual action
  return next();
});
