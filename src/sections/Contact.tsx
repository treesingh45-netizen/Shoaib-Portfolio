import React from 'react';
import { FadeUp, RevealText } from '../components/AnimatedText';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ArrowRight, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import ProjectInquiryForm from '../components/ProjectInquiryForm';

interface ContactProps {
  onOpenStartProject?: () => void;
  onOpenAdmin?: () => void;
}

export default function Contact({ onOpenStartProject, onOpenAdmin }: ContactProps) {
  return (
    <section id="contact" className="relative w-full z-10 bg-brand-bg text-brand-charcoal overflow-hidden">
      
      {/* Page 12 - Contact */}
      <div className="py-24 md:py-32 px-6 md:px-12 border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12">
          
          {/* Left Column: Heading & Contact Details */}
          <div className="col-span-1 lg:col-span-4">
            <FadeUp>
              <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-brand-primary uppercase mb-4">
                10 — Let's Connect
              </h3>
            </FadeUp>
            
            <FadeUp delay={0.2} className="mb-10">
              <h4 className="text-4xl md:text-5xl font-serif text-brand-charcoal leading-tight uppercase mb-4">
                LET'S BUILD SOMETHING GREAT.
              </h4>
              <p className="text-4xl md:text-6xl font-script text-brand-primary font-normal">
                Together.
              </p>
            </FadeUp>

            <FadeUp delay={0.4} className="space-y-6 text-brand-charcoal/80 text-sm md:text-base font-sans leading-relaxed mb-12">
              <p>
                If you're looking for a dedicated Social Media Manager and Website Designer to manage your digital footprint, produce engaging content, launch paid campaigns, or build a modern business website, let's talk.
              </p>
              <p>
                I review every project personally and get back to you with strategic next steps.
              </p>
            </FadeUp>

            {/* Direct Contact List */}
            <FadeUp delay={0.6} className="space-y-6 pt-6 border-t border-brand-charcoal/10">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-brand-primary uppercase block mb-1">
                  Direct Email
                </span>
                <a
                  href="mailto:shoaibop65@gmail.com"
                  className="text-base md:text-lg font-serif font-bold text-brand-charcoal hover:text-brand-primary transition-colors flex items-center gap-2 uppercase"
                >
                  <Mail size={16} className="text-brand-primary" />
                  shoaibop65@gmail.com
                </a>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-brand-primary uppercase block mb-1">
                  Phone / WhatsApp
                </span>
                <a
                  href="https://wa.me/923300258247"
                  target="_blank"
                  rel="noreferrer"
                  className="text-base md:text-lg font-serif font-bold text-brand-charcoal hover:text-brand-primary transition-colors flex items-center gap-2 uppercase"
                >
                  <Phone size={16} className="text-brand-primary" />
                  +92 330 0258247
                </a>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-brand-primary uppercase block mb-1">
                  Location
                </span>
                <p className="text-base md:text-lg font-serif font-bold text-brand-charcoal/80 flex items-center gap-2 uppercase">
                  <MapPin size={16} className="text-brand-primary" />
                  Karachi, Pakistan
                </p>
              </div>

              {/* Quick Modal Launcher button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={onOpenStartProject}
                  className="w-full py-4 bg-brand-charcoal hover:bg-brand-primary text-brand-bg text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Open Full Project Form</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Embedded Start a Project Form */}
          <div className="col-span-1 lg:col-span-8">
            <FadeUp delay={0.3}>
              <ProjectInquiryForm />
            </FadeUp>
          </div>

        </div>
      </div>

      {/* Quote Banner */}
      <div className="py-16 px-6 md:px-12 bg-brand-charcoal text-brand-bg text-center border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h4 className="text-2xl md:text-4xl font-serif text-brand-primary uppercase tracking-wider mb-3">
              YOUR NEXT DIGITAL GROWTH STORY STARTS HERE.
            </h4>
            <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-white/60 uppercase">
              Consistent Strategy • Modern Design • Measurable Results
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-12 bg-brand-charcoal text-brand-bg/40 relative">
        {/* Animated Marquee */}
        <div className="overflow-hidden flex items-center h-8 mb-12 opacity-60">
          <div className="whitespace-nowrap flex gap-12 items-center animate-[scroll_30s_linear_infinite] text-[10px] tracking-[0.3em] uppercase font-mono font-bold">
            <span>Social Media Management • Content Strategy • Digital Marketing • Meta Ads • Google Ads • Website Design • Webflow • UI Design</span>
            <span>Social Media Management • Content Strategy • Digital Marketing • Meta Ads • Google Ads • Website Design • Webflow • UI Design</span>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center md:items-end border-t border-white/10 pt-8 gap-6 text-center md:text-left">
          <div className="flex flex-col">
            <div className="text-[9px] tracking-[0.2em] font-mono font-semibold text-white/50 mb-1 uppercase">
              Location
            </div>
            <div className="text-xs text-white/90">Karachi, Pakistan</div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex flex-col">
              <div className="text-[9px] tracking-[0.2em] font-mono font-semibold text-white/50 mb-1 uppercase">
                Email
              </div>
              <a href="mailto:shoaibop65@gmail.com" className="text-xs text-white/90 hover:text-brand-primary transition-colors">
                shoaibop65@gmail.com
              </a>
            </div>

            <div className="flex flex-col">
              <div className="text-[9px] tracking-[0.2em] font-mono font-semibold text-white/50 mb-1 uppercase">
                Direct WhatsApp
              </div>
              <a href="https://wa.me/923300258247" target="_blank" rel="noreferrer" className="text-xs text-white/90 hover:text-brand-primary transition-colors">
                +92 330 0258247
              </a>
            </div>

            {/* Admin Portal link */}
            <div className="flex flex-col">
              <div className="text-[9px] tracking-[0.2em] font-mono font-semibold text-white/50 mb-1 uppercase">
                Portal
              </div>
              <button
                onClick={onOpenAdmin}
                className="text-xs text-white/60 hover:text-brand-primary transition-colors flex items-center gap-1 cursor-pointer"
                title="Admin Inquiries Pipeline"
              >
                <Lock size={11} />
                <span>Admin Login</span>
              </button>
            </div>

            <div className="flex flex-col text-center md:text-right">
              <div className="text-[9px] tracking-[0.2em] font-mono font-semibold text-white/50 mb-1 uppercase">
                Copyright
              </div>
              <div className="text-xs text-white/80">&copy; 2026 Muhammad Shoaib. All rights reserved.</div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </footer>

    </section>
  );
}
