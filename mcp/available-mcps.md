# Available MCP Servers

Flat Frog Games hosts a centralized Model Context Protocol (MCP) Hub. This hub securely proxies tool requests to downstream integrations without requiring developers or AI agents to configure tokens locally.

## Connection Details

- **Base URL**: `https://mcp.flatfrog.games`
- **Protocol**: SSE (Server-Sent Events) over HTTPS
- **Authentication**: A Bearer token must be provided in the `Authorization` header. This token maps to the `HUB_API_KEY` stored in the AWS SSM parameter store (`/arundel-cloud/mcp/hub_api_key`).

An MCP connection usually requires establishing the SSE channel by making a `GET {Base URL}/{server_name}/sse` request.

## Available Servers

The hub exposes the following endpoints (replace `{server_name}` in the connection URL):

### 1. `github`
Provides general GitHub repository operations (read, write, PR creation, code search). This connection is authenticated with a general-purpose Personal Access Token. 

### 2. `github-flatfrog` (**Recommended for Flat Frog projects**)
Provides exactly the same capabilities as the `github` server but is authenticated using a PAT that is scoped **exclusively** to the `flat-frog-games` organization. 
> [!IMPORTANT]
> AI Agents should always default to using the `github-flatfrog` server when interacting with **any** repository under the `flat-frog-games` namespace to ensure correct permissions and organizational attribution.

### 3. `sentry`
Allows querying of Sentry logs, retrieving event details, managing issues, and requesting AI-assisted Seer root cause analysis for debugging production problems.

### 4. `notion`
Used for searching, reading, and updating Notion pages, databases, and general documentation.

### 5. `miro`
Allows inspecting and updating Miro boards for architecture diagrams and visual planning.

## Security Considerations

The proxy node enforces strong restrictions on which tools are exposed. Even if an upstream SDK updates to include new tools, the hub maintains an explicit `allowedTools` list per server route. For example, the GitHub servers are restricted to repository management and interaction tools rather than administrative or deletion tools.
