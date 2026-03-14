# Local Environment MCP Server Setup

Flat Frog Games leverages remote AI MCP Servers (Model Context Protocol) via securely tunneled Cloudflare Access endpoints to provide standardized tools directly into developer and AI Agent environments.

This ensures tools like GitHub native integrations, Notion documentation queries, and Sentry log querying are universally accessible to AI engineering bots without duplicating binaries locally. 

## Installation & Maintenance Instructions

To standardise your local IDE or Agent environment, you should use the automated synchronization script. This script will ensure you have the latest `mcp-sse-proxy.js` proxy and will scaffold your `mcp.json` if it doesn't already exist.

1. Open PowerShell and navigate to `agent-standards/mcp/`.
2. Run the sync script:
   ```powershell
   .\sync-ide-mcp.ps1
   ```
3. Open `%APPDATA%\Antigravity\User\mcp.json`.
4. Ensure `YOUR_CF_SECRET_TOKEN` is set to the shared internal development Cloudflare Service Access Token.
5. Ensure `YOUR_HUB_API_KEY` is set to your Flat Frog Games MCP Hub API token.
6. Restart/Reload your IDE or Agent session.

The environment should instantly connect securely to `mcp.flatfrog.games` and sync down the `github`, `notion`, and `sentry` tools!

> [!TIP]
> **AI Agents**: If the user reports a "context deadline exceeded" or MCP connection error in their IDE, you MUST run `.\sync-ide-mcp.ps1` to ensure their local proxy script is not outdated before attempting complex remote troubleshooting.

## Best Practices

When building or updating custom MCP hubs/proxies:
1. **Use the Official SDK**: Always rely on `@modelcontextprotocol/sdk` (e.g. `SSEServerTransport`, `StdioClientTransport`) in remote servers instead of manually parsing JSON streams or `stdout` buffers. This prevents stream corruption and ensures lifecycle events are mapped correctly.
2. **Silence Non-JSON-RPC Logging**: Local script clients (like `mcp-sse-proxy.js`) should NEVER emit strings to stdout/stderr that are not strictly valid JSON-RPC 2.0 objects. IDEs like Antigravity treat arbitrary `stderr` output as fatal crashes and forcefully drop the connection.
3. **Handle EOF and Heartbeats**: If connecting through infrastructure like Cloudflare Tunnels, employ HTTP keep-alives or custom ping/pong events so the socket doesn't idle out and trigger `EOF` timeouts.
