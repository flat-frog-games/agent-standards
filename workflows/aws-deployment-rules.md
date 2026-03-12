---
description: AWS Deployment Rules
---

# AWS Deployment Rules

When interacting with AWS via the CLI or Terraform for Flatfrog or Ser Toadington environments:

1. **AWS Profile:** You MUST ALWAYS use the `arundelcloud` AWS profile.
   - For AWS CLI, append `--profile arundelcloud`
   - For Terraform, specify `profile = "arundelcloud"` in the `provider "aws"` block.

2. **AWS Region:** Depending on the service:
   - For globally-oriented services or components matching `ser-toadington` infrastructure, use `eu-west-2` (London) unless otherwise specified.
   - For older Flatfrog infrastructure, check if `eu-west-1` is needed.
