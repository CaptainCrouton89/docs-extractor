#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Export tools for npm package usage
export { default as systemPrompt } from "./system.prompt.js";
export { extractDocumentation } from "./tools/extractDocs/execution.js";
export { extractDocsTool } from "./tools/extractDocs/tool.js";
export { firecrawlTool } from "./tools/firecrawl.js";

// Default export for convenience
import { extractDocumentation as extractDocs } from "./tools/extractDocs/execution.js";
export default extractDocs;

// Install with npm install @mendable/firecrawl-js
import { extractDocumentation } from "./tools/extractDocs/execution.js";
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
    const documentation = await extractDocumentation({
      links,
      documentationFocus,
      includeReasoning,
    });

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

// Start the server only if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
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
}
