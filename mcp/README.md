# Local Environment MCP Server Setup

Flat Frog Games leverages remote AI MCP Servers (Model Context Protocol) via securely tunneled Cloudflare Access endpoints to provide standardized tools directly into developer and AI Agent environments.

This ensures tools like GitHub native integrations, Notion documentation queries, and Sentry log querying are universally accessible to AI engineering bots without duplicating binaries locally. 

## Installation Instructions

To standardise your local IDE or Agent environment, please follow these steps:

1. Copy the `mcp-sse-proxy.js` file into your AI Agent's configuration folder (e.g. `%APPDATA%\Antigravity\User\`).
2. Copy `mcp.json.template` into the same configuration folder and rename it to `mcp.json`.
3. Open the newly copied `mcp.json` file.
4. Replace `<USER>` with your local Windows username in the absolute path strings.
5. Replace `YOUR_CF_SECRET_TOKEN` with the shared internal development Cloudflare Service Access Token.
6. Restart/Reload your IDE or Agent session. 

The environment should instantly connect securely to `mcp.flatfrog.games` and sync down the `github`, `notion`, and `sentry` tools!
