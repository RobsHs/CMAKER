import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StorageService } from '../../utils/storage';
import { IssuedCertificate } from '../../types/certificate';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Copy, 
  Download, 
  Eye, 
  ExternalLink, 
  Calendar, 
  Building2, 
  User, 
  Hash, 
  Check, 
  QrCode,
  Sparkles,
  Award,
  X
} from 'lucide-react';
import { CanvasElementRenderer } from '../editor/CanvasElementRenderer';
import { exportCertificateToPdf } from '../../utils/exportPdf';

export const VerificationPage: React.FC = () => {
  const { selectedCertificateId, setSelectedCertificateId, showToast, t } = useApp();

  const [inputQuery, setInputQuery] = useState(selectedCertificateId || 'CERT-2026-000001');
  const [searchedRecord, setSearchedRecord] = useState<IssuedCertificate | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Auto-search if selectedCertificateId passed from route / hash
  useEffect(() => {
    if (selectedCertificateId) {
      setInputQuery(selectedCertificateId);
      performSearch(selectedCertificateId);
    } else {
      performSearch('CERT-2026-000001');
    }
  }, [selectedCertificateId]);

  const performSearch = (certId: string) => {
    const cleanId = certId.trim().toUpperCase();
    if (!cleanId) return;

    const certs = StorageService.getIssuedCertificates();
    const found = certs.find(c => c.id.toUpperCase() === cleanId) || null;

    setSearchedRecord(found);
    setHasSearched(true);
    if (found) {
      // Increment scan count
      found.scanCount = (found.scanCount || 0) + 1;
      StorageService.saveIssuedCertificate(found);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(inputQuery);
  };

  const handleCopyLink = () => {
    if (!searchedRecord) return;
    const url = `${window.location.origin}/#/verify/${searchedRecord.id}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    showToast(t('linkCopied'), 'success');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadPdf = async () => {
    if (!searchedRecord) return;
    const renderNode = document.getElementById('verification-cert-proof');
    if (!renderNode) {
      showToast('Render proof element not found', 'error');
      return;
    }

    try {
      await exportCertificateToPdf({
        element: renderNode,
        filename: `${searchedRecord.id}_${searchedRecord.recipientName}.pdf`,
        dimensions: searchedRecord.designSnapshot.dimensions,
        quality: 'high'
      });
      showToast('Certificate PDF downloaded', 'success');
    } catch {
      showToast('Failed to download PDF', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Portal Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Credential Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('verifyTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            {t('verifySubtitle')}
          </p>
        </div>

        {/* Verification Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto">
          <div className="relative flex items-center shadow-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5">
            <Search className="w-5 h-5 text-slate-400 ml-3" />
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={t('verifyInputPlaceholder')}
              className="flex-1 text-xs sm:text-sm px-3 py-2 bg-transparent text-slate-900 dark:text-white font-mono uppercase focus:outline-hidden"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
            >
              {t('btnVerifyNow')}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-slate-400">
            <span>Try sample certificates:</span>
            <button
              type="button"
              onClick={() => {
                setInputQuery('CERT-2026-000001');
                performSearch('CERT-2026-000001');
              }}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-mono"
            >
              CERT-2026-000001 (Valid)
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => {
                setInputQuery('CERT-2026-000004');
                performSearch('CERT-2026-000004');
              }}
              className="text-rose-600 dark:text-rose-400 hover:underline font-mono"
            >
              CERT-2026-000004 (Revoked)
            </button>
          </div>
        </form>

        {/* Verification Results Card */}
        {hasSearched && (
          searchedRecord ? (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
              {/* Status Banner */}
              <div className={`p-6 sm:p-8 border-b ${
                searchedRecord.status === 'valid'
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300'
                  : searchedRecord.status === 'revoked'
                  ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/40 text-rose-800 dark:text-rose-300'
                  : 'bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/40 text-amber-800 dark:text-amber-300'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {searchedRecord.status === 'valid' ? (
                      <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-md">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                    ) : searchedRecord.status === 'revoked' ? (
                      <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-md">
                        <XCircle className="w-7 h-7" />
                      </div>
                    ) : (
                      <div className="p-3 bg-amber-600 text-white rounded-2xl shadow-md">
                        <AlertTriangle className="w-7 h-7" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/10">
                          {searchedRecord.status === 'valid' ? t('statusValid') :
                           searchedRecord.status === 'revoked' ? t('statusRevoked') : t('statusExpired')}
                        </span>
                        <span className="text-xs font-mono font-bold opacity-80">
                          {searchedRecord.id}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                        {searchedRecord.recipientName}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setShowProofModal(true)}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs"
                    >
                      <Eye className="w-4 h-4 text-indigo-500" />
                      <span>{t('viewOfficialPreview')}</span>
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                      <span>{isCopied ? 'Copied' : t('copyLink')}</span>
                    </button>
                  </div>
                </div>

                {/* Revocation Warning Box if revoked */}
                {searchedRecord.status === 'revoked' && (
                  <div className="mt-4 p-4 rounded-xl bg-rose-100 dark:bg-rose-900/50 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100 text-xs">
                    <span className="font-bold block mb-0.5">{t('revocationNotice')}:</span>
                    <p>{searchedRecord.revocationReason || 'Revoked by authorized institution administration.'}</p>
                    {searchedRecord.revokedAt && (
                      <span className="text-[10px] text-rose-700 dark:text-rose-300 block mt-1 font-mono">
                        Date of Revocation: {new Date(searchedRecord.revokedAt).toLocaleString()}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Detailed Credential Metadata Grid */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[11px] block">{t('courseOrTitle')}</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{searchedRecord.title}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[11px] block">{t('organization')}</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{searchedRecord.organization}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[11px] block">{t('issueDate')}</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{searchedRecord.issueDate}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[11px] block">{t('issuer')}</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{searchedRecord.issuerName}</span>
                      <span className="text-[11px] text-slate-400 block">{searchedRecord.issuerPosition}</span>
                    </div>
                  </div>
                </div>

                {/* Cryptographic Hash fingerprint */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Integrity Fingerprint Hash</span>
                    <span className="text-slate-700 dark:text-slate-300 break-all">{searchedRecord.verificationHash}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap ml-4">
                    {searchedRecord.scanCount || 1} verification scans
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Not Found State */
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-lg space-y-3">
              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 text-rose-600 rounded-full w-fit mx-auto">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {t('statusNotFound')}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                No official credential matching Certificate ID <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{inputQuery}</span> was found in the digital registry.
              </p>
            </div>
          )
        )}
      </div>

      {/* Official Certificate Proof Modal */}
      {showProofModal && searchedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-base text-white">Official Certificate Proof</h3>
                <p className="text-xs text-slate-400">{searchedRecord.id} &bull; {searchedRecord.recipientName}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadPdf}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setShowProofModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-8 bg-slate-950 flex items-center justify-center">
              <div
                id="verification-cert-proof"
                className="relative shadow-2xl select-none"
                style={{
                  width: `${searchedRecord.designSnapshot.dimensions.width}px`,
                  height: `${searchedRecord.designSnapshot.dimensions.height}px`,
                  transform: 'scale(0.72)',
                  transformOrigin: 'center center',
                  backgroundColor: searchedRecord.designSnapshot.background.color || '#FFFFFF'
                }}
              >
                {searchedRecord.designSnapshot.elements.map(el => (
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
                    <CanvasElementRenderer element={el} dataFields={searchedRecord.designSnapshot.dataFields} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
