import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CookieBanner } from './components/common/CookieBanner';
import { useCookieConsent } from './hooks/useCookieConsent';
import { HomePage } from './pages/HomePage';
import { SalaryTaxPage } from './pages/SalaryTaxPage';
import { FreelanceTaxPage } from './pages/FreelanceTaxPage';
import { CapitalGainsPage } from './pages/CapitalGainsPage';
import { MarginTaxPage } from './pages/MarginTaxPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  const {
    hasConsented,
    preferences,
    isModalOpen,
    acceptAll,
    declineNonEssential,
    saveConsent,
    openCustomize,
    setIsModalOpen,
  } = useCookieConsent();

  // Root WebSite & WebApplication structured data
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://vatcalcs.net/#website',
        url: 'https://vatcalcs.net/',
        name: 'vatcalcs.net',
        description: 'High-performance, privacy-first VAT and Tax Calculator Suite.',
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://vatcalcs.net/#app',
        name: 'vatcalcs.net Tax Suite',
        url: 'https://vatcalcs.net/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-emerald-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <ScrollToTop />

      {/* Sticky Header */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vat-calculator" element={<HomePage />} />
          <Route path="/salary-tax-calculator" element={<SalaryTaxPage />} />
          <Route path="/freelance-tax-calculator" element={<FreelanceTaxPage />} />
          <Route path="/capital-gains-tax-calculator" element={<CapitalGainsPage />} />
          <Route path="/margin-tax-calculator" element={<MarginTaxPage />} />
          
          {/* Legal & Company Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route 
            path="/cookie-policy" 
            element={<CookiePolicyPage onOpenCookieModal={openCustomize} />} 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer onOpenCookieModal={openCustomize} />

      {/* Cookie Consent Floating Banner & Modal */}
      <CookieBanner
        hasConsented={hasConsented}
        preferences={preferences}
        isModalOpen={isModalOpen}
        onAcceptAll={acceptAll}
        onDeclineNonEssential={declineNonEssential}
        onSaveConsent={saveConsent}
        onOpenCustomize={openCustomize}
        onCloseModal={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
