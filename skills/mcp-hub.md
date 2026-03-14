---
name: mcp-hub
description: Guidelines and troubleshooting steps for the flatfrog-mcp-hub service
---

# MCP Hub Service Guidelines

This document provides important context, architectural rules, and troubleshooting steps specific to the `mcp-hub` repository. **Always read this before suggesting deployment changes to `mcp-hub`.**

## 1. Architecture Constraints
- **Deployment Strategy**: Replicated Service on AWS ECS.
- **Node Placement**: The service MUST run exclusively on the `flatfrog` node instance. 
  - **Constraint**: `attribute:node-type == flatfrog`.
  - **WARNING**: Do NOT temporarily modify this constraint to deploy to another node (like `arundel`). Attempting to bypass this constraint creates split infrastructure and routing failures (e.g., Cloudflare continuing to route to the offline node).
- **Network Mode**: The ECS Task uses `networkMode: "host"` targeting port `8083`. This means the container maps directly to port 8083 on the underlying EC2 instance OS.

## 2. Common Deployment Issues & Troubleshooting

### Issue: "Resource:ports" Placement Error during Deployment
If an ECS deployment fails to place the `mcp-hub` task with a `Resource:ports` error, or if `mcp.flatfrog.games` returns a `502 Bad Gateway` after a deploy, it usually means the previous container is stuck and still holding port `8083`.

Because the service uses host networking, ECS cannot perform a rolling update when the port is still in use by the old task.

### Diagnosis Steps
To verify if an orphaned Docker container is keeping the port alive:
1. Obtain the `node-type=flatfrog` SSM Instance ID (e.g., `mi-004e861dcd054e31d`):
   ```bash
   aws ecs list-container-instances --cluster arundel-cloud-ecs --region eu-west-2 --profile arundelcloud
   ```
2. Send an SSM command to list the running Docker processes on the host:
   ```bash
   aws ssm send-command \
     --document-name "AWS-RunShellScript" \
     --instance-ids "<INSTANCE_ID>" \
     --parameters '{"commands":["sudo docker ps -a | grep mcp-hub"]}' \
     --region eu-west-2 --profile arundelcloud \
     --output json
   ```
3. Retrieve the command results to see if an old `ecs-mcp-hub` container is still `Up`.

### Resolution Steps
If you find a stuck container holding the port:
1. **Force Kill the Container**: Send another SSM command to run `docker rm -f` on the offending container:
   ```bash
   aws ssm send-command \
     --document-name "AWS-RunShellScript" \
     --instance-ids "<INSTANCE_ID>" \
     --parameters '{"commands":["sudo docker rm -f $(sudo docker ps -q -f name=ecs-mcp-hub)"]}' \
     --region eu-west-2 --profile arundelcloud \
     --output json
   ```
2. Once the old container is killed, port `8083` naturally frees up. The pending ECS deployment should automatically recover, place the new task, and start the new container. 

## 3. General Rules
- Do not propose local application testing without ensuring the correct environment proxies are active.
- UptimeRobot monitors are fully declarative via Terraform. Never make manual UptimeRobot UI changes; always modify `terraform/uptimerobot.tf`.
