import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useEditor } from '../../context/EditorContext';
import { TEMPLATES_LIBRARY } from '../../templates/templatesData';
import { CertificateTemplate } from '../../types/certificate';
import { 
  Search, 
  ArrowRight, 
  Check, 
  Eye, 
  Sparkles, 
  Award, 
  X 
} from 'lucide-react';
import { CanvasElementRenderer } from '../editor/CanvasElementRenderer';
import { TemplateThumbnailPreview } from './TemplateThumbnailPreview';

export const TemplateGallery: React.FC = () => {
  const { setCurrentView, showToast } = useApp();
  const { loadTemplate } = useEditor();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<CertificateTemplate | null>(null);

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'academic', label: 'Academic & Education' },
    { id: 'corporate', label: 'Corporate & Business' },
    { id: 'event', label: 'Events & Seminars' },
    { id: 'creative', label: 'Creative & Luxury' }
  ];

  const filteredTemplates = TEMPLATES_LIBRARY.filter(t => {
    const matchesCat = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleUseTemplate = (template: CertificateTemplate) => {
    loadTemplate(template);
    setCurrentView('editor');
    showToast(`Loaded ${template.name}`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pre-Engineered Master Designs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Professional Template Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Every template is 100% vector-aligned, fully customizable, and ready for high-resolution 300 DPI PDF export.
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <div
              key={template.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-2xs hover:shadow-xl hover:border-indigo-500 transition-all flex flex-col group"
            >
              {/* Preview Live Scaled Miniature */}
              <div className="relative overflow-hidden group/thumb border-b border-slate-100 dark:border-slate-800">
                <TemplateThumbnailPreview template={template} className="h-48" scale={0.21} />

                {/* Top Overlay Badge */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-[10px] font-semibold text-white tracking-wider uppercase shadow-xs">
                  {template.category}
                </div>

                {/* Resolution Badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-[9px] font-mono font-bold text-slate-700 dark:text-slate-300 shadow-xs">
                  300 DPI
                </div>

                {/* Hover Quick Preview Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTemplate(template);
                  }}
                  className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5"
                  title="View full proof"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Proof</span>
                </button>
              </div>

              {/* Card Meta & Actions */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-sm">
                      {template.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {template.design.elements.length} elements
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {template.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Tag pills */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {template.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setPreviewTemplate(template)}
                    className="flex-1 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-center"
                  >
                    Quick Proof
                  </button>
                  <button
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors text-center"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Size Preview Proof Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-base text-white">{previewTemplate.name}</h3>
                <p className="text-xs text-slate-400">{previewTemplate.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    handleUseTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  Open in Studio
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-8 bg-slate-950 flex items-center justify-center">
              <div
                className="relative shadow-2xl select-none"
                style={{
                  width: `${previewTemplate.design.dimensions.width}px`,
                  height: `${previewTemplate.design.dimensions.height}px`,
                  transform: 'scale(0.7)',
                  transformOrigin: 'center center',
                  backgroundColor: previewTemplate.design.background.color || '#FFFFFF'
                }}
              >
                {previewTemplate.design.elements.map(el => (
                  <div
                    key={el.id}
                    className="absolute"
                    style={{
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      width: `${el.width}px`,
                      height: `${el.height}px`,
                      transform: `rotate(${el.rotation}deg)`,
                      opacity: el.opacity,
                      display: el.isVisible ? 'block' : 'none'
                    }}
                  >
                    <CanvasElementRenderer element={el} dataFields={previewTemplate.design.dataFields} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

