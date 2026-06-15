import { useState } from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { Mail, MessageSquare, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission — in production, replace with a real email API (e.g. Resend, EmailJS)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Email Us',
      value: 'support@invora.online',
      href: 'mailto:support@invora.online',
      description: 'For general inquiries and support'
    },
    {
      icon: Mail,
      label: 'Privacy & Data',
      value: 'privacy@invora.online',
      href: 'mailto:privacy@invora.online',
      description: 'For privacy policy and data requests'
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: '1–2 Business Days',
      href: null,
      description: 'We aim to reply as quickly as possible'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Indonesia',
      href: null,
      description: 'Operating across Indonesia'
    }
  ];

  const subjects = [
    'General Question',
    'Technical Support',
    'Billing & Advertising',
    'Privacy / Data Request',
    'Bug Report',
    'Feature Request',
    'Partnership',
    'Other'
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F0EDE8]">
        {/* Hero */}
        <section className="bg-[#FDFCFA] border-b border-[#E2DED7] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 mb-6">
              <MessageSquare className="text-teal-700" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-stone-900 font-serif mb-4">Contact Us</h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Have a question, found a bug, or just want to say hello? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

              {/* Left: Contact Info */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-bold text-stone-900 font-serif mb-6">Get in Touch</h2>

                {contactItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-white border border-[#E2DED7] rounded-2xl p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                        <Icon size={17} className="text-teal-700" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-0.5">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="text-sm font-semibold text-stone-800 hover:text-teal-700 transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-sm font-semibold text-stone-800">{item.value}</div>
                        )}
                        <div className="text-xs text-stone-400 mt-0.5">{item.description}</div>
                      </div>
                    </div>
                  );
                })}

                {/* Quick Links */}
                <div className="bg-[#EAE7E2] border border-[#D8D3CB] rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-stone-700 mb-3">Quick Links</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Privacy Policy', href: '/privacy-policy' },
                      { label: 'Terms of Service', href: '/terms' },
                      { label: 'FAQ', href: '/faq' },
                    ].map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2 text-sm text-stone-500 hover:text-teal-700 transition-colors py-0.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-teal-500 shrink-0" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white border border-[#E2DED7] rounded-2xl p-8">
                  {submitted ? (
                    // Success State
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center mb-6">
                        <CheckCircle className="text-teal-600" size={30} />
                      </div>
                      <h2 className="text-2xl font-bold text-stone-900 font-serif mb-3">Message Sent!</h2>
                      <p className="text-stone-500 text-sm leading-relaxed max-w-sm">
                        Thank you for reaching out. We've received your message and will get back to you within 1–2 business days.
                      </p>
                      <button
                        onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                        className="mt-8 text-sm text-teal-700 hover:underline font-medium"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    // Form
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h2 className="text-xl font-bold text-stone-900 font-serif mb-6">Send a Message</h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                            Your Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. Budi Santoso"
                            className="w-full bg-[#FDFCFA] border border-[#E2DED7] hover:border-[#C9C3BA] focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 rounded-xl py-2.5 px-3.5 text-sm text-stone-800 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full bg-[#FDFCFA] border border-[#E2DED7] hover:border-[#C9C3BA] focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 rounded-xl py-2.5 px-3.5 text-sm text-stone-800 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                          Subject <span className="text-red-400">*</span>
                        </label>
                        <select
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full bg-[#FDFCFA] border border-[#E2DED7] hover:border-[#C9C3BA] focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 rounded-xl py-2.5 px-3.5 text-sm text-stone-800 outline-none transition-all"
                        >
                          <option value="" disabled>Select a topic...</option>
                          {subjects.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                          Message <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={6}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Describe your question or issue in detail..."
                          className="w-full bg-[#FDFCFA] border border-[#E2DED7] hover:border-[#C9C3BA] focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 rounded-xl py-2.5 px-3.5 text-sm text-stone-800 outline-none transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-sm shadow-teal-700/20"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-xs text-stone-400 text-center">
                        By submitting this form, you agree to our{' '}
                        <a href="/privacy-policy" className="text-teal-700 hover:underline">Privacy Policy</a>.
                      </p>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};
