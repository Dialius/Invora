import { useState } from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { Send, MessageSquare } from 'lucide-react';

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    // Reset fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <PublicLayout>
      <div className="py-20 relative">
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
              <MessageSquare size={30} className="text-cyan-400" />
              Contact <span className="text-cyan-400">Us</span>
            </h1>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Ada masukan atau pertanyaan bantuan? Silakan hubungi kami melalui formulir di bawah. Tim kami siap merespons Anda.
            </p>
          </div>

          <div className="bg-[#1C2541]/35 border border-slate-800 p-8 rounded-2xl backdrop-blur-md shadow-xl">
            {submitted ? (
              <div className="text-center py-6 space-y-3 animate-scale-up">
                <div className="w-12 h-12 rounded-full bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto">
                  <Send size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-200">Message Sent Successfully!</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Terima kasih telah menghubungi kami. Kami akan meninjau pesan Anda dan segera menghubungi Anda kembali.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-cyan-400 hover:underline"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="e.g. john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Pesan Anda</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#0B132B] border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    placeholder="Tuliskan pertanyaan atau kendala Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-600/10"
                >
                  <Send size={16} />
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
