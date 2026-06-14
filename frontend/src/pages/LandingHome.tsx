import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/PublicLayout';
import { Sparkles, ArrowRight, DollarSign, Languages, FileText } from 'lucide-react';
import { useTranslation } from '../context/i18n';
import { useState } from 'react';

export const LandingHome = () => {
  const { t } = useTranslation();

  // Demo state
  const [clientName, setClientName] = useState('Acme Corporation');
  const [currency, setCurrency] = useState('USD');
  const [discountPct, setDiscountPct] = useState(10);
  const [demoLang, setDemoLang] = useState<'EN' | 'ID'>('EN');
  const [invoiceType, setInvoiceType] = useState<'REGULER' | 'PROFORMA' | 'DOWN_PAYMENT' | 'PELUNASAN'>('REGULER');

  const itemPrice = 450;
  const itemQty = 3;
  const subtotal = itemPrice * itemQty;
  const discountVal = (subtotal * discountPct) / 100;
  const taxPct = 11;
  const taxVal = ((subtotal - discountVal) * taxPct) / 100;
  const total = subtotal - discountVal + taxVal;

  const dpPct = 30;
  const dpAmount = total * (dpPct / 100);
  const remainingAmount = total - dpAmount;
  const paidAmount = total * 0.3;
  const remainingPayable = total - paidAmount;

  const currencySymbol = () => {
    switch (currency) {
      case 'IDR': return 'Rp';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const formatMoney = (val: number) => {
    if (currency === 'IDR') return (val * 15000).toLocaleString('id-ID', { minimumFractionDigits: 0 });
    return val.toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  const inv = {
    EN: {
      title: invoiceType === 'REGULER' ? 'INVOICE' : invoiceType === 'PROFORMA' ? 'PROFORMA INVOICE' : invoiceType === 'DOWN_PAYMENT' ? 'DOWN PAYMENT INVOICE' : 'SETTLEMENT INVOICE',
      from: 'Billed From',
      to: 'Billed To',
      date: 'Invoice Date',
      due: 'Due Date',
      desc: 'Description',
      qty: 'Qty',
      price: 'Unit Price',
      subtotal: 'Subtotal',
      discount: 'Discount',
      tax: 'Tax',
      total: 'Total Amount',
      thanks: 'Thank you for your business!',
      dpLabel: `Down Payment (${dpPct}%)`,
      remLabel: 'Remaining Balance',
      paidLabel: 'DP Paid Amount',
      remPayLabel: 'Remaining to Pay'
    },
    ID: {
      title: invoiceType === 'REGULER' ? 'FAKTUR / INVOICE' : invoiceType === 'PROFORMA' ? 'FAKTUR PROFORMA' : invoiceType === 'DOWN_PAYMENT' ? 'FAKTUR UANG MUKA' : 'FAKTUR PELUNASAN',
      from: 'Tagihan Dari',
      to: 'Tagihan Kepada',
      date: 'Tanggal Invoice',
      due: 'Jatuh Tempo',
      desc: 'Deskripsi',
      qty: 'Jumlah',
      price: 'Harga Satuan',
      subtotal: 'Subtotal',
      discount: 'Diskon',
      tax: 'Pajak',
      total: 'Total Tagihan',
      thanks: 'Terima kasih atas kerja sama Anda!',
      dpLabel: `Uang Muka (${dpPct}%)`,
      remLabel: 'Sisa Pembayaran',
      paidLabel: 'DP Terbayar',
      remPayLabel: 'Sisa Pelunasan'
    },
  };
  const iv = inv[demoLang];

  return (
    <PublicLayout>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-20">
        {/* Subtle warm glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-200/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 -left-20 w-[300px] h-[300px] bg-amber-100/30 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 mb-8">
            <Sparkles size={13} className="text-teal-600" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-teal-700">
              {t('hero.badge')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-stone-900 font-serif max-w-4xl mx-auto leading-tight">
            {t('hero.title')}{' '}
            <span className="text-teal-700">{t('hero.title.accent')}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-7 py-3.5 rounded-xl flex items-center gap-2 text-sm transition-all shadow-md shadow-teal-700/20 group"
            >
              {t('hero.cta.primary')}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#interactive-demo"
              className="px-7 py-3.5 border border-[#C9C3BA] bg-white hover:bg-stone-50 rounded-xl text-sm font-semibold text-stone-700 transition-all shadow-sm"
            >
              {t('hero.cta.secondary')}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Interactive Demo ─────────────────────────────────────────────── */}
      <section id="interactive-demo" className="py-20 bg-[#EAE7E2] border-y border-[#E2DED7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-stone-900 font-serif">{t('demo.title')}</h2>
            <p className="text-stone-500 text-sm mt-3 max-w-lg mx-auto">{t('demo.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-4 bg-[#FDFCFA] border border-[#E2DED7] rounded-2xl p-6 space-y-6 shadow-sm">
              <h3 className="font-bold text-stone-800 border-b border-[#E2DED7] pb-3 flex items-center gap-2 text-sm">
                <Sparkles size={15} className="text-teal-600" />
                {t('demo.panel.title')}
              </h3>

              {/* Client Name */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">{t('demo.client.label')}</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-white border border-[#E2DED7] hover:border-[#C9C3BA] focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 rounded-xl py-2.5 px-3.5 text-sm text-stone-800 outline-none transition-all"
                />
              </div>

              {/* Currency */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">{t('demo.currency.label')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {['USD', 'IDR', 'EUR'].map((cur) => (
                    <button
                      key={cur}
                      onClick={() => setCurrency(cur)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                        currency === cur
                          ? 'bg-teal-50 text-teal-800 border-teal-300 shadow-sm'
                          : 'bg-white text-stone-600 border-[#E2DED7] hover:border-[#C9C3BA]'
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
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">{t('demo.discount.label')}</label>
                  <span className="text-xs font-bold text-teal-700">{discountPct}%</span>
                </div>
                <input
                  type="range" min="0" max="50"
                  value={discountPct}
                  onChange={(e) => setDiscountPct(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-teal-600 bg-stone-200"
                />
              </div>

              {/* Invoice Type */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">{t('demo.type.label')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'REGULER', name: t('demo.type.reguler') },
                    { id: 'PROFORMA', name: t('demo.type.proforma') },
                    { id: 'DOWN_PAYMENT', name: t('demo.type.down_payment') },
                    { id: 'PELUNASAN', name: t('demo.type.pelunasan') }
                  ].map((tp) => (
                    <button
                      key={tp.id}
                      onClick={() => setInvoiceType(tp.id as any)}
                      className={`py-2 px-1 rounded-lg text-[11px] font-semibold transition-all border text-center ${
                        invoiceType === tp.id
                          ? 'bg-teal-50 text-teal-800 border-teal-300 shadow-sm font-bold'
                          : 'bg-white text-stone-600 border-[#E2DED7] hover:border-[#C9C3BA]'
                      }`}
                    >
                      {tp.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Template Language */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">{t('demo.lang.label')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {[{ id: 'EN', name: 'English' }, { id: 'ID', name: 'Indonesia' }].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setDemoLang(l.id as 'EN' | 'ID')}
                      className={`py-2 rounded-lg text-xs font-semibold transition-all border ${
                        demoLang === l.id
                          ? 'bg-teal-50 text-teal-800 border-teal-300 shadow-sm'
                          : 'bg-white text-stone-600 border-[#E2DED7] hover:border-[#C9C3BA]'
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info box */}
              <div className="p-3.5 bg-teal-50/60 border border-teal-200/60 rounded-xl text-xs text-stone-500 leading-relaxed">
                {t('demo.info')}
              </div>
            </div>

            {/* Invoice Preview */}
            <div className="lg:col-span-8 bg-white text-stone-800 rounded-2xl p-7 sm:p-9 shadow-lg border border-[#E2DED7] max-w-3xl mx-auto w-full">
              {/* Invoice Header */}
              <div className="flex justify-between items-start border-b border-stone-100 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-white font-bold text-sm">I</div>
                    <span className="font-extrabold text-lg text-stone-900 tracking-tight">INVORA Tech</span>
                  </div>
                  <p className="text-[10px] text-stone-400">Kebayoran Baru, Jakarta Selatan, Indonesia</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-black text-stone-900 tracking-tight">{iv.title}</h2>
                  <p className="text-xs font-bold text-teal-700">#INV-2026-001</p>
                </div>
              </div>

              {/* Parties */}
              <div className="grid grid-cols-2 gap-4 py-5 text-xs border-b border-stone-100">
                <div>
                  <span className="block font-bold text-stone-400 uppercase text-[9px] tracking-wider mb-1">{iv.from}</span>
                  <p className="font-bold text-stone-800">INVORA Tech Inc.</p>
                  <p className="text-stone-400 text-[10px]">support@invora.co</p>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-stone-400 uppercase text-[9px] tracking-wider mb-1">{iv.to}</span>
                  <p className="font-bold text-stone-800">{clientName || 'Unnamed Client'}</p>
                  <p className="text-stone-400 text-[10px]">finance@client.com</p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 py-3 text-xs border-b border-stone-100">
                <div><span className="font-bold text-stone-500">{iv.date}:</span> 14 June 2026</div>
                <div className="text-right"><span className="font-bold text-stone-500">{iv.due}:</span> 28 June 2026</div>
              </div>

              {/* Table */}
              <table className="w-full mt-6 text-xs">
                <thead>
                  <tr className="bg-stone-50 text-stone-500 border-b border-stone-200">
                    <th className="py-2.5 text-left font-bold px-2">{iv.desc}</th>
                    <th className="py-2.5 text-right font-bold w-16 px-2">{iv.qty}</th>
                    <th className="py-2.5 text-right font-bold w-28 px-2">{iv.price}</th>
                    <th className="py-2.5 text-right font-bold w-28 px-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stone-100">
                    <td className="py-3.5 px-2">
                      <p className="font-semibold text-stone-800">Software Architecture Consulting</p>
                      <p className="text-[10px] text-stone-400">Phase 1 development consultation &amp; design roadmap</p>
                    </td>
                    <td className="py-3.5 text-right px-2">{itemQty}</td>
                    <td className="py-3.5 text-right px-2">{currencySymbol()} {formatMoney(itemPrice)}</td>
                    <td className="py-3.5 text-right px-2 font-semibold text-stone-900">{currencySymbol()} {formatMoney(subtotal)}</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals */}
              <div className="mt-8 flex justify-end">
                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>{iv.subtotal}:</span>
                    <span>{currencySymbol()} {formatMoney(subtotal)}</span>
                  </div>
                  {discountPct > 0 && (
                    <div className="flex justify-between text-amber-700 font-medium">
                      <span>{iv.discount} ({discountPct}%):</span>
                      <span>-{currencySymbol()} {formatMoney(discountVal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-500 border-b border-stone-100 pb-2">
                    <span>{iv.tax} ({taxPct}%):</span>
                    <span>{currencySymbol()} {formatMoney(taxVal)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-1">
                    <span>{iv.total}:</span>
                    <span className={invoiceType === 'REGULER' || invoiceType === 'PROFORMA' ? 'text-teal-700 font-extrabold' : 'text-stone-900 font-extrabold'}>
                      {currencySymbol()} {formatMoney(total)}
                    </span>
                  </div>

                  {invoiceType === 'DOWN_PAYMENT' && (
                    <>
                      <div className="flex justify-between text-stone-500 pt-1 border-t border-stone-100">
                        <span>{iv.dpLabel}:</span>
                        <span className="text-teal-700 font-bold">{currencySymbol()} {formatMoney(dpAmount)}</span>
                      </div>
                      <div className="flex justify-between text-stone-500">
                        <span>{iv.remLabel}:</span>
                        <span>{currencySymbol()} {formatMoney(remainingAmount)}</span>
                      </div>
                    </>
                  )}

                  {invoiceType === 'PELUNASAN' && (
                    <>
                      <div className="flex justify-between text-amber-700 font-medium pt-1 border-t border-stone-100">
                        <span>{iv.paidLabel}:</span>
                        <span>-{currencySymbol()} {formatMoney(paidAmount)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-stone-900">
                        <span>{iv.remPayLabel}:</span>
                        <span className="text-teal-700 font-extrabold">{currencySymbol()} {formatMoney(remainingPayable)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-10 pt-6 border-t border-stone-100 flex justify-between items-end">
                <p className="text-xs italic text-stone-400">{iv.thanks}</p>
                <div className="text-right">
                  <div className="w-32 border-b border-stone-300 h-10 flex items-end justify-center pb-1 text-[10px] italic text-stone-300">Digital Signature</div>
                  <p className="text-[10px] font-bold text-stone-600 mt-1 uppercase tracking-wider">INVORA Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Feature Highlights ───────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-stone-900 font-serif tracking-tight">{t('highlights.title')}</h2>
          <p className="text-stone-500 mt-3 text-sm max-w-md mx-auto">{t('highlights.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {[
            { icon: DollarSign, titleKey: 'highlight1.title', descKey: 'highlight1.desc' },
            { icon: Languages,  titleKey: 'highlight2.title', descKey: 'highlight2.desc' },
            { icon: FileText,   titleKey: 'highlight3.title', descKey: 'highlight3.desc' },
          ].map(({ icon: Icon, titleKey, descKey }) => (
            <div key={titleKey} className="p-8 bg-white border border-[#E2DED7] rounded-2xl hover:shadow-md hover:border-teal-300/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-6 group-hover:scale-105 transition-transform">
                <Icon size={20} />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2 font-serif">{t(titleKey)}</h3>
              <p className="text-stone-500 text-xs leading-relaxed">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-[#EAE7E2] border border-[#D8D3CB] p-10 sm:p-14 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-teal-200/20 rounded-full blur-[60px] pointer-events-none" />
          <h2 className="text-3xl font-bold text-stone-900 font-serif mb-4">{t('cta.title')}</h2>
          <p className="text-stone-500 text-sm max-w-lg mx-auto mb-8 leading-relaxed">{t('cta.subtitle')}</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-all shadow-md shadow-teal-700/20 group"
          >
            {t('cta.button')}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};
