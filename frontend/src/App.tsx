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
      <div className="flex items-center justify-center min-h-screen bg-[#F0EDE8]">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner" style={{ width: 40, height: 40, borderWidth: 3 }}></div>
          <span className="text-sm font-semibold tracking-wide text-stone-500 uppercase">Loading Session...</span>
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
