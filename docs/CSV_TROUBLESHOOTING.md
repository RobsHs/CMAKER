# CSV Troubleshooting Guide

Common issues encountered when importing bulk participant datasets and their solutions:

### 1. Special Characters (Accents, Umlauts, Non-Latin Scripts)
- **Symptom**: Names like "José Müller" render as "Jos Mller".
- **Solution**: Save CSV with explicit **UTF-8 with BOM** or standard **UTF-8** encoding.

### 2. Semicolon vs Comma Delimiters
- **Symptom**: All columns appear merged into a single field.
- **Solution**: CMAKER's PapaParse engine automatically auto-detects comma (`,`), semicolon (`;`), and tab (`\t`) delimiters.

### 3. Missing Required Fields
- Check that `recipient_name` is mapped to an existing CSV column header.
