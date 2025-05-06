# MCP Docs Extractor

A tool that extracts and summarizes documentation from web links for AI consumption.

## Features

- Extract and summarize documentation from web URLs
- Intelligently crawl related pages within the same domain for comprehensive documentation
- Convert web content into AI-optimized markdown
- Remove unnecessary content like ads, navigation menus, etc.
- Produce concise, well-structured documentation
- Focus on relevant information based on user query

## Installation

```bash
# As an MCP server
npm install -g @r-mcp/docs-extractor

# For programmatic usage in your project
npm install @r-mcp/docs-extractor
```

If you haven't globally defined your OPENAI_API_KEY and FIRECRAWL_API_KEY, you'll need to open the MCP config file and update the keys.

```
OPENAI_API_KEY=your_openai_api_key
FIRECRAWL_API_KEY=your_firecrawl_api_key
```

## Usage

### MCP Tool Usage

This tool is designed to be used with Claude or other AI systems that support MCP.

In Claude, you can extract documentation by calling:

```
{{mcp_docs-extractor_get-documentation}}
```

With the parameters:

```json
{
  "links": ["https://example.com/docs"]
}
```

### Programmatic Usage

You can use this tool programmatically in your JavaScript/TypeScript projects in multiple ways:

#### Direct Function (Recommended)

The simplest approach is to use the default export:

```typescript
import extractDocumentation from "@r-mcp/docs-extractor";

async function example() {
  try {
    // Extract documentation from URLs
    const documentation = await extractDocumentation({
      links: ["https://example.com/docs"],
      documentationFocus: "API endpoints", // optional
      includeReasoning: false, // optional
    });

    console.log(documentation);
  } catch (error) {
    console.error("Error extracting documentation:", error);
  }
}

example();
```

#### Using as a Tool with AI SDK

If you're already using the `ai` SDK:

```typescript
import { generateText } from "ai";
import { docExtractorTool } from "@r-mcp/docs-extractor";

const { text } = await generateText({
  model: openai("gpt-4.1"),
  temperature: 0,
  prompt: "Explain the documentation for example.com",
  tools: {
    getDocumentation: docExtractorTool,
  },
  maxSteps: 5,
});
```

### Advanced Options

You can also specify a focus for the documentation:

```typescript
const documentation = await extractDocumentation({
  links: ["https://example.com/docs"],
  documentationFocus: "API endpoints",
});
```

To include the reasoning process in the result:

```typescript
const documentation = await extractDocumentation({
  links: ["https://example.com/docs"],
  includeReasoning: true,
});
```

## How It Works

The tool uses:

- FireCrawl to scrape web content
- OpenAI's GPT-4.1 to format and optimize the content
- MCP to integrate with Claude and other AI systems

When called, the tool:

1. Receives links to documentation
2. Uses FireCrawl to retrieve content from those links
3. Intelligently discovers and crawls related pages within the same domain to gather comprehensive documentation
4. Processes the content through GPT-4.1 to extract and format relevant information
5. Returns well-structured documentation in markdown format

## License

MIT

```

```
