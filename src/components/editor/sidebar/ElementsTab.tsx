import React from 'react';
import { useEditor } from '../../../context/EditorContext';
import { BorderElement, ShapeElement } from '../../../types/certificate';
import { Frame, Minus, Star, Award, Shield, Circle, Square } from 'lucide-react';

export const ElementsTab: React.FC = () => {
  const { addElement, design } = useEditor();
  const { width: canvasWidth, height: canvasHeight } = design.dimensions;

  const borderPresets: Array<{
    name: string;
    style: BorderElement['borderStyle'];
    strokeColor: string;
    secondaryColor?: string;
    strokeWidth: number;
    inset: number;
    hasCorners: boolean;
  }> = [
    {
      name: 'Ornamental Gold Frame',
      style: 'ornamental',
      strokeColor: '#C5A059',
      secondaryColor: '#1E293B',
      strokeWidth: 4,
      inset: 24,
      hasCorners: true
    },
    {
      name: 'Double Navy Frame',
      style: 'double',
      strokeColor: '#1E40AF',
      strokeWidth: 3,
      inset: 28,
      hasCorners: true
    },
    {
      name: 'Classic Luxury Inset',
      style: 'luxury',
      strokeColor: '#D4AF37',
      secondaryColor: '#0F172A',
      strokeWidth: 3,
      inset: 32,
      hasCorners: true
    },
    {
      name: 'Geometric Modern Frame',
      style: 'geometric',
      strokeColor: '#06B6D4',
      strokeWidth: 2,
      inset: 24,
      hasCorners: true
    },
    {
      name: 'Minimal Single Hairline',
      style: 'single',
      strokeColor: '#0F172A',
      strokeWidth: 1.5,
      inset: 36,
      hasCorners: false
    }
  ];

  const handleAddBorder = (preset: typeof borderPresets[0]) => {
    addElement({
      name: preset.name,
      type: 'border',
      borderStyle: preset.style,
      strokeColor: preset.strokeColor,
      secondaryColor: preset.secondaryColor,
      strokeWidth: preset.strokeWidth,
      inset: preset.inset,
      hasCorners: preset.hasCorners,
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      rotation: 0,
      opacity: 1,
      isLocked: true,
      isVisible: true
    });
  };

  const shapePresets: Array<{
    name: string;
    icon: React.ReactNode;
    element: Omit<ShapeElement, 'id'>;
  }> = [
    {
      name: 'Gold Accent Divider Line',
      icon: <Minus className="w-4 h-4 text-amber-500" />,
      element: {
        name: 'Accent Divider',
        type: 'shape',
        shapeType: 'line',
        fillColor: '#C5A059',
        strokeColor: '#C5A059',
        strokeWidth: 2,
        x: canvasWidth / 2 - 150,
        y: 350,
        width: 300,
        height: 2,
        rotation: 0,
        opacity: 0.8,
        isLocked: false,
        isVisible: true
      }
    },
    {
      name: 'Golden Five-Point Star',
      icon: <Star className="w-4 h-4 text-amber-400 fill-amber-400" />,
      element: {
        name: 'Gold Star',
        type: 'shape',
        shapeType: 'star',
        fillColor: '#EAB308',
        strokeColor: '#CA8A04',
        strokeWidth: 1,
        x: canvasWidth / 2 - 25,
        y: 340,
        width: 50,
        height: 50,
        rotation: 0,
        opacity: 1,
        isLocked: false,
        isVisible: true
      }
    },
    {
      name: 'Decorative Rectangle Tag',
      icon: <Square className="w-4 h-4 text-indigo-500" />,
      element: {
        name: 'Rectangle Tag',
        type: 'shape',
        shapeType: 'rectangle',
        fillColor: 'rgba(99, 102, 241, 0.1)',
        strokeColor: '#6366F1',
        strokeWidth: 1.5,
        cornerRadius: 6,
        x: canvasWidth / 2 - 100,
        y: 200,
        width: 200,
        height: 40,
        rotation: 0,
        opacity: 1,
        isLocked: false,
        isVisible: true
      }
    },
    {
      name: 'Circle Badge Background',
      icon: <Circle className="w-4 h-4 text-emerald-500" />,
      element: {
        name: 'Circle Badge',
        type: 'shape',
        shapeType: 'circle',
        fillColor: 'rgba(5, 150, 105, 0.1)',
        strokeColor: '#059669',
        strokeWidth: 2,
        x: canvasWidth / 2 - 40,
        y: 490,
        width: 80,
        height: 80,
        rotation: 0,
        opacity: 1,
        isLocked: false,
        isVisible: true
      }
    }
  ];

  return (
    <div className="p-4 space-y-5">
      {/* Borders */}
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <Frame className="w-4 h-4 text-indigo-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Certificate Borders & Frames
          </h4>
        </div>
        <p className="text-xs text-slate-400 mb-2">
          High-prestige frames that frame the entire document.
        </p>

        <div className="space-y-2">
          {borderPresets.map((bp, i) => (
            <button
              key={i}
              onClick={() => handleAddBorder(bp)}
              className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 bg-white dark:bg-slate-800/60 transition-all flex items-center justify-between group"
            >
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200 group-hover:text-indigo-600">
                {bp.name}
              </span>
              <div 
                className="w-6 h-6 border rounded-sm"
                style={{ borderColor: bp.strokeColor, borderWidth: `${bp.strokeWidth}px` }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Shapes & Accents */}
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <Award className="w-4 h-4 text-amber-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Shapes & Dividers
          </h4>
        </div>
        <p className="text-xs text-slate-400 mb-2">
          Geometric accents, divider lines, and badge containers.
        </p>

        <div className="space-y-2">
          {shapePresets.map((sp, i) => (
            <button
              key={i}
              onClick={() => addElement(sp.element)}
              className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 bg-white dark:bg-slate-800/60 transition-all flex items-center gap-3 group"
            >
              <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-700">
                {sp.icon}
              </div>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200 group-hover:text-indigo-600">
                {sp.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

