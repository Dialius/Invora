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
  HelpCircle,
  Globe,
  ExternalLink,
  Languages,
} from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { useTranslation } from '../context/i18n';
import { Logo } from './Logo';

export const ConsoleLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { lang, setLang, t } = useTranslation();
  const toggle = () => setLang(lang === 'EN' ? 'ID' : 'EN');
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: t('console.dashboard'),  path: '/dashboard',    icon: LayoutDashboard },
    { name: t('console.newInvoice'), path: '/invoices/new', icon: PlusCircle },
    { name: t('console.faq'),        path: '/faq',          icon: HelpCircle },
  ];

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/dashboard')    return [t('bc.workspace'), t('bc.dashboard')];
    if (path === '/invoices/new') return [t('bc.invoices'),  t('bc.createNew')];
    if (path.includes('/edit'))   return [t('bc.invoices'),  t('bc.edit')];
    if (path === '/faq')          return [t('bc.support'),   t('bc.faq')];
    return [t('bc.console')];
  };

  const breadcrumbs = getBreadcrumbs();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Sidebar nav item component
  const NavItem = ({ item, onClick }: { item: typeof navItems[0]; onClick?: () => void }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;
    return (
      <Link
        to={item.path}
        onClick={onClick}
        title={collapsed ? item.name : undefined}
        className={`
          group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative
          ${isActive
            ? 'bg-stone-800 text-white border-l-2 border-teal-500 pl-[10px]'
            : 'text-stone-400 hover:text-white hover:bg-stone-800/60 border-l-2 border-transparent'
          }
        `}
      >
        <Icon size={17} className={`flex-shrink-0 transition-colors ${isActive ? 'text-teal-400' : 'text-stone-500 group-hover:text-stone-300'}`} />
        {!collapsed && <span className="truncate">{item.name}</span>}
      </Link>
    );
  };

  // User avatar
  const UserAvatar = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
    const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : 'IN';
    const cls = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-9 h-9 text-xs';
    return (
      <div className={`${cls} rounded-full bg-teal-900/60 text-teal-300 border border-teal-800/50 flex items-center justify-center font-bold flex-shrink-0`}>
        {initials}
      </div>
    );
  };

  // Language pill toggle (for top header)
  const LangToggle = () => (
    <button
      onClick={toggle}
      title={t('console.language')}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-800 text-xs font-semibold transition-all shadow-sm"
    >
      <Languages size={13} className="text-teal-600" />
      <span>{lang === 'EN' ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F0EDE8] text-stone-800 flex font-sans">

      {/* ─── Sidebar — Desktop ─────────────────────────────────────────── */}
      <aside
        className={`
          hidden md:flex flex-col
          bg-[#1C1917] border-r border-[#44403C]
          transition-all duration-300 ease-out relative z-30 flex-shrink-0
          h-screen sticky top-0
          ${collapsed ? 'w-16' : 'w-60'}
        `}
      >
        {/* Logo / Brand */}
        <div className={`h-16 flex items-center border-b border-[#44403C] flex-shrink-0 ${collapsed ? 'justify-center px-0' : 'px-4 gap-2.5'}`}>
          <Link to="/dashboard" className="flex items-center gap-2.5 overflow-hidden min-w-0">
            <Logo size={26} showText={false} />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-5 px-2 space-y-0.5 overflow-y-auto min-h-0 custom-scrollbar">
          {!collapsed && (
            <p className="text-[10px] font-semibold text-stone-600 uppercase tracking-widest px-3 mb-3">
              {t('console.navigation')}
            </p>
          )}
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-[#44403C] p-3 space-y-2">
          {/* Language toggle in sidebar (when expanded) */}
          {!collapsed && (
            <button
              onClick={toggle}
              title={t('console.language')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-stone-400 hover:text-white hover:bg-stone-800/60 transition-colors"
            >
              <Languages size={15} className="flex-shrink-0 text-stone-500" />
              <span className="flex-1 text-left">{t('console.language')}</span>
              <span className="text-[10px] font-bold bg-stone-800 border border-stone-700 px-1.5 py-0.5 rounded text-teal-400">
                {lang}
              </span>
            </button>
          )}

          {/* User card */}
          {!collapsed && (
            <div className="bg-[#292524] rounded-xl p-3 border border-[#44403C]">
              <div className="flex items-center gap-2.5">
                <UserAvatar />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white truncate leading-tight">{user?.name || 'User'}</p>
                  <p className="text-[10px] text-stone-500 truncate">{user?.email || ''}</p>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#44403C] flex items-center justify-between">
                <span className="text-[10px] text-stone-500">{t('console.freePlan')}</span>
                <span className="text-[10px] font-bold bg-teal-950/60 text-teal-400 border border-teal-900/50 px-1.5 py-0.5 rounded uppercase tracking-wider">{t('console.free')}</span>
              </div>
            </div>
          )}

          {/* Back to site */}
          <Link
            to="/"
            title={collapsed ? t('console.publicSite') : undefined}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-300 hover:bg-stone-800/40 transition-colors"
          >
            <Globe size={15} className="flex-shrink-0" />
            {!collapsed && <span>{t('console.publicSite')}</span>}
            {!collapsed && <ExternalLink size={11} className="ml-auto opacity-50" />}
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title={collapsed ? t('console.signOut') : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={15} className="flex-shrink-0" />
            {!collapsed && <span>{t('console.signOut')}</span>}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 bg-[#292524] border border-[#44403C] hover:bg-stone-700 text-stone-400 hover:text-white rounded-full p-1 shadow-lg transition-colors z-40 hidden md:flex items-center justify-center"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* ─── Mobile Slide-over ──────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative w-64 bg-[#1C1917] flex flex-col animate-slideInLeft"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-[#44403C]">
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                <Logo size={24} showText={false} />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-stone-500 hover:text-white p-1 rounded">
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto custom-scrollbar">
              <p className="text-[10px] font-semibold text-stone-600 uppercase tracking-widest px-3 mb-3">{t('console.navigation')}</p>
              {navItems.map((item) => (
                <NavItem key={item.path} item={item} onClick={() => setMobileOpen(false)} />
              ))}
            </nav>

            <div className="border-t border-[#44403C] p-3 space-y-2">
              {/* Language toggle */}
              <button
                onClick={toggle}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-stone-400 hover:text-white hover:bg-stone-800/60 transition-colors font-medium"
              >
                <Languages size={14} />
                <span>{t('console.language')}</span>
                <span className="ml-auto text-[10px] font-bold bg-stone-800 border border-stone-700 px-1.5 py-0.5 rounded text-teal-400">{lang}</span>
              </button>

              <div className="flex items-center gap-2.5 px-2 py-1.5">
                <UserAvatar size="sm" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{user?.name || 'User'}</p>
                  <p className="text-[10px] text-stone-500 truncate">{user?.email || ''}</p>
                </div>
              </div>
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-stone-500 hover:text-stone-300 hover:bg-stone-800/40 transition-colors"
              >
                <Globe size={14} />
                <span>{t('console.publicSite')}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={14} />
                <span>{t('console.signOut')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Main Content ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top header bar */}
        <header className="h-14 bg-[#FDFCFA] border-b border-[#E2DED7] flex items-center justify-between px-4 md:px-6 z-20 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg md:hidden transition-colors"
            >
              <Menu size={18} />
            </button>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-xs font-medium">
              {breadcrumbs.map((crumb, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  {idx > 0 && <span className="text-stone-300">/</span>}
                  <span className={idx === breadcrumbs.length - 1 ? 'text-stone-900 font-semibold' : 'text-stone-400'}>
                    {crumb}
                  </span>
                </span>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {location.pathname !== '/dashboard' && (
              <Link
                to="/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-800 text-xs font-semibold rounded-lg border border-stone-200 transition-colors"
              >
                {t('console.backToDash')}
              </Link>
            )}

            {/* Language toggle — top bar */}
            <LangToggle />

            <div className="hidden sm:flex items-center gap-2">
              <UserAvatar size="sm" />
              <span className="text-xs text-stone-500 font-medium hidden lg:block">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Scrollable work area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-7 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
