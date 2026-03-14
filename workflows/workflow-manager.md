---
description: Comprehensive workflow manager covering Semantic Versioning, Changelog updates, GitHub Issues, Branches, PRs, and Commits.
---

# Workflow Manager

This document outlines the end-to-end development lifecycle for projects, combining issues, branching, commits, semantic versioning, pull requests, and changelog management.

## 1. Issue Tracking
All work starts with an issue.
- **Identify**: When a bug or feature request is identified, create an issue.
- **Command**: `gh issue create --title "Brief description" --body "Detailed description" --label "bug|feature"`
- **Sentry**: If the issue comes from Sentry, create a GitHub issue with the stack trace, immediately close the Sentry issue on the dashboard to keep the queue clean, and track progress on GitHub.

## 2. Branching Strategy
- **Create Branch**: Create a short-lived feature branch derived from `main`. Do not use long-lived shared development branches.
- **Command**: `git checkout -b <type>/<issue-description>` (e.g., `feat/add-new-tower`, `fix/resolve-crash`).
  - *Batching Issues*: If batching multiple fixes into one branch, name the branch after the **first or most significant issue** (e.g., `fix/resolve-crash-and-others`).

## 3. Commit Formatting & Semantic Versioning
The project uses **Conventional Commits** to automate Semantic Versioning (SemVer) and Changelog generation.

**Format**:
`<type>(<optional scope>): <description>`

- If the commit fixes a specific issue, include the issue reference in the commit (e.g., title: `fix: resolve null reference`, body: `Fixes #123`). This is essential when grouping multiple fixes in a single PR to ensure each fix properly closes its corresponding issue and populates the changelog correctly.

**Allowed Types**:
- `feat:` A new feature. **Triggers a MINOR bump.**
- `fix:` A player-facing bug fix. **Triggers a PATCH bump.**
- `docs:` Documentation only changes.
- `style:` Formatting changes.
- `refactor:` A code change that neither fixes a bug nor adds a feature.
- `perf:` Performance improvements.
- `test:` Adding or correcting tests.
- `chore:` Build process, auxiliary tools, or non-player-facing backend fixes (e.g. Sentry crash resolutions, telemetry, internal CI scripts). **Does not trigger changelog notes.**

**Breaking Changes**: Append `!` after type/scope (e.g. `feat!: overhaul system`). **Triggers a MAJOR bump.** Only do this when explicitly commanded by the user.

## 4. Updating the Changelog
When a player-facing change (usually `feat` or `fix`) is completed, update `CHANGELOG.md` before opening a Pull Request.

**Rules**:
- Append to the `[Unreleased]` section.
- Group under: `### Added`, `### Changed`, `### Fixed`, `### Removed`.
- Write in **player-facing language** (describe the experience modifier, not the internal code classes).
- Start with a **bold title** and use British English spelling.

*Note: Automated pipelines may handle the [Unreleased] to version block conversion during a release.*

## 5. Pull Requests
Once work is complete and tested locally:
- **Push**: `git push -u origin HEAD`
- **Create PR**: `gh pr create --title "<type>: <description>" --body "Closes #123, Closes #124" --base main` (Include all relevant closed issues in the body).
- **Merging Strategy**:
  - **Single Issue PRs**: Use **Squash and Merge**. The PR title MUST follow Conventional Commits, because the squash operation uses the PR title as the final commit message on `main`.
  - **Batch Fix PRs**: Use **Rebase and Merge**. This ensures every atomic fix (which acts as the trigger for the changelog) is preserved as individual commits on `main`. *Rule*: Every single commit on a batched branch MUST be a perfectly formatted Conventional Commit, and cannot contain "wip" or broken states.
- **Manual Testing Prompt**: Before merging any PR, the agent MUST ask the user: "Have you manually run and tested this scenario in the game to confirm it works?" Merging should only proceed after the user confirms.
- **Agent Post-PR Prompt**: Immediately after creating and verifying a PR, the agent MUST ask the user:
  1. "Would you like me to merge it in for you?"
  2. "Would you like me to do some more work on this branch?"
  3. "Will you be merging it yourself?"
- **Pipeline Tailing**: 
  - If the agent merges the PR, the agent MUST automatically tail the CI/CD pipeline (using `gh run watch` or similar) to ensure the build completes successfully and report any errors.
  - If the user chooses to merge the PR themselves, the agent MUST ask the user if they would like the agent to tail the pipeline to check for errors.

## 6. Internal Builds & Releases
- Internal Beta / CI builds use a commit-specific identifier appended to the semantic version: `<CurrentVersion>-build.<ShortSHA>` (e.g., `v0.9.12-build.7a3b4c9`).
- Public releases trigger a pipeline that strips the build identifier and deploys the clean version.
