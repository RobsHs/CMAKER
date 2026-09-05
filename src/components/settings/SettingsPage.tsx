import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaperSize, ExportQuality } from '../../types/certificate';
import { PAPER_SIZE_PRESETS } from '../../constants/sizes';
import { 
  Settings as SettingsIcon, 
  Building2, 
  Download, 
  ShieldCheck, 
  Globe, 
  Save, 
  Check 
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, showToast, t, language, setLanguage, theme, setTheme } = useApp();

  const [formData, setFormData] = useState({ ...settings });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setLanguage(formData.language);
    setTheme(formData.theme);
    showToast('Settings saved successfully', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-1">
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>Preferences & Global Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('settingsTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t('settingsDesc')}
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: General & Localization */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Globe className="w-4 h-4 text-indigo-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">General & Localization</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Application Name
                </label>
                <input
                  type="text"
                  value={formData.appName}
                  onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('languageSetting')}
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                >
                  <option value="en">English (US / International)</option>
                  <option value="id">Bahasa Indonesia (Indonesian)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Default Date Format
                </label>
                <select
                  value={formData.defaultDateFormat}
                  onChange={(e) => setFormData({ ...formData, defaultDateFormat: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Long Date">Long Date (September 5, 2026)</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY (05/09/2026)</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY (09/05/2026)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (2026-09-05)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('themeSetting')}
                </label>
                <select
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Organization & Branding */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Building2 className="w-4 h-4 text-violet-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{t('orgBranding')}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('orgName')}
                </label>
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('defaultPaperSize')}
                </label>
                <select
                  value={formData.defaultPaperSize}
                  onChange={(e) => setFormData({ ...formData, defaultPaperSize: e.target.value as PaperSize })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {Object.values(PAPER_SIZE_PRESETS).map(p => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: PDF Export & Verification Engine */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Download className="w-4 h-4 text-emerald-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Export & Verification Registry</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('pdfQuality')}
                </label>
                <select
                  value={formData.pdfQuality}
                  onChange={(e) => setFormData({ ...formData, pdfQuality: e.target.value as ExportQuality })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="standard">{t('qualityStandard')}</option>
                  <option value="high">{t('qualityHigh')}</option>
                  <option value="print">{t('qualityPrint')}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Verification Base URL
                </label>
                <input
                  type="text"
                  value={formData.verificationBaseUrl}
                  onChange={(e) => setFormData({ ...formData, verificationBaseUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Certificate ID Prefix
                </label>
                <input
                  type="text"
                  value={formData.idFormatPrefix}
                  onChange={(e) => setFormData({ ...formData, idFormatPrefix: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('idFormat')}
                </label>
                <input
                  type="text"
                  value={formData.idFormatPattern}
                  onChange={(e) => setFormData({ ...formData, idFormatPattern: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{t('saveSettings')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

