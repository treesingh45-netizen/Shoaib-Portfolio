import React from 'react';
import { FadeUp, RevealText } from '../components/AnimatedText';

interface IntroProps {
  onOpenStartProject?: () => void;
}

export default function Intro({ onOpenStartProject }: IntroProps) {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 px-6 md:px-12 z-10 bg-brand-bg/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Page 02 - Introduction & Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-32 md:mb-48 border-b border-brand-charcoal/10 pb-32">
          <div className="col-span-1 lg:col-span-4">
            <FadeUp>
              <h3 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-4">About My Work</h3>
            </FadeUp>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-charcoal leading-tight mb-12">
              <RevealText text="CREATIVITY WITH A STRATEGIC PURPOSE." />
            </h2>
            <FadeUp delay={0.2} className="max-w-2xl mb-16">
              <p className="text-lg md:text-xl text-brand-charcoal/80 leading-relaxed font-sans mb-6">
                I am a creative and results-driven Social Media Manager and Digital Marketing Specialist with over 4 years of experience in social media marketing, content creation, digital advertising, and modern website design.
              </p>
              <p className="text-lg md:text-xl text-brand-charcoal/80 leading-relaxed font-sans">
                I help businesses strengthen their online presence through strategic content, consistent brand communication, audience engagement, and performance-focused marketing.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              <FadeUp delay={0.3}>
                <div className="p-6 bg-white border border-bronze rounded-xl flex flex-col items-center justify-center">
                  <span className="font-serif text-3xl md:text-4xl text-brand-primary mb-2">4+</span>
                  <span className="text-[8px] font-bold tracking-widest uppercase text-brand-charcoal/60 text-center">Years Exp.</span>
                </div>
              </FadeUp>
              <FadeUp delay={0.4}>
                <div className="p-6 bg-white border border-bronze rounded-xl flex flex-col items-center justify-center">
                  <span className="font-serif text-3xl md:text-4xl text-brand-primary mb-2">400+</span>
                  <span className="text-[8px] font-bold tracking-widest uppercase text-brand-charcoal/60 text-center">Projects</span>
                </div>
              </FadeUp>
              <FadeUp delay={0.5}>
                <div className="p-6 bg-white border border-bronze rounded-xl flex flex-col items-center justify-center">
                  <span className="font-serif text-3xl md:text-4xl text-brand-primary mb-2">10M</span>
                  <span className="text-[8px] font-bold tracking-widest uppercase text-brand-charcoal/60 text-center">Impressions</span>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.6}>
              <h4 className="text-xl md:text-2xl font-serif italic text-brand-charcoal border-l-2 border-brand-primary pl-6">
                "I DON'T JUST MANAGE SOCIAL MEDIA — I HELP BRANDS GROW THROUGH IT."
              </h4>
            </FadeUp>
          </div>
        </div>

        {/* Page 03 - About Me */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="col-span-1 lg:col-span-4">
            <FadeUp>
              <h3 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-4">01 — About Me</h3>
            </FadeUp>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-charcoal leading-tight mb-12">
              <RevealText text="A CREATIVE MIND WITH A DIGITAL-FIRST APPROACH." />
            </h2>
            <FadeUp delay={0.2} className="max-w-3xl space-y-6 text-lg text-brand-charcoal/80 leading-relaxed font-sans mb-16">
              <p>
                I am a passionate Digital Growth Specialist and Creative Strategist with experience in helping brands grow through innovative marketing, creative content, AI-powered solutions, and impactful digital experiences.
              </p>
              <p>
                I specialize in social media marketing, content creation, website development, paid advertising, and brand positioning that drive real engagement and measurable results.
              </p>
              <p>
                With a strong focus on creativity and performance, I combine modern design, smart marketing strategies, and data-driven insights to build brands that stand out in the digital world.
              </p>
              <p>
                I am constantly learning, adapting, and exploring new technologies to deliver high-quality solutions that help businesses scale faster and smarter.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="inline-block px-8 py-4 bg-brand-charcoal text-brand-bg rounded-sm">
                <p className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase">
                  Creative. Curious. Strategic. Always Learning.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>

      </div>
    </section>
  );
}
