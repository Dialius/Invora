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
                        <div className="w-8 h-8 rounded-lg bg-teal-750 flex items-center justify-center text-white font-bold text-sm">I</div>
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
                        <span className="font-bold text-slate-800 text-xs italic">INVORA Admin</span>
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
