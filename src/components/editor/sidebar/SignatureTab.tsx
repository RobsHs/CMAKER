import React, { useState } from 'react';
import { useEditor } from '../../../context/EditorContext';
import { useApp } from '../../../context/AppContext';
import { SignatureModal } from '../SignatureModal';
import { DEFAULT_SIGNATURE_SVG } from '../../../constants/sampleData';
import { removeImageWhiteBackground, validateImageFile } from '../../../utils/imageProcessing';
import { PenTool, Upload, Sparkles, Check } from 'lucide-react';

export const SignatureTab: React.FC = () => {
  const { addElement, design } = useEditor();
  const { showToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);
  const [autoRemoveBg, setAutoRemoveBg] = useState(true);

  const { width: canvasWidth } = design.dimensions;

  const handleSaveDrawnSignature = (dataUrl: string, signerName?: string, signerTitle?: string) => {
    addElement({
      name: signerName ? `${signerName} Signature` : 'Digital Signature',
      type: 'signature',
      src: dataUrl,
      signerName: signerName || 'Authorized Signatory',
      signerTitle: signerTitle || 'Director',
      isTransparent: true,
      x: canvasWidth - 320,
      y: 530,
      width: 190,
      height: 65,
      rotation: 0,
      opacity: 1,
      isLocked: false,
      isVisible: true
    });
    showToast('Signature added to certificate', 'success');
  };

  const handleSignatureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file, 5);
    if (!validation.isValid) {
      showToast(validation.error || 'Invalid signature file', 'error');
      return;
    }

    try {
      setIsProcessingUpload(true);
      const reader = new FileReader();
      reader.onload = async () => {
        let dataUrl = reader.result as string;
        if (autoRemoveBg) {
          dataUrl = await removeImageWhiteBackground(dataUrl, 220);
        }
        addElement({
          name: 'Uploaded Signature',
          type: 'signature',
          src: dataUrl,
          isTransparent: autoRemoveBg,
          x: canvasWidth - 320,
          y: 530,
          width: 190,
          height: 65,
          rotation: 0,
          opacity: 1,
          isLocked: false,
          isVisible: true
        });
        showToast('Uploaded signature processed and added', 'success');
        setIsProcessingUpload(false);
      };
      reader.readAsDataURL(file);
    } catch {
      showToast('Error processing uploaded signature', 'error');
      setIsProcessingUpload(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          Digital Signatures
        </h4>
        <p className="text-xs text-slate-400">
          Draw online or upload transparent signatory signatures.
        </p>
      </div>

      {/* Draw Signature Action */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-colors"
      >
        <PenTool className="w-4 h-4" />
        <span>Draw Digital Signature</span>
      </button>

      {/* Upload Zone */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-white dark:bg-slate-800/40 space-y-2.5">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Upload className="w-4 h-4 text-indigo-500" />
          <span>Upload Signature Image</span>
        </label>

        <label className="flex items-center gap-2 text-[11px] text-slate-500 cursor-pointer">
          <input
            type="checkbox"
            checked={autoRemoveBg}
            onChange={(e) => setAutoRemoveBg(e.target.checked)}
            className="rounded-sm text-indigo-600 focus:ring-indigo-500"
          />
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span>Auto-remove white background</span>
        </label>

        <label className="block w-full text-center py-2 px-3 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 cursor-pointer bg-slate-50 dark:bg-slate-800 transition-colors">
          {isProcessingUpload ? 'Extracting Ink...' : 'Choose PNG or JPG'}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleSignatureUpload}
            className="hidden"
            disabled={isProcessingUpload}
          />
        </label>
      </div>

      {/* Sample Cursive Signature Preset */}
      <div>
        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Sample Signature Preset
        </h5>
        <button
          onClick={() => {
            addElement({
              name: 'Dr. Helena Vance Signature',
              type: 'signature',
              src: DEFAULT_SIGNATURE_SVG,
              signerName: 'Dr. Helena Vance',
              signerTitle: 'Academic Director',
              isTransparent: true,
              x: canvasWidth - 320,
              y: 530,
              width: 190,
              height: 65,
              rotation: 0,
              opacity: 1,
              isLocked: false,
              isVisible: true
            });
            showToast('Sample signature inserted', 'success');
          }}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 bg-white dark:bg-slate-800/60 flex items-center justify-between group transition-colors"
        >
          <div className="flex items-center gap-3">
            <img src={DEFAULT_SIGNATURE_SVG} alt="Preset Signature" className="h-8 w-24 object-contain" />
            <div className="text-left">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block group-hover:text-indigo-600">
                Helena Vance (Director)
              </span>
              <span className="text-[10px] text-slate-400">Formal Ink Signature</span>
            </div>
          </div>
        </button>
      </div>

      <SignatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveSignature={handleSaveDrawnSignature}
      />
    </div>
  );
};

