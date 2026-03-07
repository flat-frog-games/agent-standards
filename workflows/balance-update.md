---
description: Steps for adjusting game balance (tower stats, costs, wave rewards) and updating all related documentation
---

# Balance Update

When adjusting tower stats, enemy health, costs, wave rewards, or resource values.

## Steps

1. **Update the source code** — change the `@export` values in the relevant `.gd` script
2. **Update the wiki** — run `/update-wiki` to sync `docs/wiki/` with the new values
3. **Update changelog** — run `/update-changelog` to add a `### Changed` entry
// turbo
4. **Run tests** — verify nothing is broken:
```bash
godot --headless --script addons/gdUnit4/bin/GdUnitCmdTool.gd
```
5. **Consider knock-on effects** — ask:
   - Does this affect difficulty balance across Easy/Normal/Hard?
   - Does the README structures table need updating?
   - Are any upgrade cost formulas affected?
