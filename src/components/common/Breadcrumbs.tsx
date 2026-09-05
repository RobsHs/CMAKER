import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500" aria-label="Breadcrumb">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="text-slate-300 dark:text-slate-700">/</span>}
            {isLast ? (
              <span className="text-slate-800 dark:text-slate-200 font-bold" aria-current="page">
                {item.label}
              </span>
            ) : item.onClick ? (
              <button onClick={item.onClick} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {item.label}
              </button>
            ) : (
              <span>{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
