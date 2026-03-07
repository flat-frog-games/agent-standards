---
description: How to update wiki content when game stats change
---

# Update Wiki

When game stats change in code (tower damage, costs, enemy health, resource values, etc.), update the corresponding wiki page.

// turbo-all

## Wiki Location
All wiki docs are in `docs/wiki/` organised by category:

| Category | Path | Content |
|---|---|---|
| Towers | `docs/wiki/towers/` | projectile, extinguisher, laser, bombardier, walls |
| Enemies | `docs/wiki/enemies/` | gnomes |
| Resources | `docs/wiki/resources/` | batteries, construction_material, foam_darts, etc. |
| Mechanics | `docs/wiki/mechanics/` | difficulty, engineers, production, saving |
| Structures | `docs/wiki/structures/` | fob, safe_zone |
| Strategy | `docs/wiki/strategy/` | getting_started |

## Steps
1. Identify which wiki page corresponds to the changed code
2. Read the current wiki page
3. Find the stat values in the source GDScript (e.g. `@export var damage: int = 15`)
4. Update the wiki page's stat table to match the code
5. Ensure frontmatter is intact (`title`, `wiki_id`, `category`)
6. If a new upgrade path, branch, or mechanic was added, add a new section

## Quality Checks
- Stat values must match the code exactly
- Use British English spelling
- Keep tables aligned and readable
