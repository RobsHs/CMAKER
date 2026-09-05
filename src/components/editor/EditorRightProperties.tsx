import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { AVAILABLE_FONTS } from '../../constants/fonts';
import { 
  TextElement, 
  BorderElement, 
  ShapeElement, 
  SealElement, 
  QRCodeElement, 
  SignatureElement, 
  ImageElement 
} from '../../types/certificate';
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  Bold, 
  Italic, 
  Underline, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  Layers, 
  RotateCw,
  Move
} from 'lucide-react';

export const EditorRightProperties: React.FC = () => {
  const { 
    activeElement, 
    updateElement, 
    deleteSelectedElements, 
    duplicateSelectedElements, 
    reorderElement, 
    toggleLock, 
    toggleVisibility,
    design 
  } = useEditor();

  if (!activeElement) {
    return (
      <aside className="w-72 h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-4 select-none overflow-y-auto">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Canvas Properties
        </h4>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 block text-[11px]">Active Paper Size</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 uppercase">
              {design.dimensions.name.replace('-', ' ')}
            </span>
            <div className="text-[11px] text-slate-500 font-mono">
              {design.dimensions.width} × {design.dimensions.height} px
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 block text-[11px]">Total Elements</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {design.elements.length} objects on canvas
            </span>
          </div>

          <p className="text-slate-400 text-xs text-center pt-8">
            Click on any element in the canvas or layer panel to configure its typography, geometry, and styling.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 sm:w-80 h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-4 select-none overflow-y-auto space-y-4">
      {/* Header with Title & Quick Actions */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {activeElement.type} element
          </h4>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate block max-w-[140px]">
            {activeElement.name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => toggleVisibility(activeElement.id)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            title={activeElement.isVisible ? 'Hide' : 'Show'}
          >
            {activeElement.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          <button
            onClick={() => toggleLock(activeElement.id)}
            className={`p-1.5 rounded-lg ${activeElement.isLocked ? 'text-amber-500' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            title={activeElement.isLocked ? 'Unlock' : 'Lock'}
          >
            {activeElement.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          </button>
          <button
            onClick={duplicateSelectedElements}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Duplicate (Ctrl+D)"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={deleteSelectedElements}
            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
            title="Delete (Del)"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Geometry / Transform (X, Y, W, H, Rotation, Opacity) */}
      <div className="space-y-2">
        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Geometry & Transform
        </h5>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">X Position</label>
            <input
              type="number"
              value={activeElement.x}
              onChange={(e) => updateElement(activeElement.id, { x: parseInt(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Y Position</label>
            <input
              type="number"
              value={activeElement.y}
              onChange={(e) => updateElement(activeElement.id, { y: parseInt(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Width</label>
            <input
              type="number"
              value={activeElement.width}
              onChange={(e) => updateElement(activeElement.id, { width: Math.max(10, parseInt(e.target.value) || 10) })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Height</label>
            <input
              type="number"
              value={activeElement.height}
              onChange={(e) => updateElement(activeElement.id, { height: Math.max(10, parseInt(e.target.value) || 10) })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Rotation (°)</label>
            <input
              type="number"
              value={activeElement.rotation}
              onChange={(e) => updateElement(activeElement.id, { rotation: parseInt(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Opacity ({Math.round(activeElement.opacity * 100)}%)</label>
            <input
              type="range"
              min={0.1}
              max={1.0}
              step={0.05}
              value={activeElement.opacity}
              onChange={(e) => updateElement(activeElement.id, { opacity: parseFloat(e.target.value) })}
              className="w-full accent-indigo-600 mt-2"
            />
          </div>
        </div>
      </div>

      {/* Layer Stacking Order */}
      <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Layer Placement
        </h5>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          <button
            onClick={() => reorderElement(activeElement.id, 'front')}
            className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium text-center"
          >
            Bring to Front
          </button>
          <button
            onClick={() => reorderElement(activeElement.id, 'forward')}
            className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium text-center"
          >
            Bring Forward
          </button>
          <button
            onClick={() => reorderElement(activeElement.id, 'backward')}
            className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium text-center"
          >
            Send Backward
          </button>
          <button
            onClick={() => reorderElement(activeElement.id, 'back')}
            className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium text-center"
          >
            Send to Back
          </button>
        </div>
      </div>

      {/* Text Element Properties */}
      {activeElement.type === 'text' && (
        <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
          <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Typography
          </h5>

          {/* Text Content */}
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Content / Template String</label>
            <textarea
              rows={2}
              value={(activeElement as TextElement).text}
              onChange={(e) => updateElement(activeElement.id, { text: e.target.value })}
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            />
          </div>

          {/* Font Family */}
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Font Family</label>
            <select
              value={(activeElement as TextElement).fontFamily}
              onChange={(e) => updateElement(activeElement.id, { fontFamily: e.target.value })}
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              {AVAILABLE_FONTS.map(f => (
                <option key={f.name} value={f.family}>
                  {f.name} ({f.category})
                </option>
              ))}
            </select>
          </div>

          {/* Size & Weight */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Font Size (px)</label>
              <input
                type="number"
                min={8}
                max={140}
                value={(activeElement as TextElement).fontSize}
                onChange={(e) => updateElement(activeElement.id, { fontSize: parseInt(e.target.value) || 16 })}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Weight</label>
              <select
                value={(activeElement as TextElement).fontWeight}
                onChange={(e) => updateElement(activeElement.id, { fontWeight: parseInt(e.target.value) || 400 })}
                className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                <option value={300}>300 - Light</option>
                <option value={400}>400 - Regular</option>
                <option value={500}>500 - Medium</option>
                <option value={600}>600 - SemiBold</option>
                <option value={700}>700 - Bold</option>
                <option value={800}>800 - ExtraBold</option>
              </select>
            </div>
          </div>

          {/* Alignment & Style toggles */}
          <div className="flex items-center justify-between gap-1 pt-1">
            {/* Text Align */}
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-800">
              <button
                onClick={() => updateElement(activeElement.id, { textAlign: 'left' })}
                className={`p-1.5 rounded-md ${
                  (activeElement as TextElement).textAlign === 'left' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateElement(activeElement.id, { textAlign: 'center' })}
                className={`p-1.5 rounded-md ${
                  (activeElement as TextElement).textAlign === 'center' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateElement(activeElement.id, { textAlign: 'right' })}
                className={`p-1.5 rounded-md ${
                  (activeElement as TextElement).textAlign === 'right' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateElement(activeElement.id, { textAlign: 'justify' })}
                className={`p-1.5 rounded-md ${
                  (activeElement as TextElement).textAlign === 'justify' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <AlignJustify className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Italic & Underline */}
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-800">
              <button
                onClick={() => updateElement(activeElement.id, {
                  fontStyle: (activeElement as TextElement).fontStyle === 'italic' ? 'normal' : 'italic'
                })}
                className={`p-1.5 rounded-md ${
                  (activeElement as TextElement).fontStyle === 'italic' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateElement(activeElement.id, {
                  textDecoration: (activeElement as TextElement).textDecoration === 'underline' ? 'none' : 'underline'
                })}
                className={`p-1.5 rounded-md ${
                  (activeElement as TextElement).textDecoration === 'underline' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Underline className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Color & Spacing */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Letter Spacing (px)</label>
              <input
                type="number"
                step={0.5}
                value={(activeElement as TextElement).letterSpacing}
                onChange={(e) => updateElement(activeElement.id, { letterSpacing: parseFloat(e.target.value) || 0 })}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Text Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={(activeElement as TextElement).color}
                  onChange={(e) => updateElement(activeElement.id, { color: e.target.value })}
                  className="w-7 h-7 rounded border border-slate-300 cursor-pointer"
                />
                <span className="text-[11px] font-mono uppercase text-slate-700 dark:text-slate-300">
                  {(activeElement as TextElement).color}
                </span>
              </div>
            </div>
          </div>

          {/* Capitalization Case */}
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Capitalization</label>
            <select
              value={(activeElement as TextElement).textTransform || 'none'}
              onChange={(e) => updateElement(activeElement.id, { textTransform: e.target.value as any })}
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="none">Normal Case</option>
              <option value="uppercase">UPPERCASE</option>
              <option value="capitalize">Capitalize Words</option>
              <option value="lowercase">lowercase</option>
            </select>
          </div>
        </div>
      )}

      {/* Border Element Properties */}
      {activeElement.type === 'border' && (
        <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
          <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Border Style & Framing
          </h5>
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Style</label>
            <select
              value={(activeElement as BorderElement).borderStyle}
              onChange={(e) => updateElement(activeElement.id, { borderStyle: e.target.value as any })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value="single">Single Solid</option>
              <option value="double">Double Border</option>
              <option value="ornamental">Ornamental Gold Corners</option>
              <option value="luxury">Luxury Dual Inset</option>
              <option value="dashed">Dashed Line</option>
              <option value="geometric">Geometric Modern</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Stroke Width</label>
              <input
                type="number"
                min={1}
                max={15}
                value={(activeElement as BorderElement).strokeWidth}
                onChange={(e) => updateElement(activeElement.id, { strokeWidth: parseInt(e.target.value) || 1 })}
                className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Page Inset (px)</label>
              <input
                type="number"
                min={0}
                max={80}
                value={(activeElement as BorderElement).inset}
                onChange={(e) => updateElement(activeElement.id, { inset: parseInt(e.target.value) || 0 })}
                className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Border Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={(activeElement as BorderElement).strokeColor}
                onChange={(e) => updateElement(activeElement.id, { strokeColor: e.target.value })}
                className="w-7 h-7 rounded border border-slate-300 cursor-pointer"
              />
              <span className="text-[11px] font-mono uppercase text-slate-700 dark:text-slate-300">
                {(activeElement as BorderElement).strokeColor}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Official Seal Element Properties */}
      {activeElement.type === 'seal' && (
        <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
          <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Seal Inscription & Tone
          </h5>
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Upper Ring Text</label>
            <input
              type="text"
              value={(activeElement as SealElement).primaryText}
              onChange={(e) => updateElement(activeElement.id, { primaryText: e.target.value.toUpperCase() })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Lower Ring Text</label>
            <input
              type="text"
              value={(activeElement as SealElement).secondaryText}
              onChange={(e) => updateElement(activeElement.id, { secondaryText: e.target.value.toUpperCase() })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block mb-0.5">Seal Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={(activeElement as SealElement).sealColor}
                onChange={(e) => updateElement(activeElement.id, { sealColor: e.target.value })}
                className="w-7 h-7 rounded border border-slate-300 cursor-pointer"
              />
              <span className="text-[11px] font-mono uppercase text-slate-700 dark:text-slate-300">
                {(activeElement as SealElement).sealColor}
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

