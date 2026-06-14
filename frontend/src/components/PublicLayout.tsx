import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '../context/i18n';

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { nameKey: 'nav.home',     path: '/' },
    { nameKey: 'nav.features', path: '/features' },
    { nameKey: 'nav.faq',      path: '/faq' },
  ];

  const toggleLang = () => setLang(lang === 'EN' ? 'ID' : 'EN');

  return (
    <div className="min-h-screen bg-[#F0EDE8] text-stone-800 flex flex-col font-sans">

      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#FDFCFA]/90 backdrop-blur-md border-b border-[#E2DED7] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 grid grid-cols-3 items-center">

          {/* Logo - Column 1 */}
          <div className="flex items-center justify-start">
            <Link to="/" className="flex items-center gap-2.5 group">
              <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="15" width="60" height="70" rx="10" stroke="#0F766E" strokeWidth="8" />
                <path d="M35 35H65" stroke="#0F766E" strokeWidth="8" strokeLinecap="round" />
                <path d="M35 50H65" stroke="#1C1917" strokeWidth="8" strokeLinecap="round" />
                <path d="M35 65H55" stroke="#1C1917" strokeWidth="8" strokeLinecap="round" />
              </svg>
              <span className="text-[17px] font-bold tracking-tight text-stone-900 group-hover:text-teal-700 transition-colors">
                Invora
              </span>
            </Link>
          </div>

          {/* Desktop nav - Column 2 (Perfectly Centered) */}
          <nav className="hidden md:flex items-center justify-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive(link.path)
                    ? 'bg-stone-100 text-stone-900 font-semibold'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100/70'
                }`}
              >
                {t(link.nameKey)}
              </Link>
            ))}
          </nav>

          {/* Right side actions - Column 3 */}
          <div className="flex items-center justify-end gap-2">
            <div className="hidden md:flex items-center gap-2">
              {/* Language toggle */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-[#E2DED7] transition-all"
                title={lang === 'EN' ? 'Switch to Indonesian' : 'Switch to English'}
              >
                <Globe size={13} />
                <span>{lang === 'EN' ? 'ID' : 'EN'}</span>
              </button>

              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all shadow-sm"
                >
                  {t('nav.dashboard')}
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors px-3 py-2 rounded-lg hover:bg-stone-100"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all shadow-sm"
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FDFCFA] border-t border-[#E2DED7] px-4 pt-3 pb-5 space-y-1 animate-slideDown">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-stone-100 text-stone-900 font-semibold'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-800'
                }`}
              >
                {t(link.nameKey)}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#E2DED7] flex flex-col gap-2">
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <Globe size={15} />
                <span>{lang === 'EN' ? 'Bahasa Indonesia' : 'English'}</span>
              </button>
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center bg-teal-700 hover:bg-teal-800 text-white font-semibold px-4 py-2.5 rounded-lg text-sm"
                >
                  {t('nav.dashboard')}
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block text-center text-stone-700 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-100">
                    {t('nav.login')}
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block text-center bg-teal-700 hover:bg-teal-800 text-white font-semibold px-4 py-2.5 rounded-lg text-sm">
                    {t('nav.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ─── Content ─────────────────────────────────────────────────────── */}
      <main className="flex-1">{children}</main>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#EAE7E2] border-t border-[#E2DED7] py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-2.5">
            <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="15" width="60" height="70" rx="10" stroke="#0F766E" strokeWidth="8" />
              <path d="M35 35H65" stroke="#0F766E" strokeWidth="8" strokeLinecap="round" />
            </svg>
            <span className="font-bold text-stone-700 text-sm tracking-tight">Invora Invoicing</span>
          </div>
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} Invora. {t('footer.rights')}
          </p>
        </div>
      </footer>
    </div>
  );
};
