import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Percent, 
  Calculator, 
  Wallet, 
  Briefcase, 
  TrendingUp, 
  PieChart, 
  Sun, 
  Moon, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useCurrency } from '../../hooks/useCurrency';
import { CURRENCIES, CurrencyCode } from '../../utils/formatters';

export const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navLinks = [
    { path: '/vat-calculator', label: 'VAT Calculator', icon: Calculator },
    { path: '/salary-tax-calculator', label: 'Salary Tax', icon: Wallet },
    { path: '/freelance-tax-calculator', label: 'Freelance Tax', icon: Briefcase },
    { path: '/capital-gains-tax-calculator', label: 'Capital Gains', icon: TrendingUp },
    { path: '/margin-tax-calculator', label: 'Margin & Profit', icon: PieChart },
  ];

  const isActive = (path: string) => {
    if (path === '/vat-calculator') {
      return location.pathname === '/' || location.pathname === '/vat-calculator';
    }
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 dark:bg-slate-900/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Percent className="w-5 h-5 font-bold" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center">
                vatcalcs<span className="text-emerald-600 dark:text-emerald-400">.net</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                100% Client-Side Suite
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Currency Switcher & Theme Toggle */}
          <div className="flex items-center gap-2.5">
            
            {/* Currency Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
                title="Change active currency"
                aria-label="Change active currency"
              >
                <span className="w-5 text-center font-bold text-emerald-600 dark:text-emerald-400">
                  {CURRENCIES[currency].symbol}
                </span>
                <span>{currency}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-20" 
                    onClick={() => setCurrencyDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-48 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-30 animate-fade-in">
                    <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Select Currency
                    </div>
                    {Object.values(CURRENCIES).map((curr) => (
                      <button
                        key={curr.code}
                        type="button"
                        onClick={() => {
                          setCurrency(curr.code as CurrencyCode);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors ${
                          currency === curr.code
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-6 text-center font-mono">{curr.symbol}</span>
                          <span>{curr.name}</span>
                        </span>
                        {currency === curr.code && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Dark / Light Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors focus:outline-none"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-1.5 animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-500/20'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
