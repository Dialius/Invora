import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/PublicLayout';
import { Sparkles, ArrowRight, DollarSign, Languages, FileText, CheckCircle2 } from 'lucide-react';

export const LandingHome = () => {
  // Mock Invoice interactive states
  const [clientName, setClientName] = useState('Acme Corporation');
  const [currency, setCurrency] = useState('USD');
  const [discountPct, setDiscountPct] = useState(10);
  const [lang, setLang] = useState<'EN' | 'ID'>('EN');

  // Calculations for mock invoice
  const itemPrice = 450;
  const itemQty = 3;
  const subtotal = itemPrice * itemQty;
  const discountVal = (subtotal * discountPct) / 100;
  const taxPct = 11;
  const taxVal = ((subtotal - discountVal) * taxPct) / 100;
  const total = subtotal - discountVal + taxVal;

  const currencySymbol = () => {
    switch (currency) {
      case 'IDR': return 'Rp';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const formatMoney = (val: number) => {
    if (currency === 'IDR') {
      return (val * 15000).toLocaleString('id-ID', { minimumFractionDigits: 0 });
    }
    return val.toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  // Translations object for demo
  const t = {
    EN: {
      title: 'INVOICE',
      billedFrom: 'Billed From',
      billedTo: 'Billed To',
      invoiceDate: 'Invoice Date',
      dueDate: 'Due Date',
      desc: 'Description',
      qty: 'Qty',
      unitPrice: 'Unit Price',
      discount: 'Discount',
      tax: 'Tax',
      total: 'Total Amount',
      thanks: 'Thank you for your business!',
      proInvoice: 'Pro Invoice Template',
      subtotal: 'Subtotal'
    },
    ID: {
      title: 'FAKTUR / INVOICE',
      billedFrom: 'Tagihan Dari',
      billedTo: 'Tagihan Kepada',
      invoiceDate: 'Tanggal Invoice',
      dueDate: 'Jatuh Tempo',
      desc: 'Deskripsi',
      qty: 'Jumlah',
      unitPrice: 'Harga Satuan',
      discount: 'Diskon',
      tax: 'Pajak',
      total: 'Total Tagihan',
      thanks: 'Terima kasih atas kerja sama Anda!',
      proInvoice: 'Templat Invoice Pro',
      subtotal: 'Subtotal'
    }
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-16 sm:pb-24">
        {/* Glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/50 mb-6 animate-pulse">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-cyan-300">New Feature: Signature Canvas Drawing</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 max-w-4xl mx-auto leading-tight sm:leading-none">
            Invoicing Platform Designed for <span className="text-cyan-400 bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Modern Businesses</span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Create professional bills, manage company profiles, sign dynamically, and export pixel-perfect invoices in seconds. All stored securely on the cloud.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 text-md transition-all shadow-lg shadow-cyan-500/20 group"
            >
              Get Started Free
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#interactive-demo"
              className="px-6 py-3.5 border border-slate-700 bg-slate-800/30 hover:bg-slate-800/60 rounded-xl text-md font-semibold text-slate-200 transition-all"
            >
              Try Interactive Demo
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <section id="interactive-demo" className="py-16 bg-[#0E1730]/40 border-y border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Interactive Invoice Builder Demo</h2>
            <p className="text-slate-450 text-sm mt-2 max-w-lg mx-auto">
              Test out our design system right now. Toggle the settings in the control panel to see the invoice layout adjust live.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Panel (left/top) */}
            <div className="lg:col-span-4 bg-[#1C2541]/40 border border-slate-800/80 rounded-2xl p-6 space-y-6 backdrop-blur-md">
              <h3 className="font-bold text-slate-200 border-b border-slate-850 pb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-cyan-400" />
                Live Customizer
              </h3>

              {/* Client Name Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Client Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2 px-3.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Currency Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Currency</label>
                <div className="grid grid-cols-3 gap-2">
                  {['USD', 'IDR', 'EUR'].map((cur) => (
                    <button
                      key={cur}
                      onClick={() => setCurrency(cur)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        currency === cur
                          ? 'bg-cyan-600/10 text-cyan-400 border-cyan-500/50 shadow-sm'
                          : 'bg-[#0B132B] text-slate-400 border-slate-700 hover:border-slate-650'
                      }`}
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Discount</label>
                  <span className="text-xs font-bold text-cyan-400">{discountPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={discountPct}
                  onChange={(e) => setDiscountPct(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Language Switcher */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Template Language</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'EN', name: 'English' },
                    { id: 'ID', name: 'Indonesia' }
                  ].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setLang(l.id as 'EN' | 'ID')}
                      className={`py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        lang === l.id
                          ? 'bg-cyan-600/10 text-cyan-400 border-cyan-500/50 shadow-sm'
                          : 'bg-[#0B132B] text-slate-400 border-slate-700 hover:border-slate-650'
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Box */}
              <div className="p-3 bg-cyan-950/20 border border-cyan-850/50 rounded-xl text-xs text-slate-400 leading-relaxed">
                Want to upload custom company logos, draw digital signatures, and export PDF documents? Register a free account to unlock all features!
              </div>
            </div>

            {/* Dynamic Invoice Preview Paper (right/bottom) */}
            <div className="lg:col-span-8 bg-white text-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden border border-slate-200 max-w-3xl mx-auto w-full transition-transform hover:scale-[1.01] duration-300">
              {/* Top Banner */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0B132B] flex items-center justify-center text-white font-bold text-sm">
                      I
                    </div>
                    <span className="font-extrabold text-lg text-slate-900 tracking-tight">INVORA Tech</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Kebayoran Baru, Jakarta Selatan, Indonesia</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t[lang].title}</h2>
                  <p className="text-xs font-bold text-cyan-600">#INV-2026-001</p>
                </div>
              </div>

              {/* Billed info */}
              <div className="grid grid-cols-2 gap-4 py-6 text-xs border-b border-slate-100">
                <div>
                  <span className="block font-bold text-slate-450 uppercase text-[9px] tracking-wider mb-1">{t[lang].billedFrom}</span>
                  <p className="font-bold text-slate-800">INVORA Tech Inc.</p>
                  <p className="text-slate-500 text-[10px]">support@invora.co</p>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-slate-450 uppercase text-[9px] tracking-wider mb-1">{t[lang].billedTo}</span>
                  <p className="font-bold text-slate-800">{clientName || 'Unnamed Client'}</p>
                  <p className="text-slate-500 text-[10px]">finance@client.com</p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 py-3 text-xs border-b border-slate-100">
                <div>
                  <span className="font-bold text-slate-500">{t[lang].invoiceDate}:</span> 13 June 2026
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-500">{t[lang].dueDate}:</span> 27 June 2026
                </div>
              </div>

              {/* Table */}
              <table className="w-full mt-6 text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                    <th className="py-2 text-left font-bold px-2">{t[lang].desc}</th>
                    <th className="py-2 text-right font-bold w-16 px-2">{t[lang].qty}</th>
                    <th className="py-2 text-right font-bold w-28 px-2">{t[lang].unitPrice}</th>
                    <th className="py-2 text-right font-bold w-28 px-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-150">
                    <td className="py-3 px-2">
                      <p className="font-semibold text-slate-800">Software Architecture Consulting</p>
                      <p className="text-[10px] text-slate-400">Phase 1 development consultation & design roadmap</p>
                    </td>
                    <td className="py-3 text-right px-2">{itemQty}</td>
                    <td className="py-3 text-right px-2">{currencySymbol()} {formatMoney(itemPrice)}</td>
                    <td className="py-3 text-right px-2 font-semibold text-slate-900">{currencySymbol()} {formatMoney(subtotal)}</td>
                  </tr>
                </tbody>
              </table>

              {/* Summary calculations */}
              <div className="mt-8 flex justify-end">
                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>{t[lang].subtotal}:</span>
                    <span>{currencySymbol()} {formatMoney(subtotal)}</span>
                  </div>

                  {discountPct > 0 && (
                    <div className="flex justify-between text-amber-600 font-medium">
                      <span>{t[lang].discount} ({discountPct}%):</span>
                      <span>-{currencySymbol()} {formatMoney(discountVal)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-500 border-b border-slate-150 pb-2">
                    <span>{t[lang].tax} ({taxPct}%):</span>
                    <span>{currencySymbol()} {formatMoney(taxVal)}</span>
                  </div>

                  <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1">
                    <span>{t[lang].total}:</span>
                    <span className="text-cyan-700">{currencySymbol()} {formatMoney(total)}</span>
                  </div>
                </div>
              </div>

              {/* Thank you and signature space */}
              <div className="mt-12 pt-6 border-t border-slate-150 flex justify-between items-end">
                <p className="text-xs italic text-slate-500">
                  {t[lang].thanks}
                </p>
                <div className="text-right">
                  <div className="w-32 border-b border-slate-300 pb-2 h-10 flex items-center justify-center text-slate-350 text-[10px] italic">
                    Digital Signature
                  </div>
                  <p className="text-[10px] font-bold text-slate-700 mt-1 uppercase tracking-wider">INVORA Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Built to handle complex requirements</h2>
          <p className="text-slate-400 mt-3 text-sm max-w-md mx-auto">
            From currency configurations to client billing logs, manage it all within one visual board.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 bg-[#1C2541]/35 border border-slate-800/80 rounded-2xl hover:border-cyan-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
              <DollarSign size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Multi-Currency & Conversion</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Support transactions in USD, IDR, EUR, and more. Maintain consistent conversion logs and records across tax codes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-[#1C2541]/35 border border-slate-800/80 rounded-2xl hover:border-cyan-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
              <Languages size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Multi-Language Formatting</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Dynamically switch invoice outputs between English and Indonesian with standard legal terminologies pre-configured.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-[#1C2541]/35 border border-slate-800/80 rounded-2xl hover:border-cyan-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
              <FileText size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">A4 Export & Digital Sign</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Upload logo headers, draw digital signatures directly on the drawing canvas, and generate print-ready A4 PDF formats.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-purple-950/20 border border-slate-850 p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none"></div>
          <h2 className="text-3xl font-extrabold text-white mb-4">Start Invoicing Smarter Today</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            Create your account now to build custom client lists, manage company databases, and create real invoices.
          </p>
          <Link
            to="/register"
            className="inline-flex bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold px-8 py-3.5 rounded-xl text-md transition-all shadow-lg shadow-cyan-600/10"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};
