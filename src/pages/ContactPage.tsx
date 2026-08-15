import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill out all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: 'Contact Us', path: '/contact' }]} />

      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Feedback &amp; Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Have feedback, a feature request, or an inquiry regarding tax presets? Send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Support Information
            </h2>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-slate-900 dark:text-white">Email Support</span>
                <a href="mailto:support@vatcalcs.net" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  support@vatcalcs.net
                </a>
              </div>
            </div>
            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
              We strive to respond to all rate change suggestions and inquiries within 24–48 business hours.
            </div>
          </div>
        </div>

        {/* Contact Form (8 cols) */}
        <div className="md:col-span-8">
          <div className="glass-card p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-8 space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Thank you for reaching out, {name}. Our team will review your message and reply to {email} if needed.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="input-field py-2 text-sm font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="input-field py-2 text-sm font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Subject / Category
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="general">General Feedback</option>
                    <option value="rate_update">Regional Tax Rate Update Suggestion</option>
                    <option value="bug_report">Calculator Bug or Calculation Edge-Case</option>
                    <option value="feature_request">New Feature Request</option>
                    <option value="advertising">Advertising &amp; Partnership Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you with our tax calculators?"
                    className="input-field py-2.5 text-sm font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 text-sm shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
