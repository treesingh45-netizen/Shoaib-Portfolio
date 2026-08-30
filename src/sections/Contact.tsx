import React from 'react';
import { FadeUp, RevealText } from '../components/AnimatedText';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <section id="contact" className="relative w-full z-10 bg-brand-bg text-brand-charcoal overflow-hidden">
      
      {/* Page 12 - Contact */}
      <div className="py-24 md:py-32 px-6 md:px-12 border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="col-span-1 lg:col-span-4">
            <FadeUp>
              <h3 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-4">10 — Let's Connect</h3>
            </FadeUp>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif text-brand-charcoal leading-tight mb-8">
              <RevealText text="LET'S BUILD SOMETHING GREAT TOGETHER." />
            </h2>
            
            <FadeUp delay={0.4} className="mb-16">
              <h3 className="text-5xl md:text-7xl font-script text-brand-primary font-normal tracking-normal">
                Let's Create.
              </h3>
            </FadeUp>

            <FadeUp delay={0.6} className="max-w-3xl mb-16 space-y-6">
              <p className="text-sm md:text-base font-bold tracking-widest text-brand-charcoal/80 uppercase leading-loose">
                If you're looking for a dedicated Social Media Manager to manage your social media presence, create engaging content, build a consistent brand identity, and support your digital growth, let's talk.
              </p>
              <p className="text-sm md:text-base font-bold tracking-widest text-brand-charcoal/80 uppercase leading-loose">
                I'd be happy to discuss your business, your goals, and how I can help you build a stronger digital presence.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <FadeUp delay={0.8}>
                <h4 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-6 border-b border-brand-charcoal/10 pb-4">Contact Details</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="mailto:SHOAIBOP65@GMAIL.COM" className="text-base md:text-lg font-serif font-bold text-brand-charcoal hover:text-brand-primary transition-colors uppercase">
                      SHOAIBOP65@GMAIL.COM
                    </a>
                  </li>
                  <li>
                    <a href="tel:+923300258247" className="text-base md:text-lg font-serif font-bold text-brand-charcoal hover:text-brand-primary transition-colors uppercase">
                      +92 330 0258247
                    </a>
                  </li>
                  <li className="text-base md:text-lg font-serif font-bold text-brand-charcoal/70 uppercase pt-4">
                    MUHAMMAD SHOAIB<br/>
                    KARACHI, PAKISTAN
                  </li>
                </ul>
              </FadeUp>
              
              <FadeUp delay={1.0}>
                 <h4 className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-6 border-b border-brand-charcoal/10 pb-4">Start A Project</h4>
                 <form onSubmit={(e) => {
                   e.preventDefault();
                   const form = e.target as HTMLFormElement;
                   const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                   const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
                   const budget = (form.elements.namedItem('budget') as HTMLSelectElement).value;
                   const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
                   
                   const subject = encodeURIComponent(`New Project Inquiry from ${name}`);
                   const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nBudget: ${budget}\n\nProject Details:\n${message}`);
                   window.location.href = `mailto:shoaibop65@gmail.com?subject=${subject}&body=${body}`;
                 }} className="flex flex-col gap-4 w-full">
                  <input required type="text" name="name" placeholder="YOUR NAME" className="w-full bg-transparent border-b border-brand-charcoal/20 py-3 text-[11px] tracking-[0.1em] text-brand-charcoal placeholder:text-brand-charcoal/40 focus:outline-none focus:border-brand-primary transition-colors uppercase" />
                  <input required type="tel" name="phone" placeholder="PHONE NUMBER" className="w-full bg-transparent border-b border-brand-charcoal/20 py-3 text-[11px] tracking-[0.1em] text-brand-charcoal placeholder:text-brand-charcoal/40 focus:outline-none focus:border-brand-primary transition-colors uppercase" />
                  <select required name="budget" defaultValue="" className="w-full bg-transparent border-b border-brand-charcoal/20 py-3 text-[11px] tracking-[0.1em] text-brand-charcoal focus:outline-none focus:border-brand-primary transition-colors uppercase appearance-none cursor-pointer">
                    <option value="" disabled className="text-brand-charcoal/40">SELECT BUDGET</option>
                    <option value="Less than $500">Less than $500</option>
                    <option value="$500 - $1,000">$500 - $1,000</option>
                    <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                    <option value="$2,500+">$2,500+</option>
                  </select>
                  <textarea required name="message" placeholder="PROJECT DETAILS" rows={3} className="w-full bg-transparent border-b border-brand-charcoal/20 py-3 text-[11px] tracking-[0.1em] text-brand-charcoal placeholder:text-brand-charcoal/40 focus:outline-none focus:border-brand-primary transition-colors uppercase resize-none"></textarea>
                  <button type="submit" className="bg-brand-primary text-brand-bg px-8 py-4 mt-2 text-[11px] tracking-[0.2em] font-bold uppercase transition-all hover:bg-brand-charcoal w-full md:w-auto text-center flex items-center justify-center gap-2 border-none cursor-pointer">
                    Send Details &rarr;
                  </button>
                 </form>
              </FadeUp>
            </div>

            <FadeUp delay={1.2}>
              <div className="text-center md:text-left pt-12 border-t border-brand-charcoal/10">
                <h4 className="text-xl md:text-3xl font-serif text-brand-primary uppercase tracking-wider">
                  YOUR NEXT DIGITAL GROWTH STORY STARTS HERE.
                </h4>
              </div>
            </FadeUp>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 bg-brand-charcoal text-brand-bg/30 relative">
        <div className="overflow-hidden flex items-center h-8 mb-12 opacity-50">
          <div className="whitespace-nowrap flex gap-12 items-center animate-[scroll_30s_linear_infinite] text-[10px] tracking-[0.3em] uppercase font-bold">
            <span>Social Media Management • Content Strategy • Digital Marketing • Content Creation • Lead Generation • Meta Ads • Google Ads • UI Design</span>
            <span>Social Media Management • Content Strategy • Digital Marketing • Content Creation • Lead Generation • Meta Ads • Google Ads • UI Design</span>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-end border-t border-white/5 pt-8">
          <div className="flex flex-col mb-8 md:mb-0">
            <div className="text-[9px] tracking-[0.2em] font-semibold text-white/50 mb-1 uppercase">Location</div>
            <div className="text-xs text-white/80">Karachi, Pakistan</div>
          </div>
          <div className="flex gap-8 md:gap-16">
            <div className="flex flex-col">
              <div className="text-[9px] tracking-[0.2em] font-semibold text-white/50 mb-1 uppercase">Email</div>
              <div className="text-xs text-white/80">shoaibop65@gmail.com</div>
            </div>
            <div className="flex flex-col text-right">
              <div className="text-[9px] tracking-[0.2em] font-semibold text-white/50 mb-1 uppercase">Copyright</div>
              <div className="text-xs text-white/80">&copy; 2026 Muhammad Shoaib</div>
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
