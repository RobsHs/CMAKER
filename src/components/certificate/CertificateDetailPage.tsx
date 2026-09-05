import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StorageService } from '../../utils/storage';
import { exportCertificateToPdf } from '../../utils/exportPdf';
import { downloadCertificateImage } from '../../utils/exportImage';
import { CanvasElementRenderer } from '../editor/CanvasElementRenderer';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Download, 
  Share2, 
  Check, 
  FileText, 
  Image as ImageIcon,
  Calendar,
  Building2,
  Award,
  Hash
} from 'lucide-react';

export const CertificateDetailPage: React.FC = () => {
  const { selectedCertificateId, setCurrentView, showToast, t } = useApp();
  const [isCopied, setIsCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const certs = StorageService.getIssuedCertificates();
  const cert = certs.find(c => c.id === selectedCertificateId) || certs[0];

  if (!cert) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="text-center space-y-4">
          <p className="text-slate-500">Certificate record not found.</p>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleCopyShare = () => {
    const shareUrl = `${window.location.origin}/#/verify/${cert.id}`;
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    showToast('Verification URL copied to clipboard', 'success');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadPdf = async () => {
    const el = document.getElementById('cert-detail-canvas');
    if (!el) return;

    try {
      setIsExporting(true);
      await exportCertificateToPdf({
        element: el,
        filename: `${cert.id}_${cert.recipientName}.pdf`,
        dimensions: cert.designSnapshot.dimensions,
        quality: 'high'
      });
      showToast('PDF downloaded successfully', 'success');
    } catch {
      showToast('Failed to generate PDF', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPng = async () => {
    const el = document.getElementById('cert-detail-canvas');
    if (!el) return;

    try {
      setIsExporting(true);
      await downloadCertificateImage(
        el,
        `${cert.id}_${cert.recipientName}.png`,
        'png',
        'high'
      );
      showToast('PNG image downloaded', 'success');
    } catch {
      showToast('Failed to download image', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top bar with back button & actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentView('verify');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 shadow-2xs transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verify Legitimacy</span>
            </button>

            <button
              onClick={handleCopyShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 shadow-2xs transition-colors"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4 text-indigo-500" />}
              <span>{isCopied ? 'Link Copied' : 'Share'}</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
              <span>PNG</span>
            </button>
          </div>
        </div>

        {/* Certificate Display Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
          {/* Certificate Header Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  {cert.id}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  cert.status === 'valid'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400'
                    : 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400'
                }`}>
                  {cert.status}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {cert.recipientName}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {cert.title} &bull; {cert.organization}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
              <div>
                <span className="block text-[10px] text-slate-400 uppercase">ISSUED</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{cert.issueDate}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase">SCANS</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{cert.scanCount || 0}</span>
              </div>
            </div>
          </div>

          {/* Certificate Canvas Render View */}
          <div className="overflow-auto py-4 bg-slate-100 dark:bg-slate-950 rounded-2xl p-6 flex items-center justify-center">
            <div
              id="cert-detail-canvas"
              className="relative shadow-2xl select-none"
              style={{
                width: `${cert.designSnapshot.dimensions.width}px`,
                height: `${cert.designSnapshot.dimensions.height}px`,
                transform: 'scale(0.85)',
                transformOrigin: 'center center',
                backgroundColor: cert.designSnapshot.background.color || '#FFFFFF',
                marginBottom: `-${cert.designSnapshot.dimensions.height * 0.15}px`,
                marginTop: `-${cert.designSnapshot.dimensions.height * 0.05}px`
              }}
            >
              {cert.designSnapshot.elements.map(el => (
                <div
                  key={el.id}
                  className="absolute"
                  style={{
                    left: `${el.x}px`,
                    top: `${el.y}px`,
                    width: `${el.width}px`,
                    height: `${el.height}px`,
                    transform: `rotate(${el.rotation}deg)`,
                    opacity: el.opacity,
                    display: el.isVisible ? 'block' : 'none'
                  }}
                >
                  <CanvasElementRenderer element={el} dataFields={cert.designSnapshot.dataFields} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

