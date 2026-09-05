import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Undo2, 
  Redo2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Eye, 
  Download, 
  Save, 
  Check, 
  RefreshCw, 
  Grid, 
  Compass, 
  ShieldCheck, 
  Sliders, 
  FileText, 
  Image as ImageIcon,
  Share2,
  ChevronDown,
  UploadCloud,
  FileCode
} from 'lucide-react';
import { useEditor } from '../../context/EditorContext';
import { useApp } from '../../context/AppContext';
import { exportCertificateToPdf } from '../../utils/exportPdf';
import { downloadCertificateImage } from '../../utils/exportImage';
import { StorageService } from '../../utils/storage';
import { ExportQuality } from '../../types/certificate';

interface EditorTopBarProps {
  onOpenPrintPreview: () => void;
}

export const EditorTopBar: React.FC<EditorTopBarProps> = ({ onOpenPrintPreview }) => {
  const {
    design,
    setDesign,
    zoom,
    setZoom,
    undo,
    redo,
    canUndo,
    canRedo,
    showRulers,
    setShowRulers,
    showGrid,
    setShowGrid,
    showSafeArea,
    setShowSafeArea,
    snapToGuides,
    setSnapToGuides,
    saveStatus,
    saveCurrentProject
  } = useEditor();

  const { setCurrentView, showToast, t, settings } = useApp();

  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportQuality, setExportQuality] = useState<ExportQuality>(settings.pdfQuality || 'high');

  // Handle PDF Export
  const handleExportPdf = async () => {
    const canvasElement = document.getElementById('certificate-render-canvas');
    if (!canvasElement) {
      showToast('Canvas render element not found', 'error');
      return;
    }

    try {
      setIsExporting(true);
      setShowExportMenu(false);
      await exportCertificateToPdf({
        element: canvasElement,
        filename: `${design.name || 'Certificate'}.pdf`,
        dimensions: design.dimensions,
        quality: exportQuality
      });
      showToast(t('toastDownloaded'), 'success');
    } catch (err: unknown) {
      const error = err as Error;
      showToast(error.message || 'Unable to generate PDF document.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // Handle PNG/JPG Export
  const handleExportImage = async (format: 'png' | 'jpg') => {
    const canvasElement = document.getElementById('certificate-render-canvas');
    if (!canvasElement) {
      showToast('Canvas render element not found', 'error');
      return;
    }

    try {
      setIsExporting(true);
      setShowExportMenu(false);
      await downloadCertificateImage(
        canvasElement,
        `${design.name || 'Certificate'}.${format}`,
        format,
        exportQuality
      );
      showToast(t('toastDownloaded'), 'success');
    } catch (err: unknown) {
      const error = err as Error;
      showToast(error.message || 'Unable to download image', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // Handle Manual Save
  const handleManualSave = () => {
    saveCurrentProject();
    showToast(t('toastSaved'), 'success');
  };

  // Handle Project JSON Export
  const handleExportJson = () => {
    StorageService.exportDesignAsJson(design);
    showToast('Project JSON exported successfully', 'success');
  };

  // Handle Project JSON Import
  const handleImportJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imported = await StorageService.importDesignFromJson(file);
      setDesign(imported);
      showToast('Project imported successfully', 'success');
    } catch (err: unknown) {
      const error = err as Error;
      showToast(error.message || 'Failed to import JSON project', 'error');
    }
  };

  return (
    <header className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between select-none z-30 shadow-xs">
      {/* Left: Back button & Document title & autosave */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-3">
          <input
            type="text"
            value={design.name}
            onChange={(e) => setDesign(prev => ({ ...prev, name: e.target.value }))}
            className="font-semibold text-sm text-slate-800 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-hidden px-1 py-0.5 max-w-[200px] md:max-w-xs truncate"
            placeholder="Certificate Project Name"
          />

          {/* Autosave Status Indicator */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            {saveStatus === 'saved' && (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span>{t('statusSaved')}</span>
              </>
            )}
            {saveStatus === 'saving' && (
              <>
                <RefreshCw className="w-3 h-3 text-indigo-500 animate-spin" />
                <span>{t('statusSaving')}</span>
              </>
            )}
            {saveStatus === 'unsaved' && (
              <>
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{t('statusUnsaved')}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Center: History, Canvas View controls & Zoom */}
      <div className="hidden lg:flex items-center gap-2">
        {/* Undo / Redo */}
        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-800/60">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-35 disabled:hover:bg-transparent transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-35 disabled:hover:bg-transparent transition-colors"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* View helpers toggle: Rulers, Grid, Safe Area, Snapping */}
        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-800/60 text-xs">
          <button
            onClick={() => setShowRulers(!showRulers)}
            className={`px-2 py-1 rounded-md transition-colors ${
              showRulers ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700'
            }`}
            title="Toggle Rulers"
          >
            <Sliders className="w-3.5 h-3.5 inline mr-1" />
            {t('btnRulers')}
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-2 py-1 rounded-md transition-colors ${
              showGrid ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700'
            }`}
            title="Toggle Grid Lines"
          >
            <Grid className="w-3.5 h-3.5 inline mr-1" />
            {t('btnGrid')}
          </button>

          <button
            onClick={() => setShowSafeArea(!showSafeArea)}
            className={`px-2 py-1 rounded-md transition-colors ${
              showSafeArea ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700'
            }`}
            title="Toggle Safe Area Guide"
          >
            <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
            {t('btnSafeArea')}
          </button>

          <button
            onClick={() => setSnapToGuides(!snapToGuides)}
            className={`px-2 py-1 rounded-md transition-colors ${
              snapToGuides ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700'
            }`}
            title="Toggle Smart Snapping"
          >
            <Compass className="w-3.5 h-3.5 inline mr-1" />
            {t('btnSnap')}
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-800/60">
          <button
            onClick={() => setZoom(zoom - 0.15)}
            className="p-1 rounded-md text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <select
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-200 px-1 py-0.5 focus:outline-hidden cursor-pointer"
          >
            <option value="0.25">25%</option>
            <option value="0.5">50%</option>
            <option value="0.75">75%</option>
            <option value="1.0">100%</option>
            <option value="1.25">125%</option>
            <option value="1.5">150%</option>
            <option value="2.0">200%</option>
          </select>

          <button
            onClick={() => setZoom(zoom + 0.15)}
            className="p-1 rounded-md text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right: Actions (Preview, Export, Save, JSON) */}
      <div className="flex items-center gap-2">
        {/* Print Preview */}
        <button
          onClick={onOpenPrintPreview}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title="Open Realistic Print Preview"
        >
          <Eye className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">{t('btnPreview')}</span>
        </button>

        {/* Manual Save */}
        <button
          onClick={handleManualSave}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title="Save to local database (Ctrl+S)"
        >
          <Save className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">{t('btnSave')}</span>
        </button>

        {/* JSON Export/Import dropdown / button */}
        <div className="hidden xl:flex items-center gap-1">
          <button
            onClick={handleExportJson}
            className="p-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Export Project JSON"
          >
            <FileCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </button>
          <label
            className="p-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Import Project JSON"
          >
            <UploadCloud className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>
        </div>

        {/* Export Dropdown (PDF / PNG / JPG) */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors disabled:opacity-50"
          >
            {isExporting ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>{isExporting ? 'Exporting...' : 'Export'}</span>
            <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
          </button>

          {/* Export Dropdown Menu */}
          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Output Format
              </div>

              {/* Quality selection */}
              <div className="px-3 py-1 mb-1 border-b border-slate-100 dark:border-slate-700">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                  Quality Density:
                </span>
                <div className="grid grid-cols-3 gap-1 pb-1 text-[10px]">
                  <button
                    onClick={() => setExportQuality('standard')}
                    className={`py-1 rounded text-center font-medium ${
                      exportQuality === 'standard' ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    150 DPI
                  </button>
                  <button
                    onClick={() => setExportQuality('high')}
                    className={`py-1 rounded text-center font-medium ${
                      exportQuality === 'high' ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    300 DPI
                  </button>
                  <button
                    onClick={() => setExportQuality('print')}
                    className={`py-1 rounded text-center font-medium ${
                      exportQuality === 'print' ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Print HD
                  </button>
                </div>
              </div>

              {/* PDF Export */}
              <button
                onClick={handleExportPdf}
                className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors"
              >
                <FileText className="w-4 h-4 text-rose-500" />
                <div>
                  <div className="font-semibold">Download PDF Document</div>
                  <div className="text-[10px] text-slate-400">High-resolution vector-aligned PDF</div>
                </div>
              </button>

              {/* PNG Export */}
              <button
                onClick={() => handleExportImage('png')}
                className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors"
              >
                <ImageIcon className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="font-semibold">Download PNG Image</div>
                  <div className="text-[10px] text-slate-400">Lossless sharp raster image</div>
                </div>
              </button>

              {/* JPG Export */}
              <button
                onClick={() => handleExportImage('jpg')}
                className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors"
              >
                <ImageIcon className="w-4 h-4 text-emerald-500" />
                <div>
                  <div className="font-semibold">Download JPG Image</div>
                  <div className="text-[10px] text-slate-400">Optimized photographic image</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

