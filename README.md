# MCP Docs Extractor

A [Model Context Protocol](https://modelcontextprotocol.github.io/) tool that extracts documentation from web links.

## Features

- Extract and summarize documentation from web URLs
- Convert web content into AI-optimized markdown
- Remove unnecessary content like ads, navigation menus, etc.
- Produce concise, well-structured documentation

## Installation

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Install the server locally
pnpm install-server
```

### Env Variables

Add the following env variables to your mcp config file:

```
OPENAI_API_KEY=your_openai_api_key
FIRECRAWL_API_KEY=your_firecrawl_api_key
```

## Usage

This tool is designed to be used with Claude or other AI systems that support MCP.

In Claude, you can extract documentation by calling:

```
{{mcp_docs-extractor_get-documentation}}
```

With the parameter:

```
{
  "links": ["https://example.com/docs"]
}
```

## How It Works

The tool uses:

- FireCrawl to scrape web content
- OpenAI's GPT-4.1 to format and optimize the content (this is where the magic happens)
- MCP to integrate with Claude and other AI systems
