import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, t } = useApp();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                C<span className="text-indigo-600 dark:text-indigo-400">MAKER</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Modern certificate generation, design, bulk issuance, and tamper-evident cryptographic QR verification platform for enterprises and educational institutions.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Tamper-Evident Standard</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Product
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <button onClick={() => setCurrentView('editor')} className="hover:text-indigo-600 transition-colors">
                  Visual Certificate Studio
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('templates')} className="hover:text-indigo-600 transition-colors">
                  Professional Template Library
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('bulk')} className="hover:text-indigo-600 transition-colors">
                  Bulk CSV Certificate Generator
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('verify')} className="hover:text-indigo-600 transition-colors">
                  QR Credential Verification
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Credentials */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Compliance & Security
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>Digital Signatures (ISO/IEC 27001)</li>
              <li>300 DPI Archival PDF Vector Print</li>
              <li>Hash Audit Trail & Revocation Registry</li>
              <li>Zero Data Leakage Architecture</li>
            </ul>
          </div>

          {/* Quick Start CTA */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Get Started
            </h4>
            <p className="text-xs text-slate-500">
              Create and export verifiable certificates in minutes without complex software.
            </p>
            <button
              onClick={() => setCurrentView('editor')}
              className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
            >
              Launch Certificate Studio
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>&copy; {new Date().getFullYear()} CMAKER Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>CMAKER — Create. Certify. Verify.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

