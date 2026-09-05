import React, { useState } from 'react';
import { EditorTopBar } from './EditorTopBar';
import { EditorLeftSidebar } from './EditorLeftSidebar';
import { CertificateCanvas } from './CertificateCanvas';
import { EditorRightProperties } from './EditorRightProperties';
import { PrintPreviewModal } from './PrintPreviewModal';

export const EditorView: React.FC = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-100 dark:bg-slate-950">
      {/* Studio Top Action Bar */}
      <EditorTopBar onOpenPrintPreview={() => setIsPreviewOpen(true)} />

      {/* Main Studio Workspace: Left Sidebar + Center Canvas + Right Properties */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Toolbar Dock & Flyout */}
        <EditorLeftSidebar />

        {/* Center Interactive Scalable Canvas */}
        <CertificateCanvas />

        {/* Right Properties Panel */}
        <EditorRightProperties />
      </div>

      {/* Realistic Paper Print Preview Proof Modal */}
      <PrintPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};

