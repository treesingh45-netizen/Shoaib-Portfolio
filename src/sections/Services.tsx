import React from 'react';
import { FadeUp, RevealText } from '../components/AnimatedText';
import { motion } from 'motion/react';

const servicesList = [
  {
    title: "SOCIAL MEDIA MANAGEMENT",
    desc: "Managing daily social media presence, content planning, publishing, engagement, and account consistency."
  },
  {
    title: "CONTENT STRATEGY",
    desc: "Developing content ideas and strategies based on the brand, audience, goals, and platform."
  },
  {
    title: "CONTENT CREATION",
    desc: "Creating engaging social media posts, carousels, reels, promotional content, and branded visuals."
  },
  {
    title: "COMMUNITY MANAGEMENT",
    desc: "Monitoring engagement, responding to audiences, and maintaining an active brand presence."
  },
  {
    title: "AUDIENCE GROWTH",
    desc: "Using organic strategies and targeted campaigns to attract relevant audiences."
  },
  {
    title: "PAID ADVERTISING",
    desc: "Creating, monitoring, and optimizing Meta and Google advertising campaigns."
  },
  {
    title: "LEAD GENERATION",
    desc: "Developing campaigns focused on generating quality enquiries, conversations, and potential customers."
  },
  {
    title: "SOCIAL MEDIA ANALYTICS",
    desc: "Tracking reach, impressions, engagement, audience growth, cost per result, and overall performance."
  }
];

const skillsList = [
  "SOCIAL MEDIA MANAGEMENT", "CONTENT STRATEGY", "DIGITAL MARKETING", "CONTENT CREATION",
  "LEAD GENERATION", "META ADS", "GOOGLE ADS", "GRAPHIC DESIGN", "VIDEO EDITING",
  "AI CONTENT CREATION", "COMMUNITY MANAGEMENT", "AUDIENCE GROWTH", "ANALYTICS & REPORTING",
  "SEO RESEARCH", "CAMPAIGN OPTIMIZATION", "BRAND DEVELOPMENT"
];

const websiteServices = [
  "CUSTOM WEBSITE DESIGN", "LANDING PAGE CREATION", "UI/UX DESIGN", "RESPONSIVE WEB DESIGN",
  "WIREFRAME & PROTOTYPE DEVELOPMENT", "NO-CODE WEBSITE BUILDING", "CONVERSION-FOCUSED DESIGN",
  "WEBSITE OPTIMIZATION"
];

const platforms = ["INSTAGRAM", "FACEBOOK", "META ADS", "TIKTOK", "LINKEDIN", "GOOGLE ADS"];
const tools = ["PHOTOSHOP", "CANVA", "HIGGSFIELD AI", "FILMORA", "CAPCUT", "CHATGPT"];
const webTools = ["WORDPRESS", "WEBFLOW", "WIX STUDIO", "FIGMA", "ANTIGRAVITY", "CLAUDE"];

interface ServicesProps {
  onOpenStartProject?: () => void;
}

export default function Services({ onOpenStartProject }: ServicesProps) {
  return (
    <section id="services" className="relative w-full py-24 md:py-32 px-6 md:px-12 z-10 bg-brand-charcoal text-brand-bg">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Page 04 - Social Media Services */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-40 border-b border-brand-bg/10 pb-32">
          <div className="col-span-1 lg:col-span-4">
            <FadeUp>
              <h3 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-4">02 — What I Do</h3>
            </FadeUp>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-bg leading-tight mb-16">
              <RevealText text="SOCIAL MEDIA MANAGEMENT THAT BUILDS CONSISTENCY AND GROWTH." />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {servicesList.map((service, index) => (
                <FadeUp key={index} delay={index * 0.1}>
                  <div className="group border-t border-brand-bg/20 pt-6 hover:border-brand-primary transition-colors">
                    <h4 className="text-lg md:text-xl font-serif font-bold text-brand-bg mb-4 group-hover:text-brand-primary transition-colors">{service.title}</h4>
                    <p className="text-sm md:text-base text-brand-bg/60 font-sans leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>

        {/* Page 05 - Skills */}
        <div className="mb-40 border-b border-brand-bg/10 pb-32">
          <FadeUp>
            <h3 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-4 text-center">03 — Skills</h3>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-bg leading-tight mb-20 text-center max-w-3xl mx-auto">
              THE SKILLS BEHIND MY WORK.
            </h2>
          </FadeUp>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
            {skillsList.map((skill, index) => (
              <FadeUp key={index} delay={index * 0.05} className="flex">
                <span className="text-xl md:text-3xl lg:text-4xl font-serif text-transparent text-stroke-1 hover:text-brand-bg transition-colors cursor-default uppercase">
                  {skill}
                </span>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Page 06 - Platforms & Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-40 border-b border-brand-bg/10 pb-32">
          <div className="col-span-1 lg:col-span-4">
            <FadeUp>
              <h3 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-4">04 — My Digital Toolkit</h3>
            </FadeUp>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-bg leading-tight mb-16">
              <RevealText text="THE PLATFORMS AND TOOLS I WORK WITH." />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
              <div>
                <FadeUp><h4 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-8 border-b border-brand-bg/20 pb-4">Platforms</h4></FadeUp>
                <div className="flex flex-col gap-4">
                  {platforms.map((item, index) => (
                    <FadeUp key={index} delay={index * 0.1}>
                      <span className="text-2xl md:text-3xl font-serif text-brand-bg/80 hover:text-brand-primary hover:translate-x-4 transition-all duration-300 block w-max cursor-default uppercase">
                        {item}
                      </span>
                    </FadeUp>
                  ))}
                </div>
              </div>
              <div>
                <FadeUp><h4 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-8 border-b border-brand-bg/20 pb-4">Tools</h4></FadeUp>
                <div className="flex flex-col gap-4">
                  {tools.map((item, index) => (
                    <FadeUp key={index} delay={index * 0.1}>
                      <span className="text-2xl md:text-3xl font-serif text-brand-bg/80 hover:text-brand-primary hover:translate-x-4 transition-all duration-300 block w-max cursor-default uppercase">
                        {item}
                      </span>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </div>

            <FadeUp delay={0.4}>
              <p className="text-lg md:text-xl text-brand-bg/60 leading-relaxed font-sans border-l-2 border-brand-primary pl-6">
                I combine creative software, AI tools, social platforms, advertising platforms, and analytics tools to create efficient and professional digital marketing workflows.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Page 07 - Website & Digital Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12">
          <div className="col-span-1 lg:col-span-4">
            <FadeUp>
              <h3 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-4">05 — Website Design</h3>
            </FadeUp>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-bg leading-tight mb-16">
              <RevealText text="I ALSO BUILD DIGITAL EXPERIENCES." />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
              <div>
                <FadeUp><h4 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-8 border-b border-brand-bg/20 pb-4">Tools</h4></FadeUp>
                <div className="flex flex-col gap-4">
                  {webTools.map((item, index) => (
                    <FadeUp key={index} delay={index * 0.1}>
                      <span className="text-2xl md:text-3xl font-serif text-brand-bg/80 hover:text-brand-primary hover:translate-x-4 transition-all duration-300 block w-max cursor-default uppercase">
                        {item}
                      </span>
                    </FadeUp>
                  ))}
                </div>
              </div>
              <div>
                <FadeUp><h4 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-8 border-b border-brand-bg/20 pb-4">Services</h4></FadeUp>
                <div className="flex flex-col gap-4">
                  {websiteServices.map((item, index) => (
                    <FadeUp key={index} delay={index * 0.1}>
                      <span className="text-lg md:text-xl font-serif text-brand-bg/70 hover:text-brand-bg transition-colors block w-max cursor-default uppercase">
                        {item}
                      </span>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </div>

            <FadeUp delay={0.6}>
              <div className="text-center md:text-left py-12 px-8 bg-brand-bg/5 border border-brand-bg/10 rounded-sm">
                <h4 className="text-xl md:text-2xl font-serif text-brand-primary uppercase tracking-wider leading-relaxed mb-6">
                  YOUR SOCIAL MEDIA BRINGS PEOPLE IN.<br />
                  <span className="text-brand-bg">YOUR WEBSITE GIVES THEM A REASON TO STAY.</span>
                </h4>
                <a
                  href="#websites"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-brand-primary/60 text-brand-primary hover:text-white hover:border-brand-primary text-[10px] tracking-[0.2em] font-bold uppercase transition-colors"
                >
                  Explore Website Design Experience &darr;
                </a>
              </div>
            </FadeUp>
          </div>
        </div>

      </div>
    </section>
  );
}
