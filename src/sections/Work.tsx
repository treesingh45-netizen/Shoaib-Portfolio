import React from 'react';
import { FadeUp, RevealText } from '../components/AnimatedText';

const responsibilities = [
  "CONTENT PLANNING", "CREATIVE EXECUTION", "BRAND CONSISTENCY",
  "CONTENT CALENDAR MANAGEMENT", "COMMUNITY ENGAGEMENT",
  "AUDIENCE GROWTH", "PERFORMANCE MONITORING", "POSTING & SCHEDULING"
];

const contentTypes = [
  "SOCIAL MEDIA POSTS", "CAROUSEL CONTENT", "PROMOTIONAL CONTENT",
  "EDUCATIONAL CONTENT", "BRANDED CAMPAIGNS", "REELS",
  "SHORT-FORM VIDEO", "VIDEO ADS"
];

const processSteps = ["IDEA", "STRATEGY", "CREATE", "PUBLISH", "ANALYZE", "IMPROVE"];

const whyMe = [
  { title: "CREATIVE THINKING", desc: "I bring fresh creative ideas based on each brand, audience, and business objective." },
  { title: "STRATEGIC APPROACH", desc: "Every piece of content has a purpose — from awareness and engagement to leads and conversions." },
  { title: "CONSISTENCY", desc: "I focus on maintaining a professional and recognizable brand presence across platforms." },
  { title: "DATA-DRIVEN DECISIONS", desc: "Performance metrics help guide content and advertising optimization." },
  { title: "AI-POWERED WORKFLOW", desc: "I use modern AI tools to improve research, ideation, content creation, and workflow efficiency." },
  { title: "CLIENT-FOCUSED COMMUNICATION", desc: "Clear communication, reliability, and understanding the client's goals are central to my approach." }
];

interface WorkProps {
  onOpenStartProject?: () => void;
}

export default function Work({ onOpenStartProject }: WorkProps) {
  return (
    <section id="work" className="relative w-full py-24 md:py-32 px-6 md:px-12 z-10 bg-brand-charcoal text-brand-bg">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Page 10 - Content & Page Management */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-40 border-b border-brand-bg/10 pb-32">
          <div className="col-span-1 lg:col-span-4">
            <FadeUp>
              <h3 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-4">08 — Social Media Work</h3>
            </FadeUp>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-bg leading-tight mb-16">
              <RevealText text="MANAGING THE DETAILS THAT KEEP A BRAND MOVING." />
            </h2>
            
            <FadeUp delay={0.2} className="mb-12">
              <h4 className="text-sm font-bold tracking-[0.2em] text-brand-primary uppercase border-b border-brand-bg/20 pb-4">Social Media Pages I Manage</h4>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {responsibilities.map((item, index) => (
                <FadeUp key={index} delay={0.3 + index * 0.05}>
                  <div className="h-full border-t border-brand-bg/10 pt-4">
                    <span className="text-xs font-bold tracking-widest text-brand-bg/70 uppercase block">{item}</span>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.8} className="mb-24">
              <p className="text-lg md:text-xl text-brand-bg/60 leading-relaxed font-sans border-l-2 border-brand-primary pl-6 max-w-2xl">
                Every account is managed around the brand's identity, audience, goals, communication style, and performance.
              </p>
            </FadeUp>

            <FadeUp delay={0.9} className="mb-12">
              <h4 className="text-sm font-bold tracking-[0.2em] text-brand-primary uppercase border-b border-brand-bg/20 pb-4">Content Creation</h4>
            </FadeUp>

            <div className="flex flex-wrap gap-4 mb-20">
              {contentTypes.map((type, index) => (
                <FadeUp key={index} delay={1 + index * 0.05}>
                  <span className="inline-block px-5 py-3 border border-brand-bg/20 text-[10px] font-bold tracking-[0.15em] text-brand-bg/80 uppercase hover:bg-brand-bg hover:text-brand-charcoal transition-colors cursor-default">
                    {type}
                  </span>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={1.4}>
              <h4 className="text-xs font-bold tracking-[0.2em] text-brand-bg/40 uppercase mb-6">Process:</h4>
            </FadeUp>
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              {processSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <FadeUp delay={1.5 + index * 0.1}>
                    <span className="text-sm md:text-base font-bold tracking-widest text-brand-primary uppercase">{step}</span>
                  </FadeUp>
                  {index < processSteps.length - 1 && (
                    <FadeUp delay={1.55 + index * 0.1}>
                      <span className="text-brand-bg/30 font-serif">&rarr;</span>
                    </FadeUp>
                  )}
                </React.Fragment>
              ))}
            </div>

          </div>
        </div>

        {/* Page 11 - Why Work With Me */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12">
          <div className="col-span-1 lg:col-span-4">
            <FadeUp>
              <h3 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-4">09 — Why Shoaib</h3>
            </FadeUp>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-bg leading-tight mb-20">
              <RevealText text="WHY WORK WITH ME?" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-24">
              {whyMe.map((item, index) => (
                <FadeUp key={index} delay={0.2 + index * 0.1}>
                  <div className="relative pl-6 border-l border-brand-bg/20">
                    <div className="absolute w-2 h-2 bg-brand-primary rounded-full -left-[4.5px] top-2"></div>
                    <h4 className="text-lg md:text-xl font-bold tracking-wider text-brand-bg uppercase mb-4">{item.title}</h4>
                    <p className="text-sm md:text-base text-brand-bg/60 font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.8} className="text-center py-16 border-t border-b border-brand-bg/10">
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-brand-bg leading-tight mb-4 uppercase">
                Creativity Gets Attention.
              </h3>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-brand-primary leading-tight uppercase mb-8">
                Strategy Creates Results.
              </h3>
              <button
                type="button"
                onClick={onOpenStartProject}
                className="inline-flex items-center gap-2 bg-brand-primary text-brand-bg px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-brand-charcoal transition-colors cursor-pointer"
              >
                <span>Start A Project With Shoaib</span>
                &rarr;
              </button>
            </FadeUp>

          </div>
        </div>

      </div>
    </section>
  );
}
