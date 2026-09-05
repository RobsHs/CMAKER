import React from 'react';
import { Modal } from './Modal.tsx';
import { CANVAS_KEYBOARD_SHORTCUTS } from '../../constants/keybindings.ts';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Studio Keyboard Shortcuts" maxWidth="max-w-md">
      <div className="space-y-3">
        <p className="text-xs text-slate-500 mb-4">
          Speed up your certificate authoring workflow with these quick key combinations:
        </p>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {CANVAS_KEYBOARD_SHORTCUTS.map((sc, i) => (
            <div key={i} className="flex items-center justify-between py-2.5">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{sc.action}</span>
              <kbd className="px-2 py-1 text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md shadow-xs">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
