import React from 'react';
import { FadeUp, RevealText } from '../components/AnimatedText';
import { motion } from 'motion/react';

const experienceAreas = [
  "CLIENT MANAGEMENT", "CONTENT STRATEGY", "CAMPAIGN EXECUTION",
  "AUDIENCE TARGETING", "PERFORMANCE ANALYTICS", "LEAD GENERATION"
];

const campaignProcess = ["RESEARCH", "TARGET", "CREATE", "TEST", "OPTIMIZE", "SCALE"];

export default function Experience() {
  return (
    <section id="experience" className="relative w-full py-24 md:py-32 px-6 md:px-12 z-10 bg-brand-bg/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Page 08 - Experience & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-40 border-b border-brand-charcoal/10 pb-32">
          <div className="col-span-1 lg:col-span-4">
            <FadeUp>
              <h3 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-4">06 — Experience</h3>
            </FadeUp>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-charcoal leading-tight mb-12">
              <RevealText text="EXPERIENCE BUILT THROUGH PRACTICAL WORK." />
            </h2>
            
            <FadeUp delay={0.2} className="max-w-2xl mb-16">
              <p className="text-lg md:text-xl text-brand-charcoal/80 leading-relaxed font-sans mb-6">
                Experienced in managing client accounts, handling social media pages, and executing lead generation campaigns.
              </p>
              <p className="text-lg md:text-xl text-brand-charcoal/80 leading-relaxed font-sans">
                I focus on audience targeting, content strategy, campaign execution, ad optimization, performance analytics, and measurable growth.
              </p>
            </FadeUp>

            <div className="flex flex-wrap gap-3 mb-24">
              {experienceAreas.map((area, index) => (
                <FadeUp key={index} delay={index * 0.05}>
                  <span className="inline-block px-5 py-2 border border-brand-charcoal/20 text-[10px] font-bold tracking-[0.15em] text-brand-charcoal/80 uppercase hover:bg-brand-charcoal hover:text-brand-bg transition-colors cursor-default">
                    {area}
                  </span>
                </FadeUp>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <FadeUp><h4 className="text-2xl font-serif text-brand-primary mb-8 pb-4 border-b border-brand-charcoal/10">Internship</h4></FadeUp>
                <FadeUp delay={0.2} className="relative pl-6 border-l border-brand-charcoal/20">
                  <div className="absolute w-2 h-2 bg-brand-primary rounded-full -left-[4.5px] top-2"></div>
                  <h5 className="text-lg font-bold tracking-wider text-brand-charcoal uppercase mb-2">Emirac Digital — Calicut</h5>
                  <p className="text-brand-charcoal/70 leading-relaxed font-sans mb-4">
                    Internship at Emirac Digital based in Calicut, where I gained hands-on experience working with real client projects.
                  </p>
                  <p className="text-brand-charcoal/70 leading-relaxed font-sans">
                    This experience strengthened my practical understanding of digital marketing, client communication, content strategy, campaign execution, and professional workflows.
                  </p>
                </FadeUp>
              </div>

              <div>
                <FadeUp><h4 className="text-2xl font-serif text-brand-primary mb-8 pb-4 border-b border-brand-charcoal/10">Education</h4></FadeUp>
                <div className="space-y-8">
                  <FadeUp delay={0.2} className="relative pl-6 border-l-2 border-brand-primary bg-white p-6 rounded-sm border border-brand-charcoal/10 shadow-xs">
                    <div className="absolute w-2.5 h-2.5 bg-brand-primary rounded-full -left-[5px] top-6 ring-4 ring-brand-bg"></div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-widest bg-brand-primary/10 text-brand-primary font-semibold rounded-xs">
                        Currently Studying
                      </span>
                    </div>
                    <h5 className="text-lg md:text-xl font-serif font-bold text-brand-charcoal uppercase mb-1">
                      Bachelor of Science in Computer Science (BSCS)
                    </h5>
                    <p className="text-xs font-bold tracking-widest text-brand-primary uppercase mb-3">
                      University of Karachi, Karachi
                    </p>
                    <p className="text-sm text-brand-charcoal/75 leading-relaxed font-sans">
                      Specializing in computing systems, algorithmic problem solving, software engineering principles, and modern web architectures.
                    </p>
                  </FadeUp>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 09 - Recent Work / Case Study */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12">
          <div className="col-span-1 lg:col-span-4">
            <FadeUp>
              <h3 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-4">07 — Recent Project</h3>
            </FadeUp>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-charcoal leading-tight mb-16">
              <RevealText text="LEAD GENERATION CAMPAIGN" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <FadeUp delay={0.2} className="bg-white p-8 border border-brand-charcoal/10 rounded-sm shadow-sm">
                <h4 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-4">Campaign Objective</h4>
                <p className="text-lg md:text-xl text-brand-charcoal font-serif leading-relaxed">
                  Drive high-quality messaging conversations while maintaining a low cost per result.
                </p>
              </FadeUp>
              
              <FadeUp delay={0.4} className="bg-white p-8 border border-brand-charcoal/10 rounded-sm shadow-sm">
                <h4 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-4">Strategy</h4>
                <p className="text-base text-brand-charcoal/80 font-sans leading-relaxed">
                  Executed a Meta messaging and engagement campaign with audience-focused targeting and optimized creatives.
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={0.5}>
              <h4 className="text-sm font-bold tracking-[0.2em] text-brand-charcoal uppercase mb-8 border-b border-brand-charcoal/10 pb-4">Continuously Monitored</h4>
            </FadeUp>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
              {["COST PER CONVERSATION", "REACH", "IMPRESSIONS", "ENGAGEMENT", "AD SET PERFORMANCE"].map((metric, index) => (
                <FadeUp key={index} delay={0.6 + index * 0.1}>
                  <div className="h-full border-l-2 border-brand-primary pl-4 flex items-center">
                    <span className="text-xs font-bold tracking-widest text-brand-charcoal/70 uppercase">{metric}</span>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={1.1} className="mb-20">
              <p className="text-lg md:text-xl text-brand-charcoal/80 leading-relaxed font-sans border-l-2 border-brand-primary pl-6 max-w-2xl">
                Winning ad sets were scaled while underperforming creatives were optimized to improve campaign efficiency.
              </p>
            </FadeUp>

            <FadeUp delay={1.2}>
              <h4 className="text-sm font-bold tracking-[0.2em] text-brand-charcoal uppercase mb-8 border-b border-brand-charcoal/10 pb-4">Campaign Process</h4>
            </FadeUp>
            
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              {campaignProcess.map((step, index) => (
                <React.Fragment key={index}>
                  <FadeUp delay={1.3 + index * 0.1}>
                    <span className="text-sm md:text-base font-bold tracking-widest text-brand-primary uppercase">{step}</span>
                  </FadeUp>
                  {index < campaignProcess.length - 1 && (
                    <FadeUp delay={1.35 + index * 0.1}>
                      <span className="text-brand-charcoal/30 font-serif">&rarr;</span>
                    </FadeUp>
                  )}
                </React.Fragment>
              ))}
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
