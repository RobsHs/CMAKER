import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useEditor } from '../../context/EditorContext';
import { StorageService } from '../../utils/storage';
import { CertificateProject, IssuedCertificate } from '../../types/certificate';
import { 
  Award, 
  Plus, 
  FileSpreadsheet, 
  LayoutTemplate, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink, 
  Copy, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  Download, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud,
  FileText
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { 
    setCurrentView, 
    setSelectedCertificateId, 
    setSelectedProjectId,
    projects, 
    refreshProjects, 
    issuedCertificates, 
    showToast, 
    t 
  } = useApp();

  const { loadProject, resetToDefault } = useEditor();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'valid' | 'draft' | 'revoked' | 'expired'>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Metrics
  const totalCertificates = issuedCertificates.length + projects.length;
  const thisMonthCount = issuedCertificates.length;
  const templateCount = 12;
  const draftCount = projects.filter(p => p.status === 'draft').length;

  interface DashboardItem {
    id: string;
    name: string;
    recipient: string;
    template: string;
    created: string;
    status: string;
    isProject: boolean;
    originalProject?: CertificateProject;
    originalCert?: IssuedCertificate;
  }

  // Filtered recent projects and issued certificates
  const combinedList: DashboardItem[] = [
    ...projects.map(p => ({
      id: p.id,
      name: p.name,
      recipient: p.design.dataFields.recipient_name,
      template: p.design.name || 'Custom',
      created: p.createdAt,
      status: p.status,
      isProject: true,
      originalProject: p
    })),
    ...issuedCertificates.map(c => ({
      id: c.id,
      name: c.title,
      recipient: c.recipientName,
      template: c.organization,
      created: c.createdAt,
      status: c.status,
      isProject: false,
      originalCert: c
    }))
  ];

  const filteredItems = combinedList.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateNew = () => {
    resetToDefault();
    setCurrentView('editor');
  };

  const handleOpenProject = (proj: CertificateProject) => {
    loadProject(proj);
    setSelectedProjectId(proj.id);
    setCurrentView('editor');
  };

  const handleDuplicate = (id: string) => {
    const copy = StorageService.duplicateProject(id);
    if (copy) {
      refreshProjects();
      showToast(t('toastDuplicated'), 'success');
    }
  };

  const handleDelete = (id: string) => {
    StorageService.deleteProject(id);
    refreshProjects();
    setDeleteConfirmId(null);
    showToast(t('toastDeleted'), 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title & Quick Launch */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('dashboardOverview')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage issued credentials, draft designs, and verification status.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('bulk')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Bulk Generation</span>
            </button>

            <button
              onClick={handleCreateNew}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 transition-all hover:scale-102"
            >
              <Plus className="w-4 h-4" />
              <span>{t('createCertificate')}</span>
            </button>
          </div>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">{t('totalCertificates')}</span>
              <Award className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{totalCertificates}</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              &bull; Active digital registry
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">{t('issuedThisMonth')}</span>
              <Clock className="w-5 h-5 text-violet-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{thisMonthCount}</div>
            <div className="text-[11px] text-violet-600 dark:text-violet-400 font-medium">
              &bull; Official issuance run
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">{t('activeTemplates')}</span>
              <LayoutTemplate className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{templateCount}</div>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              &bull; 100% editable models
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">{t('draftProjects')}</span>
              <Edit3 className="w-5 h-5 text-teal-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{draftCount}</div>
            <div className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
              &bull; In-progress studio drafts
            </div>
          </div>
        </div>

        {/* Recent Certificates Table Section */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden">
          {/* Table Toolbar (Search, Filter) */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {t('recentCertificates')}
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchCertificatesPlaceholder')}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full sm:w-auto text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium"
              >
                <option value="all">{t('filterAll')}</option>
                <option value="valid">{t('filterValid')}</option>
                <option value="draft">{t('filterDraft')}</option>
                <option value="revoked">{t('filterRevoked')}</option>
                <option value="expired">{t('filterExpired')}</option>
              </select>
            </div>
          </div>

          {/* Table View */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Award className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                {t('emptyCertificatesTitle')}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
                {t('emptyCertificatesDesc')}
              </p>
              <button
                onClick={handleCreateNew}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
              >
                {t('createCertificate')}
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="py-3 px-4">{t('colCertificate')}</th>
                    <th className="py-3 px-4">{t('colRecipient')}</th>
                    <th className="py-3 px-4 hidden md:table-cell">{t('colTemplate')}</th>
                    <th className="py-3 px-4 hidden sm:table-cell">{t('colCreated')}</th>
                    <th className="py-3 px-4">{t('colStatus')}</th>
                    <th className="py-3 px-4 text-right">{t('colActions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                  {filteredItems.map(item => {
                    const statusStyles = {
                      valid: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400',
                      draft: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300',
                      revoked: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400',
                      expired: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400',
                      generated: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400',
                      downloaded: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400',
                      published: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400'
                    };

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {item.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">{item.id}</div>
                        </td>
                        <td className="py-3 px-4 font-medium">
                          {item.recipient}
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell text-slate-500">
                          {item.template}
                        </td>
                        <td className="py-3 px-4 hidden sm:table-cell text-slate-500">
                          {new Date(item.created).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                            statusStyles[item.status as keyof typeof statusStyles] || statusStyles.valid
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                          {item.isProject && item.originalProject ? (
                            <>
                              <button
                                onClick={() => handleOpenProject(item.originalProject!)}
                                className="p-1.5 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition-colors"
                                title="Open in Studio"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDuplicate(item.id)}
                                className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                title="Duplicate Project"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(item.id)}
                                className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedCertificateId(item.id);
                                  setCurrentView('verify');
                                }}
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-lg transition-colors"
                                title="Verify Authenticity"
                              >
                                <ShieldCheck className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedCertificateId(item.id);
                                  setCurrentView('certificate-detail');
                                }}
                                className="p-1.5 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition-colors"
                                title="View Public Credential"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 max-w-sm w-full space-y-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 rounded-xl w-fit">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Delete Certificate Project</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete this project? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
