---
description: How to use the Notion MCP tools correctly and bypass validation bugs
---

# Notion MCP Usage Workaround

The current version of the `@notionhq/notion-mcp-server` (v2.2.1) has a known schema validation bug. It exposes the `Notion-Version` property as an accepted parameter in its tool schemas, but the underlying JSON-RPC integration will strictly reject any request that actually includes this parameter with a `400 Bad Request: body failed validation`.

Because the IDE strictly follows tool schemas, it will automatically prompt you to fulfill this parameter.

## Required Action
Whenever you are using **ANY** of the Notion MCP tools (e.g., `mcp_notion_API-post-search`, `mcp_notion_API-get-page`, etc.), you **MUST INSTRUCTIONALLY OMIT** the `Notion-Version` parameter from your tool call arguments. 

Leave the `Notion-Version` argument completely blank/undefined.
## Proxy Stability Update (March 2026)
Previously, the IDE's proxy script (`mcp-sse-proxy.js`) used chunked transfer encoding for its JSON-RPC payloads. Cloudflare and the remote servers would abruptly drop these connections without a response, leading to an infinite hang in the IDE.

This has been fixed! The proxy now correctly calculates and sends the `Content-Length` header. 

**However, the above `Notion-Version` workaround is still required.** If you include `Notion-Version`, the server will now gracefully return an explicit JSON-RPC error format instead of hanging indefinitely, but your tool call will still fail.
