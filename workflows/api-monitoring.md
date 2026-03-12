---
description: UptimeRobot API and Service Monitoring
---

# API Monitoring Rules

Whenever a new API, endpoint, or service is deployed for Flat Frog Games, it must be added to UptimeRobot for monitoring and alerting.

## Requirements

1. **UptimeRobot Monitors**: All public-facing and internal foundational APIs must have an HTTP/s monitor configured in UptimeRobot.
2. **Alert Contacts**: The monitor must be linked to the appropriate alert contact (e.g., Discord webhook, email, or Slack/Google Chat).
3. **Status Pages**: Update any applicable Status Pages to reflect the new API endpoints being monitored.
4. **Heartbeats**: For scheduled tasks or cron jobs, configure Heartbeat monitoring to ensure jobs are executing successfully.
5. **UptimeRobot API Key Coordinates**: You will need the API keys and contact IDs from AWS SSM Parameter Store:
   - API Key: `/uptimerobot/api-key`
   - Google Chat Contact ID: `/uptimerobot/googlechat-contact-id`

## Steps for adding a new Monitor

1. Log in to UptimeRobot.
2. Click **+ Add New Monitor**.
3. Select **Monitor Type** (usually HTTP(s) or Keyword).
4. Enter a **Friendly Name** (e.g., "Gamification API - Transactions").
5. Enter the **URL (or IP)**. If it requires an API key, use the Advanced Settings to add headers/authentication.
6. Set the **Monitoring Interval** (default is usually 5 minutes, but critical APIs should be checked more frequently if the plan allows).
7. Select the **Alert Contacts to Notify** (to ensure the dev team is alerted immediately).
8. Save the monitor.

*Always verify the monitor operates correctly (returns a green "Up" status) shortly after creation.*
