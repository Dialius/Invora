import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Search, Filter, Download, Edit, Trash, Copy, FileText } from 'lucide-react';
import { api } from '../utils/api';
import { useAuthStore } from '../store/auth';

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
  const { user, logout } = useAuthStore();
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

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

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
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      case 'SENT':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
      case 'DRAFT':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
      case 'VOID':
        return 'bg-red-500/10 text-red-400 border border-red-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 pb-12">
      {/* Header bar */}
      <header className="bg-[#1C2541]/40 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="15" width="60" height="70" rx="10" stroke="#00A8CC" stroke-width="8" />
              <path d="M35 35H65" stroke="#00A8CC" stroke-width="8" stroke-linecap="round" />
              <path d="M35 50H65" stroke="#1E3A5F" stroke-width="8" stroke-linecap="round" />
              <path d="M35 65H55" stroke="#1E3A5F" stroke-width="8" stroke-linecap="round" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-slate-100">Invora</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <div className="text-xs font-semibold text-slate-300">{user?.name}</div>
              <div className="text-[10px] text-slate-500">{user?.email}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400 flex justify-between items-center animate-fade-in">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-xs hover:underline text-red-400/80">Dismiss</button>
          </div>
        )}
        
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">Invoices Overview</h1>
            <p className="text-slate-400 text-sm mt-0.5">Welcome back, {user?.name}. Monitor billing request flows.</p>
          </div>
          <button
            onClick={() => navigate('/invoices/new')}
            className="bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm transition-all shadow-lg shadow-cyan-500/20"
          >
            <Plus size={16} />
            New Invoice
          </button>
        </div>

        {/* Currency Stat Toggle & Grid */}
        <div className="mb-6 flex justify-between items-center bg-[#1C2541]/20 border border-slate-800 p-4 rounded-xl">
          <span className="text-sm font-semibold text-slate-300">Statistics Base Currency:</span>
          <select
            value={statsCurrency}
            onChange={(e: any) => setStatsCurrency(e.target.value)}
            className="bg-[#0B132B] border border-slate-700 rounded-lg py-1 px-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="IDR">IDR (Rp)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1C2541]/40 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Invoices</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-100">{stats.totalCount}</span>
              <span className="text-slate-400 text-xs">issued</span>
            </div>
          </div>

          <div className="bg-[#1C2541]/40 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Revenue (Paid)</div>
            <div className="text-2xl font-bold text-emerald-400">{formatCurrencyVal(stats.revenue)}</div>
          </div>

          <div className="bg-[#1C2541]/40 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Outstanding (Sent)</div>
            <div className="text-2xl font-bold text-blue-400">{formatCurrencyVal(stats.outstanding)}</div>
          </div>

          <div className="bg-[#1C2541]/40 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Drafts Value</div>
            <div className="text-2xl font-bold text-amber-400">{formatCurrencyVal(stats.drafts)}</div>
          </div>
        </div>

        {/* Filter and Table Panel */}
        <div className="bg-[#1C2541]/30 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          
          {/* Controls Bar */}
          <div className="p-4 border-b border-slate-850 flex flex-col md:flex-row gap-4 justify-between bg-[#0B132B]/40">
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search invoice number, client or subject..."
                className="w-full bg-[#0B132B]/80 border border-slate-700 rounded-lg py-1.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Filter size={14} className="text-slate-500" />
                <span className="text-xs text-slate-400">Status:</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#0B132B] border border-slate-700 rounded-lg py-1 px-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="SENT">Sent</option>
                <option value="PAID">Paid</option>
                <option value="VOID">Void</option>
              </select>

              <span className="text-xs text-slate-400">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-[#0B132B] border border-slate-700 rounded-lg py-1 px-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Types</option>
                <option value="REGULER">Regular</option>
                <option value="PROFORMA">Proforma</option>
                <option value="DOWN_PAYMENT">Down Payment</option>
                <option value="PELUNASAN">Settlement</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-t-cyan-400 border-r-transparent border-slate-700 rounded-full animate-spin"></div>
              </div>
            ) : invoices.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <FileText size={48} className="mx-auto mb-3 text-slate-600" />
                <p className="text-sm">No invoices found. Get started by creating your first bill request!</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-850 bg-slate-850/20 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Invoice No</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-xs">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-850/10 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-200">
                        {inv.invoiceNumber}
                        {inv.title && <div className="text-[10px] text-slate-500 font-normal mt-0.5">{inv.title}</div>}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {inv.client?.name || '-'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {inv.type.replace('_', ' ')}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {new Date(inv.invoiceDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-slate-200">
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
                            className="px-2 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded font-semibold transition-colors"
                            title="Mark as Sent"
                          >
                            Send
                          </button>
                        )}
                        {inv.status === 'SENT' && (
                          <button
                            onClick={() => handleUpdateStatus(inv.id, 'PAID')}
                            className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded font-semibold transition-colors"
                            title="Mark as Paid"
                          >
                            Paid
                          </button>
                        )}

                        <button
                          onClick={() => handleDownloadPDF(inv.id)}
                          className="p-1 text-slate-400 hover:text-cyan-400 rounded transition-colors"
                          title="Download PDF"
                        >
                          <Download size={14} />
                        </button>
                        <button
                          onClick={() => handleDuplicate(inv.id)}
                          className="p-1 text-slate-400 hover:text-cyan-400 rounded transition-colors"
                          title="Duplicate Invoice"
                        >
                          <Copy size={14} />
                        </button>
                        <button
                          onClick={() => navigate(`/invoices/${inv.id}/edit`)}
                          className="p-1 text-slate-400 hover:text-cyan-400 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(inv.id)}
                          className="p-1 text-slate-400 hover:text-red-400 rounded transition-colors"
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
