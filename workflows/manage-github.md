---
description: Managing GitHub issues and pull requests using gh CLI
---

# Manage GitHub Issues & PRs

Use the `github` MCP server if it is available and configured.
If the MCP server is not available or encounters errors, revert to using the `gh` CLI to manage issues and PRs from the terminal.

// turbo-all

## Creating an Issue

When a bug or feature request is identified:

1. Create the issue:
```bash
gh issue create --title "Brief description" --body "Detailed description" --label "bug"
```

Common labels: `bug`, `feature`, `balance`, `documentation`, `enhancement`, `refactor`

2. If the issue needs work immediately, create a branch:
```bash
git checkout -b fix/issue-description
```

## Creating a Pull Request

After work is complete on a feature branch:

1. Push the branch:
```bash
git push -u origin HEAD
```

2. Create the PR linking to the issue:
```bash
gh pr create --title "Brief description" --body "Closes #ISSUE_NUMBER" --base main
```

3. The PR body should include:
   - What changed and why
   - Changelog entry (copy from CHANGELOG.md)
   - Any testing done

## Listing & Checking Issues
```bash
gh issue list
gh issue view ISSUE_NUMBER
gh pr list
gh pr status
```

## Closing Issues
Issues are automatically closed when a PR with `Closes #N` is merged. To close manually:
```bash
gh issue close ISSUE_NUMBER --reason completed
```

## Notes
- Always create PRs against `main` — never push directly
- **Do not use long-lived shared development branches.** All work must happen in short-lived feature branches created directly from `main`.
- Link every PR to at least one issue where possible
- Add labels to help with triage
