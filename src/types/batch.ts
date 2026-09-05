/**
 * Batch & Bulk Generation Types for CMAKER
 */

export interface BatchColumnMapping {
  csvHeader: string;
  templateToken: string;
  defaultValue?: string;
  isRequired: boolean;
}

export interface BatchRowRecord {
  rowIndex: number;
  data: Record<string, string>;
  isValid: boolean;
  errors: string[];
}

export interface BatchJobProgress {
  totalRows: number;
  completedRows: number;
  failedRows: number;
  currentStep: 'parsing' | 'validating' | 'rendering' | 'compressing' | 'completed';
  percentComplete: number;
}

export interface BatchExportOptions {
  format: 'pdf' | 'png' | 'jpeg';
  zipFileName: string;
  namingPattern: string;
  quality: 'standard' | 'high' | 'print_300dpi';
}
