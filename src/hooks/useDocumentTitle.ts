import { useEffect } from 'react';

export function useDocumentTitle(title: string, retainOnUnmount: boolean = false): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} — CMAKER` : 'CMAKER — Professional Certificate Generator';

    return () => {
      if (!retainOnUnmount) {
        document.title = previousTitle;
      }
    };
  }, [title, retainOnUnmount]);
}
