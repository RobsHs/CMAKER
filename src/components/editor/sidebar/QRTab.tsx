import React, { useState } from 'react';
import { useEditor } from '../../../context/EditorContext';
import { useApp } from '../../../context/AppContext';
import { QRCodeElement } from '../../../types/certificate';
import { QrCode, ShieldCheck } from 'lucide-react';

export const QRTab: React.FC = () => {
  const { addElement, design } = useEditor();
  const { showToast, settings } = useApp();

  const [urlPattern, setUrlPattern] = useState(`${settings.verificationBaseUrl}/{{certificate_id}}`);
  const [fgColor, setFgColor] = useState('#0F172A');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [includeLabel, setIncludeLabel] = useState(true);
  const [label, setLabel] = useState('Scan to Verify');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<QRCodeElement['errorCorrectionLevel']>('M');

  const handleAddQRCode = () => {
    addElement({
      name: 'Verification QR Code',
      type: 'qrcode',
      urlPattern,
      fgColor,
      bgColor,
      includeLabel,
      label,
      errorCorrectionLevel,
      x: 100,
      y: 540,
      width: 85,
      height: 85,
      rotation: 0,
      opacity: 1,
      isLocked: false,
      isVisible: true
    });
    showToast('Verification QR Code added to canvas', 'success');
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          Verification QR Code
        </h4>
        <p className="text-xs text-slate-400">
          Embed scannable barcodes linking directly to tamper-proof verification records.
        </p>
      </div>

      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 rounded-xl flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
        <p className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
          The QR code is dynamically rendered using the recipient's Certificate ID (<code>{'{{certificate_id}}'}</code>) for seamless one-scan verification.
        </p>
      </div>

      {/* Target URL Pattern */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Target Verification URL Pattern
        </label>
        <input
          type="text"
          value={urlPattern}
          onChange={(e) => setUrlPattern(e.target.value)}
          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      {/* Label Option */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={includeLabel}
            onChange={(e) => setIncludeLabel(e.target.checked)}
            className="rounded-sm text-indigo-600 focus:ring-indigo-500"
          />
          <span>Include "Scan to Verify" caption</span>
        </label>

        {includeLabel && (
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
            placeholder="Label text"
          />
        )}
      </div>

      {/* Colors: FG & BG */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Barcode Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-7 h-7 rounded border border-slate-300 cursor-pointer"
            />
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase">{fgColor}</span>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Background
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-7 h-7 rounded border border-slate-300 cursor-pointer"
            />
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase">{bgColor}</span>
          </div>
        </div>
      </div>

      {/* Error Correction */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Error Correction Level
        </label>
        <select
          value={errorCorrectionLevel}
          onChange={(e) => setErrorCorrectionLevel(e.target.value as QRCodeElement['errorCorrectionLevel'])}
          className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
        >
          <option value="L">L - Low (7% redundancy)</option>
          <option value="M">M - Medium (15% redundancy - Recommended)</option>
          <option value="Q">Q - Quartile (25% redundancy)</option>
          <option value="H">H - High (30% redundancy - Best for Print)</option>
        </select>
      </div>

      <button
        onClick={handleAddQRCode}
        className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors"
      >
        <QrCode className="w-4 h-4" />
        <span>Add Verification QR Code</span>
      </button>
    </div>
  );
};
