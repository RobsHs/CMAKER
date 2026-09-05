import React, { useState } from 'react';
import { 
  LayoutTemplate, 
  Shapes, 
  Type, 
  Image as ImageIcon, 
  PenTool, 
  Award, 
  QrCode, 
  Palette, 
  Database, 
  Layers, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { TemplatesTab } from './sidebar/TemplatesTab';
import { ElementsTab } from './sidebar/ElementsTab';
import { TextTab } from './sidebar/TextTab';
import { ImagesTab } from './sidebar/ImagesTab';
import { SignatureTab } from './sidebar/SignatureTab';
import { SealTab } from './sidebar/SealTab';
import { QRTab } from './sidebar/QRTab';
import { BackgroundTab } from './sidebar/BackgroundTab';
import { DataTab } from './sidebar/DataTab';
import { LayersTab } from './sidebar/LayersTab';

type SidebarTab = 
  | 'templates' 
  | 'elements' 
  | 'text' 
  | 'images' 
  | 'signature' 
  | 'seal' 
  | 'qr' 
  | 'background' 
  | 'data' 
  | 'layers';

export const EditorLeftSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('templates');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const tabs: Array<{ id: SidebarTab; label: string; icon: React.ReactNode }> = [
    { id: 'templates', label: 'Templates', icon: <LayoutTemplate className="w-5 h-5" /> },
    { id: 'text', label: 'Text', icon: <Type className="w-5 h-5" /> },
    { id: 'elements', label: 'Elements', icon: <Shapes className="w-5 h-5" /> },
    { id: 'images', label: 'Images & Logo', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'signature', label: 'Signature', icon: <PenTool className="w-5 h-5" /> },
    { id: 'seal', label: 'Official Seal', icon: <Award className="w-5 h-5" /> },
    { id: 'qr', label: 'QR Code', icon: <QrCode className="w-5 h-5" /> },
    { id: 'background', label: 'Background', icon: <Palette className="w-5 h-5" /> },
    { id: 'data', label: 'Data Fields', icon: <Database className="w-5 h-5" /> },
    { id: 'layers', label: 'Layers', icon: <Layers className="w-5 h-5" /> },
  ];

  const handleTabClick = (tabId: SidebarTab) => {
    if (activeTab === tabId && isDrawerOpen) {
      setIsDrawerOpen(false);
    } else {
      setActiveTab(tabId);
      setIsDrawerOpen(true);
    }
  };

  return (
    <aside className="h-full flex z-20 select-none shadow-xs border-r border-slate-200 dark:border-slate-800">
      {/* 1. Icon Dock (Slim Left Bar) */}
      <div className="w-18 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center py-3 overflow-y-auto space-y-1 shrink-0">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id && isDrawerOpen;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-14 h-14 flex flex-col items-center justify-center rounded-xl text-[10px] font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
              title={tab.label}
            >
              <div className="transition-transform group-hover:scale-110">
                {tab.icon}
              </div>
              <span className="truncate max-w-[50px] mt-1 text-[9px] leading-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Flyout Sub-Panel Drawer */}
      {isDrawerOpen && (
        <div className="w-72 sm:w-80 h-full bg-white dark:bg-slate-900 overflow-y-auto flex flex-col relative animate-in slide-in-from-left-2 duration-150">
          {/* Collapse Toggle Chevron */}
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
            title="Collapse panel"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Sub-Panel Content */}
          <div className="flex-1">
            {activeTab === 'templates' && <TemplatesTab />}
            {activeTab === 'text' && <TextTab />}
            {activeTab === 'elements' && <ElementsTab />}
            {activeTab === 'images' && <ImagesTab />}
            {activeTab === 'signature' && <SignatureTab />}
            {activeTab === 'seal' && <SealTab />}
            {activeTab === 'qr' && <QRTab />}
            {activeTab === 'background' && <BackgroundTab />}
            {activeTab === 'data' && <DataTab />}
            {activeTab === 'layers' && <LayersTab />}
          </div>
        </div>
      )}
    </aside>
  );
};

