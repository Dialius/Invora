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
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    const success = await login(email, password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F0EDE8] relative overflow-hidden px-4 font-sans">
      {/* Background accents */}
      <div className="absolute -top-32 -left-20 w-[450px] h-[450px] bg-teal-200/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-[400px] h-[400px] bg-amber-100/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-[#E2DED7] rounded-2xl shadow-xl shadow-stone-300/30 relative z-10 overflow-hidden">
        {/* Top teal accent bar */}
        <div className="h-1 bg-gradient-to-r from-teal-600 to-teal-500" />

        <div className="p-8 md:p-10">
          {/* Brand */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="15" width="60" height="70" rx="12" stroke="#0F766E" strokeWidth="8" />
                <path d="M35 35H65" stroke="#0F766E" strokeWidth="8" strokeLinecap="round" />
                <path d="M35 50H65" stroke="#1C1917" strokeWidth="8" strokeLinecap="round" />
                <path d="M35 65H55" stroke="#1C1917" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-stone-900 font-serif">Welcome back</h2>
            <p className="text-stone-400 text-sm mt-1.5">Sign in to your Invora console</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex justify-between items-center animate-fadeIn">
              <span className="font-medium">{error}</span>
              <button onClick={clearError} className="text-xs font-semibold text-red-800 hover:underline ml-3 flex-shrink-0">Dismiss</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400 pointer-events-none">
                  <Mail size={16} />
                </span>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-stone-50/50 border border-[#E2DED7] hover:border-[#C9C3BA] focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 rounded-xl py-3 pl-10 pr-4 text-sm text-stone-800 placeholder-stone-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400 pointer-events-none">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-stone-50/50 border border-[#E2DED7] hover:border-[#C9C3BA] focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 rounded-xl py-3 pl-10 pr-10 text-sm text-stone-800 placeholder-stone-400 outline-none transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="w-full bg-teal-700 hover:bg-teal-800 disabled:bg-teal-700/50 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 group transition-all text-sm mt-6 shadow-sm"
            >
              {loading ? (
                <span className="spinner-white" />
              ) : (
                <>
                  Sign In to Console
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-stone-500 text-sm">
              New to Invora?{' '}
              <Link to="/register" className="text-teal-700 hover:underline font-semibold transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
