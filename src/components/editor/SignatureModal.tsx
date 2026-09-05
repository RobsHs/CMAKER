import React, { useRef, useState, useEffect } from 'react';
import { X, PenTool, RotateCcw, Trash2, Check, Sparkles } from 'lucide-react';
import { removeImageWhiteBackground } from '../../utils/imageProcessing';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSignature: (dataUrl: string, signerName?: string, signerTitle?: string) => void;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({ isOpen, onClose, onSaveSignature }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penThickness, setPenThickness] = useState(3);
  const [strokeColor, setStrokeColor] = useState('#0F172A');
  const [signerName, setSignerName] = useState('');
  const [signerTitle, setSignerTitle] = useState('');
  const [autoRemoveBg, setAutoRemoveBg] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Undo history for signature strokes
  const strokeHistoryRef = useRef<ImageData[]>([]);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        // Fill pure white initially for clear contrast
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        strokeHistoryRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvasRef.current.width / rect.width),
      y: (clientY - rect.top) * (canvasRef.current.height / rect.height)
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = penThickness;
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && canvasRef.current) {
      strokeHistoryRef.current.push(ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
      if (strokeHistoryRef.current.length > 25) strokeHistoryRef.current.shift();
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      strokeHistoryRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
      setHasDrawn(false);
    }
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx && strokeHistoryRef.current.length > 1) {
      strokeHistoryRef.current.pop(); // Pop current
      const prev = strokeHistoryRef.current[strokeHistoryRef.current.length - 1];
      ctx.putImageData(prev, 0, 0);
    }
  };

  const handleConfirm = async () => {
    if (!canvasRef.current || !hasDrawn) return;
    let dataUrl = canvasRef.current.toDataURL('image/png');

    if (autoRemoveBg) {
      dataUrl = await removeImageWhiteBackground(dataUrl, 230);
    }

    onSaveSignature(dataUrl, signerName, signerTitle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Draw Digital Signature</h3>
              <p className="text-xs text-slate-500">Sign with mouse, stylus, or touchscreen</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas Body */}
        <div className="p-6 space-y-4">
          <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white shadow-inner">
            <canvas
              ref={canvasRef}
              width={500}
              height={200}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-[200px] cursor-crosshair touch-none"
            />
            {!hasDrawn && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-sm font-medium">
                Sign your name here...
              </div>
            )}
          </div>

          {/* Controls: Thickness & Color */}
          <div className="flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Thickness:</span>
              <input
                type="range"
                min={1}
                max={8}
                value={penThickness}
                onChange={(e) => setPenThickness(parseInt(e.target.value))}
                className="w-28 accent-indigo-600"
              />
              <span className="font-mono text-slate-500">{penThickness}px</span>
            </div>

            {/* Ink color presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 dark:text-slate-400 font-medium mr-1">Ink:</span>
              {['#0F172A', '#1E40AF', '#064E3B', '#831843'].map(color => (
                <button
                  key={color}
                  onClick={() => setStrokeColor(color)}
                  className={`w-6 h-6 rounded-full border transition-transform ${
                    strokeColor === color ? 'scale-110 ring-2 ring-indigo-500 ring-offset-1' : 'opacity-80'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Pad buttons: Undo & Clear */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleUndo}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Undo stroke"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                title="Clear canvas"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Transparent background toggle */}
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={autoRemoveBg}
              onChange={(e) => setAutoRemoveBg(e.target.checked)}
              className="rounded-sm text-indigo-600 focus:ring-indigo-500"
            />
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Automatic Transparent Background (Clean digital seal)</span>
          </label>

          {/* Optional Signer Details */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Signer Name (Optional)
              </label>
              <input
                type="text"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                placeholder="e.g. Dr. Helena Vance"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:border-indigo-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Official Title (Optional)
              </label>
              <input
                type="text"
                value={signerTitle}
                onChange={(e) => setSignerTitle(e.target.value)}
                placeholder="e.g. Academic Director"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:border-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!hasDrawn}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors disabled:opacity-40"
          >
            <Check className="w-4 h-4" />
            <span>Insert Signature</span>
          </button>
        </div>
      </div>
    </div>
  );
};

