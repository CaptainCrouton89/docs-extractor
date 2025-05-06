import { tool } from "ai";
import { z } from "zod";
import { extractDocumentation } from "./execution.js";

export const extractDocsTool = tool({
  description: "Get the documentation for one or more given links",
  parameters: z.object({
    documentationFocus: z
      .string()
      .optional()
      .describe(
        "A short description of the focus of the documentation to extract"
      ),
    links: z.array(z.string()),
    includeReasoning: z
      .boolean()
      .optional()
      .describe("Whether to include the reasoning in the response"),
  }),
  execute: async ({ links, documentationFocus, includeReasoning }) => {
    return await extractDocumentation({
      links,
      documentationFocus,
      includeReasoning,
    });
  },
});
