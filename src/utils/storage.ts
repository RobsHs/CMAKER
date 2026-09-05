import { AppSettings, AuditLog, CertificateDesign, CertificateProject, CertificateTemplate, IssuedCertificate } from '../types/certificate';
import { DEFAULT_CERTIFICATE_DESIGN, INITIAL_ISSUED_CERTIFICATES } from '../constants/sampleData';

const STORAGE_KEYS = {
  PROJECTS: 'certifypro_projects_v1',
  ISSUED_CERTS: 'certifypro_issued_certificates_v1',
  SETTINGS: 'certifypro_settings_v1',
  AUDIT_LOGS: 'certifypro_audit_logs_v1',
  CUSTOM_TEMPLATES: 'certifypro_custom_templates_v1'
};

export const DEFAULT_APP_SETTINGS: AppSettings = {
  appName: 'CertifyPro',
  organizationName: 'CertifyPro Global Academy',
  organizationLogo: '',
  defaultPaperSize: 'a4-landscape',
  defaultDateFormat: 'Long Date',
  pdfQuality: 'high',
  idFormatPrefix: 'CERT',
  idFormatPattern: 'CERT-{YEAR}-{NUMBER}',
  verificationBaseUrl: 'https://certifypro.app/verify',
  language: 'en',
  theme: 'light'
};

// Seed initial project if empty
function initializeStorage(): void {
  if (typeof window === 'undefined') return;

  // Initialize issued certificates
  if (!localStorage.getItem(STORAGE_KEYS.ISSUED_CERTS)) {
    localStorage.setItem(STORAGE_KEYS.ISSUED_CERTS, JSON.stringify(INITIAL_ISSUED_CERTIFICATES));
  }

  // Initialize projects
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    const initialProject: CertificateProject = {
      id: 'default-project-1',
      name: 'Alex Johnson - Certificate of Excellence',
      templateId: 'academic-gold',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'published',
      design: DEFAULT_CERTIFICATE_DESIGN
    };
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify([initialProject]));
  }

  // Initialize settings
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_APP_SETTINGS));
  }

  // Initialize audit logs
  if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
    const initialLog: AuditLog = {
      id: 'log-1',
      timestamp: new Date().toISOString(),
      action: 'issue',
      certificateId: 'CERT-2026-000001',
      details: 'Initial system credential issued for Alex Johnson',
      performedBy: 'System Administrator'
    };
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify([initialLog]));
  }
}

// Run init
initializeStorage();

export const StorageService = {
  getProjects(): CertificateProject[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveProject(project: CertificateProject): void {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index >= 0) {
      projects[index] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      projects.unshift({ ...project, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  deleteProject(id: string): void {
    const projects = this.getProjects().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  duplicateProject(id: string): CertificateProject | null {
    const projects = this.getProjects();
    const original = projects.find(p => p.id === id);
    if (!original) return null;

    const copy: CertificateProject = {
      ...original,
      id: `proj-${Date.now()}`,
      name: `${original.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      design: {
        ...original.design,
        id: `design-${Date.now()}`
      }
    };
    projects.unshift(copy);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return copy;
  },

  getIssuedCertificates(): IssuedCertificate[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ISSUED_CERTS);
      return data ? JSON.parse(data) : INITIAL_ISSUED_CERTIFICATES;
    } catch {
      return INITIAL_ISSUED_CERTIFICATES;
    }
  },

  saveIssuedCertificate(cert: IssuedCertificate): void {
    const certs = this.getIssuedCertificates();
    const index = certs.findIndex(c => c.id === cert.id);
    if (index >= 0) {
      certs[index] = cert;
    } else {
      certs.unshift(cert);
    }
    localStorage.setItem(STORAGE_KEYS.ISSUED_CERTS, JSON.stringify(certs));
    this.addAuditLog('issue', `Certificate ${cert.id} issued to ${cert.recipientName}`, cert.id);
  },

  revokeCertificate(id: string, reason: string): boolean {
    const certs = this.getIssuedCertificates();
    const target = certs.find(c => c.id === id);
    if (!target) return false;

    target.status = 'revoked';
    target.revocationReason = reason;
    target.revokedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.ISSUED_CERTS, JSON.stringify(certs));
    this.addAuditLog('revoke', `Certificate ${id} revoked: ${reason}`, id);
    return true;
  },

  restoreCertificate(id: string): boolean {
    const certs = this.getIssuedCertificates();
    const target = certs.find(c => c.id === id);
    if (!target) return false;

    target.status = 'valid';
    target.revocationReason = undefined;
    target.revokedAt = undefined;
    localStorage.setItem(STORAGE_KEYS.ISSUED_CERTS, JSON.stringify(certs));
    this.addAuditLog('issue', `Certificate ${id} validity restored`, id);
    return true;
  },

  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_APP_SETTINGS, ...JSON.parse(data) } : DEFAULT_APP_SETTINGS;
    } catch {
      return DEFAULT_APP_SETTINGS;
    }
  },

  saveSettings(settings: AppSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  getAuditLogs(): AuditLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addAuditLog(action: AuditLog['action'], details: string, certificateId?: string): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      action,
      certificateId,
      details,
      performedBy: 'Authorized Operator'
    };
    logs.unshift(newLog);
    if (logs.length > 200) logs.pop(); // Keep manageable
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
  },

  getCustomTemplates(): CertificateTemplate[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_TEMPLATES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveCustomTemplate(template: CertificateTemplate): void {
    const templates = this.getCustomTemplates();
    templates.unshift(template);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_TEMPLATES, JSON.stringify(templates));
  },

  exportDesignAsJson(design: CertificateDesign): void {
    const blob = new Blob([JSON.stringify(design, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${design.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-project.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  async importDesignFromJson(file: File): Promise<CertificateDesign> {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (!parsed.elements || !Array.isArray(parsed.elements)) {
      throw new Error('Invalid project structure: missing elements array.');
    }
    return parsed as CertificateDesign;
  }
};
