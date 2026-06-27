import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/PublicLayout';
import { BookOpen, Clock, ArrowRight, Tag } from 'lucide-react';
import { useTranslation } from '../context/i18n';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  coverEmoji: string;
}

export const blogPostsData: Record<'EN' | 'ID', BlogPost[]> = {
  ID: [
    {
      slug: 'cara-membuat-invoice-profesional',
      title: 'Cara Membuat Invoice Profesional untuk Bisnis Anda',
      excerpt: 'Invoice yang profesional bukan sekadar dokumen tagihan — ini adalah representasi dari bisnis Anda. Pelajari elemen-elemen wajib yang harus ada di setiap invoice dan bagaimana desain yang rapi dapat meningkatkan kepercayaan klien.',
      category: 'Panduan Invoicing',
      readTime: '7 menit',
      date: '10 Juni 2026',
      coverEmoji: '📄',
    },
    {
      slug: 'perbedaan-invoice-proforma-dan-invoice-reguler',
      title: 'Perbedaan Invoice Proforma dan Reguler: Mana yang Digunakan?',
      excerpt: 'Banyak pelaku bisnis masih bingung kapan harus menggunakan Proforma Invoice dan Invoice Reguler. Artikel ini membahas perbedaan mendasar keduanya dari segi hukum, akuntansi, dan praktik bisnis.',
      category: 'Edukasi Bisnis',
      readTime: '6 menit',
      date: '5 Juni 2026',
      coverEmoji: '📑',
    },
    {
      slug: 'tips-agar-invoice-dibayar-tepat-waktu',
      title: '7 Tips Ampuh Agar Invoice Dibayar Tepat Waktu oleh Klien',
      excerpt: 'Keterlambatan pembayaran adalah masalah terbesar bagi bisnis kecil. Dengan strategi invoicing yang tepat, Anda bisa memangkas keterlambatan secara signifikan.',
      category: 'Tips Bisnis',
      readTime: '8 menit',
      date: '1 Juni 2026',
      coverEmoji: '💡',
    },
    {
      slug: 'panduan-faktur-pajak-dan-npwp-untuk-umkm',
      title: 'Panduan Lengkap Faktur Pajak dan NPWP untuk UMKM',
      excerpt: 'Memahami kewajiban perpajakan dalam transaksi adalah hal krusial. Membahas kapan perlu mencantumkan NPWP di invoice, PPN 11%, dan bedanya faktur pajak dengan invoice biasa.',
      category: 'Perpajakan',
      readTime: '10 menit',
      date: '25 Mei 2026',
      coverEmoji: '🏛️',
    },
    {
      slug: 'tutorial-membuat-tanda-tangan-digital-di-invora',
      title: 'Tutorial: Membuat Tanda Tangan Digital Langsung di Invora',
      excerpt: 'Panduan langkah demi langkah menggunakan fitur kanvas tanda tangan digital Invora untuk memberikan legalitas pada invoice Anda tanpa perlu aplikasi pihak ketiga.',
      category: 'Tutorial Invora',
      readTime: '4 menit',
      date: '27 Juni 2026',
      coverEmoji: '✍️',
    },
    {
      slug: 'cara-mengelola-database-klien-dan-perusahaan',
      title: 'Cara Mengelola Database Klien & Multi-Perusahaan di Invora',
      excerpt: 'Jangan membuang waktu mengetik data berulang. Pelajari cara menggunakan fitur manajemen profil klien (Billed To) dan profil perusahaan Anda (Billed From) untuk invoicing kilat.',
      category: 'Tutorial Invora',
      readTime: '5 menit',
      date: '26 Juni 2026',
      coverEmoji: '🗃️',
    },
    {
      slug: 'strategi-diskon-dan-pajak-dalam-invoicing',
      title: 'Strategi Menerapkan Diskon dan Pajak pada Tagihan Anda',
      excerpt: 'Invora mendukung kalkulasi diskon persentase maupun nominal serta penambahan baris pajak kustom. Ketahui cara menggunakannya untuk promosi maupun kewajiban PPh.',
      category: 'Panduan Invoicing',
      readTime: '6 menit',
      date: '20 Juni 2026',
      coverEmoji: '📉',
    },
    {
      slug: 'berbagi-invoice-melalui-public-link',
      title: 'Mempercepat Pembayaran dengan Fitur Public Link Invora',
      excerpt: 'Tidak perlu repot mengunduh PDF dan mengirim email. Fitur Public Link memungkinkan klien Anda mengakses invoice secara real-time dari browser apa pun dengan aman.',
      category: 'Tutorial Invora',
      readTime: '4 menit',
      date: '15 Juni 2026',
      coverEmoji: '🔗',
    }
  ],
  EN: [
    {
      slug: 'cara-membuat-invoice-profesional',
      title: 'How to Create a Professional Invoice for Your Business',
      excerpt: 'A professional invoice is more than just a billing document — it represents your business. Learn the mandatory elements of every invoice and how a neat design boosts client trust.',
      category: 'Invoicing Guide',
      readTime: '7 min',
      date: 'Jun 10, 2026',
      coverEmoji: '📄',
    },
    {
      slug: 'perbedaan-invoice-proforma-dan-invoice-reguler',
      title: 'Proforma vs. Regular Invoices: Which One to Use?',
      excerpt: 'Many business owners are confused about when to use a Proforma Invoice and a Regular Invoice. This article discusses the fundamental differences legally and practically.',
      category: 'Business Education',
      readTime: '6 min',
      date: 'Jun 5, 2026',
      coverEmoji: '📑',
    },
    {
      slug: 'tips-agar-invoice-dibayar-tepat-waktu',
      title: '7 Proven Tips to Get Your Invoices Paid on Time',
      excerpt: 'Late payments are a major issue for small businesses. With the right invoicing strategies, you can significantly reduce delayed payments and improve cash flow.',
      category: 'Business Tips',
      readTime: '8 min',
      date: 'Jun 1, 2026',
      coverEmoji: '💡',
    },
    {
      slug: 'panduan-faktur-pajak-dan-npwp-untuk-umkm',
      title: 'A Complete Guide to Tax Invoices and VAT for Small Businesses',
      excerpt: 'Understanding tax obligations in transactions is crucial. We discuss when to include a Tax ID, calculating VAT, and the difference between commercial and tax invoices.',
      category: 'Taxation',
      readTime: '10 min',
      date: 'May 25, 2026',
      coverEmoji: '🏛️',
    },
    {
      slug: 'tutorial-membuat-tanda-tangan-digital-di-invora',
      title: 'Tutorial: Creating Digital Signatures Directly in Invora',
      excerpt: 'A step-by-step guide to using Invora\'s digital signature canvas to provide legality to your invoices without needing any third-party applications.',
      category: 'Invora Tutorial',
      readTime: '4 min',
      date: 'Jun 27, 2026',
      coverEmoji: '✍️',
    },
    {
      slug: 'cara-mengelola-database-klien-dan-perusahaan',
      title: 'Managing Client & Multi-Company Databases in Invora',
      excerpt: 'Stop wasting time retyping data. Learn how to use the client profile (Billed To) and company profile (Billed From) management features for lightning-fast invoicing.',
      category: 'Invora Tutorial',
      readTime: '5 min',
      date: 'Jun 26, 2026',
      coverEmoji: '🗃️',
    },
    {
      slug: 'strategi-diskon-dan-pajak-dalam-invoicing',
      title: 'Strategies for Applying Discounts and Taxes to Your Bills',
      excerpt: 'Invora supports percentage and fixed-amount discounts as well as custom tax rows. Learn how to use them for promotions and tax obligations effectively.',
      category: 'Invoicing Guide',
      readTime: '6 min',
      date: 'Jun 20, 2026',
      coverEmoji: '📉',
    },
    {
      slug: 'berbagi-invoice-melalui-public-link',
      title: 'Speed Up Payments with Invora\'s Public Link Feature',
      excerpt: 'No need to bother downloading PDFs and sending emails. The Public Link feature allows your clients to securely access invoices in real-time from any browser.',
      category: 'Invora Tutorial',
      readTime: '4 min',
      date: 'Jun 15, 2026',
      coverEmoji: '🔗',
    }
  ]
};

export const Blog = () => {
  const { lang } = useTranslation();
  const posts = blogPostsData[lang];
  const categories = [...new Set(posts.map(p => p.category))];
  
  const ui = {
    title: lang === 'ID' ? 'Blog & Panduan Invoicing' : 'Blog & Invoicing Guides',
    desc: lang === 'ID' ? 'Artikel, panduan praktis, dan tips seputar invoicing, perpajakan, dan pengelolaan keuangan bisnis.' : 'Articles, practical guides, and tips around invoicing, taxation, and business financial management.',
    all: lang === 'ID' ? 'Semua' : 'All',
    read: lang === 'ID' ? 'baca' : 'read',
    readMore: lang === 'ID' ? 'Baca' : 'Read'
  };

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
              {ui.title}
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-2xl mx-auto">
              {ui.desc}
            </p>
          </div>
        </section>

        {/* Category Pills */}
        <section className="bg-[#FDFCFA] border-b border-[#E2DED7] py-4">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-teal-700 text-white cursor-pointer">{ui.all}</span>
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
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group bg-white border border-[#E2DED7] rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                >
                  {/* Cover */}
                  <div className="bg-gradient-to-br from-teal-50 to-stone-100 h-36 flex items-center justify-center border-b border-[#E2DED7]">
                    <span className="text-6xl">{post.coverEmoji}</span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag size={11} className="text-teal-600" />
                      <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">{post.category}</span>
                    </div>
                    <h2 className="text-base font-bold text-stone-900 font-serif leading-snug mb-3 group-hover:text-teal-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-xs text-stone-500 leading-relaxed mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                      <div className="flex items-center gap-3 text-xs text-stone-400">
                        <div className="flex items-center gap-1">
                          <Clock size={11} />
                          <span>{post.readTime} {ui.read}</span>
                        </div>
                        <span>·</span>
                        <span>{post.date}</span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-teal-700 group-hover:gap-2 transition-all">
                        {ui.readMore} <ArrowRight size={12} />
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
