import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B132B]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-cyan-400 border-r-transparent border-slate-700 rounded-full animate-spin"></div>
          <span className="text-sm font-semibold tracking-wide text-cyan-400 uppercase">Loading Session...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
