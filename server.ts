import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'inquiries.json');
const BRANDING_FILE = path.join(DATA_DIR, 'branding.json');
const EMAIL_SETTINGS_FILE = path.join(DATA_DIR, 'email_settings.json');
const DEFAULT_FAVICON_SVG = path.join(process.cwd(), 'public', 'favicon.svg');
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'shoaibop65@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'shoaib2026';

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure db file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
}

interface BrandingSettings {
  faviconDataUrl?: string;
  driveUrl?: string;
  resolvedDriveUrl?: string;
  fileName?: string;
  showInNavbar?: boolean;
  updatedAt?: string;
}

export interface EmailSettings {
  provider: 'gmail' | 'smtp' | 'web3forms';
  recipientEmail: string;
  smtpHost: string;
  smtpPort: number;
  smtpSecure?: boolean;
  smtpUser: string;
  smtpPass: string;
  web3formsKey?: string;
  updatedAt?: string;
}

function getEmailSettings(): EmailSettings {
  try {
    if (fs.existsSync(EMAIL_SETTINGS_FILE)) {
      const raw = fs.readFileSync(EMAIL_SETTINGS_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading email settings:', err);
  }
  return {
    provider: 'gmail',
    recipientEmail: process.env.NOTIFICATION_EMAIL || 'shoaibop65@gmail.com',
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtpPort: parseInt(process.env.SMTP_PORT || '465', 10),
    smtpSecure: true,
    smtpUser: process.env.SMTP_USER || 'shoaibop65@gmail.com',
    smtpPass: process.env.SMTP_PASS || '',
    web3formsKey: process.env.WEB3FORMS_KEY || '',
  };
}

function saveEmailSettings(settings: EmailSettings): void {
  try {
    fs.writeFileSync(EMAIL_SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving email settings:', err);
  }
}

function getBranding(): BrandingSettings {
  try {
    if (fs.existsSync(BRANDING_FILE)) {
      const raw = fs.readFileSync(BRANDING_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading branding settings:', err);
  }
  return { showInNavbar: true };
}

function saveBranding(settings: BrandingSettings): void {
  try {
    fs.writeFileSync(BRANDING_FILE, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving branding settings:', err);
  }
}

function extractGoogleDriveDirectUrl(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  // Match /file/d/{ID} or id={ID}
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
  }
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${idParamMatch[1]}`;
  }
  return null;
}

function getInquiries(): any[] {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading inquiries database:', err);
    return [];
  }
}

function saveInquiries(inquiries: any[]): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing inquiries database:', err);
  }
}

async function sendEmailNotification(inquiry: any) {
  const settings = getEmailSettings();
  const recipient = settings.recipientEmail || NOTIFICATION_EMAIL;

  const dateStr = new Date(inquiry.submissionDate).toLocaleString('en-US', {
    timeZone: 'Asia/Karachi',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const filesListHtml = inquiry.files && inquiry.files.length > 0
    ? inquiry.files.map((f: any) => `<li><strong>${f.name}</strong> (${(f.size / 1024).toFixed(1)} KB - ${f.type})</li>`).join('')
    : '<li>None attached</li>';

  const filesListText = inquiry.files && inquiry.files.length > 0
    ? inquiry.files.map((f: any) => `- ${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join('\n')
    : 'None attached';

  const subject = `New Project Inquiry: ${inquiry.fullName} (${inquiry.serviceNeeded || 'General Inquiry'})`;

  const textBody = `
========================================
NEW PROJECT INQUIRY FOR SHOAIB
========================================
Submission Date: ${dateStr} (PKT)
Inquiry ID: ${inquiry.id}

--- CLIENT INFORMATION ---
Full Name: ${inquiry.fullName}
Company / Business: ${inquiry.companyName || 'N/A'}
Email: ${inquiry.email}
Phone / WhatsApp: ${inquiry.phone || 'N/A'}
Country: ${inquiry.country || 'N/A'}
Preferred Contact: ${inquiry.preferredContact || 'Email'}

--- PROJECT DETAILS ---
Service Required: ${inquiry.serviceNeeded} ${inquiry.otherService ? `(${inquiry.otherService})` : ''}
Estimated Budget: ${inquiry.budget || 'Not specified'} ${inquiry.customBudget ? `[Custom: ${inquiry.customBudget}]` : ''}
Timeline: ${inquiry.timeline || 'Flexible'}
Target Completion Date: ${inquiry.targetDate || 'N/A'}

Project Description:
${inquiry.projectDescription || 'No description provided.'}

Main Goals:
${Array.isArray(inquiry.goals) && inquiry.goals.length ? inquiry.goals.join(', ') : 'None specified'}

--- SOCIAL MEDIA DETAILS ---
Instagram: ${inquiry.socialMedia?.instagram || 'N/A'}
Facebook: ${inquiry.socialMedia?.facebook || 'N/A'}
TikTok: ${inquiry.socialMedia?.tiktok || 'N/A'}
LinkedIn: ${inquiry.socialMedia?.linkedin || 'N/A'}
YouTube: ${inquiry.socialMedia?.youtube || 'N/A'}
Other Links: ${inquiry.socialMedia?.otherLink || 'N/A'}
Current Social Presence:
${inquiry.socialMedia?.presenceDescription || 'N/A'}

--- WEBSITE DETAILS ---
Currently Has Website: ${inquiry.website?.hasWebsite ? 'Yes' : 'No'}
${inquiry.website?.hasWebsite ? `Current URL: ${inquiry.website?.currentUrl || 'N/A'}
Improvements Desired: ${Array.isArray(inquiry.website?.improvements) ? inquiry.website.improvements.join(', ') : 'N/A'}` : `Looking For: ${inquiry.website?.lookingForType || 'N/A'}`}

--- ADDITIONAL INFORMATION ---
${inquiry.additionalInfo || 'None'}

--- ATTACHED FILES ---
${filesListText}

Reply directly to client: mailto:${inquiry.email}
`;

  const htmlBody = `
  <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #1a1a1a; background-color: #faf8f3; padding: 24px; border: 1px solid #e2ddd3;">
    <div style="border-bottom: 2px solid #a06634; padding-bottom: 12px; margin-bottom: 20px;">
      <h1 style="color: #1a1a1a; margin: 0 0 6px 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">New Project Inquiry</h1>
      <p style="margin: 0; color: #a06634; font-size: 13px; font-weight: bold;">Submitted: ${dateStr}</p>
    </div>

    <div style="margin-bottom: 20px; padding: 16px; background: #ffffff; border: 1px solid #ece7de;">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #a06634; margin-top: 0;">1. Client Information</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 4px 0; width: 160px; font-weight: bold;">Name:</td><td>${inquiry.fullName}</td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Company:</td><td>${inquiry.companyName || '—'}</td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Email:</td><td><a href="mailto:${inquiry.email}" style="color: #a06634; font-weight: bold;">${inquiry.email}</a></td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Phone / WhatsApp:</td><td><a href="https://wa.me/${(inquiry.phone || '').replace(/[^0-9]/g, '')}" style="color: #1a1a1a;">${inquiry.phone || '—'}</a></td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Country:</td><td>${inquiry.country || '—'}</td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Preferred Contact:</td><td>${inquiry.preferredContact || 'Email'}</td></tr>
      </table>
    </div>

    <div style="margin-bottom: 20px; padding: 16px; background: #ffffff; border: 1px solid #ece7de;">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #a06634; margin-top: 0;">2. Project & Service Required</h2>
      <p style="font-size: 14px; margin: 4px 0;"><strong>Service:</strong> <span style="background: #f4efe6; padding: 2px 8px; font-weight: bold;">${inquiry.serviceNeeded}</span> ${inquiry.otherService ? `(${inquiry.otherService})` : ''}</p>
      <p style="font-size: 14px; margin: 4px 0;"><strong>Estimated Budget:</strong> <span style="color: #2e7d32; font-weight: bold;">${inquiry.budget || 'Not specified'}</span> ${inquiry.customBudget ? `[Custom: ${inquiry.customBudget}]` : ''}</p>
      <p style="font-size: 14px; margin: 4px 0;"><strong>Timeline:</strong> ${inquiry.timeline || 'Flexible'} | <strong>Target Date:</strong> ${inquiry.targetDate || 'N/A'}</p>
      
      <p style="font-size: 14px; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">Project Description:</p>
      <div style="padding: 12px; background: #faf8f3; border-left: 3px solid #a06634; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${inquiry.projectDescription || 'No description provided.'}</div>

      <p style="font-size: 14px; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">Main Goals:</p>
      <p style="font-size: 13px; color: #444; margin: 0;">${Array.isArray(inquiry.goals) && inquiry.goals.length ? inquiry.goals.join(' • ') : 'None specified'}</p>
    </div>

    <div style="margin-bottom: 20px; padding: 16px; background: #ffffff; border: 1px solid #ece7de;">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #a06634; margin-top: 0;">3. Social Media Information</h2>
      <p style="font-size: 13px; margin: 4px 0;"><strong>Instagram:</strong> ${inquiry.socialMedia?.instagram || '—'}</p>
      <p style="font-size: 13px; margin: 4px 0;"><strong>Facebook:</strong> ${inquiry.socialMedia?.facebook || '—'}</p>
      <p style="font-size: 13px; margin: 4px 0;"><strong>TikTok:</strong> ${inquiry.socialMedia?.tiktok || '—'}</p>
      <p style="font-size: 13px; margin: 4px 0;"><strong>LinkedIn:</strong> ${inquiry.socialMedia?.linkedin || '—'}</p>
      <p style="font-size: 13px; margin: 4px 0;"><strong>YouTube:</strong> ${inquiry.socialMedia?.youtube || '—'}</p>
      <p style="font-size: 13px; margin: 4px 0;"><strong>Other Links:</strong> ${inquiry.socialMedia?.otherLink || '—'}</p>
      <p style="font-size: 13px; font-weight: bold; margin-top: 10px; margin-bottom: 4px;">Current Presence:</p>
      <p style="font-size: 13px; color: #555; margin: 0;">${inquiry.socialMedia?.presenceDescription || '—'}</p>
    </div>

    <div style="margin-bottom: 20px; padding: 16px; background: #ffffff; border: 1px solid #ece7de;">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #a06634; margin-top: 0;">4. Website Information</h2>
      <p style="font-size: 13px; margin: 4px 0;"><strong>Has Website:</strong> ${inquiry.website?.hasWebsite ? 'Yes' : 'No'}</p>
      ${inquiry.website?.hasWebsite ? `
        <p style="font-size: 13px; margin: 4px 0;"><strong>Current URL:</strong> <a href="${inquiry.website?.currentUrl}" target="_blank">${inquiry.website?.currentUrl}</a></p>
        <p style="font-size: 13px; margin: 4px 0;"><strong>Improvements Desired:</strong> ${Array.isArray(inquiry.website?.improvements) ? inquiry.website.improvements.join(', ') : '—'}</p>
      ` : `
        <p style="font-size: 13px; margin: 4px 0;"><strong>Looking For:</strong> ${inquiry.website?.lookingForType || '—'}</p>
      `}
    </div>

    ${inquiry.additionalInfo ? `
      <div style="margin-bottom: 20px; padding: 16px; background: #ffffff; border: 1px solid #ece7de;">
        <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #a06634; margin-top: 0;">5. Additional Notes & References</h2>
        <div style="font-size: 14px; white-space: pre-wrap; line-height: 1.5; color: #333;">${inquiry.additionalInfo}</div>
      </div>
    ` : ''}

    <div style="margin-bottom: 24px; padding: 16px; background: #ffffff; border: 1px solid #ece7de;">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #a06634; margin-top: 0;">6. Uploaded References / Files</h2>
      <ul style="font-size: 13px; color: #444; margin: 0; padding-left: 20px;">
        ${filesListHtml}
      </ul>
    </div>

    <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2ddd3;">
      <a href="mailto:${inquiry.email}?subject=Re: Your Project Inquiry - Muhammad Shoaib" style="display: inline-block; background-color: #a06634; color: #ffffff; text-decoration: none; padding: 12px 24px; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
        Reply to Client (${inquiry.email}) &rarr;
      </a>
    </div>
  </div>
  `;

  // Check if SMTP or Gmail password configured
  if (settings.smtpPass) {
    try {
      const isGmail = (settings.smtpHost || '').toLowerCase().includes('gmail');
      const transporter = nodemailer.createTransport(
        isGmail
          ? {
              service: 'gmail',
              auth: {
                user: settings.smtpUser || recipient,
                pass: settings.smtpPass,
              },
            }
          : {
              host: settings.smtpHost,
              port: settings.smtpPort || 587,
              secure: settings.smtpPort === 465,
              auth: {
                user: settings.smtpUser,
                pass: settings.smtpPass,
              },
            }
      );

      await transporter.sendMail({
        from: `"Shoaib Portfolio" <${settings.smtpUser || recipient}>`,
        to: recipient,
        replyTo: inquiry.email,
        subject: subject,
        text: textBody,
        html: htmlBody,
      });
      console.log(`[Email] Notification email successfully sent to ${recipient}`);
      return { sent: true, recipient };
    } catch (emailErr: any) {
      console.error('[Email] Failed to send email via SMTP transport:', emailErr);
      return { sent: false, error: String(emailErr.message || emailErr), recipient };
    }
  } else {
    console.log('--------------------------------------------------');
    console.log(`[Email Notification Log] To: ${recipient}`);
    console.log(`Subject: ${subject}`);
    console.log(textBody);
    console.log('--------------------------------------------------');
    console.log('[Email] (SMTP not configured in environment or settings; inquiry recorded in inquiries.json database and log.)');
    return {
      sent: false,
      reason: 'SMTP password not configured. Saved in database.',
      recipient,
    };
  }
}

async function startServer() {
  const app = express();

  // Middleware
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // API Routes
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Serve dynamic favicon (supports uploaded Logo.png, Google Drive file link, or default monogram SVG)
  const serveFavicon = (req: Request, res: Response): void => {
    const branding = getBranding();

    if (branding.faviconDataUrl && branding.faviconDataUrl.startsWith('data:')) {
      const matches = branding.faviconDataUrl.match(/^data:([^;]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Cache-Control', 'no-cache');
        res.send(buffer);
        return;
      }
    }

    if (branding.resolvedDriveUrl) {
      res.redirect(branding.resolvedDriveUrl);
      return;
    }

    if (fs.existsSync(DEFAULT_FAVICON_SVG)) {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(DEFAULT_FAVICON_SVG);
      return;
    }

    res.status(404).end();
  };

  app.get('/api/favicon', serveFavicon);
  app.get('/favicon.ico', serveFavicon);

  // Public Branding Info
  app.get('/api/branding', (req: Request, res: Response): void => {
    const branding = getBranding();
    const hasCustom = Boolean(branding.faviconDataUrl || branding.resolvedDriveUrl);
    res.json({
      success: true,
      hasCustomFavicon: hasCustom,
      faviconUrl: hasCustom ? `/api/favicon?v=${encodeURIComponent(branding.updatedAt || '1')}` : '/favicon.svg',
      driveUrl: branding.driveUrl || '',
      fileName: branding.fileName || (hasCustom ? 'Logo.png' : 'favicon.svg'),
      showInNavbar: branding.showInNavbar !== false,
      updatedAt: branding.updatedAt || null,
    });
  });

  // Submit inquiry
  app.post('/api/inquiries', async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        fullName,
        companyName,
        email,
        phone,
        country,
        preferredContact,
        serviceNeeded,
        otherService,
        projectDescription,
        goals,
        budget,
        customBudget,
        socialMedia,
        website,
        files,
        timeline,
        targetDate,
        additionalInfo,
      } = req.body;

      if (!fullName || !email || !serviceNeeded || !projectDescription) {
        res.status(400).json({
          success: false,
          error: 'Please fill in all required fields (Full Name, Email, Service, and Project Description).',
        });
        return;
      }

      const newInquiry = {
        id: `INQ-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        submissionDate: new Date().toISOString(),
        status: 'New', // New, Contacted, In Discussion, Approved, Completed
        fullName: String(fullName).trim(),
        companyName: companyName ? String(companyName).trim() : '',
        email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : '',
        country: country ? String(country).trim() : '',
        preferredContact: preferredContact || 'Email',
        serviceNeeded: String(serviceNeeded),
        otherService: otherService ? String(otherService).trim() : '',
        projectDescription: String(projectDescription).trim(),
        goals: Array.isArray(goals) ? goals : [],
        budget: budget || 'Not specified',
        customBudget: customBudget ? String(customBudget).trim() : '',
        socialMedia: socialMedia || {},
        website: website || {},
        files: Array.isArray(files) ? files : [],
        timeline: timeline || 'Flexible',
        targetDate: targetDate || '',
        additionalInfo: additionalInfo ? String(additionalInfo).trim() : '',
        notes: '',
      };

      const inquiries = getInquiries();
      inquiries.unshift(newInquiry);
      saveInquiries(inquiries);

      // Trigger email notification asynchronously
      let emailResult = { sent: false };
      try {
        emailResult = await sendEmailNotification(newInquiry);
      } catch (e) {
        console.error('Email dispatch error:', e);
      }

      const emailSettings = getEmailSettings();
      const targetEmail = emailSettings.recipientEmail || NOTIFICATION_EMAIL;
      const mailtoSubject = encodeURIComponent(`Project Inquiry: ${newInquiry.fullName} - ${newInquiry.serviceNeeded}`);
      const mailtoBody = encodeURIComponent(`Hi Shoaib,

Here are my project details submitted through your portfolio:

Name: ${newInquiry.fullName}
Email: ${newInquiry.email}
Phone / WhatsApp: ${newInquiry.phone || 'N/A'}
Country: ${newInquiry.country || 'N/A'}
Service Needed: ${newInquiry.serviceNeeded} ${newInquiry.otherService ? `(${newInquiry.otherService})` : ''}
Estimated Budget: ${newInquiry.budget} ${newInquiry.customBudget ? `[Custom: ${newInquiry.customBudget}]` : ''}
Timeline: ${newInquiry.timeline}

Project Description:
${newInquiry.projectDescription}

${newInquiry.additionalInfo ? `Additional Notes:\n${newInquiry.additionalInfo}\n` : ''}
Reference ID: ${newInquiry.id}`);
      const directMailtoUrl = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

      const whatsappText = encodeURIComponent(`Hi Shoaib, I just submitted my project inquiry on your portfolio!\n\nName: ${newInquiry.fullName}\nService: ${newInquiry.serviceNeeded}\nBudget: ${newInquiry.budget}\nReference ID: ${newInquiry.id}`);
      const whatsappUrl = `https://wa.me/923300258247?text=${whatsappText}`;

      res.status(201).json({
        success: true,
        message: 'Your project inquiry has been saved successfully.',
        inquiryId: newInquiry.id,
        emailStatus: emailResult,
        directMailtoUrl,
        whatsappUrl,
        recipientEmail: targetEmail,
      });
    } catch (err: any) {
      console.error('Error handling inquiry submission:', err);
      res.status(500).json({
        success: false,
        error: 'An internal error occurred while processing your request. Please try again.',
      });
    }
  });

  // Admin middleware check
  const checkAdminAuth = (req: Request, res: Response, next: () => void) => {
    const authHeader = req.headers['x-admin-password'] || req.query.adminPassword;
    if (authHeader === ADMIN_PASSWORD) {
      next();
    } else {
      res.status(401).json({ success: false, error: 'Unauthorized. Invalid admin credentials.' });
    }
  };

  // Admin verify credentials
  app.post('/api/admin/login', (req: Request, res: Response): void => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ success: true, message: 'Authenticated' });
    } else {
      res.status(401).json({ success: false, error: 'Invalid admin password' });
    }
  });

  // Admin: Get all inquiries
  app.get('/api/inquiries', checkAdminAuth, (req: Request, res: Response): void => {
    const inquiries = getInquiries();
    res.json({ success: true, count: inquiries.length, inquiries });
  });

  // Admin: Update inquiry status or notes
  app.patch('/api/inquiries/:id', checkAdminAuth, (req: Request, res: Response): void => {
    const { id } = req.params;
    const { status, notes } = req.body;
    const inquiries = getInquiries();
    const index = inquiries.findIndex((i: any) => i.id === id);

    if (index === -1) {
      res.status(404).json({ success: false, error: 'Inquiry not found' });
      return;
    }

    if (status) inquiries[index].status = status;
    if (notes !== undefined) inquiries[index].notes = notes;
    inquiries[index].updatedAt = new Date().toISOString();

    saveInquiries(inquiries);
    res.json({ success: true, inquiry: inquiries[index] });
  });

  // Admin: Delete inquiry
  app.delete('/api/inquiries/:id', checkAdminAuth, (req: Request, res: Response): void => {
    const { id } = req.params;
    let inquiries = getInquiries();
    const initialLength = inquiries.length;
    inquiries = inquiries.filter((i: any) => i.id !== id);

    if (inquiries.length === initialLength) {
      res.status(404).json({ success: false, error: 'Inquiry not found' });
      return;
    }

    saveInquiries(inquiries);
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  });

  // Admin: Update Favicon / Branding (upload Logo.png or set Google Drive direct link)
  app.post('/api/branding', checkAdminAuth, (req: Request, res: Response): void => {
    const { faviconDataUrl, driveUrl, fileName, showInNavbar } = req.body;
    const current = getBranding();

    let resolvedDriveUrl = current.resolvedDriveUrl;
    if (driveUrl !== undefined) {
      if (!driveUrl.trim()) {
        resolvedDriveUrl = undefined;
      } else {
        const extracted = extractGoogleDriveDirectUrl(driveUrl);
        if (extracted) {
          resolvedDriveUrl = extracted;
        } else if (driveUrl.startsWith('http://') || driveUrl.startsWith('https://')) {
          resolvedDriveUrl = driveUrl.trim();
        }
      }
    }

    const updated: BrandingSettings = {
      faviconDataUrl: faviconDataUrl !== undefined ? faviconDataUrl : current.faviconDataUrl,
      driveUrl: driveUrl !== undefined ? driveUrl : current.driveUrl,
      resolvedDriveUrl,
      fileName: fileName !== undefined ? fileName : current.fileName,
      showInNavbar: showInNavbar !== undefined ? Boolean(showInNavbar) : current.showInNavbar !== false,
      updatedAt: new Date().toISOString(),
    };

    saveBranding(updated);
    const hasCustom = Boolean(updated.faviconDataUrl || updated.resolvedDriveUrl);
    res.json({
      success: true,
      message: 'Favicon & branding updated successfully.',
      hasCustomFavicon: hasCustom,
      faviconUrl: hasCustom ? `/api/favicon?v=${encodeURIComponent(updated.updatedAt || '1')}` : '/favicon.svg',
      driveUrl: updated.driveUrl || '',
      fileName: updated.fileName || (hasCustom ? 'Logo.png' : 'favicon.svg'),
      showInNavbar: updated.showInNavbar,
      updatedAt: updated.updatedAt,
    });
  });

  // Admin: Reset Favicon to default monogram
  app.delete('/api/branding', checkAdminAuth, (req: Request, res: Response): void => {
    saveBranding({ showInNavbar: true, updatedAt: new Date().toISOString() });
    res.json({
      success: true,
      message: 'Favicon reset to default monogram.',
      hasCustomFavicon: false,
      faviconUrl: '/favicon.svg',
    });
  });

  // Admin: Get Email Notification Settings
  app.get('/api/admin/email-settings', checkAdminAuth, (req: Request, res: Response): void => {
    const settings = getEmailSettings();
    res.json({
      success: true,
      settings: {
        provider: settings.provider || 'gmail',
        recipientEmail: settings.recipientEmail || NOTIFICATION_EMAIL,
        smtpHost: settings.smtpHost || 'smtp.gmail.com',
        smtpPort: settings.smtpPort || 465,
        smtpSecure: settings.smtpSecure !== false,
        smtpUser: settings.smtpUser || 'shoaibop65@gmail.com',
        hasPassword: Boolean(settings.smtpPass),
        web3formsKey: settings.web3formsKey || '',
        updatedAt: settings.updatedAt || null,
      },
    });
  });

  // Admin: Update Email Notification Settings
  app.post('/api/admin/email-settings', checkAdminAuth, (req: Request, res: Response): void => {
    const { provider, recipientEmail, smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass, web3formsKey } = req.body;
    const current = getEmailSettings();

    const updated: EmailSettings = {
      provider: provider || current.provider || 'gmail',
      recipientEmail: recipientEmail ? String(recipientEmail).trim() : current.recipientEmail || NOTIFICATION_EMAIL,
      smtpHost: smtpHost ? String(smtpHost).trim() : current.smtpHost || 'smtp.gmail.com',
      smtpPort: smtpPort ? parseInt(smtpPort, 10) : current.smtpPort || 465,
      smtpSecure: smtpSecure !== undefined ? Boolean(smtpSecure) : current.smtpSecure !== false,
      smtpUser: smtpUser ? String(smtpUser).trim() : current.smtpUser || 'shoaibop65@gmail.com',
      smtpPass: smtpPass !== undefined && smtpPass !== '' ? String(smtpPass).trim() : current.smtpPass || '',
      web3formsKey: web3formsKey !== undefined ? String(web3formsKey).trim() : current.web3formsKey || '',
      updatedAt: new Date().toISOString(),
    };

    saveEmailSettings(updated);
    res.json({
      success: true,
      message: `Email settings saved. Notifications will be delivered to ${updated.recipientEmail}.`,
      recipientEmail: updated.recipientEmail,
    });
  });

  // Admin: Test Email Dispatch to shoaibop65@gmail.com
  app.post('/api/admin/email-settings/test', checkAdminAuth, async (req: Request, res: Response): Promise<void> => {
    const settings = getEmailSettings();
    const recipient = settings.recipientEmail || NOTIFICATION_EMAIL;

    if (!settings.smtpPass) {
      res.status(400).json({
        success: false,
        error: `Please enter your Gmail App Password or SMTP password to test delivery to ${recipient}.`,
      });
      return;
    }

    try {
      const isGmail = (settings.smtpHost || '').toLowerCase().includes('gmail');
      const transporter = nodemailer.createTransport(
        isGmail
          ? {
              service: 'gmail',
              auth: {
                user: settings.smtpUser || recipient,
                pass: settings.smtpPass,
              },
            }
          : {
              host: settings.smtpHost,
              port: settings.smtpPort || 587,
              secure: settings.smtpPort === 465,
              auth: {
                user: settings.smtpUser,
                pass: settings.smtpPass,
              },
            }
      );

      await transporter.sendMail({
        from: `"Shoaib Portfolio" <${settings.smtpUser || recipient}>`,
        to: recipient,
        subject: `Test Notification: Portfolio Email System Working`,
        text: `Hello Shoaib,\n\nThis is a test notification confirming that your portfolio inquiry email system is configured and working!\n\nWhen clients submit project details, you will receive them instantly here.\n\nDate: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} (PKT)`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 24px; background: #faf8f3; border: 1px solid #e2ddd3;">
            <h2 style="color: #a06634; margin-top: 0; text-transform: uppercase;">Email System Connected!</h2>
            <p style="font-size: 14px; color: #1a1a1a; line-height: 1.6;">
              Hello Shoaib,<br/><br/>
              This is a test notification confirming that your portfolio email system is properly connected to <strong>${recipient}</strong>.
            </p>
            <div style="background: #ffffff; padding: 12px; border-left: 3px solid #a06634; margin: 16px 0; font-size: 13px;">
              All future client project inquiries will be delivered automatically to this inbox.
            </div>
            <p style="font-size: 11px; color: #888; margin-bottom: 0;">Timestamp: ${new Date().toISOString()}</p>
          </div>
        `,
      });

      res.json({
        success: true,
        message: `Test email successfully sent to ${recipient}! Check your inbox (or spam folder).`,
      });
    } catch (testErr: any) {
      console.error('Test email failure:', testErr);
      res.status(500).json({
        success: false,
        error: `Could not send email: ${testErr.message || String(testErr)}`,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
