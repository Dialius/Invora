import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store/auth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, clearError, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAF9F5] relative overflow-hidden px-4 font-sans">
      {/* Soft warm background gradients */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[#F2EFE9] to-transparent opacity-60 pointer-events-none"></div>
      <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-teal-50/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-amber-50/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-8 md:p-10 shadow-xl shadow-slate-200/50 relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <svg width="52" height="52" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="15" width="60" height="70" rx="12" stroke="#0D9488" strokeWidth="8" />
              <path d="M35 35H65" stroke="#0D9488" strokeWidth="8" strokeLinecap="round" />
              <path d="M35 50H65" stroke="#1E3A5F" strokeWidth="8" strokeLinecap="round" />
              <path d="M35 65H55" stroke="#1E3A5F" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">Welcome back</h2>
          <p className="text-slate-500 text-sm mt-1.5">Enter your details to sign in to your console</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-150 rounded-xl text-sm text-red-700 flex justify-between items-center animate-fade-in">
            <span className="font-medium">{error}</span>
            <button onClick={clearError} className="text-xs hover:underline font-semibold text-red-800">Dismiss</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-500/5 transition-all shadow-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl py-3 pl-10 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-500/5 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-850 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 group transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-8 shadow-sm"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Sign In to Console
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform text-teal-400" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            New to Invora?{' '}
            <Link to="/register" className="text-teal-600 hover:underline hover:text-teal-700 font-semibold transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
