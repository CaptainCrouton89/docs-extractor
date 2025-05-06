#!/usr/bin/env node

import { createOpenAI } from "@ai-sdk/openai";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { generateText } from "ai";
import { z } from "zod";

// Install with npm install @mendable/firecrawl-js
import systemPrompt from "./system.prompt.js";
import { firecrawlTool } from "./tools/firecrawl.js";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// Create the MCP server
const server = new McpServer({
  name: "docs-extractor",
  version: "1.0.0",
});

// Tool: Store conversation with embeddings
server.tool(
  "get-documentation",
  "Get the documentation for one or more given links",
  {
    documentationFocus: z
      .string()
      .optional()
      .describe(
        "A short description of the focus of the documentation to extract"
      ),
    links: z
      .array(z.string())
      .describe("The links to get the documentation for"),
    includeReasoning: z
      .boolean()
      .optional()
      .describe("Whether to include the reasoning in the response"),
  },
  async ({ links, documentationFocus, includeReasoning }) => {
    const prompt = `Extract the documentation for the following links: ${links.join(
      ", "
    )}${documentationFocus ? ` with a focus on ${documentationFocus}` : ""}`;

    const { text } = await generateText({
      model: openai("gpt-4.1"),
      temperature: 0,
      maxTokens: 10000,
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

    return {
      content: [
        {
          type: "text",
          text: documentation,
        },
      ],
    };
  }
);

// Start the server
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP Documentation Extractor running...");
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

main().catch(console.error);
