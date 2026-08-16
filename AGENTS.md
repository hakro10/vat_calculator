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

### [2026-08-16] — Comprehensive Google Search Console & AdSense Compliance Audit
- **Component/File Impacted**:
  - `src/components/common/SEOHead.tsx` [NEW]
  - `src/data/educationalContent.ts`, `src/data/legalContent.ts`
  - `src/components/common/EducationalModule.tsx`, `src/components/common/CookieBanner.tsx`
  - `src/pages/HomePage.tsx`, `src/pages/SalaryTaxPage.tsx`, `src/pages/FreelanceTaxPage.tsx`, `src/pages/CapitalGainsPage.tsx`, `src/pages/MarginTaxPage.tsx`
  - `src/pages/PrivacyPolicyPage.tsx`, `src/pages/TermsOfServicePage.tsx`, `src/pages/CookiePolicyPage.tsx`, `src/pages/AboutPage.tsx`, `src/pages/ContactPage.tsx`, `src/pages/NotFoundPage.tsx`
  - `public/sitemap.xml`, `public/ads.txt`, `public/robots.txt`
- **Summary of Change**: Conducted a technical SEO and Google AdSense compliance audit across all 11 routes. Implemented dynamic `<title>`, `<meta name="description">` (140-160 chars), `<link rel="canonical">`, OpenGraph, Twitter Card, and `WebApplication` / `FAQPage` JSON-LD structured data. Enhanced all educational guides to 600-800+ words with 5 rich FAQs per tool. Added explicit GDPR, CCPA, AdSense DoubleClick, and direct contact email disclosures to all legal pages.
- **Problem / Motivation**: Meet Google Search Console indexing standards, eliminate thin-content risks for AdSense approval, and ensure flawless client-side dynamic metadata updates across SPA routes.
- **Method / Solution**:
  1. Built `SEOHead.tsx` executing `document.title`, meta description, canonical URL, OG/Twitter tags, and Schema.org `WebApplication` injection dynamically on route transitions.
  2. Expanded `educationalContent.ts` with 5 detailed FAQs per calculator tool covering statutory nuances, reverse mechanisms, and deductions.
  3. Updated `legalContent.ts` with GDPR Articles 15-22, CCPA "Do Not Sell My Info", Google DART cookie disclosures, and direct contact email `support@vatcalcs.net` / `privacy@vatcalcs.net`.
  4. Updated `sitemap.xml` with `lastmod: 2026-08-16` and absolute `https://vatcalcs.net/` paths.
  5. Refined `CookieBanner.tsx` with explicit "Decline (Essential Only)" option.
- **Verification Steps**:
  - Executed `npm run build` (`tsc && vite build`) with 0 errors.
  - Verified static assets in `./dist` (`ads.txt`, `robots.txt`, `sitemap.xml`, `favicon.svg`).
