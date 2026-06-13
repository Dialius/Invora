import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-[#0B132B]/75 backdrop-blur-lg border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <svg className="w-8 h-8 transition-transform group-hover:scale-105" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="15" width="60" height="70" rx="10" stroke="#00A8CC" strokeWidth="8" />
              <path d="M35 35H65" stroke="#00A8CC" strokeWidth="8" strokeLinecap="round" />
              <path d="M35 50H65" stroke="#1E3A5F" strokeWidth="8" strokeLinecap="round" />
              <path d="M35 65H55" stroke="#1E3A5F" strokeWidth="8" strokeLinecap="round" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">Invora</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive(link.path)
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Call to Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold px-4 py-2 rounded-lg text-sm transition-all shadow-md shadow-cyan-600/10 hover:shadow-cyan-500/20"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white font-medium text-sm transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-lg text-sm transition-all shadow-md shadow-cyan-600/10"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 rounded-md p-1.5"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0C1530] border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-slate-800/40 text-cyan-400'
                    : 'text-slate-350 hover:bg-slate-800/20 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold px-4 py-2 rounded-lg text-sm"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center text-slate-300 hover:text-white font-medium py-2 text-sm rounded-lg hover:bg-slate-800/30"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold px-4 py-2 rounded-lg text-sm"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#080E20] border-t border-slate-900 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="15" width="60" height="70" rx="10" stroke="#00A8CC" strokeWidth="8" />
              <path d="M35 35H65" stroke="#00A8CC" strokeWidth="8" strokeLinecap="round" />
            </svg>
            <span className="text-md font-bold tracking-tight text-slate-300">Invora Invoicing</span>
          </div>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Invora. All rights reserved. Designed for modern billing.
          </p>
        </div>
      </footer>
    </div>
  );
};
