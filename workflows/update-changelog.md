---
description: How to update the CHANGELOG.md when changes are made
---

# Update Changelog

When any player-facing change is completed, update `CHANGELOG.md`.

## Rules
1. Append to the `[Unreleased]` section at the top of the file
2. Follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format
3. Group entries under: `### Added`, `### Changed`, `### Fixed`, `### Removed`
4. Write in **player-facing language** — describe what the player experiences, not internal code changes
5. Each entry starts with a **bold title** followed by a description
6. Use British English spelling

## Format Example
```markdown
### Fixed
- **Tower Not Firing After Upgrade**: The Projectile Tower would stop attacking after upgrading to level 3. The fire rate now correctly applies at all upgrade levels.
```

## What Does NOT Need a Changelog Entry
- Internal refactors with no player-visible effect
- Code comments or documentation-only changes
- Test additions
- CI/CD changes
