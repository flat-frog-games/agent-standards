<#
.SYNOPSIS
Synchronizes the local IDE MCP configuration with the agent-standards repository.

.DESCRIPTION
This script automatically tests and copies the latest mcp-sse-proxy.js to the user's
Antigravity AppData folder. It also safely initializes mcp.json if it doesn't already exist.
#>

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$targetDir = Join-Path $env:APPDATA "Antigravity\User"

if (-Not (Test-Path $targetDir)) {
    Write-Host "Creating Antigravity configuration directory..."
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

$sourceProxy = Join-Path $scriptDir "mcp-sse-proxy.js"
$targetProxy = Join-Path $targetDir "mcp-sse-proxy.js"

$sourceTemplate = Join-Path $scriptDir "mcp.json.template"
$targetJson = Join-Path $targetDir "mcp.json"

Write-Host "Syncing MCP SSE Proxy script..."
Copy-Item -Path $sourceProxy -Destination $targetProxy -Force
Write-Host "Successfully updated $targetProxy"

if (-Not (Test-Path $targetJson)) {
    Write-Host "mcp.json not found. Initializing from template..."
    
    # Read the template and parse as JSON to string manipulate safely or just replace regex
    $jsonContent = Get-Content $sourceTemplate -Raw
    
    # Replace <USER> with the actual username
    $username = $env:USERNAME
    $jsonContent = $jsonContent -replace "<USER>", $username
    
    # Write the new config
    Set-Content -Path $targetJson -Value $jsonContent
    Write-Host "Successfully generated baseline $targetJson"
    Write-Host "IMPORTANT: Please open $targetJson and fill in your YOUR_HUB_API_KEY and Cloudflare tokens." -ForegroundColor Yellow
} else {
    Write-Host "mcp.json already exists at $targetJson." -ForegroundColor Green
    Write-Host "Skipping initialization to preserve existing API keys and custom configuration."
    Write-Host "(If you are debugging a missing new server, you may need to manually compare your mcp.json against mcp.json.template)"
}

Write-Host "Sync Complete. Please restart your IDE to apply any changes." -ForegroundColor Cyan
