# Security & Data Privacy Practices

CMAKER is engineered with a strict **zero-retention, client-first architecture**:

1. **Local Sandboxing**: Certificate generation, signature drawing, image transparency processing, and PDF compilation execute 100% inside the user's browser memory.
2. **Cryptographic Validation**: Certificate identifiers incorporate SHA-256 fingerprint hashes guaranteeing that the certificate content has not been tampered with post-issuance.
3. **No Unauthenticated External Transmission**: Private data, recipient lists, and uploaded signatures are never transmitted to third-party tracking services.
