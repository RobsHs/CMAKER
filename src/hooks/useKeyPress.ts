import { useEffect } from 'react';

export function useKeyPress(
  targetKey: string,
  handler: (e: KeyboardEvent) => void,
  modifiers: { ctrl?: boolean; shift?: boolean; alt?: boolean } = {}
): void {
  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== targetKey.toLowerCase()) return;
      if (modifiers.ctrl && !event.ctrlKey && !event.metaKey) return;
      if (modifiers.shift && !event.shiftKey) return;
      if (modifiers.alt && !event.altKey) return;

      handler(event);
    };

    window.addEventListener('keydown', keyListener);
    return () => window.removeEventListener('keydown', keyListener);
  }, [targetKey, handler, modifiers]);
}
