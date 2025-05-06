# MCP Docs Extractor

A [Model Context Protocol](https://modelcontextprotocol.github.io/) tool that extracts and summarizes documentation from web links for AI consumption.

## Features

- Extract and summarize documentation from web URLs
- Convert web content into AI-optimized markdown
- Remove unnecessary content like ads, navigation menus, etc.
- Produce concise, well-structured documentation
- Focus on relevant information based on user query
- Intelligently crawl related pages within the same domain for comprehensive documentation

## Installation

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Install the server locally
pnpm install-server
```

### Requirements

You'll need:

- Node.js (latest LTS recommended)
- pnpm package manager
- OpenAI API key
- FireCrawl API key

### Environment Variables

Add the following env variables to your MCP config file:

```
OPENAI_API_KEY=your_openai_api_key
FIRECRAWL_API_KEY=your_firecrawl_api_key
```

## Usage

This tool is designed to be used with Claude or other AI systems that support MCP.

### Basic Usage

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

### Advanced Options

You can also specify a focus for the documentation:

```json
{
  "links": ["https://example.com/docs"],
  "documentationFocus": "API endpoints"
}
```

To include the reasoning process in the result:

```json
{
  "links": ["https://example.com/docs"],
  "includeReasoning": true
}
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

## Development

```bash
# Run in development mode
pnpm dev

# Build for production
pnpm build
```

## License

[MIT](LICENSE)

```

```
