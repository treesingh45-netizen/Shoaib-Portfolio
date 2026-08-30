import React from 'react';
import { motion } from 'motion/react';
import { FadeUp } from '../components/AnimatedText';

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center pt-24 pb-12 px-6 md:px-12 z-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center text-center">
        
        <FadeUp delay={0.2} className="mb-6">
          <span className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-primary">
            Muhammad Shoaib
          </span>
        </FadeUp>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-[100px] lg:text-[120px] font-serif text-brand-charcoal leading-[0.9] tracking-normal mb-6">
            Hi, I'm <span className="font-script text-brand-primary text-[100px] md:text-[140px] font-normal tracking-normal capitalize lowercase relative top-4 md:top-8 ml-[-10px]">Shoaib</span>
          </h1>
        </motion.div>

        <FadeUp delay={0.6} className="max-w-3xl mb-8">
          <p className="text-lg md:text-xl font-sans text-brand-charcoal/80 leading-relaxed max-w-xl mx-auto">
            SOCIAL MEDIA MANAGER & DIGITAL MARKETING SPECIALIST HELPING BRANDS BUILD <span className="italic font-serif">STRONGER DIGITAL PRESENCES</span>.
          </p>
        </FadeUp>

        <FadeUp delay={0.8} className="max-w-2xl mb-12 hidden">
          <p className="text-base md:text-lg text-brand-charcoal/70 leading-relaxed font-sans">
            I create engaging social media content, manage digital platforms, develop marketing strategies, and help businesses improve their online visibility and audience engagement.
          </p>
        </FadeUp>

        <FadeUp delay={1} className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <a href="#work" className="bg-brand-primary text-brand-bg px-8 py-4 text-[11px] tracking-[0.2em] font-bold uppercase transition-all hover:bg-brand-charcoal flex items-center gap-2">
            View My Work &rarr;
          </a>
          <a href="#contact" className="border border-bronze px-8 py-4 text-[11px] tracking-[0.2em] font-bold uppercase text-brand-charcoal hover:bg-brand-primary/10 transition-colors flex items-center gap-2">
            Let's Work Together &rarr;
          </a>
        </FadeUp>

        <FadeUp delay={1.2} className="mt-auto">
          <div className="flex flex-col items-center gap-8">
            <p className="text-[0.65rem] md:text-xs font-bold tracking-[0.3em] text-brand-charcoal/50 uppercase">
              Social Media • Content • Digital Marketing • Paid Ads
            </p>
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-[0.6rem] font-bold tracking-[0.2em] text-brand-primary uppercase">Scroll to explore</span>
              <span className="text-brand-primary">&darr;</span>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
