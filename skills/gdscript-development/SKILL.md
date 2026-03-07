---
name: GDScript Development
description: Conventions, patterns, testing, and debugging for GDScript in the Clearance Defence project
---

# GDScript Development Skill

## Project Architecture

This is a Godot 4 isometric tower defence game. Key directories:

| Directory | Purpose |
|-----------|---------|
| `scenes/production/` | Live game scenes (towers, structures, enemies, UI) |
| `scenes/common/` | Shared scenes (projectiles, effects) |
| `scripts/` | Standalone scripts (camera, tools) |
| `assets/production/` | Production art (environment, buildable, enemy) |
| `docs/wiki/` | Game documentation (stats, mechanics) |
| `test/` | GdUnit4 tests |
| `addons/` | Plugins (GdUnit4, Sentry) |

## Coding Conventions

### Naming
- **Files**: `snake_case.gd` (e.g. `projectile_tower.gd`)
- **Variables/Functions**: `snake_case` (e.g. `fire_rate`, `get_damage()`)
- **Classes/Types**: `PascalCase` (e.g. `BaseTower`, `EnemySpawner`)
- **Signals**: `snake_case` past tense (e.g. `tower_placed`, `wave_completed`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g. `MAX_AMMO`)

### Export Variables
```gdscript
@export var damage: int = 15
@export var fire_rate: float = 1.0
@export var range_radius: float = 200.0
```
Always provide default values. These are the source of truth for game balance.

### Signals Pattern
```gdscript
signal health_changed(new_health: int, max_health: int)
signal destroyed

func take_damage(amount: int) -> void:
    health -= amount
    health_changed.emit(health, max_health)
    if health <= 0:
        destroyed.emit()
```

### Sentry Breadcrumbs
Add breadcrumbs for important state changes:
```gdscript
if Engine.has_singleton("SentrySDK"):
    SentrySDK.add_breadcrumb("Tower upgraded", "gameplay", {"tower": name, "level": level})
```

## Testing with GdUnit4

### Running Tests
```bash
godot --headless --script addons/gdUnit4/bin/GdUnitCmdTool.gd
```

### Test File Convention
- Tests live in `test/` directory
- File naming: `test_<feature>.gd`
- Use `GdUnitTestSuite` as base class

### Writing a Test
```gdscript
extends GdUnitTestSuite

func test_tower_damage() -> void:
    var tower = auto_free(preload("res://scenes/production/towers/projectile_tower.tscn").instantiate())
    add_child(tower)
    assert_int(tower.damage).is_equal(15)

func test_ammo_consumption() -> void:
    var tower = auto_free(preload("res://scenes/production/towers/projectile_tower.tscn").instantiate())
    tower.current_ammo = 10
    tower._fire()
    assert_int(tower.current_ammo).is_equal(9)
```

## Common Patterns in This Project

### Tower Base Class
All towers extend a shared base with `@export` stats, upgrade paths, and ammo systems. When adding a new tower:
1. Create the scene in `scenes/production/towers/`
2. Extend the base tower script
3. Override `_fire()` for custom attack behaviour
4. Add upgrade path resources

### GameManager Singleton
Central coordinator for game state. Access via:
```gdscript
GameManager.current_wave
GameManager.build_layer
GameManager.ground_layer
```

### Grid System
- Tile size: `Vector2i(256, 128)` isometric
- Placement: snap to centre of build tile
- Footprint: 1×1 tiles for all towers/walls

## Debugging

### Debug Scripts (Root Directory)
- `debug_check_bounds.gd` — boundary checking utilities
- `debug_vectors.gd` — vector visualisation
- `inspect_sentry.gd` — Sentry integration inspection

### Common Issues
- **Z-sorting**: Objects use Y-coordinate for render depth. Check `y_sort_enabled`
- **Pathfinding**: After placing structures, verify `build_layer` cells are correctly marked
- **Export values**: Always check `@export` defaults match wiki documentation
