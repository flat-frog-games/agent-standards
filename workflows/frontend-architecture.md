---
description: Frontend Architecture & Engineering Standards
---

# Frontend Architecture & Engineering Standards

This workflow defines the standard operating procedures for developing and maintaining frontend applications (like `flatfrog.games` and `toadingtonadmin.flatfrog.games`) within the Flatfrog Games ecosystem.

## 1. Core Technology Stack
All new web frontend properties MUST adhere to the following stack to ensure consistency and maintainability across the organization:
*   **Framework**: Astro (v5+)
*   **UI Components**: Use the centralized `@flatfrog/ui` NPM package as the source of truth for UI elements.
*   **Styling**: Vanilla CSS utilizing CSS Variables corresponding to the centralized design tokens. Avoid TailwindCSS unless explicitly approved.
*   **Authentication**: AWS Cognito + AWS Amplify SDK.
*   **Hosting**: AWS S3 + CloudFront (or Cloudflare Pages if migrating).

## 2. Authentication Standard (Google Workspace SSO)
When building administrative or internal tools (`toadingtonadmin.flatfrog.games`), authentication is mandatory.
*   We use **AWS Cognito User Pools** configured with **Google Workspace (SAML/OIDC)**.
*   The frontend MUST use `aws-amplify` to prompt the login flow.
*   The frontend MUST capture the JWT token and pass it securely in the `Authorization: Bearer <token>` header to all backend API (Lambda) requests.
*   The backend Go Lambdas MUST verify this Cognito JWT before performing any actions.

## 3. UI and the "Brand Bible"
Consistency is key. Do not recreate buttons, forms, or color variables in individual frontend repositories.
*   **The Shared UI Repo**: All reusable React/Astro components and design tokens (CSS variables for colors, spacing, typography) MUST live in the shared `ui-core` repository.
*   **Storybook / Brand Bible**: Before building a new component in an application, check the centralized Storybook or Astro Starlight documentation for existing components.
*   **Contributing Back**: If an application requires a new, generally useful UI component, build it in the application first but flag it to be extracted back into `@flatfrog/ui`.

## 4. Code Quality & Linting
Engineering standards are enforced via code.
*   All frontend repositories MUST install and extend the shared `.eslintrc` and `.prettierrc` packages from the centralized UI repo.
*   Before committing, running `npm run lint` and `npm run format` should yield zero errors.
*   When generating frontend components, ensure they use semantic HTML5, have clear ARIA labels where necessary, and use modern typography (e.g., from Google Fonts like Inter, Roboto, or Outfit).
*   Visual excellence is required: Implement modern web designs with dark modes, glassmorphism, dynamic animations, and vibrant colors matching the brand identity.

## 5. Deployment
*   Use GitHub Actions for CI/CD.
*   The pipeline should verify linting, run tests (e.g., Playwright for E2E), and deploy.
