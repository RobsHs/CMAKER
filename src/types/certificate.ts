export type ElementType = 
  | 'text'
  | 'image'
  | 'signature'
  | 'seal'
  | 'qrcode'
  | 'shape'
  | 'border';

export type FontCategory = 'serif' | 'sans-serif' | 'script' | 'mono';

export type TextAlignment = 'left' | 'center' | 'right' | 'justify';

export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

export type BorderStyle = 'single' | 'double' | 'dashed' | 'dotted' | 'ornamental' | 'geometric' | 'luxury';

export type SealTemplateType = 'certified' | 'official' | 'verified' | 'completed' | 'custom';

export type CertificateStatus = 'draft' | 'valid' | 'revoked' | 'expired';

export type PaperSize = 'a4-landscape' | 'a4-portrait' | 'letter-landscape' | 'letter-portrait' | 'custom';

export type ExportQuality = 'standard' | 'high' | 'print';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number; // in pixels at base coordinate scale (e.g. 1123 x 794 for A4 landscape)
  y: number;
  width: number;
  height: number;
  rotation: number; // in degrees
  opacity: number; // 0 to 1
  isLocked: boolean;
  isVisible: boolean;
  name: string;
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string; // May contain template variables like {{recipient_name}}
  fontSize: number;
  fontFamily: string;
  fontWeight: number | string;
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
  color: string;
  textAlign: TextAlignment;
  letterSpacing: number;
  lineHeight: number;
  textTransform?: TextTransform;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  isVariableField?: boolean;
  variableKey?: string;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  preserveAspectRatio: boolean;
  borderRadius?: number;
  objectFit?: 'contain' | 'cover';
}

export interface SignatureElement extends BaseElement {
  type: 'signature';
  src: string; // Base64 data URL
  signerName?: string;
  signerTitle?: string;
  isTransparent?: boolean;
  filterColor?: string; // Optional tinting
}

export interface SealElement extends BaseElement {
  type: 'seal';
  sealType: SealTemplateType;
  primaryText: string; // e.g. "OFFICIAL SEAL"
  secondaryText: string; // e.g. "CERTIFIED AUTHENTIC"
  centerIcon: 'star' | 'ribbon' | 'shield' | 'laurel' | 'crest';
  sealColor: string; // e.g. "#d97706" gold
  accentColor: string;
  outerRingStyle: 'scalloped' | 'gear' | 'smooth' | 'double-ring';
}

export interface QRCodeElement extends BaseElement {
  type: 'qrcode';
  urlPattern: string; // e.g. "https://cmaker.app/verify/{{certificate_id}}"
  fgColor: string;
  bgColor: string;
  includeLabel: boolean;
  label: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'line' | 'star' | 'badge' | 'ribbon' | 'divider' | 'corner-ornament' | 'laurel';
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  cornerRadius?: number;
}

export interface BorderElement extends BaseElement {
  type: 'border';
  borderStyle: BorderStyle;
  strokeColor: string;
  secondaryColor?: string;
  strokeWidth: number;
  inset: number;
  hasCorners: boolean;
}

export type CertificateElement = 
  | TextElement 
  | ImageElement 
  | SignatureElement 
  | SealElement 
  | QRCodeElement 
  | ShapeElement 
  | BorderElement;

export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

export type NewCertificateElement = DistributiveOmit<CertificateElement, 'id'>;

export interface CanvasDimensions {
  width: number;
  height: number;
  unit: 'px' | 'mm';
  name: PaperSize;
  orientation: 'landscape' | 'portrait';
}

export interface BackgroundSettings {
  type: 'color' | 'gradient' | 'pattern';
  color: string;
  secondaryColor?: string;
  gradientAngle?: number;
  patternType?: 'none' | 'damask' | 'dots' | 'geometric' | 'lines' | 'waves';
  patternOpacity?: number;
}

export interface CertificateDataFields {
  recipient_name: string;
  certificate_title: string;
  course_name: string;
  description: string;
  organization_name: string;
  organization_address?: string;
  issue_date: string;
  expiry_date?: string;
  certificate_id: string;
  instructor_name: string;
  instructor_position: string;
  score?: string;
  grade?: string;
  event_name?: string;
  custom_fields: Record<string, string>;
}

export interface CertificateDesign {
  id: string;
  name: string;
  dimensions: CanvasDimensions;
  background: BackgroundSettings;
  elements: CertificateElement[];
  dataFields: CertificateDataFields;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  category: 'academic' | 'corporate' | 'event' | 'creative';
  description: string;
  tags: string[];
  thumbnailColor: string;
  design: CertificateDesign;
}

export interface CertificateProject {
  id: string;
  name: string;
  templateId?: string;
  createdAt: string;
  updatedAt: string;
  design: CertificateDesign;
  status: 'draft' | 'generated' | 'downloaded' | 'published';
  thumbnailDataUrl?: string;
}

export interface IssuedCertificate {
  id: string; // e.g. "CERT-2026-000001"
  projectId?: string;
  recipientName: string;
  recipientEmail?: string;
  title: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  status: CertificateStatus;
  issuerName: string;
  issuerPosition: string;
  revocationReason?: string;
  revokedAt?: string;
  designSnapshot: CertificateDesign;
  createdAt: string;
  scanCount: number;
  verificationHash: string;
}

export interface BulkRecipientRow {
  id: string;
  name: string;
  email: string;
  course?: string;
  date?: string;
  score?: string;
  certificateId?: string;
  customData: Record<string, string>;
  status: 'valid' | 'invalid' | 'duplicate';
  errorMessage?: string;
}

export interface BulkJob {
  id: string;
  name: string;
  createdAt: string;
  totalCount: number;
  successCount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  projectId: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: 'create' | 'issue' | 'revoke' | 'verify' | 'download' | 'export_bulk';
  certificateId?: string;
  details: string;
  performedBy: string;
}

export interface AppSettings {
  appName: string;
  organizationName: string;
  organizationLogo?: string;
  defaultPaperSize: PaperSize;
  defaultDateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD' | 'Long Date';
  pdfQuality: ExportQuality;
  idFormatPrefix: string;
  idFormatPattern: string; // e.g. "CERT-{YEAR}-{NUMBER}"
  verificationBaseUrl: string;
  language: 'en' | 'id';
  theme: 'light' | 'dark';
}
