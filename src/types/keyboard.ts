/**
 * Keyboard Shortcut Action Types
 */

export type ShortcutAction =
  | 'undo'
  | 'redo'
  | 'delete'
  | 'duplicate'
  | 'save'
  | 'zoomIn'
  | 'zoomOut'
  | 'zoomFit'
  | 'bringForward'
  | 'sendBackward';

export interface ShortcutDefinition {
  key: string;
  ctrlOrCmd: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  action: ShortcutAction;
}
