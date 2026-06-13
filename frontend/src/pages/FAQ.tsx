import { useState } from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQ = () => {
  const faqs = [
    {
      q: 'Bagaimana cara menambahkan logo perusahaan pada invoice?',
      a: 'Ketika membuat profile perusahaan (Billed From) baru, Anda dapat mengklik area Dropzone Logo untuk mengunggah gambar. Logo akan disimpan secara otomatis di database dan dilampirkan di setiap invoice.'
    },
    {
      q: 'Apakah saya bisa menggambar tanda tangan langsung di web?',
      a: 'Ya! Invora menyediakan fitur canvas menggambar di form pembuatan invoice. Anda dapat menggunakan mouse atau touchscreen perangkat Anda untuk menggambar tanda tangan. Selain itu, Anda juga dapat mengunggah file gambar tanda tangan yang sudah ada.'
    },
    {
      q: 'Bagaimana cara mengganti mata uang dan bahasa pada lembar invoice?',
      a: 'Di bagian atas formulir pembuatan invoice, Anda dapat memilih jenis mata uang (seperti IDR, USD, EUR). Untuk bahasa, Anda dapat menggunakan tombol toggle ID / EN di atas pratinjau invoice untuk menerjemahkan label teks secara instan.'
    },
    {
      q: 'Mengapa saya gagal menghapus profile Company atau Client?',
      a: 'Sistem Invora memiliki fitur Safe Delete. Jika profil perusahaan atau client tersebut sudah dikaitkan dengan invoice masa lalu yang terbit, sistem akan menolak penghapusan untuk mencegah rusaknya data invoice lama. Anda harus menghapus invoice terkait terlebih dahulu.'
    },
    {
      q: 'Apakah client saya butuh akun untuk melihat invoice?',
      a: 'Tidak. Anda cukup membagikan tautan detail invoice publik (misalnya /invoices/:id/view) kepada client Anda. Mereka dapat langsung membuka tautan tersebut untuk melihat detail dan mengunduh format cetak PDF tanpa perlu login.'
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <PublicLayout>
      <div className="py-20 relative">
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
              <HelpCircle size={32} className="text-cyan-400" />
              Frequently Asked <span className="text-cyan-400">Questions</span>
            </h1>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Cari jawaban cepat untuk pertanyaan umum seputar fitur, tanda tangan digital, database, dan pengelolaan invoice di Invora.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#1C2541]/20 border border-slate-800 rounded-xl overflow-hidden transition-all duration-305"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left py-4 px-6 flex justify-between items-center hover:bg-slate-800/20 transition-colors focus:outline-none"
                  >
                    <span className="font-semibold text-slate-200 text-xs sm:text-sm">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp size={16} className="text-cyan-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-slate-450 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="py-4 px-6 border-t border-slate-800 bg-[#0B132B]/50 text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
