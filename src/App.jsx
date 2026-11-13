import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import InteractiveTerminal from './components/InteractiveTerminal';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';

export default function App() {
  // Theme state: default to dark or read localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Modals & Panels state
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [externalFilter, setExternalFilter] = useState('');

  // Synchronize darkMode class on html root element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const showToast = (toastData) => {
    setToast(toastData);
  };

  const handleSelectSkillFilter = (skillName) => {
    setExternalFilter(skillName);
    // Smooth scroll down to projects section
    const el = document.getElementById('projects');
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
    showToast({
      type: 'info',
      message: `Filtering projects by: ${skillName}`
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0a0d14] dark:text-slate-100 transition-colors duration-300">
      
      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenResume={() => setIsResumeOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
        isTerminalOpen={isTerminalOpen}
      />

      {/* Main Sections */}
      <main>
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onShowToast={showToast}
          onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
        />

        <About
          onOpenResume={() => setIsResumeOpen(true)}
          onShowToast={showToast}
        />

        <Skills
          onSelectSkillFilter={handleSelectSkillFilter}
        />

        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
          externalFilter={externalFilter}
          onClearExternalFilter={() => setExternalFilter('')}
        />

        <Experience />

        <Testimonials />

        <Contact
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />

      {/* Back to top floating button */}
      <BackToTop />

      {/* Modals & Overlays */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onShowToast={showToast}
      />

      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onShowToast={showToast}
      />

      {/* Toast Notification Container */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

