---
name: GDScript Development
description: Conventions, patterns, testing, and debugging for GDScript in Godot 4.
---

# GDScript Development Skill

## General Architecture Principles

Building Godot 4 games typically involves organizing structure around functionality:

| Generic Directory | Purpose |
|-------------------|---------|
| `scenes/` | Live game scenes, split by domains (e.g., characters, UI, environment) |
| `scripts/` | Standalone scripts or autoloads/singletons |
| `assets/` | Art, sound, and data resources |
| `docs/` | Game documentation and specifications |
| `test/` | Tests (e.g., using GdUnit4) |
| `addons/` | Plugins (GdUnit4, third-party tools) |

## Coding Conventions

### Naming
- **Files**: `snake_case.gd` (e.g., `player_controller.gd`)
- **Variables/Functions**: `snake_case` (e.g., `movement_speed`, `get_health()`)
- **Classes/Types**: `PascalCase` (e.g., `PlayerCharacter`, `EnemySpawner`)
- **Signals**: `snake_case` past tense (e.g., `level_completed`, `item_collected`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_INVENTORY_SIZE`)

### Export Variables
```gdscript
@export var damage: int = 15
@export var speed: float = 200.0
```
Always provide default values. These are the source of truth for game balance.

### Signals Pattern
Loose coupling is preferred:
```gdscript
signal health_changed(new_health: int, max_health: int)
signal destroyed

func take_damage(amount: int) -> void:
    health -= amount
    health_changed.emit(health, max_health)
    if health <= 0:
        destroyed.emit()
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

### Writing a Test Template
```gdscript
extends GdUnitTestSuite

func test_basic_functionality() -> void:
    var test_instance = auto_free(preload("res://scenes/path/to/scene.tscn").instantiate())
    add_child(test_instance)
    assert_int(test_instance.some_variable).is_equal(15)
```

## Debugging

### Sentry Breadcrumbs (if integrated)
Add breadcrumbs for important state changes to aid crash tracking:
```gdscript
if Engine.has_singleton("SentrySDK"):
    SentrySDK.add_breadcrumb("Action occurred", "gameplay", {"var": value})
```

### Common Debugging Steps
- **Z-sorting**: Objects typically use the Y-coordinate for render depth. Check `y_sort_enabled`.
- **References**: Always verify `@export` variable assignments in the Inspector.
