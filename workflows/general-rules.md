---
description: General rules to follow in every conversation
---

# General Rules

// turbo-all

## Language & Style
- Always use **British English** spelling (e.g. defence, colour, behaviour, centralise)
- GDScript style: `snake_case` for files/variables, `PascalCase` for classes/types
- Write player-facing text in plain English, not developer jargon

## Git & Workflow
- **Never push directly to `main`** — always use feature branches and PRs
- **No long-lived development branches** — create short-lived feature branches off `main` and merge them frequently via PRs. Evaluate and merge work in small, incremental PRs.
- Branch naming: `feat/`, `fix/`, `refactor/`, `docs/` prefixes
- Commit messages: imperative mood, concise (e.g. "Add tower targeting priority")
- **Shared Submodules**: When making changes to shared submodules (like `.agents`), ensure you commit and push the changes back to the origin submodule repository, and then commit the submodule pointer update in the main repository.

## Documentation
- Update `CHANGELOG.md` for any **player-facing** change (see `/update-changelog`)
- When changing game stats, update the corresponding `docs/wiki/` page (see `/update-wiki`)
- Keep `README.md` accurate — update if structures, costs, or workflow changes
- **Notion**: When making changes that affect game design, art assets, architecture, or adding new features/enemies/towers, proactively ask if the corresponding Notion page should be created or updated. Key pages to keep in sync:
  - **Asset List** — when new art assets are added or production files change
  - **ART GDD** — when art direction or technical art requirements change
  - Any other relevant Notion docs in the Flat Frog Games workspace

## Communication
- **Ask clarifying questions** when uncertain about intent rather than assuming
- When completing a task, **suggest potential workflow improvements** or new workflows if relevant
- Flag when changes might affect game balance and offer to update wiki docs
- When changes could benefit from a Notion document (e.g. new system design, asset requirements), **ask the user** if one should be created

## Code Quality
- Add Sentry breadcrumbs for important state changes
- Prefer IDE tools over terminal commands for file searching and reading (see `/ide-tools-preference`)
- Run `/sync-check` at the start of new work sessions

## Agent Interaction
- **Auto-Run Safe Commands**: Always set `SafeToAutoRun: true` for read-only or search commands (e.g. `cat`, `ls`, `view_file`, `grep_search`, `find_by_name`, `list_dir`). Do not ask for user approval for these operations as it is tedious.

## Standards Maintenance
- **Keep Standards Updated**: Flat Frog Games relies on this repository to dictate workflows, MCP settings, and rules. If you discover a new workflow or a change in best practices during your task, **you must proactively propose an update or addition** to these standards.
- **Reference Existing Docs**: Before attempting complex tasks, search the `agent-standards` repository to see if a standard `/workflow` or `skill` exists to guide you. All repos pull this in as a submodule (usually `.agents`).

## Known Environment Issues
- **Node.js** — Installed at `E:\nodejs\`. PATH is permanently configured in `.vscode/settings.json` via `terminal.integrated.env.windows`.
- **Notion MCP** — Configured at `~/.gemini/antigravity/mcp_config.json`. Uses `E:\nodejs\node.exe` directly to avoid PATH issues.
