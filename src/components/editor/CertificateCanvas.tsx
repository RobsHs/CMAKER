import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useEditor } from '../../context/EditorContext';
import { CanvasElementRenderer } from './CanvasElementRenderer';
import { CertificateElement } from '../../types/certificate';

export const CertificateCanvas: React.FC = () => {
  const {
    design,
    selectedElementIds,
    setSelectedElementIds,
    updateElement,
    zoom,
    showRulers,
    showGrid,
    showSafeArea,
    snapToGuides
  } = useEditor();

  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag & Resize state
  const [isDragging, setIsDragging] = useState(false);
  const [dragHandle, setDragHandle] = useState<string | null>(null);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialElementBounds, setInitialElementBounds] = useState<Record<string, { x: number; y: number; w: number; h: number; rot: number }>>({});
  
  // Alignment Guides (Magenta snap lines)
  const [snapLines, setSnapLines] = useState<{ x?: number; y?: number }>({});

  const { width: canvasWidth, height: canvasHeight } = design.dimensions;

  // Background style computation
  const getCanvasBackgroundStyle = (): React.CSSProperties => {
    const bg = design.background;
    if (bg.type === 'gradient' && bg.secondaryColor) {
      return {
        background: `linear-gradient(${bg.gradientAngle || 135}deg, ${bg.color}, ${bg.secondaryColor})`
      };
    }
    return {
      backgroundColor: bg.color || '#FFFFFF'
    };
  };

  // Handle clicking on canvas backdrop to deselect
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || e.target === containerRef.current) {
      setSelectedElementIds([]);
    }
  };

  // Start dragging an element
  const handleElementMouseDown = (e: React.MouseEvent, element: CertificateElement) => {
    e.stopPropagation();
    if (element.isLocked) return;

    if (e.shiftKey) {
      // Toggle in multi-selection
      if (selectedElementIds.includes(element.id)) {
        setSelectedElementIds(prev => prev.filter(id => id !== element.id));
      } else {
        setSelectedElementIds(prev => [...prev, element.id]);
      }
      return;
    }

    if (!selectedElementIds.includes(element.id)) {
      setSelectedElementIds([element.id]);
    }

    setIsDragging(true);
    setDragHandle('move');
    setDragStartPos({ x: e.clientX, y: e.clientY });

    // Store initial positions of all selected elements
    const bounds: Record<string, { x: number; y: number; w: number; h: number; rot: number }> = {};
    design.elements.forEach(el => {
      if (selectedElementIds.includes(el.id) || el.id === element.id) {
        bounds[el.id] = { x: el.x, y: el.y, w: el.width, h: el.height, rot: el.rotation };
      }
    });
    setInitialElementBounds(bounds);
  };

  // Start resizing an element from a specific handle
  const handleResizeMouseDown = (e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    if (selectedElementIds.length !== 1) return;
    const elId = selectedElementIds[0];
    const el = design.elements.find(item => item.id === elId);
    if (!el || el.isLocked) return;

    setIsDragging(true);
    setDragHandle(handle);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setInitialElementBounds({
      [elId]: { x: el.x, y: el.y, w: el.width, h: el.height, rot: el.rotation }
    });
  };

  // Mouse move handler for dragging, resizing, and rotation
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !dragHandle) return;

    const deltaX = (e.clientX - dragStartPos.x) / zoom;
    const deltaY = (e.clientY - dragStartPos.y) / zoom;

    if (dragHandle === 'move') {
      // Move all selected elements
      const targetIds = Object.keys(initialElementBounds);
      if (targetIds.length === 1 && snapToGuides) {
        const id = targetIds[0];
        const initial = initialElementBounds[id];
        let newX = Math.round(initial.x + deltaX);
        let newY = Math.round(initial.y + deltaY);

        // Snap to center of canvas
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const elCenterX = newX + initial.w / 2;
        const elCenterY = newY + initial.h / 2;

        const newSnapLines: { x?: number; y?: number } = {};

        if (Math.abs(elCenterX - centerX) < 6) {
          newX = centerX - initial.w / 2;
          newSnapLines.x = centerX;
        }
        if (Math.abs(elCenterY - centerY) < 6) {
          newY = centerY - initial.h / 2;
          newSnapLines.y = centerY;
        }

        setSnapLines(newSnapLines);
        updateElement(id, { x: newX, y: newY });
      } else {
        targetIds.forEach(id => {
          const initial = initialElementBounds[id];
          if (initial) {
            updateElement(id, {
              x: Math.round(initial.x + deltaX),
              y: Math.round(initial.y + deltaY)
            });
          }
        });
      }
    } else if (dragHandle === 'rotate') {
      // Rotate handle
      const id = selectedElementIds[0];
      const initial = initialElementBounds[id];
      if (initial && canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const elementCenterX = canvasRect.left + (initial.x + initial.w / 2) * zoom;
        const elementCenterY = canvasRect.top + (initial.y + initial.h / 2) * zoom;

        const radians = Math.atan2(e.clientY - elementCenterY, e.clientX - elementCenterX);
        let degrees = Math.round(radians * (180 / Math.PI)) + 90;
        if (degrees < 0) degrees += 360;

        // Snap to 0, 45, 90, 180, 270 if close
        if (Math.abs(degrees % 45) < 3 || Math.abs(degrees % 45) > 42) {
          degrees = Math.round(degrees / 45) * 45 % 360;
        }

        updateElement(id, { rotation: degrees });
      }
    } else {
      // Resize handle: nw, n, ne, e, se, s, sw, w
      const id = selectedElementIds[0];
      const initial = initialElementBounds[id];
      if (!initial) return;

      let newX = initial.x;
      let newY = initial.y;
      let newW = initial.w;
      let newH = initial.h;

      if (dragHandle.includes('e')) newW = Math.max(20, initial.w + deltaX);
      if (dragHandle.includes('s')) newH = Math.max(10, initial.h + deltaY);
      if (dragHandle.includes('w')) {
        const calcW = initial.w - deltaX;
        if (calcW > 20) {
          newW = calcW;
          newX = initial.x + deltaX;
        }
      }
      if (dragHandle.includes('n')) {
        const calcH = initial.h - deltaY;
        if (calcH > 10) {
          newH = calcH;
          newY = initial.y + deltaY;
        }
      }

      updateElement(id, {
        x: Math.round(newX),
        y: Math.round(newY),
        width: Math.round(newW),
        height: Math.round(newH)
      });
    }
  }, [isDragging, dragHandle, dragStartPos, initialElementBounds, zoom, snapToGuides, canvasWidth, canvasHeight, selectedElementIds, updateElement]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragHandle(null);
    setSnapLines({});
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      onClick={handleBackdropClick}
      className="flex-1 h-full overflow-auto bg-slate-200 dark:bg-slate-900 flex items-center justify-center p-8 relative select-none"
      style={{ cursor: isDragging ? 'grabbing' : 'default' }}
    >
      {/* Visual Rulers (Top & Left) */}
      {showRulers && (
        <>
          {/* Top Ruler */}
          <div 
            className="absolute top-0 left-8 right-0 h-6 bg-white dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 flex items-end text-[9px] font-mono text-slate-400 overflow-hidden select-none z-10 pointer-events-none"
          >
            {Array.from({ length: Math.ceil(canvasWidth / 50) + 1 }).map((_, i) => (
              <div 
                key={`ruler-x-${i}`} 
                className="absolute border-l border-slate-300 dark:border-slate-600 h-2 pl-0.5"
                style={{ left: `${i * 50 * zoom}px` }}
              >
                {i % 2 === 0 ? i * 50 : ''}
              </div>
            ))}
          </div>
          {/* Left Ruler */}
          <div 
            className="absolute top-6 left-0 bottom-0 w-8 bg-white dark:bg-slate-800 border-r border-slate-300 dark:border-slate-700 flex flex-col text-[9px] font-mono text-slate-400 overflow-hidden select-none z-10 pointer-events-none"
          >
            {Array.from({ length: Math.ceil(canvasHeight / 50) + 1 }).map((_, i) => (
              <div 
                key={`ruler-y-${i}`} 
                className="absolute border-t border-slate-300 dark:border-slate-600 w-2 pt-0.5"
                style={{ top: `${i * 50 * zoom}px` }}
              >
                {i % 2 === 0 ? i * 50 : ''}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Main Certificate Workspace Canvas */}
      <div
        ref={canvasRef}
        id="certificate-render-canvas"
        className="certificate-print-root relative shadow-2xl transition-shadow transition-transform duration-75 overflow-hidden"
        style={{
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
          ...getCanvasBackgroundStyle()
        }}
      >
        {/* Subtle Grid Lines Overlay */}
        {showGrid && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
        )}

        {/* Printable Safe Area Outline (Dashed guide) */}
        {showSafeArea && (
          <div 
            className="absolute inset-6 border border-dashed border-sky-400 pointer-events-none opacity-60 z-20"
          >
            <span className="absolute top-1 left-2 text-[9px] text-sky-600 font-mono tracking-wider font-semibold">
              SAFE AREA
            </span>
          </div>
        )}

        {/* Alignment Smart Guides (Snapping lines) */}
        {snapLines.x !== undefined && (
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-pink-500 z-50 pointer-events-none shadow-sm"
            style={{ left: `${snapLines.x}px` }}
          />
        )}
        {snapLines.y !== undefined && (
          <div 
            className="absolute left-0 right-0 h-0.5 bg-pink-500 z-50 pointer-events-none shadow-sm"
            style={{ top: `${snapLines.y}px` }}
          />
        )}

        {/* Render All Elements */}
        {design.elements.map(element => {
          const isSelected = selectedElementIds.includes(element.id);

          return (
            <div
              key={element.id}
              id={`el-container-${element.id}`}
              onMouseDown={(e) => handleElementMouseDown(e, element)}
              className={`absolute group transition-shadow ${
                isSelected ? 'ring-2 ring-indigo-500 shadow-md z-30' : 'hover:ring-1 hover:ring-indigo-300 z-10'
              } ${element.isLocked ? 'cursor-not-allowed' : 'cursor-move'}`}
              style={{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                transform: `rotate(${element.rotation}deg)`,
                opacity: element.opacity,
                display: element.isVisible ? 'block' : 'none'
              }}
            >
              <CanvasElementRenderer element={element} dataFields={design.dataFields} />

              {/* Bounding Box Handles when Single Element is Selected */}
              {isSelected && !element.isLocked && (
                <>
                  {/* Top Rotation Handle */}
                  <div
                    onMouseDown={(e) => handleResizeMouseDown(e, 'rotate')}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-2 border-indigo-600 rounded-full cursor-grab active:cursor-grabbing shadow-sm z-40 hover:scale-125 transition-transform"
                    title="Rotate element"
                  >
                    <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-indigo-500" />
                  </div>

                  {/* 8 Directional Resize Handles */}
                  <div onMouseDown={(e) => handleResizeMouseDown(e, 'nw')} className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-indigo-600 cursor-nwse-resize z-40" />
                  <div onMouseDown={(e) => handleResizeMouseDown(e, 'n')} className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-indigo-600 cursor-ns-resize z-40" />
                  <div onMouseDown={(e) => handleResizeMouseDown(e, 'ne')} className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-indigo-600 cursor-nesw-resize z-40" />
                  <div onMouseDown={(e) => handleResizeMouseDown(e, 'e')} className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white border-2 border-indigo-600 cursor-ew-resize z-40" />
                  <div onMouseDown={(e) => handleResizeMouseDown(e, 'se')} className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-indigo-600 cursor-nwse-resize z-40" />
                  <div onMouseDown={(e) => handleResizeMouseDown(e, 's')} className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-indigo-600 cursor-ns-resize z-40" />
                  <div onMouseDown={(e) => handleResizeMouseDown(e, 'sw')} className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-indigo-600 cursor-nesw-resize z-40" />
                  <div onMouseDown={(e) => handleResizeMouseDown(e, 'w')} className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 bg-white border-2 border-indigo-600 cursor-ew-resize z-40" />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

