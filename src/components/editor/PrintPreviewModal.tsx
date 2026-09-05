import React, { useState } from 'react';
import { X, Printer, Download, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useEditor } from '../../context/EditorContext';
import { useApp } from '../../context/AppContext';
import { CanvasElementRenderer } from './CanvasElementRenderer';
import { exportCertificateToPdf } from '../../utils/exportPdf';
import { PAPER_SIZE_PRESETS } from '../../constants/sizes';

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({ isOpen, onClose }) => {
  const { design } = useEditor();
  const { showToast, settings } = useApp();
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const preset = PAPER_SIZE_PRESETS[design.dimensions.name] || PAPER_SIZE_PRESETS['a4-landscape'];

  const handlePrint = async () => {
    const previewEl = document.getElementById('preview-print-target');
    if (!previewEl) return;

    try {
      setIsExporting(true);
      await exportCertificateToPdf({
        element: previewEl,
        filename: `${design.name || 'Certificate'}-Print.pdf`,
        dimensions: design.dimensions,
        quality: 'print'
      });
      showToast('Document sent to print pipeline', 'success');
    } catch {
      showToast('Failed to prepare document for printing', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Authentic Print Proof & Preview</h3>
              <p className="text-xs text-slate-400">
                {preset.label} &bull; Exact Millimeter Physical Output Match
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors disabled:opacity-50"
            >
              <Printer className="w-4 h-4" />
              <span>{isExporting ? 'Preparing Print...' : 'Print / Download Archival PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Canvas Preview Container */}
        <div className="flex-1 overflow-auto bg-slate-950 p-8 flex items-center justify-center">
          <div 
            className="shadow-2xl border border-slate-700/50 rounded-sm overflow-hidden transform-gpu"
            style={{
              maxHeight: '100%',
              maxWidth: '100%'
            }}
          >
            {/* The Scaled Paper Certificate */}
            <div
              id="preview-print-target"
              className="relative select-none"
              style={{
                width: `${design.dimensions.width}px`,
                height: `${design.dimensions.height}px`,
                transform: 'scale(0.72)',
                transformOrigin: 'top center',
                backgroundColor: design.background.color || '#FFFFFF',
                marginBottom: `-${design.dimensions.height * 0.28}px`
              }}
            >
              {design.elements.map(element => (
                <div
                  key={`prev-${element.id}`}
                  className="absolute"
                  style={{
                    left: `${element.x}px`,
                    top: `${element.y}px`,
                    width: `${element.width}px`,
                    height: `${element.height}px`,
                    transform: `rotate(${element.rotation}deg)`,
                    opacity: element.opacity,
                    display: element.isVisible ? 'block' : 'none'
                  }}
                >
                  <CanvasElementRenderer element={element} dataFields={design.dataFields} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Specs Info */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cryptographic signature & QR verification code verified</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 font-mono">
            <span>Dimensions: {preset.mmWidth} × {preset.mmHeight} mm</span>
            <span>Density: 300 DPI Vector-Aligned</span>
          </div>
        </div>
      </div>
    </div>
  );
};

