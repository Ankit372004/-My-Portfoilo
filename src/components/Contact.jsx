import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  Calendar, 
  MessageSquare, 
  Clock, 
  Github, 
  AlertCircle, 
  HelpCircle, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo, contactConfig } from '../data/portfolioData';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Full-time Role',
    message: '',
    _gotcha: '' // Honeypot field for bot spam prevention
  });

  // Validation errors per field
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  // Dynamic Formspree ID: check localStorage override first, then contactConfig
  const [customFormId, setCustomFormId] = useState(() => {
    return localStorage.getItem('user_formspree_id') || contactConfig.formspreeId || '';
  });

  const inquiryTypes = [
    'Full-time Role',
    'Contract / Freelance',
    'Architecture Consulting',
    'General Inquiry'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email).then(() => {
      setCopiedEmail(true);
      onShowToast?.({ type: 'success', message: 'Email copied to clipboard!' });
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address (e.g. name@company.com).';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please enter a message with at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveCustomId = (id) => {
    const cleaned = id.trim().replace(/^https:\/\/formspree\.io\/f\//, '');
    setCustomFormId(cleaned);
    if (cleaned) {
      localStorage.setItem('user_formspree_id', cleaned);
      onShowToast?.({ type: 'success', message: `Formspree ID saved: ${cleaned}` });
    } else {
      localStorage.removeItem('user_formspree_id');
      onShowToast?.({ type: 'info', message: 'Formspree ID cleared.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    // Bot trap check
    if (formData._gotcha) {
      console.warn('Bot submission trapped via honeypot.');
      return;
    }

    if (!validate()) {
      onShowToast?.({ type: 'error', message: 'Please correct the highlighted errors before submitting.' });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Primary: Formspree submission
      const activeFormId = customFormId.trim();

      if (activeFormId) {
        const endpoint = `https://formspree.io/f/${activeFormId}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            _replyto: formData.email.trim(),
            inquiryType: formData.type,
            message: formData.message.trim(),
            _subject: `New Portfolio Message: ${formData.type} from ${formData.name.trim()}`
          })
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok) {
          // Success verified by Formspree API
          setIsSubmitted(true);
          try {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 }
            });
          } catch (err) {}
          onShowToast?.({ type: 'success', message: 'Message successfully delivered to Ankit!' });
        } else {
          // Formspree returned an error (e.g. 404 Form not found, invalid email, etc.)
          const errorMsg = result?.errors?.map(err => err.message).join(', ') || 
            result?.error || 
            `Server responded with HTTP ${response.status}. Please check your Form ID.`;
          
          throw new Error(errorMsg);
        }
      } 
      // 2. Secondary: EmailJS submission if configured
      else if (contactConfig.emailjsServiceId && contactConfig.emailjsTemplateId && contactConfig.emailjsPublicKey) {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            service_id: contactConfig.emailjsServiceId,
            template_id: contactConfig.emailjsTemplateId,
            user_id: contactConfig.emailjsPublicKey,
            template_params: {
              from_name: formData.name.trim(),
              from_email: formData.email.trim(),
              reply_to: formData.email.trim(),
              inquiry_type: formData.type,
              message: formData.message.trim(),
              to_name: personalInfo.name
            }
          })
        });

        if (response.ok) {
          setIsSubmitted(true);
          try {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          } catch (err) {}
          onShowToast?.({ type: 'success', message: 'Message successfully sent via EmailJS!' });
        } else {
          const text = await response.text().catch(() => 'EmailJS error');
          throw new Error(`EmailJS failed: ${text}`);
        }
      } 
      // 3. Unconfigured scenario: DO NOT claim success
      else {
        throw new Error(
          'Contact form endpoint is not configured yet. Please enter your free Formspree Form ID in the setup guide above to activate live email delivery.'
        );
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      const userMessage = err?.message || 'Network error occurred while delivering message.';
      setSubmitError(userMessage);
      onShowToast?.({ type: 'error', message: userMessage });
      // CRITICAL REQUIREMENT: Never show a success message unless the message has actually been submitted successfully
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      type: 'Full-time Role',
      message: '',
      _gotcha: ''
    });
    setErrors({});
    setSubmitError(null);
    setIsSubmitted(false);
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry: ${formData.type} from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi Ankit,\n\nName: ${formData.name || '(not specified)'}\nEmail: ${formData.email || '(not specified)'}\nInquiry Type: ${formData.type}\n\nMessage:\n${formData.message || '(no message content)'}\n\n---\nSent via portfolio contact form.`
    );
    return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 text-xs font-semibold mb-3 border border-sky-100 dark:border-sky-900/40">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let's connect and build together.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Whether you have an internship opportunity, full-stack project, research collaboration, or just want to discuss tech—transmit a message directly to my inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">
                      Email Address
                    </h3>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                      {personalInfo.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="pt-2">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors"
                >
                  <span>Open in Mail Client &rarr;</span>
                </a>
              </div>
            </div>

            {/* Direct Phone Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">
                      Phone / Mobile
                    </h3>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                      {personalInfo.phone}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${personalInfo.phone}`}
                  className="px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Call
                </a>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">
                      GitHub Profile
                    </h3>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                      github.com/Ankit372004
                    </p>
                  </div>
                </div>

                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 transition-colors"
                >
                  Visit
                </a>
              </div>
            </div>

            {/* Location & Timezone Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">
                  Location & Availability
                </h3>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                  {personalInfo.location}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {personalInfo.timezone} • Remote Worldwide
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm relative">
              
              {/* Setup Guide Toggle Pill */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${customFormId ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Endpoint: {customFormId ? `Formspree (${customFormId})` : 'Formspree Setup (Click guide)'}
                  </span>
                </div>
                
                <button
                  type="button"
                  onClick={() => setShowSetupGuide(!showSetupGuide)}
                  className="flex items-center gap-1 text-[11px] font-medium text-sky-600 dark:text-sky-400 hover:underline"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showSetupGuide ? 'Close Setup' : 'Connect Formspree'}</span>
                  {showSetupGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Collapsible Setup Helper */}
              {showSetupGuide && (
                <div className="mb-6 p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 text-xs text-slate-700 dark:text-slate-300 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>How to connect Formspree (Takes 30 seconds):</span>
                    <a
                      href="https://formspree.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-sky-600 dark:text-sky-400 hover:underline font-semibold"
                    >
                      Open Formspree.io <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    <li>Sign up for free at <strong className="text-slate-800 dark:text-slate-200">formspree.io</strong> with your email <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-mono">realankit3@gmail.com</code>.</li>
                    <li>Click <strong className="text-slate-800 dark:text-slate-200">"+ New Form"</strong>, name it <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono">Portfolio Contact</code>, and click Create.</li>
                    <li>Copy your Form ID from your endpoint URL (e.g. if the endpoint is <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono">https://formspree.io/f/mzzpkybw</code>, your ID is <strong className="text-slate-800 dark:text-slate-200">mzzpkybw</strong>).</li>
                    <li>Paste your Form ID below and click Save. That's it! Every visitor submission will immediately arrive in your Gmail inbox!</li>
                  </ol>

                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Paste Formspree ID (e.g. mzzpkybw)..."
                      defaultValue={customFormId}
                      id="formspree-id-input"
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById('formspree-id-input');
                        if (input) handleSaveCustomId(input.value);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-sky-500 hover:bg-sky-600 text-white transition-colors"
                    >
                      Save & Test
                    </button>
                  </div>
                </div>
              )}

              {/* Error Alert Banner */}
              {submitError && (
                <div className="mb-5 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-800 dark:text-rose-200 space-y-2 animate-fade-in">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Message Not Delivered</span>
                      <p className="mt-0.5 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                        {submitError}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-rose-200 dark:border-rose-900/40 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-600 dark:text-slate-400">
                      Alternative: dispatch directly from your email app:
                    </span>
                    <a
                      href={generateMailtoUrl()}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send via Email Client</span>
                    </a>
                  </div>
                </div>
              )}

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-sky-500" />
                    Send a Direct Message
                  </h3>

                  {/* Honeypot field (hidden from real users, traps bots) */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={formData._gotcha}
                    onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Inquiry Type Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      What are you interested in?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => setFormData({ ...formData, type })}
                          className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
                            formData.type === type
                              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: null });
                        }}
                        placeholder="e.g. Alex Johnson"
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${
                          errors.name 
                            ? 'border-rose-500 focus:ring-rose-500/50' 
                            : 'border-slate-200 dark:border-slate-700 focus:ring-sky-500/50'
                        } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Your Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: null });
                        }}
                        placeholder="alex@company.com"
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${
                          errors.email 
                            ? 'border-rose-500 focus:ring-rose-500/50' 
                            : 'border-slate-200 dark:border-slate-700 focus:ring-sky-500/50'
                        } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Your Message <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] text-slate-400">
                        {formData.message.length} characters (min 10)
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: null });
                      }}
                      placeholder="Tell me about your project, timeline, or team..."
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${
                        errors.message 
                          ? 'border-rose-500 focus:ring-rose-500/50' 
                          : 'border-slate-200 dark:border-slate-700 focus:ring-sky-500/50'
                      } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 resize-none`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button with Loading State */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-xs font-semibold rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white shadow-md shadow-sky-500/25 transition-all hover:scale-101 active:scale-99 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Transmitting message to Ankit's inbox...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Verified Success Confirmation State */
                <div className="text-center py-8 space-y-4 animate-fade-in">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Message Successfully Transmitted!
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out, <strong>{formData.name}</strong>. Your message regarding <em>{formData.type}</em> has been securely delivered to Ankit at <span className="font-mono text-sky-600 dark:text-sky-400">{personalInfo.email}</span>. A reply will be sent to <strong>{formData.email}</strong> shortly.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleResetForm}
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
