/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navigation from './components/Navigation';
import BackgroundParticles from './components/BackgroundParticles';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Services from './sections/Services';
import WebsiteDesignExperience from './sections/WebsiteDesignExperience';
import Experience from './sections/Experience';
import Work from './sections/Work';
import Contact from './sections/Contact';

export default function App() {
  return (
    <div className="relative w-full min-h-screen bg-brand-bg bg-editorial-gradient font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      <BackgroundParticles />
      <Navigation />
      
      <main className="relative z-10 w-full flex flex-col">
        <Hero />
        <Intro />
        <Services />
        <WebsiteDesignExperience />
        <Experience />
        <Work />
        <Contact />
      </main>
    </div>
  );
}
