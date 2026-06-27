import { PublicLayout } from '../components/PublicLayout';
import { ShieldCheck, FileCheck, Layers, Eye, RefreshCw, PenTool, Zap, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../context/i18n';

const featuresData: Record<'EN' | 'ID', { icon: any, title: string, desc: string }[]> = {
  ID: [
    {
      icon: PenTool,
      title: 'Tanda Tangan Digital & Kanvas',
      desc: 'Invora menyediakan kanvas tanda tangan langsung di dalam browser. Gambar tanda tangan menggunakan mouse/layar sentuh, atau unggah gambar resmi. Otomatis ditempatkan secara presisi pada PDF.',
    },
    {
      icon: Eye,
      title: 'Live Preview Tanpa Loading',
      desc: 'Setiap kali mengubah harga, menambah diskon, atau mengganti mata uang, dokumen di layar akan memperbarui tampilannya secara real-time. Bebas dari kesalahan sebelum dikirim ke klien.',
    },
    {
      icon: Layers,
      title: 'Manajemen Profil Klien',
      desc: 'Simpan profil berbagai perusahaan (Billed From) lengkap dengan logo. Simpan juga klien (Billed To). Saat membuat invoice, cukup pilih dari dropdown, dan data terisi otomatis.',
    },
    {
      icon: RefreshCw,
      title: 'Dukungan Multi-Mata Uang',
      desc: 'Mendukung pembuatan invoice dalam USD, EUR, SGD, IDR, dan lainnya. Simbol dan format angka otomatis menyesuaikan dengan standar internasional mata uang pilihan Anda.',
    },
    {
      icon: ShieldCheck,
      title: 'Keamanan Data Enterprise',
      desc: 'Infrastruktur database ditenagai oleh Supabase dengan perlindungan enkripsi canggih (Row Level Security). Data invoice Anda hanya dapat diakses oleh Anda sendiri.',
    },
    {
      icon: FileCheck,
      title: 'Pencegahan Kesalahan (Safe Delete)',
      desc: 'Sistem melindungi integritas referensial. Anda tidak bisa menghapus profil yang sedang digunakan dalam invoice aktif, mencegah kerusakan data pada arsip historis Anda.',
    }
  ],
  EN: [
    {
      icon: PenTool,
      title: 'Digital Signature & Canvas',
      desc: 'Invora provides an in-browser signature canvas. Draw your signature using a mouse/touchscreen, or upload an official image. Automatically placed precisely on your PDF.',
    },
    {
      icon: Eye,
      title: 'Zero-Loading Live Preview',
      desc: 'Every time you change a price, add a discount, or switch currency, the document updates in real-time. Ensure zero mistakes before sending it to clients.',
    },
    {
      icon: Layers,
      title: 'Client Profile Management',
      desc: 'Save multiple company profiles (Billed From) with logos, and client profiles (Billed To). Select them from a dropdown to autofill data instantly.',
    },
    {
      icon: RefreshCw,
      title: 'Multi-Currency Support',
      desc: 'Supports invoicing in USD, EUR, SGD, IDR, and more. Currency symbols and number formats automatically adapt to the international standards of your chosen currency.',
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Data Security',
      desc: 'Database infrastructure powered by Supabase with advanced encryption (Row Level Security). Your invoice data is strictly accessible only by you.',
    },
    {
      icon: FileCheck,
      title: 'Safe Delete Protection',
      desc: 'The system protects referential integrity. You cannot delete a profile that is used in an active invoice, preventing data corruption in your historical archives.',
    }
  ]
};

const benefitsData: Record<'EN' | 'ID', string[]> = {
  ID: [
    'Berbagi via Tautan Publik (Public Link)',
    'Ekspor Dokumen ke Format PDF (Siap Cetak)',
    'Hitung Otomatis (Subtotal, Pajak, Diskon)',
    'Antarmuka Bersih dan Bebas Distraksi',
    'Responsive di Komputer maupun Ponsel',
    'Gratis Tanpa Biaya Berlangganan'
  ],
  EN: [
    'Share via Secure Public Link',
    'Export to Print-Ready PDF Format',
    'Auto-Calculate (Subtotal, Tax, Discount)',
    'Clean & Distraction-Free Interface',
    'Responsive on Desktop and Mobile',
    'Completely Free, No Subscriptions'
  ]
};

export const Features = () => {
  const { lang } = useTranslation();
  
  const featuresList = featuresData[lang];
  const benefitsList = benefitsData[lang];

  const ui = {
    headerTitle1: lang === 'ID' ? 'Fitur Lengkap untuk' : 'Comprehensive Features for',
    headerTitle2: lang === 'ID' ? 'Invoicing Profesional' : 'Professional Invoicing',
    headerDesc: lang === 'ID' ? 'Invora dirancang untuk menghilangkan kerumitan administratif. Dari pembuatan invoice hingga pengiriman ke klien, semua dibangun untuk kecepatan dan akurasi.' : 'Invora is designed to eliminate administrative hassle. From invoice creation to client delivery, everything is built for speed and accuracy.',
    benefitTitle: lang === 'ID' ? 'Lebih Banyak Kemudahan' : 'Even More Benefits'
  };

  return (
    <PublicLayout>
      <div className="py-20 bg-[#F0EDE8] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 text-teal-700 mb-5">
              <Zap size={26} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 font-serif tracking-tight mb-6">
              {ui.headerTitle1} <br className="hidden sm:block" />
              <span className="text-teal-700">{ui.headerTitle2}</span>
            </h1>
            <p className="text-stone-600 text-base leading-relaxed">
              {ui.headerDesc}
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {featuresList.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E2DED7] p-8 sm:p-10 rounded-3xl hover:shadow-lg hover:border-teal-300/50 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-stone-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-6 group-hover:scale-110 group-hover:bg-teal-700 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-4 font-serif leading-snug">{f.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed flex-grow">{f.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Benefits Section */}
          <div className="bg-stone-900 rounded-3xl p-10 sm:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-teal-800 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-stone-700 rounded-full blur-3xl opacity-30"></div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-10 relative z-10">
              {ui.benefitTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 max-w-4xl mx-auto text-left">
              {benefitsList.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-stone-800/50 p-4 rounded-xl border border-stone-700/50">
                  <CheckCircle2 className="text-teal-500 flex-shrink-0" size={20} />
                  <span className="text-stone-300 text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
