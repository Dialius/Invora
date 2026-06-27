import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/PublicLayout';
import { BookOpen, Clock, ArrowRight, Tag } from 'lucide-react';

export const blogPosts = [
  {
    slug: 'apa-itu-invoice-dan-fungsinya',
    title: 'Apa Itu Invoice? Pengertian, Fungsi, dan Contoh Lengkap',
    excerpt: 'Invoice adalah dokumen tagihan resmi yang dikirim penjual ke pembeli. Pelajari pengertian lengkap, fungsi penting, dan elemen wajib yang harus ada di setiap invoice profesional.',
    category: 'Panduan Dasar',
    readTime: '7 menit',
    date: '10 Juni 2026',
    color: 'teal',
  },
  {
    slug: 'cara-membuat-invoice-profesional',
    title: 'Cara Membuat Invoice yang Profesional dan Sah Secara Hukum',
    excerpt: 'Panduan lengkap langkah demi langkah membuat invoice profesional untuk freelancer, UMKM, dan bisnis kecil di Indonesia agar terlihat kredibel dan mempercepat pembayaran.',
    category: 'Tutorial',
    readTime: '10 menit',
    date: '12 Juni 2026',
    color: 'stone',
  },
  {
    slug: 'perbedaan-invoice-faktur-kwitansi',
    title: 'Perbedaan Invoice, Faktur Pajak, dan Kwitansi yang Wajib Diketahui',
    excerpt: 'Banyak pelaku usaha masih bingung membedakan invoice, faktur pajak, dan kwitansi. Artikel ini menjelaskan perbedaan mendasar, kapan menggunakannya, dan contoh nyata di lapangan.',
    category: 'Pengetahuan Bisnis',
    readTime: '8 menit',
    date: '14 Juni 2026',
    color: 'amber',
  },
  {
    slug: 'tips-mengelola-keuangan-freelancer',
    title: '7 Tips Mengelola Keuangan untuk Freelancer dan UMKM Indonesia',
    excerpt: 'Mengelola keuangan bisnis kecil tidak harus rumit. Temukan 7 tips praktis untuk mengatur arus kas, menghindari telat bayar, dan membuat laporan keuangan sederhana yang efektif.',
    category: 'Tips Bisnis',
    readTime: '9 menit',
    date: '16 Juni 2026',
    color: 'indigo',
  },
];

const categoryColor: Record<string, string> = {
  'Panduan Dasar':     'bg-teal-50   text-teal-700   border-teal-200',
  'Tutorial':          'bg-stone-100 text-stone-700  border-stone-200',
  'Pengetahuan Bisnis':'bg-amber-50  text-amber-700  border-amber-200',
  'Tips Bisnis':       'bg-indigo-50 text-indigo-700 border-indigo-200',
};

export const Blog = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F0EDE8]">
        {/* Hero */}
        <section className="bg-[#FDFCFA] border-b border-[#E2DED7] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 mb-6">
              <BookOpen className="text-teal-700" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-stone-900 font-serif mb-4">Blog & Panduan Invoicing</h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Artikel edukatif seputar invoicing, keuangan bisnis, dan tips praktis untuk freelancer dan UMKM Indonesia.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group bg-white border border-[#E2DED7] rounded-2xl overflow-hidden hover:shadow-md hover:border-teal-300/50 transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
                >
                  {/* Card Header Color */}
                  <div className={`h-2 w-full ${
                    post.color === 'teal'   ? 'bg-teal-500' :
                    post.color === 'stone'  ? 'bg-stone-400' :
                    post.color === 'amber'  ? 'bg-amber-400' :
                    'bg-indigo-500'
                  }`} />

                  <div className="p-7 flex flex-col flex-1">
                    {/* Category + Read Time */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${categoryColor[post.category] || 'bg-stone-100 text-stone-600 border-stone-200'}`}>
                        <Tag size={10} />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-stone-400">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-stone-900 font-serif leading-snug mb-3 group-hover:text-teal-700 transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-stone-500 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-5 pt-5 border-t border-[#E2DED7]">
                      <span className="text-xs text-stone-400">{post.date}</span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-teal-700 group-hover:gap-2 transition-all">
                        Baca selengkapnya <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 bg-white border border-[#E2DED7] rounded-2xl p-8 text-center">
              <h2 className="text-lg font-bold text-stone-900 font-serif mb-2">Siap Membuat Invoice Profesional?</h2>
              <p className="text-sm text-stone-500 mb-5">Gunakan Invora secara gratis — buat invoice, kelola klien, dan ekspor PDF dalam hitungan menit.</p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold px-7 py-3 rounded-xl text-sm transition-all shadow-sm shadow-teal-700/20"
              >
                Mulai Gratis Sekarang <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};
