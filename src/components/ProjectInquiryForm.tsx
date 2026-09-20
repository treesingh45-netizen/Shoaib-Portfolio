import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  UploadCloud,
  File,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Video,
  Send,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { ProjectInquiryData, UploadedFile } from '../types/inquiry';

interface ProjectInquiryFormProps {
  onSuccess?: () => void;
  isModal?: boolean;
}

const serviceOptions = [
  "Social Media Management",
  "Social Media Marketing",
  "Digital Marketing",
  "Meta Ads",
  "Google Ads",
  "Website Design",
  "Website Development",
  "Social Media Content",
  "Video Ads / Reels",
  "Branding / Graphic Design",
  "Other"
];

const goalOptions = [
  "Increase followers",
  "Increase engagement",
  "Generate leads",
  "Get more customers/patients",
  "Improve online presence",
  "Build a new website",
  "Redesign existing website",
  "Run paid advertisements",
  "Other"
];

const budgetOptions = [
  "Under $100",
  "$100 – $250",
  "$250 – $500",
  "$500 – $1,000",
  "$1,000 – $2,000",
  "$2,000+",
  "I’m open to discussing the budget",
  "Custom Budget"
];

const websiteImprovementOptions = [
  "Design",
  "Speed",
  "Mobile responsiveness",
  "SEO",
  "Conversion / Leads",
  "Content",
  "Full redesign",
  "Other"
];

const websiteTypeOptions = [
  "Business Website",
  "Dental / Medical Website",
  "Portfolio",
  "E-commerce",
  "Real Estate",
  "Restaurant",
  "Service Business",
  "Landing Page",
  "Other"
];

const timelineOptions = [
  "As soon as possible",
  "Within 1 week",
  "Within 2–4 weeks",
  "Within 1–2 months",
  "Flexible"
];

const MAX_FILE_SIZE_MB = 15;
const MAX_TOTAL_SIZE_MB = 35;

export default function ProjectInquiryForm({ isModal = false }: ProjectInquiryFormProps) {
  // Form state
  const [formData, setFormData] = useState<ProjectInquiryData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    preferredContact: 'Email',
    serviceNeeded: '',
    otherService: '',
    projectDescription: '',
    goals: [],
    otherGoal: '',
    budget: '$500 – $1,000',
    customBudget: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      tiktok: '',
      linkedin: '',
      youtube: '',
      otherLink: '',
      presenceDescription: '',
    },
    website: {
      hasWebsite: false,
      currentUrl: '',
      improvements: [],
      otherImprovement: '',
      lookingForType: 'Business Website',
      otherWebsiteType: '',
    },
    files: [],
    timeline: 'Within 1–2 weeks',
    targetDate: '',
    additionalInfo: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Toggle goal selection
  const handleToggleGoal = (goal: string) => {
    setFormData((prev) => {
      const exists = prev.goals.includes(goal);
      return {
        ...prev,
        goals: exists ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
      };
    });
  };

  // Toggle website improvements
  const handleToggleImprovement = (imp: string) => {
    setFormData((prev) => {
      const exists = prev.website.improvements.includes(imp);
      return {
        ...prev,
        website: {
          ...prev.website,
          improvements: exists
            ? prev.website.improvements.filter((i) => i !== imp)
            : [...prev.website.improvements, imp],
        },
      };
    });
  };

  // Handle file select and conversion
  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentTotalSize = uploadedFiles.reduce((acc, f) => acc + f.size, 0);
    const newFilesList: UploadedFile[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the ${MAX_FILE_SIZE_MB}MB size limit.`);
        return;
      }
      if (currentTotalSize + file.size > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
        alert(`Total uploads exceed the ${MAX_TOTAL_SIZE_MB}MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const fileObj: UploadedFile = {
          name: file.name,
          size: file.size,
          type: file.type || 'application/octet-stream',
          dataUrl: reader.result as string,
        };
        setUploadedFiles((prev) => [...prev, fileObj]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validation
    if (!formData.fullName.trim()) {
      setSubmitError('Please enter your Full Name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setSubmitError('Please provide a valid Email Address.');
      return;
    }
    if (!formData.serviceNeeded) {
      setSubmitError('Please select the service you need.');
      return;
    }
    if (!formData.projectDescription.trim()) {
      setSubmitError('Please describe your project.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        files: uploadedFiles,
      };

      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        setSubmittedId(result.inquiryId);
      } else {
        throw new Error(result.error || 'Failed to submit inquiry.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      // Fail-safe: if the backend server is temporarily uncontactable, provide helpful error
      setSubmitError(err.message || 'Unable to submit your project details right now. Please check your connection or contact shoaibop65@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 md:p-14 text-center max-w-2xl mx-auto bg-white border border-brand-charcoal/15 shadow-lg rounded-sm">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-primary">
          <CheckCircle2 size={36} strokeWidth={2} />
        </div>
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-brand-primary block mb-2">
          Project Inquiry Confirmed
        </span>
        <h3 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-4 uppercase">
          Thank you for sharing your project details.
        </h3>
        <p className="text-base md:text-lg text-brand-charcoal/80 font-sans leading-relaxed mb-6">
          Your information has been received successfully. I’ll review your requirements and contact you by email with the next steps.
        </p>
        {submittedId && (
          <div className="inline-block px-4 py-2 bg-brand-bg border border-brand-charcoal/15 text-xs font-mono text-brand-charcoal/70 mb-8 rounded-xs">
            Reference ID: <span className="font-bold text-brand-primary">{submittedId}</span>
          </div>
        )}
        <div className="pt-6 border-t border-brand-charcoal/10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setUploadedFiles([]);
              setFormData({
                fullName: '',
                companyName: '',
                email: '',
                phone: '',
                country: '',
                preferredContact: 'Email',
                serviceNeeded: '',
                otherService: '',
                projectDescription: '',
                goals: [],
                otherGoal: '',
                budget: '$500 – $1,000',
                customBudget: '',
                socialMedia: {
                  instagram: '',
                  facebook: '',
                  tiktok: '',
                  linkedin: '',
                  youtube: '',
                  otherLink: '',
                  presenceDescription: '',
                },
                website: {
                  hasWebsite: false,
                  currentUrl: '',
                  improvements: [],
                  otherImprovement: '',
                  lookingForType: 'Business Website',
                  otherWebsiteType: '',
                },
                files: [],
                timeline: 'Within 1–2 weeks',
                targetDate: '',
                additionalInfo: '',
              });
            }}
            className="px-6 py-3 border border-brand-charcoal text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-brand-charcoal hover:text-brand-bg transition-colors"
          >
            Submit Another Project
          </button>
          <a
            href="mailto:shoaibop65@gmail.com"
            className="px-6 py-3 bg-brand-primary text-brand-bg text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-brand-charcoal transition-colors"
          >
            Send Direct Note &rarr;
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-4xl mx-auto text-brand-charcoal">
      {/* Header */}
      <div className="border-b border-brand-charcoal/15 pb-8">
        <span className="text-[11px] font-bold tracking-[0.25em] text-brand-primary uppercase block mb-2">
          Project Inquiry
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-brand-charcoal mb-4 uppercase">
          Start a Project
        </h2>
        <p className="text-base md:text-lg font-serif italic text-brand-charcoal/80 leading-relaxed max-w-2xl">
          Tell me about your project and I’ll get back to you with the next steps.
        </p>
      </div>

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3 rounded-sm">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Submission Incomplete</p>
            <p>{submitError}</p>
          </div>
        </div>
      )}

      {/* 1. Client Information */}
      <div className="bg-white p-6 md:p-10 border border-brand-charcoal/10 rounded-sm shadow-xs space-y-6">
        <div className="border-b border-brand-charcoal/10 pb-3 flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
            01 • Client Information
          </h3>
          <span className="text-[10px] text-brand-charcoal/50 uppercase tracking-wider">* Required</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Johnathan Vance"
              className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-2">
              Company / Business Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="e.g. Apex Health Clinic"
              className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. client@company.com"
              className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-2">
              Phone / WhatsApp Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +1 (555) 019-2834 or +92 300 1234567"
              className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-2">
              Country
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="e.g. United States, United Kingdom, Pakistan, UAE"
              className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-2">
              Preferred Contact Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Email', 'WhatsApp', 'Phone Call'] as const).map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => setFormData({ ...formData, preferredContact: method })}
                  className={`py-3 px-2 text-xs font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                    formData.preferredContact === method
                      ? 'bg-brand-charcoal text-brand-bg border-brand-charcoal shadow-xs'
                      : 'bg-brand-bg/30 text-brand-charcoal/70 border-brand-charcoal/20 hover:border-brand-primary'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Project Information */}
      <div className="bg-white p-6 md:p-10 border border-brand-charcoal/10 rounded-sm shadow-xs space-y-8">
        <div className="border-b border-brand-charcoal/10 pb-3">
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
            02 • Project Information
          </h3>
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-3">
            What service do you need? *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {serviceOptions.map((service) => (
              <button
                type="button"
                key={service}
                onClick={() => setFormData({ ...formData, serviceNeeded: service })}
                className={`py-3 px-4 text-xs font-medium tracking-wide text-left border transition-all cursor-pointer flex items-center justify-between ${
                  formData.serviceNeeded === service
                    ? 'bg-brand-primary text-brand-bg border-brand-primary font-bold shadow-xs'
                    : 'bg-brand-bg/30 text-brand-charcoal/80 border-brand-charcoal/15 hover:border-brand-primary hover:bg-brand-bg/60'
                }`}
              >
                <span>{service}</span>
                {formData.serviceNeeded === service && <Check size={14} className="shrink-0" />}
              </button>
            ))}
          </div>
          {formData.serviceNeeded === 'Other' && (
            <div className="mt-4">
              <input
                type="text"
                value={formData.otherService}
                onChange={(e) => setFormData({ ...formData, otherService: e.target.value })}
                placeholder="Specify your custom service requirements..."
                className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-2">
            Project Description *
          </label>
          <textarea
            required
            rows={4}
            value={formData.projectDescription}
            onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
            placeholder="Tell me about your business, current situation, what you want to achieve, and specific deliverables..."
            className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-primary focus:bg-white focus:outline-none transition-colors resize-y leading-relaxed"
          ></textarea>
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-3">
            What are your main goals? (Select all that apply)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {goalOptions.map((goal) => {
              const isSelected = formData.goals.includes(goal);
              return (
                <button
                  type="button"
                  key={goal}
                  onClick={() => handleToggleGoal(goal)}
                  className={`py-2.5 px-3 text-xs tracking-wide text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-brand-charcoal text-brand-bg border-brand-charcoal font-semibold'
                      : 'bg-brand-bg/30 text-brand-charcoal/70 border-brand-charcoal/15 hover:border-brand-primary'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-brand-primary border-brand-primary text-white' : 'border-brand-charcoal/30'
                    }`}
                  >
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span>{goal}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Budget Section */}
      <div className="bg-white p-6 md:p-10 border border-brand-charcoal/10 rounded-sm shadow-xs space-y-6">
        <div className="border-b border-brand-charcoal/10 pb-3 flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
            03 • Estimated Project Budget
          </h3>
          <span className="text-[10px] text-brand-charcoal/50 uppercase tracking-wider font-mono">USD / Flexible</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {budgetOptions.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setFormData({ ...formData, budget: option })}
              className={`py-3 px-4 text-xs font-medium tracking-wide text-center border transition-all cursor-pointer ${
                formData.budget === option
                  ? 'bg-brand-primary text-brand-bg border-brand-primary font-bold shadow-xs'
                  : 'bg-brand-bg/30 text-brand-charcoal/80 border-brand-charcoal/15 hover:border-brand-primary hover:bg-brand-bg/60'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {formData.budget === 'Custom Budget' && (
          <div className="pt-2">
            <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-2">
              Enter Custom Budget (e.g. $1,500 / month or $3,500 one-time)
            </label>
            <input
              type="text"
              value={formData.customBudget}
              onChange={(e) => setFormData({ ...formData, customBudget: e.target.value })}
              placeholder="e.g. $1,500 / month retainer"
              className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        )}
      </div>

      {/* 4. Social Media Information */}
      <div className="bg-white p-6 md:p-10 border border-brand-charcoal/10 rounded-sm shadow-xs space-y-6">
        <div className="border-b border-brand-charcoal/10 pb-3">
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
            04 • Social Media Details
          </h3>
          <p className="text-xs text-brand-charcoal/60 mt-1 font-sans">
            Share any existing handles or links so I can audit your current online footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-brand-charcoal/80 mb-1.5 flex items-center gap-1.5">
              <Instagram size={13} className="text-brand-primary" /> Instagram Profile URL
            </label>
            <input
              type="url"
              value={formData.socialMedia.instagram}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, instagram: e.target.value },
                })
              }
              placeholder="https://instagram.com/yourhandle"
              className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-3.5 py-2.5 text-xs focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-brand-charcoal/80 mb-1.5 flex items-center gap-1.5">
              <Facebook size={13} className="text-brand-primary" /> Facebook Page URL
            </label>
            <input
              type="url"
              value={formData.socialMedia.facebook}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, facebook: e.target.value },
                })
              }
              placeholder="https://facebook.com/yourpage"
              className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-3.5 py-2.5 text-xs focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-brand-charcoal/80 mb-1.5 flex items-center gap-1.5">
              <Video size={13} className="text-brand-primary" /> TikTok Profile URL
            </label>
            <input
              type="url"
              value={formData.socialMedia.tiktok}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, tiktok: e.target.value },
                })
              }
              placeholder="https://tiktok.com/@yourbrand"
              className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-3.5 py-2.5 text-xs focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-brand-charcoal/80 mb-1.5 flex items-center gap-1.5">
              <Linkedin size={13} className="text-brand-primary" /> LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={formData.socialMedia.linkedin}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, linkedin: e.target.value },
                })
              }
              placeholder="https://linkedin.com/company/yourbrand"
              className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-3.5 py-2.5 text-xs focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-brand-charcoal/80 mb-1.5 flex items-center gap-1.5">
              <Youtube size={13} className="text-brand-primary" /> YouTube Channel URL
            </label>
            <input
              type="url"
              value={formData.socialMedia.youtube}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, youtube: e.target.value },
                })
              }
              placeholder="https://youtube.com/@channel"
              className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-3.5 py-2.5 text-xs focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-brand-charcoal/80 mb-1.5 flex items-center gap-1.5">
              <Globe size={13} className="text-brand-primary" /> Other Social Media Link
            </label>
            <input
              type="url"
              value={formData.socialMedia.otherLink}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, otherLink: e.target.value },
                })
              }
              placeholder="e.g. X / Twitter, Pinterest, Threads"
              className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-3.5 py-2.5 text-xs focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-2">
            Tell me about your current social media presence
          </label>
          <textarea
            rows={3}
            value={formData.socialMedia.presenceDescription}
            onChange={(e) =>
              setFormData({
                ...formData,
                socialMedia: { ...formData.socialMedia, presenceDescription: e.target.value },
              })
            }
            placeholder="Tell me what you currently post, your target audience, what is working, and what you would like to improve."
            className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-primary focus:bg-white focus:outline-none transition-colors resize-y"
          ></textarea>
        </div>
      </div>

      {/* 5. Website Information */}
      <div className="bg-white p-6 md:p-10 border border-brand-charcoal/10 rounded-sm shadow-xs space-y-6">
        <div className="border-b border-brand-charcoal/10 pb-3">
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
            05 • Website Details
          </h3>
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-3">
            Do you currently have a website?
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  website: { ...formData.website, hasWebsite: true },
                })
              }
              className={`px-8 py-3 text-xs font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                formData.website.hasWebsite
                  ? 'bg-brand-charcoal text-brand-bg border-brand-charcoal shadow-xs'
                  : 'bg-brand-bg/30 text-brand-charcoal/70 border-brand-charcoal/20 hover:border-brand-primary'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  website: { ...formData.website, hasWebsite: false },
                })
              }
              className={`px-8 py-3 text-xs font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                !formData.website.hasWebsite
                  ? 'bg-brand-charcoal text-brand-bg border-brand-charcoal shadow-xs'
                  : 'bg-brand-bg/30 text-brand-charcoal/70 border-brand-charcoal/20 hover:border-brand-primary'
              }`}
            >
              No
            </button>
          </div>
        </div>

        {formData.website.hasWebsite ? (
          <div className="space-y-6 pt-2 border-t border-brand-charcoal/10">
            <div>
              <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-2">
                Current Website URL
              </label>
              <input
                type="url"
                value={formData.website.currentUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    website: { ...formData.website, currentUrl: e.target.value },
                  })
                }
                placeholder="https://yourwebsite.com"
                className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-3">
                What would you like to improve? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {websiteImprovementOptions.map((imp) => {
                  const isSelected = formData.website.improvements.includes(imp);
                  return (
                    <button
                      type="button"
                      key={imp}
                      onClick={() => handleToggleImprovement(imp)}
                      className={`py-2 px-3 text-xs tracking-wide text-left border transition-all cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'bg-brand-charcoal text-brand-bg border-brand-charcoal font-semibold'
                          : 'bg-brand-bg/30 text-brand-charcoal/70 border-brand-charcoal/15 hover:border-brand-primary'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-brand-primary border-brand-primary text-white' : 'border-brand-charcoal/30'
                        }`}
                      >
                        {isSelected && <Check size={10} strokeWidth={3} />}
                      </div>
                      <span className="truncate">{imp}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-2 border-t border-brand-charcoal/10">
            <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-2">
              What type of website are you looking for?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {websiteTypeOptions.map((wType) => (
                <button
                  type="button"
                  key={wType}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      website: { ...formData.website, lookingForType: wType },
                    })
                  }
                  className={`py-3 px-3 text-xs font-medium tracking-wide text-left border transition-all cursor-pointer ${
                    formData.website.lookingForType === wType
                      ? 'bg-brand-primary text-brand-bg border-brand-primary font-bold shadow-xs'
                      : 'bg-brand-bg/30 text-brand-charcoal/80 border-brand-charcoal/15 hover:border-brand-primary'
                  }`}
                >
                  {wType}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 6. File Uploads */}
      <div className="bg-white p-6 md:p-10 border border-brand-charcoal/10 rounded-sm shadow-xs space-y-6">
        <div className="border-b border-brand-charcoal/10 pb-3 flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
            06 • Project Files / References
          </h3>
          <span className="text-[10px] text-brand-charcoal/50 uppercase tracking-wider font-mono">
            Max 15MB per file
          </span>
        </div>

        <p className="text-xs text-brand-charcoal/70 font-sans leading-relaxed">
          Upload reference files, images, videos, logos, or existing materials that may help me understand your project.
        </p>

        {/* Upload Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-brand-charcoal/25 hover:border-brand-primary bg-brand-bg/20 hover:bg-brand-bg/40 p-8 text-center cursor-pointer transition-colors rounded-sm flex flex-col items-center justify-center gap-3"
        >
          <div className="p-3 bg-white rounded-full border border-brand-charcoal/15 text-brand-primary shadow-xs">
            <UploadCloud size={24} />
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-brand-charcoal mb-1">
              Click to select files or drag & drop
            </p>
            <p className="text-[11px] text-brand-charcoal/50 font-sans">
              Supports: Images (PNG, JPG, WEBP), Videos (MP4, MOV), Logos, Brand assets, PDF & Docs
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFilesSelect}
            className="hidden"
            accept="image/*,video/*,.pdf,.doc,.docx,.svg"
          />
        </div>

        {/* Selected Files List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-charcoal/60 block">
              Attached Files ({uploadedFiles.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {uploadedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-brand-bg/40 border border-brand-charcoal/15 rounded-sm"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <File size={16} className="text-brand-primary shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-mono text-brand-charcoal truncate font-medium">{file.name}</p>
                      <p className="text-[10px] text-brand-charcoal/50 font-mono">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="p-1 text-brand-charcoal/50 hover:text-red-600 hover:bg-white transition-colors rounded-xs"
                    title="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 7. Project Timeline */}
      <div className="bg-white p-6 md:p-10 border border-brand-charcoal/10 rounded-sm shadow-xs space-y-6">
        <div className="border-b border-brand-charcoal/10 pb-3">
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
            07 • Project Timeline
          </h3>
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-3">
            When would you like to start?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {timelineOptions.map((tOpt) => (
              <button
                type="button"
                key={tOpt}
                onClick={() => setFormData({ ...formData, timeline: tOpt })}
                className={`py-3 px-3 text-xs font-medium tracking-wide text-center border transition-all cursor-pointer ${
                  formData.timeline === tOpt
                    ? 'bg-brand-primary text-brand-bg border-brand-primary font-bold shadow-xs'
                    : 'bg-brand-bg/30 text-brand-charcoal/80 border-brand-charcoal/15 hover:border-brand-primary'
                }`}
              >
                {tOpt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-2 flex items-center gap-2">
            <Calendar size={14} className="text-brand-primary" /> Target Completion Date (Optional)
          </label>
          <input
            type="date"
            value={formData.targetDate}
            onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
            className="w-full sm:w-72 bg-brand-bg/40 border border-brand-charcoal/20 px-4 py-2.5 text-sm focus:border-brand-primary focus:bg-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* 8. Additional Information */}
      <div className="bg-white p-6 md:p-10 border border-brand-charcoal/10 rounded-sm shadow-xs space-y-6">
        <div className="border-b border-brand-charcoal/10 pb-3">
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
            08 • Additional Information
          </h3>
        </div>

        <div>
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-brand-charcoal mb-2">
            Anything else I should know?
          </label>
          <textarea
            rows={4}
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            placeholder="Share additional requirements, references, competitor websites, preferred visual style, target audience demographics, or any questions you have..."
            className="w-full bg-brand-bg/40 border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-primary focus:bg-white focus:outline-none transition-colors resize-y leading-relaxed"
          ></textarea>
        </div>
      </div>

      {/* Final Submission Button & Trust Note */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-brand-charcoal/15">
        <div className="flex items-center gap-3 text-xs text-brand-charcoal/70">
          <ShieldCheck size={20} className="text-brand-primary shrink-0" />
          <span>Information is held in strict confidence and stored securely.</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-10 py-5 bg-brand-primary hover:bg-brand-charcoal text-brand-bg text-xs font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-3 shadow-md disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Transmitting Details...</span>
            </>
          ) : (
            <>
              <span>Send Project Details</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
