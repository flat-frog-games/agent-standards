---
description: Always run at the start of a new conversation or before beginning any work to ensure the local branch is in sync with origin/main
---

# Sync Check

Run this before starting any work to avoid conflicts.

// turbo-all

## Steps

1. Fetch the latest from origin:
```bash
git fetch origin
```

2. Check current branch and status:
```bash
git status
```

3. If on `main`, check if behind:
```bash
git log HEAD..origin/main --oneline
```

4. If behind, pull:
```bash
git pull origin main
```

5. If on a feature branch, rebase on main:
```bash
git rebase origin/main
```

## Notes
- If there are uncommitted changes, stash them first with `git stash`
- After rebase, check for conflicts before continuing work
