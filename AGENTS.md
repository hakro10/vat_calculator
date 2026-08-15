# AGENTS.md — Agent Workflow & Project Governance Protocol

Please refer to the comprehensive guidelines and change logs in [AGENTS.md](file:///Users/macos/Documents/AI%20projects/websites_ai/vat_calculator/AGENTS.md).

> **CRITICAL RULE FOR ALL AI AGENTS & DEVELOPERS:**
> Every AI agent, automated tool, or developer working on this codebase **MUST** update [AGENTS.md](file:///Users/macos/Documents/AI%20projects/websites_ai/vat_calculator/AGENTS.md) whenever any change is made to the website.
> After each addon, fix, or update, add a dated note detailing:
> 1. Component/File Impacted
> 2. Summary of Change
> 3. Problem / Motivation
> 4. Method / Solution (how it was handled, sorted, or fixed)
> 5. Verification Steps

### [2026-08-16] — Git Repository Initialization & GitHub Push
- **Component/File Impacted**: Root repository setup (`.gitignore`, `README.md`, `.git/`, `AGENTS.md`).
- **Summary of Change**: Initialized local git repository on branch `main`, added comprehensive `.gitignore`, crafted `README.md`, committed all suite files, linked remote repository `https://github.com/hakro10/vat_calculator.git`, and successfully pushed to `origin/main`.
- **Problem / Motivation**: User requested git version control creation and remote push to GitHub.
- **Method / Solution**:
  1. Created `.gitignore` excluding `node_modules`, `dist`, logs, and temporary caches.
  2. Created complete `README.md` with architecture, features, installation, and deployment commands.
  3. Executed `git init`, `git branch -M main`, and committed 51 files (v1.0.0).
  4. Added remote `origin https://github.com/hakro10/vat_calculator.git` and pushed upstream with tracking (`git push -u origin main`).
- **Verification Steps**: Checked `git status` (clean working tree) and confirmed tracking against `origin/main`.
