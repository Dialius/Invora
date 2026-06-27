import { useState } from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem { q: string; a: string; category: string; }

const faqs: FaqItem[] = [
  // Fitur Dasar
  { category: 'Fitur Dasar', q: 'Bagaimana cara membuat invoice pertama saya di Invora?', a: 'Setelah login, klik tombol "Buat Invoice Baru" di dashboard. Anda akan dibawa ke formulir pembuatan invoice. Isi data perusahaan pengirim (Billed From), data klien (Billed To), tambahkan item-item pekerjaan, lalu klik Simpan. Invoice Anda siap dalam hitungan menit.' },
  { category: 'Fitur Dasar', q: 'Bagaimana cara menambahkan logo perusahaan pada invoice?', a: 'Saat membuat atau mengedit profil perusahaan (Billed From), klik area Dropzone Logo untuk mengunggah gambar logo. Logo akan disimpan secara otomatis di database dan ditampilkan di setiap invoice yang menggunakan profil tersebut.' },
  { category: 'Fitur Dasar', q: 'Apakah saya bisa menggambar tanda tangan langsung di web?', a: 'Ya! Invora menyediakan fitur kanvas tanda tangan digital di formulir pembuatan invoice. Anda bisa menggambar tanda tangan menggunakan mouse, stylus, atau layar sentuh. Selain itu, Anda juga bisa mengunggah file gambar tanda tangan yang sudah ada.' },
  { category: 'Fitur Dasar', q: 'Bagaimana cara mengganti mata uang pada invoice?', a: 'Di bagian atas formulir pembuatan invoice, terdapat menu dropdown untuk memilih jenis mata uang: IDR (Rupiah), USD (Dolar AS), EUR (Euro), SGD (Dolar Singapura), dan berbagai mata uang internasional lainnya. Perubahan mata uang akan langsung tercermin di pratinjau invoice secara real-time.' },
  { category: 'Fitur Dasar', q: 'Bagaimana cara menambahkan diskon pada item invoice?', a: 'Pada setiap baris item di formulir invoice, terdapat kolom diskon yang bisa Anda isi dalam bentuk persentase (%) atau nominal. Total harga per item akan otomatis dihitung ulang setelah diskon diterapkan.' },
  { category: 'Fitur Dasar', q: 'Bisakah saya menambahkan PPN atau pajak lainnya ke invoice?', a: 'Ya, Invora mendukung penambahan baris pajak khusus. Anda bisa menambahkan PPN 11%, PPh, atau tarif pajak kustom lainnya. Nilai pajak bisa diatur sebagai persentase dari subtotal atau nominal tetap sesuai kebutuhan.' },
  // Klien & Privasi
  { category: 'Klien & Berbagi Invoice', q: 'Apakah klien saya perlu membuat akun untuk melihat invoice?', a: 'Tidak sama sekali. Cukup bagikan tautan publik invoice kepada klien Anda. Mereka bisa langsung membuka tautan tersebut di browser mana pun untuk melihat detail invoice dan mengunduh PDF — tanpa perlu login atau mendaftar.' },
  { category: 'Klien & Berbagi Invoice', q: 'Apakah tautan invoice publik aman? Bisakah orang lain mengaksesnya?', a: 'Setiap tautan invoice publik menggunakan ID unik yang sulit ditebak secara acak. Hanya orang yang memiliki tautan tersebut yang bisa mengaksesnya. Anda juga bisa menonaktifkan akses publik invoice kapan saja dari dashboard Anda.' },
  { category: 'Klien & Berbagi Invoice', q: 'Bagaimana cara mengunduh invoice dalam format PDF?', a: 'Di halaman detail invoice, klik tombol "Unduh PDF". Sistem akan menghasilkan file PDF berkualitas tinggi yang siap dicetak atau dikirim via email. Klien juga bisa mengunduh PDF langsung dari tautan publik invoice tanpa perlu login.' },
  // Data & Keamanan
  { category: 'Data & Keamanan', q: 'Di mana data invoice saya disimpan?', a: 'Semua data Invora disimpan di Supabase, platform database cloud yang menggunakan PostgreSQL dengan enkripsi data tingkat enterprise. Server berlokasi di pusat data yang tersertifikasi dengan standar keamanan internasional (SOC 2, ISO 27001).' },
  { category: 'Data & Keamanan', q: 'Apakah data saya aman jika saya tidak aktif menggunakan Invora?', a: 'Data Anda tetap aman dan tersimpan selama akun Anda aktif. Invora tidak menghapus data pengguna yang tidak aktif. Anda bisa login kapan saja dan semua invoice serta profil Anda masih utuh.' },
  { category: 'Data & Keamanan', q: 'Mengapa saya gagal menghapus profil perusahaan atau klien?', a: 'Invora memiliki fitur Safe Delete. Sistem akan menolak penghapusan profil perusahaan atau klien yang sudah dikaitkan dengan invoice yang pernah diterbitkan. Ini bertujuan menjaga integritas data invoice historis Anda agar tidak rusak.' },
  { category: 'Data & Keamanan', q: 'Bagaimana cara menghapus akun saya secara permanen?', a: 'Untuk menghapus akun secara permanen, silakan kirim email ke admin@invora.online dengan subjek "Permintaan Penghapusan Akun" beserta alamat email akun Anda. Tim kami akan memproses permintaan dalam 7 hari kerja sesuai ketentuan privasi kami.' },
  // Teknis
  { category: 'Teknis & Pemecahan Masalah', q: 'Browser apa saja yang didukung oleh Invora?', a: 'Invora berjalan optimal di semua browser modern: Google Chrome (versi 90+), Mozilla Firefox (versi 88+), Microsoft Edge (versi 90+), dan Safari (versi 14+). Kami merekomendasikan Google Chrome untuk pengalaman terbaik.' },
  { category: 'Teknis & Pemecahan Masalah', q: 'Apakah Invora bisa digunakan di smartphone?', a: 'Ya, antarmuka Invora sepenuhnya responsif dan dapat digunakan di smartphone maupun tablet. Namun, untuk pembuatan invoice dengan banyak item dan penggunaan fitur tanda tangan digital, pengalaman terbaik tetap di layar komputer atau laptop.' },
  { category: 'Teknis & Pemecahan Masalah', q: 'PDF invoice saya tidak tampil dengan benar. Apa yang harus saya lakukan?', a: 'Pastikan Anda menggunakan browser yang didukung dan koneksi internet stabil saat mengunduh PDF. Jika masalah berlanjut, coba bersihkan cache browser Anda (Ctrl+Shift+Delete) dan coba lagi. Jika masih bermasalah, hubungi kami di admin@invora.online.' },
];

const categories = [...new Set(faqs.map(f => f.category))];

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const filtered = activeCategory === 'Semua' ? faqs : faqs.filter(f => f.category === activeCategory);

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
              Pertanyaan yang Sering <span className="text-teal-700">Ditanyakan</span>
            </h1>
            <p className="mt-4 text-stone-500 text-sm leading-relaxed max-w-lg mx-auto">
              Temukan jawaban lengkap atas pertanyaan seputar fitur, keamanan data, pembagian invoice, dan cara penggunaan Invora.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-8 justify-center">
            {['Semua', ...categories].map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIdx(null); }}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${activeCategory === cat ? 'bg-teal-700 text-white border-teal-700' : 'border-[#E2DED7] text-stone-500 hover:border-teal-300 hover:text-teal-700 bg-white'}`}
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
            <h2 className="text-lg font-bold text-stone-900 font-serif mb-2">Tidak menemukan jawaban yang Anda cari?</h2>
            <p className="text-stone-500 text-sm mb-5">Tim kami siap membantu Anda. Kirimkan pertanyaan Anda dan kami akan merespons dalam 1×24 jam kerja.</p>
            <a
              href="mailto:admin@invora.online"
              className="inline-block bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-teal-800 transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
