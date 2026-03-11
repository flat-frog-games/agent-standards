---
description: How to format commits and manage Semantic Versioning automatically without relying on the manual [Unreleased] changelog box.
---

# Semantic Versioning Workflow

Clearance Defence uses **Conventional Commits** to automate Semantic Versioning (SemVer) and Changelog generation during the release pipeline.

## 1. Commit Formatting Rules
Every commit you make to the repository **MUST** follow the Conventional Commits specification. This allows automated tools (like `release-please` or custom CI scripts) to figure out the next version number.

Format:
```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

### Allowed Types:
- `feat:` A new feature for the game (e.g., new tower, enemy, level). **Triggers a MINOR bump.**
- `fix:` A bug fix (e.g., resolving a Sentry crash, pathfinding bug). **Triggers a PATCH bump.**
- `docs:` Documentation only changes (e.g., Notion, README, workflows).
- `style:` Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- `refactor:` A code change that neither fixes a bug nor adds a feature.
- `perf:` A code change that improves performance.
- `test:` Adding missing tests or correcting existing tests.
- `chore:` Changes to the build process or auxiliary tools and libraries such as CI/CD configurations.

### Breaking Changes:
If a commit introduces a breaking change (e.g., save files are no longer compatible), append a `!` after the type/scope or include `BREAKING CHANGE:` in the footer. **Triggers a MAJOR bump.**

**CRITICAL RULE:** The agent must **NEVER** use `feat!:` or `BREAKING CHANGE:` to trigger a major bump unless the user explicitly commands it. Major bumps are strictly controlled by the developer.

```bash
feat!: completely overhaul the tower upgrade system making old saves invalid
```

## 2. Managing Version Releases
The CD pipeline is now responsible for generating the release and updating `CHANGELOG.md` based on commit history.

- Do **NOT** manually edit the `CHANGELOG.md` to add an `[Unreleased]` block anymore, unless specifically testing a manual script.
- The pipeline will aggregate all `feat:` and `fix:` commits since the last tag, categorize them, bump the `project.godot` version, insert them into `CHANGELOG.md`, and deploy.

## 3. Pull Request Titles
When opening a PR via `gh pr create`, ensure the PR title itself follows the Conventional Commits format, because a "Squash and Merge" operation will use the PR title as the final commit message in `main`.

**Example:**
```bash
gh pr create --title "fix: resolve Sentry crash in tower_manager" --body "Closes #55" --base main
```

## 4. Internal Build Versioning
For CI builds pushed to internal branches (like Steam beta), the Semantic Version is constant, but a commit-specific build identifier is appended. 
To avoid visually confusing characters (like `+`), use a hyphen separating the build prefix and the short SHA.

**Format:** `<CurrentVersion>-build.<ShortSHA>`
**Example:** `v0.9.12-build.7a3b4c9`

This ensures every internal deploy gets a unique release tag in Sentry for precise crash tracking, while public deployments use clean tags like `v0.9.13`.
