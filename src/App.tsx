/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import BackgroundParticles from './components/BackgroundParticles';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Services from './sections/Services';
import WebsiteDesignExperience from './sections/WebsiteDesignExperience';
import Experience from './sections/Experience';
import Work from './sections/Work';
import Contact from './sections/Contact';
import ProjectInquiryModal from './components/ProjectInquiryModal';
import AdminPortalModal from './components/AdminPortalModal';

export default function App() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const generateDefaultCanvasFavicon = (): string | null => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Rounded dark charcoal square background
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.roundRect(0, 0, 64, 64, 12);
      ctx.fill();

      // Inner bronze border
      ctx.strokeStyle = '#9b6738';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(4, 4, 56, 56, 9);
      ctx.stroke();

      // Serif "S" monogram
      ctx.fillStyle = '#faf8f3';
      ctx.font = 'bold 38px Georgia, "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('S', 28, 35);

      // Bronze dot
      ctx.fillStyle = '#9b6738';
      ctx.beginPath();
      ctx.arc(46, 42, 4.5, 0, Math.PI * 2);
      ctx.fill();

      return canvas.toDataURL('image/png');
    } catch {
      return null;
    }
  };

  const applyFaviconToHead = (url: string, isCustom: boolean) => {
    const resolvedHref = !isCustom ? generateDefaultCanvasFavicon() || url : url;
    let iconLink = document.getElementById('site-favicon') as HTMLLinkElement | null;
    if (!iconLink) {
      iconLink = document.createElement('link');
      iconLink.id = 'site-favicon';
      iconLink.rel = 'icon';
      document.head.appendChild(iconLink);
    }
    if (resolvedHref.startsWith('data:image/png')) {
      iconLink.type = 'image/png';
    } else if (resolvedHref.endsWith('.svg') || resolvedHref.startsWith('data:image/svg')) {
      iconLink.type = 'image/svg+xml';
    } else {
      iconLink.removeAttribute('type');
    }
    iconLink.href = resolvedHref;

    const appleLink = document.getElementById('site-apple-icon') as HTMLLinkElement | null;
    if (appleLink) {
      appleLink.href = resolvedHref;
    }
  };

  // Load saved branding/favicon configuration for browser tab only
  useEffect(() => {
    // Immediately apply canvas PNG fallback for maximum browser tab compatibility
    applyFaviconToHead('/favicon.svg', false);

    fetch('/api/branding')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.hasCustomFavicon && data.faviconUrl) {
          applyFaviconToHead(data.faviconUrl, true);
        }
      })
      .catch(() => {
        // Keep default canvas/SVG favicon
      });
  }, []);

  // Hash listener to allow direct link triggering (e.g. #start-project, #admin)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#start-project' || hash === '#inquiry') {
        setIsProjectModalOpen(true);
      } else if (hash === '#admin') {
        setIsAdminModalOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openProjectModal = () => {
    setIsProjectModalOpen(true);
  };

  const openAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-brand-bg bg-editorial-gradient font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      <BackgroundParticles />
      
      {/* Top Navigation with prominent Start a Project CTA */}
      <Navigation onOpenStartProject={openProjectModal} />
      
      <main className="relative z-10 w-full flex flex-col">
        <Hero onOpenStartProject={openProjectModal} />
        <Intro onOpenStartProject={openProjectModal} />
        <Services onOpenStartProject={openProjectModal} />
        <WebsiteDesignExperience onOpenStartProject={openProjectModal} />
        <Experience />
        <Work onOpenStartProject={openProjectModal} />
        <Contact onOpenStartProject={openProjectModal} onOpenAdmin={openAdminModal} />
      </main>

      {/* Start A Project Dedicated Modal */}
      <ProjectInquiryModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          if (window.location.hash === '#start-project' || window.location.hash === '#inquiry') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
      />

      {/* Admin Management Modal */}
      <AdminPortalModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          if (window.location.hash === '#admin') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        onBrandingUpdated={(newUrl, isCustom) => {
          applyFaviconToHead(newUrl, isCustom);
        }}
      />
    </div>
  );
}
