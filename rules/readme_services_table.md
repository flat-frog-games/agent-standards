# README Services Table Updates

## Description
This workspace rule ensures that the `arundel.cloud` documentation stays perfectly accurate and reliable as new services are mapped out or deployments change port routing. 

## Rule Instructions
Whenever a new service or container is added, removed, or updated regarding the networking surface in the `arundel.cloud` repository (specifically in `live/prod/aws_ecs/tasks.tf` or `live/prod/proxmox/main.tf` and its templates):

1. **Review `README.md`**: Check if the service is currently listed in the `## Services` tables.
2. **Update Tables**:
    - Ensure new services are added.
    - Ensure outdated services are removed.
    - Specify the `Port` mapping accurately.
    - Accurately detail the `Local DNS / Public DNS`. If Public DNS exists, note if there are `Local Only` resolution fallbacks.
    - Provide the exact `Security` methodology. (Allowed options: `Public`, `Public (OTP via Cloudflare)`, `Public (WAF Home IP Only)`, `Local Only`, `External App`)
    - Supply a short, readable `Purpose`.
3. **Commit**: Include modifications to the README directly in your PR or commit without needing the user to explicitly ask.
