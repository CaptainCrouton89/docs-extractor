import { tool } from "ai";
import { z } from "zod";

// Install with npm install @mendable/firecrawl-js
import FireCrawlApp from "@mendable/firecrawl-js";
import { ScrapeResponse } from "firecrawl";

export const firecrawlTool = tool({
  description: "Get the markdown for a given link",
  parameters: z.object({
    links: z.array(z.string()).describe("The links to get the markdown for"),
  }),
  execute: async ({ links }) => {
    const app = new FireCrawlApp({
      apiKey: process.env.FIRECRAWL_API_KEY,
    });
    const scrapeResults = await Promise.all(
      links.map(
        (link) =>
          app.scrapeUrl(link, {
            formats: ["markdown"],
          }) as Promise<ScrapeResponse>
      )
    );

    if (scrapeResults.some((result) => result.success)) {
      return scrapeResults.map((result) => result.markdown);
    } else {
      return scrapeResults.map((result) => result.error);
    }
  },
});
