import React, { useState } from 'react';
import { Cookie, ShieldCheck, Check, X, SlidersHorizontal } from 'lucide-react';
import { CookiePreferences } from '../../hooks/useCookieConsent';

interface CookieBannerProps {
  hasConsented: boolean;
  preferences: CookiePreferences;
  isModalOpen: boolean;
  onAcceptAll: () => void;
  onDeclineNonEssential: () => void;
  onSaveConsent: (prefs: CookiePreferences) => void;
  onOpenCustomize: () => void;
  onCloseModal: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  hasConsented,
  preferences,
  isModalOpen,
  onAcceptAll,
  onDeclineNonEssential,
  onSaveConsent,
  onOpenCustomize,
  onCloseModal,
}) => {
  const [customPrefs, setCustomPrefs] = useState<CookiePreferences>(preferences);

  const handleCustomSave = () => {
    onSaveConsent(customPrefs);
  };

  return (
    <>
      {/* Floating Bottom Consent Banner */}
      {!hasConsented && (
        <aside 
          role="region"
          aria-label="Cookie Consent Banner"
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 lg:max-w-4xl lg:mx-auto z-50 p-4 sm:p-5 rounded-2xl glass-card border-slate-300 dark:border-slate-700 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl animate-fade-in no-print"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Privacy &amp; Cookie Preferences
                  </h4>
                  <span className="badge bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px]">
                    100% Client-Side
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  We use cookies and local storage to remember your theme, currency preference, and support privacy-compliant advertising. All tax calculations run entirely on your device with 0% data transmission to servers.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <button
                type="button"
                onClick={onOpenCustomize}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>
              <button
                type="button"
                onClick={onDeclineNonEssential}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Decline (Essential Only)
              </button>
              <button
                type="button"
                onClick={onAcceptAll}
                className="btn-primary text-xs py-2 px-4 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept All</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Granular Customization Modal */}
      {isModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in no-print"
        >
          <div className="relative w-full max-w-lg p-6 rounded-2xl glass-card bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 id="cookie-settings-title" className="text-base font-bold text-slate-900 dark:text-white">
                  Customize Cookie Preferences
                </h3>
              </div>
              <button
                type="button"
                onClick={onCloseModal}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Manage your cookie settings below. Essential cookies are required to preserve your theme preference and currency selections.
            </p>

            <div className="space-y-3">
              {/* Essential */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      Strictly Essential Cookies
                    </span>
                    <span className="badge bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px]">
                      Required
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Maintains UI state, dark/light theme, and currency choices.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="rounded text-emerald-600 focus:ring-emerald-500 cursor-not-allowed opacity-80"
                />
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    Analytics &amp; Performance
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Helps us understand tool usage patterns to improve calculator features.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={customPrefs.analytics}
                  onChange={(e) => setCustomPrefs({ ...customPrefs, analytics: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              {/* Advertising */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    Advertising Cookies (Google AdSense)
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Allows display of non-intrusive advertisements to keep these tools 100% free.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={customPrefs.advertising}
                  onChange={(e) => setCustomPrefs({ ...customPrefs, advertising: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onCloseModal}
                className="btn-secondary text-xs py-2 px-3.5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCustomSave}
                className="btn-primary text-xs py-2 px-4 shadow-sm"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
