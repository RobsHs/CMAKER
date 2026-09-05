import React from 'react';
import { useEditor } from '../../../context/EditorContext';
import { CERTIFICATE_COLORS, GRADIENT_PRESETS } from '../../../constants/colors';
import { PAPER_SIZE_PRESETS } from '../../../constants/sizes';
import { PaperSize } from '../../../types/certificate';
import { Palette, FileSpreadsheet } from 'lucide-react';

export const BackgroundTab: React.FC = () => {
  const { design, setBackground, setCanvasSize } = useEditor();

  const handleColorSelect = (color: string) => {
    setBackground({
      type: 'color',
      color
    });
  };

  const handleGradientSelect = (preset: typeof GRADIENT_PRESETS[0]) => {
    setBackground({
      type: 'gradient',
      color: preset.from,
      secondaryColor: preset.to,
      gradientAngle: preset.angle
    });
  };

  return (
    <div className="p-4 space-y-5">
      {/* Canvas Paper Size & Orientation */}
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <FileSpreadsheet className="w-4 h-4 text-indigo-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Document Paper Format
          </h4>
        </div>
        <p className="text-xs text-slate-400 mb-2">
          Select standard international certificate dimensions.
        </p>

        <select
          value={design.dimensions.name}
          onChange={(e) => setCanvasSize(e.target.value as PaperSize)}
          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
        >
          {Object.values(PAPER_SIZE_PRESETS).map(preset => (
            <option key={preset.id} value={preset.id}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>

      {/* Solid Paper Colors */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Solid Certificate Colors
          </h4>
          <label className="flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 cursor-pointer font-medium">
            <span>Custom</span>
            <input
              type="color"
              value={design.background.color}
              onChange={(e) => handleColorSelect(e.target.value)}
              className="w-5 h-5 rounded cursor-pointer"
            />
          </label>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {CERTIFICATE_COLORS.map(c => (
            <button
              key={c.name}
              onClick={() => handleColorSelect(c.value)}
              className={`p-1.5 rounded-lg border text-center transition-all group ${
                design.background.color.toLowerCase() === c.value.toLowerCase()
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-700 hover:scale-105'
              }`}
              title={c.name}
            >
              <div 
                className="w-full h-7 rounded border border-black/10 shadow-inner"
                style={{ backgroundColor: c.value }}
              />
              <span className="text-[10px] text-slate-600 dark:text-slate-400 truncate block mt-1">
                {c.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Gradient Presets */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Prestige Gradient Styles
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {GRADIENT_PRESETS.map(g => (
            <button
              key={g.name}
              onClick={() => handleGradientSelect(g)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-left transition-all group"
            >
              <div
                className="w-full h-8 rounded-lg mb-1.5 shadow-xs"
                style={{
                  background: `linear-gradient(${g.angle}deg, ${g.from}, ${g.to})`
                }}
              />
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block truncate group-hover:text-indigo-600">
                {g.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

