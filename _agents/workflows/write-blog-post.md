---
description: How to write a new GenAI blog post for this project
---

When the user asks you to write a new blog post, follow this exact workflow:

### Phase 1: Planning and Structure

1. **Understand the Core Angle**: What is the hard systems problem? What are the constraints? Who are the users?
2. **Draft the Implementation Plan**: Create a task plan. The structure for case studies must strictly follow:
    - `## Problem Statement` (must include `### What this system is not` at the end of this section)
    - `## Step 0: Why GenAI?` (why traditional approaches fail, cost/value math, where determinism is enough)
    - `## Step 1: Requirements` (must group together: `### Functional requirements`, `### Non-functional requirements`, `### Scale assumptions`, `### Quality metrics`, and `### Trade-offs to acknowledge`)
    - `## Step 2: Architecture` (diagrams, components, flow)
    - `## Step 3: <Specific deep-dive>` (e.g. The Latency Problem)
    - `## Step 4`, `Step 5`, etc.
    - `## Failure Modes`
    - `## Operational Concerns`
3. **Wait for Approval**: Notify the user with the proposed structure and await approval before drafting. 
// turbo
WAIT FOR APPROVAL

### Phase 2: Drafting

1. **Draft the Post**: Write the full MDX file in `src/content/blog/<slug>.mdx`.
2. **Adhere to Voice & Tone**:
    - No LLM-style short, dramatic statements (e.g. "Not for chat. Not CPU spill.").
    - No em dashes (`—`). Use standard punctuation or rewrite.
    - Explicit numbers everywhere — no hand-waving.
    - Book-chapter depth. Do not skimp on length.
3. **Add Frontmatter**: Use standard frontmatter (title, description, pubDate, author, tags). Max 4 tags, broad categories (e.g. `["GenAI", "System Design", "LLM Serving", "case-study"]`).
4. **Formatting**: Add the footer: `*Note: This blog represents my technical views and production experience. I use AI-based tools to help with drafting and formatting to keep these posts coming daily.*`

### Phase 3: Diagrams

1. **Architecture Diagrams**: Use the Excalidraw MCP server (`mcp_excalidraw_...` tools) to draw visual diagrams. 
    - Clear the canvas.
    - Draw diagram (components, arrows, text).
    - Get a screenshot to verify layout.
    - Export as `png` to `public/diagrams/<name>.png`.
    - Export scene as `.excalidraw` to `diagrams/<name>.excalidraw`.
    - Embed in the MDX file (`![alt](/diagrams/<name>.png)`).
2. **Fallback**: If Excalidraw is unavailable, use Mermaid JS blocks inside the MDX file.

### Phase 4: Verification & Git

1. **Verify**: Run `grep_search` to ensure zero em dashes (`—`). Verify the MDX frontmatter.
2. **Check Changes**: Diff the workspace and verify all files.
3. **Commit**: `git add` the new MDX and diagram files. Create a clear `git commit` summarizing the content.
4. **Push**: Run `git push origin main`.
5. **Notify User**: Inform them the post is live.
