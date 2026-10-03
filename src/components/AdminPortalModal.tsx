import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  Search,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  FileText,
  Trash2,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Clock,
  Download,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  RotateCcw
} from 'lucide-react';
import { StoredInquiry } from '../types/inquiry';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBrandingUpdated?: (faviconUrl: string, showInNavbar: boolean) => void;
}

const statusBadgeClasses: Record<string, string> = {
  New: 'bg-blue-100 text-blue-800 border-blue-300',
  Contacted: 'bg-amber-100 text-amber-800 border-amber-300',
  'In Discussion': 'bg-purple-100 text-purple-800 border-purple-300',
  Approved: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  Completed: 'bg-neutral-200 text-neutral-800 border-neutral-400',
};

export default function AdminPortalModal({ isOpen, onClose, onBrandingUpdated }: AdminPortalModalProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'branding' | 'email'>('inquiries');
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<StoredInquiry | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Branding / Favicon state
  const [faviconPreview, setFaviconPreview] = useState<string>('/api/favicon');
  const [uploadedDataUrl, setUploadedDataUrl] = useState<string | undefined>(undefined);
  const [uploadedFileName, setUploadedFileName] = useState<string>('favicon.png');
  const [driveUrl, setDriveUrl] = useState<string>('');
  const [showInNavbar, setShowInNavbar] = useState<boolean>(true);
  const [hasCustomFavicon, setHasCustomFavicon] = useState<boolean>(false);
  const [brandingStatusMsg, setBrandingStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSavingBranding, setIsSavingBranding] = useState<boolean>(false);

  // Email Notification Settings state
  const [emailProvider, setEmailProvider] = useState<'gmail' | 'smtp'>('gmail');
  const [recipientEmail, setRecipientEmail] = useState<string>('shoaibop65@gmail.com');
  const [smtpHost, setSmtpHost] = useState<string>('smtp.gmail.com');
  const [smtpPort, setSmtpPort] = useState<number>(465);
  const [smtpSecure, setSmtpSecure] = useState<boolean>(true);
  const [smtpUser, setSmtpUser] = useState<string>('shoaibop65@gmail.com');
  const [smtpPass, setSmtpPass] = useState<string>('');
  const [hasPasswordSaved, setHasPasswordSaved] = useState<boolean>(false);
  const [emailStatusMsg, setEmailStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSavingEmail, setIsSavingEmail] = useState<boolean>(false);
  const [isTestingEmail, setIsTestingEmail] = useState<boolean>(false);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Fetch inquiries
  const fetchInquiries = async (pwd: string) => {
    setIsLoading(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/inquiries', {
        headers: {
          'x-admin-password': pwd,
        },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries(data.inquiries);
        setIsAuthenticated(true);
        fetchBrandingInfo();
        fetchEmailSettingsInfo(pwd);
      } else {
        setLoginError(data.error || 'Authentication failed. Please check the admin password.');
        setIsAuthenticated(false);
      }
    } catch (err) {
      setLoginError('Could not reach backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInquiries(password);
  };

  const fetchBrandingInfo = async () => {
    try {
      const res = await fetch('/api/branding');
      const data = await res.json();
      if (res.ok && data.success) {
        setFaviconPreview(data.faviconUrl || '/favicon.svg');
        setDriveUrl(data.driveUrl || '');
        setUploadedFileName(data.fileName || 'favicon.png');
        setShowInNavbar(data.showInNavbar !== false);
        setHasCustomFavicon(Boolean(data.hasCustomFavicon));
      }
    } catch (err) {
      console.error('Error loading branding info:', err);
    }
  };

  const fetchEmailSettingsInfo = async (pwd: string) => {
    try {
      const res = await fetch('/api/admin/email-settings', {
        headers: { 'x-admin-password': pwd },
      });
      const data = await res.json();
      if (res.ok && data.success && data.settings) {
        setEmailProvider(data.settings.provider || 'gmail');
        setRecipientEmail(data.settings.recipientEmail || 'shoaibop65@gmail.com');
        setSmtpHost(data.settings.smtpHost || 'smtp.gmail.com');
        setSmtpPort(data.settings.smtpPort || 465);
        setSmtpSecure(data.settings.smtpSecure !== false);
        setSmtpUser(data.settings.smtpUser || 'shoaibop65@gmail.com');
        setHasPasswordSaved(Boolean(data.settings.hasPassword));
      }
    } catch (err) {
      console.error('Error loading email settings:', err);
    }
  };

  const handleSaveEmailSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingEmail(true);
    setEmailStatusMsg(null);
    try {
      const res = await fetch('/api/admin/email-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({
          provider: emailProvider,
          recipientEmail: recipientEmail.trim(),
          smtpHost: smtpHost.trim(),
          smtpPort,
          smtpSecure,
          smtpUser: smtpUser.trim(),
          smtpPass: smtpPass.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEmailStatusMsg({
          type: 'success',
          text: `Settings saved! All future inquiries will be delivered to ${data.recipientEmail}.`,
        });
        if (smtpPass) {
          setHasPasswordSaved(true);
          setSmtpPass('');
        }
      } else {
        setEmailStatusMsg({ type: 'error', text: data.error || 'Failed to save email settings.' });
      }
    } catch (err) {
      setEmailStatusMsg({ type: 'error', text: 'Network error while saving email settings.' });
    } finally {
      setIsSavingEmail(false);
    }
  };

  const handleTestEmail = async () => {
    setIsTestingEmail(true);
    setEmailStatusMsg(null);
    try {
      const res = await fetch('/api/admin/email-settings/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEmailStatusMsg({ type: 'success', text: data.message });
      } else {
        setEmailStatusMsg({ type: 'error', text: data.error || 'Failed to deliver test email.' });
      }
    } catch (err: any) {
      setEmailStatusMsg({ type: 'error', text: 'Could not connect to server for test email.' });
    } finally {
      setIsTestingEmail(false);
    }
  };

  const handleFaviconFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setBrandingStatusMsg({ type: 'error', text: 'File exceeds 5MB limit. Please choose a smaller PNG, SVG, or ICO file.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setUploadedDataUrl(result);
      setFaviconPreview(result);
      setUploadedFileName(file.name);
      setBrandingStatusMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBranding = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingBranding(true);
    setBrandingStatusMsg(null);
    try {
      const res = await fetch('/api/branding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({
          faviconDataUrl: uploadedDataUrl,
          driveUrl: driveUrl.trim(),
          fileName: uploadedFileName,
          showInNavbar,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFaviconPreview(data.faviconUrl);
        setHasCustomFavicon(Boolean(data.hasCustomFavicon));
        setBrandingStatusMsg({ type: 'success', text: 'Browser tab favicon updated!' });
        onBrandingUpdated?.(data.faviconUrl, Boolean(data.hasCustomFavicon));
      } else {
        setBrandingStatusMsg({ type: 'error', text: data.error || 'Failed to save favicon settings.' });
      }
    } catch (err) {
      setBrandingStatusMsg({ type: 'error', text: 'Network error while saving favicon.' });
    } finally {
      setIsSavingBranding(false);
    }
  };

  const handleResetBranding = async () => {
    setIsSavingBranding(true);
    setBrandingStatusMsg(null);
    try {
      const res = await fetch('/api/branding', {
        method: 'DELETE',
        headers: {
          'x-admin-password': password,
        },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUploadedDataUrl(undefined);
        setDriveUrl('');
        setFaviconPreview('/favicon.svg');
        setHasCustomFavicon(false);
        setShowInNavbar(false);
        setBrandingStatusMsg({ type: 'success', text: 'Reset to default S. monogram favicon.' });
        onBrandingUpdated?.('/favicon.svg', false);
      }
    } catch (err) {
      setBrandingStatusMsg({ type: 'error', text: 'Failed to reset favicon.' });
    } finally {
      setIsSavingBranding(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus as any } : inq))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus as any });
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project submission?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': password,
        },
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = filterStatus === 'All' || inq.status === filterStatus;
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.companyName && inq.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inq.serviceNeeded.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-charcoal/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="relative w-full max-w-6xl h-[90vh] bg-white border border-brand-charcoal/20 shadow-2xl z-10 flex flex-col rounded-sm overflow-hidden text-brand-charcoal"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-brand-charcoal/15 bg-brand-bg flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={faviconPreview}
                  alt="Site Favicon"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-xs object-contain bg-brand-charcoal p-0.5"
                />
                <div>
                  <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-brand-charcoal">
                    Portfolio Admin & Brand Settings
                  </h3>
                  <p className="text-[10px] font-mono text-brand-charcoal/60 uppercase">
                    Client Inquiries & Favicon Configuration
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isAuthenticated && (
                  <div className="flex bg-white border border-brand-charcoal/15 rounded-xs p-0.5 text-[10px] font-mono uppercase font-bold">
                    <button
                      type="button"
                      onClick={() => setActiveTab('inquiries')}
                      className={`px-3 py-1.5 transition-colors cursor-pointer ${
                        activeTab === 'inquiries'
                          ? 'bg-brand-charcoal text-brand-bg'
                          : 'text-brand-charcoal/70 hover:text-brand-primary'
                      }`}
                    >
                      Inquiries ({inquiries.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('branding')}
                      className={`px-3 py-1.5 transition-colors flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'branding'
                          ? 'bg-brand-primary text-brand-bg'
                          : 'text-brand-charcoal/70 hover:text-brand-primary'
                      }`}
                    >
                      <ImageIcon size={12} />
                      Favicon & Logo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('email');
                        fetchEmailSettingsInfo(password);
                      }}
                      className={`px-3 py-1.5 transition-colors flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'email'
                          ? 'bg-emerald-800 text-white'
                          : 'text-brand-charcoal/70 hover:text-brand-primary'
                      }`}
                    >
                      <Mail size={12} />
                      Email ({recipientEmail})
                    </button>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="p-2 text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-brand-charcoal/10 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            {!isAuthenticated ? (
              <div className="flex-1 flex items-center justify-center p-6 bg-brand-bg/30">
                <form
                  onSubmit={handleLogin}
                  className="max-w-md w-full bg-white p-8 border border-brand-charcoal/15 shadow-sm rounded-sm text-center"
                >
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-primary">
                    <Lock size={22} />
                  </div>
                  <h4 className="text-lg font-serif font-bold uppercase mb-2">
                    Authorized Access
                  </h4>
                  <p className="text-xs text-brand-charcoal/70 font-sans mb-6">
                    Enter your admin password to view all client submissions and manage project leads.
                  </p>

                  {loginError && (
                    <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 text-xs text-left rounded-xs">
                      {loginError}
                    </div>
                  )}

                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Admin Password"
                    className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-4 py-3 text-sm mb-4 focus:border-brand-primary focus:outline-none text-center tracking-widest font-mono"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-brand-primary hover:bg-brand-charcoal text-brand-bg text-xs font-bold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? <RefreshCw size={14} className="animate-spin" /> : 'Unlock Inquiries'}
                  </button>
                </form>
              </div>
            ) : activeTab === 'branding' ? (
              <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-brand-bg/30">
                <form
                  onSubmit={handleSaveBranding}
                  className="max-w-2xl mx-auto bg-white border border-brand-charcoal/15 p-6 md:p-8 shadow-xs space-y-6"
                >
                  <div className="border-b border-brand-charcoal/10 pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-primary block">
                        Site Identity
                      </span>
                      <h4 className="text-xl font-serif font-bold text-brand-charcoal">
                        Favicon & Brand Logo Settings
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 bg-brand-bg px-3 py-2 border border-brand-charcoal/15">
                      <img
                        src={faviconPreview}
                        alt="Current Favicon Preview"
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 object-contain rounded-xs"
                      />
                      <div className="text-left">
                        <span className="text-[9px] font-mono uppercase text-brand-charcoal/50 block">
                          Active Tab Icon
                        </span>
                        <span className="text-xs font-mono font-bold text-brand-charcoal truncate max-w-[120px] block">
                          {hasCustomFavicon || uploadedDataUrl ? uploadedFileName : 'Default S. Monogram'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {brandingStatusMsg && (
                    <div
                      className={`p-3.5 text-xs border rounded-xs ${
                        brandingStatusMsg.type === 'success'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-red-50 border-red-200 text-red-700'
                      }`}
                    >
                      {brandingStatusMsg.text}
                    </div>
                  )}

                  {/* Option 1: Upload Logo.png directly */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                      1. Upload Favicon / Logo File (Logo.png, SVG, ICO)
                    </label>
                    <p className="text-xs text-brand-charcoal/60">
                      Upload your <code className="font-mono bg-brand-bg px-1 py-0.5">Logo.png</code> directly from your computer for instant, reliable hosting as your website favicon.
                    </p>
                    <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-brand-charcoal/25 hover:border-brand-primary bg-brand-bg/40 p-6 cursor-pointer transition-colors text-center">
                      <Upload size={22} className="text-brand-primary mb-2" />
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                        Click to Select Logo.png or Drag & Drop
                      </span>
                      <span className="text-[10px] font-mono text-brand-charcoal/50 mt-1">
                        PNG, SVG, JPG, WEBP or ICO (Max 5MB)
                      </span>
                      <input
                        type="file"
                        accept="image/png,image/svg+xml,image/jpeg,image/webp,image/x-icon"
                        onChange={handleFaviconFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Option 2: Google Drive File Share Link */}
                  <div className="space-y-2 pt-2 border-t border-brand-charcoal/10">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-1.5">
                      <LinkIcon size={13} className="text-brand-primary" />
                      2. Or Paste Google Drive Image Share Link / Direct Image URL
                    </label>
                    <p className="text-xs text-brand-charcoal/60">
                      If your logo is on Google Drive, right-click the file in Drive &rarr; <strong>Share</strong> &rarr; <strong>Anyone with the link</strong> &rarr; <strong>Copy link</strong> (e.g. <code className="font-mono text-[11px]">https://drive.google.com/file/d/YOUR_FILE_ID/view</code>) and paste it below:
                    </p>
                    <input
                      type="url"
                      value={driveUrl}
                      onChange={(e) => setDriveUrl(e.target.value)}
                      placeholder="https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing"
                      className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-3.5 py-2.5 text-xs font-mono focus:border-brand-primary focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-brand-charcoal/15 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleResetBranding}
                      disabled={isSavingBranding}
                      className="px-4 py-2.5 border border-brand-charcoal/25 text-xs font-mono uppercase hover:bg-brand-bg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw size={13} />
                      Reset to Default SS Monogram
                    </button>

                    <button
                      type="submit"
                      disabled={isSavingBranding}
                      className="px-6 py-2.5 bg-brand-primary hover:bg-brand-charcoal text-brand-bg text-xs font-bold tracking-[0.18em] uppercase transition-colors cursor-pointer"
                    >
                      {isSavingBranding ? 'Saving...' : 'Save & Apply Favicon'}
                    </button>
                  </div>
                </form>
              </div>
            ) : activeTab === 'email' ? (
              <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-brand-bg/30">
                <form
                  onSubmit={handleSaveEmailSettings}
                  className="max-w-2xl mx-auto bg-white border border-brand-charcoal/15 p-6 md:p-8 shadow-xs space-y-6"
                >
                  <div className="border-b border-brand-charcoal/10 pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold block">
                        Email Notifications
                      </span>
                      <h4 className="text-xl font-serif font-bold text-brand-charcoal">
                        Receive Project Details on {recipientEmail}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
                      <Mail size={14} />
                      {hasPasswordSaved ? 'Connected' : 'Setup Required'}
                    </div>
                  </div>

                  {emailStatusMsg && (
                    <div
                      className={`p-3.5 text-xs border rounded-xs ${
                        emailStatusMsg.type === 'success'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-red-50 border-red-200 text-red-700'
                      }`}
                    >
                      {emailStatusMsg.text}
                    </div>
                  )}

                  {/* Recipient Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                      Recipient Email (Where you receive project inquiries)
                    </label>
                    <input
                      type="email"
                      required
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="shoaibop65@gmail.com"
                      className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-3.5 py-2.5 text-xs font-mono focus:border-brand-primary focus:outline-none"
                    />
                  </div>

                  {/* Provider Preset */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                      Dispatch Method
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setEmailProvider('gmail');
                          setSmtpHost('smtp.gmail.com');
                          setSmtpPort(465);
                          setSmtpSecure(true);
                          setSmtpUser(recipientEmail || 'shoaibop65@gmail.com');
                        }}
                        className={`p-3 border text-left rounded-xs transition-colors cursor-pointer ${
                          emailProvider === 'gmail'
                            ? 'border-emerald-700 bg-emerald-50/50'
                            : 'border-brand-charcoal/15 bg-brand-bg/40 hover:border-brand-primary'
                        }`}
                      >
                        <p className="text-xs font-bold uppercase text-brand-charcoal">Gmail (Recommended)</p>
                        <p className="text-[10px] text-brand-charcoal/60 mt-0.5">Use smtp.gmail.com with your Google App Password</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEmailProvider('smtp')}
                        className={`p-3 border text-left rounded-xs transition-colors cursor-pointer ${
                          emailProvider === 'smtp'
                            ? 'border-emerald-700 bg-emerald-50/50'
                            : 'border-brand-charcoal/15 bg-brand-bg/40 hover:border-brand-primary'
                        }`}
                      >
                        <p className="text-xs font-bold uppercase text-brand-charcoal">Custom SMTP</p>
                        <p className="text-[10px] text-brand-charcoal/60 mt-0.5">Brevo, SendGrid, Mailgun, Postmark, AWS SES</p>
                      </button>
                    </div>
                  </div>

                  {/* SMTP Credentials */}
                  <div className="space-y-4 pt-2 border-t border-brand-charcoal/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-brand-charcoal mb-1">
                          SMTP Host
                        </label>
                        <input
                          type="text"
                          required
                          value={smtpHost}
                          onChange={(e) => setSmtpHost(e.target.value)}
                          className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-3 py-2 text-xs font-mono focus:border-brand-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-brand-charcoal mb-1">
                          SMTP Port (465 SSL / 587 TLS)
                        </label>
                        <input
                          type="number"
                          required
                          value={smtpPort}
                          onChange={(e) => setSmtpPort(parseInt(e.target.value, 10))}
                          className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-3 py-2 text-xs font-mono focus:border-brand-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-brand-charcoal mb-1">
                          SMTP Username / Email
                        </label>
                        <input
                          type="text"
                          required
                          value={smtpUser}
                          onChange={(e) => setSmtpUser(e.target.value)}
                          placeholder="shoaibop65@gmail.com"
                          className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-3 py-2 text-xs font-mono focus:border-brand-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-brand-charcoal mb-1">
                          {emailProvider === 'gmail' ? 'Google App Password (16 chars)' : 'SMTP Password'}
                          {hasPasswordSaved && <span className="text-emerald-700 ml-1.5 lowercase font-normal">(saved)</span>}
                        </label>
                        <input
                          type="password"
                          value={smtpPass}
                          onChange={(e) => setSmtpPass(e.target.value)}
                          placeholder={hasPasswordSaved ? '•••••••••••••••• (leave blank to keep current)' : 'Enter password / app password'}
                          className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-3 py-2 text-xs font-mono focus:border-brand-primary focus:outline-none tracking-wider"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gmail Help Guide */}
                  {emailProvider === 'gmail' && (
                    <div className="p-4 bg-brand-bg/60 border border-brand-charcoal/15 text-xs rounded-xs space-y-1.5">
                      <p className="font-bold text-brand-charcoal uppercase text-[10px] tracking-wider">
                        How to get a Gmail App Password in 1 minute:
                      </p>
                      <ol className="list-decimal pl-4 space-y-1 text-brand-charcoal/80 text-[11px]">
                        <li>Open <a href="https://myaccount.google.com/security" target="_blank" rel="noreferrer" className="text-brand-primary underline font-medium">Google Account Security</a>.</li>
                        <li>Make sure <strong>2-Step Verification</strong> is ON.</li>
                        <li>Search for or click <strong>App passwords</strong>.</li>
                        <li>Create a new app password named <em>"Portfolio Website"</em>.</li>
                        <li>Copy the generated 16-character code (e.g. <code className="font-mono bg-white px-1">abcd efgh ijkl mnop</code>) and paste it into the password field above.</li>
                      </ol>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="pt-4 border-t border-brand-charcoal/15 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleTestEmail}
                      disabled={isTestingEmail || !hasPasswordSaved && !smtpPass}
                      className="px-4 py-2.5 border border-emerald-800 text-emerald-800 hover:bg-emerald-50 text-xs font-mono uppercase transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Mail size={13} />
                      {isTestingEmail ? 'Sending Test Email...' : `Send Test Email to ${recipientEmail}`}
                    </button>

                    <button
                      type="submit"
                      disabled={isSavingEmail}
                      className="px-6 py-2.5 bg-emerald-800 hover:bg-brand-charcoal text-white text-xs font-bold tracking-[0.18em] uppercase transition-colors cursor-pointer"
                    >
                      {isSavingEmail ? 'Saving...' : 'Save Email Settings'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-brand-bg/20">
                {/* Left Sidebar: List of inquiries */}
                <div className="w-full md:w-5/12 border-r border-brand-charcoal/15 flex flex-col bg-white">
                  {/* Search & Filter bar */}
                  <div className="p-4 border-b border-brand-charcoal/10 space-y-3">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-3 text-brand-charcoal/40" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search client, email, service..."
                        className="w-full bg-brand-bg/40 border border-brand-charcoal/20 pl-9 pr-3 py-2 text-xs focus:border-brand-primary focus:outline-none"
                      />
                    </div>
                    {/* Filter Pills */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono">
                      {['All', 'New', 'Contacted', 'In Discussion', 'Approved', 'Completed'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setFilterStatus(status)}
                          className={`px-2.5 py-1 whitespace-nowrap border rounded-xs uppercase transition-colors ${
                            filterStatus === status
                              ? 'bg-brand-charcoal text-white border-brand-charcoal'
                              : 'bg-brand-bg/40 text-brand-charcoal/70 border-brand-charcoal/15 hover:border-brand-primary'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* List items */}
                  <div className="flex-1 overflow-y-auto divide-y divide-brand-charcoal/10">
                    {filteredInquiries.length === 0 ? (
                      <div className="p-8 text-center text-xs text-brand-charcoal/50 font-sans">
                        No submissions matching criteria.
                      </div>
                    ) : (
                      filteredInquiries.map((inq) => {
                        const isSelected = selectedInquiry?.id === inq.id;
                        return (
                          <div
                            key={inq.id}
                            onClick={() => setSelectedInquiry(inq)}
                            className={`p-4 cursor-pointer transition-colors ${
                              isSelected ? 'bg-brand-primary/10 border-l-4 border-brand-primary' : 'hover:bg-brand-bg/40'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-serif font-bold text-sm text-brand-charcoal truncate">
                                {inq.fullName}
                              </span>
                              <span
                                className={`text-[9px] font-mono px-2 py-0.5 border rounded-xs uppercase font-bold ${
                                  statusBadgeClasses[inq.status] || 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {inq.status}
                              </span>
                            </div>
                            <p className="text-xs text-brand-charcoal/70 truncate mb-1">
                              {inq.companyName ? `${inq.companyName} • ` : ''}
                              {inq.serviceNeeded}
                            </p>
                            <div className="flex items-center justify-between text-[10px] font-mono text-brand-charcoal/50">
                              <span>{inq.budget}</span>
                              <span>{new Date(inq.submissionDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right: Selected Inquiry Detail View */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white">
                  {selectedInquiry ? (
                    <div className="space-y-8 max-w-2xl mx-auto">
                      {/* Top Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-brand-charcoal/15">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-brand-charcoal/50 block">
                            Inquiry ID: {selectedInquiry.id}
                          </span>
                          <h4 className="text-2xl font-serif font-bold text-brand-charcoal">
                            {selectedInquiry.fullName}
                          </h4>
                          {selectedInquiry.companyName && (
                            <p className="text-xs text-brand-primary font-bold uppercase tracking-wider">
                              {selectedInquiry.companyName}
                            </p>
                          )}
                        </div>

                        {/* Status dropdown & Action */}
                        <div className="flex items-center gap-2">
                          <select
                            value={selectedInquiry.status}
                            onChange={(e) => updateStatus(selectedInquiry.id, e.target.value)}
                            className="bg-brand-bg border border-brand-charcoal/20 px-3 py-1.5 text-xs font-mono font-bold uppercase focus:outline-none focus:border-brand-primary cursor-pointer"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Approved">Approved</option>
                            <option value="Completed">Completed</option>
                          </select>

                          <a
                            href={`mailto:${selectedInquiry.email}?subject=Re: Your Project Inquiry - Muhammad Shoaib`}
                            className="p-2 bg-brand-primary text-brand-bg hover:bg-brand-charcoal transition-colors rounded-xs flex items-center gap-1.5 text-xs font-bold uppercase px-3"
                          >
                            <Mail size={14} /> Reply
                          </a>

                          <button
                            onClick={() => deleteInquiry(selectedInquiry.id)}
                            className="p-2 text-brand-charcoal/40 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Contact card */}
                      <div className="bg-brand-bg/40 p-4 border border-brand-charcoal/15 rounded-sm grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-[10px] font-mono text-brand-charcoal/50 block uppercase">Email</span>
                          <a href={`mailto:${selectedInquiry.email}`} className="font-bold text-brand-primary underline">
                            {selectedInquiry.email}
                          </a>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-brand-charcoal/50 block uppercase">Phone / WhatsApp</span>
                          {selectedInquiry.phone ? (
                            <a
                              href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="font-bold text-brand-charcoal underline"
                            >
                              {selectedInquiry.phone}
                            </a>
                          ) : (
                            <span className="text-brand-charcoal/40">Not provided</span>
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-brand-charcoal/50 block uppercase">Country</span>
                          <span className="font-medium">{selectedInquiry.country || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-brand-charcoal/50 block uppercase">Preferred Contact</span>
                          <span className="font-medium">{selectedInquiry.preferredContact}</span>
                        </div>
                      </div>

                      {/* Project Overview */}
                      <div>
                        <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary mb-3">
                          Project Requirements
                        </h5>
                        <div className="space-y-3 text-xs">
                          <div>
                            <span className="font-bold text-brand-charcoal">Service Required: </span>
                            <span className="px-2 py-0.5 bg-brand-primary/15 font-bold text-brand-charcoal rounded-xs">
                              {selectedInquiry.serviceNeeded}
                            </span>
                            {selectedInquiry.otherService && (
                              <span className="ml-2 text-brand-charcoal/70">({selectedInquiry.otherService})</span>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-brand-charcoal">Budget: </span>
                            <span className="text-emerald-700 font-bold">{selectedInquiry.budget}</span>
                            {selectedInquiry.customBudget && (
                              <span className="ml-2 text-brand-charcoal/70">[{selectedInquiry.customBudget}]</span>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-brand-charcoal">Timeline: </span>
                            <span>{selectedInquiry.timeline}</span>
                            {selectedInquiry.targetDate && (
                              <span className="ml-2 text-brand-charcoal/70">(Target: {selectedInquiry.targetDate})</span>
                            )}
                          </div>
                        </div>

                        <div className="mt-4">
                          <span className="text-[11px] font-bold uppercase text-brand-charcoal block mb-1">
                            Project Description:
                          </span>
                          <div className="p-4 bg-brand-bg/40 border border-brand-charcoal/15 rounded-sm text-xs leading-relaxed whitespace-pre-wrap font-sans">
                            {selectedInquiry.projectDescription}
                          </div>
                        </div>

                        {selectedInquiry.goals && selectedInquiry.goals.length > 0 && (
                          <div className="mt-4">
                            <span className="text-[11px] font-bold uppercase text-brand-charcoal block mb-2">
                              Main Goals:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedInquiry.goals.map((g, idx) => (
                                <span key={idx} className="px-2.5 py-1 bg-white border border-brand-charcoal/20 text-[10px] font-mono">
                                  {g}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Social & Website Details */}
                      <div>
                        <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary mb-3">
                          Social Media & Website Details
                        </h5>
                        <div className="space-y-2 text-xs">
                          {selectedInquiry.socialMedia?.instagram && (
                            <p><strong>Instagram:</strong> <a href={selectedInquiry.socialMedia.instagram} target="_blank" rel="noreferrer" className="text-brand-primary underline">{selectedInquiry.socialMedia.instagram}</a></p>
                          )}
                          {selectedInquiry.socialMedia?.facebook && (
                            <p><strong>Facebook:</strong> <a href={selectedInquiry.socialMedia.facebook} target="_blank" rel="noreferrer" className="text-brand-primary underline">{selectedInquiry.socialMedia.facebook}</a></p>
                          )}
                          {selectedInquiry.socialMedia?.tiktok && (
                            <p><strong>TikTok:</strong> <a href={selectedInquiry.socialMedia.tiktok} target="_blank" rel="noreferrer" className="text-brand-primary underline">{selectedInquiry.socialMedia.tiktok}</a></p>
                          )}
                          {selectedInquiry.socialMedia?.linkedin && (
                            <p><strong>LinkedIn:</strong> <a href={selectedInquiry.socialMedia.linkedin} target="_blank" rel="noreferrer" className="text-brand-primary underline">{selectedInquiry.socialMedia.linkedin}</a></p>
                          )}
                          {selectedInquiry.socialMedia?.presenceDescription && (
                            <div className="mt-2 p-3 bg-brand-bg/30 border border-brand-charcoal/10 rounded-xs">
                              <strong>Current Social Presence: </strong>
                              {selectedInquiry.socialMedia.presenceDescription}
                            </div>
                          )}

                          <div className="pt-2 border-t border-brand-charcoal/10">
                            <p><strong>Has Website:</strong> {selectedInquiry.website?.hasWebsite ? 'Yes' : 'No'}</p>
                            {selectedInquiry.website?.currentUrl && (
                              <p><strong>Website URL:</strong> <a href={selectedInquiry.website.currentUrl} target="_blank" rel="noreferrer" className="text-brand-primary underline">{selectedInquiry.website.currentUrl}</a></p>
                            )}
                            {selectedInquiry.website?.improvements && selectedInquiry.website.improvements.length > 0 && (
                              <p><strong>Desired Improvements:</strong> {selectedInquiry.website.improvements.join(', ')}</p>
                            )}
                            {selectedInquiry.website?.lookingForType && (
                              <p><strong>Website Type Desired:</strong> {selectedInquiry.website.lookingForType}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Uploaded Files */}
                      {selectedInquiry.files && selectedInquiry.files.length > 0 && (
                        <div>
                          <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary mb-3">
                            Attached Files ({selectedInquiry.files.length})
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {selectedInquiry.files.map((file, idx) => (
                              <div key={idx} className="p-3 bg-brand-bg/40 border border-brand-charcoal/15 flex items-center justify-between rounded-sm">
                                <div className="truncate pr-2">
                                  <p className="text-xs font-mono font-medium truncate">{file.name}</p>
                                  <p className="text-[10px] text-brand-charcoal/50 font-mono">{(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                                {file.dataUrl && (
                                  <a
                                    href={file.dataUrl}
                                    download={file.name}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 bg-white border border-brand-charcoal/20 text-brand-charcoal hover:text-brand-primary"
                                    title="Download/View File"
                                  >
                                    <Download size={14} />
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Additional Info */}
                      {selectedInquiry.additionalInfo && (
                        <div>
                          <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary mb-2">
                            Additional Client Notes
                          </h5>
                          <p className="text-xs p-3 bg-brand-bg/40 border border-brand-charcoal/15 leading-relaxed">
                            {selectedInquiry.additionalInfo}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center p-8 text-brand-charcoal/40 font-serif">
                      Select an inquiry from the left panel to inspect details.
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
