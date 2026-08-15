import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const allItems = [{ label: 'Home', path: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.path ? `https://vatcalcs.net${item.path}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />}
                {index === 0 ? (
                  <Link
                    to="/"
                    className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </Link>
                ) : isLast || !item.path ? (
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
