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

### [2026-08-16] — Light Mode Theme Alignment & Removal of Hardcoded Dark Blocks
- **Component/File Impacted**:
  - `src/components/common/EducationalModule.tsx`
  - `src/components/calculators/VatCalculator.tsx`
  - `src/components/calculators/SalaryCalculator.tsx`
  - `src/components/calculators/FreelanceCalculator.tsx`
  - `src/components/calculators/CapitalGainsCalculator.tsx`
  - `src/components/calculators/MarginCalculator.tsx`
- **Summary of Change**: Fixed all hardcoded dark `bg-slate-900` sections so that in Light Mode all hero cards, summary blocks, formula boxes, and quarterly payment cards render with brand emerald and light backgrounds, while properly switching to dark slate in Dark Mode.
- **Problem / Motivation**: In Light Mode, several hero result cards and formula code boxes retained pitch-black/dark navy background blocks (`bg-slate-900`) instead of adapting dynamically to the active theme.
- **Method / Solution**:
  1. Updated `EducationalModule.tsx` formula block from hardcoded `bg-slate-900` to `bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800`.
  2. Updated result hero cards in `VatCalculator.tsx`, `SalaryCalculator.tsx`, `CapitalGainsCalculator.tsx`, and `MarginCalculator.tsx` to `bg-emerald-600 dark:bg-slate-900 text-white` with glowing emerald shadows in Light Mode.
  3. Updated quarterly payment box in `FreelanceCalculator.tsx` to `bg-amber-500/10 dark:bg-slate-900 border-amber-500/30`.
- **Verification Steps**: Ran full build (`tsc && vite build`) with 0 errors and verified rendering across all calculator routes.

### [2026-08-16] — Technical SEO, AdSense Hardening & Route Canonical Verification
- **Component/File Impacted**:
  - `src/pages/HomePage.tsx`
  - `public/ads.txt`, `public/robots.txt`, `public/sitemap.xml`, `wrangler.jsonc`
  - `AGENTS.md`
- **Summary of Change**: Hardened the dynamic canonical tag generation for `/` vs `/vat-calculator` routes in `HomePage.tsx` so both render accurate canonical link and Schema.org `FAQPage` URLs. Verified full compliance across `public/ads.txt` (AdSense publisher ID `pub-2116463006242210`), `public/robots.txt`, `public/sitemap.xml` (all 11 absolute URLs with 2026-08-16 timestamp), thin content avoidance (770 to 1,070+ words per tool), GDPR/CCPA legal compliance, SPA fallback routing in `wrangler.jsonc`, and zero build errors in `dist/`.
- **Problem / Motivation**: Fulfill complete hardening and compliance check for Google Search Console, Bing Webmaster Tools, and Google AdSense guidelines.
- **Method / Solution**:
  1. Updated `HomePage.tsx` to detect `location.pathname === '/vat-calculator'` and assign the corresponding canonical tag and FAQ schema URL.
  2. Verified word counts on all 5 educational guides: VAT (1,076 words), Salary (864 words), Freelance (771 words), Capital Gains (831 words), Margin (821 words).
  3. Confirmed valid Schema.org `WebApplication` and `FAQPage` structured data injection.
  4. Verified Cloudflare Pages SPA fallback in `wrangler.jsonc`.
- **Verification Steps**: Ran `npm run build` (`tsc && vite build`) with 0 errors and verified dist output assets.

