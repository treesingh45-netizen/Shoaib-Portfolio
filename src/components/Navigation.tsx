import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-between items-center px-6 md:px-12 ${
        isScrolled ? 'py-4 bg-brand-bg/90 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'
      }`}
    >
      <div className="font-serif text-xl tracking-[0.3em] font-semibold uppercase text-brand-charcoal">
        Shoaib
      </div>

      <nav className="hidden lg:flex items-center gap-10">
        {['Home', 'About', 'Services', 'Experience', 'Work'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[10px] font-medium tracking-[0.2em] uppercase opacity-50 hover:opacity-100 hover:text-brand-primary transition-colors duration-300"
          >
            {item}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        className="hidden md:inline-flex items-center justify-center border border-brand-charcoal bg-transparent text-brand-charcoal text-[10px] tracking-[0.15em] font-semibold uppercase px-6 py-2 hover:bg-brand-charcoal hover:text-brand-bg transition-all duration-300"
      >
        Let's Work Together &rarr;
      </a>

      {/* Mobile Menu Toggle (simplified for now) */}
      <button className="lg:hidden text-brand-charcoal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </motion.header>
  );
}
