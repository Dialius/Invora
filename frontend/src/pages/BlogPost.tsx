import { useParams, Link, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/PublicLayout';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { blogPosts } from './Blog';

const articles: Record<string, React.ReactNode> = {
  'cara-membuat-invoice-profesional': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600 prose-p:leading-relaxed prose-li:text-stone-600">
      <h2>Apa Itu Invoice dan Mengapa Formatnya Penting?</h2>
      <p>Invoice atau faktur adalah dokumen tagihan resmi yang diterbitkan oleh penjual kepada pembeli sebagai bukti transaksi yang sah. Bagi freelancer, konsultan, dan pemilik bisnis kecil di Indonesia, invoice yang profesional bukan sekadar formalitas — ini adalah alat komunikasi bisnis yang menentukan seberapa cepat Anda dibayar dan seberapa besar kepercayaan klien kepada Anda.</p>
      <p>Sebuah studi menunjukkan bahwa invoice dengan format yang jelas dan profesional dibayar rata-rata 30% lebih cepat dibandingkan invoice yang dibuat asal-asalan menggunakan dokumen Word atau Excel sederhana. Ini karena klien melihat profesionalisme Anda melalui kualitas dokumentasi yang Anda kirimkan.</p>

      <h2>Elemen Wajib dalam Sebuah Invoice Profesional</h2>
      <p>Berikut adalah komponen yang harus ada di setiap invoice yang Anda buat:</p>
      <h3>1. Header yang Jelas</h3>
      <p>Header invoice harus mencakup nama bisnis atau nama Anda, logo perusahaan (jika ada), alamat lengkap, nomor telepon, dan alamat email. Informasi ini membantu klien mengidentifikasi dari siapa invoice tersebut berasal dan bagaimana cara menghubungi Anda jika ada pertanyaan.</p>
      <h3>2. Nomor Invoice yang Unik</h3>
      <p>Setiap invoice harus memiliki nomor yang unik dan berurutan, misalnya INV-2026-001, INV-2026-002, dan seterusnya. Nomor invoice memudahkan kedua pihak untuk melacak status pembayaran dan menjadi referensi dalam komunikasi selanjutnya.</p>
      <h3>3. Tanggal Invoice dan Tanggal Jatuh Tempo</h3>
      <p>Cantumkan tanggal pembuatan invoice dan batas waktu pembayaran (due date) yang jelas. Jangka waktu yang umum digunakan adalah Net 14 (14 hari) atau Net 30 (30 hari). Semakin jelas jatuh temponya, semakin kecil kemungkinan klien terlambat membayar karena "lupa".</p>
      <h3>4. Data Lengkap Klien (Bill To)</h3>
      <p>Pastikan Anda mencantumkan nama perusahaan klien, nama PIC (Person in Charge), alamat tagihan, dan informasi kontak. Data ini penting untuk keperluan arsip akuntansi klien Anda.</p>
      <h3>5. Rincian Pekerjaan/Produk (Line Items)</h3>
      <p>Setiap item pekerjaan atau produk harus dirinci dengan jelas, mencakup deskripsi, jumlah (quantity), satuan, harga satuan, dan total per item. Hindari deskripsi yang terlalu umum seperti "Jasa Desain" — lebih baik tulis "Desain Ulang Antarmuka Website (UI/UX) — 3 Halaman Utama".</p>
      <h3>6. Perhitungan Subtotal, Pajak, dan Total</h3>
      <p>Tampilkan subtotal sebelum pajak, besaran PPN (jika dikenakan), potongan diskon (jika ada), biaya tambahan seperti ongkos kirim, dan total akhir yang harus dibayar. Transparansi dalam perhitungan ini membangun kepercayaan klien.</p>
      <h3>7. Informasi Rekening Bank</h3>
      <p>Sertakan detail rekening bank Anda dengan jelas: nama bank, nama pemilik rekening, dan nomor rekening. Jika Anda menerima transfer dari klien luar negeri, cantumkan juga kode SWIFT/BIC bank Anda.</p>
      <h3>8. Catatan dan Syarat Pembayaran</h3>
      <p>Gunakan kolom catatan (notes) untuk menyampaikan pesan kepersonal kepada klien, misalnya ucapan terima kasih. Di bagian syarat dan ketentuan (terms & conditions), cantumkan kebijakan keterlambatan pembayaran jika ada.</p>

      <h2>Format Invoice Digital vs. Fisik</h2>
      <p>Di era digital, pengiriman invoice dalam format PDF melalui email adalah standar yang paling umum dan efisien. Format PDF menjamin tampilan invoice Anda identik di semua perangkat klien, tidak bisa diedit sembarangan, dan mudah dicetak jika diperlukan.</p>
      <p>Invora memungkinkan Anda membuat invoice digital yang bisa langsung dibagikan melalui tautan publik atau diunduh dalam format PDF berkualitas tinggi, lengkap dengan tanda tangan digital Anda — tanpa perlu software desain grafis sama sekali.</p>

      <h2>Kesalahan Umum dalam Pembuatan Invoice</h2>
      <ul>
        <li><strong>Lupa mencantumkan nomor invoice</strong> — menyulitkan pelacakan pembayaran</li>
        <li><strong>Tidak mencantumkan jatuh tempo yang jelas</strong> — memberikan celah bagi klien untuk menunda</li>
        <li><strong>Deskripsi pekerjaan terlalu singkat</strong> — berpotensi menimbulkan perdebatan</li>
        <li><strong>Kesalahan perhitungan</strong> — merusak kredibilitas profesional Anda</li>
        <li><strong>Tidak menyimpan salinan invoice</strong> — menyulitkan audit keuangan di kemudian hari</li>
      </ul>

      <h2>Kesimpulan</h2>
      <p>Invoice yang profesional adalah investasi dalam reputasi bisnis Anda. Dengan menggunakan platform invoicing yang tepat seperti Invora, Anda bisa membuat invoice yang lengkap, rapi, dan profesional hanya dalam beberapa menit — sehingga Anda bisa fokus pada pekerjaan utama dan yakin bahwa proses penagihan berjalan lancar.</p>
    </div>
  ),
  'perbedaan-invoice-proforma-dan-invoice-reguler': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600 prose-p:leading-relaxed prose-li:text-stone-600">
      <h2>Pengertian Dasar</h2>
      <p>Dalam dunia bisnis, ada berbagai jenis dokumen tagihan yang digunakan tergantung pada tahap transaksi dan tujuan penggunaannya. Dua yang paling sering membingungkan adalah <strong>Invoice Reguler</strong> (atau Invoice Standar) dan <strong>Invoice Proforma</strong>.</p>

      <h2>Invoice Reguler: Tagihan Resmi yang Mengikat</h2>
      <p>Invoice reguler adalah dokumen tagihan resmi yang diterbitkan <em>setelah</em> pekerjaan selesai dilakukan atau produk telah diserahkan kepada pembeli. Dokumen ini memiliki kekuatan hukum sebagai bukti transaksi dan kewajiban pembayaran yang harus dipenuhi oleh klien.</p>
      <p>Karakteristik invoice reguler:</p>
      <ul>
        <li>Diterbitkan setelah barang/jasa diterima oleh pembeli</li>
        <li>Merupakan kewajiban pembayaran yang sah secara hukum</li>
        <li>Digunakan sebagai dokumen akuntansi untuk pencatatan pendapatan</li>
        <li>Dapat digunakan sebagai bukti dalam sengketa bisnis</li>
        <li>Menjadi dasar pencatatan pajak (faktur pajak)</li>
      </ul>

      <h2>Invoice Proforma: Estimasi atau Penawaran Tertulis</h2>
      <p>Invoice Proforma (dari bahasa Latin "pro forma" yang berarti "sebagai formalitas") adalah dokumen yang menyerupai invoice tetapi <em>bukan</em> tagihan yang mengikat. Proforma invoice diterbitkan <em>sebelum</em> transaksi terjadi, sebagai estimasi biaya atau konfirmasi detail pesanan kepada klien.</p>
      <p>Karakteristik invoice proforma:</p>
      <ul>
        <li>Diterbitkan sebelum pekerjaan dimulai atau barang dikirim</li>
        <li>Bukan dokumen tagihan yang mengikat secara hukum</li>
        <li>Digunakan sebagai penawaran harga resmi (quotation formal)</li>
        <li>Sering digunakan dalam transaksi ekspor-impor untuk keperluan bea cukai</li>
        <li>Membantu klien mendapatkan persetujuan anggaran internal</li>
      </ul>

      <h2>Kapan Menggunakan Invoice Proforma?</h2>
      <p>Gunakan invoice proforma dalam situasi berikut:</p>
      <ul>
        <li><strong>Sebelum memulai proyek besar</strong> — untuk mendapatkan persetujuan klien atas estimasi biaya</li>
        <li><strong>Transaksi ekspor-impor</strong> — sebagai dokumen untuk keperluan bea cukai dan perizinan</li>
        <li><strong>Ketika klien membutuhkan referensi anggaran</strong> — untuk proses approval internal perusahaan mereka</li>
        <li><strong>Negosiasi harga</strong> — sebagai dasar diskusi sebelum harga final disepakati</li>
      </ul>

      <h2>Kapan Menggunakan Invoice Reguler?</h2>
      <p>Gunakan invoice reguler ketika:</p>
      <ul>
        <li>Pekerjaan atau pengiriman barang telah selesai dilakukan</li>
        <li>Anda membutuhkan dokumen tagihan resmi untuk pembayaran</li>
        <li>Diperlukan dokumen untuk pencatatan akuntansi dan pajak</li>
      </ul>

      <h2>Tabel Perbandingan Cepat</h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-stone-100">
              <th className="border border-stone-200 px-4 py-2 text-left">Aspek</th>
              <th className="border border-stone-200 px-4 py-2 text-left">Invoice Proforma</th>
              <th className="border border-stone-200 px-4 py-2 text-left">Invoice Reguler</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-stone-200 px-4 py-2">Waktu Penerbitan</td><td className="border border-stone-200 px-4 py-2">Sebelum transaksi</td><td className="border border-stone-200 px-4 py-2">Setelah transaksi</td></tr>
            <tr><td className="border border-stone-200 px-4 py-2">Kekuatan Hukum</td><td className="border border-stone-200 px-4 py-2">Tidak mengikat</td><td className="border border-stone-200 px-4 py-2">Mengikat</td></tr>
            <tr><td className="border border-stone-200 px-4 py-2">Tujuan</td><td className="border border-stone-200 px-4 py-2">Estimasi / Penawaran</td><td className="border border-stone-200 px-4 py-2">Tagihan resmi</td></tr>
            <tr><td className="border border-stone-200 px-4 py-2">Dokumen Akuntansi</td><td className="border border-stone-200 px-4 py-2">Tidak</td><td className="border border-stone-200 px-4 py-2">Ya</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Kesimpulan</h2>
      <p>Memahami perbedaan antara invoice proforma dan invoice reguler akan membantu Anda berkomunikasi lebih profesional dengan klien dan mitra bisnis. Invora mendukung pembuatan kedua jenis invoice ini, lengkap dengan label yang sesuai pada dokumen PDF yang dihasilkan.</p>
    </div>
  ),
  'tips-agar-invoice-dibayar-tepat-waktu': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600 prose-p:leading-relaxed prose-li:text-stone-600">
      <h2>Mengapa Invoice Sering Terlambat Dibayar?</h2>
      <p>Keterlambatan pembayaran adalah keluhan nomor satu yang disampaikan oleh freelancer dan pemilik bisnis kecil di Indonesia. Berdasarkan berbagai survei bisnis, rata-rata 60% invoice dari usaha kecil tidak dibayar tepat waktu. Penyebabnya beragam: klien "lupa", proses persetujuan internal yang panjang, atau memang ada masalah arus kas dari pihak klien.</p>
      <p>Kabar baiknya, ada sejumlah praktik terbaik dalam invoicing yang terbukti dapat mempercepat pembayaran secara signifikan.</p>

      <h2>7 Tips Ampuh Mempercepat Pembayaran Invoice</h2>
      <h3>1. Kirim Invoice Segera Setelah Pekerjaan Selesai</h3>
      <p>Jangan tunda pengiriman invoice. Setiap hari yang berlalu sejak pekerjaan selesai adalah hari yang memperlemah "rasa urgensi" klien untuk membayar. Idealnya, kirim invoice di hari yang sama atau maksimal 24 jam setelah pekerjaan diserahkan.</p>

      <h3>2. Buat Syarat Pembayaran yang Sangat Jelas</h3>
      <p>Hindari istilah ambigu. Daripada menulis "Pembayaran dalam waktu dekat", tulis dengan spesifik: "Pembayaran jatuh tempo pada 15 Juli 2026 (Net 14)". Cantumkan tanggal jatuh tempo yang eksplisit, bukan hanya durasi hari.</p>

      <h3>3. Cantumkan Konsekuensi Keterlambatan</h3>
      <p>Di bagian syarat dan ketentuan invoice, tambahkan klausa seperti: "Keterlambatan pembayaran lebih dari 14 hari akan dikenakan denda sebesar 2% per bulan." Meskipun jarang diterapkan, klausa ini menciptakan insentif psikologis bagi klien untuk tidak menunda.</p>

      <h3>4. Tawarkan Kemudahan Pembayaran</h3>
      <p>Semakin mudah klien membayar, semakin cepat mereka akan melakukannya. Cantumkan semua metode pembayaran yang Anda terima: transfer bank, dompet digital (GoPay, OVO, Dana), atau bahkan kartu kredit. Berikan informasi rekening yang lengkap dan akurat.</p>

      <h3>5. Gunakan Sistem Down Payment (DP)</h3>
      <p>Untuk proyek besar atau klien baru, selalu minta uang muka (DP) sebelum pekerjaan dimulai. Standar yang umum adalah 30-50% di awal dan sisanya setelah pekerjaan selesai. Ini melindungi Anda dari risiko tidak dibayar dan memastikan klien berkomitmen secara finansial sejak awal.</p>

      <h3>6. Tindak Lanjut secara Proaktif</h3>
      <p>Jangan ragu untuk mengirim pengingat pembayaran. Kirim pengingat ramah 3 hari sebelum jatuh tempo, kemudian di hari jatuh tempo, dan 3 hari setelahnya jika belum dibayar. Komunikasi yang proaktif dan profesional jauh lebih efektif daripada diam dan berharap.</p>

      <h3>7. Bangun Hubungan Baik dengan Departemen Keuangan Klien</h3>
      <p>Jika klien Anda adalah perusahaan, cari tahu siapa yang bertanggung jawab atas pembayaran (tim finance/accounting), bukan hanya PIC proyek. Pastikan invoice Anda sampai ke tangan yang tepat, sesuai format yang mereka butuhkan (nomor PO, kode vendor, dll).</p>

      <h2>Peran Invoice Digital dalam Mempercepat Pembayaran</h2>
      <p>Invoice digital yang bisa dibuka melalui tautan (link) memiliki keunggulan signifikan: klien bisa melihat dan meneruskannya kepada tim finance secara instan, tanpa perlu mencetak dokumen. Platform seperti Invora memungkinkan Anda membagikan tautan invoice publik yang bisa diakses kapan saja dan dari mana saja.</p>

      <h2>Kesimpulan</h2>
      <p>Mempercepat pembayaran invoice bukan tentang mengejar-ngejar klien — ini tentang membangun sistem dan proses yang jelas sejak awal. Dengan menerapkan tips di atas secara konsisten, Anda akan melihat perbaikan signifikan dalam arus kas bisnis Anda.</p>
    </div>
  ),
  'panduan-faktur-pajak-dan-npwp-untuk-umkm': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600 prose-p:leading-relaxed prose-li:text-stone-600">
      <h2>Dasar Hukum Perpajakan dalam Transaksi Bisnis Indonesia</h2>
      <p>Sebagai pelaku usaha di Indonesia, setiap transaksi penjualan barang atau jasa berpotensi memiliki konsekuensi perpajakan yang perlu Anda pahami. Dua dokumen yang sering membingungkan adalah <strong>invoice biasa</strong> dan <strong>faktur pajak</strong>. Keduanya berbeda secara fundamental dalam hal fungsi dan kewajiban hukum.</p>

      <h2>Invoice vs. Faktur Pajak: Apa Bedanya?</h2>
      <p>Invoice biasa adalah dokumen tagihan komersial antara penjual dan pembeli. Faktur pajak (tax invoice) adalah dokumen resmi yang diterbitkan oleh Pengusaha Kena Pajak (PKP) sebagai bukti pemungutan Pajak Pertambahan Nilai (PPN) atas transaksi yang terjadi.</p>
      <p>Tidak semua pelaku usaha wajib menerbitkan faktur pajak. Kewajiban ini hanya berlaku bagi mereka yang telah dikukuhkan sebagai PKP oleh Direktorat Jenderal Pajak.</p>

      <h2>Kapan Anda Wajib Menjadi PKP?</h2>
      <p>Berdasarkan peraturan perpajakan Indonesia yang berlaku, sebuah usaha wajib mendaftarkan diri sebagai PKP jika omzet (peredaran bruto) usahanya telah melebihi Rp4,8 miliar dalam satu tahun pajak. Jika omzet Anda belum mencapai batas ini, Anda belum diwajibkan menjadi PKP dan tidak perlu menerbitkan faktur pajak.</p>

      <h2>PPN 11%: Apa yang Perlu Anda Ketahui</h2>
      <p>Sejak 1 April 2022, tarif PPN di Indonesia resmi naik dari 10% menjadi 11% berdasarkan UU Harmonisasi Peraturan Perpajakan (UU HPP). Sebagai PKP, Anda wajib memungut PPN 11% dari setiap transaksi penjualan barang kena pajak (BKP) atau jasa kena pajak (JKP) kepada pembeli.</p>
      <p>Cara menghitung PPN: jika harga jual sebelum pajak adalah Rp10.000.000, maka PPN yang dipungut adalah Rp10.000.000 × 11% = Rp1.100.000, sehingga total yang dibayarkan klien adalah Rp11.100.000.</p>

      <h2>NPWP pada Invoice: Kapan Diperlukan?</h2>
      <p>Pencantuman NPWP (Nomor Pokok Wajib Pajak) pada invoice adalah praktik baik yang direkomendasikan, meskipun tidak selalu diwajibkan secara hukum untuk semua jenis transaksi. NPWP biasanya diperlukan dalam situasi berikut:</p>
      <ul>
        <li>Transaksi dengan perusahaan besar yang membutuhkan NPWP vendor untuk keperluan akuntansi dan pelaporan pajak mereka</li>
        <li>Faktur pajak standar (e-Faktur) yang diterbitkan oleh PKP</li>
        <li>Transaksi pemerintah dan BUMN</li>
        <li>Pengajuan reimbursement atau klaim asuransi tertentu</li>
      </ul>

      <h2>e-Faktur: Sistem Faktur Pajak Digital Indonesia</h2>
      <p>Sejak tahun 2015, Direktorat Jenderal Pajak mewajibkan PKP untuk menggunakan sistem e-Faktur (faktur pajak elektronik) dalam penerbitan faktur pajak. e-Faktur adalah aplikasi resmi dari DJP yang memiliki kode QR unik sebagai tanda keabsahan.</p>
      <p>Penting untuk dipahami bahwa <strong>invoice dari Invora bukan e-Faktur</strong>. Invoice Invora adalah dokumen tagihan komersial. Jika Anda adalah PKP dan wajib menerbitkan e-Faktur, Anda harus melakukannya melalui sistem e-Faktur DJP secara terpisah, namun Anda tetap bisa menggunakan Invora sebagai invoice tagihan kepada klien.</p>

      <h2>Tips Praktis untuk UMKM</h2>
      <ul>
        <li>Selalu cantumkan NPWP Anda di invoice meskipun belum PKP — ini menunjukkan profesionalisme</li>
        <li>Jika klien Anda adalah perusahaan, tanyakan apakah mereka membutuhkan faktur pajak sebelum proyek dimulai</li>
        <li>Konsultasikan kewajiban pajak bisnis Anda dengan konsultan pajak atau Kantor Pelayanan Pajak (KPP) terdekat</li>
        <li>Simpan semua invoice dan dokumen perpajakan dengan rapi minimal selama 5 tahun</li>
      </ul>

      <h2>Kesimpulan</h2>
      <p>Memahami aspek perpajakan dalam invoicing adalah bagian penting dari mengelola bisnis yang sehat dan patuh hukum di Indonesia. Jika Anda belum PKP, invoice komersial dari Invora sudah cukup untuk keperluan tagihan sehari-hari. Jika sudah PKP, gunakan Invora untuk invoice komersial dan e-Faktur DJP untuk kewajiban perpajakan Anda.</p>
    </div>
  ),
};

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const content = slug ? articles[slug] : null;

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F0EDE8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-teal-700 transition-colors mb-8">
            <ArrowLeft size={15} />
            Kembali ke Blog
          </Link>

          {/* Article Header */}
          <div className="bg-white border border-[#E2DED7] rounded-2xl overflow-hidden mb-8">
            <div className="bg-gradient-to-br from-teal-50 to-stone-100 h-48 flex items-center justify-center border-b border-[#E2DED7]">
              <span className="text-8xl">{post.coverEmoji}</span>
            </div>
            <div className="p-8 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-700">
                  <Tag size={11} />
                  {post.category}
                </div>
                <span className="text-stone-300">·</span>
                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                  <Clock size={11} />
                  {post.readTime} baca
                </div>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-stone-400">{post.date}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif leading-snug">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Article Body */}
          <div className="bg-white border border-[#E2DED7] rounded-2xl p-8 mb-8">
            {content}
          </div>

          {/* CTA */}
          <div className="bg-teal-700 rounded-2xl p-8 text-center text-white">
            <h2 className="text-xl font-bold font-serif mb-2">Siap Membuat Invoice Profesional?</h2>
            <p className="text-teal-100 text-sm mb-6">Buat invoice pertama Anda gratis di Invora — tanpa biaya langganan, tanpa batas.</p>
            <Link
              to="/register"
              className="inline-block bg-white text-teal-700 font-bold px-6 py-3 rounded-xl text-sm hover:bg-teal-50 transition-colors"
            >
              Mulai Gratis Sekarang
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
