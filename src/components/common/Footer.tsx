import React from 'react';
import { Link } from 'react-router-dom';
import { Percent, Shield, Heart, FileText, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenCookieModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCookieModal }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md transition-colors mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Privacy Guarantee */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group inline-flex">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-sm shadow-emerald-600/30">
                <Percent className="w-4 h-4 font-bold" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                vatcalcs<span className="text-emerald-600 dark:text-emerald-400">.net</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Free, instantaneous, and strictly privacy-first tax calculation suite. We engineer zero-latency client-side financial tools for professionals, contractors, and business owners worldwide.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60 w-fit">
              <Shield className="w-3.5 h-3.5" />
              <span>100% Client-Side • No server data storage</span>
            </div>
          </div>

          {/* Column 2: Calculators */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Tax Calculators
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/vat-calculator" className="text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  VAT &amp; Sales Tax
                </Link>
              </li>
              <li>
                <Link to="/salary-tax-calculator" className="text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  Gross-to-Net Salary
                </Link>
              </li>
              <li>
                <Link to="/freelance-tax-calculator" className="text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  Freelance Tax Buffer
                </Link>
              </li>
              <li>
                <Link to="/capital-gains-tax-calculator" className="text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  Capital Gains (CGT)
                </Link>
              </li>
              <li>
                <Link to="/margin-tax-calculator" className="text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  Margin &amp; Profit Tax
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Privacy */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Legal &amp; Privacy
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              {onOpenCookieModal && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenCookieModal}
                    className="text-left text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Cookie Preferences
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: About & Resources */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Organization
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  About vatcalcs.net
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <a 
                  href="https://vatcalcs.net/sitemap.xml" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Sitemap XML</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-500 space-y-3">
          <p>
            <strong>Disclaimer:</strong> The tools, calculations, and tax guidance on vatcalcs.net are provided strictly for educational and general estimation purposes. They do not constitute certified accounting, financial, or legal advice. Statutory tax rates, thresholds, and allowances are subject to change by national authorities (such as HMRC, Irish Revenue, IRS, and EU member states). Always verify statutory liabilities with a qualified tax accountant before submitting official filings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p>© {new Date().getFullYear()} vatcalcs.net. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Crafted with precision &amp; <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for privacy.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
