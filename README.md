# Flat Frog Games Agent Standards

This repository (`agent-standards`) serves as the central source of truth for **AI Agent workflows, skills, rules, and connection profiles** at Flat Frog Games. By maintaining a single, version-controlled repository of best practices, all agents can operate consistently, effectively, and safely across our various codebases.

## Purpose

The primary goals of this repository are to:
1. Provide explicit **Workflows** (`/workflows/`) specifying exactly how to complete routine or complex tasks (e.g., adding UptimeRobot monitors, creating releases).
2. Define **Skills** (`/skills/`) and general rules for agent behavior, code style, and documentation.
3. Centralize **MCP Configurations** (`/mcp/`) so agents understand how to connect to flat-frog-games infrastructure (such as the MCP Hub, specific GitHub tokens, etc.).

## How Repositories Interact with Agent Standards

Other repositories within the Flat Frog Games ecosystem reference this repository as a **Git submodule** (often placed in an `.agents` or `_agents` directory). 
This setup ensures that whenever an agent is working in a project, it has immediate, local access to the global standards without having to guess or hallucinate workflow steps.

When you update this repository, the changes can be pulled down into all other projects, keeping agent behavior globally synchronized.

## Agent Guidelines & Contributions

AI Agents (like Antigravity, Cline, Claude, etc.) must actively **use and maintain** these standards:

- **Read Before You Act**: If a user asks you to perform a task (like adding monitoring or releasing a game), check the `/workflows/` or `/skills/` directory first to see if a standard exists. Let these documents guide your implementation.
- **Proactive Maintenance**: These standards are living documents. **If you discover a new edge case, a fix to an existing process, a new required configuration, or an entirely new workflow, you must proactively update this repository**. 
- **Submodule Updates**: If you modify `agent-standards` while working in another project's submodule, you must commit and push your changes to this origin repo (`agent-standards`), and then commit the submodule pointer update in the host repo.

By documenting solutions as soon as they are found, we ensure that every future agent session benefits from the lessons learned today.
