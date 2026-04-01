# System Architecture

## Overview
DevOps Simulator uses a shared microservices foundation with environment-specific behavior for production, development, and experimental workflows. The final merge keeps the stable production path, preserves development tooling, and gates experimental capabilities behind a dedicated profile instead of making them the default.

## Core Architecture

### 1. Application Layer
- Technology: Node.js + Express
- Shared responsibility: API handling, configuration loading, health endpoints
- Runtime profiles:
  - Production runs on port 8080 with SSL and rolling updates.
  - Development runs on port 3000 with hot reload and debugger support.
  - Experimental runs on port 9000 with optional AI and multi-port telemetry.

### 2. Database Layer
- Production: PostgreSQL with replication and scheduled backups
- Development: local PostgreSQL with relaxed security and seed data support
- Experimental: distributed cluster with read replicas, geo-redundant backups, and AI-assisted optimization

### 3. Monitoring and Observability
- Baseline metrics: CPU, memory, disk, and application health
- Development additions: verbose logs, debug snapshots, faster polling
- Experimental additions: predictive alerts, anomaly checks, and multi-cloud status reporting

### 4. Deployment Strategy
- Production: rolling update workflow for stable releases
- Development: docker-compose oriented workflow for local iteration
- Experimental: canary rollout with optional AI analysis and chaos testing

## Environment Merge Strategy
The resolved repository intentionally combines all three branches:

- `main` remains the stable default and preserves operational production values.
- `dev` contributes local developer experience features such as hot reload, debug logging, mock APIs, and Docker Compose deployment.
- `conflict-simulator` contributes advanced capabilities, but only under the `experimental` profile so those features do not override stable defaults.

## Security Model
- Production keeps SSL and stronger database transport requirements.
- Development explicitly documents lower-friction local settings.
- Experimental adds zero-trust and audit logging concepts without forcing them on the standard runtime path.

## Why This Resolution Is Safer
This merged architecture avoids the earlier problem where experimental settings replaced the stable configuration. Instead, production remains the default profile, development stays practical for local work, and experimental behavior is available only when intentionally selected.
