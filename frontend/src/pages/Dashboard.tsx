import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Download, Edit, Trash, Copy, FileText, Eye } from 'lucide-react';
import { api } from '../utils/api';
import { useAuthStore } from '../store/auth';
import { CustomSelect } from '../components/CustomSelect';

interface Invoice {
  id: string;
  invoiceNumber: string;
  type: string;
  status: string;
  title?: string;
  currency: string;
  invoiceDate: string;
  dueDate: string;
  total: number;
  remainingAmount: number;
  client: { name: string };
  company: { name: string };
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter/Search states
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statsCurrency, setStatsCurrency] = useState<'IDR' | 'USD' | 'EUR'>('IDR');

  // Load invoices
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/invoices', {
        params: {
          search: search || undefined,
          status: statusFilter === 'ALL' ? undefined : statusFilter,
          type: typeFilter === 'ALL' ? undefined : typeFilter,
        }
      });
      setInvoices(res.data.invoices || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [search, statusFilter, typeFilter]);

  // Row Action Handlers
  const handleDuplicate = async (id: string) => {
    try {
      await api.post(`/invoices/${id}/duplicate`);
      fetchInvoices();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to duplicate invoice');
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/invoices/${id}/status`, { status: newStatus });
      fetchInvoices();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invoice permanently?')) return;
    try {
      await api.delete(`/invoices/${id}`);
      fetchInvoices();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete invoice');
    }
  };

  const handleDownloadPDF = (id: string) => {
    window.open(`/api/invoices/${id}/pdf`, '_blank');
  };

  // Compute stats based on loaded invoices for selected currency
  const stats = (() => {
    const currencyInvoices = invoices.filter(inv => inv.currency === statsCurrency);
    const totalCount = currencyInvoices.length;
    
    const revenue = currencyInvoices
      .filter(inv => inv.status === 'PAID')
      .reduce((sum, inv) => sum + Number(inv.total), 0);

    const outstanding = currencyInvoices
      .filter(inv => inv.status === 'SENT')
      .reduce((sum, inv) => sum + Number(inv.remainingAmount), 0);

    const drafts = currencyInvoices
      .filter(inv => inv.status === 'DRAFT')
      .reduce((sum, inv) => sum + Number(inv.total), 0);

    return { totalCount, revenue, outstanding, drafts };
  })();

  const formatCurrencyVal = (amount: number) => {
    if (statsCurrency === 'IDR') {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    }
    if (statsCurrency === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }
    if (statsCurrency === 'EUR') {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
    }
    return `${statsCurrency} ${amount.toLocaleString()}`;
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-150';
      case 'SENT':
        return 'bg-blue-50 text-blue-700 border border-blue-150';
      case 'DRAFT':
        return 'bg-amber-50 text-amber-700 border border-amber-150';
      case 'VOID':
        return 'bg-red-50 text-red-700 border border-red-150';
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-150';
    }
  };

  return (
    <div className="pb-12 text-slate-800">
      <main className="max-w-7xl mx-auto pt-4">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400 flex justify-between items-center animate-fade-in">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-xs hover:underline text-red-400/80">Dismiss</button>
          </div>
        )}
        
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">Invoices Overview</h1>
            <p className="text-slate-500 text-sm mt-0.5">Welcome back, {user?.name}. Monitor billing request flows.</p>
          </div>
          <button
            onClick={() => navigate('/invoices/new')}
            className="bg-slate-900 hover:bg-slate-850 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 text-xs transition-all shadow-sm"
          >
            <Plus size={16} />
            New Invoice
          </button>
        </div>

        {/* Currency Stat Toggle & Grid */}
        <div className="mb-6 flex justify-between items-center bg-white border border-[#E2DED7] p-4 rounded-xl shadow-sm">
          <span className="text-sm font-semibold text-stone-700">Statistics Base Currency:</span>
          <CustomSelect
            value={statsCurrency}
            onChange={(v) => setStatsCurrency(v as 'IDR' | 'USD' | 'EUR')}
            options={[
              { value: 'IDR', label: 'IDR (Rp)' },
              { value: 'USD', label: 'USD ($)' },
              { value: 'EUR', label: 'EUR (€)' },
            ]}
            placeholder="Currency"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Invoices</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{stats.totalCount}</span>
              <span className="text-slate-550 text-xs">issued</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Revenue (Paid)</div>
            <div className="text-2xl font-bold text-teal-600">{formatCurrencyVal(stats.revenue)}</div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Outstanding (Sent)</div>
            <div className="text-2xl font-bold text-blue-600">{formatCurrencyVal(stats.outstanding)}</div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Drafts Value</div>
            <div className="text-2xl font-bold text-amber-600">{formatCurrencyVal(stats.drafts)}</div>
          </div>
        </div>

        {/* Filter and Table Panel */}
        <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm">
          
          {/* Controls Bar */}
          <div className="p-4 border-b border-[#E2DED7] flex flex-col md:flex-row gap-4 justify-between bg-stone-50/50">
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search invoice number, client or subject..."
                className="w-full bg-white border border-[#E2DED7] rounded-lg py-1.5 pl-10 pr-4 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 transition-all shadow-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Filter size={14} className="text-stone-400" />
                <span className="text-xs text-stone-500">Status:</span>
              </div>
              <CustomSelect
                value={statusFilter}
                onChange={(v) => setStatusFilter(v)}
                options={[
                  { value: 'ALL', label: 'All Status' },
                  { value: 'DRAFT', label: 'Draft' },
                  { value: 'SENT', label: 'Sent' },
                  { value: 'PAID', label: 'Paid' },
                  { value: 'VOID', label: 'Void' },
                ]}
                placeholder="Status"
              />

              <span className="text-xs text-stone-500">Type:</span>
              <CustomSelect
                value={typeFilter}
                onChange={(v) => setTypeFilter(v)}
                options={[
                  { value: 'ALL', label: 'All Types' },
                  { value: 'REGULER', label: 'Regular' },
                  { value: 'PROFORMA', label: 'Proforma' },
                  { value: 'DOWN_PAYMENT', label: 'Down Payment' },
                  { value: 'PELUNASAN', label: 'Settlement' },
                ]}
                placeholder="Type"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-t-teal-600 border-r-transparent border-[#E2DED7] rounded-full animate-spin"></div>
              </div>
            ) : invoices.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <FileText size={48} className="mx-auto mb-3 text-slate-600" />
                <p className="text-sm">No invoices found. Get started by creating your first bill request!</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Invoice No</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {inv.invoiceNumber}
                        {inv.title && <div className="text-[10px] text-slate-500 font-normal mt-0.5">{inv.title}</div>}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {inv.client?.name || '-'}
                      </td>
                      <td className="py-3.5 px-4">
                        {(() => {
                          const typeConfig: Record<string, { bg: string; color: string; label: string }> = {
                            REGULER:      { bg: '#CCFBF1', color: '#0F766E', label: '● Regular' },
                            PROFORMA:     { bg: '#FEF3C7', color: '#92400E', label: '◆ Proforma' },
                            DOWN_PAYMENT: { bg: '#EDE9FE', color: '#3730A3', label: '▲ Down Payment' },
                            PELUNASAN:    { bg: '#D1FAE5', color: '#065F46', label: '✓ Settlement' },
                          };
                          const cfg = typeConfig[inv.type] || { bg: '#F1F5F9', color: '#475569', label: inv.type };
                          return (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide" style={{ background: cfg.bg, color: cfg.color }}>
                              {cfg.label}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="py-3.5 px-4 text-slate-550">
                        {new Date(inv.invoiceDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-slate-900">
                        {inv.currency} {Number(inv.total).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getStatusBadgeClass(inv.status)}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        {/* Status quick toggle triggers */}
                        {inv.status === 'DRAFT' && (
                          <button
                            onClick={() => handleUpdateStatus(inv.id, 'SENT')}
                            className="px-2 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 rounded font-semibold transition-colors"
                            title="Mark as Sent"
                          >
                            Send
                          </button>
                        )}
                        {inv.status === 'SENT' && (
                          <button
                            onClick={() => handleUpdateStatus(inv.id, 'PAID')}
                            className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-teal-600 rounded font-semibold transition-colors"
                            title="Mark as Paid"
                          >
                            Paid
                          </button>
                        )}

                        <button
                          onClick={() => navigate(`/invoices/${inv.id}/view`)}
                          className="p-1 text-stone-400 hover:text-teal-600 rounded transition-colors"
                          title="View Public Link"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(inv.id)}
                          className="p-1 text-stone-400 hover:text-teal-600 rounded transition-colors"
                          title="Download PDF"
                        >
                          <Download size={14} />
                        </button>
                        <button
                          onClick={() => handleDuplicate(inv.id)}
                          className="p-1 text-stone-400 hover:text-teal-600 rounded transition-colors"
                          title="Duplicate Invoice"
                        >
                          <Copy size={14} />
                        </button>
                        <button
                          onClick={() => navigate(`/invoices/${inv.id}/edit`)}
                          className="p-1 text-stone-400 hover:text-teal-600 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(inv.id)}
                          className="p-1 text-stone-400 hover:text-red-500 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
