---
description: How to use the Notion MCP tools correctly and bypass validation bugs
---

# Notion MCP Usage Workaround

The current version of the `@notionhq/notion-mcp-server` (v2.2.1) has a known schema validation bug. It exposes the `Notion-Version` property as an accepted parameter in its tool schemas, but the underlying JSON-RPC integration will strictly reject any request that actually includes this parameter with a `400 Bad Request: body failed validation`.

Because the IDE strictly follows tool schemas, it will automatically prompt you to fulfill this parameter.

## Required Action
Whenever you are using **ANY** of the Notion MCP tools (e.g., `mcp_notion_API-post-search`, `mcp_notion_API-get-page`, etc.), you **MUST INSTRUCTIONALLY OMIT** the `Notion-Version` parameter from your tool call arguments. 

Leave the `Notion-Version` argument completely blank/undefined.

If you include it, your tool call will instantly crash with an `EOF / client is closing` error!
