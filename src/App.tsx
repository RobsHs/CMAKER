import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { EditorProvider } from './context/EditorContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { EditorView } from './components/editor/EditorView';
import { TemplateGallery } from './components/templates/TemplateGallery';
import { BulkGenerator } from './components/bulk/BulkGenerator';
import { VerificationPage } from './components/verify/VerificationPage';
import { CertificateDetailPage } from './components/certificate/CertificateDetailPage';
import { AdminPanel } from './components/admin/AdminPanel';
import { SettingsPage } from './components/settings/SettingsPage';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  // If in editor view, render the dedicated full-screen Studio
  if (currentView === 'editor') {
    return (
      <main className="min-h-screen">
        <EditorView />
        <ToastContainer />
      </main>
    );
  }

  // Standard SaaS pages with persistent top Navbar and Footer
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'dashboard' && <DashboardOverview />}
        {currentView === 'templates' && <TemplateGallery />}
        {currentView === 'bulk' && <BulkGenerator />}
        {currentView === 'verify' && <VerificationPage />}
        {currentView === 'certificate-detail' && <CertificateDetailPage />}
        {currentView === 'admin' && <AdminPanel />}
        {currentView === 'settings' && <SettingsPage />}
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <EditorProvider>
        <AppContent />
      </EditorProvider>
    </AppProvider>
  );
}
