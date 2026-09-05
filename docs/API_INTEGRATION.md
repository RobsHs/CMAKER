# API Integration Guide

While CMAKER operates client-first, verification records can be queried programmatically or integrated into external LMS platforms.

## Verification Query Endpoint
```http
GET /api/v1/verify/{certificate_id}
```

### Sample Response:
```json
{
  "status": "valid",
  "certificateId": "CERT-20260905-7281",
  "recipientName": "Dr. Eleanor Vance",
  "credentialTitle": "Doctor of Jurisprudence (J.D.)",
  "issuer": "Metropolitan Bar Association",
  "issueDate": "2026-09-05",
  "verificationUrl": "https://cmaker.app/verify/CERT-20260905-7281",
  "fingerprint": "8f4a2b8e3c1d7f6a5b9e0c3d2e1f4a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f"
}
```
