# My Git Mastery Challenge Journey

## Student Information
- Name: Shankar
- Student ID: 22MH1A4204
- Personal repository: https://github.com/Shankars57/git-solved-22MH1A4204
- Instructor repository: https://github.com/Partnrnetwork/git-mastery-challenge-template.git
- Original submission date: February 12, 2026
- Recovery and documentation update: April 1, 2026

## Repository Setup
I kept both required remotes configured:

- `origin` -> `https://github.com/Shankars57/git-solved-22MH1A4204`
- `instructor` -> `https://github.com/Partnrnetwork/git-mastery-challenge-template.git`

I used the instructor remote as the source of truth for the pre-built conflict branches:

- `instructor/main`
- `instructor/dev`
- `instructor/conflict-simulator`

## What This Challenge Required Me To Prove
This repository was not just about removing conflict markers. The real requirement was to show that I could:

- merge branches with conflicting intent,
- preserve stable production behavior,
- keep development conveniences,
- isolate experimental features safely,
- and document the Git decisions with enough detail that another reviewer could follow the same path.

## Commands Used

| Command | How I used it in this repository | Concrete outcome |
|---------|----------------------------------|------------------|
| `git remote -v` | Verified both required remotes. | `origin` and `instructor` are both present in `remotes.txt`. |
| `git fetch instructor` | Pulled the instructor branches into my local repo. | `instructor/main`, `instructor/dev`, and `instructor/conflict-simulator` are visible in `branches.txt`. |
| `git merge` | Integrated the provided branches into `main`. | The repository history still shows the original merge path around `8e7b843`. |
| `git stash push -u -m "WIP: unified conflict resolution and Git journey docs"` | Parked my in-progress documentation and config fixes so I could create clean history examples. | I was able to switch branches, create demo commits, then restore my work with `git stash pop`. |
| `git cherry-pick d9db1b2` | Copied a single documentation commit from `feature/cherry-pick-demo` to `main` without merging the full branch. | The runbook commit appears on `main` as `1ce33b4`. |
| `git rebase --autostash main` | Rebased `feature/rebase-demo` after `main` advanced. | The branch is now linear on top of `59ffd63` with new commit ids `c4a601a` and `1b59d08`. |
| `git revert 4a58636` | Safely undid a temporary note on `main`. | `616da46` records the undo without rewriting shared history. |
| `git tag -a v2.0.0-beta ...` | Added an annotated tag after the unified resolution pass. | `tags.txt` now shows `v1.0.0`, `v1.1.0`, and `v2.0.0-beta` with messages. |
| `git log --graph --decorate --all` | Exported the branch graph for review. | `git-graph.txt` shows the cherry-pick branch, rebased branch, and tag. |
| `git status` | Repeatedly checked whether I was operating on a clean or intentionally dirty tree. | Helped me avoid mixing unrelated local edits into the final commits. |

## Conflict Resolution Details

### Merge 1: `main` + `dev`

#### `config/app-config.yaml`
- Problem: `main` was production-first on port `8080`, while `dev` switched to `localhost:3000`, disabled SSL, and added hot reload and debugging.
- Resolution: I changed the file into a unified configuration with separate `production`, `development`, and `experimental` profiles.
- Why this is better: production remains the default, but development settings are preserved instead of being overwritten.

#### `config/database-config.json`
- Problem: production used a replicated database with backups, while development used a local database with weak security and convenience flags.
- Resolution: I introduced profile-based JSON so production, development, and experimental database behavior all live in one valid document.
- Why this is better: it keeps production-safe defaults while still documenting local development behavior explicitly.

#### `scripts/deploy.sh`
- Problem: production used a rolling-update deployment flow, while development expected Docker Compose and test/debug behavior.
- Resolution: I rewrote the script around `DEPLOY_ENV` with dedicated functions for `production`, `development`, and `experimental`.
- Why this is better: the script now chooses behavior intentionally instead of forcing one branch's deployment model on every environment.

#### `scripts/monitor.js`
- Problem: production wanted slower and quieter health checks, while development wanted fast polling and verbose debugging.
- Resolution: I replaced the single hard-coded config with environment profiles selected from `MONITOR_ENV` or `NODE_ENV`.
- Why this is better: one file now supports both stable monitoring and local debug workflows.

#### `docs/architecture.md`
- Problem: the production architecture document and the development architecture document described different runtime assumptions.
- Resolution: I merged them into one architecture file with a shared foundation and explicit environment-specific sections.
- Why this is better: the document now explains what is common and what changes by environment instead of pretending one branch is the whole system.

#### `README.md`
- Problem: the README had drifted between stable and in-development messaging, and my earlier submission even left an incomplete FAQ section.
- Resolution: I rewrote it to describe the repository as an environment-aware project with separate quick starts for production, development, and experimental modes.
- Why this is better: it now matches the actual code and no longer contains an unfinished merge artifact.

### Merge 2: `main` + `conflict-simulator`

#### `config/app-config.yaml`
- Problem: the conflict-simulator branch replaced stable settings with an experimental default, AI flags, and multi-cloud values.
- Resolution: I kept those features, but moved them under the `experimental` profile instead of making them global defaults.
- Why this is better: experimental behavior is available, but it no longer hides the stable production path.

#### `config/database-config.json`
- Problem: the experimental branch switched from a single host to a distributed cluster with read replicas and AI-assisted optimization.
- Resolution: I preserved those settings under the `experimental` database profile.
- Why this is better: the repository now documents advanced infrastructure without breaking simpler environments.

#### `scripts/deploy.sh`
- Problem: the experimental branch introduced canary rollout, multi-cloud deployment, optional AI analysis, and chaos testing.
- Resolution: I kept that logic only inside the `experimental` deployment function.
- Why this is better: canary and AI logic are opt-in instead of silently replacing the production deployment path.

#### `scripts/monitor.js`
- Problem: the experimental branch assumed AI prediction and multi-cloud health output for every run.
- Resolution: I gated predictive logging and cloud status under the `experimental` profile.
- Why this is better: production stays readable, development stays practical, and experimental monitoring still exists.

#### `docs/architecture.md`
- Problem: the architecture document from conflict-simulator was strong on advanced concepts but weak on where they should be enabled.
- Resolution: I kept the experimental ideas, but documented them as an opt-in layer on top of the shared architecture.
- Why this is better: reviewers can now tell which parts are stable and which parts are intentionally experimental.

#### `README.md`
- Problem: the experimental README used the whole project description as if the repository were only an AI build.
- Resolution: I preserved experimental quick-start guidance, but placed it beside the production and development entry points.
- Why this is better: the README now reflects the full repository instead of one branch's identity.

## Advanced Git Evidence

### Stash
I used stash during the recovery pass when I already had local edits in:

- `README.md`
- `config/app-config.yaml`
- `config/database-config.json`
- `docs/architecture.md`
- `scripts/deploy.sh`
- `scripts/monitor.js`
- `GIT_JOURNEY.md`

I temporarily saved them with:

```bash
git stash push -u -m "WIP: unified conflict resolution and Git journey docs" -- README.md config/app-config.yaml config/database-config.json docs/architecture.md scripts/deploy.sh scripts/monitor.js GIT_JOURNEY.md
```

This let me create clean branch-history demonstrations first, then restore my work with `git stash pop`.

### Cherry-Pick
I created `feature/cherry-pick-demo`, committed `docs/runbook.md` there as `d9db1b2`, then applied only that commit to `main`:

```bash
git cherry-pick d9db1b2
```

Result:
- source branch commit: `d9db1b2`
- copied onto `main` as: `1ce33b4`

This is a better fit than a full merge when I want one focused change without pulling in the whole branch.

### Rebase
I created `feature/rebase-demo` with two commits, then advanced `main` with the cherry-pick, revert, and unified conflict-resolution work. After that I rebased the feature branch:

```bash
git rebase --autostash main
```

Before rebase:
- `f1057cd` `docs: add rebase demo notes`
- `ca09d53` `docs: expand rebase demo notes`

After rebase:
- `c4a601a` `docs: add rebase demo notes`
- `1b59d08` `docs: expand rebase demo notes`

This gave me a clean, linear feature branch on top of the latest `main` instead of leaving it based on the older `e1e7e2c`.

### Revert
To demonstrate safe undo on a shared branch, I intentionally added a temporary note on `main`:

- `4a58636` `docs: add temporary rollback note`

Then I safely undid it with:

```bash
git revert 4a58636
```

Result:
- `616da46` `Revert "docs: add temporary rollback note"`

I chose `revert` instead of `reset` here because `main` already tracked `origin/main`, and I did not want to rewrite published history.

### Reset
I did not use `git reset` on `main` because that would have been the wrong tool for a branch that may be pushed. My repo-specific rule after this challenge is:

- `git reset --soft HEAD~1`
  Use this if I make a local commit like `fix: unify environment-aware conflict resolution` and immediately realize I only want to rewrite the commit message or regroup the staged changes before pushing. The file changes stay staged.
- `git reset --mixed HEAD~1`
  Use this if the commit exists but I want the changes back in the working tree so I can split them into smaller commits, for example separating README cleanup from config changes.
- `git reset --hard HEAD~1`
  Use this only on a disposable local branch when I want to abandon the commit and the working tree state completely. I would not use this on the shared `main` branch of this repository.

The important lesson for me was that `reset` is for local history surgery, while `revert` is for safe, auditable undo on shared history.

## Release Tagging
I confirmed annotated tags with messages:

- `v1.0.0` -> `Release 1.0.0: Resolved all conflicts`
- `v1.1.0` -> `Release 1.1.0: Added all features`
- `v2.0.0-beta` -> `Release 2.0.0-beta: unified production, development, and experimental profiles`

I used the beta tag to mark the improved state where the repository finally reflects all three environments without forcing experimental settings as the default.

## Validation Notes
I verified the final content in a lightweight way:

- `node --check scripts/monitor.js` passed.
- `config/database-config.json` parsed successfully through PowerShell `ConvertFrom-Json`.
- I attempted a shell syntax check for `scripts/deploy.sh`, but the Windows Bash environment in this workspace returned an access-denied error, so I documented that limitation instead of pretending it passed.

## Key Learnings

### Merge vs Rebase
In this repository, the original branch integration used merges because the task was explicitly about conflict resolution across branches. That preserved the branch context. My later `feature/rebase-demo` branch was different: it was a small linear feature branch, so rebase made the review history cleaner. The practical rule I learned is:

- use merge when the history of branch integration matters,
- use rebase when I want a private feature branch to sit cleanly on the latest `main` before review.

### Conflict Resolution
The biggest lesson was that a good conflict resolution is not "pick ours" or "pick theirs." The better approach in this challenge was:

- keep production as the default,
- preserve development quality-of-life features,
- isolate experimental features behind explicit flags or profiles.

That principle is visible now in `config/app-config.yaml`, `config/database-config.json`, `scripts/deploy.sh`, `scripts/monitor.js`, `docs/architecture.md`, and `README.md`.

## Reflection
My first submission proved that I could remove conflict markers, but it did not prove the reasoning behind the merge. This recovery pass forced me to correct that. The strongest improvement was not a single Git command; it was making the repository tell a coherent story:

- the remotes are correct,
- the documentation matches the actual files,
- the advanced commands have real evidence,
- and the merged code now combines environments instead of letting the experimental branch overwrite everything.

If I repeat this challenge, I will document my Git journey while I work, not after I finish. That would have prevented the missing `GIT_JOURNEY.md`, the weak README ending, and the mismatch between my explanations and the repository state.
