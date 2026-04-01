# Deployment Runbook

## Standard Checklist
- Confirm the target environment before deployment.
- Validate application and database configuration files.
- Run smoke tests after rollout.

## Escalation
- Roll back production changes if health checks fail.
- Keep experimental releases behind explicit environment flags.
