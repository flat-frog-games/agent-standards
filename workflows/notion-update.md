---
description: Steps to update Notion documentation when game assets, design, or architecture change
---

# Update Notion

When game assets, design documents, or architecture changes need reflecting in Notion.

// turbo-all

## Rules
- **No approval required** — Notion page updates can proceed without asking the user first. Make the changes, then report what was updated. Notion content is easily reversible so there is no risk.
- If creating a **brand new page** or **deleting an existing page**, briefly confirm with the user first.

## CRITICAL Stability Notice (March 2026)
You MUST respect the underlying Notion API stability limitations whenever executing tools:
1. **Never specify `Notion-Version`** in any API calls. Even if the IDE prompts for it, passing it triggers a `400 Bad Request: body failed validation` inside the remote server due to a schema bug in `@notionhq/notion-mcp-server@2.2.1`. Your connection will crash!
2. Do not omit mandatory parameters (like `block_id` or `page_id`).
3. Limit large payload operations (like bulk retrieving thousands of children or huge DB queries) and prefer paginated calls (`start_cursor`, `page_size`) so the SSE proxy connection does not exceed memory or payload lengths.

## Steps

1. **Identify the affected page** — search Notion for the relevant page:
```
mcp_notion_API-post-search(query="page name")
```

2. **Read current content** — retrieve the page's blocks to understand what exists:
```
mcp_notion_API-get-block-children(block_id="page_id")
```

3. **Make targeted updates** — use the appropriate API:
   - **Add rows to a table**: `patch-block-children` with `table_row` children
   - **Update a block**: `update-a-block` to change text content
   - **Add new sections**: `patch-block-children` with heading + table blocks
   - **Remove outdated content**: `delete-a-block`

4. **Verify** — re-read the page to confirm changes rendered correctly

## Key Pages

| Page | When to Update |
|------|---------------|
| Asset List | New art assets added, production files change, facings completed |
| ART GDD | Art direction changes, technical art requirements updated |

## Table Column Standards

All asset tables use 4 columns: **Asset Name | Facing | Status | Notes**

Status indicators:
- ✅ — production file exists in `res://assets/production/`
- 🟡 — needs update or partial
- ❌ — not started
