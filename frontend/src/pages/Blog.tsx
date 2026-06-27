import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/PublicLayout';
import { BookOpen, Clock, ArrowRight, Tag } from 'lucide-react';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  coverEmoji: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'cara-membuat-invoice-profesional',
    title: 'Cara Membuat Invoice Profesional untuk Bisnis Anda',
    excerpt: 'Invoice yang profesional bukan sekadar dokumen tagihan — ini adalah representasi dari bisnis Anda. Pelajari elemen-elemen wajib yang harus ada di setiap invoice dan bagaimana desain yang rapi dapat meningkatkan kepercayaan klien serta mempercepat pembayaran.',
    category: 'Panduan Invoicing',
    readTime: '7 menit',
    date: '10 Juni 2026',
    coverEmoji: '📄',
  },
  {
    slug: 'perbedaan-invoice-proforma-dan-invoice-reguler',
    title: 'Perbedaan Invoice Proforma dan Invoice Reguler: Mana yang Harus Anda Gunakan?',
    excerpt: 'Banyak pelaku bisnis masih bingung mengenai kapan harus menggunakan Proforma Invoice dan kapan menggunakan Invoice Reguler. Artikel ini membahas perbedaan mendasar keduanya dari segi hukum, akuntansi, dan praktik bisnis sehari-hari di Indonesia.',
    category: 'Edukasi Bisnis',
    readTime: '6 menit',
    date: '5 Juni 2026',
    coverEmoji: '📑',
  },
  {
    slug: 'tips-agar-invoice-dibayar-tepat-waktu',
    title: '7 Tips Ampuh Agar Invoice Dibayar Tepat Waktu oleh Klien',
    excerpt: 'Keterlambatan pembayaran adalah salah satu masalah terbesar bagi freelancer dan pemilik bisnis kecil. Dengan strategi invoicing yang tepat — mulai dari penulisan syarat pembayaran yang jelas hingga pengiriman invoice di waktu yang tepat — Anda bisa memangkas keterlambatan secara signifikan.',
    category: 'Tips Bisnis',
    readTime: '8 menit',
    date: '1 Juni 2026',
    coverEmoji: '💡',
  },
  {
    slug: 'panduan-faktur-pajak-dan-npwp-untuk-umkm',
    title: 'Panduan Lengkap Faktur Pajak dan NPWP untuk UMKM Indonesia',
    excerpt: 'Sebagai pelaku UMKM di Indonesia, memahami kewajiban perpajakan dalam setiap transaksi adalah hal yang krusial. Artikel ini membahas kapan Anda perlu mencantumkan NPWP di invoice, bagaimana cara menghitung PPN 11%, dan apa bedanya faktur pajak dengan invoice biasa.',
    category: 'Perpajakan',
    readTime: '10 menit',
    date: '25 Mei 2026',
    coverEmoji: '🏛️',
  },
];

export const Blog = () => {
  const categories = [...new Set(blogPosts.map(p => p.category))];

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F0EDE8]">
        {/* Hero */}
        <section className="bg-[#FDFCFA] border-b border-[#E2DED7] py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 mb-6">
              <BookOpen className="text-teal-700" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-stone-900 font-serif mb-4">
              Blog & Panduan Invoicing
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Artikel, panduan praktis, dan tips seputar invoicing, perpajakan, dan pengelolaan keuangan bisnis untuk pelaku usaha di Indonesia.
            </p>
          </div>
        </section>

        {/* Category Pills */}
        <section className="bg-[#FDFCFA] border-b border-[#E2DED7] py-4">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-teal-700 text-white">Semua</span>
              {categories.map(cat => (
                <span key={cat} className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#E2DED7] text-stone-500 hover:border-teal-300 hover:text-teal-700 transition-colors cursor-pointer">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group bg-white border border-[#E2DED7] rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* Cover */}
                  <div className="bg-gradient-to-br from-teal-50 to-stone-100 h-36 flex items-center justify-center border-b border-[#E2DED7]">
                    <span className="text-6xl">{post.coverEmoji}</span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag size={11} className="text-teal-600" />
                      <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">{post.category}</span>
                    </div>
                    <h2 className="text-base font-bold text-stone-900 font-serif leading-snug mb-3 group-hover:text-teal-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-xs text-stone-500 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-stone-400">
                        <div className="flex items-center gap-1">
                          <Clock size={11} />
                          <span>{post.readTime} baca</span>
                        </div>
                        <span>·</span>
                        <span>{post.date}</span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-teal-700 group-hover:gap-2 transition-all">
                        Baca <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};
