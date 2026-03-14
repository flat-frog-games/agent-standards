# Agent Skills Directory

This directory contains **Skill Files** that dictate agent behavior, architecture rules, and troubleshooting procedures.

### Rule 1: Repository-Specific Skills
Many skills in this directory are mapped **directly to specific workspaces or repositories** (for example, `mcp-hub.md` directly manages the `mcp-hub` repository). 
When an AI agent begins working on a specific repository, it **MUST** check if a skill file exists for that repository name (or related domains) in this directory and read it completely before taking any destructive action or making architectural decisions.

### Rule 2: Active Maintenance
These skill files are not static. AI agents are responsible for maintaining them. 
If during your work you:
- Encounter a new edge case
- Identify a new common error or failure state
- Learn something new about the repository's required architecture or constraints
- Establish a successful troubleshooting or deployment pattern

You **MUST** proactively update the relevant skill file in this repository with those new learnings so that future agents do not repeat the same mistakes or have to rediscover the same solutions.
