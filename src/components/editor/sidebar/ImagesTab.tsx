import React, { useState } from 'react';
import { useEditor } from '../../../context/EditorContext';
import { useApp } from '../../../context/AppContext';
import { ImageElement } from '../../../types/certificate';
import { validateImageFile } from '../../../utils/imageProcessing';
import { DEFAULT_LOGO_SVG } from '../../../constants/sampleData';
import { Upload, Image as ImageIcon, Shield, Building2, Compass } from 'lucide-react';

export const ImagesTab: React.FC = () => {
  const { addElement, design } = useEditor();
  const { showToast } = useApp();
  const [isUploading, setIsUploading] = useState(false);

  const { width: canvasWidth, height: canvasHeight } = design.dimensions;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file, 5);
    if (!validation.isValid) {
      showToast(validation.error || 'Invalid image file', 'error');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      addElement({
        name: file.name.replace(/\.[^/.]+$/, ''),
        type: 'image',
        src,
        preserveAspectRatio: true,
        borderRadius: 0,
        x: canvasWidth / 2 - 40,
        y: 60,
        width: 80,
        height: 80,
        rotation: 0,
        opacity: 1,
        isLocked: false,
        isVisible: true
      });
      showToast('Image uploaded and placed on canvas', 'success');
      setIsUploading(false);
    };
    reader.onerror = () => {
      showToast('Failed to read image file', 'error');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const sampleLogos = [
    {
      name: 'Academy Gold Crest',
      icon: <Shield className="w-5 h-5 text-amber-500" />,
      src: DEFAULT_LOGO_SVG
    },
    {
      name: 'Corporate Hex Emblem',
      icon: <Building2 className="w-5 h-5 text-indigo-500" />,
      src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="%231E40AF"/><circle cx="50" cy="50" r="18" fill="%23FFFFFF"/><path d="M42 50 L48 56 L58 44" stroke="%231E40AF" stroke-width="4" stroke-linecap="round" fill="none"/></svg>`
    },
    {
      name: 'Global Tech Icon',
      icon: <Compass className="w-5 h-5 text-teal-500" />,
      src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="%230F766E"/><circle cx="50" cy="50" r="36" fill="none" stroke="%23FFFFFF" stroke-width="2"/><polygon points="50,22 62,50 50,78 38,50" fill="%23FFFFFF"/></svg>`
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          Logo & Image Assets
        </h4>
        <p className="text-xs text-slate-400">
          Upload organization logos, emblems, and watermarks.
        </p>
      </div>

      {/* Upload Zone */}
      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 rounded-xl bg-slate-50 dark:bg-slate-800/40 cursor-pointer transition-all group">
        <div className="p-2.5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
          <Upload className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
          {isUploading ? 'Processing...' : 'Upload Logo / Image'}
        </span>
        <span className="text-[11px] text-slate-400 mt-1">
          PNG, JPG, WEBP, SVG (Max 5MB)
        </span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleFileUpload}
          className="hidden"
          disabled={isUploading}
        />
      </label>

      {/* Preset Badges & Logos */}
      <div>
        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Sample Emblems & Insignias
        </h5>
        <div className="space-y-2">
          {sampleLogos.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                addElement({
                  name: item.name,
                  type: 'image',
                  src: item.src,
                  preserveAspectRatio: true,
                  x: canvasWidth / 2 - 40,
                  y: 50,
                  width: 80,
                  height: 80,
                  rotation: 0,
                  opacity: 1,
                  isLocked: false,
                  isVisible: true
                });
                showToast(`Added ${item.name} to canvas`, 'success');
              }}
              className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 bg-white dark:bg-slate-800/60 flex items-center gap-3 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
                {item.icon}
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 block">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-400">Click to insert at top-center</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

