---
description: How to synchronize local IDE MCP configurations (like mcp-sse-proxy.js) from agent-standards
---

# Sync IDE MCP Configuration Workflow

When users report issues connecting to MCP servers from their IDE, or when the `mcp.json.template` or `mcp-sse-proxy.js` files are updated in the `agent-standards` repository, you MUST run this workflow to ensure their local IDE configuration is up to date and correct.

Local IDEs store their MCP proxy scripts and configuration deeply in their AppData (e.g., `%APPDATA%\Antigravity\User\mcp-sse-proxy.js`). If this falls out of sync with the hub requirements, connections will fail with timeouts ("Context deadline exceeded") or 401 Unauthorized errors.

## Steps to Sync Configuration

1. Navigate to the `agent-standards` repository checkout on the user's local machine (typically `e:\Projects\agent-standards` or similar).

2. Change directory into the `mcp` folder.

// turbo
3. Run the automated PowerShell synchronization script:
```powershell
.\sync-ide-mcp.ps1
```

4. If this is a first-time setup, the script will create the `mcp.json` file for the user. Ask the user to manually insert their `HUB_API_KEY` and `CF_ACCESS_CLIENT_SECRET` into the newly created `%APPDATA%\Antigravity\User\mcp.json` file.

5. Ask the user to restart their IDE to reload the fresh proxy script and configuration.
