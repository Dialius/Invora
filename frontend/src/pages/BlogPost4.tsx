import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/PublicLayout';
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react';

export const BlogPost4 = () => (
  <PublicLayout>
    <div className="min-h-screen bg-[#F0EDE8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft size={15} /> Kembali ke Blog
        </Link>

        <article className="bg-white border border-[#E2DED7] rounded-2xl overflow-hidden">
          <div className="h-2 bg-indigo-500" />
          <div className="p-8 sm:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border bg-indigo-50 text-indigo-700 border-indigo-200">
                <Tag size={10} /> Tips Bisnis
              </span>
              <span className="flex items-center gap-1 text-xs text-stone-400"><Clock size={11} /> 9 menit baca</span>
              <span className="text-xs text-stone-400">16 Juni 2026</span>
            </div>

            <h1 className="text-3xl font-bold text-stone-900 font-serif leading-tight mb-6">
              7 Tips Mengelola Keuangan untuk Freelancer dan UMKM Indonesia
            </h1>

            <p className="text-stone-600 leading-relaxed mb-6">
              Salah satu tantangan terbesar bagi freelancer dan pemilik UMKM adalah mengelola keuangan bisnis dengan baik. Tanpa sistem yang tepat, uang masuk bisa terpakai sebelum tagihan bisnis dibayar, proyek bisa berjalan tanpa catatan yang jelas, dan akhirnya bisnis stagnan meskipun pendapatan terlihat cukup. Berikut adalah 7 tips praktis yang bisa langsung Anda terapkan hari ini.
            </p>

            {[
              {
                num: '01',
                title: 'Pisahkan Rekening Pribadi dan Bisnis',
                color: 'indigo',
                content: `Ini adalah aturan dasar yang sering diabaikan freelancer pemula: jangan pernah campur adukkan uang pribadi dengan uang bisnis. Buka rekening bank terpisah khusus untuk kegiatan usaha Anda.

Manfaatnya sangat nyata: Anda bisa langsung melihat kondisi keuangan bisnis, mudah menghitung pajak, dan terhindar dari godaan menggunakan uang bisnis untuk keperluan pribadi.`,
                tips: ['Buka rekening bisnis di bank yang menawarkan biaya admin rendah', 'Transfer "gaji" ke rekening pribadi secara berkala — bukan ambil seenaknya', 'Semua pembayaran dari klien harus masuk ke rekening bisnis'],
              },
              {
                num: '02',
                title: 'Selalu Gunakan Invoice Resmi untuk Setiap Transaksi',
                color: 'teal',
                content: `Banyak freelancer masih menerima pembayaran tanpa dokumen apapun — hanya berdasarkan obrolan WhatsApp. Ini sangat berisiko. Invoice resmi melindungi Anda secara hukum, memperjelas ekspektasi pembayaran, dan memudahkan pencatatan keuangan.

Biasakan membuat invoice untuk setiap proyek, sekecil apapun nilainya. Cantumkan tanggal jatuh tempo yang spesifik untuk menghindari ketidakjelasan.`,
                tips: ['Kirim invoice sesegera mungkin setelah pekerjaan selesai', 'Selalu cantumkan nomor invoice yang terurut untuk kemudahan tracking', 'Simpan salinan semua invoice yang pernah dikirim'],
              },
              {
                num: '03',
                title: 'Buat Anggaran Operasional Bulanan',
                color: 'amber',
                content: `Setiap bisnis, sekecil apapun, perlu anggaran. Anggaran membantu Anda memahami berapa minimum pendapatan yang harus didapatkan setiap bulan agar bisnis tetap berjalan.

Hitung semua biaya tetap (hosting, software, internet, sewa) dan variabel (alat, transportasi, jasa pihak ketiga). Dari sini, Anda bisa menentukan harga jasa yang realistis dan profitable.`,
                tips: ['Catat semua pengeluaran bisnis, sekecil apapun', 'Review anggaran setiap awal bulan', 'Sisihkan minimal 20% dari pendapatan untuk dana darurat bisnis'],
              },
              {
                num: '04',
                title: 'Tetapkan Term Pembayaran yang Ketat',
                color: 'rose',
                content: `Klien yang terlambat membayar adalah masalah klasik freelancer. Solusinya: buat aturan pembayaran yang jelas sejak awal dan konsisten menerapkannya.

Beberapa praktik terbaik yang umum digunakan: minta uang muka (DP) 30-50% sebelum memulai proyek, tentukan batas waktu pembayaran yang masuk akal (NET 14 atau NET 30), dan jangan ragu menagih jika sudah melewati jatuh tempo.`,
                tips: ['Selalu minta DP untuk proyek baru — ini juga seleksi klien yang serius', 'Kirim pengingat pembayaran 3 hari sebelum jatuh tempo', 'Pertimbangkan denda keterlambatan untuk klien yang sering telat'],
              },
              {
                num: '05',
                title: 'Lacak Semua Piutang Secara Aktif',
                color: 'green',
                content: `Piutang yang tidak tertagih adalah "uang mati" yang menghambat arus kas bisnis Anda. Buat sistem untuk melacak semua invoice yang sudah dikirim: mana yang sudah dibayar, mana yang belum, dan mana yang sudah melewati jatuh tempo.

Jangan tunggu klien menghubungi — Anda yang harus proaktif menagih dengan sopan tapi tegas.`,
                tips: ['Gunakan aplikasi atau spreadsheet untuk tracking status invoice', 'Kirim reminder payment 1 minggu setelah jatuh tempo', 'Untuk piutang > 30 hari, pertimbangkan mengirim surat teguran resmi'],
              },
              {
                num: '06',
                title: 'Pahami Kewajiban Pajak Anda',
                color: 'purple',
                content: `Banyak freelancer dan UMKM yang tidak menyadari kewajiban pajak mereka sampai ada masalah dengan DJP. Kenali kewajiban pajak dasar Anda:

Sebagai freelancer atau pemilik usaha pribadi, Anda wajib melaporkan penghasilan melalui SPT Tahunan PPh Orang Pribadi. Jika omset sudah melebihi Rp500 juta per tahun, Anda terkena PPh Final UMKM sebesar 0,5%.`,
                tips: ['Sisihkan 1-5% dari setiap pendapatan untuk persiapan pajak', 'Simpan semua bukti pengeluaran bisnis sebagai kredit pajak', 'Konsultasikan dengan konsultan pajak untuk perencanaan yang optimal'],
              },
              {
                num: '07',
                title: 'Review Keuangan Bisnis Setiap Bulan',
                color: 'stone',
                content: `Luangkan 30-60 menit setiap akhir bulan untuk mereview kondisi keuangan bisnis Anda. Ini bukan tentang akuntansi rumit — cukup tanyakan beberapa pertanyaan kunci:

Apakah pendapatan bulan ini melebihi pengeluaran? Invoice mana yang belum dibayar? Apakah ada pola pengeluaran yang bisa dihemat? Layanan atau klien mana yang paling menguntungkan?`,
                tips: ['Buat laporan laba rugi sederhana setiap bulan', 'Bandingkan pendapatan aktual vs target yang sudah Anda buat', 'Identifikasi minimal satu area yang bisa dioptimalkan setiap bulan'],
              },
            ].map((tip, idx) => (
              <div key={idx} className="mt-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-black text-stone-200 font-serif leading-none">{tip.num}</span>
                  <h2 className="text-xl font-bold text-stone-900 font-serif">{tip.title}</h2>
                </div>
                <div className="space-y-3 mb-4">
                  {tip.content.trim().split('\n\n').map((para, i) => (
                    <p key={i} className="text-stone-600 leading-relaxed text-sm">{para.trim()}</p>
                  ))}
                </div>
                <div className="bg-stone-50 border border-stone-100 rounded-xl p-4">
                  <div className="text-xs font-bold uppercase text-stone-400 mb-2">Tips Praktis:</div>
                  <ul className="space-y-1.5">
                    {tip.tips.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                        <span className="text-teal-600 mt-0.5 shrink-0">✓</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div className="mt-12 bg-teal-50 border border-teal-200/70 rounded-2xl p-7 text-center">
              <h3 className="font-bold text-stone-900 mb-2">Mulai Kelola Invoice Anda dengan Lebih Profesional</h3>
              <p className="text-sm text-stone-500 mb-5">Invora membantu freelancer dan UMKM membuat invoice profesional, melacak klien, dan mengekspor PDF — semuanya gratis.</p>
              <Link to="/register" className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold px-7 py-3 rounded-xl text-sm transition-all">
                Coba Invora Gratis <ArrowRight size={14} />
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
