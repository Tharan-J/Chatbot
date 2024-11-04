import { streamText, convertToCoreMessages, generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.apiKey,
});

export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google("gemini-1.5-flash"),
    messages: convertToCoreMessages(messages),
    system: "You are ",
  });

  return result.toDataStreamResponse();
}