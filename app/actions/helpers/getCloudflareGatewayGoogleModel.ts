import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const getCloudflareGatewayGoogleModel = () => {
  return createGoogleGenerativeAI({
    baseURL: `https://gateway.ai.cloudflare.com/v1/${process.env.ACCOUNT_ID}/${process.env.GATEWAY_ID}/google-ai-studio/v1beta`,
    headers: {
      "cf-aig-authorization": `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      "x-goog-api-key": undefined,
    },
    apiKey: "not used",
  });
};
