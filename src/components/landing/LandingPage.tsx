import React from 'react';
import { useApp } from '../../context/AppContext';
import { useEditor } from '../../context/EditorContext';
import { TEMPLATES_LIBRARY } from '../../templates/templatesData';
import { TemplateThumbnailPreview } from '../templates/TemplateThumbnailPreview';
import { 
  Award, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  FileSpreadsheet, 
  PenTool, 
  Layers, 
  QrCode, 
  Download, 
  Sliders, 
  ChevronRight, 
  Zap, 
  Lock, 
  Cpu 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, t } = useApp();
  const { loadTemplate } = useEditor();

  const handleSelectTemplate = (template: typeof TEMPLATES_LIBRARY[0]) => {
    loadTemplate(template);
    setCurrentView('editor');
  };

  const features = [
    {
      icon: <Award className="w-5 h-5 text-indigo-500" />,
      title: 'Professional Templates',
      desc: '12+ industry-standard editable templates across academic, corporate, event, and creative domains.'
    },
    {
      icon: <Sliders className="w-5 h-5 text-violet-500" />,
      title: 'Interactive Studio Editor',
      desc: 'Precision drag-and-drop workspace with snapping, rulers, zoomable canvas, and safe print boundaries.'
    },
    {
      icon: <PenTool className="w-5 h-5 text-blue-500" />,
      title: 'Digital Signatures',
      desc: 'Draw signatures directly with natural ink physics or upload images with automated background removal.'
    },
    {
      icon: <QrCode className="w-5 h-5 text-emerald-500" />,
      title: 'Tamper-Proof QR Codes',
      desc: 'Dynamic cryptographic QR codes auto-linked to instant public verification endpoints.'
    },
    {
      icon: <FileSpreadsheet className="w-5 h-5 text-amber-500" />,
      title: 'Bulk Batch Generation',
      desc: 'Upload CSV spreadsheets, map variables, and generate hundreds of custom credentials in a single click.'
    },
    {
      icon: <Download className="w-5 h-5 text-rose-500" />,
      title: 'High-Res 300 DPI PDF',
      desc: 'Flawless millimeter-accurate vector PDFs formatted for A4 & Letter sizes without clipping.'
    },
    {
      icon: <Layers className="w-5 h-5 text-teal-500" />,
      title: 'Custom Branding & Seals',
      desc: 'Incorporate official institutional crests, embossed gold foil seals, and bespoke color palettes.'
    },
    {
      icon: <Lock className="w-5 h-5 text-slate-500" />,
      title: 'Credential Registry',
      desc: 'Centralized administrative control to issue, audit, verify, and revoke compromised certificates.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Choose Template',
      desc: 'Select from 12+ pre-designed templates or build a custom certificate from scratch.'
    },
    {
      num: '02',
      title: 'Customize Design',
      desc: 'Tailor typography, border ornaments, institutional crests, and color palettes.'
    },
    {
      num: '03',
      title: 'Add Recipient & Signatures',
      desc: 'Input recipient credentials or variables, then add verified digital signatures.'
    },
    {
      num: '04',
      title: 'Generate Certificate',
      desc: 'System applies cryptographic IDs, generates verified QR barcodes, and binds records.'
    },
    {
      num: '05',
      title: 'Download or Share',
      desc: 'Export 300 DPI vector PDFs, lossless PNGs, or share public verification URLs.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Subtle background gradient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-linear-to-tr from-indigo-500/15 via-violet-500/10 to-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>CertifyPro SaaS Platform — Create. Certify. Verify.</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
            Create Professional Certificates in Minutes
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Design beautiful certificates, add signatures and verification QR codes, then export them as high-quality PDFs.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <button
              onClick={() => setCurrentView('editor')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all hover:scale-102"
            >
              <span>{t('createCertificate')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('templates')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>{t('exploreTemplates')}</span>
            </button>
          </div>

          {/* Interactive Hero Editor Mockup */}
          <div className="max-w-5xl mx-auto rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden bg-slate-900 text-slate-100 relative group">
            {/* Mockup Topbar */}
            <div className="h-10 bg-slate-800 border-b border-slate-700/80 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-400 font-mono ml-2 hidden sm:inline">
                  CertifyPro Studio &bull; Academic Excellence Gold (A4 Landscape)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                  Autosaved
                </span>
                <button
                  onClick={() => setCurrentView('editor')}
                  className="text-xs font-semibold px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-white"
                >
                  Open Studio
                </button>
              </div>
            </div>

            {/* Mockup Body with certificate preview */}
            <div className="p-4 sm:p-8 bg-slate-950/70 flex items-center justify-center">
              <div className="w-full max-w-2xl bg-[#FCFAF5] rounded shadow-xl border-4 border-[#C5A059] p-6 text-slate-900 relative">
                {/* Certificate Inner Ornaments */}
                <div className="border border-[#C5A059] p-5 text-center space-y-2 relative">
                  <span className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase">
                    CERTIFYPRO GLOBAL ACADEMY
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-wide">
                    CERTIFICATE OF EXCELLENCE
                  </h2>
                  <p className="text-[9px] tracking-widest uppercase text-slate-400">
                    PROUDLY PRESENTED TO
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#C5A059]">
                    Alex Johnson
                  </h3>
                  <p className="text-xs text-slate-600 font-serif italic max-w-md mx-auto">
                    In recognition of demonstrated technical mastery and exemplary performance in Full-Stack Cloud Engineering.
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-200 text-left">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase block">ISSUE DATE</span>
                      <span className="text-[10px] font-bold text-slate-700">September 5, 2026</span>
                      <span className="text-[9px] font-mono text-slate-400 block">ID: CERT-2026-000001</span>
                    </div>

                    <div className="w-10 h-10 border-2 border-[#C5A059] rounded-full flex items-center justify-center text-[8px] font-bold text-[#C5A059]">
                      SEAL
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-serif italic text-slate-800">Helena Vance</div>
                      <div className="w-20 h-0.5 bg-slate-300 ml-auto my-0.5" />
                      <span className="text-[9px] text-slate-500">Academic Director</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES GRID */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              SaaS Features
            </h2>
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('featuresTitle')}
            </p>
            <p className="text-slate-500 text-sm mt-2">
              {t('featuresSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-indigo-500/50 hover:shadow-lg transition-all group"
              >
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-fit mb-4 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              Workflow
            </h2>
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('howItWorksTitle')}
            </p>
            <p className="text-slate-500 text-sm mt-2">
              {t('howItWorksSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative"
              >
                <span className="text-2xl font-black text-indigo-600/30 dark:text-indigo-400/20 block mb-2 font-mono">
                  {step.num}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROFESSIONAL TEMPLATES PREVIEW */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                Curated Catalog
              </h2>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Professional Certificate Templates
              </p>
            </div>
            <button
              onClick={() => setCurrentView('templates')}
              className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>View all 12 templates</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEMPLATES_LIBRARY.slice(0, 4).map(template => (
              <div
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/30 hover:border-indigo-500 hover:shadow-xl transition-all cursor-pointer flex flex-col"
              >
                <div className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
                  <TemplateThumbnailPreview template={template} className="h-36" scale={0.165} />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-[9px] font-mono font-bold text-white shadow-xs">
                    300 DPI
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                      {template.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">
                      {template.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  <button className="mt-4 w-full py-2 text-xs font-semibold text-center rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-colors">
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRUSTED CERTIFICATE VERIFICATION EXPLAINER */}
      <section className="py-20 bg-slate-900 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Trust Verification</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {t('trustedVerificationTitle')}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t('trustedVerificationDesc')}
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  'Cryptographic SHA-256 integrity hash on each credential',
                  'Instant camera QR scanning or Certificate ID lookup',
                  'Tamper-evident status flags: VALID, REVOKED, or EXPIRED',
                  'Public credential registry requiring zero login credentials'
                ].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setCurrentView('verify')}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Try Verification Portal
                </button>
              </div>
            </div>

            {/* Visual Verification Badge Card */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-400 font-mono">STATUS: VALID & AUTHENTIC</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">CERT-2026-000001</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">RECIPIENT</span>
                  <span className="font-bold text-white text-sm">Alex Johnson</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">ISSUING BODY</span>
                  <span className="font-bold text-white text-sm">CertifyPro Global Academy</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">CREDENTIAL</span>
                  <span className="font-medium text-slate-200">Certificate of Excellence</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">ISSUED DATE</span>
                  <span className="font-medium text-slate-200">September 5, 2026</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 font-mono text-[10px] text-slate-400 break-all">
                HASH: 8f94a2b7c6d1e3f5a0b9c8d7e6f5a4b3c2d1e0f9
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

