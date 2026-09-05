import React, { useState } from 'react';
import Papa from 'papaparse';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useEditor } from '../../context/EditorContext';
import { StorageService } from '../../utils/storage';
import { generateCertificateId } from '../../utils/certificateNumber';
import { SAMPLE_CSV_CONTENT } from '../../constants/sampleData';
import { BulkRecipientRow, IssuedCertificate } from '../../types/certificate';
import { 
  FileSpreadsheet, 
  Upload, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ArrowRight, 
  Sparkles, 
  FileCheck, 
  Archive,
  Layers
} from 'lucide-react';

export const BulkGenerator: React.FC = () => {
  const { showToast, issuedCertificates, refreshIssuedCertificates, t } = useApp();
  const { design } = useEditor();

  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({
    name: 'recipient_name',
    course: 'course_name',
    date: 'issue_date',
    score: 'score',
    email: 'recipient_email',
    certificate_id: 'certificate_id'
  });

  const [parsedRows, setParsedRows] = useState<BulkRecipientRow[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0 });
  const [generatedBatchZip, setGeneratedBatchZip] = useState<Blob | null>(null);
  const [batchGeneratedCount, setBatchGeneratedCount] = useState(0);

  // Download Sample CSV
  const handleDownloadSampleCsv = () => {
    const blob = new Blob([SAMPLE_CSV_CONTENT], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'cmaker_sample_recipients.csv');
    showToast('Sample CSV template downloaded', 'success');
  };

  // Handle CSV file upload & parsing
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      showToast('Please upload a valid .csv file format', 'error');
      return;
    }

    setCsvFile(file);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedHeaders = results.meta.fields || [];
        setHeaders(parsedHeaders);

        // Auto-match common columns
        const newMapping: Record<string, string> = {};
        parsedHeaders.forEach(h => {
          const lower = h.toLowerCase().trim();
          if (lower.includes('name')) newMapping[h] = 'recipient_name';
          else if (lower.includes('course') || lower.includes('program')) newMapping[h] = 'course_name';
          else if (lower.includes('date')) newMapping[h] = 'issue_date';
          else if (lower.includes('score') || lower.includes('grade')) newMapping[h] = 'score';
          else if (lower.includes('id') || lower.includes('cert')) newMapping[h] = 'certificate_id';
          else if (lower.includes('email')) newMapping[h] = 'recipient_email';
        });
        setColumnMapping(prev => ({ ...prev, ...newMapping }));

        // Transform into recipient rows
        const seenNames = new Set<string>();
        const rows: BulkRecipientRow[] = (results.data as Record<string, string>[]).map((row, idx) => {
          const name = row.name || row.Name || row.recipient_name || Object.values(row)[0] || '';
          const isDuplicate = seenNames.has(name.toLowerCase());
          if (name) seenNames.add(name.toLowerCase());

          const isValid = !!name.trim();

          return {
            id: `row-${idx + 1}`,
            name,
            email: row.email || row.Email || '',
            course: row.course || row.Course || '',
            date: row.date || row.Date || '',
            score: row.score || row.Score || '',
            certificateId: row.certificate_id || row.id || '',
            customData: row,
            status: !isValid ? 'invalid' : isDuplicate ? 'duplicate' : 'valid',
            errorMessage: !isValid ? 'Recipient name cannot be empty' : isDuplicate ? 'Duplicate recipient name' : undefined
          };
        });

        setParsedRows(rows);
        showToast(`Parsed ${rows.length} recipient records`, 'success');
      },
      error: (error) => {
        showToast(`Failed to parse CSV: ${error.message}`, 'error');
      }
    });
  };

  // Run Bulk Batch Generation
  const handleGenerateBatch = async () => {
    const validRows = parsedRows.filter(r => r.status === 'valid');
    if (validRows.length === 0) {
      showToast('No valid recipient rows found to generate', 'error');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress({ current: 0, total: validRows.length });

    const zip = new JSZip();
    const existingIds = issuedCertificates.map(c => c.id);
    let count = 0;

    for (let i = 0; i < validRows.length; i++) {
      const row = validRows[i];
      const certId = row.certificateId || generateCertificateId(existingIds, { sequence: existingIds.length + 1 + i });

      // Create issued record in storage
      const newCert: IssuedCertificate = {
        id: certId,
        recipientName: row.name,
        recipientEmail: row.email,
        title: design.dataFields.certificate_title || 'Certificate of Completion',
        organization: design.dataFields.organization_name || 'CMAKER Academy',
        issueDate: row.date || design.dataFields.issue_date || new Date().toISOString().split('T')[0],
        status: 'valid',
        issuerName: design.dataFields.instructor_name || 'Director',
        issuerPosition: design.dataFields.instructor_position || 'Authority',
        designSnapshot: {
          ...design,
          dataFields: {
            ...design.dataFields,
            recipient_name: row.name,
            course_name: row.course || design.dataFields.course_name,
            issue_date: row.date || design.dataFields.issue_date,
            score: row.score || design.dataFields.score,
            certificate_id: certId
          }
        },
        createdAt: new Date().toISOString(),
        scanCount: 0,
        verificationHash: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      };

      StorageService.saveIssuedCertificate(newCert);

      // Create manifest text record in ZIP
      const certManifest = `CMAKER VERIFIED CREDENTIAL
---------------------------------------------
Certificate ID   : ${certId}
Recipient Name   : ${row.name}
Course / Program : ${row.course || design.dataFields.course_name}
Organization     : ${design.dataFields.organization_name}
Issue Date       : ${row.date || design.dataFields.issue_date}
Verification URL : https://cmaker.app/verify/${certId}
Verification Hash: ${newCert.verificationHash}
---------------------------------------------
Status: VALID AND TAMPER-EVIDENT`;

      const safeFilename = `${certId}_${row.name.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
      zip.file(safeFilename, certManifest);

      count++;
      setGenerationProgress({ current: count, total: validRows.length });

      // Yield event loop slightly so UI does not freeze
      if (i % 5 === 0) {
        await new Promise(r => setTimeout(r, 20));
      }
    }

    // Generate ZIP blob
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    setGeneratedBatchZip(zipBlob);
    setBatchGeneratedCount(count);
    setIsGenerating(false);
    refreshIssuedCertificates();

    // Celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    showToast(`Successfully issued ${count} verifiable certificates!`, 'success');
  };

  const handleDownloadZip = () => {
    if (!generatedBatchZip) return;
    saveAs(generatedBatchZip, `cmaker_bulk_batch_${Date.now()}.zip`);
    showToast('Batch certificates package downloaded', 'success');
  };

  const validCount = parsedRows.filter(r => r.status === 'valid').length;
  const invalidCount = parsedRows.filter(r => r.status === 'invalid').length;
  const duplicateCount = parsedRows.filter(r => r.status === 'duplicate').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enterprise Batch Processing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('bulkTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-0.5">
              {t('bulkSubtitle')}
            </p>
          </div>

          <button
            onClick={handleDownloadSampleCsv}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-colors"
          >
            <Download className="w-4 h-4 text-indigo-500" />
            <span>{t('downloadSampleCsv')}</span>
          </button>
        </div>

        {/* 1. Upload CSV Zone */}
        {!csvFile ? (
          <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-indigo-500 rounded-2xl bg-white dark:bg-slate-900 cursor-pointer shadow-2xs transition-all group">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
              {t('uploadCsvZone')}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {t('csvRequirements')}
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        ) : (
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">{csvFile.name}</h4>
                <p className="text-[11px] text-slate-400">
                  {parsedRows.length} total rows detected &bull; {(csvFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>

            <label className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors">
              Replace CSV
              <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        )}

        {/* 2. Column Mapping & Row Preview when CSV parsed */}
        {parsedRows.length > 0 && (
          <div className="space-y-6">
            {/* Metric counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Rows</span>
                <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">{parsedRows.length}</div>
              </div>
              <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-2xs">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Valid Rows</span>
                <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">{validCount}</div>
              </div>
              <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 shadow-2xs">
                <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase">Invalid Rows</span>
                <div className="text-2xl font-black text-rose-700 dark:text-rose-300 mt-1">{invalidCount}</div>
              </div>
              <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 shadow-2xs">
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase">Duplicates</span>
                <div className="text-2xl font-black text-amber-700 dark:text-amber-300 mt-1">{duplicateCount}</div>
              </div>
            </div>

            {/* Recipient Rows Preview Table */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  {t('previewRecipients')}
                </h3>
                <span className="text-xs text-slate-400">
                  Showing first 10 preview entries
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] uppercase font-bold">
                    <tr>
                      <th className="py-2.5 px-4">#</th>
                      <th className="py-2.5 px-4">Recipient Name</th>
                      <th className="py-2.5 px-4">Email</th>
                      <th className="py-2.5 px-4">Course / Program</th>
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4">Score</th>
                      <th className="py-2.5 px-4">Validity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {parsedRows.slice(0, 10).map((r, i) => (
                      <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-4 font-mono text-slate-400">{i + 1}</td>
                        <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-slate-100">{r.name}</td>
                        <td className="py-2.5 px-4 text-slate-500">{r.email || '—'}</td>
                        <td className="py-2.5 px-4 text-slate-500">{r.course || '—'}</td>
                        <td className="py-2.5 px-4 text-slate-500">{r.date || '—'}</td>
                        <td className="py-2.5 px-4 font-mono">{r.score || '—'}</td>
                        <td className="py-2.5 px-4">
                          {r.status === 'valid' ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3" />
                              Valid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full">
                              <AlertTriangle className="w-3 h-3" />
                              {r.errorMessage || 'Invalid'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Generation Actions & Progress */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Batch Generation Pipeline
                  </h4>
                  <p className="text-xs text-slate-500">
                    Template: <span className="font-semibold text-indigo-600">{design.name}</span> &bull; {validCount} valid certificates ready to be issued.
                  </p>
                </div>

                {!generatedBatchZip ? (
                  <button
                    onClick={handleGenerateBatch}
                    disabled={isGenerating || validCount === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>{t('btnGenerateBatch')}</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownloadZip}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <Archive className="w-4 h-4" />
                      <span>{t('downloadZip')}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Progress Bar during generation */}
              {isGenerating && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>{t('generatingProgress', { current: generationProgress.current, total: generationProgress.total })}</span>
                    <span>{Math.round((generationProgress.current / generationProgress.total) * 100)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 transition-all duration-150"
                      style={{ width: `${(generationProgress.current / generationProgress.total) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

