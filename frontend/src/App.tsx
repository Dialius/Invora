import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ConsoleLayout } from './components/ConsoleLayout';
import { InvoiceFormPage } from './pages/InvoiceFormPage';
import { Dashboard } from './pages/Dashboard';
import { LandingHome } from './pages/LandingHome';
import { Features } from './pages/Features';
import { FAQ } from './pages/FAQ';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Contact } from './pages/Contact';
import PublicInvoiceView from './pages/PublicInvoiceView';
import { useAuthStore } from './store/auth';
import { I18nProvider } from './context/i18n';

function App() {
  const { checkAuth, initialized } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!initialized) {
    return (
      <div className="flex min-h-screen bg-[#F0EDE8]">
        {/* Sidebar skeleton */}
        <div className="hidden md:flex flex-col w-56 bg-[#1C1917] border-r border-[#44403C] p-4 gap-4">
          {/* Logo area */}
          <div className="flex items-center gap-2 mb-6 px-1">
            <div className="skeleton w-7 h-7 rounded-lg" style={{ background: 'linear-gradient(90deg,#44403C 25%,#57534E 50%,#44403C 75%)', backgroundSize: '200% 100%' }} />
            <div className="skeleton h-4 w-16 rounded" style={{ background: 'linear-gradient(90deg,#44403C 25%,#57534E 50%,#44403C 75%)', backgroundSize: '200% 100%' }} />
          </div>
          {/* Nav items */}
          {[72, 56, 64, 80].map((w, i) => (
            <div key={i} className="flex items-center gap-2.5 px-2 py-1.5">
              <div className="skeleton w-4 h-4 rounded" style={{ background: 'linear-gradient(90deg,#44403C 25%,#57534E 50%,#44403C 75%)', backgroundSize: '200% 100%' }} />
              <div className={`skeleton h-3 rounded`} style={{ width: w, background: 'linear-gradient(90deg,#44403C 25%,#57534E 50%,#44403C 75%)', backgroundSize: '200% 100%' }} />
            </div>
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <div className="bg-white border-b border-[#E2DED7] px-6 py-3 flex items-center justify-between">
            <div className="skeleton h-4 w-32 rounded" />
            <div className="skeleton h-8 w-28 rounded-lg" />
          </div>

          {/* Page body */}
          <div className="flex-1 p-6 overflow-auto">
            {/* Stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-slate-200/80 space-y-3">
                  <div className="skeleton h-3 w-20 rounded" />
                  <div className="skeleton h-6 w-28 rounded" />
                </div>
              ))}
            </div>

            {/* Table panel */}
            <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
              {/* Table header */}
              <div className="px-4 py-3 border-b border-[#E2DED7] flex gap-3">
                <div className="skeleton h-8 w-64 rounded-lg" />
                <div className="skeleton h-8 w-24 rounded-lg" />
                <div className="skeleton h-8 w-24 rounded-lg" />
              </div>
              {/* Table rows */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3.5 border-b border-slate-100 last:border-0">
                  <div className="skeleton h-3.5 w-24 rounded" />
                  <div className="skeleton h-3.5 w-32 rounded" />
                  <div className="skeleton h-3.5 w-16 rounded" />
                  <div className="skeleton h-3.5 w-20 rounded" />
                  <div className="ml-auto skeleton h-3.5 w-20 rounded" />
                  <div className="skeleton h-5 w-14 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Routes */}
          <Route path="/" element={<LandingHome />} />
          <Route path="/features" element={<Features />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/invoices/:id/view" element={<PublicInvoiceView />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Panel routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<ConsoleLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/invoices/new" element={<InvoiceFormPage />} />
              <Route path="/invoices/:id/edit" element={<InvoiceFormPage />} />
            </Route>
          </Route>

          {/* Redirects */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
