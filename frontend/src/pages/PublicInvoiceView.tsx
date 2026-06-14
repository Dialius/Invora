import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Printer, Download, Share2, Languages, ArrowLeft, RefreshCw, FileText, Check, X } from 'lucide-react';
import axios from 'axios';

interface BankAccount {
  id?: string;
  bankName: string;
  accountName: string;
  accountNo: string;
}

interface Company {
  id: string;
  name: string;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
  npwp?: string;
  bankAccounts?: BankAccount[];
}

interface Client {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  pic?: string;
}

interface InvoiceItem {
  id?: string;
  category: 'jasa' | 'produk';
  description: string;
  qty: string;
  unit: string;
  unitPrice: string;
  discountPct: string;
  subtotal: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  type: 'REGULER' | 'PROFORMA' | 'DOWN_PAYMENT' | 'PELUNASAN';
  status: string;
  title?: string;
  projectRef?: string;
  currency: string;
  invoiceDate: string;
  dueDate: string;
  subtotal: string;
  discountType?: string;
  discountValue?: string;
  taxPercent: string;
  taxAmount: string;
  extraFee?: string;
  shippingFee?: string;
  total: string;
  dpPercent?: string;
  dpAmount?: string;
  paidAmount?: string;
  remainingAmount?: string;
  notes?: string;
  terms?: string;
  signature?: string;
  company: Company;
  client: Client;
  items: InvoiceItem[];
}

export default function PublicInvoiceView() {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<'EN' | 'ID'>('EN');
  const [copied, setCopied] = useState(false);

  const backendUrl = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';
  const brandUrl   = (import.meta as any).env.VITE_APP_BRAND_URL || 'invora.id';

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/api/invoices/public/${id}`);
        setInvoice(res.data.invoice);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load public invoice. Please verify link.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInvoice();
  }, [id, backendUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center text-slate-350">
        <RefreshCw className="animate-spin text-teal-600 mb-4" size={32} />
        <p className="text-sm font-semibold uppercase tracking-wider">Loading Invoice details...</p>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-950/20 border border-red-900/50 flex items-center justify-center text-red-400 mb-4 animate-bounce">
          <X size={28} />
        </div>
        <h1 className="text-xl font-bold text-slate-100 mb-2">Invoice Not Found</h1>
        <p className="text-slate-400 text-sm max-w-md mb-6">{error || 'The requested invoice link does not exist or has been removed.'}</p>
        <Link
          to="/"
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl transition-all"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currency = invoice.currency;
  const symbol = currency === 'IDR' ? 'Rp' : currency === 'EUR' ? '€' : '$';
  
  const formatMoney = (val: any) => {
    const num = Number(val) || 0;
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const t = {
    EN: {
      title: invoice.type === 'REGULER' ? 'INVOICE' : invoice.type === 'PROFORMA' ? 'PROFORMA INVOICE' : invoice.type === 'DOWN_PAYMENT' ? 'DOWN PAYMENT INVOICE' : 'SETTLEMENT INVOICE',
      billedFrom: 'Billed From',
      billedTo: 'Billed To',
      invoiceDate: 'Invoice Date',
      dueDate: 'Due Date',
      projRef: 'Project Ref',
      desc: 'Description',
      qty: 'Qty',
      unitPrice: 'Unit Price',
      discount: 'Discount',
      tax: 'Tax',
      total: 'Total Amount',
      subtotal: 'Subtotal',
      dpLabel: `Down Payment (${Number(invoice.dpPercent || 0)}%)`,
      remLabel: 'Remaining Balance',
      paidLabel: 'DP Paid Amount',
      remPayLabel: 'Remaining to Pay',
      notesLabel: 'Notes',
      termsLabel: 'Terms & Conditions',
      sigLabel: 'Authorized Signature',
      noBank: 'No bank details provided',
      subject: 'Subject',
      shippingLabel: 'Shipping Cost',
      thanks: 'Thank you for your business!'
    },
    ID: {
      title: invoice.type === 'REGULER' ? 'INVOICE' : invoice.type === 'PROFORMA' ? 'FAKTUR PROFORMA' : invoice.type === 'DOWN_PAYMENT' ? 'UANG MUKA INVOICE' : 'INVOICE PELUNASAN',
      billedFrom: 'Tagihan Dari',
      billedTo: 'Tagihan Kepada',
      invoiceDate: 'Tanggal Invoice',
      dueDate: 'Jatuh Tempo',
      projRef: 'Referensi Proyek',
      desc: 'Deskripsi',
      qty: 'Jumlah',
      unitPrice: 'Harga Satuan',
      discount: 'Diskon',
      tax: 'Pajak',
      total: 'Total Tagihan',
      subtotal: 'Subtotal',
      dpLabel: `Uang Muka (${Number(invoice.dpPercent || 0)}%)`,
      remLabel: 'Sisa Pembayaran',
      paidLabel: 'DP Terbayar',
      remPayLabel: 'Sisa Pelunasan',
      notesLabel: 'Notes',
      termsLabel: 'Terms & Conditions',
      sigLabel: 'Tanda Tangan Resmi',
      noBank: 'Detail bank tidak tersedia',
      subject: 'Perihal',
      shippingLabel: 'Biaya Pengiriman',
      thanks: 'Terima kasih atas kerja sama Anda!'
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0 print:px-0">
      {/* Print styles override */}
      <style>{`
        @media print {
          @page {
            margin: 0 !important;
          }
          body {
            margin: 1.6cm 1.6cm 1.6cm 1.6cm !important;
            background: white !important;
            color: black !important;
          }
          header, footer, .print\\:hidden, [class*="print:hidden"] {
            display: none !important;
          }
        }
      `}</style>
      
      {/* Control Bar (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mb-8 bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4 shadow-sm print:hidden">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="p-2 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-850 rounded-xl transition-all border border-slate-250 shadow-sm"
            title="Go to landing page"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="text-slate-900 font-bold text-sm tracking-tight flex items-center gap-2">
            <FileText className="text-teal-600" size={16} />
            <span>Invoice Details</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'EN' ? 'ID' : 'EN')}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-800 border border-slate-250 shadow-sm text-xs font-bold rounded-xl transition-all"
          >
            <Languages size={14} className="text-teal-600" />
            <span>{lang === 'EN' ? 'Indonesia' : 'English'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-800 border border-slate-250 shadow-sm text-xs font-bold rounded-xl transition-all"
          >
            {copied ? <Check size={14} className="text-emerald-400 animate-scale-up" /> : <Share2 size={14} className="text-teal-600" />}
            <span>{copied ? 'Copied!' : 'Share Link'}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-800 border border-slate-250 shadow-sm text-xs font-bold rounded-xl transition-all"
          >
            <Printer size={14} className="text-teal-600" />
            <span>Print Invoice</span>
          </button>

          {/* Download PDF Button */}
          <a
            href={`${backendUrl}/api/invoices/public/${id}/pdf`}
            download
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Main Sheet Container */}
      <div className="bg-white text-slate-800 p-6 sm:p-10 rounded-2xl shadow-2xl max-w-4xl mx-auto w-full border border-slate-200 print:border-none print:shadow-none print:p-0 print:rounded-none">
        <div className="space-y-6 text-left">
          
          {/* Header Row */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-6">
            <div>
              {invoice.company.logo ? (
                <div className="mb-4 max-h-16 flex items-center">
                  <img
                    src={invoice.company.logo}
                    alt="Company Logo"
                    className="max-h-12 object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{
                    backgroundColor:
                      invoice.type === 'PROFORMA'     ? '#92400E' :
                      invoice.type === 'DOWN_PAYMENT' ? '#3730A3' :
                      invoice.type === 'PELUNASAN'    ? '#065F46' : '#0F766E'
                  }}>I</div>
                  <span className="text-lg font-bold tracking-tight text-slate-900">Invora</span>
                </div>
              )}
              
              <div className="text-[11px] text-slate-500 space-y-0.5">
                <div className="font-bold text-xs text-slate-750">{invoice.company.name}</div>
                <div>{invoice.company.address || '-'}</div>
                <div>Email: {invoice.company.email || '-'} | Phone: {invoice.company.phone || '-'}</div>
                {invoice.company.npwp && (
                  <div>NPWP: {invoice.company.npwp}</div>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <h1 className="text-xl font-extrabold tracking-wide mb-2 uppercase" style={{
                color:
                  invoice.type === 'PROFORMA'     ? '#92400E' :
                  invoice.type === 'DOWN_PAYMENT' ? '#3730A3' :
                  invoice.type === 'PELUNASAN'    ? '#065F46' : '#1E3A5F'
              }}>{t[lang].title}</h1>

              <div className="text-xs font-semibold text-slate-500 mb-3">{invoice.invoiceNumber}</div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px] text-slate-500 justify-items-end">
                <span className="font-semibold">{t[lang].invoiceDate}:</span>
                <span>{new Date(invoice.invoiceDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                <span className="font-semibold">{t[lang].dueDate}:</span>
                <span>{new Date(invoice.dueDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                {invoice.projectRef && (
                  <>
                    <span className="font-semibold">{t[lang].projRef}:</span>
                    <span>{invoice.projectRef}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Proforma disclaimer */}
          {invoice.type === 'PROFORMA' && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-[10px] text-amber-800 font-medium print:border print:border-amber-200">
              <span className="text-amber-500 font-black text-base leading-none">!</span>
              <span>This is a <strong>Proforma Invoice</strong> — for estimation purposes only and does not constitute a demand for payment.</span>
            </div>
          )}

          {/* Customer info & Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4 text-[11px] border-b border-slate-100">
            <div>
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-1.5">{t[lang].billedTo}</div>
              <div className="text-xs font-bold text-slate-800 mb-0.5">{invoice.client.name}</div>
              {invoice.client.pic && (
                <div className="font-medium text-slate-600 mb-0.5">u.p. {invoice.client.pic}</div>
              )}
              <div className="text-slate-500 leading-relaxed">{invoice.client.address || '-'}</div>
              <div className="text-slate-500 mt-1">Phone: {invoice.client.phone || '-'} | Email: {invoice.client.email || '-'}</div>
            </div>
            <div>
              {invoice.title && (
                <>
                  <div className="text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-1.5">{t[lang].subject}</div>
                  <div className="text-xs font-medium text-slate-700 leading-relaxed">{invoice.title}</div>
                </>
              )}
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left border-collapse mt-4 text-[11px]">
            <thead>
              <tr className="border-b border-slate-300 text-[#1E3A5F] font-bold uppercase tracking-wider text-[9px]">
                <th className="py-2.5 w-8 text-center">No</th>
                <th className="py-2.5">Description</th>
                <th className="py-2.5 text-center w-20">Qty</th>
                <th className="py-2.5 text-right w-28">Unit Price</th>
                <th className="py-2.5 text-center w-16">Disc (%)</th>
                <th className="py-2.5 text-right w-28">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={item.id || idx} className="border-b border-slate-100 text-xs">
                  <td className="py-3 text-center text-slate-500">{idx + 1}</td>
                  <td className="py-3">
                    <div className="font-medium text-slate-800">{item.category === 'jasa' ? (lang === 'ID' ? 'Jasa' : 'Services') : (lang === 'ID' ? 'Produk' : 'Products')}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.description}</div>
                  </td>
                  <td className="py-3 text-center text-slate-700">{item.qty} {item.unit || 'unit'}</td>
                  <td className="py-3 text-right text-slate-700">{symbol} {formatMoney(item.unitPrice)}</td>
                  <td className="py-3 text-center text-slate-700">{Number(item.discountPct) ? `${item.discountPct}%` : '-'}</td>
                  <td className="py-3 text-right font-medium text-slate-800">{symbol} {formatMoney(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals & Notes Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4 text-[11px]">
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="font-bold text-slate-650 uppercase tracking-wider text-[9px] mb-2">Payment Details</div>
                {invoice.company.bankAccounts && invoice.company.bankAccounts.length > 0 ? (
                  invoice.company.bankAccounts.map((bank, i) => (
                    <div key={bank.id || i} className="mb-2 text-slate-600 text-[10px]">
                      <div className="font-bold text-slate-700">{bank.bankName}</div>
                      <div>Account Name: {bank.accountName}</div>
                      <div>Account No: {bank.accountNo}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-400 italic text-[10px]">{t[lang].noBank}</div>
                )}
              </div>
              
              {invoice.notes && (
                <div className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                  <div className="font-bold text-slate-700 uppercase tracking-wider text-[9px] mb-1">{t[lang].notesLabel}</div>
                  <div>{invoice.notes}</div>
                </div>
              )}

              {invoice.terms && (
                <div className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                  <div className="font-bold text-slate-700 uppercase tracking-wider text-[9px] mb-1">{t[lang].termsLabel}</div>
                  <div>{invoice.terms}</div>
                </div>
              )}
            </div>

            <div className="md:col-span-5 flex flex-col justify-start space-y-1.5 text-right">
              <div className="flex justify-between text-slate-500">
                <span>{t[lang].subtotal}:</span>
                <span>{symbol} {formatMoney(invoice.subtotal)}</span>
              </div>

              {invoice.discountType && Number(invoice.discountValue) > 0 && (
                <div className="flex justify-between text-amber-600 font-medium">
                  <span>
                    {t[lang].discount} ({invoice.discountType === 'percent' ? `${invoice.discountValue}%` : 'Val'}):
                  </span>
                  <span>
                    -{symbol} {formatMoney(invoice.discountType === 'percent' ? Number(invoice.subtotal) * (Number(invoice.discountValue) / 100) : invoice.discountValue)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-slate-500">
                <span>{t[lang].tax} ({invoice.taxPercent}%):</span>
                <span>{symbol} {formatMoney(invoice.taxAmount)}</span>
              </div>

              {Number(invoice.extraFee) > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>Extra Fee:</span>
                  <span>{symbol} {formatMoney(invoice.extraFee)}</span>
                </div>
              )}

              {Number(invoice.shippingFee) > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>{lang === 'EN' ? 'Shipping Cost' : 'Biaya Pengiriman'}:</span>
                  <span>{symbol} {formatMoney(invoice.shippingFee)}</span>
                </div>
              )}

              <div className="flex justify-between text-xs font-bold border-t border-slate-200 pt-2 mt-1" style={{
                color:
                  invoice.type === 'PROFORMA'     ? '#92400E' :
                  invoice.type === 'DOWN_PAYMENT' ? '#3730A3' :
                  invoice.type === 'PELUNASAN'    ? '#065F46' : '#0F766E'
              }}>
                <span>{t[lang].total}:</span>
                <span>{symbol} {formatMoney(invoice.total)}</span>
              </div>

              {invoice.type === 'DOWN_PAYMENT' && (
                <div className="mt-2 space-y-1">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2">
                    <div className="flex justify-between font-bold text-indigo-800">
                      <span>{t[lang].dpLabel}:</span>
                      <span>{symbol} {formatMoney(invoice.dpAmount)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-slate-500 px-1">
                    <span>{t[lang].remLabel}:</span>
                    <span>{symbol} {formatMoney(invoice.remainingAmount)}</span>
                  </div>
                </div>
              )}

              {invoice.type === 'PELUNASAN' && (
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-slate-500 px-1">
                    <span>{t[lang].paidLabel}:</span>
                    <span>-{symbol} {formatMoney(invoice.paidAmount)}</span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                    <div className="flex justify-between font-bold text-emerald-800">
                      <span>{t[lang].remPayLabel}:</span>
                      <span>{symbol} {formatMoney(invoice.remainingAmount)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer & Signature row */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex justify-between items-end text-[11px]">
            <div>
              <div className="font-bold text-slate-700">{invoice.company.name}</div>
              <div className="text-slate-400 italic mt-0.5">{t[lang].thanks}</div>
            </div>

            <div className="text-center" style={{ minWidth: '150px' }}>
              <div className="text-slate-400 font-medium mb-1.5 uppercase tracking-wider text-[9px]">{t[lang].sigLabel}</div>
              
              {invoice.signature ? (
                invoice.signature.startsWith('data:image/') ? (
                  <div className="my-2 h-14 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg p-1">
                    <img
                      src={invoice.signature}
                      alt="Signature"
                      className="max-h-12 object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-10 flex items-center justify-center font-bold text-slate-800 text-xs italic">
                    {invoice.signature}
                  </div>
                )
              ) : (
                <div className="h-10 flex items-center justify-center text-slate-300 italic text-[10px]">
                  No signature
                </div>
              )}
              
              <div className="w-32 border-b border-slate-200 mx-auto mt-2"></div>
            </div>
          </div>

          {/* Watermark footer */}
          <div className="mt-8 pt-3 border-t border-slate-100 text-center print:mt-6">
            <span className="text-[9px] text-slate-300 tracking-wide select-none">
              Powered by <strong className="text-slate-400">Invora</strong> &bull; {brandUrl}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
