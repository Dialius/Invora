import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/PublicLayout';
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react';

export const BlogPost2 = () => (
  <PublicLayout>
    <div className="min-h-screen bg-[#F0EDE8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft size={15} /> Kembali ke Blog
        </Link>

        <article className="bg-white border border-[#E2DED7] rounded-2xl overflow-hidden">
          <div className="h-2 bg-stone-400" />
          <div className="p-8 sm:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border bg-stone-100 text-stone-700 border-stone-200">
                <Tag size={10} /> Tutorial
              </span>
              <span className="flex items-center gap-1 text-xs text-stone-400"><Clock size={11} /> 10 menit baca</span>
              <span className="text-xs text-stone-400">12 Juni 2026</span>
            </div>

            <h1 className="text-3xl font-bold text-stone-900 font-serif leading-tight mb-6">
              Cara Membuat Invoice yang Profesional dan Sah Secara Hukum
            </h1>

            <p className="text-stone-600 leading-relaxed mb-6">
              Membuat invoice yang profesional bukan sekadar mencantumkan angka dan nama. Invoice yang baik mencerminkan kredibilitas bisnis Anda, mempercepat proses pembayaran, dan melindungi Anda secara hukum jika terjadi sengketa. Panduan ini akan memandu Anda langkah demi langkah cara membuat invoice yang benar.
            </p>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Langkah 1: Siapkan Informasi yang Dibutuhkan</h2>
            <p className="text-stone-600 leading-relaxed mb-4">Sebelum membuat invoice, kumpulkan semua data yang diperlukan:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                ['Data Anda (Penjual)', ['Nama lengkap / nama bisnis', 'Alamat usaha', 'Nomor telepon & email', 'Nomor NPWP (jika PKP)', 'Informasi rekening bank']],
                ['Data Klien (Pembeli)', ['Nama perusahaan / klien', 'Alamat penagihan', 'Nama PIC / contact person', 'Email untuk pengiriman invoice', 'Nomor PO (jika ada)']],
              ].map(([label, items], i) => (
                <div key={i} className="bg-stone-50 border border-stone-100 rounded-xl p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">{label as string}</div>
                  <ul className="space-y-1.5">
                    {(items as string[]).map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-stone-600">
                        <span className="w-1 h-1 rounded-full bg-stone-400 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Langkah 2: Buat Nomor Invoice yang Terstruktur</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Nomor invoice harus unik dan berurutan. Format yang umum digunakan di Indonesia:
            </p>
            <div className="bg-stone-900 text-teal-400 rounded-xl p-5 font-mono text-sm mb-4">
              <div className="text-stone-400 text-xs mb-2"># Contoh format nomor invoice:</div>
              <div>INV/2026/06/001</div>
              <div className="text-stone-500 text-xs mt-2">→ INV = kode perusahaan | 2026 = tahun | 06 = bulan | 001 = urutan</div>
            </div>
            <p className="text-stone-600 leading-relaxed mb-6">
              Konsistensi dalam penomoran invoice sangat penting untuk kemudahan pencarian dan audit keuangan di masa mendatang.
            </p>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Langkah 3: Isi Detail Barang atau Jasa</h2>
            <p className="text-stone-600 leading-relaxed mb-4">Bagian ini adalah inti dari invoice. Pastikan setiap baris memuat:</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-[#E2DED7] rounded-xl overflow-hidden">
                <thead className="bg-stone-50">
                  <tr>
                    {['Kolom', 'Contoh Isi', 'Tips'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase text-stone-500 border-b border-[#E2DED7]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Deskripsi', 'Jasa Desain Logo Brand', 'Gunakan bahasa yang jelas dan spesifik'],
                    ['Qty', '1 paket', 'Sebutkan satuan (jam, paket, unit, pcs)'],
                    ['Harga Satuan', 'Rp 3.500.000', 'Pastikan sesuai dengan kontrak/quotation'],
                    ['Diskon', '10%', 'Cantumkan jika ada diskon yang disepakati'],
                    ['Subtotal', 'Rp 3.150.000', 'Harga satuan × Qty − Diskon'],
                  ].map(([col, ex, tip], i) => (
                    <tr key={i} className="border-b border-[#E2DED7] last:border-0">
                      <td className="px-4 py-3 font-semibold text-stone-800">{col}</td>
                      <td className="px-4 py-3 text-stone-600">{ex}</td>
                      <td className="px-4 py-3 text-stone-500 text-xs">{tip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Langkah 4: Hitung Total dengan Benar</h2>
            <p className="text-stone-600 leading-relaxed mb-4">Urutan perhitungan total yang benar adalah:</p>
            <div className="space-y-2 mb-6">
              {[
                ['Subtotal', 'Jumlah semua baris item setelah diskon per item'],
                ['Diskon Global (opsional)', 'Diskon keseluruhan dalam persen atau nominal rupiah'],
                ['PPN 11%', 'Wajib jika Anda adalah Pengusaha Kena Pajak (PKP)'],
                ['Biaya Tambahan', 'Ongkos kirim, biaya handling, dll. (jika ada)'],
                ['Total Tagihan', 'Angka final yang harus dibayar klien'],
              ].map(([label, desc], i) => (
                <div key={i} className="flex items-start gap-3 bg-stone-50 border border-stone-100 rounded-xl px-4 py-3">
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <div><span className="font-semibold text-stone-800 text-sm">{label}:</span> <span className="text-stone-500 text-sm">{desc}</span></div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Langkah 5: Cantumkan Syarat Pembayaran yang Jelas</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Syarat pembayaran yang tidak jelas adalah penyebab utama keterlambatan pembayaran. Selalu cantumkan:
            </p>
            <ul className="space-y-2 mb-6 text-sm text-stone-600">
              {[
                'Tanggal jatuh tempo yang spesifik (misal: "Pembayaran paling lambat 15 Juli 2026")',
                'Metode pembayaran yang diterima (transfer bank, dll.)',
                'Informasi rekening bank yang lengkap (nama bank, nomor rekening, nama pemilik)',
                'Denda keterlambatan jika berlaku (misal: "Keterlambatan dikenakan denda 2% per bulan")',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal-600 mt-0.5">✓</span>{item}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Langkah 6: Tambahkan Tanda Tangan Digital</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Tanda tangan pada invoice menambah keabsahan dokumen dan menunjukkan bahwa tagihan telah diotorisasi oleh pihak yang berwenang. Dengan Invora, Anda bisa langsung menggambar tanda tangan di browser atau mengunggah file gambar tanda tangan Anda.
            </p>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Langkah 7: Kirim dan Simpan Invoice</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Setelah invoice selesai, langkah terakhir adalah mengirimkannya ke klien dan menyimpan salinannya:
            </p>
            <ul className="space-y-2 mb-6 text-sm text-stone-600">
              {[
                'Ekspor invoice dalam format PDF untuk tampilan yang konsisten di semua perangkat',
                'Kirim via email atau bagikan link invoice publik yang bisa diakses klien tanpa login',
                'Simpan salinan digital di cloud untuk kemudahan pencarian di masa mendatang',
                'Catat status pembayaran (lunas/belum) untuk monitoring arus kas',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal-600 mt-0.5">✓</span>{item}
                </li>
              ))}
            </ul>

            <div className="mt-10 bg-teal-50 border border-teal-200/70 rounded-2xl p-7 text-center">
              <h3 className="font-bold text-stone-900 mb-2">Buat Invoice Profesional dengan Invora</h3>
              <p className="text-sm text-stone-500 mb-5">Ikuti semua langkah di atas secara otomatis — Invora memandu Anda dari awal hingga PDF siap kirim.</p>
              <Link to="/register" className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold px-7 py-3 rounded-xl text-sm transition-all">
                Coba Gratis Sekarang <ArrowRight size={14} />
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
