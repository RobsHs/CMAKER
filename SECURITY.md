# Security Policy

## Supported Versions
| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Cryptographic Guarantees
CMAKER implements client-side cryptographic verification mechanisms:
1. **Dynamic Verification Endpoints**: QR codes embed tamper-resistant identifiers linked to public verification registry.
2. **Deterministic Fingerprints**: SHA-256 digital hashes computed over immutable certificate attributes (recipient, issue date, credential ID).
3. **Zero Data Leakage**: All signature drawing, image processing, and PDF rendering occur 100% in-browser within sandboxed memory.

## Reporting a Vulnerability
If you discover a security vulnerability within CMAKER, please **DO NOT** open a public issue.
Instead, send an email to `security@cmaker.app` with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

We will respond within 48 hours and coordinate a coordinated disclosure release.
