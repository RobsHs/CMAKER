import React from 'react';
import { useEditor } from '../../../context/EditorContext';
import { Type, Sparkles } from 'lucide-react';
import { TextElement } from '../../../types/certificate';

export const TextTab: React.FC = () => {
  const { addElement, design } = useEditor();
  const centerX = design.dimensions.width / 2;

  const textPresets: Array<{
    label: string;
    description: string;
    element: Omit<TextElement, 'id'>;
  }> = [
    {
      label: 'Certificate Title',
      description: 'Main certificate headline with serif styling',
      element: {
        name: 'Certificate Title',
        type: 'text',
        text: '{{certificate_title}}',
        fontSize: 38,
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 700,
        fontStyle: 'normal',
        textDecoration: 'none',
        color: '#0F172A',
        textAlign: 'center',
        letterSpacing: 2,
        lineHeight: 1.2,
        textTransform: 'uppercase',
        x: centerX - 350,
        y: 180,
        width: 700,
        height: 55,
        rotation: 0,
        opacity: 1,
        isLocked: false,
        isVisible: true
      }
    },
    {
      label: 'Recipient Name',
      description: 'Prominent large recipient name display',
      element: {
        name: 'Recipient Name',
        type: 'text',
        text: '{{recipient_name}}',
        fontSize: 46,
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 700,
        fontStyle: 'normal',
        textDecoration: 'none',
        color: '#C5A059',
        textAlign: 'center',
        letterSpacing: 1,
        lineHeight: 1.2,
        x: centerX - 350,
        y: 280,
        width: 700,
        height: 65,
        rotation: 0,
        opacity: 1,
        isLocked: false,
        isVisible: true
      }
    },
    {
      label: 'Presentation Subtitle',
      description: 'Introductory line: PROUDLY PRESENTED TO',
      element: {
        name: 'Subtitle',
        type: 'text',
        text: 'PROUDLY PRESENTED TO',
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontStyle: 'normal',
        textDecoration: 'none',
        color: '#94A3B8',
        textAlign: 'center',
        letterSpacing: 4,
        lineHeight: 1.2,
        textTransform: 'uppercase',
        x: centerX - 200,
        y: 245,
        width: 400,
        height: 20,
        rotation: 0,
        opacity: 1,
        isLocked: false,
        isVisible: true
      }
    },
    {
      label: 'Description Body',
      description: 'Paragraph acknowledging achievements and course completion',
      element: {
        name: 'Description Body',
        type: 'text',
        text: '{{description}}',
        fontSize: 15,
        fontFamily: "'Libre Baskerville', Garamond, serif",
        fontWeight: 400,
        fontStyle: 'normal',
        textDecoration: 'none',
        color: '#475569',
        textAlign: 'center',
        letterSpacing: 0.3,
        lineHeight: 1.6,
        x: centerX - 350,
        y: 380,
        width: 700,
        height: 55,
        rotation: 0,
        opacity: 1,
        isLocked: false,
        isVisible: true
      }
    },
    {
      label: 'Organization Header',
      description: 'Issuing university, institute, or enterprise',
      element: {
        name: 'Organization Header',
        type: 'text',
        text: '{{organization_name}}',
        fontSize: 16,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontStyle: 'normal',
        textDecoration: 'none',
        color: '#64748B',
        textAlign: 'center',
        letterSpacing: 3,
        lineHeight: 1.2,
        textTransform: 'uppercase',
        x: centerX - 300,
        y: 140,
        width: 600,
        height: 25,
        rotation: 0,
        opacity: 1,
        isLocked: false,
        isVisible: true
      }
    },
    {
      label: 'Issue Date',
      description: 'Dynamic date placeholder',
      element: {
        name: 'Issue Date',
        type: 'text',
        text: 'Issued on {{issue_date}}',
        fontSize: 13,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontStyle: 'normal',
        textDecoration: 'none',
        color: '#1E293B',
        textAlign: 'left',
        letterSpacing: 0.5,
        lineHeight: 1.2,
        x: 100,
        y: 580,
        width: 250,
        height: 22,
        rotation: 0,
        opacity: 1,
        isLocked: false,
        isVisible: true
      }
    },
    {
      label: 'Certificate ID',
      description: 'Monospace serial verification number',
      element: {
        name: 'Certificate ID',
        type: 'text',
        text: 'CERTIFICATE ID: {{certificate_id}}',
        fontSize: 12,
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600,
        fontStyle: 'normal',
        textDecoration: 'none',
        color: '#64748B',
        textAlign: 'left',
        letterSpacing: 1,
        lineHeight: 1.2,
        x: 100,
        y: 610,
        width: 280,
        height: 20,
        rotation: 0,
        opacity: 1,
        isLocked: false,
        isVisible: true
      }
    },
    {
      label: 'Signer Name & Title',
      description: 'Authorized signatory credential label',
      element: {
        name: 'Signer Title',
        type: 'text',
        text: '{{instructor_name}}\n{{instructor_position}}',
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontStyle: 'normal',
        textDecoration: 'none',
        color: '#1E293B',
        textAlign: 'center',
        letterSpacing: 0.5,
        lineHeight: 1.4,
        x: centerX + 200,
        y: 615,
        width: 220,
        height: 35,
        rotation: 0,
        opacity: 1,
        isLocked: false,
        isVisible: true
      }
    },
    {
      label: 'Custom Text Block',
      description: 'Plain editable paragraph or caption',
      element: {
        name: 'Custom Text',
        type: 'text',
        text: 'Insert custom certificate annotation here...',
        fontSize: 14,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontStyle: 'normal',
        textDecoration: 'none',
        color: '#334155',
        textAlign: 'center',
        letterSpacing: 0,
        lineHeight: 1.4,
        x: centerX - 150,
        y: 440,
        width: 300,
        height: 30,
        rotation: 0,
        opacity: 1,
        isLocked: false,
        isVisible: true
      }
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          Typography & Text Presets
        </h4>
        <p className="text-xs text-slate-400">
          Click any text element to add it to your certificate canvas.
        </p>
      </div>

      <div className="space-y-2 max-h-[calc(100vh-260px)] overflow-y-auto pr-1">
        {textPresets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => addElement(preset.element)}
            className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xs transition-all bg-white dark:bg-slate-800/60 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">
                {preset.label}
              </span>
              <Type className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {preset.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

