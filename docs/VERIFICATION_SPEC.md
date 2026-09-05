# Credential Verification Specification

## Certificate Identifier Format
All CMAKER certificates carry an immutable identifier formatted as:
```
CERT-YYYYMMDD-[4-HEX-OR-NUM]
Example: CERT-20260905-7281
```

## Verification Lifecycle
```mermaid
stateDiagram-v2
    [*] --> Valid: Issued by Authority
    Valid --> Revoked: Revoked by Issuer (Audit Reason)
    Valid --> Expired: Exceeded Validity Period
    Revoked --> Valid: Reinstated by Issuer
    [*] --> NotFound: Unrecognized Certificate ID
```

## Status Codes
- `VALID`: Certificate is genuine, registered, and active.
- `REVOKED`: Certificate was invalidated due to academic dishonesty, credential recall, or data correction.
- `EXPIRED`: Certificate was authentic but has passed its validity window.
- `NOT_FOUND`: Identifier does not exist in the issuer registry.
