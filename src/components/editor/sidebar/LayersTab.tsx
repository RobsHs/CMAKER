import React, { useState } from 'react';
import { useEditor } from '../../../context/EditorContext';
import { 
  Layers, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  ChevronsUp, 
  ChevronsDown, 
  Trash2,
  Edit2,
  Check
} from 'lucide-react';

export const LayersTab: React.FC = () => {
  const { 
    design, 
    selectedElementIds, 
    setSelectedElementIds, 
    reorderElement, 
    toggleLock, 
    toggleVisibility, 
    updateElement,
    deleteSelectedElements 
  } = useEditor();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');

  const elementsReversed = [...design.elements].reverse(); // Top layer first visually

  const handleStartRename = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const handleSaveRename = (id: string) => {
    if (editingName.trim()) {
      updateElement(id, { name: editingName.trim() });
    }
    setEditingId(null);
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <Layers className="w-4 h-4 text-indigo-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Layers Management
          </h4>
        </div>
        <p className="text-xs text-slate-400">
          Reorder stacking z-index, lock positions, or hide elements.
        </p>
      </div>

      <div className="space-y-1.5 max-h-[calc(100vh-260px)] overflow-y-auto pr-1">
        {elementsReversed.map((el) => {
          const isSelected = selectedElementIds.includes(el.id);

          return (
            <div
              key={el.id}
              onClick={() => setSelectedElementIds([el.id])}
              className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                isSelected 
                  ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200' 
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-slate-50'
              }`}
            >
              {/* Left: Type tag & name */}
              <div className="flex items-center gap-2 flex-1 min-w-0 mr-2">
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-700 text-slate-500 shrink-0">
                  {el.type}
                </span>

                {editingId === el.id ? (
                  <div className="flex items-center gap-1 flex-1">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-full text-xs px-1.5 py-0.5 rounded border border-indigo-400 bg-white dark:bg-slate-900"
                      autoFocus
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveRename(el.id);
                      }}
                      className="p-1 text-emerald-600"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <span 
                    onDoubleClick={() => handleStartRename(el.id, el.name)}
                    className="truncate font-medium text-slate-700 dark:text-slate-200"
                    title={el.name}
                  >
                    {el.name}
                  </span>
                )}
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-1 shrink-0">
                {/* Reorder Buttons (shown when selected) */}
                {isSelected && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        reorderElement(el.id, 'front');
                      }}
                      className="p-1 rounded text-slate-500 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700"
                      title="Bring to Front"
                    >
                      <ChevronsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        reorderElement(el.id, 'forward');
                      }}
                      className="p-1 rounded text-slate-500 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700"
                      title="Bring Forward"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        reorderElement(el.id, 'backward');
                      }}
                      className="p-1 rounded text-slate-500 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700"
                      title="Send Backward"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        reorderElement(el.id, 'back');
                      }}
                      className="p-1 rounded text-slate-500 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700"
                      title="Send to Back"
                    >
                      <ChevronsDown className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}

                {/* Visibility Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVisibility(el.id);
                  }}
                  className={`p-1 rounded transition-colors ${
                    el.isVisible ? 'text-slate-400 hover:text-slate-700' : 'text-slate-300'
                  }`}
                  title={el.isVisible ? 'Hide element' : 'Show element'}
                >
                  {el.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>

                {/* Lock Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLock(el.id);
                  }}
                  className={`p-1 rounded transition-colors ${
                    el.isLocked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title={el.isLocked ? 'Unlock element' : 'Lock element'}
                >
                  {el.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

