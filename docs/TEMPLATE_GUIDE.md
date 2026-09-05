# Certificate Template Authoring Guide

## Anatomy of a Professional Template
Every CMAKER certificate template consists of 6 standard architectural zones:

1. **Outer & Inner Borders**: Vector hairline framing, corner filigrees, and background tint.
2. **Institutional Header**: Organization crest, authority name, subtitle, and distinction pill.
3. **Core Recipient Block**: Conferral notice, recipient name, description, and course/event title.
4. **Credential Metadata**: Issue date, expiration, and unique certificate serial identifier.
5. **Signatory Block**: Dual authority signatures, institutional titles, and credential lines.
6. **Security & Verification**: Upright curved foil seal, dynamic QR code, and microprint security bar.

## Template Schema
```typescript
export interface CertificateTemplate {
  id: string;
  name: string;
  category: 'academic' | 'corporate' | 'event' | 'creative';
  paperSize: 'a4-landscape' | 'a4-portrait' | 'letter-landscape' | 'letter-portrait';
  backgroundColor: string;
  elements: CanvasElement[];
  thumbnail?: string;
  tags?: string[];
}
```
