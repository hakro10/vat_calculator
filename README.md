# VAT & Tax Calculator Suite (vatcalcs.net)

> High-performance, privacy-first VAT and Tax Calculator Suite customized for [vatcalcs.net](https://vatcalcs.net).

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev)

---

## 🚀 Features

- **100% Client-Side Privacy**: All mathematical calculations (invoices, salaries, business margins, capital gains) are executed strictly in the user's browser. Zero financial data is ever sent to or stored on remote servers.
- **5 Precision Calculators**:
  1. **VAT & Sales Tax Calculator (`/` & `/vat-calculator`)**: Add/Extract VAT with instant breakdown, statutory presets (Ireland, UK, EU, US Sales Tax, Canada, Australia), custom slider, multi-line invoice tally, and CSV/copy/print export.
  2. **Gross-to-Net Salary Calculator (`/salary-tax-calculator`)**: Multi-country progressive tax bands (Ireland PAYE/USC/PRSI, UK NI/bands, US Federal/FICA, Custom) with pension sacrifice relief and pay frequency breakdowns (Annual, Monthly, Bi-weekly, Weekly, Daily, Hourly).
  3. **Freelance & Self-Employed Tax Buffer (`/freelance-tax-calculator`)**: Billable rate models, expense deductions categorization, tax reserve buffers, safe-to-spend projections, and quarterly set-asides.
  4. **Capital Gains Tax (CGT) Calculator (`/capital-gains-tax-calculator`)**: Real estate, shares, crypto, and collectibles with incidental costs, improvement deductions, and statutory annual tax-free exemptions.
  5. **Commercial Margin & Profit Calculator (`/margin-tax-calculator`)**: Two-way pricing and margin discovery, VAT integration, operating overheads, corporate tax liability, and break-even unit volume analysis.
- **SEO & AdSense Compliant**:
  - 600+ words of rich educational guides, formula breakdowns, worked numerical examples, and FAQ sections on every calculator.
  - JSON-LD structured data (`FAQPage`, `WebApplication`, `BreadcrumbList`, `WebSite`).
  - Google AdSense placeholders (`pub-2116463006242210`), `ads.txt`, `robots.txt`, `sitemap.xml`, and SVG favicon.
- **Theming & Consent**:
  - Dark / Light mode toggle with `localStorage` persistence.
  - Granular Cookie Consent banner with Essential, Analytics, and Advertising options.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom glassmorphism and modern color tokens
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Deployment**: Cloudflare Pages / Workers via `wrangler.jsonc`

---

## 📦 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/hakro10/vat_calculator.git
cd vat_calculator

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build

```bash
# Typecheck and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ Deployment

Configured for zero-config deployment on Cloudflare Pages / Workers:

```bash
npx wrangler pages deploy dist
```

---

## 📜 Governance & Agent Protocol

Please review [`AGENTS.md`](./AGENTS.md) for guidelines on code changes, maintenance protocols, and changelog requirements.

---

## 📄 License

MIT License © 2026 vatcalcs.net
