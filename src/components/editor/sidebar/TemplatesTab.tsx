import React, { useState } from 'react';
import { useEditor } from '../../../context/EditorContext';
import { TEMPLATES_LIBRARY } from '../../../templates/templatesData';
import { CertificateTemplate } from '../../../types/certificate';
import { Check, Sparkles } from 'lucide-react';
import { TemplateThumbnailPreview } from '../../templates/TemplateThumbnailPreview';

export const TemplatesTab: React.FC = () => {
  const { loadTemplate, design } = useEditor();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'academic', label: 'Academic' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'event', label: 'Event' },
    { id: 'creative', label: 'Creative' }
  ];

  const filteredTemplates = TEMPLATES_LIBRARY.filter(t => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 space-y-4">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          Professional Template Library
        </h4>
        <p className="text-xs text-slate-400">
          Select from 24+ meticulously engineered, fully editable templates.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="space-y-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search templates..."
          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
        />

        <div className="flex gap-1 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 gap-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
        {filteredTemplates.map(tmpl => {
          const isActive = design.id === tmpl.id;

          return (
            <div
              key={tmpl.id}
              onClick={() => loadTemplate(tmpl)}
              className={`group relative rounded-xl border p-3 cursor-pointer transition-all hover:shadow-md ${
                isActive 
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/20 dark:bg-indigo-950/20' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/60'
              }`}
            >
              {/* Live Miniature Preview */}
              <div className="relative rounded-lg mb-2.5 overflow-hidden border border-slate-200 dark:border-slate-700/60">
                <TemplateThumbnailPreview template={tmpl} className="h-28" scale={0.16} />
                {isActive && (
                  <div className="absolute top-1.5 right-1.5 p-1 bg-indigo-600 rounded-full shadow-md text-white">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="flex items-center justify-between">
                <h5 className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">
                  {tmpl.name}
                </h5>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-700 text-slate-500">
                  {tmpl.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                {tmpl.description}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  loadTemplate(tmpl);
                }}
                className="mt-2.5 w-full py-1.5 text-xs font-medium text-center rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-indigo-600 hover:text-white transition-colors text-slate-700 dark:text-slate-200"
              >
                Use Template
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

