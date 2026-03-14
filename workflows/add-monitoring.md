---
description: How to add UptimeRobot monitoring and alerting to Flat Frog Games services
---

# UptimeRobot Terraform Monitors

When configuring UptimeRobot monitors for Flat Frog Games services, always use the **official** HashiCorp UptimeRobot provider (`uptimerobot/uptimerobot`), not the deprecated `louy/uptimerobot` community provider.

## Provider configuration

Ensure Terraform configuration includes the official provider:
```hcl
terraform {
  required_providers {
    uptimerobot = {
      source  = "uptimerobot/uptimerobot"
    }
  }
}
```

The AWS SSM Parameter Store holds the secure API Key (`/arundel-cloud/mcp/uptimerobot_api_key`) which should be injected into the provider block.

## Schema Highlights

The official UptimeRobot configuration has specific schemas that must be followed. AI Agents should review these before attempting to deploy or modify monitors.

### 1. Monitor Base Information
- Use the `name` attribute instead of the deprecated `friendly_name`.
- The `type` attribute relies on strict **ALL CAPS** enumerations (e.g., `"HTTP"`, `"KEYWORD"`, `"HEARTBEAT"`, `"PING"`, `"PORT"`).

### 2. HTTP Monitors
Used for basic REST API or website availability checks.
```hcl
resource "uptimerobot_monitor" "example_http" {
  name     = "Example HTTP Check"
  type     = "HTTP"
  url      = "https://api.flatfrog.games/health"
  interval = 60
}
```

### 3. HEARTBEAT Monitors
Used for CRON jobs or intermittent task completion where your services trigger an endpoint to signal health.
- **Required parameter:** `grace_period` must be provided.
- **Action:** DO NOT use the `timeout` argument for HEARTBEAT monitors, as they are mutually exclusive to `grace_period` according to the provider validation.

```hcl
resource "uptimerobot_monitor" "example_heartbeat" {
  name         = "Example Heartbeat Check"
  type         = "HEARTBEAT"
  url          = "https://heartbeat.uptimerobot.com/mXXXXXXXXX-XXXXXXXXXXXXXXXXX"
  interval     = 300
  grace_period = 300
}
```

### 4. KEYWORD Monitors
Used for deeper health checks by verifying a string's presence or absence in an HTTP response.
- **Required parameters:** `keyword_case_type` (e.g., `"CaseSensitive"` or `"CaseInsensitive"`), `keyword_value` (the word to observe), and `keyword_type` (e.g., `"ALERT_EXISTS"` or `"ALERT_NOT_EXISTS"`).

```hcl
resource "uptimerobot_monitor" "example_keyword" {
  name              = "Example Keyword Check"
  type              = "KEYWORD"
  url               = "https://mcp.flatfrog.games/health/deep"
  keyword_type      = "ALERT_NOT_EXISTS"  # Can also be "ALERT_EXISTS"
  keyword_value     = "ERROR"
  keyword_case_type = "CaseSensitive"
  interval          = 60
}
```
