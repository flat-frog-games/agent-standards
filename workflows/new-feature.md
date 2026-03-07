---
description: End-to-end workflow for adding a new game feature (tower, enemy, mechanic, etc.)
---

# New Feature

Meta-workflow for adding a new game feature from start to finish.

## Steps

1. **Create a GitHub issue** describing the feature (see `/manage-github`)

2. **Create a feature branch**:
```bash
git checkout -b feat/feature-name
```

3. **Implement the feature** in code
   - Follow GDScript conventions from `/general-rules`
   - Add Sentry breadcrumbs for important state changes

4. **Update wiki docs** — run `/update-wiki` for any new or changed stats

5. **Update changelog** — run `/update-changelog` for player-facing changes

6. **Check Notion** — ask the user:
   - Does the Asset List need new entries? (new towers, enemies, effects)
   - Does the ART GDD need updating? (new art direction)
   - Should a new Notion page be created for this feature?

7. **Run tests**:
// turbo
```bash
godot --headless --script addons/gdUnit4/bin/GdUnitCmdTool.gd
```

8. **Create a PR** — run `/manage-github` to create the PR linking to the issue

9. **Consider knock-on effects**:
   - Does this affect game balance? Run `/balance-update`
   - Does the README need updating?
   - Are any existing workflows affected?
