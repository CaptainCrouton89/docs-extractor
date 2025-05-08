import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import systemPrompt from "../../system.prompt.js";
import { firecrawlTool } from "../firecrawl.js";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractDocumentation(options: {
  links: string[];
  documentationFocus?: string;
  includeReasoning?: boolean;
}): Promise<string> {
  const { links, documentationFocus, includeReasoning } = options;

  const prompt = `Extract the documentation for the following links: ${links.join(
    ", "
  )}${documentationFocus ? ` with a focus on ${documentationFocus}` : ""}`;

  const { text } = await generateText({
    model: openai("gpt-4.1"),
    temperature: 0,
    maxTokens: 32768,
    system: systemPrompt,
    prompt: prompt,
    tools: {
      getMarkdownFromLinks: firecrawlTool,
    },
    maxSteps: 10,
  });

  let documentation = includeReasoning
    ? text
    : `<documentation>${
        text.match(/<documentation>([\s\S]*?)<\/documentation>/)?.[1]
      }</documentation>`;

  if (!documentation) {
    throw new Error("No documentation found");
  }

  return documentation;
}
