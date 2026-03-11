---
name: Clearance Defence Guidelines
description: Project-specific game context, architecture, design details, and specific guidelines for Clearance Defence.
---

# Clearance Defence Context

## Game Concept

**Clearance Defence** is a tower defence game set in a retail store at night. Seasonal clearance goods fight for survival against invading Summer products (garden gnomes). The game combines classic tower defence with resource logistics and a quirky theme.

## Core Design Pillars
1. **Resource Logistics** — towers need ammo resupply via engineers from FOBs
2. **Whimsical Theme** — "Make-Do" improvised weapons from retail goods
3. **Readable Combat** — "Pawn" art style ensures clarity during intense waves

## Project Architecture & Systems

### The Grid System
- Tile size: `Vector2i(256, 128)` isometric
- Placement: snap to centre of build tile
- Footprint: 1×1 tiles for all towers/walls

### The GameManager Singleton
Central coordinator for game state. Access via:
```gdscript
GameManager.current_wave
GameManager.build_layer
GameManager.ground_layer
```

### Tower System & Inheritance
All towers extend a shared base with `@export` stats, upgrade paths, and ammo systems. When adding a new tower:
1. Create the scene in `scenes/production/towers/`
2. Extend the base tower script
3. Override `_fire()` for custom attack behaviour
4. Add upgrade path resources to `scenes/production/resources/`

### The Tower Balance Triangle
| Tower | Role |
|-------|------|
| Projectile (Extinguisher, etc) | General purpose, reliable |
| Bombardier | Area denial, explosive |
| Laser | Single target, battery-hungry |

### Ammo Economy Flow
```
Safe Zone (generates resources)
    → Delivery Engineers haul to FOBs
        → Engineers resupply towers from FOBs
            → Towers consume ammo
```

### Wave Definitions
Waves are defined as `.tres` resources in `scenes/production/resources/`:
- `wave_1.tres` through `wave_N.tres`
- Configure: enemy count, spawn rate, enemy types, reward resources

## Debugging Utilities
Located in the root directory:
- `debug_check_bounds.gd` — boundary checking utilities
- `debug_vectors.gd` — vector visualisation
- `inspect_sentry.gd` — Sentry integration inspection

When Pathfinding fails, always verify `build_layer` cells are correctly marked after placing structures.
