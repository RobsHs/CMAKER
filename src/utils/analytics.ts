/**
 * Privacy-Preserving Event Logger
 */

export type AnalyticsEventType = 'template_select' | 'certificate_export' | 'signature_add' | 'batch_generate';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  timestamp: number;
  metadata?: Record<string, any>;
}

export function logClientEvent(type: AnalyticsEventType, metadata?: Record<string, any>): void {
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[CMAKER Event] ${type}`, metadata);
  }
}
