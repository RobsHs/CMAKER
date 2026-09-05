<div align="center">

# 🎓 CMAKER — Professional Certificate Generator

### _Create. Certify. Verify._

**An enterprise-grade WYSIWYG Digital Certificate Studio, CSV Bulk Batch Generator, Real-Time Public Verification Portal, and 300 DPI Print Export Pipeline.**

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![jsPDF](https://img.shields.io/badge/PDF_Export-300_DPI-E11D48?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](https://github.com/parallax/jsPDF)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](LICENSE)

[Explore Features](#-key-features) • [Quick Start](#-getting-started) • [Templates Library](#-pre-engineered-templates) • [Bulk Engine](#-bulk-generator-engine) • [Verification System](#-public-verification-portal) • [Keyboard Shortcuts](#-canvas-shortcuts)

---

</div>

## 📌 Overview

**CMAKER** is a modern, high-performance web platform engineered for universities, bootcamps, corporate enterprises, event organizers, and online course creators. Built with **React 19**, **TypeScript**, and **Tailwind CSS v4**, it provides an intuitive visual design studio, client-side signature background transparentizer, foil seal generator, high-throughput bulk certificate generation via CSV, and public QR-code verification.

Everything runs entirely in modern browsers with zero backend dependencies required for standalone operation, leveraging `localStorage` and `IndexedDB` for high-speed client-side persistence and cryptographic audit trails.

---

## ✨ Key Features

### 🎨 1. Interactive WYSIWYG Certificate Studio

- **Precision Canvas**: Scalable visual editor supporting standard **A4** (297 × 210 mm) and **US Letter** (11 × 8.5 in) in both Landscape and Portrait orientations.
- **Fluid Zooming & Navigation**: Smooth zoom controls from **25% to 200%**, with instant "Fit to Screen" and "Reset 100%" presets.
- **Rulers & Guidelines**: Dynamic millimeter and pixel canvas rulers, customizable alignment grid, and printable safe margin overlays.
- **Full Geometry Manipulation**: Drag, multi-direction resize handles (8 anchor points), rotation handle, and alignment snapping.
- **Layer Management**: Reorder element z-indices (Bring to Front, Send to Back, Move Up/Down), lock elements, and toggle visibility.
- **History & Clipboard**: Full multi-step Undo/Redo stack (`Ctrl+Z`, `Ctrl+Y`) and element duplicate (`Ctrl+D`).

### ✍️ 2. Digital Signature Suite

- **Interactive Canvas Drawing Pad**: Smooth pen stroke capture with adjustable ink thickness and ink color presets (Navy, Slate, Gold, Burgundy).
- **Client-Side Background Removal**: Automatic luminance-to-alpha white background transparentizer algorithm for uploaded paper signature photos.
- **Multi-Signatory Support**: Configure dual or triple authority signature blocks with institutional titles and credentials.

### 🎖️ 3. Official Vector Foil Seal & Stamp Generator

- **Authentic Embossed Seals**: Real-time scalable SVG rendering with customizable outer rings (_scalloped, gear, smooth, double-ring_).
- **Dual Upright Curved Text**: Circular SVG text paths on both upper and lower arcs formatted upright and readable from left to right.
- **Heraldic Emblems**: Center icons including Academic Crest, Authority Shield, Laurel Wreath, Gold Medal Star, and Ceremonial Ribbon.

### 🔍 4. Dynamic QR Code Engine

- **Live Scannable QR Codes**: Generated in real-time linking directly to the public verification URL (`/verify/{{certificate_id}}`).
- **Configurable Aesthetics**: Custom foreground/background color matching certificate palettes, optional scan instruction labels, and configurable error correction levels (L, M, Q, H).

### ⚡ 5. High-Throughput Bulk Generation (CSV Batch Engine)

- **Drag & Drop CSV Upload**: Instant parsing of participant datasets via `PapaParse`.
- **Intelligent Field Mapping**: Effortlessly map CSV columns to certificate tokens (`{{recipient_name}}`, `{{course_name}}`, `{{issue_date}}`, `{{score}}`, etc.).
- **Row-by-Row Data Validation**: Tabular preview highlighting missing or malformed fields before batch processing.
- **Asynchronous Batch Processing**: Real-time animated progress bar generating hundreds of certificates in seconds.
- **1-Click ZIP Archive Packaging**: Compresses generated certificates into a single `.zip` archive using `JSZip` and `FileSaver`.

### 🖨️ 6. Ultra-High Resolution 300 DPI Export Pipeline

- **Exact Millimeter PDF Scaling**: Direct conversion using `html-to-image` and `jsPDF` mapped to physical millimeter dimensions to guarantee vector-sharp typography and eliminate print margins.
- **Multiple Formats**: Export ready-to-print **Vector PDF**, **High-Res PNG**, and **Crisp JPG**.
- **Exact Print Proof Modal**: In-app true preview before downloading or distributing.

### 🛡️ 7. Public Verification Portal & Admin Governance

- **Cryptographic Credential Verification**: Search by unique Certificate ID or scan physical QR codes.
- **Live Status Badges**: Displays instantaneous verification status:
  - `VALID` (Authentic, verified credential)
  - `REVOKED` (Formally withdrawn by issuer with audit reason)
  - `EXPIRED` (Exceeded credential validity window)
  - `NOT FOUND` (Invalid or forged certificate identifier)
- **Admin Control Center**: Issuer governance interface to revoke certificates, record revocation causes, restore validity, inspect scan telemetry, and review security audit trails.

### 🌐 8. Bilingual Internationalization & Dark Mode

- **Dual Language**: Seamless instant toggle between **English (EN)** and **Bahasa Indonesia (ID)** across all views.
- **Authentic Paper Preservation**: SaaS interface supports Dark & Light mode while the certificate canvas strictly preserves true archival paper coloration.

---

## 🏛️ Pre-Engineered Templates

Every template is meticulously crafted with ~20–25 architectural vector elements (no empty/bare spaces) across academic, corporate, event, and specialized professional disciplines:

| Template | Category | Key Highlights |
| :--- | :---: | :--- |
| **Classic Academic Excellence** | Academic | Double gold ornamental frame, corner filigrees, university crest, ISO badge, Latin motto, dual faculty signatories, gold foil seal, QR |
| **Modern Corporate Achievement** | Corporate | Navy & cobalt geometric side accents, company header, VP & CEO signatories, verified shield seal, competencies checklist |
| **Minimalist Luxury Monochrome** | Creative | Ultra-clean dual hairline frame, haute-couture typography, Great Vibes script accents, Paris atelier star seal |
| **Tech & Coding Bootcamp** | Creative | Cyber bracket border, terminal prompt header, cryptographic SHA-256 block hash, CTO signature, cyber shield seal |
| **Executive Leadership Award** | Corporate | Antique bronze luxury border, governance council crest, Board Chair & CEO signatures, bronze laurel seal |
| **Medical & Healthcare** | Academic | Clinical teal border, medical accreditation badge, Chief Medical Officer & Medical Board signatures, caduceus crest seal |
| **Global Seminar & Conference** | Event | Deep royal purple and gold festive frames, keynote speaker signatures, conference star seal |
| **University Honors Diploma** | Academic | Traditional university diploma styling, Latin conferral phrasing, Provost & President signatures, embossed seal |
| **Employee Recognition** | Corporate | Star performer distinction, ribbon badge, department head & HR director signatures, excellence seal |
| **Athletic Championship** | Event | High-energy sports tournament styling, athletic director signatures, gold victory champion seal |
| **Volunteer Appreciation** | Event | Emerald community dedication borders, civic service badges, council president signatures, humanitarian seal |
| **Creative Design Masterclass** | Creative | Contemporary typographic layout, jury president & guild signatures, creative curated seal |
| **Artificial Intelligence & Neural Systems** | Creative | Dark cyber cyan tech theme, neural network badge, model weights verification, research director signature |
| **Haute Cuisine & Culinary Arts** | Creative | Burgundy & warm amber luxury frame, Michelin-style distinction star, Master Chef & Sommelier credentials, culinary guild seal |
| **Conservatory of Music & Performing Arts** | Creative | Deep mahogany orchestral borders, gold musical treble clef crest, Dean & Maestro signatures, philharmonic seal |
| **Commercial Aviation & Flight Rating** | Corporate | Navy and gold aeronautical wings emblem, FAA/EASA flight rating badge, Chief Flight Instructor signature, aero seal |
| **Early Childhood & Kindergarten Diploma** | Academic | Vibrant sky-blue & sunny gold border, star badges, elementary principal signature, first milestone honors seal |
| **Juris Doctor & Legal Bar Certification** | Academic | Prestigious navy and brass borders, Scales of Justice insignia, Chief Justice & Bar President signatures, legal notary seal |
| **Occupational Health & Safety (HSE)** | Corporate | High-visibility warning gold and charcoal borders, safety shield emblem, OSHA/ISO compliance checklist, HSE Director signature |
| **Luxury Real Estate & Platinum Broker** | Corporate | Onyx black and champagne gold luxury borders, architectural estate crest, Managing Director signature, platinum seal |
| **International Language Mastery (CEFR C2)** | Academic | Global university crest, CEFR C2 multilingual fluency banner, Academic Dean & Council signatures, international seal |
| **Blockchain & Smart Contract Auditor** | Creative | Dark emerald Web3 terminal motif, smart contract cryptographic address, Lead Security Auditor signature, zero-knowledge audit seal |
| **Holistic Yoga & Wellness Alliance** | Creative | Serene sage green & botanical laurel motifs, RYT accreditation badge, Master Instructor signature, holistic wellness seal |
| **Corporate ESG & Sustainability Leader** | Corporate | Forest emerald & leaf motifs, ESG net-zero governance checklist, Chief Sustainability Officer signature, green seal |

---

## 🚀 Tech Stack

| Technology            | Role & Purpose                                                           |
| :-------------------- | :----------------------------------------------------------------------- |
| **React 19**          | Modern UI engine utilizing functional components, hooks, and transitions |
| **TypeScript**        | Strict type safety with distributive union element models                |
| **Vite 8**            | Next-generation ultra-fast frontend build tooling and HMR                |
| **Tailwind CSS v4**   | Modern utility-first CSS design with `@tailwindcss/vite` engine          |
| **Lucide React**      | Consistent, lightweight vector icons                                     |
| **jsPDF**             | Precise client-side PDF document generation mapped to physical mm        |
| **html-to-image**     | High-DPI rasterization pipeline for crisp 300 DPI exports                |
| **QRCode**            | Dynamic QR matrix generation with customizable error correction          |
| **PapaParse**         | High-performance CSV parser for bulk datasets                            |
| **JSZip & FileSaver** | In-memory ZIP compilation and automated client download streaming        |
| **Canvas Confetti**   | Celebration visual feedback upon successful exports                      |

---

## 📂 Project Structure

```text
cmaker/
├── public/                     # Static assets and favicon
├── src/
│   ├── components/
│   │   ├── admin/              # Credential registry, revocation & audit logs
│   │   ├── bulk/               # CSV upload, mapping, batch generator & ZIP packaging
│   │   ├── certificate/        # Public certificate inspection view
│   │   ├── common/             # Navbar, Footer, Toast notification system
│   │   ├── dashboard/          # Metrics, recent projects, quick action launcher
│   │   ├── editor/             # Studio Canvas, Rulers, Resize Handles, Properties Panel
│   │   │   ├── sidebar/        # 10 drawer tabs (Templates, Text, Seals, Signatures, etc.)
│   │   │   ├── CanvasElementRenderer.tsx  # Vector element renderer
│   │   │   ├── CertificateCanvas.tsx      # Zoomable interactive studio canvas
│   │   │   ├── EditorTopBar.tsx           # History, zoom, preview, export actions
│   │   │   └── SignatureModal.tsx         # Drawing pad & background remover
│   │   ├── landing/            # SaaS landing page with live studio mockup
│   │   ├── settings/           # Global typography, PDF DPI, branding & language configs
│   │   ├── templates/          # Template Gallery & live miniature preview components
│   │   └── verify/             # Public QR & ID lookup verification portal
│   ├── constants/
│   │   ├── colors.ts           # Curated color palettes & preset gradients
│   │   ├── fonts.ts            # Serif, Sans, Script, and Mono web font definitions
│   │   ├── sampleData.ts       # SVG vector assets, initial state & sample certificates
│   │   └── sizes.ts            # A4 & US Letter dimensions in mm and 96/300 DPI
│   ├── context/
│   │   ├── AppContext.tsx      # Routing, roles (User/Admin), i18n, dark/light theme
│   │   └── EditorContext.tsx   # Canvas state, selection, undo/redo stack, clipboard
│   ├── i18n/
│   │   └── translations.ts     # Complete English & Indonesian dictionary
│   ├── templates/
│   │   └── templatesData.ts    # 12 pre-engineered, highly detailed master templates
│   ├── types/
│   │   └── certificate.ts      # TypeScript interfaces, discriminated unions, element types
│   ├── utils/
│   │   ├── certificateNumber.ts # Unique ID generator (CERT-YYYY-XXXXXX)
│   │   ├── exportImage.ts      # High-res PNG / JPG export utility
│   │   ├── exportPdf.ts        # 300 DPI vector jsPDF export pipeline
│   │   ├── imageProcessing.ts  # Client-side luminance-to-alpha background remover
│   │   ├── qrGenerator.ts      # Dynamic QR Code generator
│   │   ├── storage.ts          # LocalStorage & IndexedDB abstraction with audit logging
│   │   └── variableParser.ts   # Dynamic variable interpolation engine ({{key}})
│   ├── App.tsx                 # Central route coordinator
│   ├── index.css               # Tailwind CSS v4 directives & font imports
│   └── main.tsx                # React application entry point
├── package.json                # Dependencies and build scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration with Tailwind CSS plugin
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: Version `18.x`, `20.x`, or higher
- **npm** (or `pnpm` / `yarn` / `bun`)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cmaker.git
cd cmaker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production

```bash
npm run build
```

The optimized production bundle will be generated in the `dist/` directory.

### 5. Preview Production Build

```bash
npm run preview
```

---

## 📑 Bulk Generator Engine

To bulk generate certificates:

1. Navigate to **Bulk Generator** (`/bulk`).
2. Download the provided **Sample CSV Template** or upload your own `.csv` file.
3. Map the CSV columns to the design tokens:

| Token Variable        | Description                   | Example CSV Value             |
| :-------------------- | :---------------------------- | :---------------------------- |
| `{{recipient_name}}`  | Full name of recipient        | Jane Doe, M.Sc.               |
| `{{course_name}}`     | Topic, course, or achievement | Full-Stack Cloud Architecture |
| `{{issue_date}}`      | Formal conferral date         | September 5, 2026             |
| `{{certificate_id}}`  | Unique certificate identifier | CERT-2026-000842              |
| `{{score}}`           | Performance grade / score     | 98.5% (Distinction)           |
| `{{instructor_name}}` | Lead authority / Signer       | Dr. Helena Vance              |

4. Click **Generate Batch** and observe the real-time progress bar.
5. Click **Download ZIP Archive** to download all high-resolution certificates packaged together.

---

## ⌨️ Canvas Shortcuts

| Shortcut                | Action                         |
| :---------------------- | :----------------------------- |
| `Ctrl + Z` / `Cmd + Z`  | Undo last canvas action        |
| `Ctrl + Y` / `Cmd + Y`  | Redo action                    |
| `Delete` / `Backspace`  | Delete selected element        |
| `Ctrl + D` / `Cmd + D`  | Duplicate selected element     |
| `Ctrl + C` / `Ctrl + V` | Copy & Paste element           |
| `Arrow Keys`            | Nudge selected element by 1px  |
| `Shift + Arrow Keys`    | Nudge selected element by 10px |
| `Ctrl + +` / `Ctrl + -` | Zoom In / Zoom Out             |
| `Ctrl + 0`              | Reset Zoom to 100%             |
| `Escape`                | Deselect all elements          |

---

## 🔒 Verification & Security

CMAKER embeds a tamper-evident verification standard:

1. Every certificate carries a unique deterministic or sequential ID (`CERT-YYYY-XXXXXX`).
2. The dynamic QR Code encodes the direct URL:
   ```text
   https://yourdomain.com/#/verify/CERT-2026-000001
   ```
3. Employers or third parties scanning the QR code or searching the ID on the **Verify Portal** can immediately confirm:
   - Recipient Name & Specialization
   - Original Issue Date & Expiry Status
   - Cryptographic Audit Digest
   - Official Revocation Status & Recorded Reason

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/your-username/cmaker/issues).

1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ for educators, organizers, and creators worldwide.</sub>
</div>
