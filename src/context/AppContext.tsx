import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppSettings, CertificateProject, IssuedCertificate } from '../types/certificate';
import { StorageService, DEFAULT_APP_SETTINGS } from '../utils/storage';
import { TRANSLATIONS, Language } from '../i18n/translations';

export type AppView = 
  | 'landing' 
  | 'dashboard' 
  | 'editor' 
  | 'templates' 
  | 'bulk' 
  | 'verify' 
  | 'certificate-detail' 
  | 'admin' 
  | 'settings';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedCertificateId: string | null;
  setSelectedCertificateId: (id: string | null) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  role: 'user' | 'admin';
  setRole: (role: 'user' | 'admin') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  projects: CertificateProject[];
  refreshProjects: () => void;
  issuedCertificates: IssuedCertificate[];
  refreshIssuedCertificates: () => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  t: (key: keyof typeof TRANSLATIONS.en, params?: Record<string, string | number>) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Routing State
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedCertificateId, setSelectedCertificateId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // User Role
  const [role, setRole] = useState<'user' | 'admin'>('user');

  // App Settings
  const [settings, setSettings] = useState<AppSettings>(() => StorageService.getSettings());
  const [language, setLanguageState] = useState<Language>(settings.language || 'en');
  const [theme, setThemeState] = useState<'light' | 'dark'>(settings.theme || 'light');

  // Data lists
  const [projects, setProjects] = useState<CertificateProject[]>(() => StorageService.getProjects());
  const [issuedCertificates, setIssuedCertificates] = useState<IssuedCertificate[]>(() => StorageService.getIssuedCertificates());

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply dark mode class to root HTML
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync settings when language or theme changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const updated = { ...settings, language: lang };
    setSettings(updated);
    StorageService.saveSettings(updated);
  };

  const setTheme = (thm: 'light' | 'dark') => {
    setThemeState(thm);
    const updated = { ...settings, theme: thm };
    setSettings(updated);
    StorageService.saveSettings(updated);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    StorageService.saveSettings(updated);
  };

  const refreshProjects = () => {
    setProjects(StorageService.getProjects());
  };

  const refreshIssuedCertificates = () => {
    setIssuedCertificates(StorageService.getIssuedCertificates());
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Translation helper
  const t = (key: keyof typeof TRANSLATIONS.en, params?: Record<string, string | number>): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    let str = dict[key] || TRANSLATIONS.en[key] || String(key);

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }
    return str;
  };

  // Support URL hash routing / direct links e.g. #/verify/CERT-2026-000001
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/verify/')) {
        const id = hash.replace('#/verify/', '');
        if (id) {
          setSelectedCertificateId(id);
          setCurrentView('verify');
        }
      } else if (hash.startsWith('#/certificate/')) {
        const id = hash.replace('#/certificate/', '');
        if (id) {
          setSelectedCertificateId(id);
          setCurrentView('certificate-detail');
        }
      } else if (hash === '#/dashboard') {
        setCurrentView('dashboard');
      } else if (hash === '#/editor') {
        setCurrentView('editor');
      } else if (hash === '#/templates') {
        setCurrentView('templates');
      } else if (hash === '#/bulk') {
        setCurrentView('bulk');
      } else if (hash === '#/verify') {
        setCurrentView('verify');
      } else if (hash === '#/admin') {
        setCurrentView('admin');
      } else if (hash === '#/settings') {
        setCurrentView('settings');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView: (view: AppView) => {
          setCurrentView(view);
          window.location.hash = `#/${view}`;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        selectedCertificateId,
        setSelectedCertificateId,
        selectedProjectId,
        setSelectedProjectId,
        role,
        setRole,
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        settings,
        updateSettings,
        projects,
        refreshProjects,
        issuedCertificates,
        refreshIssuedCertificates,
        toasts,
        showToast,
        removeToast,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

