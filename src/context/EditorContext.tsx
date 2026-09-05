import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { 
  BackgroundSettings, 
  CanvasDimensions, 
  CertificateDesign, 
  CertificateElement, 
  CertificateProject, 
  CertificateTemplate, 
  PaperSize, 
  NewCertificateElement,
  TextElement 
} from '../types/certificate';
import { DEFAULT_CERTIFICATE_DESIGN } from '../constants/sampleData';
import { PAPER_SIZE_PRESETS } from '../constants/sizes';
import { StorageService } from '../utils/storage';

interface EditorContextType {
  design: CertificateDesign;
  setDesign: React.Dispatch<React.SetStateAction<CertificateDesign>>;
  selectedElementIds: string[];
  setSelectedElementIds: React.Dispatch<React.SetStateAction<string[]>>;
  activeElement: CertificateElement | null;
  zoom: number;
  setZoom: (zoom: number) => void;
  showRulers: boolean;
  setShowRulers: (show: boolean) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  showSafeArea: boolean;
  setShowSafeArea: (show: boolean) => void;
  snapToGuides: boolean;
  setSnapToGuides: (snap: boolean) => void;
  saveStatus: 'saved' | 'saving' | 'unsaved';
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  addElement: (element: NewCertificateElement) => string;
  updateElement: (id: string, updates: Partial<CertificateElement>) => void;
  deleteSelectedElements: () => void;
  duplicateSelectedElements: () => void;
  reorderElement: (id: string, action: 'forward' | 'backward' | 'front' | 'back') => void;
  toggleLock: (id: string) => void;
  toggleVisibility: (id: string) => void;
  setCanvasSize: (size: PaperSize) => void;
  setBackground: (bg: BackgroundSettings) => void;
  updateDataField: (key: string, value: string) => void;
  addCustomDataField: (key: string, value: string) => void;
  loadTemplate: (template: CertificateTemplate) => void;
  loadProject: (project: CertificateProject) => void;
  saveCurrentProject: (projectName?: string) => CertificateProject;
  resetToDefault: () => void;
  copyElements: () => void;
  pasteElements: () => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [design, setDesign] = useState<CertificateDesign>(() => {
    // Attempt loading last saved project from storage
    const projects = StorageService.getProjects();
    return projects.length > 0 ? projects[0].design : DEFAULT_CERTIFICATE_DESIGN;
  });

  const [selectedElementIds, setSelectedElementIds] = useState<string[]>([]);
  const [zoom, setZoomState] = useState<number>(1.0);
  const [showRulers, setShowRulers] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [showSafeArea, setShowSafeArea] = useState<boolean>(true);
  const [snapToGuides, setSnapToGuides] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  // Clipboard for Copy/Paste
  const clipboardRef = useRef<CertificateElement[]>([]);

  // History Stacks for robust Undo/Redo
  const undoStackRef = useRef<CertificateDesign[]>([]);
  const redoStackRef = useRef<CertificateDesign[]>([]);
  const isHistoryActionRef = useRef<boolean>(false);

  // Push snapshot to history
  const pushHistorySnapshot = useCallback((newDesign: CertificateDesign) => {
    if (isHistoryActionRef.current) return;
    undoStackRef.current.push(JSON.parse(JSON.stringify(design)));
    if (undoStackRef.current.length > 40) {
      undoStackRef.current.shift(); // Keep bounded
    }
    redoStackRef.current = []; // Clear redo stack on fresh action
    setSaveStatus('unsaved');
  }, [design]);

  // Debounced Autosave to localStorage
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (saveStatus === 'unsaved') {
      if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
      setSaveStatus('saving');
      autosaveTimeoutRef.current = setTimeout(() => {
        saveCurrentProject();
        setSaveStatus('saved');
      }, 1200);
    }
    return () => {
      if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
    };
  }, [design, saveStatus]);

  // Active single selected element
  const activeElement = selectedElementIds.length === 1 
    ? design.elements.find(el => el.id === selectedElementIds[0]) || null 
    : null;

  // Zoom wrapper
  const setZoom = (newZoom: number) => {
    const clamped = Math.max(0.25, Math.min(2.0, parseFloat(newZoom.toFixed(2))));
    setZoomState(clamped);
  };

  // Undo / Redo
  const undo = () => {
    if (undoStackRef.current.length === 0) return;
    const previous = undoStackRef.current.pop()!;
    redoStackRef.current.push(JSON.parse(JSON.stringify(design)));
    isHistoryActionRef.current = true;
    setDesign(previous);
    setTimeout(() => { isHistoryActionRef.current = false; }, 50);
  };

  const redo = () => {
    if (redoStackRef.current.length === 0) return;
    const next = redoStackRef.current.pop()!;
    undoStackRef.current.push(JSON.parse(JSON.stringify(design)));
    isHistoryActionRef.current = true;
    setDesign(next);
    setTimeout(() => { isHistoryActionRef.current = false; }, 50);
  };

  // Add Element
  const addElement = (newElementProps: NewCertificateElement): string => {
    const id = `el-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const fullElement: CertificateElement = {
      ...newElementProps,
      id
    } as CertificateElement;

    pushHistorySnapshot(design);
    setDesign(prev => ({
      ...prev,
      elements: [...prev.elements, fullElement]
    }));
    setSelectedElementIds([id]);
    return id;
  };

  // Update Element
  const updateElement = (id: string, updates: Partial<CertificateElement>) => {
    pushHistorySnapshot(design);
    setDesign(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === id ? ({ ...el, ...updates } as CertificateElement) : el)
    }));
  };

  // Delete Selected Elements
  const deleteSelectedElements = () => {
    if (selectedElementIds.length === 0) return;
    pushHistorySnapshot(design);
    setDesign(prev => ({
      ...prev,
      elements: prev.elements.filter(el => !selectedElementIds.includes(el.id) || el.isLocked)
    }));
    setSelectedElementIds([]);
  };

  // Duplicate Selected Elements
  const duplicateSelectedElements = () => {
    if (selectedElementIds.length === 0) return;
    pushHistorySnapshot(design);
    const newElements: CertificateElement[] = [];
    const newIds: string[] = [];

    design.elements.forEach(el => {
      if (selectedElementIds.includes(el.id)) {
        const copyId = `el-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const copy: CertificateElement = {
          ...JSON.parse(JSON.stringify(el)),
          id: copyId,
          name: `${el.name} (Copy)`,
          x: el.x + 20,
          y: el.y + 20
        };
        newElements.push(copy);
        newIds.push(copyId);
      }
    });

    setDesign(prev => ({
      ...prev,
      elements: [...prev.elements, ...newElements]
    }));
    setSelectedElementIds(newIds);
  };

  // Copy & Paste
  const copyElements = () => {
    const selected = design.elements.filter(el => selectedElementIds.includes(el.id));
    if (selected.length > 0) {
      clipboardRef.current = JSON.parse(JSON.stringify(selected));
    }
  };

  const pasteElements = () => {
    if (clipboardRef.current.length === 0) return;
    pushHistorySnapshot(design);
    const pasted: CertificateElement[] = [];
    const pastedIds: string[] = [];

    clipboardRef.current.forEach(el => {
      const copyId = `el-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const copy: CertificateElement = {
        ...JSON.parse(JSON.stringify(el)),
        id: copyId,
        x: el.x + 25,
        y: el.y + 25
      };
      pasted.push(copy);
      pastedIds.push(copyId);
    });

    setDesign(prev => ({
      ...prev,
      elements: [...prev.elements, ...pasted]
    }));
    setSelectedElementIds(pastedIds);
  };

  // Reorder Element Layer
  const reorderElement = (id: string, action: 'forward' | 'backward' | 'front' | 'back') => {
    pushHistorySnapshot(design);
    setDesign(prev => {
      const idx = prev.elements.findIndex(el => el.id === id);
      if (idx === -1) return prev;
      const elements = [...prev.elements];
      const [item] = elements.splice(idx, 1);

      if (action === 'back') {
        elements.unshift(item);
      } else if (action === 'front') {
        elements.push(item);
      } else if (action === 'backward') {
        const newIdx = Math.max(0, idx - 1);
        elements.splice(newIdx, 0, item);
      } else if (action === 'forward') {
        const newIdx = Math.min(elements.length, idx + 1);
        elements.splice(newIdx, 0, item);
      }

      return { ...prev, elements };
    });
  };

  // Lock / Unlock
  const toggleLock = (id: string) => {
    setDesign(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === id ? { ...el, isLocked: !el.isLocked } : el)
    }));
  };

  // Visibility
  const toggleVisibility = (id: string) => {
    setDesign(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === id ? { ...el, isVisible: !el.isVisible } : el)
    }));
  };

  // Canvas Paper Size
  const setCanvasSize = (size: PaperSize) => {
    const preset = PAPER_SIZE_PRESETS[size] || PAPER_SIZE_PRESETS['a4-landscape'];
    pushHistorySnapshot(design);
    setDesign(prev => ({
      ...prev,
      dimensions: preset.dimensions
    }));
  };

  // Background
  const setBackground = (bg: BackgroundSettings) => {
    pushHistorySnapshot(design);
    setDesign(prev => ({ ...prev, background: bg }));
  };

  // Variable Data Fields
  const updateDataField = (key: string, value: string) => {
    setDesign(prev => {
      const fields = { ...prev.dataFields };
      if (key in fields) {
        (fields as unknown as Record<string, string>)[key] = value;
      } else {
        fields.custom_fields = { ...fields.custom_fields, [key]: value };
      }
      return { ...prev, dataFields: fields };
    });
    setSaveStatus('unsaved');
  };

  const addCustomDataField = (key: string, value: string) => {
    setDesign(prev => ({
      ...prev,
      dataFields: {
        ...prev.dataFields,
        custom_fields: {
          ...prev.dataFields.custom_fields,
          [key]: value
        }
      }
    }));
    setSaveStatus('unsaved');
  };

  // Load Template
  const loadTemplate = (template: CertificateTemplate) => {
    pushHistorySnapshot(design);
    setDesign(JSON.parse(JSON.stringify(template.design)));
    setSelectedElementIds([]);
    setSaveStatus('unsaved');
  };

  // Load Project
  const loadProject = (project: CertificateProject) => {
    pushHistorySnapshot(design);
    setDesign(JSON.parse(JSON.stringify(project.design)));
    setSelectedElementIds([]);
    setSaveStatus('saved');
  };

  // Save Current Project
  const saveCurrentProject = (projectName?: string): CertificateProject => {
    const project: CertificateProject = {
      id: design.id || `proj-${Date.now()}`,
      name: projectName || design.name || 'Untitled Certificate',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'published',
      design
    };
    StorageService.saveProject(project);
    setSaveStatus('saved');
    return project;
  };

  // Reset
  const resetToDefault = () => {
    pushHistorySnapshot(design);
    setDesign(DEFAULT_CERTIFICATE_DESIGN);
    setSelectedElementIds([]);
  };

  // Global Keyboard Shortcuts (Ctrl+Z, Ctrl+Shift+Z, Ctrl+C, Ctrl+V, Ctrl+D, Delete, Backspace, Arrow keys, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.isContentEditable
      ) {
        return;
      }

      const isCtrl = e.ctrlKey || e.metaKey;

      if (isCtrl && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if (isCtrl && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      } else if (isCtrl && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        copyElements();
      } else if (isCtrl && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        pasteElements();
      } else if (isCtrl && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        duplicateSelectedElements();
      } else if (isCtrl && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveCurrentProject();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedElementIds.length > 0) {
          e.preventDefault();
          deleteSelectedElements();
        }
      } else if (e.key === 'Escape') {
        setSelectedElementIds([]);
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        if (selectedElementIds.length > 0) {
          e.preventDefault();
          const step = e.shiftKey ? 10 : 1;
          const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
          const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;

          setDesign(prev => ({
            ...prev,
            elements: prev.elements.map(el => {
              if (selectedElementIds.includes(el.id) && !el.isLocked) {
                return { ...el, x: el.x + dx, y: el.y + dy };
              }
              return el;
            })
          }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [design, selectedElementIds]);

  return (
    <EditorContext.Provider
      value={{
        design,
        setDesign,
        selectedElementIds,
        setSelectedElementIds,
        activeElement,
        zoom,
        setZoom,
        showRulers,
        setShowRulers,
        showGrid,
        setShowGrid,
        showSafeArea,
        setShowSafeArea,
        snapToGuides,
        setSnapToGuides,
        saveStatus,
        canUndo: undoStackRef.current.length > 0,
        canRedo: redoStackRef.current.length > 0,
        undo,
        redo,
        addElement,
        updateElement,
        deleteSelectedElements,
        duplicateSelectedElements,
        reorderElement,
        toggleLock,
        toggleVisibility,
        setCanvasSize,
        setBackground,
        updateDataField,
        addCustomDataField,
        loadTemplate,
        loadProject,
        saveCurrentProject,
        resetToDefault,
        copyElements,
        pasteElements
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
