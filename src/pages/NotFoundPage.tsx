import React from 'react';
import { Link } from 'react-router-dom';
import { Percent, Home } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 px-4">
      <SEOHead
        title="404 - Page Not Found | vatcalcs.net"
        description="The requested calculator page could not be found. Return to the vatcalcs.net homepage to access our full suite of tax tools."
        canonicalPath="/404"
        schemaType="WebPage"
      />

      <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 text-white shadow-xl">
        <Percent className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white">
          404
        </h1>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          Page Not Found
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          The calculator or page you are looking for does not exist or has been moved.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-center">
        <Link to="/" className="btn-primary">
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link to="/vat-calculator" className="btn-secondary">
          <span>VAT Calculator</span>
        </Link>
      </div>
    </div>
  );
};
