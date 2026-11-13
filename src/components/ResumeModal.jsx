import React, { useEffect } from 'react';
import { X, Printer, Download, Copy, Check, Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Trophy, FileText, Code2, Github } from 'lucide-react';
import { personalInfo, experiences, education, certifications, sportsAchievements, projects, skillCategories } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose, onShowToast }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const generatePlainTextResume = () => {
    return `
==================================================
ANKIT KUMAR
${personalInfo.title}
Phone: ${personalInfo.phone} | Email: ${personalInfo.email}
GitHub: ${personalInfo.socials.github} | LinkedIn | Codolio | LeetCode
Location: ${personalInfo.location}
==================================================

OBJECTIVE
${personalInfo.bio}

EDUCATION
• B.E Computer Science & Engineering
  Chandigarh University, Mohali, Punjab (Expected Graduation: 2027)
  CGPA: 7.08 / 10

• Senior Secondary (Science Stream)
  S.R Public School, Patna, Bihar
  Percentage: 71%

TECHNICAL SKILLS
• Programming Languages: C, C++, Java, Python
• Web Development: HTML, CSS, JavaScript, React, Node.js, MERN Stack
• Databases: MySQL, MongoDB
• Tools & Platforms: Git, GitHub, Visual Studio Code, Postman, MySQL Workbench, AWS (S3), API, Vercel
• Core Concepts: Data Structures & Algorithms, OOPs, Operating Systems, Computer Networks

SOFT SKILLS
• Leadership & Team Collaboration
• Problem-Solving & Creative Decision Making
• Adaptability & Growth-Oriented Mindset
• Effective Communication & Interpersonal Skills

PROJECTS
• Research Paper on Design of a Secure Terrestrial Free Space Optics Transmission Link Using OCDMA Code
  - Designed secure FSO link with OFDM/OCDMA and ICSM codes for atmospheric resilience in next-gen networks.
  - Implemented zero cross-correlation ICSM-OCDMA to eliminate PIIN and MAI for enhanced privacy.
  - Developed 4-QAM OFDM modulation achieving BER <10^-9 up to 12.5 km clear, 1.9 km low fog.
  - Simulated performance with real meteorological data, optimizing ROP to -9.19 dBm.
  - Analyzed link metrics across weather conditions for high-data wireless front-haul validation.

• Predicting Energy Consumption in Smart Home
  - Developed LSTM models for short-term smart home energy forecasting with MAPE <25% on IoT datasets.
  - Implemented Random Forest and Gradient Boosting achieving R²=0.985 and RMSE=0.245 for appliance prediction.
  - Integrated Raspberry Pi sensors for real-time monitoring and anomaly detection in consumption patterns.
  - Applied CNN-LSTM hybrid to reduce errors by 10% under weather variations.
  - Created dashboards enabling 20-30% energy savings through predictive scheduling.

EXPERIENCE
• Internship at Bhuma Infotech Pvt. Ltd. — Material Management System
  - Led end-to-end development, including frontend (React.js UI) and backend (middleware, RESTful APIs, secure database connections).
  - Integrated and optimized the system to deliver a seamless, secure, and responsive user experience across devices.

CERTIFICATIONS
• Samsung Innovation Campus - Artificial Intelligence (Certificate of Completion)
• Certificate of Merit in Solidity Smart Contract Programming for Ethereum Blockchain by Infosys Springboard
• Certificate of Merit in Design Thinking by LinkedIn

SPORTS ACHIEVEMENTS
• National-Level Baseball Player — Represented Bihar at national-level competitions
• National-Level Softball Player — Represented Bihar at national-level competitions
• District-Level Cricketer — Represented Sheikhpura, Bihar in district-level cricket competitions

ACHIEVEMENTS AND EXTRACURRICULARS
• Member of IEEE Club, Chandigarh University
• Social internship from Chandigarh University
==================================================
`;
  };

  const handleDownloadTxt = () => {
    const text = generatePlainTextResume();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ankit_Kumar_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast?.({ type: 'success', message: 'Resume text file downloaded!' });
  };

  const handleCopyText = () => {
    const text = generatePlainTextResume();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      onShowToast?.({ type: 'success', message: 'Resume copied to clipboard!' });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 sticky top-0 z-10 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
              Curriculum Vitae — Ankit Kumar
            </h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
              Fresher • 2027 Grad
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              title="Download as Plain Text"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download .txt</span>
            </button>
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors"
              title="Copy to Clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-slate-800 dark:text-slate-200 text-left" id="printable-resume">
          
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5 flex-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
                {personalInfo.name}
              </h1>
              <p className="text-base font-semibold text-sky-600 dark:text-sky-400">
                {personalInfo.title}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                {personalInfo.bio}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-sky-500" />
                  {personalInfo.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-500" />
                  {personalInfo.email}
                </span>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:underline"
                >
                  <Github className="w-3.5 h-3.5 text-sky-500" />
                  github.com/Ankit372004
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-500" />
                  {personalInfo.location}
                </span>
              </div>
            </div>

            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-2 ring-slate-200 dark:ring-slate-700 shadow-md flex-shrink-0">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              <GraduationCap className="w-4 h-4 text-sky-500" />
              Education
            </h2>
            <div className="space-y-4 pt-1">
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {edu.degree}
                    </h3>
                    {edu.period ? (
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{edu.period}</span>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <p className="text-sky-600 dark:text-sky-400 font-medium">{edu.institution}</p>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{edu.grade}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              <Code2 className="w-4 h-4 text-sky-500" />
              Technical & Soft Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">Programming Languages:</span>
                <span className="text-slate-600 dark:text-slate-300">C, C++, Java, Python</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">Web Development:</span>
                <span className="text-slate-600 dark:text-slate-300">HTML, CSS, JavaScript, React, Node.js, MERN Stack</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">Databases & Tools:</span>
                <span className="text-slate-600 dark:text-slate-300">MySQL, MongoDB, Git, GitHub, VS Code, Postman, AWS (S3), Vercel</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">Core Fundamentals:</span>
                <span className="text-slate-600 dark:text-slate-300">Data Structures & Algorithms, OOPs, Operating Systems, Computer Networks</span>
              </div>
            </div>
          </div>

          {/* Experience / Internship */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              <Briefcase className="w-4 h-4 text-sky-500" />
              Internship Experience
            </h2>

            <div className="space-y-4 pt-1">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                        {exp.role} <span className="font-normal text-slate-500">at</span> {exp.company}
                      </h3>
                      <p className="text-xs text-sky-600 dark:text-sky-400 font-medium">{exp.location}</p>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mt-1 sm:mt-0 w-fit">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {exp.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-900/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Projects */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              <FileText className="w-4 h-4 text-sky-500" />
              Academic & Research Projects
            </h2>
            <div className="space-y-5 pt-1">
              {projects.map((proj, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {proj.title}
                    </h3>
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      {proj.metrics}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Sports Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Certifications */}
            <div className="space-y-3">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
                <Award className="w-4 h-4 text-sky-500" />
                Certifications
              </h2>
              <div className="space-y-2 pt-1 text-xs">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-900 dark:text-white block">{cert.title}</span>
                    <span className="text-sky-600 dark:text-sky-400 text-[11px]">{cert.issuer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sports Achievements */}
            <div className="space-y-3">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                Sports Achievements
              </h2>
              <div className="space-y-2 pt-1 text-xs">
                {sportsAchievements.map((sp, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-800/40">
                    <span className="font-semibold text-slate-900 dark:text-white block">{sp.title}</span>
                    <span className="text-amber-700 dark:text-amber-400 text-[11px]">{sp.representation}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 flex items-center justify-between no-print">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono">Esc</kbd> to close
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
