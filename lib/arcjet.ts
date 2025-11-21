import arcjet, { detectBot, tokenBucket } from "@arcjet/next";

if (!process.env.ARCJET_KEY) {
  throw new Error("ARCJET_KEY is not set");
}
// Create the Arcjet instance outside of the request handler
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
    tokenBucket({
      mode: "LIVE",
      characteristics: ["ip.src"],
      refillRate: 5,
      interval: 120, // Refill 5 requests every 120 seconds
      capacity: 5, // Allow a burst of 5 requests
    }),
  ],
});
