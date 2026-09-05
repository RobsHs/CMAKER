import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
          error: <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />,
          warning: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
          info: <Info className="w-4 h-4 text-sky-500 shrink-0" />
        };

        const borders = {
          success: 'border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900',
          error: 'border-rose-200 dark:border-rose-800 bg-white dark:bg-slate-900',
          warning: 'border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-900',
          info: 'border-sky-200 dark:border-sky-800 bg-white dark:bg-slate-900'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-lg ${borders[toast.type]} animate-in slide-in-from-bottom-2 fade-in duration-200`}
          >
            <div className="flex items-center gap-2.5">
              {icons[toast.type]}
              <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

