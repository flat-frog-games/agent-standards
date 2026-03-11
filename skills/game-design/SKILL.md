---
name: Game Design
description: Generic game design patterns, balance principles, and wave design patterns.
---

# Game Design Skill

## Design Pillars

When creating or iterating on a game's design, define robust pillars that anchor your creative decisions:
1. **Core Loop** — What the player does minute-to-minute (e.g., gather resources -> build defenses).
2. **Strategic Depth** — Ensuring player choices matter, such as specialized upgrade paths.
3. **Thematic Cohesion** — Mechanics should reflect the thematic narrative.

## Balance Framework

### Categorizing Roles

| Generic Role | Strength | Weakness |
|--------------|----------|----------|
| Generalist | Jack-of-all-trades | Lacks specialized burst/utility |
| Area of Effect (AoE) | Crowd control/damage | Slow fire rate / High cost |
| Support/Utility | Buffs/debuffs | Low or zero base damage |
| Single Target DPS | High burst damage | Vulnerable to swarms |

### Economy Flow Standard
An internal economy flowchart should trace the life of a resource:
```
Generation (Passive/Active)
    → Collection / Logistics
        → Expenditure (Upgrades/Units)
```

### Difficulty Scaling Approaches

| Setting | Enemy HP | Enemy Speed | Economic Modifier | Starting Resources |
|---------|----------|-------------|-------------------|--------------------|
| Easy | Base | Base | 1.5× | High |
| Normal | Base | Base | 1.0× | Standard |
| Hard | Higher | Faster | 0.8× | Low |

## Progression & Content Design

### Introducing Mechanics (Pacing)
1. **Early game** — Teach mechanics one at a time (e.g., place unit, gather resource).
2. **Mid game** — Introduce pressure (multiple paths, complex enemy abilities).
3. **Late game** — Test mastery (resource scarcity, overwhelming speed, bosses).

### Upgrade Path Standard
When creating branching upgrade trees:
- **Variant A**: Focused specialization (e.g., extreme single-target damage).
- **Variant B**: Spread utility (e.g., wide area effects).
- **Rule**: Both paths must be viable alternatives, ensuring no single "correct choice" dominates every scenario.

## New Content Integration
When introducing new units/mechanics:
1. Define the role (what gameplay gap does it fill?).
2. Set base attributes.
3. Outline upgrades/progression.
4. Update central documentation, wiki, and changelog immediately.
