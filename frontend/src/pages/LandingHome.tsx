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
            <div className="lg:col-span-8 w-full">
              <div className="bg-white text-slate-800 p-8 rounded-xl shadow-2xl overflow-x-auto max-w-4xl mx-auto w-full border border-slate-200">
                <div className="min-w-[650px] space-y-6 text-left">
                  
                  {/* Top Header */}
                  <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-750 flex items-center justify-center text-white font-bold text-sm shrink-0">I</div>
                        <span className="text-lg font-bold tracking-tight text-slate-900">Invora</span>
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
                      Powered by <strong className="text-slate-350">Invora</strong> &bull; invora.id
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
