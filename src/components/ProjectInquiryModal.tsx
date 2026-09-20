import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import ProjectInquiryForm from './ProjectInquiryForm';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectInquiryModal({ isOpen, onClose }: ProjectInquiryModalProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-charcoal/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-brand-bg border border-brand-charcoal/20 shadow-2xl p-6 sm:p-10 md:p-12 z-10 rounded-sm"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-brand-charcoal/10 transition-colors rounded-xs cursor-pointer z-20"
              aria-label="Close dialog"
            >
              <X size={24} />
            </button>

            {/* Form */}
            <ProjectInquiryForm isModal={true} onSuccess={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
