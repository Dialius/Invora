import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/PublicLayout';
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react';

export const BlogPost3 = () => (
  <PublicLayout>
    <div className="min-h-screen bg-[#F0EDE8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-teal-700 mb-8 transition-colors">
          <ArrowLeft size={15} /> Kembali ke Blog
        </Link>

        <article className="bg-white border border-[#E2DED7] rounded-2xl overflow-hidden">
          <div className="h-2 bg-amber-400" />
          <div className="p-8 sm:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200">
                <Tag size={10} /> Pengetahuan Bisnis
              </span>
              <span className="flex items-center gap-1 text-xs text-stone-400"><Clock size={11} /> 8 menit baca</span>
              <span className="text-xs text-stone-400">14 Juni 2026</span>
            </div>

            <h1 className="text-3xl font-bold text-stone-900 font-serif leading-tight mb-6">
              Perbedaan Invoice, Faktur Pajak, dan Kwitansi yang Wajib Diketahui
            </h1>

            <p className="text-stone-600 leading-relaxed mb-6">
              Dalam dunia bisnis Indonesia, tiga dokumen keuangan ini sering tertukar penggunaannya: <strong>invoice</strong>, <strong>faktur pajak</strong>, dan <strong>kwitansi</strong>. Meskipun ketiganya berhubungan dengan transaksi keuangan, masing-masing memiliki fungsi, waktu penggunaan, dan implikasi hukum yang sangat berbeda. Memahami perbedaannya adalah kunci pengelolaan keuangan bisnis yang tertib dan sesuai aturan perpajakan.
            </p>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-6">Perbandingan Ringkas: Invoice vs Faktur Pajak vs Kwitansi</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-[#E2DED7] rounded-xl overflow-hidden">
                <thead className="bg-amber-50">
                  <tr>
                    {['Aspek', 'Invoice', 'Faktur Pajak', 'Kwitansi'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase text-stone-600 border-b border-[#E2DED7]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Tujuan', 'Meminta pembayaran', 'Bukti pemungutan PPN', 'Bukti pembayaran diterima'],
                    ['Waktu Terbit', 'Sebelum/saat pembayaran', 'Saat penyerahan BKP/JKP', 'Setelah pembayaran lunas'],
                    ['Penerbit', 'Siapa saja (penjual)', 'Hanya PKP terdaftar', 'Siapa saja (penerima uang)'],
                    ['Kewajiban Pajak', 'Tidak wajib', 'Wajib pajak (PKP)', 'Tidak wajib'],
                    ['Status Pembayaran', 'Belum lunas', 'Belum tentu', 'Sudah lunas'],
                    ['Format', 'Bebas / template', 'Diatur DJP (e-Faktur)', 'Bebas / sederhana'],
                  ].map(([asp, inv, fak, kwi], i) => (
                    <tr key={i} className="border-b border-[#E2DED7] last:border-0">
                      <td className="px-4 py-3 font-semibold text-stone-700">{asp}</td>
                      <td className="px-4 py-3 text-stone-600">{inv}</td>
                      <td className="px-4 py-3 text-stone-600">{fak}</td>
                      <td className="px-4 py-3 text-stone-600">{kwi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Invoice: Surat Tagihan Sebelum Pembayaran</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Invoice adalah dokumen tagihan yang dikirimkan penjual ke pembeli untuk meminta pembayaran atas barang atau jasa yang telah diberikan. Invoice <strong>bukan bukti bahwa pembayaran sudah dilakukan</strong> — ini adalah permintaan pembayaran.
            </p>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-6">
              <div className="text-xs font-bold uppercase text-stone-400 mb-2">Kapan Menggunakan Invoice?</div>
              <ul className="space-y-1.5 text-sm text-stone-600">
                {['Setelah menyelesaikan proyek atau pengiriman barang', 'Untuk menagih klien secara resmi', 'Sebagai dasar pencatatan piutang usaha', 'Untuk B2B maupun transaksi freelance'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2"><span className="text-amber-500">→</span>{item}</li>
                ))}
              </ul>
            </div>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Faktur Pajak: Dokumen Wajib untuk PKP</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Faktur Pajak adalah dokumen yang wajib dibuat oleh <strong>Pengusaha Kena Pajak (PKP)</strong> setiap kali melakukan penyerahan Barang Kena Pajak (BKP) atau Jasa Kena Pajak (JKP). Dokumen ini menjadi bukti pemungutan PPN.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
              <div className="text-xs font-bold uppercase text-amber-700 mb-2">⚠️ Penting Diketahui</div>
              <p className="text-sm text-stone-600">Sejak tahun 2016, seluruh pembuatan Faktur Pajak wajib dilakukan secara elektronik melalui aplikasi <strong>e-Faktur</strong> dari Direktorat Jenderal Pajak (DJP). Faktur pajak manual tidak lagi diakui.</p>
            </div>
            <p className="text-stone-600 leading-relaxed mb-4">
              Bisnis yang belum dikukuhkan sebagai PKP (omset di bawah Rp4,8 miliar per tahun) tidak diwajibkan membuat Faktur Pajak, tetapi tetap bisa dan perlu membuat invoice biasa.
            </p>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Kwitansi: Bukti Pembayaran yang Sudah Lunas</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Kwitansi adalah dokumen yang diterbitkan oleh penerima uang (penjual) kepada pembayar (pembeli) sebagai <strong>bukti bahwa pembayaran telah diterima</strong>. Artinya, kwitansi terbit <em>setelah</em> transaksi selesai — kebalikan dari invoice.
            </p>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-6">
              <div className="text-xs font-bold uppercase text-stone-400 mb-2">Elemen Kwitansi yang Valid</div>
              <ul className="space-y-1.5 text-sm text-stone-600">
                {['Tanggal penerimaan uang', 'Nama pihak yang membayar', 'Jumlah uang (angka dan huruf)', 'Keterangan pembayaran (untuk apa)', 'Tanda tangan penerima uang', 'Meterai Rp10.000 (untuk nominal > Rp5 juta)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2"><span className="text-stone-400">•</span>{item}</li>
                ))}
              </ul>
            </div>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Alur Dokumen yang Benar dalam Sebuah Transaksi</h2>
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-6">
              {[
                ['1', 'Quotation / Penawaran', 'Sebelum deal'],
                ['2', 'Invoice', 'Tagih pembayaran'],
                ['3', 'Faktur Pajak', '(Jika PKP) Saat serah terima'],
                ['4', 'Kwitansi', 'Setelah bayar lunas'],
              ].map(([num, label, sub], i, arr) => (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold text-sm flex items-center justify-center mb-2">{num}</div>
                    <div className="font-semibold text-stone-800 text-xs">{label}</div>
                    <div className="text-stone-400 text-xs mt-0.5">{sub}</div>
                  </div>
                  {i < arr.length - 1 && <ArrowRight size={16} className="text-stone-300 shrink-0 hidden sm:block" />}
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-stone-900 font-serif mt-10 mb-4">Kesimpulan: Gunakan Dokumen yang Tepat</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Singkatnya: gunakan <strong>invoice untuk menagih</strong>, <strong>faktur pajak untuk kepatuhan pajak</strong> (jika PKP), dan <strong>kwitansi sebagai bukti telah menerima pembayaran</strong>. Ketiganya saling melengkapi dan memiliki peran masing-masing dalam siklus keuangan bisnis Anda.
            </p>

            <div className="mt-10 bg-teal-50 border border-teal-200/70 rounded-2xl p-7 text-center">
              <h3 className="font-bold text-stone-900 mb-2">Buat Invoice Profesional dalam 2 Menit</h3>
              <p className="text-sm text-stone-500 mb-5">Invora membantu Anda membuat semua jenis invoice — reguler, proforma, DP, dan pelunasan — dengan mudah dan gratis.</p>
              <Link to="/register" className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold px-7 py-3 rounded-xl text-sm transition-all">
                Mulai Gratis <ArrowRight size={14} />
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
