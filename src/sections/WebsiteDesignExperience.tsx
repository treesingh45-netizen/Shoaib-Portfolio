import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeUp, RevealText } from '../components/AnimatedText';
import {
  Globe,
  Building2,
  Sparkles,
  Layout,
  FileText,
  X,
  ArrowUpRight,
  CheckCircle2,
  Wrench,
  Layers,
  ArrowRight
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  industry: string;
  role: string;
  tools: string[];
  overview: string;
  objectives: string[];
  features: string[];
  outcome: string;
}

const services = [
  {
    number: "01",
    title: "WEBSITE DESIGN",
    description: "Modern and responsive website layouts designed around the business and its audience.",
    icon: Globe,
    details: "Tailored visual identity, desktop-to-mobile precision, clean aesthetics, and conversion-focused architecture."
  },
  {
    number: "02",
    title: "BUSINESS WEBSITES",
    description: "Professional websites for clinics, local businesses, personal brands, and service-based businesses.",
    icon: Building2,
    details: "Trust-building layouts, credential highlights, clear contact funnels, and localized customer engagement."
  },
  {
    number: "03",
    title: "3D & INTERACTIVE DESIGN",
    description: "Create visually engaging website experiences using modern layouts, interactive elements, and 3D-inspired design.",
    icon: Sparkles,
    details: "Tasteful micro-interactions, depth accents, smooth transitions, and tactile user feedback without slowing load speeds."
  },
  {
    number: "04",
    title: "UI/UX DESIGN",
    description: "Structure pages with clear navigation, strong visual hierarchy, and user-friendly layouts.",
    icon: Layout,
    details: "Frictionless user journeys, accessible typographic scales, structured information architecture, and clear calls-to-action."
  },
  {
    number: "05",
    title: "WEBSITE CONTENT & VISUALS",
    description: "Prepare website sections, visual assets, layouts, and supporting content for a consistent brand experience.",
    icon: FileText,
    details: "Custom visual graphics, layout wireframes, clear typography pairings, and supporting branding assets."
  }
];

const tools = [
  { name: "WEBFLOW", category: "No-Code Development & CMS" },
  { name: "WIX STUDIO", category: "Responsive Web Platform" },
  { name: "WORDPRESS", category: "CMS & Dynamic Sites" },
  { name: "FIGMA", category: "Interface & UX Prototyping" },
  { name: "CANVA", category: "Visual Assets & Media" },
  { name: "PHOTOSHOP", category: "Asset Retouching & Graphics" }
];

const workflowSteps = [
  {
    step: "01",
    title: "DISCOVER",
    desc: "Understand the business, audience, goals, and brand."
  },
  {
    step: "02",
    title: "PLAN",
    desc: "Create the website structure and visual direction."
  },
  {
    step: "03",
    title: "DESIGN",
    desc: "Build the interface, layout, typography, and visual elements."
  },
  {
    step: "04",
    title: "DEVELOP",
    desc: "Create and refine the responsive website."
  },
  {
    step: "05",
    title: "OPTIMIZE",
    desc: "Improve usability, presentation, mobile responsiveness, and overall experience."
  }
];

const projects: Project[] = [
  {
    id: "dr-paresh-shah",
    name: "DR. PARESH SHAH",
    industry: "Dental / Healthcare",
    role: "Website Design & Development",
    tools: ["Webflow", "Wix Studio", "WordPress", "Figma"],
    overview: "Designed a professional dental website focused on building trust, presenting the clinic clearly, and creating a simple and professional experience for potential patients.",
    objectives: [
      "Establish immediate patient trust and alleviate treatment anxiety through warm, clinical clarity.",
      "Streamline new patient booking flow across mobile and desktop devices.",
      "Clearly organize dental treatments, doctor credentials, and clinic safety protocols."
    ],
    features: [
      "Intuitive treatment catalog categorized by general, cosmetic, and surgical care.",
      "Clear doctor profile highlighting medical credentials, awards, and approach to patient comfort.",
      "Direct consultation booking form with automated inquiry notification routing.",
      "Full mobile viewport optimization ensuring fast load times on 4G connections."
    ],
    outcome: "A refined medical web presence that converted visitors into scheduled consultations and elevated local search credibility."
  },
  {
    id: "lumina-aesthetics",
    name: "LUMINA AESTHETICS & DERMA",
    industry: "Clinic / Wellness & Aesthetics",
    role: "UI/UX & Web Design",
    tools: ["Figma", "WordPress", "Photoshop", "Canva"],
    overview: "Crafted a serene, luxury aesthetic clinic website balancing medical credibility with a tranquil patient journey, transparent treatment pricing, and consultation scheduling.",
    objectives: [
      "Differentiate the clinic through an editorial visual tone and clean typographic hierarchy.",
      "Present clinical treatments and before-and-after results with utmost aesthetic sophistication.",
      "Provide an effortless consultation inquiry system for high-intent clientele."
    ],
    features: [
      "Editorial treatment index with interactive accordion FAQs for each procedure.",
      "Practitioner team profile showcasing certified dermatologist backgrounds.",
      "Mobile-optimized consultation calendar and interactive location map.",
      "Subtle micro-interactions that communicate luxury without impeding usability."
    ],
    outcome: "Significantly enhanced patient inquiry quality and lowered mobile bounce rates with a timeless luxury feel."
  },
  {
    id: "vanguard-capital",
    name: "VANGUARD ADVISORY & STUDIO",
    industry: "Professional Services / Consulting",
    role: "Web Architecture & Interface Design",
    tools: ["Webflow", "Figma", "Wix Studio"],
    overview: "Structured a modern corporate digital presence communicating analytical authority, strategic case studies, and streamlined client engagement pipelines.",
    objectives: [
      "Convey institutional reliability, partner experience, and measurable business outcomes.",
      "Organize complex service offerings into structured, digestible executive summaries.",
      "Create high-conversion project inquiry funnels for corporate decision-makers."
    ],
    features: [
      "High-contrast editorial layout with bespoke typography and structured data tables.",
      "Interactive case-study showcase with problem-solution-impact frameworks.",
      "Frictionless project estimation and direct calendar scheduling links.",
      "Zero-latency responsiveness tested across widescreen monitors and compact smartphones."
    ],
    outcome: "Delivered an authoritative digital hub that effectively positions the firm for high-value enterprise retainers."
  }
];

export default function WebsiteDesignExperience() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="websites" className="relative w-full py-24 md:py-36 px-6 md:px-12 z-10 bg-brand-bg/95 backdrop-blur-sm border-t border-brand-charcoal/10">
      <div className="max-w-7xl mx-auto w-full">

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24 md:mb-32">
          <div className="col-span-1 lg:col-span-4">
            <FadeUp>
              <span className="text-xs font-bold tracking-[0.25em] text-brand-primary uppercase mb-3 block">
                Digital Craft & Systems
              </span>
              <div className="w-12 h-[1px] bg-brand-primary/40 mb-6" />
              <p className="text-xs tracking-[0.15em] text-brand-charcoal/50 uppercase font-sans">
                Webflow • Wix Studio • WordPress • Figma
              </p>
            </FadeUp>
          </div>
          
          <div className="col-span-1 lg:col-span-8">
            <FadeUp delay={0.1}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-brand-charcoal leading-[1.05] mb-8">
                <RevealText text="WEBSITE DESIGN EXPERIENCE" />
              </h2>
            </FadeUp>

            <FadeUp delay={0.2} className="mb-8">
              <h3 className="text-xl md:text-2xl font-serif italic text-brand-primary leading-relaxed">
                "Creating modern, professional websites that help businesses build trust and establish a stronger online presence."
              </h3>
            </FadeUp>

            <FadeUp delay={0.3} className="max-w-3xl">
              <p className="text-base md:text-lg text-brand-charcoal/80 leading-relaxed font-sans border-l-2 border-brand-primary/30 pl-6">
                Alongside my social media work, I have hands-on experience designing modern websites for businesses and professional brands. My focus is on clean layouts, user-friendly experiences, strong visual hierarchy, mobile responsiveness, and designs that communicate the brand professionally.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* SERVICES: 01 - 05 */}
        <div className="mb-28 md:mb-36">
          <FadeUp className="mb-12 flex items-center justify-between border-b border-brand-charcoal/10 pb-4">
            <h4 className="text-xs font-bold tracking-[0.25em] text-brand-primary uppercase">
              Services
            </h4>
            <span className="text-[10px] tracking-[0.2em] uppercase text-brand-charcoal/40 font-mono">
              01 — 05
            </span>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <FadeUp key={service.number} delay={idx * 0.08} className="h-full">
                  <div className="h-full p-8 bg-white border border-brand-charcoal/10 hover:border-brand-primary/40 transition-all duration-300 rounded-sm flex flex-col justify-between group shadow-xs hover:shadow-md">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-mono font-bold tracking-widest text-brand-primary/80 uppercase">
                          {service.number}
                        </span>
                        <div className="p-2.5 bg-brand-bg rounded-sm text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-bg transition-colors duration-300">
                          <IconComponent size={18} strokeWidth={1.5} />
                        </div>
                      </div>
                      <h5 className="text-lg md:text-xl font-serif text-brand-charcoal group-hover:text-brand-primary transition-colors duration-300 mb-3 uppercase">
                        {service.title}
                      </h5>
                      <p className="text-sm text-brand-charcoal/80 font-sans leading-relaxed mb-4">
                        {service.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-brand-charcoal/5 mt-4">
                      <p className="text-xs text-brand-charcoal/50 leading-normal font-sans">
                        {service.details}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}

            {/* Value Proposition Card to complete the 6-grid balance */}
            <FadeUp delay={0.45} className="h-full">
              <div className="h-full p-8 bg-brand-charcoal text-brand-bg rounded-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase block mb-4">
                    The Philosophy
                  </span>
                  <h5 className="text-xl md:text-2xl font-serif text-brand-bg leading-snug mb-4">
                    BUILT TO ENGAGE & CONVERT.
                  </h5>
                  <p className="text-sm text-brand-bg/70 leading-relaxed font-sans">
                    A website shouldn't merely look good — it must guide the visitor intuitively toward taking action, booking an appointment, or contacting your business.
                  </p>
                </div>
                <div className="pt-6 border-t border-brand-bg/10 mt-6">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-brand-primary hover:text-white transition-colors"
                  >
                    Start Your Website Project <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* TOOLS I USE */}
        <div className="mb-28 md:mb-36">
          <FadeUp className="mb-10 flex items-center justify-between border-b border-brand-charcoal/10 pb-4">
            <h4 className="text-xs font-bold tracking-[0.25em] text-brand-primary uppercase">
              Tools I Use
            </h4>
            <span className="text-[10px] tracking-[0.2em] uppercase text-brand-charcoal/40 font-mono">
              Design & Development Stack
            </span>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((tool, index) => (
              <FadeUp key={tool.name} delay={index * 0.05}>
                <div className="p-6 bg-white border border-bronze rounded-sm flex flex-col justify-between h-32 group hover:border-brand-primary hover:bg-brand-primary/[0.02] transition-all duration-300">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-brand-charcoal/40">
                    0{index + 1}
                  </span>
                  <div>
                    <h5 className="text-sm md:text-base font-serif font-bold tracking-wider text-brand-charcoal group-hover:text-brand-primary transition-colors">
                      {tool.name}
                    </h5>
                    <p className="text-[10px] text-brand-charcoal/50 leading-tight mt-1 truncate">
                      {tool.category}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* WEBSITE WORKFLOW */}
        <div className="mb-28 md:mb-36">
          <FadeUp className="mb-12 flex items-center justify-between border-b border-brand-charcoal/10 pb-4">
            <h4 className="text-xs font-bold tracking-[0.25em] text-brand-primary uppercase">
              Website Workflow
            </h4>
            <span className="text-[10px] tracking-[0.2em] uppercase text-brand-charcoal/40 font-mono">
              Structured 5-Stage Process
            </span>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {workflowSteps.map((step, idx) => (
              <FadeUp key={step.step} delay={idx * 0.1} className="h-full">
                <div className="h-full relative p-6 bg-white border-t-2 border-brand-primary border-x border-b border-brand-charcoal/10 rounded-b-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold tracking-widest text-brand-primary">
                        STEP {step.step}
                      </span>
                    </div>
                    <h5 className="text-base font-serif font-bold text-brand-charcoal tracking-wide mb-3 uppercase">
                      {step.title}
                    </h5>
                    <p className="text-xs text-brand-charcoal/70 font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  {idx < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-brand-charcoal/30">
                      &rarr;
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* FEATURED WEBSITE PROJECTS */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-brand-charcoal/10 pb-4">
            <FadeUp>
              <span className="text-xs font-bold tracking-[0.25em] text-brand-primary uppercase block mb-1">
                Selected Case Studies
              </span>
              <h4 className="text-2xl md:text-3xl font-serif text-brand-charcoal uppercase">
                Featured Website Projects
              </h4>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-xs text-brand-charcoal/60 tracking-wider uppercase font-sans mt-2 md:mt-0">
                Curated Commercial & Professional Builds
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <FadeUp key={project.id} delay={idx * 0.12} className="h-full">
                <div className="h-full bg-white border border-brand-charcoal/10 rounded-sm p-8 flex flex-col justify-between hover:border-brand-primary/50 transition-all duration-300 group shadow-xs hover:shadow-lg">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 bg-brand-bg text-brand-charcoal/80 border border-brand-charcoal/10">
                        {project.industry}
                      </span>
                      <span className="text-xs font-mono text-brand-charcoal/30">
                        0{idx + 1}
                      </span>
                    </div>

                    <h5 className="text-2xl font-serif text-brand-charcoal group-hover:text-brand-primary transition-colors mb-2 uppercase">
                      {project.name}
                    </h5>

                    <p className="text-xs font-sans font-bold tracking-wider text-brand-primary uppercase mb-6">
                      {project.role}
                    </p>

                    {/* Tools list */}
                    <div className="mb-6">
                      <span className="text-[9px] font-mono tracking-widest text-brand-charcoal/40 uppercase block mb-2">
                        Tools Used
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-sans tracking-wide px-2 py-0.5 bg-brand-charcoal/5 text-brand-charcoal/80 border border-brand-charcoal/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Overview */}
                    <div className="mb-8">
                      <span className="text-[9px] font-mono tracking-widest text-brand-charcoal/40 uppercase block mb-2">
                        Project Overview
                      </span>
                      <p className="text-sm text-brand-charcoal/80 font-sans leading-relaxed">
                        {project.overview}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-6 border-t border-brand-charcoal/10">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full py-3.5 px-6 border border-brand-charcoal bg-transparent hover:bg-brand-charcoal hover:text-brand-bg text-brand-charcoal text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>View Project</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-brand-charcoal/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-brand-bg border border-brand-charcoal/20 p-6 md:p-12 rounded-sm shadow-2xl text-brand-charcoal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 border border-brand-charcoal/20 text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-bg transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Case Study Header */}
              <div className="mb-8 pr-12 border-b border-brand-charcoal/10 pb-6">
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-brand-primary uppercase block mb-2">
                  {selectedProject.industry} • Case Study
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-2 uppercase">
                  {selectedProject.name}
                </h3>
                <p className="text-xs font-bold tracking-widest text-brand-charcoal/60 uppercase">
                  My Role: <span className="text-brand-charcoal">{selectedProject.role}</span>
                </p>
              </div>

              {/* Tools Used */}
              <div className="mb-8">
                <span className="text-[10px] font-mono tracking-widest text-brand-primary uppercase block mb-2">
                  Tools & Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-white border border-brand-charcoal/15 text-xs font-mono uppercase tracking-wider text-brand-charcoal"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h4 className="text-xs font-bold tracking-[0.2em] text-brand-charcoal uppercase mb-3 border-b border-brand-charcoal/10 pb-2">
                  Project Overview
                </h4>
                <p className="text-base text-brand-charcoal/80 font-sans leading-relaxed">
                  {selectedProject.overview}
                </p>
              </div>

              {/* Key Objectives */}
              <div className="mb-8">
                <h4 className="text-xs font-bold tracking-[0.2em] text-brand-charcoal uppercase mb-4 border-b border-brand-charcoal/10 pb-2">
                  Strategic Objectives
                </h4>
                <ul className="space-y-3">
                  {selectedProject.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-brand-charcoal/80">
                      <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivered Features */}
              <div className="mb-8">
                <h4 className="text-xs font-bold tracking-[0.2em] text-brand-charcoal uppercase mb-4 border-b border-brand-charcoal/10 pb-2">
                  Key Delivered Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProject.features.map((feat, i) => (
                    <div key={i} className="p-3 bg-white border border-brand-charcoal/10 text-xs text-brand-charcoal/80 leading-relaxed font-sans">
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div className="mb-10 p-5 bg-brand-charcoal text-brand-bg rounded-sm">
                <span className="text-[10px] font-mono tracking-widest text-brand-primary uppercase block mb-1">
                  Measurable Outcome
                </span>
                <p className="text-sm font-sans text-brand-bg/90 leading-relaxed">
                  {selectedProject.outcome}
                </p>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-brand-charcoal/10">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-6 py-3 border border-brand-charcoal/20 text-brand-charcoal text-xs font-bold tracking-widest uppercase hover:bg-brand-charcoal/5 transition-colors cursor-pointer"
                >
                  Close Case Study
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-8 py-3 bg-brand-primary hover:bg-brand-charcoal text-brand-bg text-xs font-bold tracking-[0.2em] uppercase transition-colors text-center"
                >
                  Discuss A Similar Website &rarr;
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
