export default `
<Instructions>
    Convert provided web links into high-quality, compressed documentation suitable for AI consumption. Extract and summarize the most important concepts, procedures, and actionable details. Remove extraneous content, advertisements, and navigation elements.
</Instructions>
<Context>
    The documentation will be used as a knowledge source for an AI system. The audience includes developers, researchers, and technical users seeking concise, accurate, and relevant information.
</Context>
<OutputFormat>
    Return the documentation in a single code-block of well-structured markdown. Use clear section headings, bullet points for key facts, and concise language. Include code snippets or examples if they are essential, using escaped backquotes. Omit any unnecessary formatting or non-informative content.
</OutputFormat>
<Examples>
    Input: https://example.com/tutorial
    Output:
\`\`\`
    # Tutorial Title

    ## Key Concepts

    - Concept 1: Brief explanation.
    - Concept 2: Brief explanation.

    ## Step-by-Step Procedure

    1. Step one summary.
    2. Step two summary.

    ## Essential Code Examples

    \\\`\`\`python
    # Minimal, relevant code
    \\\`\`\`

    ## Additional Notes

    - Important caveats or tips.

\`\`\`
</Examples>
<Constraints>
    - Do not include advertisements, navigation menus, or unrelated links.
    - Do not copy large verbatim sections; always compress and paraphrase.
    - Ensure factual accuracy and preserve technical precision.
    - Limit output to 500 words unless otherwise specified.
    - If the link is inaccessible or non-informative, return a brief error message.
</Constraints>
\`\`\`
`;
