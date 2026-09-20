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
NEW PROJECT INQUIRY
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
  <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #1a1a1a; background-color: #fdfbf7; padding: 24px; border: 1px solid #e2ddd3;">
    <div style="border-bottom: 2px solid #8c7355; padding-bottom: 12px; margin-bottom: 20px;">
      <h1 style="color: #1a1a1a; margin: 0 0 6px 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">New Project Inquiry</h1>
      <p style="margin: 0; color: #8c7355; font-size: 13px; font-weight: bold;">Submitted: ${dateStr}</p>
    </div>

    <div style="margin-bottom: 20px; padding: 16px; background: #ffffff; border: 1px solid #ece7de;">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #8c7355; margin-top: 0;">1. Client Information</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 4px 0; width: 160px; font-weight: bold;">Name:</td><td>${inquiry.fullName}</td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Company:</td><td>${inquiry.companyName || '—'}</td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Email:</td><td><a href="mailto:${inquiry.email}" style="color: #8c7355; font-weight: bold;">${inquiry.email}</a></td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Phone / WhatsApp:</td><td><a href="https://wa.me/${(inquiry.phone || '').replace(/[^0-9]/g, '')}" style="color: #1a1a1a;">${inquiry.phone || '—'}</a></td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Country:</td><td>${inquiry.country || '—'}</td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Preferred Contact:</td><td>${inquiry.preferredContact || 'Email'}</td></tr>
      </table>
    </div>

    <div style="margin-bottom: 20px; padding: 16px; background: #ffffff; border: 1px solid #ece7de;">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #8c7355; margin-top: 0;">2. Project & Service Required</h2>
      <p style="font-size: 14px; margin: 4px 0;"><strong>Service:</strong> <span style="background: #f4efe6; padding: 2px 8px; font-weight: bold;">${inquiry.serviceNeeded}</span> ${inquiry.otherService ? `(${inquiry.otherService})` : ''}</p>
      <p style="font-size: 14px; margin: 4px 0;"><strong>Estimated Budget:</strong> <span style="color: #2e7d32; font-weight: bold;">${inquiry.budget || 'Not specified'}</span> ${inquiry.customBudget ? `[Custom: ${inquiry.customBudget}]` : ''}</p>
      <p style="font-size: 14px; margin: 4px 0;"><strong>Timeline:</strong> ${inquiry.timeline || 'Flexible'} | <strong>Target Date:</strong> ${inquiry.targetDate || 'N/A'}</p>
      
      <p style="font-size: 14px; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">Project Description:</p>
      <div style="padding: 12px; background: #fdfbf7; border-left: 3px solid #8c7355; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${inquiry.projectDescription || 'No description provided.'}</div>

      <p style="font-size: 14px; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">Main Goals:</p>
      <p style="font-size: 13px; color: #444; margin: 0;">${Array.isArray(inquiry.goals) && inquiry.goals.length ? inquiry.goals.join(' • ') : 'None specified'}</p>
    </div>

    <div style="margin-bottom: 20px; padding: 16px; background: #ffffff; border: 1px solid #ece7de;">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #8c7355; margin-top: 0;">3. Social Media Information</h2>
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
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #8c7355; margin-top: 0;">4. Website Information</h2>
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
        <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #8c7355; margin-top: 0;">5. Additional Notes & References</h2>
        <div style="font-size: 14px; white-space: pre-wrap; line-height: 1.5; color: #333;">${inquiry.additionalInfo}</div>
      </div>
    ` : ''}

    <div style="margin-bottom: 24px; padding: 16px; background: #ffffff; border: 1px solid #ece7de;">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #8c7355; margin-top: 0;">6. Uploaded References / Files</h2>
      <ul style="font-size: 13px; color: #444; margin: 0; padding-left: 20px;">
        ${filesListHtml}
      </ul>
    </div>

    <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2ddd3;">
      <a href="mailto:${inquiry.email}?subject=Re: Your Project Inquiry - Muhammad Shoaib" style="display: inline-block; background-color: #8c7355; color: #ffffff; text-decoration: none; padding: 12px 24px; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
        Reply to Client (${inquiry.email}) &rarr;
      </a>
    </div>
  </div>
  `;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Shoaib Portfolio" <${process.env.SMTP_USER}>`,
        to: NOTIFICATION_EMAIL,
        replyTo: inquiry.email,
        subject: subject,
        text: textBody,
        html: htmlBody,
      });
      console.log(`[Email] Notification email successfully sent to ${NOTIFICATION_EMAIL}`);
      return { sent: true };
    } catch (emailErr) {
      console.error('[Email] Failed to send email via SMTP transport:', emailErr);
      return { sent: false, error: String(emailErr) };
    }
  } else {
    console.log('--------------------------------------------------');
    console.log(`[Email Notification Log] To: ${NOTIFICATION_EMAIL}`);
    console.log(`Subject: ${subject}`);
    console.log(textBody);
    console.log('--------------------------------------------------');
    console.log('[Email] (SMTP not configured in environment; inquiry recorded and logged.)');
    return { sent: false, reason: 'SMTP not configured. Submission saved in database.' };
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

      res.status(201).json({
        success: true,
        message: 'Your project inquiry has been saved successfully.',
        inquiryId: newInquiry.id,
        emailStatus: emailResult,
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
