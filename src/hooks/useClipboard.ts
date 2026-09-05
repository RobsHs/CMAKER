import { useState, useCallback } from 'react';

export function useClipboard(timeoutMs: number = 2000): {
  hasCopied: boolean;
  copy: (text: string) => Promise<boolean>;
} {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard API not available');
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), timeoutMs);
      return true;
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      return false;
    }
  }, [timeoutMs]);

  return { hasCopied, copy };
}
