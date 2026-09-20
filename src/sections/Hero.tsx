import React from 'react';
import { motion } from 'motion/react';
import { FadeUp } from '../components/AnimatedText';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenStartProject?: () => void;
}

export default function Hero({ onOpenStartProject }: HeroProps) {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center pt-28 pb-16 px-6 md:px-12 z-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center text-center">
        
        <FadeUp delay={0.2} className="mb-4">
          <span className="text-[11px] font-mono font-semibold tracking-[0.35em] uppercase text-brand-primary">
            Muhammad Shoaib
          </span>
        </FadeUp>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-[100px] lg:text-[125px] font-serif text-brand-charcoal leading-[0.92] tracking-normal mb-6">
            Hi, I'm <span className="font-script text-brand-primary text-[100px] md:text-[145px] font-normal tracking-normal capitalize lowercase relative top-4 md:top-8 ml-[-8px]">Shoaib</span>
          </h1>
        </motion.div>

        <FadeUp delay={0.6} className="max-w-3xl mb-8">
          <div className="inline-block px-4 py-1.5 bg-brand-primary/10 text-brand-primary text-[11px] md:text-xs font-mono tracking-widest uppercase mb-4 rounded-xs">
            Social Media Manager • Digital Marketing Specialist • Website Designer
          </div>
          <p className="text-lg md:text-2xl font-serif text-brand-charcoal/85 leading-relaxed max-w-2xl mx-auto">
            HELPING BRANDS BUILD <span className="italic text-brand-primary">HIGH-CONVERTING DIGITAL PRESENCES</span> & MEASURABLE GROWTH.
          </p>
        </FadeUp>

        <FadeUp delay={0.8} className="max-w-2xl mb-12">
          <p className="text-sm md:text-base text-brand-charcoal/70 leading-relaxed font-sans max-w-xl mx-auto">
            From comprehensive social media management and high-return advertising campaigns to modern, responsive website experiences designed to turn visitors into loyal clients.
          </p>
        </FadeUp>

        {/* Call to Actions */}
        <FadeUp delay={1} className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <button
            type="button"
            onClick={onOpenStartProject}
            className="bg-brand-primary text-brand-bg px-9 py-4 text-[11px] tracking-[0.2em] font-bold uppercase transition-all hover:bg-brand-charcoal hover:text-white flex items-center gap-2 shadow-sm cursor-pointer border border-brand-primary"
          >
            <span>Start A Project</span>
            <ArrowRight size={14} />
          </button>
          
          <a
            href="#work"
            className="border border-brand-charcoal/30 bg-white/60 px-8 py-4 text-[11px] tracking-[0.2em] font-bold uppercase text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-bg transition-all flex items-center gap-2"
          >
            View My Work &rarr;
          </a>
        </FadeUp>

        <FadeUp delay={1.2} className="mt-auto">
          <div className="flex flex-col items-center gap-6">
            <p className="text-[0.68rem] md:text-xs font-bold tracking-[0.25em] text-brand-charcoal/50 uppercase font-mono">
              Social Media Management • Digital Marketing • Paid Ads • Content • Website Design
            </p>
            <div className="flex flex-col items-center gap-1.5 animate-bounce">
              <span className="text-[0.62rem] font-bold tracking-[0.2em] text-brand-primary uppercase">Scroll to explore</span>
              <span className="text-brand-primary">&darr;</span>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
