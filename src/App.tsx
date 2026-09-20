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
      />
    </div>
  );
}
