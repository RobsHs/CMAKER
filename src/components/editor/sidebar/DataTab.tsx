import React, { useState } from 'react';
import { useEditor } from '../../../context/EditorContext';
import { useApp } from '../../../context/AppContext';
import { Database, Plus, Copy, Check } from 'lucide-react';

export const DataTab: React.FC = () => {
  const { design, updateDataField, addCustomDataField } = useEditor();
  const { showToast } = useApp();

  const [newKey, setNewKey] = useState('');
  const [newVal, setNewVal] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fields = design.dataFields;

  const handleCopyVariable = (varName: string) => {
    navigator.clipboard.writeText(`{{${varName}}}`);
    setCopiedKey(varName);
    showToast(`Copied {{${varName}}} to clipboard`, 'info');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = newKey.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!cleanKey) return;

    addCustomDataField(cleanKey, newVal);
    setNewKey('');
    setNewVal('');
    showToast(`Added custom field {{${cleanKey}}}`, 'success');
  };

  const standardFields = [
    { key: 'recipient_name', label: 'Recipient Name', value: fields.recipient_name },
    { key: 'certificate_title', label: 'Certificate Title', value: fields.certificate_title },
    { key: 'course_name', label: 'Course / Program', value: fields.course_name },
    { key: 'description', label: 'Description Text', value: fields.description, multiline: true },
    { key: 'organization_name', label: 'Organization Name', value: fields.organization_name },
    { key: 'issue_date', label: 'Issue Date', value: fields.issue_date },
    { key: 'expiry_date', label: 'Expiry Date', value: fields.expiry_date || '' },
    { key: 'certificate_id', label: 'Certificate ID', value: fields.certificate_id },
    { key: 'instructor_name', label: 'Signer / Instructor', value: fields.instructor_name },
    { key: 'instructor_position', label: 'Signer Position', value: fields.instructor_position },
    { key: 'score', label: 'Score / GPA', value: fields.score || '' }
  ];

  return (
    <div className="p-4 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <Database className="w-4 h-4 text-indigo-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Data Fields & Variables
          </h4>
        </div>
        <p className="text-xs text-slate-400">
          Modify variable values or copy tags like <code>{'{{recipient_name}}'}</code> into any text element.
        </p>
      </div>

      {/* Standard Fields */}
      <div className="space-y-3">
        {standardFields.map(f => (
          <div key={f.key} className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                {f.label}
              </label>
              <button
                onClick={() => handleCopyVariable(f.key)}
                className="flex items-center gap-1 text-[10px] font-mono text-indigo-600 dark:text-indigo-400 hover:underline"
                title="Copy variable placeholder"
              >
                {copiedKey === f.key ? (
                  <Check className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>{`{{${f.key}}}`}</span>
              </button>
            </div>

            {f.multiline ? (
              <textarea
                rows={2}
                value={f.value}
                onChange={(e) => updateDataField(f.key, e.target.value)}
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
              />
            ) : (
              <input
                type="text"
                value={f.value}
                onChange={(e) => updateDataField(f.key, e.target.value)}
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
              />
            )}
          </div>
        ))}
      </div>

      {/* Custom Fields */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Custom Fields
        </h5>

        {fields.custom_fields && Object.entries(fields.custom_fields).map(([k, v]) => (
          <div key={k} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 font-mono">
                {k}
              </span>
              <button
                onClick={() => handleCopyVariable(k)}
                className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {`{{${k}}}`}
              </button>
            </div>
            <input
              type="text"
              value={v}
              onChange={(e) => updateDataField(k, e.target.value)}
              className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden"
            />
          </div>
        ))}

        {/* Add custom field form */}
        <form onSubmit={handleAddCustom} className="pt-2 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="field_name"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
            />
            <input
              type="text"
              placeholder="Sample value"
              value={newVal}
              onChange={(e) => setNewVal(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>
          <button
            type="submit"
            disabled={!newKey.trim()}
            className="w-full flex items-center justify-center gap-1 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-300 transition-colors disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Field</span>
          </button>
        </form>
      </div>
    </div>
  );
};

