# Bulk CSV Batch Generation Specification

CMAKER provides high-throughput client-side bulk certificate generation from CSV spreadsheets.

## Supported Variable Tokens
| Token | Description | Example Replacement |
| :--- | :--- | :--- |
| `{{recipient_name}}` | Full name of recipient | Dr. Eleanor Vance |
| `{{certificate_id}}` | Unique certificate identifier | CERT-2026-0905-8841 |
| `{{issue_date}}` | Date of issuance | September 5, 2026 |
| `{{course_name}}` | Course or event title | Full-Stack Web Development |
| `{{organization}}` | Issuing organization | CMAKER Global Academy |
| `{{score}}` | Final score or grade | 98.5% |
| `{{instructor_name}}` | Primary signatory | Prof. Alan Turing |

## Processing Pipeline
1. **Parsing**: Stream parsed using `PapaParse` with auto-delimiter detection.
2. **Column Mapping**: Interactive UI maps CSV headers to template tokens.
3. **Validation**: Detects empty names or malformed dates prior to generation.
4. **Batch Generation**: Certificates are rendered asynchronously into memory.
5. **Compression**: Packed into a single `.zip` archive using `JSZip`.
