# Hub and Spoke Orchestration Rules

This file defines the strict operating procedures for the Agentic Orchestrator managing my environments. The current repository (`arundel.cloud`) acts as the **Central Management Hub**.

## Repository Definitions

1.  **Hub (`arundel.cloud`)**: The central infrastructure repository. It orchestrates deployments, defines rules, and provisions ECS anywhere nodes.
2.  **Spoke 1: `betfred-work-ops`**:
    -   **Environment**: MacBook
    -   **Purpose**: Work and corporate operations.
    -   **Scope**: Exclusively connected to Atlassian, Outlook, Miro, and approved work contexts.
3.  **Spoke 2: `flatfrog-ops`**:
    -   **Environment**: Windows PC
    -   **Purpose**: Side-hustle and personal operations.
    -   **Scope**: Exclusively connected to Notion, Sentry, GitHub, and personal developer tools.

## Cross-Repo Security Policy (Hard Wall)

To prevent cross-contamination between Work and Side-Hustle environments, the following hard rules must be enforced by the agent at all times:

1.  **Strict Isolation**: The agent MUST NEVER index, reference, or read data from `flatfrog-ops` (or any personal accounts like Google One/Pro) when the `betfred-work-ops` profile is active.
2.  **Context Boundaries**: 
    -   If a prompt asks to cross-reference data between Work and Side-Hustle, the agent MUST explicitly refuse and state the security policy violation.
    -   Work-related scripts and rules MUST NOT contain any hardcoded references, URLs, or access patterns pointing to FlatFrog or personal assets.
3.  **Credential Separation**: 
    -   Work tokens (e.g., Microsoft Graph) and Side-Hustle tokens (e.g., Notion, Sentry) must be stored in distinct secret paths in AWS Secrets Manager.
    -   The agent running on the MacBook must only be provided access to Work MCP endpoints via the server bridge.

## Spawning New Repositories

When instructed to initialize a new spoke repository, the agent must:
1.  Apply the appropriate Agent rules document (e.g., `.agents/rules/work-standard.md` for Corporate).
2.  Configure the local `ag-profile.json` to ONLY point to the relevant filtered SSE bridges on the Hub server.
3.  Validate that `.gitignore` prevents accidental commit of `.env` files or local AWS/MCP credentials.
