---
description: Steps for replacing placeholder sprites with production art assets
---

# Replace Art Asset

// turbo-all

When swapping a placeholder sprite for a production art asset on any structure.

## Rules

1. **Texture path** — Point `ext_resource` to `res://assets/production/structures/<type>/`
2. **Remove placeholder tints** — Delete any `modulate` colour overrides (e.g. purple tint on FOB)
3. **Remove offset hacks** — Delete `offset` properties; production sprites should be artist-centred
4. **Centre on tile** — Set `position = Vector2(0, -26)` as the baseline for single-tile isometric structures
5. **Scale to fit** — Start at `scale = Vector2(0.8, 0.8)` for single-tile structures; adjust in-game
6. **Multi-tile structures** — For 2×2 or larger structures, start at `scale = Vector2(0.6, 0.6)` and `position.y = -40`, then adjust
7. **Keep collision unchanged** — Do not modify `CollisionPolygon2D`, `CollisionShape2D`, or `Area2D` nodes
8. **Keep `load_steps` correct** — Update the `load_steps` count in the scene header if `ext_resource` count changes

## Reference Values (Proven Working)

| Structure | Position Y | Scale | Notes |
|-----------|-----------|-------|-------|
| Wall (1×1) | -26 | 0.8 | Cardboard box variants |
| FOB (1×1) | -26 | 0.8 | Pallet with hazard boxes |
| Projectile Tower body (1×1) | -26 | 0.8 | Static base |
| Projectile Tower gun (1×1) | -50 | 0.8 | Sits on top of body, swaps NE/SE + flip_h |

Update this table as more assets are replaced.

## Post-Replacement Checklist

1. Launch the game and place/view the structure
2. Confirm sprite is centred on the isometric tile (not offset to a corner)
3. Confirm z-ordering with adjacent structures (south draws on top of north)
4. Confirm health bar still sits above the sprite
5. Adjust `position.y` and `scale` if needed (iterate in small increments)
6. Run `/update-changelog` for the art change
