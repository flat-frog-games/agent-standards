---
description: AWS Serverless API Best Practices
---

# AWS Serverless API Best Practices

When building serverless APIs (like the Gamification API) for Flat Frog Games / Ser Toadington, the following best practices must be adhered to:

## 1. Infrastructure as Code (AWS CDK)
- We use **AWS CDK (with Go or TypeScript)** instead of Terraform for serverless API compute because it offers far superior constructs for Lambda functions (e.g., `awscdklambdagoalpha`).
- Keep environment configuration and deployment constructs localized to the `infra/` folder.

## 2. API Security and Rate Limiting
- **WAF Integration:** All publicly accessible API Gateway endpoints must be associated with an AWS WAF WebACL to protect against malicious spikes and enforce global IP allowlisting/rate limiting. Example: Reference `/gamification/waf_arn` from SSM.
- **Application-Level Rate Limits:** Implement granular, application-level rate limiting in code backed by DynamoDB (e.g. `ser-toadington-rate-limits` table) to prevent token/points spam at the user level.

## 3. Principle of Least Privilege (IAM)
- Lambda execution roles must be tightly scoped. Only authorize actions on *specific* resource ARNs (e.g., specific DynamoDB tables, specific SSM parameters) instead of using `*`.
- Examples include restricting DynamoDB `PutItem` to only the `gamification_ledger`.

## 4. Secret Management
- **Use AWS Systems Manager (SSM) Parameter Store** or **Secrets Manager** exclusively.
- **Runtime Fetching:** Do not pass strictly confidential secrets into Lambda environment variables if they can be fetched securely at runtime using the AWS SDK from SSM (prevents secrets from lingering in Lambda environment configs).
- Use SSM to resolve DSNs for Error Reporting (Sentry).

## 5. Persistence
- Use Amazon DynamoDB for all serverless state due to its scale-to-zero capability and ultra-low latency, matching the serverless execution model.
