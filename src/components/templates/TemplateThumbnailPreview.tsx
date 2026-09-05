import React from 'react';
import { CertificateTemplate } from '../../types/certificate';
import { CanvasElementRenderer } from '../editor/CanvasElementRenderer';

interface TemplateThumbnailPreviewProps {
  template: CertificateTemplate;
  className?: string;
  scale?: number;
}

export const TemplateThumbnailPreview: React.FC<TemplateThumbnailPreviewProps> = ({
  template,
  className = 'h-44',
  scale
}) => {
  const width = template.design.dimensions.width || 1123;
  const height = template.design.dimensions.height || 794;
  
  // Calculate default scale to fit cleanly within ~175px container
  const computedScale = scale ?? 0.215;

  return (
    <div className={`relative overflow-hidden flex items-center justify-center select-none bg-slate-200/60 dark:bg-slate-950/80 ${className}`}>
      {/* Background subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '12px 12px'
        }}
      />

      {/* Miniature Certificate Canvas */}
      <div
        className="relative origin-center pointer-events-none transition-transform duration-300 group-hover:scale-[0.225]"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${computedScale})`,
          backgroundColor: template.design.background.color || '#FFFFFF',
          borderRadius: '4px',
          boxShadow: '0 8px 30px -4px rgba(0, 0, 0, 0.25), 0 2px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        {template.design.elements.map(el => (
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
            <CanvasElementRenderer element={el} dataFields={template.design.dataFields} />
          </div>
        ))}
      </div>

      {/* Subtle bottom gradient shadow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

