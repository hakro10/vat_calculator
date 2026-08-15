import { useState, useEffect } from 'react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
}

const STORAGE_KEY = 'vatcalcs_cookie_consent';

export function useCookieConsent() {
  const [hasConsented, setHasConsented] = useState<boolean>(true); // default true to avoid flash before load
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    advertising: true,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setHasConsented(false);
      } else {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
        setHasConsented(true);
      }
    } catch {
      setHasConsented(false);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    const safePrefs: CookiePreferences = {
      essential: true,
      analytics: !!prefs.analytics,
      advertising: !!prefs.advertising,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safePrefs));
    } catch {
      // ignore
    }
    setPreferences(safePrefs);
    setHasConsented(true);
    setIsModalOpen(false);
  };

  const acceptAll = () => {
    saveConsent({ essential: true, analytics: true, advertising: true });
  };

  const declineNonEssential = () => {
    saveConsent({ essential: true, analytics: false, advertising: false });
  };

  const openCustomize = () => {
    setIsModalOpen(true);
  };

  return {
    hasConsented,
    preferences,
    isModalOpen,
    setIsModalOpen,
    acceptAll,
    declineNonEssential,
    saveConsent,
    openCustomize,
  };
}
