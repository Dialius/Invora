import { useState } from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslation } from '../context/i18n';

interface FaqItem { q: string; a: string; category: string; }

const faqsData: Record<'EN' | 'ID', FaqItem[]> = {
  ID: [
    { category: 'Fitur Dasar', q: 'Bagaimana cara membuat invoice pertama saya di Invora?', a: 'Setelah login, klik tombol "Buat Invoice Baru" di dashboard. Isi data pengirim, data klien, tambahkan item, lalu klik Simpan.' },
    { category: 'Fitur Dasar', q: 'Bagaimana cara menambahkan logo perusahaan pada invoice?', a: 'Saat membuat atau mengedit profil perusahaan (Billed From), klik area Dropzone Logo untuk mengunggah gambar logo.' },
    { category: 'Fitur Dasar', q: 'Apakah saya bisa menggambar tanda tangan langsung di web?', a: 'Ya! Invora menyediakan fitur kanvas tanda tangan digital di formulir pembuatan invoice. Anda bisa menggambar menggunakan mouse atau layar sentuh.' },
    { category: 'Fitur Dasar', q: 'Bagaimana cara mengganti mata uang pada invoice?', a: 'Di bagian atas formulir pembuatan invoice, terdapat menu dropdown untuk memilih jenis mata uang: IDR, USD, EUR, SGD, dll.' },
    { category: 'Klien & Berbagi', q: 'Apakah klien saya perlu membuat akun untuk melihat invoice?', a: 'Tidak. Cukup bagikan tautan publik invoice kepada klien Anda. Mereka bisa langsung membukanya tanpa perlu login.' },
    { category: 'Klien & Berbagi', q: 'Apakah tautan invoice publik aman?', a: 'Setiap tautan invoice publik menggunakan ID unik (kriptografis) yang sulit ditebak. Hanya orang yang memiliki tautan yang bisa mengaksesnya.' },
    { category: 'Klien & Berbagi', q: 'Bagaimana cara mengunduh invoice dalam format PDF?', a: 'Di halaman detail invoice, klik tombol "Unduh PDF". Sistem akan menghasilkan file PDF berkualitas tinggi yang siap dicetak.' },
    { category: 'Data & Keamanan', q: 'Di mana data invoice saya disimpan?', a: 'Semua data Invora disimpan di Supabase, database cloud dengan enkripsi tingkat enterprise (SOC 2, ISO 27001).' },
    { category: 'Data & Keamanan', q: 'Mengapa saya gagal menghapus profil perusahaan?', a: 'Invora memiliki fitur Safe Delete. Sistem menolak penghapusan profil yang sudah terkait dengan invoice yang pernah diterbitkan demi menjaga arsip Anda.' },
    { category: 'Data & Keamanan', q: 'Bagaimana cara menghapus akun secara permanen?', a: 'Kirim email ke admin@invora.online dengan subjek "Permintaan Penghapusan Akun". Kami akan memproses dalam 7 hari kerja.' },
  ],
  EN: [
    { category: 'Basic Features', q: 'How do I create my first invoice on Invora?', a: 'After logging in, click the "Create New Invoice" button on the dashboard. Fill in the sender data, client data, add items, and click Save.' },
    { category: 'Basic Features', q: 'How do I add a company logo to the invoice?', a: 'When creating or editing a company profile (Billed From), click the Logo Dropzone area to upload an image.' },
    { category: 'Basic Features', q: 'Can I draw a digital signature directly on the web?', a: 'Yes! Invora provides a digital signature canvas right in the invoice form. You can draw using your mouse or touchscreen.' },
    { category: 'Basic Features', q: 'How do I change the currency on the invoice?', a: 'At the top of the invoice form, there is a dropdown menu to select the currency: IDR, USD, EUR, SGD, etc.' },
    { category: 'Clients & Sharing', q: 'Does my client need to create an account to view the invoice?', a: 'No. Just share the public invoice link with your client. They can open it directly without needing to log in.' },
    { category: 'Clients & Sharing', q: 'Is the public invoice link secure?', a: 'Every public link uses a cryptographically unique ID that is impossible to guess. Only people with the link can access it.' },
    { category: 'Clients & Sharing', q: 'How do I download the invoice as a PDF?', a: 'On the invoice detail page, click the "Download PDF" button. The system will generate a high-quality, print-ready PDF.' },
    { category: 'Data & Security', q: 'Where is my invoice data stored?', a: 'All Invora data is stored in Supabase, a cloud database with enterprise-grade encryption (SOC 2, ISO 27001).' },
    { category: 'Data & Security', q: 'Why did I fail to delete a company profile?', a: 'Invora features Safe Delete. The system rejects deleting profiles that are already linked to published invoices to protect your archives.' },
    { category: 'Data & Security', q: 'How do I delete my account permanently?', a: 'Send an email to admin@invora.online with the subject "Account Deletion Request". We will process it within 7 business days.' },
  ]
};

export const FAQ = () => {
  const { lang } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const faqs = faqsData[lang];
  const categories = [...new Set(faqs.map(f => f.category))];
  
  const ui = {
    all: lang === 'ID' ? 'Semua' : 'All',
    title: lang === 'ID' ? 'Pertanyaan yang Sering' : 'Frequently Asked',
    titleHighlight: lang === 'ID' ? 'Ditanyakan' : 'Questions',
    desc: lang === 'ID' ? 'Temukan jawaban lengkap atas pertanyaan seputar fitur, keamanan data, dan cara penggunaan Invora.' : 'Find quick answers to common questions about Invora features, data security, and how to use the app.',
    ctaTitle: lang === 'ID' ? 'Tidak menemukan jawaban yang Anda cari?' : 'Can\'t find the answer you\'re looking for?',
    ctaDesc: lang === 'ID' ? 'Tim kami siap membantu Anda. Kirimkan pertanyaan Anda dan kami akan merespons dalam 1×24 jam kerja.' : 'Our team is ready to help. Send us your questions and we will respond within 24 business hours.',
    ctaBtn: lang === 'ID' ? 'Hubungi Kami' : 'Contact Us'
  };

  // Sync category state when language changes
  const currentCategory = activeCategory === 'All' || activeCategory === 'Semua' 
    ? ui.all 
    : categories.includes(activeCategory) ? activeCategory : ui.all;

  const filtered = currentCategory === ui.all ? faqs : faqs.filter(f => f.category === currentCategory);

  return (
    <PublicLayout>
      <div className="py-20 bg-[#F0EDE8] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 text-teal-700 mb-5">
              <HelpCircle size={26} />
            </div>
            <h1 className="text-4xl font-bold text-stone-900 font-serif tracking-tight">
              {ui.title} <span className="text-teal-700">{ui.titleHighlight}</span>
            </h1>
            <p className="mt-4 text-stone-500 text-sm leading-relaxed max-w-lg mx-auto">
              {ui.desc}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-8 justify-center">
            {[ui.all, ...categories].map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIdx(null); }}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${currentCategory === cat ? 'bg-teal-700 text-white border-teal-700' : 'border-[#E2DED7] text-stone-500 hover:border-teal-300 hover:text-teal-700 bg-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-3 max-w-2xl mx-auto">
            {filtered.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="bg-white border border-[#E2DED7] rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left py-4 px-6 flex justify-between items-center hover:bg-stone-50/50 transition-colors focus:outline-none"
                  >
                    <span className="font-semibold text-stone-800 text-sm pr-4">{faq.q}</span>
                    <ChevronDown size={16} className={`flex-shrink-0 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-teal-600' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ease-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-5 pt-1 border-t border-[#E2DED7] bg-stone-50/30 text-stone-600 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="mt-14 text-center bg-white border border-[#E2DED7] rounded-2xl p-8">
            <h2 className="text-lg font-bold text-stone-900 font-serif mb-2">{ui.ctaTitle}</h2>
            <p className="text-stone-500 text-sm mb-5">{ui.ctaDesc}</p>
            <a
              href="mailto:admin@invora.online"
              className="inline-block bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-teal-800 transition-colors"
            >
              {ui.ctaBtn}
            </a>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
