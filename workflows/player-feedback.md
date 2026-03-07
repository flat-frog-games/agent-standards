---
description: Workflow for handling player feedback and bugs without premature triggers
---

# Handling Player Feedback Workflow

When players report bugs or request features (e.g., via Discord or GitHub Issues), ensure that we correctly handle the development lifecycle without triggering external bots prematurely (like Discord integration webhooks) and ensuring the player stays informed.

## 1. Investigation & Confirmation
1. **Acknowledge the Issue**: Confirm understanding of the user report. If there is a video or screenshot, analyze it carefully. Confirm what the root cause is before jumping into coding.
2. **Reproduce / Code Review**: Cross-reference the reported behaviour with the code. Use tools to view scripts and verify if the issue aligns with the codebase's current state.
3. **Draft an Implementation Plan**: Outline what files need changing, and how the fix will be verified.

## 2. Development Phase
1. **Local Fixes Only**: Write the code fixes locally. Avoid running any `git commit` or `gh issue close` commands that might trigger automated bots until the fix is **fully verified**. bots hooked into Git could prematurely message the player that the bug is fixed before the deploy is live!
2. **No Auto-resolving**: Do not use "Fixes #XX" in temporary or intermediate commit messages unless you are absolutely sure it's headed to `main` and ready for release.

## 3. Verification & Player Updates
1. **Developer Testing**: Ask the User to test the fix locally, or run automated verification (e.g. running the scene in Godot).
2. **Release Preparation**: Once verified, document the change in `CHANGELOG.md` under the "[Unreleased]" section.
3. **Closing the Loop**: When cutting a Release (via `/create-release`), ensure the Release Notes clearly mention "Resolves #XX - [Description]" so the player gets notified only when the patch is actually in their hands.
4. **Direct Communication**: If applicable, draft a Discord/GitHub message for the user that they can copy/paste, saying "Thanks for the report! We've identified the issue and fixed it; the patch will be available in the next release (vX.X.X)."
