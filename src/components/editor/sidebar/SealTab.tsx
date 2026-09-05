import React, { useState } from 'react';
import { useEditor } from '../../../context/EditorContext';
import { useApp } from '../../../context/AppContext';
import { SealElement, SealTemplateType } from '../../../types/certificate';
import { Award, Shield, Star, CheckCircle2 } from 'lucide-react';

export const SealTab: React.FC = () => {
  const { addElement, design } = useEditor();
  const { showToast } = useApp();

  const [sealType, setSealType] = useState<SealTemplateType>('certified');
  const [primaryText, setPrimaryText] = useState('OFFICIAL SEAL');
  const [secondaryText, setSecondaryText] = useState('CERTIFIED AUTHENTIC');
  const [centerIcon, setCenterIcon] = useState<SealElement['centerIcon']>('crest');
  const [outerRingStyle, setOuterRingStyle] = useState<SealElement['outerRingStyle']>('double-ring');
  const [sealColor, setSealColor] = useState('#C5A059');

  const { width: canvasWidth } = design.dimensions;

  const handleTemplateChange = (type: SealTemplateType) => {
    setSealType(type);
    if (type === 'certified') {
      setPrimaryText('OFFICIAL SEAL');
      setSecondaryText('CERTIFIED AUTHENTIC');
      setCenterIcon('crest');
      setSealColor('#C5A059');
    } else if (type === 'official') {
      setPrimaryText('BOARD OF DIRECTORS');
      setSecondaryText('EXECUTIVE SEAL');
      setCenterIcon('shield');
      setSealColor('#1E40AF');
    } else if (type === 'verified') {
      setPrimaryText('GLOBAL ACCREDITATION');
      setSecondaryText('VERIFIED CREDENTIAL');
      setCenterIcon('laurel');
      setSealColor('#0D9488');
    } else if (type === 'completed') {
      setPrimaryText('DISTINCTION HONORS');
      setSecondaryText('MASTERCLASS GRADUATE');
      setCenterIcon('star');
      setSealColor('#CD7F32');
    }
  };

  const handleInsertSeal = () => {
    addElement({
      name: `${primaryText} Seal`,
      type: 'seal',
      sealType,
      primaryText,
      secondaryText,
      centerIcon,
      outerRingStyle,
      sealColor,
      accentColor: '#1E293B',
      x: canvasWidth / 2 - 60,
      y: 520,
      width: 120,
      height: 120,
      rotation: 0,
      opacity: 1,
      isLocked: false,
      isVisible: true
    });
    showToast('Official seal added to certificate', 'success');
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          Official Seals & Emblems
        </h4>
        <p className="text-xs text-slate-400">
          Add authentic circular foil seals and accredited board stamps.
        </p>
      </div>

      {/* Seal Preset Buttons */}
      <div>
        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Seal Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'certified', label: 'Certified Gold', color: '#C5A059' },
            { id: 'official', label: 'Official Navy', color: '#1E40AF' },
            { id: 'verified', label: 'Verified Teal', color: '#0D9488' },
            { id: 'completed', label: 'Honors Bronze', color: '#CD7F32' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => handleTemplateChange(t.id as SealTemplateType)}
              className={`p-2 rounded-lg border text-left text-xs font-semibold flex items-center gap-2 transition-colors ${
                sealType === t.id
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: t.color }} />
              <span className="truncate">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Curved Text */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Upper Ring Text
        </label>
        <input
          type="text"
          value={primaryText}
          onChange={(e) => setPrimaryText(e.target.value.toUpperCase())}
          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
          placeholder="e.g. OFFICIAL SEAL"
        />
      </div>

      {/* Secondary Curved Text */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Lower Ring Text
        </label>
        <input
          type="text"
          value={secondaryText}
          onChange={(e) => setSecondaryText(e.target.value.toUpperCase())}
          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
          placeholder="e.g. CERTIFIED AUTHENTIC"
        />
      </div>

      {/* Center Icon & Outer Ring */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Center Icon
          </label>
          <select
            value={centerIcon}
            onChange={(e) => setCenterIcon(e.target.value as SealElement['centerIcon'])}
            className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
          >
            <option value="crest">Crest Check</option>
            <option value="shield">Shield</option>
            <option value="star">Star</option>
            <option value="laurel">Laurel Wreath</option>
            <option value="ribbon">Ribbon</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Ring Style
          </label>
          <select
            value={outerRingStyle}
            onChange={(e) => setOuterRingStyle(e.target.value as SealElement['outerRingStyle'])}
            className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
          >
            <option value="double-ring">Double Ring</option>
            <option value="smooth">Smooth Single</option>
            <option value="scalloped">Scalloped / Dotted</option>
            <option value="gear">Gear Cog</option>
          </select>
        </div>
      </div>

      {/* Seal Color */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Foil & Ink Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={sealColor}
            onChange={(e) => setSealColor(e.target.value)}
            className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer"
          />
          <input
            type="text"
            value={sealColor}
            onChange={(e) => setSealColor(e.target.value)}
            className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
          />
        </div>
      </div>

      {/* Insert Button */}
      <button
        onClick={handleInsertSeal}
        className="w-full py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors"
      >
        Add Official Seal to Canvas
      </button>
    </div>
  );
};

