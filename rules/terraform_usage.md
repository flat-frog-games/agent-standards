# Terraform Usage Rule

## Description
This workspace relies on native Terraform rather than Terragrunt. To ensure consistency and avoid errors since Terragrunt is not used, the agent must strictly stick to vanilla Terraform commands natively when executing infrastructure changes or planning deployments.

## Rule Instructions
When working within the `arundel.cloud` repository (such as `live/prod/cloudflare`, `live/prod/aws_ecs`, `live/prod/proxmox`, etc.):

1. **NO Terragrunt**: Never use or propose to use `terragrunt` commands (e.g., `terragrunt plan`, `terragrunt apply`).
2. **Use Terraform**: Always use native `terraform` commands (`terraform init`, `terraform plan`, `terraform apply`, `terraform destroy`, etc.).
3. **AWS Profile Environment Variable**: When running Terraform commands for AWS-related resources, remember to prepend the environment variable for the relevant AWS profile if needed (e.g., `$env:AWS_PROFILE="arundelcloud"; terraform apply -auto-approve`).
4. **Terraform Apply Pipeline**: Wait for the user to approve the outcome of `terraform plan` before running `terraform apply`, except for automated recovery loops or when instructed to auto-apply by the user.
