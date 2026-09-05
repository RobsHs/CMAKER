import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StorageService } from '../../utils/storage';
import { IssuedCertificate, AuditLog } from '../../types/certificate';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Trash2, 
  RotateCcw, 
  CheckCircle2, 
  Search, 
  Filter, 
  Clock, 
  BarChart3, 
  Users, 
  Award, 
  FileCheck,
  Eye,
  X
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    issuedCertificates, 
    refreshIssuedCertificates, 
    showToast, 
    setSelectedCertificateId, 
    setCurrentView,
    t 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'valid' | 'revoked' | 'expired'>('all');
  const [activeTab, setActiveTab] = useState<'certificates' | 'audit' | 'analytics'>('certificates');

  // Revocation Modal
  const [revokingCert, setRevokingCert] = useState<IssuedCertificate | null>(null);
  const [revocationReason, setRevocationReason] = useState('');

  const auditLogs = StorageService.getAuditLogs();

  const filteredCertificates = issuedCertificates.filter(c => {
    const matchesSearch = 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRevokeConfirm = () => {
    if (!revokingCert) return;
    const reason = revocationReason.trim() || 'Revoked by system administration.';
    StorageService.revokeCertificate(revokingCert.id, reason);
    refreshIssuedCertificates();
    setRevokingCert(null);
    setRevocationReason('');
    showToast(t('toastRevoked'), 'warning');
  };

  const handleRestoreValidity = (id: string) => {
    StorageService.restoreCertificate(id);
    refreshIssuedCertificates();
    showToast(t('toastRestored'), 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Administrative Credential Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('adminTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {t('adminSubtitle')}
            </p>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl shadow-2xs">
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'certificates'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Registry Records
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'audit'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Audit Trail
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Tab 1: Certificates Registry */}
        {activeTab === 'certificates' && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden space-y-4 p-4 sm:p-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ID, recipient, title..."
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full sm:w-auto text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="valid">Valid Only</option>
                <option value="revoked">Revoked Only</option>
                <option value="expired">Expired Only</option>
              </select>
            </div>

            {/* Registry Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Certificate ID</th>
                    <th className="py-3 px-4">Recipient</th>
                    <th className="py-3 px-4">Title & Organization</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Scans</th>
                    <th className="py-3 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {filteredCertificates.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                        {c.id}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                        {c.recipientName}
                      </td>
                      <td className="py-3 px-4">
                        <div>{c.title}</div>
                        <div className="text-[10px] text-slate-400">{c.organization}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          c.status === 'valid'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400'
                            : c.status === 'revoked'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400'
                            : 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">
                        {c.scanCount || 0}
                      </td>
                      <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedCertificateId(c.id);
                            setCurrentView('certificate-detail');
                          }}
                          className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                          title="View Certificate"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {c.status === 'valid' ? (
                          <button
                            onClick={() => setRevokingCert(c)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                            title="Revoke Certificate"
                          >
                            <ShieldAlert className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRestoreValidity(c.id)}
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
                            title="Restore Validity"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Audit Trail */}
        {activeTab === 'audit' && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              System Audit Trail & Cryptographic Logs
            </h3>
            <div className="space-y-3">
              {auditLogs.map(log => (
                <div key={log.id} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start justify-between gap-4 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] uppercase font-bold ${
                        log.action === 'revoke' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                        log.action === 'issue' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                        'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                      }`}>
                        {log.action}
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{log.details}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Performed by: {log.performedBy}</div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Analytics Overview */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">Total Scans Performed</span>
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                {issuedCertificates.reduce((acc, c) => acc + (c.scanCount || 0), 0)}
              </div>
              <p className="text-xs text-slate-400">Scanned via camera and public portal lookups</p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">Revocation Rate</span>
                <ShieldAlert className="w-5 h-5 text-rose-500" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                {issuedCertificates.length > 0 
                  ? `${((issuedCertificates.filter(c => c.status === 'revoked').length / issuedCertificates.length) * 100).toFixed(1)}%`
                  : '0%'}
              </div>
              <p className="text-xs text-slate-400">Total credentials flagged as invalid</p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">Credential Uptime</span>
                <Award className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">99.98%</div>
              <p className="text-xs text-slate-400">Decentralized tamper-proof verification availability</p>
            </div>
          </div>
        )}
      </div>

      {/* Formal Revocation Dialog */}
      {revokingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full space-y-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 rounded-xl w-fit">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                {t('revokeModalTitle')} &bull; {revokingCert.id}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {t('revokeModalDesc')}
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Formal Reason for Revocation
              </label>
              <textarea
                rows={3}
                value={revocationReason}
                onChange={(e) => setRevocationReason(e.target.value)}
                placeholder={t('revokeReasonPlaceholder')}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRevokingCert(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleRevokeConfirm}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
              >
                {t('confirmRevoke')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

