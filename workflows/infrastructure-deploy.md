---
description: Deploy Terraform & CDK Infrastructure Manually
---

# Deploy Infrastructure Workflow

Use this workflow to deploy infrastructure updates natively via the agent, avoiding the slower/fragile CI/CD pipeline.

// turbo-all

1. **Format Terraforms:** Format all terraform configurations in the repository
   `terraform fmt -recursive infra/`

2. **Discord Bot Module:** Initialize and apply the discord bot infrastructure
   `cd infra/discord-bot; terraform init -upgrade; terraform apply -auto-approve`

3. **Ops Bot Module:** Initialize and apply the operations bot infrastructure
   `cd infra/ops-bot; terraform init -upgrade; terraform apply -auto-approve`

4. **Gamification API Module:** Initialize and apply the Gamification API persistence/config
   `cd infra/gamification-api; terraform init -upgrade; terraform apply -auto-approve`

5. **Admin Dashboard Module:** Initialize and apply the admin dashboard site configuration
   `cd infra/admin-dashboard; terraform init -upgrade; terraform apply -auto-approve`

6. **Gamification CDK Module:** Synthesize and deploy the CDK application
   `cd infra/gamification-cdk; npx aws-cdk@latest deploy --profile arundelcloud --require-approval never`
