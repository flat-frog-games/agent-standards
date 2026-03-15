---
name: Steam Deployment
description: Building, exporting, and deploying Clearance Defence to Steam via CI/CD and Steamworks
---

# Steam Deployment Skill

## Overview

Clearance Defence deploys to Steam via GitHub Actions. The pipeline handles building the Godot project and uploading to Steam using the Steamworks SDK.

## Export Configuration

### Current Export Presets
Located in `export_presets.cfg`:

| Preset | Platform | Architecture | Notes |
|--------|----------|-------------|-------|
| Windows Desktop | Windows | x86_64 | Primary target. S3TC/BPTC textures. |

### Building Locally
```bash
# Export debug build
godot --headless --export-debug "Windows Desktop" ./build/clearance-defence.exe

# Export release build
godot --headless --export-release "Windows Desktop" ./build/clearance-defence.exe
```

## CI/CD Pipelines

GitHub Actions workflows in `.github/workflows/`:

| Workflow | File | Trigger | Purpose |
|----------|------|---------|---------|
| Main | `main.yml` | Push to main | Build validation |
| Test | `test.yml` | PR / Push | Run GdUnit4 tests |
| Release | `release.yml` | Tag push (`vX.Y.Z`) | Build + deploy to Steam |

### Release Pipeline Flow
```
Tag push (vX.Y.Z)
    → Checkout code
    → Install Godot (headless)
    → Export release build
    → Upload to Steam via SteamCMD
    → Create GitHub release
```

## Steam Configuration

### Steamworks Partner Portal
- URL: https://partner.steamgames.com
- Manage: store page, builds, depots, beta branches

### Steam App Structure
```
AppID
├── Depot (Windows)
│   └── Build output (.exe + .pck)
├── Store Assets
│   ├── Header capsule (460×215)
│   ├── Small capsule (231×87)
│   ├── Library hero (3840×1240)
│   ├── Library logo (1280×720)
│   └── Screenshots (1920×1080)
└── Branches
    ├── default (stable)
    └── beta (testing)
```

### SteamCMD Upload
The CI pipeline uses SteamCMD to push builds:
```bash
steamcmd +login "$STEAM_USER" "$STEAM_PASS" \
    +run_app_build app_build.vdf \
    +quit
```

Credentials are stored as GitHub Secrets:
- `STEAM_USER` — Steam build account username
- `STEAM_PASS` — Steam build account password
- `STEAM_GUARD` — Steam Guard code (if 2FA)

## Release Checklist

Use the `/create-release` workflow, which covers:

1. ✅ All PRs merged to main
2. ✅ CHANGELOG.md updated (move Unreleased → version header)
3. ✅ Version bumped in `project.godot`
4. ✅ Commit + tag pushed
5. ✅ GitHub Actions deploys to Steam
6. ✅ GitHub Release created
7. ✅ Verify build on Steam (check Steamworks partner portal)

## Store Page Best Practices

### Screenshots
- Show actual gameplay, not menus
- Capture at 1920×1080 minimum
- Include variety: tower placement, wave combat, upgrade paths, resource management
- Add brief captions in Steam's screenshot upload tool

### Description
- Lead with the hook (seasonal clearance goods fighting for survival)
- List key features as bullets
- Include system requirements
- Mention Early Access status if applicable

## Troubleshooting

### Common Build Issues
- **Missing export templates**: Ensure Godot export templates match the engine version
- **Sentry parse errors in CI**: The CI Godot build may not have Sentry SDK — guard with `Engine.has_singleton("SentrySDK")`
- **Sentry validation failures in CI (`options/dsn line not found`)**: Godot automatically strips empty string variables like `options/dsn=""` from `project.godot` on save. You must manually re-add `options/dsn=""` directly to `project.godot` (bypassing the editor) so the CI pipeline's `sed` command has a placeholder to inject the secret into.
- **Display server errors**: CI runs headless — use `--headless` flag and avoid display-dependent code in autoloads
