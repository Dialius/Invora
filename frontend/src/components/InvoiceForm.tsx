import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash, Save, FileText, Building, Users, DollarSign, Calendar, Info, X } from 'lucide-react';
import { api } from '../utils/api';

interface BankAccount {
  id?: string;
  bankName: string;
  accountName: string;
  accountNo: string;
}

interface Company {
  id: string;
  name: string;
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
  qty: number;
  unit: string;
  unitPrice: number;
  discountPct: number;
  subtotal: number;
}

interface InvoiceFormProps {
  invoiceId?: string;
}

export const InvoiceForm = ({ invoiceId }: InvoiceFormProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Available options
  const [companies, setCompanies] = useState<Company[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  // Modals / Creators
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    npwp: '',
    bankName: '',
    accountName: '',
    accountNo: ''
  });

  const [showClientModal, setShowClientModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    pic: ''
  });

  // Invoice Form Fields
  const [type, setType] = useState<'REGULER' | 'PROFORMA' | 'DOWN_PAYMENT' | 'PELUNASAN'>('REGULER');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [title, setTitle] = useState('');
  const [projectRef, setProjectRef] = useState('');
  const [currency, setCurrency] = useState<'IDR' | 'USD' | 'EUR'>('IDR');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  
  const [companyId, setCompanyId] = useState('');
  const [clientId, setClientId] = useState('');

  // Discount & Fee
  const [discountType, setDiscountType] = useState<'none' | 'percent' | 'nominal'>('none');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [taxPercent, setTaxPercent] = useState<number>(11);
  const [extraFee, setExtraFee] = useState<number>(0);

  // DP Fields
  const [dpPercent, setDpPercent] = useState<number>(30);
  const [paidAmount, setPaidAmount] = useState<number>(0); // for Pelunasan

  // Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { category: 'jasa', description: '', qty: 1, unit: 'pax', unitPrice: 0, discountPct: 0, subtotal: 0 }
  ]);

  // Notes & Footer
  const [notes, setNotes] = useState('');
  const [terms, setTerms] = useState('');
  const [signature, setSignature] = useState('');

  // Calculation outputs
  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [dpAmount, setDpAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  // Load companies & clients
  const fetchData = async () => {
    setFetching(true);
    try {
      const [compRes, clientRes] = await Promise.all([
        api.get('/companies'),
        api.get('/clients')
      ]);
      setCompanies(compRes.data.companies || []);
      setClients(clientRes.data.clients || []);

      if (compRes.data.companies?.length > 0 && !companyId) {
        setCompanyId(compRes.data.companies[0].id);
      }
      if (clientRes.data.clients?.length > 0 && !clientId) {
        setClientId(clientRes.data.clients[0].id);
      }
    } catch (err: any) {
      setError('Failed to fetch clients/companies details');
    } finally {
      setFetching(false);
    }
  };

  // Load existing invoice (edit mode)
  useEffect(() => {
    fetchData();
    if (invoiceId) {
      const loadInvoice = async () => {
        try {
          const res = await api.get(`/invoices/${invoiceId}`);
          const inv = res.data.invoice;
          setType(inv.type);
          setInvoiceNumber(inv.invoiceNumber);
          setTitle(inv.title || '');
          setProjectRef(inv.projectRef || '');
          setCurrency(inv.currency);
          setInvoiceDate(new Date(inv.invoiceDate).toISOString().split('T')[0]);
          setDueDate(new Date(inv.dueDate).toISOString().split('T')[0]);
          setCompanyId(inv.companyId);
          setClientId(inv.clientId);
          setDiscountType(inv.discountType || 'none');
          setDiscountValue(Number(inv.discountValue) || 0);
          setTaxPercent(Number(inv.taxPercent) || 0);
          setExtraFee(Number(inv.extraFee) || 0);
          setDpPercent(Number(inv.dpPercent) || 0);
          setPaidAmount(Number(inv.paidAmount) || 0);
          setNotes(inv.notes || '');
          setTerms(inv.terms || '');
          setSignature(inv.signature || '');
          
          if (inv.items) {
            setItems(inv.items.map((item: any) => ({
              category: item.category,
              description: item.description || '',
              qty: Number(item.qty),
              unit: item.unit || 'unit',
              unitPrice: Number(item.unitPrice),
              discountPct: Number(item.discountPct) || 0,
              subtotal: Number(item.subtotal)
            })));
          }
        } catch (err: any) {
          setError('Failed to load invoice details');
        }
      };
      loadInvoice();
    }
  }, [invoiceId]);

  // Recalculate invoice totals locally in real-time
  useEffect(() => {
    let sub = 0;
    items.forEach(item => {
      const qty = Number(item.qty) || 0;
      const price = Number(item.unitPrice) || 0;
      const itemDisc = Number(item.discountPct) || 0;
      const baseSub = qty * price;
      const discAmt = baseSub * (itemDisc / 100);
      const finalSub = baseSub - discAmt;
      sub += finalSub;
    });

    setSubtotal(sub);

    // Apply global discount
    let runningTotal = sub;
    if (discountType === 'percent') {
      runningTotal -= sub * ((Number(discountValue) || 0) / 100);
    } else if (discountType === 'nominal') {
      runningTotal -= (Number(discountValue) || 0);
    }

    // Apply tax
    const calculatedTax = runningTotal * ((Number(taxPercent) || 0) / 100);
    runningTotal += calculatedTax;
    setTaxAmount(calculatedTax);

    // Add extra fee
    runningTotal += (Number(extraFee) || 0);
    setTotal(runningTotal);

    // Down Payment / Pelunasan calculations
    if (type === 'DOWN_PAYMENT') {
      const dpVal = runningTotal * ((Number(dpPercent) || 0) / 100);
      setDpAmount(dpVal);
      setRemainingAmount(runningTotal - dpVal);
    } else if (type === 'PELUNASAN') {
      setRemainingAmount(runningTotal - (Number(paidAmount) || 0));
    } else {
      setRemainingAmount(runningTotal);
    }
  }, [items, discountType, discountValue, taxPercent, extraFee, type, dpPercent, paidAmount]);

  const handleAddItem = () => {
    setItems([...items, { category: 'jasa', description: '', qty: 1, unit: 'unit', unitPrice: 0, discountPct: 0, subtotal: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    const item = { ...newItems[index] };
    if (field === 'qty' || field === 'unitPrice' || field === 'discountPct') {
      (item as any)[field] = Number(value) || 0;
    } else {
      (item as any)[field] = value;
    }
    
    // Compute item subtotal
    const qty = Number(item.qty) || 0;
    const price = Number(item.unitPrice) || 0;
    const disc = Number(item.discountPct) || 0;
    item.subtotal = qty * price * (1 - disc / 100);

    newItems[index] = item;
    setItems(newItems);
  };

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bankAccounts = newCompany.bankName ? [{
        bankName: newCompany.bankName,
        accountName: newCompany.accountName,
        accountNo: newCompany.accountNo
      }] : [];

      const res = await api.post('/companies', {
        name: newCompany.name,
        address: newCompany.address,
        phone: newCompany.phone,
        email: newCompany.email,
        npwp: newCompany.npwp,
        bankAccounts
      });
      setCompanies([...companies, res.data.company]);
      setCompanyId(res.data.company.id);
      setShowCompanyModal(false);
      setNewCompany({
        name: '', address: '', phone: '', email: '', npwp: '', bankName: '', accountName: '', accountNo: ''
      });
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to create company');
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/clients', {
        name: newClient.name,
        address: newClient.address,
        phone: newClient.phone,
        email: newClient.email,
        pic: newClient.pic
      });
      setClients([...clients, res.data.client]);
      setClientId(res.data.client.id);
      setShowClientModal(false);
      setNewClient({
        name: '', address: '', phone: '', email: '', pic: ''
      });
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to create client');
    }
  };

  const handleSaveInvoice = async () => {
    if (!companyId) return setError('Please select or create a Company profile first');
    if (!clientId) return setError('Please select or create a Client profile first');

    setLoading(true);
    setError(null);

    const payload = {
      type,
      invoiceNumber: invoiceNumber || undefined, // Let backend autogenerate if empty
      title,
      projectRef,
      currency,
      invoiceDate: new Date(invoiceDate),
      dueDate: new Date(dueDate),
      companyId,
      clientId,
      discountType: discountType === 'none' ? null : discountType,
      discountValue,
      taxPercent,
      extraFee,
      dpPercent: type === 'DOWN_PAYMENT' ? dpPercent : null,
      paidAmount: type === 'PELUNASAN' ? paidAmount : null,
      notes,
      terms,
      signature,
      items: items.map(item => ({
        category: item.category,
        description: item.description,
        qty: item.qty,
        unit: item.unit,
        unitPrice: item.unitPrice,
        discountPct: item.discountPct
      }))
    };

    try {
      if (invoiceId) {
        await api.put(`/invoices/${invoiceId}`, payload);
      } else {
        await api.post('/invoices', payload);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save invoice');
    } finally {
      setLoading(false);
    }
  };

  const currencySymbols = {
    IDR: 'Rp',
    USD: '$',
    EUR: '€'
  };

  const symbol = currencySymbols[currency];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
            {invoiceId ? 'Edit Invoice' : 'Create New Invoice'}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Design print-ready billing requests with multi-currency calculations</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 text-slate-300 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveInvoice}
            disabled={loading}
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-900 font-bold rounded-lg flex items-center gap-2 text-sm transition-all shadow-lg shadow-cyan-500/20"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <Save size={18} />
                Save Invoice
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400 flex justify-between items-center animate-fade-in">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-xs hover:underline text-red-400/80">Dismiss</button>
        </div>
      )}

      {fetching ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-t-cyan-400 border-r-transparent border-slate-700 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* General Meta Section */}
            <div className="bg-[#1C2541]/40 border border-slate-800 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <FileText size={20} className="text-cyan-400" />
                Invoice Metadata
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Invoice Type</label>
                  <select
                    value={type}
                    onChange={(e: any) => setType(e.target.value)}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="REGULER">Regular Invoice</option>
                    <option value="PROFORMA">Proforma Invoice</option>
                    <option value="DOWN_PAYMENT">Down Payment</option>
                    <option value="PELUNASAN">Pelunasan (Settlement)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Invoice Number</label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="Auto-generated if left blank"
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 placeholder-slate-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Subject / Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Website Development Phase 1"
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Project Reference (Optional)</label>
                  <input
                    type="text"
                    value={projectRef}
                    onChange={(e) => setProjectRef(e.target.value)}
                    placeholder="e.g. PRJ-2026"
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Billing Currency</label>
                  <select
                    value={currency}
                    onChange={(e: any) => setCurrency(e.target.value)}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="IDR">IDR (Rp)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Invoice Date</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                      <Calendar size={16} />
                    </span>
                    <input
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-2 pl-10 pr-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Due Date</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                      <Calendar size={16} />
                    </span>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-2 pl-10 pr-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items Editor */}
            <div className="bg-[#1C2541]/40 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <DollarSign size={20} className="text-cyan-400" />
                  Line Items
                </h2>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="px-3 py-1.5 bg-slate-850 hover:bg-slate-800 border border-slate-700 text-cyan-400 hover:text-cyan-300 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
                >
                  <Plus size={14} /> Add Line Item
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div key={idx} className="border border-slate-800 rounded-lg p-4 bg-[#0B132B]/40 space-y-3 relative group">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="absolute top-2 right-2 text-slate-500 hover:text-red-400 p-1 rounded transition-colors"
                      title="Remove item"
                    >
                      <Trash size={16} />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 pt-2">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Item Category</label>
                        <select
                          value={item.category}
                          onChange={(e) => handleItemChange(idx, 'category', e.target.value)}
                          className="w-full bg-[#0B132B]/90 border border-slate-750 rounded-lg py-1.5 px-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        >
                          <option value="jasa">Jasa (Services)</option>
                          <option value="produk">Produk (Products)</option>
                        </select>
                      </div>

                      <div className="sm:col-span-4 pr-6">
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Description</label>
                        <input
                          type="text"
                          required
                          value={item.description}
                          onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                          placeholder="Provide details about product or service..."
                          className="w-full bg-[#0B132B]/90 border border-slate-750 rounded-lg py-1.5 px-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Qty</label>
                        <input
                          type="number"
                          min="0.01"
                          step="any"
                          required
                          value={item.qty || ''}
                          onChange={(e) => handleItemChange(idx, 'qty', e.target.value)}
                          className="w-full bg-[#0B132B]/90 border border-slate-750 rounded-lg py-1.5 px-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Unit</label>
                        <input
                          type="text"
                          required
                          value={item.unit}
                          onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                          placeholder="pax, unit, hr"
                          className="w-full bg-[#0B132B]/90 border border-slate-750 rounded-lg py-1.5 px-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Unit Price</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-slate-500 text-[10px] font-semibold">{symbol}</span>
                          <input
                            type="number"
                            required
                            value={item.unitPrice || ''}
                            onChange={(e) => handleItemChange(idx, 'unitPrice', e.target.value)}
                            className="w-full bg-[#0B132B]/90 border border-slate-750 rounded-lg py-1.5 pl-7 pr-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Disc (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={item.discountPct || ''}
                          onChange={(e) => handleItemChange(idx, 'discountPct', e.target.value)}
                          placeholder="0"
                          className="w-full bg-[#0B132B]/90 border border-slate-750 rounded-lg py-1.5 px-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div className="flex flex-col justify-end text-right pr-2">
                        <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Subtotal</div>
                        <div className="text-xs font-semibold text-slate-300 py-1.5">
                          {symbol} {item.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Note & footer */}
            <div className="bg-[#1C2541]/40 border border-slate-800 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-200">Footer Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Invoice Notes (Optional)</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Please note that service requires 7 days lead time..."
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Terms & Conditions (Optional)</label>
                  <textarea
                    rows={2}
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    placeholder="e.g. Payments should be made in full within 30 days of the invoice date."
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Authorized Signature / Representative</label>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="e.g. John Doe (CEO)"
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Relations and Summary */}
          <div className="space-y-6">
            
            {/* Company profile Selector */}
            <div className="bg-[#1C2541]/40 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-md font-bold text-slate-200 flex items-center gap-2">
                  <Building size={18} className="text-cyan-400" />
                  Billed From
                </h2>
                <button
                  onClick={() => setShowCompanyModal(true)}
                  className="text-cyan-400 hover:text-cyan-300 text-xs font-bold transition-colors"
                >
                  + Create
                </button>
              </div>

              <div>
                <select
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  {companies.length === 0 ? (
                    <option value="">-- Create a company profile --</option>
                  ) : (
                    companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
                  )}
                </select>
                {companies.length > 0 && companyId && (
                  <div className="mt-3 text-xs text-slate-400 border-t border-slate-800 pt-3 space-y-1">
                    <div className="font-bold text-slate-300">{companies.find(c => c.id === companyId)?.name}</div>
                    <div>{companies.find(c => c.id === companyId)?.address || 'No Address'}</div>
                    <div>NPWP: {companies.find(c => c.id === companyId)?.npwp || '-'}</div>
                    <div className="pt-2 text-[10px] uppercase font-bold text-slate-500">Bank Details</div>
                    {companies.find(c => c.id === companyId)?.bankAccounts?.map((b, i) => (
                      <div key={i} className="text-slate-300">
                        {b.bankName} - {b.accountNo} ({b.accountName})
                      </div>
                    )) || <div>No bank account</div>}
                  </div>
                )}
              </div>
            </div>

            {/* Client selector */}
            <div className="bg-[#1C2541]/40 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-md font-bold text-slate-200 flex items-center gap-2">
                  <Users size={18} className="text-cyan-400" />
                  Billed To
                </h2>
                <button
                  onClick={() => setShowClientModal(true)}
                  className="text-cyan-400 hover:text-cyan-300 text-xs font-bold transition-colors"
                >
                  + Create
                </button>
              </div>

              <div>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  {clients.length === 0 ? (
                    <option value="">-- Create a client profile --</option>
                  ) : (
                    clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
                  )}
                </select>
                {clients.length > 0 && clientId && (
                  <div className="mt-3 text-xs text-slate-400 border-t border-slate-800 pt-3 space-y-1">
                    <div className="font-bold text-slate-300">{clients.find(c => c.id === clientId)?.name}</div>
                    {clients.find(c => c.id === clientId)?.pic && (
                      <div>u.p. {clients.find(c => c.id === clientId)?.pic}</div>
                    )}
                    <div>{clients.find(c => c.id === clientId)?.address || 'No Address'}</div>
                    <div>Email: {clients.find(c => c.id === clientId)?.email || '-'}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Calculations Summary Panel */}
            <div className="bg-[#1C2541]/60 border border-cyan-500/20 rounded-xl p-6 space-y-4 shadow-xl shadow-cyan-900/10">
              <h2 className="text-md font-bold text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
                <Info size={18} className="text-cyan-400" />
                Calculation Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-medium text-slate-200">
                    {symbol} {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Global Discount Settings */}
                <div className="border-t border-slate-800/80 pt-3 space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Invoice Discount</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setDiscountType('none'); setDiscountValue(0); }}
                        className={`px-1.5 py-0.5 rounded text-[10px] ${discountType === 'none' ? 'bg-cyan-600 text-slate-900 font-bold' : 'bg-slate-800 text-slate-400'}`}
                      >
                        None
                      </button>
                      <button
                        onClick={() => setDiscountType('percent')}
                        className={`px-1.5 py-0.5 rounded text-[10px] ${discountType === 'percent' ? 'bg-cyan-600 text-slate-900 font-bold' : 'bg-slate-800 text-slate-400'}`}
                      >
                        %
                      </button>
                      <button
                        onClick={() => setDiscountType('nominal')}
                        className={`px-1.5 py-0.5 rounded text-[10px] ${discountType === 'nominal' ? 'bg-cyan-600 text-slate-900 font-bold' : 'bg-slate-800 text-slate-400'}`}
                      >
                        Val
                      </button>
                    </div>
                  </div>

                  {discountType !== 'none' && (
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-slate-500 text-xs font-semibold">
                        {discountType === 'percent' ? '%' : symbol}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={discountValue || ''}
                        onChange={(e) => setDiscountValue(Number(e.target.value) || 0)}
                        className="w-full bg-[#0B132B]/85 border border-slate-700 rounded py-1 pl-7 pr-2 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Tax Settings */}
                <div className="flex justify-between items-center text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span>Tax:</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={taxPercent}
                      onChange={(e) => setTaxPercent(Number(e.target.value) || 0)}
                      className="w-10 bg-[#0B132B]/85 border border-slate-700 rounded py-0.5 px-1 text-xs text-slate-200 focus:outline-none text-center"
                    />
                    <span>%</span>
                  </div>
                  <span className="font-medium text-slate-200">
                    {symbol} {taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Extra Fee Settings */}
                <div className="flex justify-between items-center text-slate-400 pt-1">
                  <span>Extra Fee:</span>
                  <div className="relative w-32">
                    <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-slate-500 text-[10px] font-semibold">{symbol}</span>
                    <input
                      type="number"
                      min="0"
                      value={extraFee || ''}
                      onChange={(e) => setExtraFee(Number(e.target.value) || 0)}
                      className="w-full bg-[#0B132B]/85 border border-slate-700 rounded py-0.5 pl-6 pr-1 text-xs text-slate-200 focus:outline-none text-right"
                    />
                  </div>
                </div>

                {/* Total Output */}
                <div className="flex justify-between text-base font-bold text-slate-100 border-t-2 border-slate-800 pt-3">
                  <span>Total Amount:</span>
                  <span className="text-cyan-400">
                    {symbol} {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Down Payment fields */}
                {type === 'DOWN_PAYMENT' && (
                  <div className="border-t border-slate-800/80 pt-3 space-y-2">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>DP Percentage:</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={dpPercent}
                          onChange={(e) => setDpPercent(Number(e.target.value) || 0)}
                          className="w-10 bg-[#0B132B]/85 border border-slate-700 rounded py-0.5 text-center text-xs text-slate-200"
                        />
                        <span>%</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-blue-400">
                      <span>DP Amount:</span>
                      <span>{symbol} {dpAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Remaining Balance:</span>
                      <span>{symbol} {remainingAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                )}

                {/* Settlement/Pelunasan fields */}
                {type === 'PELUNASAN' && (
                  <div className="border-t border-slate-800/80 pt-3 space-y-2">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>DP Paid Amount:</span>
                      <div className="relative w-28">
                        <span className="absolute inset-y-0 left-0 pl-1.5 flex items-center text-slate-500 text-[10px] font-semibold">{symbol}</span>
                        <input
                          type="number"
                          min="0"
                          value={paidAmount || ''}
                          onChange={(e) => setPaidAmount(Number(e.target.value) || 0)}
                          className="w-full bg-[#0B132B]/85 border border-slate-700 rounded py-0.5 pl-5 pr-1 text-xs text-slate-250 text-right"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-blue-400 font-semibold">
                      <span>Remaining to Pay:</span>
                      <span>{symbol} {remainingAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Create Company Profile */}
      {showCompanyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#1C2541] border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-scale-up">
            <div className="flex justify-between items-center bg-[#0B132B]/60 py-4 px-6 border-b border-slate-700/50">
              <h3 className="font-bold text-slate-100 flex items-center gap-2">
                <Building size={18} className="text-cyan-400" />
                Add Company Profile
              </h3>
              <button onClick={() => setShowCompanyModal(false)} className="text-slate-400 hover:text-slate-200">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateCompany} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-200 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Address</label>
                  <input
                    type="text"
                    value={newCompany.address}
                    onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Phone</label>
                  <input
                    type="text"
                    value={newCompany.phone}
                    onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    value={newCompany.email}
                    onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-200 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">NPWP (Tax Registration No)</label>
                  <input
                    type="text"
                    value={newCompany.npwp}
                    onChange={(e) => setNewCompany({ ...newCompany, npwp: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-200 focus:outline-none"
                  />
                </div>
                
                {/* Bank account profile setup */}
                <div className="sm:col-span-2 border-t border-slate-800 pt-4 mt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bank Account details</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Bank Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Bank BCA"
                    value={newCompany.bankName}
                    onChange={(e) => setNewCompany({ ...newCompany, bankName: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Account Holder Name</label>
                  <input
                    type="text"
                    placeholder="e.g. PT Tech Indonesia"
                    value={newCompany.accountName}
                    onChange={(e) => setNewCompany({ ...newCompany, accountName: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-200 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Account Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 12345678"
                    value={newCompany.accountNo}
                    onChange={(e) => setNewCompany({ ...newCompany, accountNo: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCompanyModal(false)}
                  className="px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold rounded-lg text-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal - Create Client */}
      {showClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#1C2541] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-scale-up">
            <div className="flex justify-between items-center bg-[#0B132B]/60 py-4 px-6 border-b border-slate-700/50">
              <h3 className="font-bold text-slate-100 flex items-center gap-2">
                <Users size={18} className="text-cyan-400" />
                Add Client
              </h3>
              <button onClick={() => setShowClientModal(false)} className="text-slate-400 hover:text-slate-200">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Attention PIC (Person in Charge)</label>
                <input
                  type="text"
                  placeholder="e.g. Ms. Jane Smith"
                  value={newClient.pic}
                  onChange={(e) => setNewClient({ ...newClient, pic: e.target.value })}
                  className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Address</label>
                <input
                  type="text"
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Phone</label>
                <input
                  type="text"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowClientModal(false)}
                  className="px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold rounded-lg text-xs"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
