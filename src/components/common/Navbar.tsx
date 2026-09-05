import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { 
  Award, 
  LayoutDashboard, 
  LayoutTemplate, 
  Layers, 
  FileSpreadsheet, 
  ShieldCheck, 
  Settings, 
  Sun, 
  Moon, 
  Globe, 
  UserCheck, 
  ShieldAlert, 
  Plus,
  PenTool
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    role, 
    setRole, 
    language, 
    setLanguage, 
    theme, 
    toggleTheme, 
    t 
  } = useApp();

  const navItems: Array<{ id: AppView; label: string; icon: React.ReactNode }> = [
    { id: 'dashboard', label: t('navDashboard'), icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'templates', label: t('navTemplates'), icon: <LayoutTemplate className="w-4 h-4" /> },
    { id: 'bulk', label: t('navBulk'), icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'verify', label: t('navVerify'), icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  if (role === 'admin') {
    navItems.push({ id: 'admin', label: t('navAdmin'), icon: <ShieldAlert className="w-4 h-4 text-amber-500" /> });
  }

  navItems.push({ id: 'settings', label: t('navSettings'), icon: <Settings className="w-4 h-4" /> });

  return (
    <nav className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div 
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5">
                C<span className="text-indigo-600 dark:text-indigo-400">MAKER</span>
              </span>
              <span className="hidden sm:block text-[9px] font-semibold tracking-widest text-slate-400 uppercase -mt-1">
                Professional Credentials
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Controls: Role Switcher, i18n, Theme, New Cert */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Role Switcher Pill (User <-> Admin) */}
            <button
              onClick={() => setRole(role === 'user' ? 'admin' : 'user')}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400 transition-colors"
              title="Toggle view between Standard User and System Administrator"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span className="capitalize hidden sm:inline">{role} Mode</span>
            </button>

            {/* Language Switcher (EN <-> ID) */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
              className="flex items-center gap-1 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Change Language (English / Bahasa Indonesia)"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span className="uppercase">{language}</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Launch Editor Studio CTA */}
            <button
              onClick={() => setCurrentView('editor')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-500/25 transition-all hover:scale-102"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('createCertificate')}</span>
              <span className="sm:hidden">Studio</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

