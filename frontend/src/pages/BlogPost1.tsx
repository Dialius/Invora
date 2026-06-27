import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/PublicLayout';
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react';

export const BlogPost1 = () => (
  <PublicLayout>
    <div className="min-h-screen bg-[#F0EDE8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Back */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft size={15} /> Kembali ke Blog
        </Link>

        <article className="bg-white border border-[#E2DED7] rounded-2xl overflow-hidden">
          <div className="h-2 bg-teal-500" />
          <div className="p-8 sm:p-12">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border bg-teal-50 text-teal-700 border-teal-200">
                <Tag size={10} /> Panduan Dasar
              </span>
              <span className="flex items-center gap-1 text-xs text-stone-400"><Clock size={11} /> 7 menit baca</span>
              <span className="text-xs text-stone-400">10 Juni 2026</span>
            </div>

            <h1 className="text-3xl font-bold text-stone-900 font-serif leading-tight mb-6">
              Apa Itu Invoice? Pengertian, Fungsi, dan Contoh Lengkap
            </h1>

            <p className="text-stone-600 leading-relaxed mb-6">
              Dalam dunia bisnis modern, <strong>invoice</strong> adalah salah satu dokumen paling penting yang digunakan untuk mencatat transaksi antara penjual dan pembeli. Namun, masih banyak pelaku usaha — terutama freelancer dan UMKM — yang belum memahami sepenuhnya apa itu invoice, apa bedanya dengan faktur atau kwitansi, dan mengapa dokumen ini sangat krusial untuk kelangsungan bisnis Anda.
            </p>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Pengertian Invoice</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Invoice (atau dalam bahasa Indonesia disebut <em>faktur</em>) adalah dokumen tagihan resmi yang dibuat dan dikirimkan oleh penjual (supplier/vendor) kepada pembeli setelah barang atau jasa telah diserahkan. Invoice berfungsi sebagai permintaan pembayaran resmi dan menjadi bukti transaksi yang sah secara hukum.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              Secara sederhana, invoice menjawab pertanyaan: <em>"Apa yang sudah saya kirimkan/kerjakan, berapa harganya, dan kapan harus dibayar?"</em>
            </p>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Fungsi Utama Invoice dalam Bisnis</h2>
            <p className="text-stone-600 leading-relaxed mb-3">Invoice memiliki beberapa fungsi penting yang tidak bisa diabaikan:</p>
            <ul className="space-y-3 mb-6">
              {[
                ['Bukti Transaksi Resmi', 'Invoice menjadi catatan legal bahwa suatu transaksi telah terjadi antara dua pihak. Ini penting jika terjadi sengketa di kemudian hari.'],
                ['Dokumen Akuntansi', 'Akuntan dan tim keuangan menggunakan invoice untuk mencatat pendapatan (di sisi penjual) dan pengeluaran (di sisi pembeli) dalam laporan keuangan.'],
                ['Dasar Perhitungan Pajak', 'Di Indonesia, invoice — terutama yang dilengkapi dengan Faktur Pajak — menjadi dasar perhitungan dan pelaporan Pajak Pertambahan Nilai (PPN).'],
                ['Alat Manajemen Arus Kas', 'Dengan invoice yang memiliki tanggal jatuh tempo, bisnis dapat merencanakan arus kas dan mengantisipasi kapan uang akan masuk.'],
                ['Referensi untuk Pembayaran', 'Pembeli menggunakan nomor invoice sebagai referensi saat melakukan transfer bank, memudahkan rekonsiliasi antara kedua pihak.'],
              ].map(([title, desc], i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div><span className="font-semibold text-stone-800">{title}:</span> <span className="text-stone-600 text-sm">{desc}</span></div>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Elemen Wajib dalam Sebuah Invoice Profesional</h2>
            <p className="text-stone-600 leading-relaxed mb-4">Agar invoice Anda valid secara bisnis dan mudah diproses oleh klien, pastikan memuat elemen-elemen berikut:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                'Nomor Invoice (unik dan berurutan)',
                'Tanggal pembuatan invoice',
                'Tanggal jatuh tempo pembayaran',
                'Data lengkap penjual (nama, alamat, NPWP)',
                'Data lengkap pembeli/klien',
                'Deskripsi barang atau jasa',
                'Jumlah (qty), harga satuan, dan subtotal',
                'Perhitungan diskon (jika ada)',
                'Pajak (PPN 11% jika PKP)',
                'Total tagihan akhir',
                'Informasi rekening bank tujuan',
                'Tanda tangan pihak yang berwenang',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-stone-600 bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Jenis-Jenis Invoice yang Umum Digunakan</h2>
            <div className="space-y-4 mb-6">
              {[
                ['Invoice Reguler', 'Jenis invoice standar yang dikeluarkan setelah pekerjaan atau pengiriman barang selesai dilakukan. Paling umum digunakan dalam transaksi B2B dan B2C.'],
                ['Proforma Invoice', 'Invoice pendahuluan yang dikirim sebelum pekerjaan dimulai. Berfungsi sebagai penawaran harga resmi dan tidak memiliki kewajiban hukum pembayaran langsung.'],
                ['Invoice Uang Muka (Down Payment)', 'Dikeluarkan untuk menagih pembayaran awal (DP) dari total nilai proyek. Umumnya berkisar 30%–50% dari total tagihan.'],
                ['Invoice Pelunasan', 'Diterbitkan pada akhir proyek untuk menagih sisa pembayaran setelah DP diterima. Mencantumkan jumlah yang sudah dibayar dan sisa yang masih harus dilunasi.'],
              ].map(([title, desc], i) => (
                <div key={i} className="border border-[#E2DED7] rounded-xl p-5 bg-[#FDFCFA]">
                  <h3 className="font-bold text-stone-800 mb-1">{title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Cara Membuat Invoice dengan Mudah</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Di era digital, membuat invoice tidak lagi harus dilakukan secara manual menggunakan Word atau Excel. Anda dapat menggunakan platform invoicing online seperti <strong>Invora</strong> yang memungkinkan Anda membuat invoice profesional dalam hitungan menit, lengkap dengan fitur:
            </p>
            <ul className="space-y-2 mb-6 text-sm text-stone-600">
              {['Pembuatan invoice dengan template profesional', 'Pengelolaan profil perusahaan dan klien', 'Tanda tangan digital langsung di browser', 'Ekspor PDF berkualitas tinggi', 'Berbagi invoice via link publik ke klien', 'Dukungan multi-mata uang (IDR, USD, EUR)'].map((f, i) => (
                <li key={i} className="flex items-center gap-2"><span className="text-teal-600">✓</span>{f}</li>
              ))}
            </ul>

            <div className="mt-10 bg-teal-50 border border-teal-200/70 rounded-2xl p-7 text-center">
              <h3 className="font-bold text-stone-900 mb-2">Buat Invoice Profesional Sekarang — Gratis!</h3>
              <p className="text-sm text-stone-500 mb-5">Tidak perlu kartu kredit. Mulai buat invoice Anda dalam 2 menit.</p>
              <Link to="/register" className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold px-7 py-3 rounded-xl text-sm transition-all">
                Daftar Gratis <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-teal-700 hover:underline font-medium">
            <ArrowLeft size={14} /> Lihat semua artikel
          </Link>
        </div>
      </div>
    </div>
  </PublicLayout>
);
