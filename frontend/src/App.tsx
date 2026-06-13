import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { InvoiceFormPage } from './pages/InvoiceFormPage';
import { Dashboard } from './pages/Dashboard';
import { LandingHome } from './pages/LandingHome';
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import PublicInvoiceView from './pages/PublicInvoiceView';
import { useAuthStore } from './store/auth';

function App() {
  const { checkAuth, initialized } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B132B]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-cyan-400 border-r-transparent border-slate-700 rounded-full animate-spin"></div>
          <span className="text-sm font-semibold tracking-wide text-cyan-400 uppercase">Loading Session...</span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Routes */}
        <Route path="/" element={<LandingHome />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/invoices/:id/view" element={<PublicInvoiceView />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Panel routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invoices/new" element={<InvoiceFormPage />} />
          <Route path="/invoices/:id/edit" element={<InvoiceFormPage />} />
        </Route>

        {/* Redirects */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
