import { createSafeActionClient } from "next-safe-action";
import { checkBotId } from "botid/server";
import { headers } from "next/headers";
import { aj } from "@/lib/arcjet";

export const actionClient = createSafeActionClient()
  .use(async ({ next }) => {
    // 1. Check BotID status before the action runs
    const verification = await checkBotId();

    // 2. If it's a bot, throw an error or return a specific failure
    if (verification.isBot) {
      throw new Error("Bot detected. Access denied.");
    }

    // 3. If human, continue to the actual action
    return next();
  })
  .use(async ({ next }) => {
    const req = new Request("https://maturagrade.com", { headers: await headers() });

    // Deduct 5 tokens (or 1, depending on how 'expensive' grading is)
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      // You can return a specific error message or handling object
      if (decision.reason.isRateLimit()) {
        throw new Error("Przekroczono limit zapytań. Spróbuj ponownie za chwilę.");
      }
      throw new Error("Request blocked for security reasons.");
    }

    if (decision.ip.isHosting()) {
      throw new Error("Forbidden");
    }

    return next();
  });
