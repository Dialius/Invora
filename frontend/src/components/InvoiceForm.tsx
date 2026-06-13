import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash, Save, FileText, Building, Users, DollarSign, Calendar, Info, X, Eye, EyeOff, Languages, PenTool, Upload, RefreshCw } from 'lucide-react';
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
    logo: '',
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
  const [signature, setSignature] = useState(''); // Stores either base64 image string OR text representative
  const [customThanks, setCustomThanks] = useState('Thank you for your business!');

  // Live preview settings
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [previewLang, setPreviewLang] = useState<'EN' | 'ID'>('EN');

  // Signature drawing pad states
  const [signatureTab, setSignatureTab] = useState<'type' | 'draw' | 'upload'>('type');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Calculation outputs
  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [dpAmount, setDpAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  const symbol = currency === 'IDR' ? 'Rp' : currency === 'EUR' ? '€' : '$';

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
          if (inv.signature?.startsWith('data:image/')) {
            setSignatureTab('draw');
          } else {
            setSignatureTab('type');
          }
          
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCompany(prev => ({ ...prev, logo: reader.result as string }));
    };
    reader.readAsDataURL(file);
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
        logo: newCompany.logo || undefined,
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
        name: '', logo: '', address: '', phone: '', email: '', npwp: '', bankName: '', accountName: '', accountNo: ''
      });
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to create company');
    }
  };

  const handleDeleteCompany = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this company profile?')) return;
    try {
      await api.delete(`/companies/${id}`);
      setCompanies(prev => prev.filter(c => c.id !== id));
      if (companyId === id) {
        setCompanyId('');
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete company. It might be referenced in active invoices.');
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

  const handleDeleteClient = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this client profile?')) return;
    try {
      await api.delete(`/clients/${id}`);
      setClients(prev => prev.filter(c => c.id !== id));
      if (clientId === id) {
        setClientId('');
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete client. It might be referenced in active invoices.');
    }
  };

  // Canvas signature logic
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000'; // black ink

    const coords = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoords(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveSignatureFromCanvas();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature('');
  };

  const saveSignatureFromCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    setSignature(dataUrl);
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSignature(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveInvoice = async () => {
    if (!companyId) return setError('Please select or create a Company profile first');
    if (!clientId) return setError('Please select or create a Client profile first');

    setLoading(true);
    setError(null);

    const payload = {
      type,
      invoiceNumber: invoiceNumber || undefined,
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
      dpAmount: type === 'DOWN_PAYMENT' ? dpAmount : null,
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

  // Formatting calculations for live preview
  const formatMoney = (val: number) => {
    return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Translation values
  const t = {
    EN: {
      title: type === 'REGULER' ? 'INVOICE' : type === 'PROFORMA' ? 'PROFORMA INVOICE' : type === 'DOWN_PAYMENT' ? 'DOWN PAYMENT INVOICE' : 'SETTLEMENT INVOICE',
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
      dpLabel: `Down Payment (${dpPercent}%)`,
      remLabel: 'Remaining Balance',
      paidLabel: 'DP Paid Amount',
      remPayLabel: 'Remaining to Pay',
      notesLabel: 'Notes',
      termsLabel: 'Terms & Conditions',
      sigLabel: 'Authorized Signature',
      noBank: 'No bank details provided',
      subject: 'Subject'
    },
    ID: {
      title: type === 'REGULER' ? 'INVOICE' : type === 'PROFORMA' ? 'FAKTUR PROFORMA' : type === 'DOWN_PAYMENT' ? 'UANG MUKA INVOICE' : 'INVOICE PELUNASAN',
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
      dpLabel: `Uang Muka (${dpPercent}%)`,
      remLabel: 'Sisa Pembayaran',
      paidLabel: 'DP Terbayar',
      remPayLabel: 'Sisa Pelunasan',
      notesLabel: 'Notes',
      termsLabel: 'Terms & Conditions',
      sigLabel: 'Tanda Tangan Resmi',
      noBank: 'Detail bank tidak tersedia',
      subject: 'Perihal'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Banner Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <FileText className="text-cyan-400" />
            {invoiceId ? 'Edit Invoice' : 'Create New Invoice'}
          </h1>
          <p className="text-xs text-slate-450 mt-1">Configure layout, draw signatures, and output live invoices.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowLivePreview(!showLivePreview)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-700 hover:border-slate-600 bg-slate-800/40 rounded-xl text-xs font-semibold text-slate-200 transition-all"
          >
            {showLivePreview ? <EyeOff size={15} /> : <Eye size={15} />}
            {showLivePreview ? 'Hide Live Preview' : 'Show Live Preview'}
          </button>
          <button
            onClick={handleSaveInvoice}
            disabled={loading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-cyan-600/10"
          >
            {loading ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            {loading ? 'Saving...' : 'Save Invoice'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400 flex justify-between items-center animate-fade-in">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-xs hover:underline text-red-400/80">Dismiss</button>
        </div>
      )}

      {fetching ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-t-cyan-400 border-r-transparent border-slate-700 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* General Meta Section */}
              <div className="bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-md font-bold text-slate-200 flex items-center gap-2">
                  <FileText size={18} className="text-cyan-400" />
                  Invoice Metadata
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Invoice Type</label>
                    <select
                      value={type}
                      onChange={(e: any) => setType(e.target.value)}
                      className="custom-select w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
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
                      className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 placeholder-slate-600"
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
                      className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Project Reference (Optional)</label>
                    <input
                      type="text"
                      value={projectRef}
                      onChange={(e) => setProjectRef(e.target.value)}
                      placeholder="e.g. PRJ-2026"
                      className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Billing Currency</label>
                    <select
                      value={currency}
                      onChange={(e: any) => setCurrency(e.target.value)}
                      className="custom-select w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="IDR">IDR (Rp)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Invoice Date</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                        <Calendar size={15} />
                      </span>
                      <input
                        type="date"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                        className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2 pl-10 pr-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Due Date</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                        <Calendar size={15} />
                      </span>
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2 pl-10 pr-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Items Editor */}
              <div className="bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-md font-bold text-slate-200 flex items-center gap-2">
                    <DollarSign size={18} className="text-cyan-400" />
                    Line Items
                  </h2>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-cyan-400 hover:text-cyan-300 text-xs font-semibold rounded-xl flex items-center gap-1 transition-all"
                  >
                    <Plus size={13} /> Add Line Item
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="border border-slate-800 rounded-xl p-4 bg-[#0B132B]/40 space-y-3 relative group">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="absolute top-2 right-2 text-slate-500 hover:text-red-400 p-1.5 rounded transition-colors"
                        title="Remove item"
                      >
                        <Trash size={15} />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 pt-2">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Item Category</label>
                          <select
                            value={item.category}
                            onChange={(e) => handleItemChange(idx, 'category', e.target.value)}
                            className="custom-select w-full bg-[#0B132B] border border-slate-700 rounded-lg py-1.5 px-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
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
                            className="w-full bg-[#0B132B] border border-slate-700 rounded-lg py-1.5 px-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
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
                            className="w-full bg-[#0B132B] border border-slate-700 rounded-lg py-1.5 px-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 text-right"
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
                            className="w-full bg-[#0B132B] border border-slate-700 rounded-lg py-1.5 px-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Unit Price</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-500 text-[10px] font-semibold">{symbol}</span>
                            <input
                              type="number"
                              required
                              value={item.unitPrice || ''}
                              onChange={(e) => handleItemChange(idx, 'unitPrice', e.target.value)}
                              className="w-full bg-[#0B132B] border border-slate-700 rounded-lg py-1.5 pl-8 pr-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 text-right"
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
                            className="w-full bg-[#0B132B] border border-slate-700 rounded-lg py-1.5 px-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 text-right"
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
              <div className="bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-md font-bold text-slate-200">Footer Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Invoice Notes (Optional)</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Please note that service requires 7 days lead time..."
                      className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2 px-3.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Terms & Conditions (Optional)</label>
                    <textarea
                      rows={2}
                      value={terms}
                      onChange={(e) => setTerms(e.target.value)}
                      placeholder="e.g. Payments should be made in full within 30 days of the invoice date."
                      className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2 px-3.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Custom Thank You Message</label>
                    <input
                      type="text"
                      value={customThanks}
                      onChange={(e) => setCustomThanks(e.target.value)}
                      className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2 px-3.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Interactive Signature Board Component */}
                  <div className="sm:col-span-2 border-t border-slate-800/80 pt-4 mt-2">
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-xs font-semibold uppercase text-slate-400">Authorized Signature</label>
                      <div className="flex gap-2">
                        {([
                          { id: 'type', name: 'Text Name', icon: <FileText size={12} /> },
                          { id: 'draw', name: 'Draw Canvas', icon: <PenTool size={12} /> },
                          { id: 'upload', name: 'Upload Image', icon: <Upload size={12} /> }
                        ] as const).map((tab) => (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => {
                              setSignatureTab(tab.id);
                              if (tab.id !== 'type' && !signature.startsWith('data:image/')) {
                                setSignature(''); // Clear text signature for images
                              }
                            }}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                              signatureTab === tab.id
                                ? 'bg-cyan-600/15 text-cyan-400 border-cyan-500/50'
                                : 'bg-[#0B132B] text-slate-400 border-slate-700 hover:border-slate-650'
                            }`}
                          >
                            {tab.icon}
                            {tab.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {signatureTab === 'type' && (
                      <input
                        type="text"
                        value={signature.startsWith('data:image/') ? '' : signature}
                        onChange={(e) => setSignature(e.target.value)}
                        placeholder="e.g. John Doe (CEO)"
                        className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2 px-3.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    )}

                    {signatureTab === 'draw' && (
                      <div className="space-y-2">
                        <div className="border border-slate-700 bg-white rounded-xl overflow-hidden relative" style={{ height: '140px' }}>
                          <canvas
                            ref={canvasRef}
                            width={500}
                            height={140}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                            className="w-full h-full cursor-crosshair touch-none"
                          />
                          {signature && (
                            <span className="absolute bottom-2 left-2 text-[10px] bg-emerald-600 text-slate-900 font-bold px-2 py-0.5 rounded shadow">
                              Saved
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={clearCanvas}
                            className="px-3 py-1.5 border border-slate-700 hover:bg-slate-800 text-slate-350 text-xs font-semibold rounded-lg"
                          >
                            Clear Pad
                          </button>
                        </div>
                      </div>
                    )}

                    {signatureTab === 'upload' && (
                      <div className="space-y-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSignatureUpload}
                          className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2 px-3.5 text-xs text-slate-200 focus:outline-none"
                        />
                        {signature?.startsWith('data:image/') && (
                          <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between">
                            <img src={signature} alt="Uploaded signature" className="h-10 object-contain rounded bg-white p-1" />
                            <button
                              type="button"
                              onClick={() => setSignature('')}
                              className="text-xs text-red-400 hover:underline font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Relations and Summary */}
            <div className="space-y-6">
              
              {/* Company profile Selector */}
              <div className="bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6 space-y-4">
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
                  <div className="flex gap-2">
                    <select
                      value={companyId}
                      onChange={(e) => setCompanyId(e.target.value)}
                      className="custom-select flex-1 bg-[#0B132B] border border-slate-700 rounded-xl py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      {companies.length === 0 ? (
                        <option value="">-- Create a company profile --</option>
                      ) : (
                        companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
                      )}
                    </select>

                    {companyId && (
                      <button
                        type="button"
                        onClick={(e) => handleDeleteCompany(companyId, e)}
                        className="p-2 bg-red-950/20 border border-red-900/50 hover:bg-red-900/20 text-red-400 hover:text-red-350 rounded-xl transition-all"
                        title="Delete selected company"
                      >
                        <Trash size={16} />
                      </button>
                    )}
                  </div>

                  {companies.length > 0 && companyId && (
                    <div className="mt-3 text-xs text-slate-400 border-t border-slate-800 pt-3 space-y-2">
                      {companies.find(c => c.id === companyId)?.logo && (
                        <div className="mb-2 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                          <img
                            src={companies.find(c => c.id === companyId)?.logo}
                            alt="Company logo"
                            className="max-h-12 object-contain"
                          />
                        </div>
                      )}
                      <div className="font-bold text-slate-300">{companies.find(c => c.id === companyId)?.name}</div>
                      <div>{companies.find(c => c.id === companyId)?.address || 'No Address'}</div>
                      <div>NPWP: {companies.find(c => c.id === companyId)?.npwp || '-'}</div>
                      <div className="pt-2 text-[10px] uppercase font-bold text-slate-500">Bank Details</div>
                      {companies.find(c => c.id === companyId)?.bankAccounts?.map((b, i) => (
                        <div key={i} className="text-slate-350">
                          {b.bankName} - {b.accountNo} ({b.accountName})
                        </div>
                      )) || <div className="text-slate-500">No bank account</div>}
                    </div>
                  )}
                </div>
              </div>

              {/* Client selector */}
              <div className="bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6 space-y-4">
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
                  <div className="flex gap-2">
                    <select
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      className="custom-select flex-1 bg-[#0B132B] border border-slate-700 rounded-xl py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      {clients.length === 0 ? (
                        <option value="">-- Create a client profile --</option>
                      ) : (
                        clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
                      )}
                    </select>

                    {clientId && (
                      <button
                        type="button"
                        onClick={(e) => handleDeleteClient(clientId, e)}
                        className="p-2 bg-red-950/20 border border-red-900/50 hover:bg-red-900/20 text-red-400 hover:text-red-350 rounded-xl transition-all"
                        title="Delete selected client"
                      >
                        <Trash size={16} />
                      </button>
                    )}
                  </div>

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
              <div className="bg-[#1C2541]/60 border border-cyan-500/10 rounded-2xl p-6 space-y-4 shadow-xl shadow-cyan-900/10">
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
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors ${
                            discountType === 'none'
                              ? 'bg-cyan-600 text-slate-900 border-cyan-500'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          None
                        </button>
                        <button
                          onClick={() => setDiscountType('percent')}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors ${
                            discountType === 'percent'
                              ? 'bg-cyan-600 text-slate-900 border-cyan-500'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          %
                        </button>
                        <button
                          onClick={() => setDiscountType('nominal')}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors ${
                            discountType === 'nominal'
                              ? 'bg-cyan-600 text-slate-900 border-cyan-500'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          Val
                        </button>
                      </div>
                    </div>

                    {discountType !== 'none' && (
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-500 text-xs font-semibold">
                          {discountType === 'percent' ? '%' : symbol}
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={discountValue || ''}
                          onChange={(e) => setDiscountValue(Number(e.target.value) || 0)}
                          className="w-full bg-[#0B132B] border border-slate-700 rounded-lg py-1.5 pl-7 pr-2 text-xs text-slate-200 focus:outline-none text-right"
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
                        className="w-12 bg-[#0B132B] border border-slate-700 rounded-lg py-0.5 px-1.5 text-xs text-slate-200 focus:outline-none text-center"
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
                      <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-500 text-[10px] font-semibold">{symbol}</span>
                      <input
                        type="number"
                        min="0"
                        value={extraFee || ''}
                        onChange={(e) => setExtraFee(Number(e.target.value) || 0)}
                        className="w-full bg-[#0B132B] border border-slate-700 rounded-lg py-0.5 pl-7 pr-1.5 text-xs text-slate-200 focus:outline-none text-right"
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
                    <div className="border-t border-slate-800/85 pt-3 space-y-2 animate-slide-down">
                      <div className="flex justify-between items-center text-xs text-slate-400">
                        <span>DP Percentage:</span>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="1"
                            max="99"
                            value={dpPercent}
                            onChange={(e) => setDpPercent(Number(e.target.value) || 0)}
                            className="w-12 bg-[#0B132B] border border-slate-700 rounded-lg py-0.5 text-center text-xs text-slate-200"
                          />
                          <span>%</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-cyan-400">
                        <span>DP Amount:</span>
                        <span>{symbol} {dpAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-455">
                        <span>Remaining Balance:</span>
                        <span>{symbol} {remainingAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  )}

                  {/* Settlement/Pelunasan fields */}
                  {type === 'PELUNASAN' && (
                    <div className="border-t border-slate-800/85 pt-3 space-y-2 animate-slide-down">
                      <div className="flex justify-between items-center text-xs text-slate-400">
                        <span>DP Paid Amount:</span>
                        <div className="relative w-28">
                          <span className="absolute inset-y-0 left-0 pl-1.5 flex items-center text-slate-500 text-[10px] font-semibold">{symbol}</span>
                          <input
                            type="number"
                            min="0"
                            value={paidAmount || ''}
                            onChange={(e) => setPaidAmount(Number(e.target.value) || 0)}
                            className="w-full bg-[#0B132B] border border-slate-700 rounded-lg py-0.5 pl-6 pr-1 text-xs text-slate-200 text-right"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-cyan-405 font-semibold">
                        <span>Remaining to Pay:</span>
                        <span>{symbol} {remainingAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Live A4 Preview Rendered Inline Below Form */}
          {showLivePreview && (
            <div className="bg-[#1C2541]/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-4">
                <div>
                  <h2 className="text-md font-bold text-white flex items-center gap-2">
                    <Eye size={18} className="text-cyan-400" />
                    Live Invoice Preview (A4 Layout)
                  </h2>
                  <p className="text-[11px] text-slate-400">Updates instantly as you type inside the fields above.</p>
                </div>
                
                {/* Language Switcher */}
                <div className="flex items-center gap-2">
                  <Languages size={14} className="text-slate-400" />
                  <span className="text-xs text-slate-350">Language:</span>
                  <div className="inline-flex rounded-lg border border-slate-700 bg-[#0B132B] p-0.5">
                    {([
                      { id: 'EN', name: 'English' },
                      { id: 'ID', name: 'Indonesia' }
                    ] as const).map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setPreviewLang(l.id)}
                        className={`px-3 py-1 rounded-md text-[10px] font-extrabold transition-all ${
                          previewLang === l.id
                            ? 'bg-cyan-600 text-slate-900'
                            : 'text-slate-400 hover:text-slate-250'
                        }`}
                      >
                        {l.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* A4 Preview Sheet */}
              <div className="bg-white text-slate-800 p-8 rounded-xl shadow-2xl overflow-x-auto max-w-4xl mx-auto w-full border border-slate-200">
                <div className="min-w-[650px] space-y-6 text-left">
                  
                  {/* Top Header */}
                  <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                    <div>
                      {companies.find(c => c.id === companyId)?.logo ? (
                        <div className="mb-3 max-h-16 flex items-center">
                          <img
                            src={companies.find(c => c.id === companyId)?.logo}
                            alt="Logo"
                            className="max-h-12 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-[#0B132B] flex items-center justify-center text-white font-bold text-sm">I</div>
                          <span className="text-lg font-bold tracking-tight text-slate-900">Invora</span>
                        </div>
                      )}
                      
                      <div className="text-[11px] text-slate-500 space-y-0.5">
                        <div className="font-bold text-xs text-slate-750">{companies.find(c => c.id === companyId)?.name || 'Company Name'}</div>
                        <div>{companies.find(c => c.id === companyId)?.address || 'No Address'}</div>
                        <div>Email: {companies.find(c => c.id === companyId)?.email || '-'} | Phone: {companies.find(c => c.id === companyId)?.phone || '-'}</div>
                        {companies.find(c => c.id === companyId)?.npwp && (
                          <div>NPWP: {companies.find(c => c.id === companyId)?.npwp}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <h1 className="text-xl font-extrabold text-[#1E3A5F] tracking-wide mb-1 uppercase">{t[previewLang].title}</h1>
                      <div className="text-xs font-semibold text-slate-500 mb-4">{invoiceNumber || '#AUTO-GENERATED'}</div>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px] text-slate-500 justify-items-end">
                        <span className="font-semibold">{t[previewLang].invoiceDate}:</span>
                        <span>{invoiceDate}</span>
                        <span className="font-semibold">{t[previewLang].dueDate}:</span>
                        <span>{dueDate}</span>
                        {projectRef && (
                          <>
                            <span className="font-semibold">{t[previewLang].projRef}:</span>
                            <span>{projectRef}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Billing client and subject info */}
                  <div className="grid grid-cols-2 gap-8 py-4 text-[11px] border-b border-slate-100">
                    <div>
                      <div className="text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-1.5">{t[previewLang].billedTo}</div>
                      <div className="text-xs font-bold text-slate-800 mb-0.5">{clients.find(c => c.id === clientId)?.name || 'Client Name'}</div>
                      {clients.find(c => c.id === clientId)?.pic && (
                        <div className="font-medium text-slate-600 mb-0.5">u.p. {clients.find(c => c.id === clientId)?.pic}</div>
                      )}
                      <div className="text-slate-500 leading-relaxed">{clients.find(c => c.id === clientId)?.address || '-'}</div>
                      <div className="text-slate-500 mt-1">Phone: {clients.find(c => c.id === clientId)?.phone || '-'} | Email: {clients.find(c => c.id === clientId)?.email || '-'}</div>
                    </div>
                    <div>
                      {title && (
                        <>
                          <div className="text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-1.5">{t[previewLang].subject}</div>
                          <div className="text-xs font-medium text-slate-700 leading-relaxed">{title}</div>
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
                      {items.map((item, idx) => (
                        <tr key={idx} className="border-b border-slate-100 text-xs">
                          <td className="py-3 text-center text-slate-500">{idx + 1}</td>
                          <td className="py-3">
                            <div className="font-medium text-slate-800">{item.category === 'jasa' ? (previewLang === 'ID' ? 'Jasa' : 'Services') : (previewLang === 'ID' ? 'Produk' : 'Products')}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.description}</div>
                          </td>
                          <td className="py-3 text-center text-slate-700">{item.qty} {item.unit || 'unit'}</td>
                          <td className="py-3 text-right text-slate-700">{symbol} {formatMoney(item.unitPrice)}</td>
                          <td className="py-3 text-center text-slate-700">{item.discountPct ? `${item.discountPct}%` : '-'}</td>
                          <td className="py-3 text-right font-medium text-slate-800">{symbol} {formatMoney(item.subtotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Bottom Layout Calculations & Notes */}
                  <div className="grid grid-cols-12 gap-6 mt-4 text-[11px]">
                    {/* Bank Details & Notes */}
                    <div className="col-span-7 space-y-4">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="font-bold text-slate-650 uppercase tracking-wider text-[9px] mb-2">Payment Details</div>
                        {companies.find(c => c.id === companyId)?.bankAccounts && companies.find(c => c.id === companyId)!.bankAccounts!.length > 0 ? (
                          companies.find(c => c.id === companyId)!.bankAccounts!.map((bank, i) => (
                            <div key={i} className="mb-2 text-slate-600 text-[10px]">
                              <div className="font-bold text-slate-700">{bank.bankName}</div>
                              <div>Account Name: {bank.accountName}</div>
                              <div>Account No: {bank.accountNo}</div>
                            </div>
                          ))
                        ) : (
                          <div className="text-slate-400 italic text-[10px]">{t[previewLang].noBank}</div>
                        )}
                      </div>
                      
                      {/* Formatted Notes Layout */}
                      {notes && (
                        <div className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                          <div className="font-bold text-slate-700 uppercase tracking-wider text-[9px] mb-1">{t[previewLang].notesLabel}</div>
                          <div>{notes}</div>
                        </div>
                      )}

                      {/* Formatted Terms Layout */}
                      {terms && (
                        <div className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                          <div className="font-bold text-slate-700 uppercase tracking-wider text-[9px] mb-1">{t[previewLang].termsLabel}</div>
                          <div>{terms}</div>
                        </div>
                      )}
                    </div>

                    {/* Calculations Totals (right) */}
                    <div className="col-span-5 flex flex-col justify-start space-y-1.5 text-right">
                      <div className="flex justify-between text-slate-500">
                        <span>{t[previewLang].subtotal}:</span>
                        <span>{symbol} {formatMoney(subtotal)}</span>
                      </div>

                      {discountType !== 'none' && discountValue > 0 && (
                        <div className="flex justify-between text-amber-600 font-medium">
                          <span>
                            {t[previewLang].discount} ({discountType === 'percent' ? `${discountValue}%` : 'Val'}):
                          </span>
                          <span>
                            -{symbol} {formatMoney(discountType === 'percent' ? subtotal * (discountValue / 100) : discountValue)}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between text-slate-500">
                        <span>{t[previewLang].tax} ({taxPercent}%):</span>
                        <span>{symbol} {formatMoney(taxAmount)}</span>
                      </div>

                      {extraFee > 0 && (
                        <div className="flex justify-between text-slate-500">
                          <span>Extra Fee:</span>
                          <span>{symbol} {formatMoney(extraFee)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-xs font-bold text-slate-900 border-t border-slate-200 pt-2 mt-1">
                        <span>{t[previewLang].total}:</span>
                        <span className="text-cyan-700">{symbol} {formatMoney(total)}</span>
                      </div>

                      {type === 'DOWN_PAYMENT' && (
                        <div className="border-t border-slate-150 pt-2 space-y-1">
                          <div className="flex justify-between text-slate-700 font-semibold">
                            <span>{t[previewLang].dpLabel}:</span>
                            <span>{symbol} {formatMoney(dpAmount)}</span>
                          </div>
                          <div className="flex justify-between text-slate-500">
                            <span>{t[previewLang].remLabel}:</span>
                            <span>{symbol} {formatMoney(remainingAmount)}</span>
                          </div>
                        </div>
                      )}

                      {type === 'PELUNASAN' && (
                        <div className="border-t border-slate-150 pt-2 space-y-1">
                          <div className="flex justify-between text-slate-500">
                            <span>{t[previewLang].paidLabel}:</span>
                            <span>{symbol} {formatMoney(paidAmount)}</span>
                          </div>
                          <div className="flex justify-between text-slate-700 font-semibold">
                            <span>{t[previewLang].remPayLabel}:</span>
                            <span>{symbol} {formatMoney(remainingAmount)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer message and Signature */}
                  <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-end text-[11px]">
                    <div>
                      <div className="font-bold text-slate-700">{companies.find(c => c.id === companyId)?.name || 'Invora Invoicing'}</div>
                      <div className="text-slate-450 italic mt-0.5">{customThanks}</div>
                    </div>

                    <div className="text-center" style={{ minWidth: '150px' }}>
                      <div className="text-slate-450 font-medium mb-1.5 uppercase tracking-wider text-[9px]">{t[previewLang].sigLabel}</div>
                      
                      {signature ? (
                        signature.startsWith('data:image/') ? (
                          <div className="my-2 h-14 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg p-1">
                            <img
                              src={signature}
                              alt="Signature"
                              className="max-h-12 object-contain"
                            />
                          </div>
                        ) : (
                          <div className="h-10 flex items-center justify-center font-bold text-slate-800 text-xs italic">
                            {signature}
                          </div>
                        )
                      ) : (
                        <div className="h-10 flex items-center justify-center text-slate-350 italic text-[10px]">
                          Pending signature
                        </div>
                      )}
                      
                      <div className="w-32 border-b border-slate-200 mx-auto mt-2"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
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
                
                {/* Logo uploader */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1.5">Company Logo</label>
                  <div className="flex items-center gap-4">
                    {newCompany.logo && (
                      <div className="relative w-16 h-16 rounded-xl bg-slate-900 border border-slate-750 flex items-center justify-center overflow-hidden p-1">
                        <img src={newCompany.logo} alt="Preview" className="w-full h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => setNewCompany(prev => ({ ...prev, logo: '' }))}
                          className="absolute -top-1.5 -right-1.5 bg-red-650 hover:bg-red-600 text-white rounded-full p-0.5 text-[8px]"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-xs text-slate-350 focus:outline-none"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">Recommended size: Square/Landscape, transparent backdrop PNG.</p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-250 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Address</label>
                  <input
                    type="text"
                    value={newCompany.address}
                    onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-250 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Phone</label>
                  <input
                    type="text"
                    value={newCompany.phone}
                    onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-250 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    value={newCompany.email}
                    onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-250 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">NPWP (Tax Registration No)</label>
                  <input
                    type="text"
                    value={newCompany.npwp}
                    onChange={(e) => setNewCompany({ ...newCompany, npwp: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-255 focus:outline-none"
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
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-250 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Account Holder Name</label>
                  <input
                    type="text"
                    placeholder="e.g. PT Tech Indonesia"
                    value={newCompany.accountName}
                    onChange={(e) => setNewCompany({ ...newCompany, accountName: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-250 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Account Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 12345678"
                    value={newCompany.accountNo}
                    onChange={(e) => setNewCompany({ ...newCompany, accountNo: e.target.value })}
                    className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-250 focus:outline-none"
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
                  className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-250 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Attention PIC (Person in Charge)</label>
                <input
                  type="text"
                  placeholder="e.g. Ms. Jane Smith"
                  value={newClient.pic}
                  onChange={(e) => setNewClient({ ...newClient, pic: e.target.value })}
                  className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-250 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Address</label>
                <input
                  type="text"
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-250 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Phone</label>
                <input
                  type="text"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-250 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-450 uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-255 focus:outline-none"
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
