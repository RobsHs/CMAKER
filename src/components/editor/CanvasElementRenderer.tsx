import React, { useEffect, useState } from 'react';
import { 
  CertificateElement, 
  CertificateDataFields, 
  TextElement, 
  ImageElement, 
  SignatureElement, 
  SealElement, 
  QRCodeElement, 
  ShapeElement, 
  BorderElement 
} from '../../types/certificate';
import { interpolateVariables } from '../../utils/variableParser';
import { generateQRCodeDataUrl } from '../../utils/qrGenerator';

interface CanvasElementRendererProps {
  element: CertificateElement;
  dataFields: CertificateDataFields;
}

export const CanvasElementRenderer: React.FC<CanvasElementRendererProps> = ({ element, dataFields }) => {
  if (!element.isVisible) return null;

  switch (element.type) {
    case 'text':
      return <RenderTextElement element={element} dataFields={dataFields} />;
    case 'image':
      return <RenderImageElement element={element} />;
    case 'signature':
      return <RenderSignatureElement element={element} />;
    case 'seal':
      return <RenderSealElement element={element} />;
    case 'qrcode':
      return <RenderQRCodeElement element={element} dataFields={dataFields} />;
    case 'shape':
      return <RenderShapeElement element={element} />;
    case 'border':
      return <RenderBorderElement element={element} />;
    default:
      return null;
  }
};

// Text Element
const RenderTextElement: React.FC<{ element: TextElement; dataFields: CertificateDataFields }> = ({ element, dataFields }) => {
  const displayText = interpolateVariables(element.text, dataFields);

  const style: React.CSSProperties = {
    fontFamily: element.fontFamily,
    fontSize: `${element.fontSize}px`,
    fontWeight: element.fontWeight,
    fontStyle: element.fontStyle,
    textDecoration: element.textDecoration,
    color: element.color,
    textAlign: element.textAlign,
    letterSpacing: `${element.letterSpacing}px`,
    lineHeight: element.lineHeight,
    textTransform: element.textTransform || 'none',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 
      element.textAlign === 'center' ? 'center' : 
      element.textAlign === 'right' ? 'flex-end' : 
      element.textAlign === 'justify' ? 'space-between' : 'flex-start',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    userSelect: 'none',
    textShadow: element.shadowColor 
      ? `${element.shadowOffsetX || 0}px ${element.shadowOffsetY || 1}px ${element.shadowBlur || 2}px ${element.shadowColor}` 
      : 'none'
  };

  return <div style={style}>{displayText}</div>;
};

// Image / Logo Element
const RenderImageElement: React.FC<{ element: ImageElement }> = ({ element }) => {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <img
        src={element.src}
        alt={element.name}
        className="w-full h-full pointer-events-none select-none"
        style={{
          objectFit: element.preserveAspectRatio ? (element.objectFit || 'contain') : 'fill',
          borderRadius: `${element.borderRadius || 0}px`
        }}
      />
    </div>
  );
};

// Signature Element
const RenderSignatureElement: React.FC<{ element: SignatureElement }> = ({ element }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={element.src}
        alt={element.name}
        className="w-full h-full object-contain pointer-events-none select-none"
        style={{
          filter: element.filterColor ? `drop-shadow(0 0 0 ${element.filterColor})` : 'none'
        }}
      />
    </div>
  );
};

// Official Seal Element (Clean, sharp scalable SVG rendering)
const RenderSealElement: React.FC<{ element: SealElement }> = ({ element }) => {
  const sealColor = element.sealColor || '#D4AF37';
  const accentColor = element.accentColor || '#1E293B';
  const primaryText = element.primaryText || 'OFFICIAL SEAL';
  const secondaryText = element.secondaryText || 'CERTIFIED AUTHENTIC';

  return (
    <div className="w-full h-full flex items-center justify-center select-none pointer-events-none">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
        <defs>
          <path id={`seal-curve-top-${element.id}`} d="M 30,100 A 70,70 0 1,1 170,100" fill="none" />
          <path id={`seal-curve-bottom-${element.id}`} d="M 30,100 A 70,70 0 0,0 170,100" fill="none" />
        </defs>

        {/* Outer Ring style */}
        {element.outerRingStyle === 'scalloped' || element.outerRingStyle === 'gear' ? (
          <circle cx="100" cy="100" r="95" fill="none" stroke={sealColor} strokeWidth="4" strokeDasharray="6,4" />
        ) : (
          <circle cx="100" cy="100" r="95" fill="none" stroke={sealColor} strokeWidth="3.5" />
        )}

        <circle cx="100" cy="100" r="88" fill="none" stroke={sealColor} strokeWidth="1.5" />
        <circle cx="100" cy="100" r="54" fill="none" stroke={sealColor} strokeWidth="1.5" />

        {/* Top curved text */}
        <text fill={sealColor} fontSize="11" fontWeight="700" letterSpacing="3">
          <textPath href={`#seal-curve-top-${element.id}`} startOffset="50%" textAnchor="middle">
            {primaryText}
          </textPath>
        </text>

        {/* Bottom curved text */}
        <text fill={sealColor} fontSize="9" fontWeight="600" letterSpacing="2.5">
          <textPath href={`#seal-curve-bottom-${element.id}`} startOffset="50%" textAnchor="middle">
            {secondaryText}
          </textPath>
        </text>

        {/* Center Emblem */}
        <circle cx="100" cy="100" r="48" fill={sealColor} fillOpacity="0.1" />

        {element.centerIcon === 'shield' ? (
          <path
            d="M 100,74 L 118,84 L 118,106 C 118,118 100,126 100,126 C 100,126 82,118 82,106 L 82,84 Z"
            fill="none"
            stroke={sealColor}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        ) : element.centerIcon === 'star' ? (
          <polygon
            points="100,75 106,93 125,93 110,104 115,122 100,111 85,122 90,104 75,93 94,93"
            fill={sealColor}
          />
        ) : element.centerIcon === 'ribbon' ? (
          <g fill={sealColor}>
            <circle cx="100" cy="95" r="16" />
            <polygon points="90,105 82,126 100,118 118,126 110,105" />
          </g>
        ) : element.centerIcon === 'laurel' ? (
          <g fill="none" stroke={sealColor} strokeWidth="2.5">
            <path d="M 85,115 C 80,100 80,88 95,80" />
            <path d="M 115,115 C 120,100 120,88 105,80" />
            <circle cx="100" cy="98" r="7" fill={sealColor} />
          </g>
        ) : (
          /* Crest */
          <g fill="none" stroke={sealColor} strokeWidth="3">
            <circle cx="100" cy="98" r="18" />
            <path d="M 92,98 L 98,104 L 110,92" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </svg>
    </div>
  );
};

// QR Code Element with Auto-generated Data URL
const RenderQRCodeElement: React.FC<{ element: QRCodeElement; dataFields: CertificateDataFields }> = ({ element, dataFields }) => {
  const [qrSrc, setQrSrc] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const resolvedUrl = interpolateVariables(element.urlPattern, dataFields);
    
    generateQRCodeDataUrl({
      url: resolvedUrl,
      fgColor: element.fgColor || '#0F172A',
      bgColor: element.bgColor || '#FFFFFF',
      errorCorrectionLevel: element.errorCorrectionLevel || 'M'
    }).then(url => {
      if (isMounted) setQrSrc(url);
    });

    return () => { isMounted = false; };
  }, [element.urlPattern, element.fgColor, element.bgColor, element.errorCorrectionLevel, dataFields]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-white rounded shadow-xs select-none">
      {qrSrc ? (
        <img src={qrSrc} alt="Verification QR Code" className="w-full h-full object-contain pointer-events-none" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-[10px] text-slate-400">QR</div>
      )}
      {element.includeLabel && (
        <span className="text-[9px] font-bold text-slate-700 tracking-wider uppercase mt-1 text-center truncate w-full">
          {element.label || 'Scan to Verify'}
        </span>
      )}
    </div>
  );
};

// Shape & Decoration Element
const RenderShapeElement: React.FC<{ element: ShapeElement }> = ({ element }) => {
  if (element.shapeType === 'line') {
    return (
      <div className="w-full h-full flex items-center justify-center select-none">
        <div 
          className="w-full" 
          style={{ 
            height: `${element.strokeWidth || 2}px`, 
            backgroundColor: element.strokeColor || element.fillColor || '#C5A059' 
          }} 
        />
      </div>
    );
  }

  if (element.shapeType === 'divider') {
    const color = element.strokeColor || element.fillColor || '#C5A059';
    return (
      <div className="w-full h-full flex items-center justify-center select-none pointer-events-none">
        <svg viewBox="0 0 300 24" className="w-full h-full" preserveAspectRatio="none">
          <line x1="0" y1="12" x2="115" y2="12" stroke={color} strokeWidth={element.strokeWidth || 1.5} />
          <line x1="185" y1="12" x2="300" y2="12" stroke={color} strokeWidth={element.strokeWidth || 1.5} />
          <circle cx="118" cy="12" r="2.5" fill={color} />
          <circle cx="182" cy="12" r="2.5" fill={color} />
          <polygon points="150,4 158,12 150,20 142,12" fill={color} />
          <circle cx="150" cy="12" r="2" fill="#FFFFFF" />
          <path d="M 125,12 Q 135,7 142,12 Q 135,17 125,12 Z" fill={color} opacity="0.7" />
          <path d="M 175,12 Q 165,7 158,12 Q 165,17 175,12 Z" fill={color} opacity="0.7" />
        </svg>
      </div>
    );
  }

  if (element.shapeType === 'laurel') {
    const color = element.fillColor || element.strokeColor || '#C5A059';
    return (
      <div className="w-full h-full flex items-center justify-center select-none pointer-events-none">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Left Laurel Branch */}
          <path d="M 60,110 C 35,100 20,75 25,45 C 27,32 35,20 45,12" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="28" cy="80" rx="9" ry="4.5" transform="rotate(-30 28 80)" fill={color} />
          <ellipse cx="22" cy="62" rx="9" ry="4.5" transform="rotate(-15 22 62)" fill={color} />
          <ellipse cx="24" cy="44" rx="9" ry="4.5" transform="rotate(5 24 44)" fill={color} />
          <ellipse cx="32" cy="28" rx="8" ry="4" transform="rotate(25 32 28)" fill={color} />
          <ellipse cx="44" cy="16" rx="7" ry="3.5" transform="rotate(45 44 16)" fill={color} />
          {/* Right Laurel Branch */}
          <path d="M 60,110 C 85,100 100,75 95,45 C 93,32 85,20 75,12" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="92" cy="80" rx="9" ry="4.5" transform="rotate(30 92 80)" fill={color} />
          <ellipse cx="98" cy="62" rx="9" ry="4.5" transform="rotate(15 98 62)" fill={color} />
          <ellipse cx="96" cy="44" rx="9" ry="4.5" transform="rotate(-5 96 44)" fill={color} />
          <ellipse cx="88" cy="28" rx="8" ry="4" transform="rotate(-25 88 28)" fill={color} />
          <ellipse cx="76" cy="16" rx="7" ry="3.5" transform="rotate(-45 76 16)" fill={color} />
          {/* Bottom Tied Ribbon */}
          <circle cx="60" cy="108" r="4.5" fill={color} />
          <path d="M 58,110 Q 52,118 45,119 M 62,110 Q 68,118 75,119" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (element.shapeType === 'badge') {
    const color = element.fillColor || '#1E40AF';
    const stroke = element.strokeColor || '#D4AF37';
    return (
      <div className="w-full h-full flex items-center justify-center select-none pointer-events-none">
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-sm">
          {/* Shield Body */}
          <path d="M 50,8 L 88,24 C 88,68 68,98 50,114 C 32,98 12,68 12,24 Z" fill={color} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
          {/* Inner Inset Line */}
          <path d="M 50,16 L 82,29 C 82,65 65,92 50,105 C 35,92 18,65 18,29 Z" fill="none" stroke={stroke} strokeWidth="1.2" strokeOpacity="0.8" />
          {/* Central Star */}
          <polygon points="50,42 54,54 67,54 56,62 60,74 50,66 40,74 44,62 33,54 46,54" fill={stroke} />
        </svg>
      </div>
    );
  }

  if (element.shapeType === 'ribbon') {
    const color = element.fillColor || '#B91C1C';
    const stroke = element.strokeColor || '#F59E0B';
    return (
      <div className="w-full h-full flex items-center justify-center select-none pointer-events-none">
        <svg viewBox="0 0 160 50" className="w-full h-full drop-shadow-sm">
          {/* Ribbon tails */}
          <polygon points="10,42 28,25 10,8 30,8 30,42" fill={color} opacity="0.85" />
          <polygon points="150,42 132,25 150,8 130,8 130,42" fill={color} opacity="0.85" />
          {/* Ribbon main body */}
          <rect x="25" y="6" width="110" height="36" rx="2" fill={color} stroke={stroke} strokeWidth="1.5" />
          <line x1="30" y1="10" x2="130" y2="10" stroke={stroke} strokeWidth="0.8" opacity="0.8" />
          <line x1="30" y1="38" x2="130" y2="38" stroke={stroke} strokeWidth="0.8" opacity="0.8" />
        </svg>
      </div>
    );
  }

  if (element.shapeType === 'corner-ornament') {
    const color = element.strokeColor || element.fillColor || '#C5A059';
    return (
      <div className="w-full h-full select-none pointer-events-none">
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <path d="M 0,0 L 70,0 C 50,10 40,25 35,45 C 30,60 25,68 0,70 Z" fill={color} opacity="0.12" />
          <path d="M 5,5 L 65,5 C 50,15 35,30 25,50 C 15,62 10,65 5,65" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 12,12 L 48,12 C 38,20 28,32 20,44 C 15,50 12,52 12,52" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="22" cy="22" r="3.5" fill={color} />
          <circle cx="8" cy="8" r="2.5" fill={color} />
        </svg>
      </div>
    );
  }

  if (element.shapeType === 'circle') {
    return (
      <div 
        className="w-full h-full rounded-full select-none"
        style={{
          backgroundColor: element.fillColor || 'transparent',
          border: element.strokeWidth > 0 ? `${element.strokeWidth}px solid ${element.strokeColor}` : 'none'
        }}
      />
    );
  }

  if (element.shapeType === 'star') {
    return (
      <div className="w-full h-full flex items-center justify-center select-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36"
            fill={element.fillColor || '#EAB308'}
            stroke={element.strokeColor || 'none'}
            strokeWidth={element.strokeWidth || 0}
          />
        </svg>
      </div>
    );
  }

  // Rectangle & general box
  return (
    <div 
      className="w-full h-full select-none"
      style={{
        backgroundColor: element.fillColor || 'transparent',
        border: element.strokeWidth > 0 ? `${element.strokeWidth}px solid ${element.strokeColor}` : 'none',
        borderRadius: `${element.cornerRadius || 0}px`
      }}
    />
  );
};

// Border & Corner Ornament Frame Element
const RenderBorderElement: React.FC<{ element: BorderElement }> = ({ element }) => {
  const inset = element.inset || 24;
  const strokeColor = element.strokeColor || '#C5A059';
  const secondaryColor = element.secondaryColor || '#1E293B';
  const strokeWidth = element.strokeWidth || 3;

  return (
    <div 
      className="absolute pointer-events-none select-none"
      style={{
        top: `${inset}px`,
        left: `${inset}px`,
        right: `${inset}px`,
        bottom: `${inset}px`,
        border: 
          element.borderStyle === 'double' ? `${strokeWidth * 1.8}px double ${strokeColor}` :
          element.borderStyle === 'dashed' ? `${strokeWidth}px dashed ${strokeColor}` :
          element.borderStyle === 'dotted' ? `${strokeWidth}px dotted ${strokeColor}` :
          `${strokeWidth}px solid ${strokeColor}`
      }}
    >
      {/* Secondary Inner Fine Hairline Border for Luxury & Ornamental */}
      {(element.borderStyle === 'ornamental' || element.borderStyle === 'luxury') && (
        <div 
          className="absolute pointer-events-none"
          style={{
            top: '6px',
            left: '6px',
            right: '6px',
            bottom: '6px',
            border: `1px solid ${secondaryColor || strokeColor}`,
            opacity: 0.65
          }}
        />
      )}

      {/* Decorative Vintage Rosette Corners for ornamental / luxury style */}
      {(element.borderStyle === 'ornamental' || element.borderStyle === 'luxury' || element.hasCorners) && (
        <>
          {/* Top-Left Corner */}
          <div className="absolute -top-4 -left-4 w-9 h-9 border-t-4 border-l-4 rounded-tl-sm flex items-start justify-start p-1" style={{ borderColor: strokeColor }}>
            <div className="w-3.5 h-3.5 rounded-full border border-white shadow-xs" style={{ backgroundColor: secondaryColor }} />
          </div>
          {/* Top-Right Corner */}
          <div className="absolute -top-4 -right-4 w-9 h-9 border-t-4 border-r-4 rounded-tr-sm flex items-start justify-end p-1" style={{ borderColor: strokeColor }}>
            <div className="w-3.5 h-3.5 rounded-full border border-white shadow-xs" style={{ backgroundColor: secondaryColor }} />
          </div>
          {/* Bottom-Left Corner */}
          <div className="absolute -bottom-4 -left-4 w-9 h-9 border-b-4 border-l-4 rounded-bl-sm flex items-end justify-start p-1" style={{ borderColor: strokeColor }}>
            <div className="w-3.5 h-3.5 rounded-full border border-white shadow-xs" style={{ backgroundColor: secondaryColor }} />
          </div>
          {/* Bottom-Right Corner */}
          <div className="absolute -bottom-4 -right-4 w-9 h-9 border-b-4 border-r-4 rounded-br-sm flex items-end justify-end p-1" style={{ borderColor: strokeColor }}>
            <div className="w-3.5 h-3.5 rounded-full border border-white shadow-xs" style={{ backgroundColor: secondaryColor }} />
          </div>
        </>
      )}
    </div>
  );
};

