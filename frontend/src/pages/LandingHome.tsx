import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/PublicLayout';
import { Sparkles, ArrowRight, DollarSign, Languages, FileText } from 'lucide-react';
import { useTranslation } from '../context/i18n';
import { useState } from 'react';
import { Logo } from '../components/Logo';

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
            <div className="lg:col-span-8 w-full">
              <div className="bg-white text-slate-800 p-8 rounded-xl shadow-2xl overflow-x-auto max-w-4xl mx-auto w-full border border-slate-200">
                <div className="min-w-[650px] space-y-6 text-left">
                  
                  {/* Top Header */}
                  <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Logo size={48} variant="colored" />
                      </div>
                      
                      <div className="text-[11px] text-slate-500 space-y-0.5">
                        <div className="font-bold text-xs text-slate-800">INVORA Tech Inc.</div>
                        <div>Kebayoran Baru, Jakarta Selatan, Indonesia</div>
                        <div>Email: support@invora.co | Phone: +62 21 555 1234</div>
                        <div>NPWP: 01.234.567.8-012.000</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <h1 className="text-xl font-extrabold tracking-wide mb-2 uppercase" style={{
                        color:
                          invoiceType === 'PROFORMA'     ? '#92400E' :
                          invoiceType === 'DOWN_PAYMENT' ? '#3730A3' :
                          invoiceType === 'PELUNASAN'    ? '#065F46' : '#1E3A5F'
                      }}>{iv.title}</h1>

                      <div className="text-xs font-semibold text-slate-500 mb-3">#INV-2026-001</div>
                      
                      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px] text-slate-500 justify-items-end">
                        <span className="font-semibold">{iv.date}:</span>
                        <span>14 June 2026</span>
                        <span className="font-semibold">{iv.due}:</span>
                        <span>28 June 2026</span>
                        <span className="font-semibold">{demoLang === 'ID' ? 'Referensi Proyek:' : 'Project Ref:'}</span>
                        <span>PRJ-2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Proforma disclaimer banner */}
                  {invoiceType === 'PROFORMA' && (
                    <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-[10px] text-amber-800 font-medium">
                      <span className="text-amber-500 font-black text-base leading-none">!</span>
                      <span>
                        {demoLang === 'ID'
                          ? 'Ini adalah Faktur Proforma — hanya untuk keperluan estimasi dan bukan merupakan tagihan pembayaran resmi.'
                          : 'This is a Proforma Invoice — for estimation purposes only and does not constitute a demand for payment.'}
                      </span>
                    </div>
                  )}

                  {/* Billing client and subject info */}
                  <div className="grid grid-cols-2 gap-8 py-4 text-[11px] border-b border-slate-100">
                    <div>
                      <div className="text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-1.5">{iv.to}</div>
                      <div className="text-xs font-bold text-slate-800 mb-0.5">{clientName || 'Unnamed Client'}</div>
                      <div className="font-medium text-slate-605 mb-0.5">u.p. Finance Department</div>
                      <div className="text-slate-500 leading-relaxed">Sudirman Central Business District, Jakarta, Indonesia</div>
                      <div className="text-slate-500 mt-1">Phone: +62 21 888 4321 | Email: finance@client.com</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-1.5">{demoLang === 'ID' ? 'Perihal' : 'Subject'}</div>
                      <div className="text-xs font-medium text-slate-700 leading-relaxed">Software Architecture Consulting</div>
                    </div>
                  </div>

                  {/* Table */}
                  <table className="w-full text-left border-collapse mt-4 text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-300 text-[#1E3A5F] font-bold uppercase tracking-wider text-[9px]">
                        <th className="py-2.5 w-8 text-center">No</th>
                        <th className="py-2.5">{iv.desc}</th>
                        <th className="py-2.5 text-center w-20">{iv.qty}</th>
                        <th className="py-2.5 text-right w-28">{iv.price}</th>
                        <th className="py-2.5 text-center w-16">{demoLang === 'ID' ? 'Diskon (%)' : 'Disc (%)'}</th>
                        <th className="py-2.5 text-right w-28">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100 text-xs">
                        <td className="py-3 text-center text-slate-500">1</td>
                        <td className="py-3">
                          <div className="font-medium text-slate-800">{demoLang === 'ID' ? 'Jasa' : 'Services'}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Software Architecture Consulting - Phase 1 development & design roadmap</div>
                        </td>
                        <td className="py-3 text-center text-slate-700">{itemQty} unit</td>
                        <td className="py-3 text-right text-slate-700">{currencySymbol()} {formatMoney(itemPrice)}</td>
                        <td className="py-3 text-center text-slate-700">-</td>
                        <td className="py-3 text-right font-medium text-slate-800">{currencySymbol()} {formatMoney(subtotal)}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Bottom Layout Calculations & Notes */}
                  <div className="grid grid-cols-12 gap-6 mt-4 text-[11px]">
                    {/* Bank Details & Notes */}
                    <div className="col-span-7 space-y-4">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="font-bold text-slate-600 uppercase tracking-wider text-[9px] mb-2">{demoLang === 'ID' ? 'Detail Pembayaran' : 'Payment Details'}</div>
                        <div className="text-slate-600 text-[10px]">
                          <div className="font-bold text-slate-700">Bank Central Asia (BCA)</div>
                          <div>Account Name: PT INVORA TECH INDONESIA</div>
                          <div>Account No: 8830-1234-56</div>
                        </div>
                      </div>
                      
                      <div className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                        <div className="font-bold text-slate-700 uppercase tracking-wider text-[9px] mb-1">{demoLang === 'ID' ? 'Catatan' : 'Notes'}</div>
                        <div>{demoLang === 'ID' ? 'Pembayaran penuh harus diselesaikan dalam waktu 14 hari dari tanggal invoice.' : 'Full payment should be completed within 14 days of invoice date.'}</div>
                      </div>
                    </div>

                    {/* Calculations Totals (right) */}
                    <div className="col-span-5 flex flex-col justify-start space-y-1.5 text-right">
                      <div className="flex justify-between text-slate-500">
                        <span>{iv.subtotal}:</span>
                        <span>{currencySymbol()} {formatMoney(subtotal)}</span>
                      </div>

                      {discountPct > 0 && (
                        <div className="flex justify-between text-amber-600 font-medium">
                          <span>{iv.discount} ({discountPct}%):</span>
                          <span>-{currencySymbol()} {formatMoney(discountVal)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-slate-500">
                        <span>{iv.tax} ({taxPct}%):</span>
                        <span>{currencySymbol()} {formatMoney(taxVal)}</span>
                      </div>

                      <div className="flex justify-between text-xs font-bold border-t border-slate-200 pt-2 mt-1" style={{
                        color:
                          invoiceType === 'PROFORMA'     ? '#92400E' :
                          invoiceType === 'DOWN_PAYMENT' ? '#3730A3' :
                          invoiceType === 'PELUNASAN'    ? '#065F46' : '#0F766E'
                      }}>
                        <span>{iv.total}:</span>
                        <span>{currencySymbol()} {formatMoney(total)}</span>
                      </div>

                      {invoiceType === 'DOWN_PAYMENT' && (
                        <div className="mt-2 space-y-1">
                          <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2">
                            <div className="flex justify-between font-bold text-indigo-800">
                              <span>{iv.dpLabel}:</span>
                              <span>{currencySymbol()} {formatMoney(dpAmount)}</span>
                            </div>
                          </div>
                          <div className="flex justify-between text-slate-500 px-1">
                            <span>{iv.remLabel}:</span>
                            <span>{currencySymbol()} {formatMoney(remainingAmount)}</span>
                          </div>
                        </div>
                      )}

                      {invoiceType === 'PELUNASAN' && (
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-slate-500 px-1">
                            <span>{iv.paidLabel}:</span>
                            <span>-{currencySymbol()} {formatMoney(paidAmount)}</span>
                          </div>
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                            <div className="flex justify-between font-bold text-emerald-800">
                              <span>{iv.remPayLabel}:</span>
                              <span>{currencySymbol()} {formatMoney(remainingPayable)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer message and Signature */}
                  <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-end text-[11px]">
                    <div>
                      <div className="font-bold text-slate-700">INVORA Tech Inc.</div>
                      <div className="text-slate-450 italic mt-0.5">{iv.thanks}</div>
                    </div>

                    <div className="text-center" style={{ minWidth: '160px' }}>
                      <div className="text-slate-400 font-medium mb-2 uppercase tracking-wider text-[9px]">{demoLang === 'ID' ? 'Tanda Tangan Resmi' : 'Authorized Signature'}</div>

                      {/* Signature line placeholder */}
                      <div className="h-14 flex items-end justify-center pb-1">
                        <img src="data:image/png;base64,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" alt="Signature" className="max-h-12 max-w-[140px] object-contain" />
                      </div>

                      {/* Signature line */}
                      <div className="w-36 border-b border-stone-400 mx-auto"></div>

                      {/* Signer name */}
                      <div className="mt-1.5 text-[10px] font-semibold text-slate-700 tracking-wide">Juliana Silva</div>
                    </div>
                  </div>

                  {/* Watermark footer */}
                  <div className="mt-6 pt-3 border-t border-slate-100 text-center">
                    <span className="text-[8px] text-slate-300 tracking-wide select-none">
                      Powered by <strong className="text-slate-350">Invora</strong> &bull; invora.online
                    </span>
                  </div>

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
