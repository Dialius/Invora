import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  LogOut, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '../store/auth';

export const ConsoleLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'New Invoice',
      path: '/invoices/new',
      icon: PlusCircle
    },
    {
      name: 'FAQ',
      path: '/faq',
      icon: HelpCircle
    }
  ];

  // Helper to generate dynamic breadcrumbs
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/dashboard') return ['Project Overview', 'Dashboard'];
    if (path === '/invoices/new') return ['Invoices', 'Create New'];
    if (path.includes('/edit')) return ['Invoices', 'Edit Invoice'];
    if (path === '/faq') return ['Support', 'FAQ'];
    if (path === '/contact') return ['Support', 'Contact Us'];
    return ['Console'];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 flex font-sans">
      
      {/* 1. Sidebar - Desktop */}
      <aside 
        className={`hidden md:flex flex-col bg-[#0F172A] text-slate-300 border-r border-slate-800 transition-all duration-300 relative z-30 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <Link to="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <rect x="20" y="15" width="60" height="70" rx="10" stroke="#0D9488" strokeWidth="8" />
              <path d="M35 35H65" stroke="#0D9488" strokeWidth="8" strokeLinecap="round" />
              <path d="M35 50H65" stroke="#1E3A5F" strokeWidth="8" strokeLinecap="round" />
              <path d="M35 65H55" stroke="#1E3A5F" strokeWidth="8" strokeLinecap="round" />
            </svg>
            {!collapsed && (
              <span className="text-lg font-bold tracking-tight text-white uppercase">Invora</span>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          <div className={`text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-2 ${collapsed ? 'sr-only' : ''}`}>
            Navigation
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isActive 
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/50' 
                    : 'hover:bg-slate-800/40 hover:text-white text-slate-400'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-300'} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer info (User profile) */}
        <div className="p-3 border-t border-slate-800">
          {!collapsed && (
            <div className="bg-slate-800/40 rounded-xl p-3 mb-2 border border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-800 text-teal-100 flex items-center justify-center font-bold text-xs">
                  {user?.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">{user?.name || 'User'}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user?.email || 'free@invora.co'}</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                <div className="flex items-center gap-1">
                  <Sparkles size={12} className="text-amber-500" />
                  <span>Spark plan</span>
                </div>
                <span className="bg-teal-950 text-teal-400 border border-teal-800 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Free</span>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Log Out"
          >
            <LogOut size={18} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-full p-1 shadow-md transition-transform z-40 hidden md:block"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* 2. Mobile Sidebar Slide-over */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-slate-900/60 backdrop-blur-sm">
          <div className="w-64 bg-[#0F172A] text-slate-300 flex flex-col p-4 relative">
            <button 
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 mb-8">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="15" width="60" height="70" rx="10" stroke="#0D9488" strokeWidth="8" />
                <path d="M35 35H65" stroke="#0D9488" strokeWidth="8" strokeLinecap="round" />
                <path d="M35 50H65" stroke="#1E3A5F" strokeWidth="8" strokeLinecap="round" />
                <path d="M35 65H55" stroke="#1E3A5F" strokeWidth="8" strokeLinecap="round" />
              </svg>
              <span className="text-lg font-bold text-white uppercase">Invora</span>
            </Link>

            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-slate-800 text-white border border-slate-700/50' 
                        : 'hover:bg-slate-800/40 text-slate-400'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-teal-400' : 'text-slate-400'} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-slate-800 pt-4 mt-auto">
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="w-8 h-8 rounded-full bg-teal-800 text-teal-100 flex items-center justify-center font-bold text-xs">
                  {user?.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">{user?.name || 'User'}</p>
                  <p className="text-[10px] text-slate-500">{user?.email || 'free@invora.co'}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Utility Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileOpen(true)}
              className="p-1 text-slate-650 hover:bg-slate-50 rounded-lg md:hidden"
            >
              <Menu size={20} />
            </button>
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-550">
              {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {idx > 0 && <span className="text-slate-350">/</span>}
                  <span className={idx === breadcrumbs.length - 1 ? 'text-slate-900 font-semibold' : 'text-slate-400'}>
                    {crumb}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {location.pathname !== '/dashboard' && (
              <Link 
                to="/dashboard" 
                className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-250 transition-colors"
              >
                Back to Dashboard
              </Link>
            )}
            
            <div className="text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
              Console v1.0
            </div>
          </div>
        </header>

        {/* Scrollable Work Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
};
