import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { InvoiceFormPage } from './pages/InvoiceFormPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Panel routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={
            <div className="flex items-center justify-center min-h-screen bg-[#0B132B]">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-100 mb-2">Invora Dashboard Placeholder</h1>
                <p className="text-cyan-400">Authenticated successfully!</p>
              </div>
            </div>
          } />
          <Route path="/invoices/new" element={<InvoiceFormPage />} />
          <Route path="/invoices/:id/edit" element={<InvoiceFormPage />} />
        </Route>

        {/* Redirects */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
