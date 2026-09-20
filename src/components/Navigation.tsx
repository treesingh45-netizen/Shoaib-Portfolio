import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface NavigationProps {
  onOpenStartProject?: () => void;
}

export default function Navigation({ onOpenStartProject }: NavigationProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Websites', href: '#websites' },
    { label: 'Experience', href: '#experience' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 flex justify-between items-center px-6 md:px-12 ${
          isScrolled ? 'py-4 bg-brand-bg/95 backdrop-blur-md shadow-xs border-b border-brand-charcoal/10' : 'py-7 bg-transparent'
        }`}
      >
        <a href="#home" className="flex items-center gap-2 group">
          <span className="font-serif text-xl md:text-2xl tracking-[0.25em] font-semibold uppercase text-brand-charcoal group-hover:text-brand-primary transition-colors">
            Shoaib
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
        </a>

        {/* Desktop Nav items */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-charcoal/70 hover:text-brand-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Right Action */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenStartProject}
            className="inline-flex items-center justify-center gap-2 bg-brand-primary text-brand-bg text-[10px] tracking-[0.2em] font-bold uppercase px-6 py-2.5 hover:bg-brand-charcoal hover:text-white transition-all duration-300 shadow-xs cursor-pointer border border-brand-primary"
          >
            <span>Start a Project</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenStartProject}
            className="text-[9px] font-bold uppercase tracking-wider bg-brand-primary text-brand-bg px-3.5 py-2 cursor-pointer"
          >
            Start Project
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-brand-charcoal focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[70px] z-30 bg-brand-bg border-b border-brand-charcoal/15 shadow-xl p-6 flex flex-col gap-4 sm:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold tracking-[0.2em] uppercase text-brand-charcoal/80 hover:text-brand-primary py-2 border-b border-brand-charcoal/10"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenStartProject?.();
              }}
              className="mt-2 w-full py-3.5 bg-brand-primary text-brand-bg text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
