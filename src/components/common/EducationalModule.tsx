import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle2, 
  Lightbulb, 
  Calculator as CalcIcon,
  Sparkles
} from 'lucide-react';
import { EducationalGuide } from '../../data/educationalContent';

interface EducationalModuleProps {
  guide: EducationalGuide;
  pageUrl: string;
}

export const EducationalModule: React.FC<EducationalModuleProps> = ({ guide, pageUrl }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // FAQ Schema JSON-LD for rich snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntityOfPage: pageUrl,
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="mt-16 space-y-12 no-print border-t border-slate-200 dark:border-slate-800 pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Main Educational Section Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Tax Knowledge &amp; In-Depth Guide</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {guide.title}
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400">
          {guide.subtitle}
        </p>
      </div>

      {/* Key Takeaways Cards */}
      <div className="glass-card p-6 sm:p-8 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-indigo-50/40 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-950/90 border border-emerald-200/60 dark:border-emerald-900/40">
        <div className="flex items-center gap-2.5 mb-4">
          <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Essential Takeaways
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {guide.keyTakeaways.map((takeaway, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                {takeaway}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Body Content Sections */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {guide.sections.map((section, sIdx) => (
          <div key={sIdx} className="glass-card p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {section.heading}
            </h3>

            <div className="space-y-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {section.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Formula Block if present */}
            {section.formulaSnippet && (
              <div className="mt-4 p-4 rounded-xl bg-slate-900 dark:bg-slate-950 text-slate-100 border border-slate-800 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <CalcIcon className="w-3.5 h-3.5" />
                  <span>Mathematical Formula</span>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed">{section.formulaSnippet}</pre>
              </div>
            )}

            {/* Worked Example Box if present */}
            {section.exampleBox && (
              <div className="mt-4 p-5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                  <Lightbulb className="w-4 h-4" />
                  <h4>{section.exampleBox.title}</h4>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-none pl-1">
                  {section.exampleBox.steps.map((step, stIdx) => (
                    <li key={stIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-emerald-500/20 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-200">
                  {section.exampleBox.result}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {guide.faqs.map((faq, fIdx) => {
            const isOpen = openFaqIndex === fIdx;
            return (
              <div
                key={fIdx}
                className="glass-card overflow-hidden border border-slate-200/80 dark:border-slate-800/80"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(fIdx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-500' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
