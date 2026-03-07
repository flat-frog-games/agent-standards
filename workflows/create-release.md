---
description: Steps to cut a new release version and deploy to Steam
---

# Create Release

When ready to ship a version to Steam.

## Steps

1. **Ensure all changes are merged** — all feature branches should be merged to `main` via PRs

2. **Update CHANGELOG** — move `[Unreleased]` entries to a new version header:
```markdown
## [X.Y.Z] - YYYY-MM-DD
```

3. **Update version in project.godot**:
```bash
grep -n "config/version" project.godot
```
Then update the version string.

4. **Commit the version bump**:
```bash
git add CHANGELOG.md project.godot
git commit -m "Release vX.Y.Z"
```

5. **Create a git tag**:
```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z
```

6. **Push to main** — merging to `main` triggers the `deploy_steam` GitHub Action automatically

7. **Create GitHub release**:
```bash
gh release create vX.Y.Z --title "vX.Y.Z" --notes "See CHANGELOG.md for details"
```

8. **Verify** — check the GitHub Actions tab to confirm the Steam deploy succeeded
