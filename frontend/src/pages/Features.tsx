import { PublicLayout } from '../components/PublicLayout';
import { ShieldCheck, FileCheck, Layers, Eye, RefreshCw, PenTool, Zap, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../context/i18n';

export const Features = () => {
  const { t } = useTranslation();

  const featuresList = [
    {
      icon: PenTool,
      title: 'Tanda Tangan Digital & Kanvas Terintegrasi',
      desc: 'Berikan sentuhan profesional dan legalitas pada setiap invoice Anda. Invora menyediakan kanvas tanda tangan langsung di dalam browser. Anda dapat menggambar tanda tangan menggunakan mouse, stylus, atau layar sentuh. Jika Anda sudah memiliki gambar tanda tangan resmi perusahaan, Anda juga dapat mengunggahnya dengan mudah. Tanda tangan ini akan otomatis ditempatkan secara presisi pada dokumen PDF.',
    },
    {
      icon: Eye,
      title: 'Live Preview Real-Time Tanpa Loading',
      desc: 'Tidak ada lagi proses "Simpan lalu Pratinjau". Setiap kali Anda mengubah harga, menambahkan diskon, atau mengganti mata uang, dokumen di layar sebelah akan langsung memperbarui tampilannya secara real-time. Fitur Live Preview ini memastikan tidak ada kesalahan ketik atau salah hitung sebelum Anda mengirimkan tagihan ke klien.',
    },
    {
      icon: Layers,
      title: 'Manajemen Profil Klien & Perusahaan',
      desc: 'Hemat waktu Anda dari keharusan mengetik ulang informasi yang sama berulang kali. Simpan profil berbagai perusahaan (Billed From) lengkap dengan logo, alamat, dan nomor rekening. Lakukan hal yang sama untuk klien-klien Anda (Billed To). Saat membuat invoice, cukup pilih dari menu dropdown, dan semua informasi akan terisi otomatis.',
    },
    {
      icon: RefreshCw,
      title: 'Dukungan Multi-Mata Uang (Multi-Currency)',
      desc: 'Bekerja dengan klien dari luar negeri? Invora mendukung pembuatan invoice dalam berbagai mata uang internasional seperti USD (Dolar AS), EUR (Euro), SGD (Dolar Singapura), dan tentu saja IDR (Rupiah). Simbol dan format angka akan otomatis menyesuaikan dengan standar internasional mata uang yang Anda pilih.',
    },
    {
      icon: ShieldCheck,
      title: 'Keamanan Data Berstandar Enterprise',
      desc: 'Keamanan data finansial Anda adalah prioritas utama. Seluruh infrastruktur database Invora ditenagai oleh Supabase dengan perlindungan enkripsi canggih (Row Level Security). Kami menerapkan kontrol akses yang ketat sehingga data invoice Anda hanya dapat diakses oleh Anda sendiri.',
    },
    {
      icon: FileCheck,
      title: 'Sistem Pencegahan Kesalahan (Safe Delete)',
      desc: 'Sistem basis data kami dilengkapi dengan perlindungan integritas referensial. Artinya, Anda tidak akan bisa secara tidak sengaja menghapus profil klien atau perusahaan yang sedang digunakan dalam invoice aktif. Hal ini mencegah terjadinya kerusakan data (orphan records) pada arsip keuangan historis Anda.',
    }
  ];

  const benefitsList = [
    'Berbagi via Tautan Publik (Public Link)',
    'Ekspor Dokumen ke Format PDF (Siap Cetak)',
    'Hitung Otomatis (Subtotal, Pajak, Diskon, Total)',
    'Antarmuka Bersih dan Bebas Distraksi',
    'Responsive di Komputer, Tablet, maupun Ponsel',
    'Gratis Tanpa Biaya Berlangganan Bulanan'
  ];

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
              Fitur Lengkap untuk <br className="hidden sm:block" />
              <span className="text-teal-700">Invoicing Profesional</span>
            </h1>
            <p className="text-stone-600 text-base leading-relaxed">
              Invora dirancang untuk menghilangkan kerumitan administratif dari bisnis Anda. Dari pembuatan invoice hingga pengiriman ke klien, semua fitur kami dibangun untuk kecepatan, akurasi, dan profesionalisme.
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
              Lebih Banyak Kemudahan
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
