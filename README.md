# DevOps Simulator

DevOps Simulator is a CI/CD configuration management project used to practice realistic Git workflows, conflict resolution, and environment-aware deployment design.

## Project Status
- Default mode: production
- Supported modes: production, development, experimental
- Current merged release: 2.1.0
- Student: Shankar
- Student ID: 22MH1A4204

## What Changed In The Final Merge
- Production configuration remains the safe default.
- Development mode keeps hot reload, debug logging, mock APIs, and Docker Compose workflow.
- Experimental features are preserved behind an explicit profile instead of replacing core settings.

## Repository Highlights
- `config/app-config.yaml` contains the unified environment-aware application config.
- `config/database-config.json` keeps separate database profiles for production, development, and experimental usage.
- `scripts/deploy.sh` selects the deployment strategy from `DEPLOY_ENV`.
- `scripts/monitor.js` selects the monitoring profile from `MONITOR_ENV` or `NODE_ENV`.
- `docs/architecture.md` documents the merged architecture and resolution strategy.

## Quick Start

### Production
```bash
export DEPLOY_ENV=production
./scripts/deploy.sh
```

### Development
```bash
export DEPLOY_ENV=development
export RUN_TESTS=true
./scripts/deploy.sh
```

### Experimental
```bash
export DEPLOY_ENV=experimental
export ENABLE_AI_ANALYSIS=true
./scripts/deploy.sh
```

## Monitoring
```bash
MONITOR_ENV=production node scripts/monitor.js
MONITOR_ENV=development node scripts/monitor.js
MONITOR_ENV=experimental node scripts/monitor.js
```

## Documentation
- `docs/architecture.md` explains the merged system design.
- `GIT_JOURNEY.md` documents the Git workflow, conflict resolution strategy, and advanced command usage.
