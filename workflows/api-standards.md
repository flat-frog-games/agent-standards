---
description: Standards and best practices for creating, documenting, and maintaining APIs.
---

# API Documentation & Management Standards

When building, expanding, or documenting any APIs (like the Gamification API), we follow a strict three-pillar approach. This ensures our APIs are accessible to humans, perfectly parseable by AI agents, and built to robust industry standards.

---

## Pillar 1: Human Documentation (The "Why" and "How")
**Location:** Notion / Markdown Documentation
**Audience:** Product Managers, Developers, Stakeholders

Human documentation provides the context that an API specification cannot. Do NOT manually duplicate every single API parameter into a Notion page, as this quickly falls out of sync with the codebase. 

Instead, focus on:
- **Overview & Business Logic:** Explain the API's high-level purpose, the problem it solves, and the core requirements.
- **Architecture:** High-level diagrams (e.g., Miro) showing how the API interacts with databases, third-party services, and frontends.
- **Authentication & Security Concept:** Explain in plain English how the API is secured (e.g., "Locked to IP X via WAF", "Requires Cognito Bearer Token").
- **Core Use Cases (Workflows):** Describe how multiple endpoints connect to solve a business problem (e.g., "To register a user, first call endpoint A, then pass the resulting ID to endpoint B").
- **Interactive Examples / Quick Start:** Provide copy-pastable cURL commands or SDK examples for the most common tasks.

---

## Pillar 2: API Layer Documentation (The "What" and "Where")
**Location:** OpenAPI (Swagger) Specification (`openapi.yaml` or `swagger.json`)
**Audience:** AI Agents, Code Generators, API Consumers

The OpenAPI specification is the absolute source of truth for the API contract. AI Agents and automated tools rely exclusively on this layer to understand how to interact with the API.

Must include:
- **Structured Data:** Use highly structured, predictable formats for machine parsing.
- **Explicit Contracts:** Define all paths, parameters, data types, required versus optional fields, and default values directly in the OpenAPI spec.
- **Error Handling:** Detail exact HTTP status codes and error message structures returned via the schema definitions.
- **Semantic Meaning:** Do not rely on implicit context. Explicitly state the purpose of each endpoint and how it combines with others through OpenAPI descriptions or tags.

---

## Pillar 3: API Best Practices (Development & Maintenance)
**Location:** Codebase & Infrastructure

When developing and maintaining APIs, adhere to these industry standards:

### 1. Versioning
- **Always Version APIs:** Use URL versioning (e.g., `/v1/users`) or header versioning to ensure backward compatibility.
- **Deprecation Strategy:** Never remove an endpoint without a clear deprecation schedule and communicating alternative endpoints.

### 2. Security
### 2. Security
- **Least Privilege:** API roles and Lambda execution roles should only have access to exactly what they need.
- **Edge Protection:** All public-facing APIs must be protected by a WAF (Web Application Firewall) to handle rate limiting and DDoS protection. 
- **Internal / Development APIs:** APIs that are not yet ready for the public, or are meant for internal administration, MUST be secured at the WAF level using an IP Set whitelist restricted to the developer's Home IP.
- **Authentication:** Enforce strict authentication (e.g., Cognito User Pools, API Keys) on all non-public endpoints.

### 3. Maintenance & Observability
- **Error Tracking:** Implement centralized error tracking (e.g., Sentry) to catch unhandled exceptions immediately.
- **Structured Logging:** Log payloads, correlation IDs, and execution times to allow for effective debugging across distributed architectures.
- **Keep Specs in Sync:** The `openapi.yaml` MUST be updated in the same PR/commit as the code changes. An out-of-date Swagger file is worse than no Swagger file.

### 4. Go & AWS Lambda Specifics
- **Performance:** Compile Go binaries with `GOARCH=arm64` for lower AWS cost and faster cold starts. Keep binaries lean.
- **Project Structure:** For moderately large APIs, use a modular monolith architecture. Group related handlers in `cmd/` but deploy them as separate AWS Lambda functions to avoid "serverless hell".
- **Handlers vs Business Logic:** The Lambda `main.go` handler should only parse the API Gateway event, extract parameters, and handle top-level HTTP response logic. All actual business logic must live in the `internal/` service layer.

### 5. Infrastructure Separation (Terraform vs AWS CDK)
To maintain a clean and scalable deployment pipeline, we enforce a strict separation of concerns for Infrastructure as Code (IaC):
- **Terraform (Underlying Infrastructure):** Use Terraform exclusively for persistent, stateful, or foundational infrastructure that changes infrequently. This includes DynamoDB Tables, Cognito User Pools, SSM Parameters, ACM Certificates, and global WAF ACLs.
- **AWS CDK (Compute & Routing):** Use AWS CDK exclusively for the API compute and routing layer. This includes the API Gateway, Lambda functions, Lambda IAM execution roles, and attaching the pre-existing WAFs/Certificates. CDK is executed during the standard CI/CD deployment pipeline.
- **Proxy Integrations:** Always use API Gateway Lambda Proxy integrations. Rely on `github.com/aws/aws-lambda-go/events` to parse requests and format responses.
- **CORS & Binary Data:** Explicitly handle CORS headers within the Go Lambda response itself. If handling images/binary data, ensure API Gateway is configured for binary media types and the Go code handles base64 decoding correctly.
