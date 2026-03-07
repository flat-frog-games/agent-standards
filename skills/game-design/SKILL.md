---
name: Game Design
description: Tower defence game design patterns, balance principles, and design documentation for Clearance Defence
---

# Game Design Skill

## Game Concept

**Clearance Defence** is a tower defence game set in a retail store at night. Seasonal clearance goods fight for survival against invading Summer products (garden gnomes). The game combines classic tower defence with resource logistics and a quirky theme.

## Design Pillars

1. **Resource Logistics** — towers need ammo resupply via engineers from FOBs
2. **Strategic Depth** — upgrade path choices at level 2 (branching specialisations)
3. **Whimsical Theme** — "Make-Do" improvised weapons from retail goods
4. **Readable Combat** — "Pawn" art style ensures clarity during intense waves

## Balance Framework

### Tower Balance Triangle

| Tower | Role | Strength | Weakness |
|-------|------|----------|----------|
| Projectile | General purpose | Cheap, reliable | Low DPS |
| Bombardier | AoE damage | Area denial | Expensive, slow |
| Extinguisher | Crowd control | Slows enemies | Low damage |
| Laser | Single target DPS | High damage | Battery-hungry |

### Economy Flow
```
Safe Zone (produces resources)
    → Delivery Engineers carry to FOBs
        → Engineers resupply towers from FOBs
            → Towers consume ammo fighting enemies
```

### Difficulty Scaling

| Setting | Enemy HP | Enemy Speed | Resource Multiplier | Starting Resources |
|---------|----------|-------------|--------------------|--------------------|
| Easy | Base | Base | 1.5× | More |
| Normal | Base | Base | 1.0× | Standard |
| Hard | Higher | Faster | 0.75× | Less |

## Wave Design Principles

1. **Early waves** — teach mechanics one at a time (place tower → manage ammo → upgrade)
2. **Mid waves** — introduce pressure (multiple paths, tougher enemies)
3. **Late waves** — test mastery (resource scarcity, fast enemies, boss gnomes)

### Wave Configuration
Waves are defined as `.tres` resources in `scenes/production/resources/`:
- `wave_1.tres` through `wave_N.tres`
- Configure: enemy count, spawn rate, enemy types, reward resources

## Upgrade Path Design

Each tower branches at level 2 into two mutually exclusive paths:

```
Level 1 (Base) → Level 2 (choose A or B) → Level 3 (A or B enhanced)
```

Design rules for paths:
- **Path A**: Usually the "focused" variant (more damage, less area)
- **Path B**: Usually the "spread" variant (more area, less single-target)
- Both paths must be viable — no obvious "right choice"

## Adding New Content

### New Tower Checklist
1. Define the role (what gap does it fill?)
2. Set base stats (damage, range, fire rate, cost)
3. Design two upgrade paths with clear identity
4. Ensure unique ammo type if needed
5. Update wiki, asset list, and changelog

### New Enemy Checklist
1. Define the threat (what does it challenge?)
2. Set stats (HP, speed, damage, reward)
3. Consider visual distinction from existing enemies
4. Plan which wave(s) it appears in
5. Update wiki, asset list, and changelog

## Useful References
- Wiki docs: `docs/wiki/` (source of truth for stats)
- Balance changes: use `/balance-update` workflow
- Art direction: Notion ART GDD page
- Asset tracking: Notion Asset List page
