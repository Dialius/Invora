import { useParams, Link, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/PublicLayout';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { blogPostsData } from './Blog';
import { useTranslation } from '../context/i18n';

// Memisahkan konten per bahasa agar lebih rapi
const articlesID: Record<string, React.ReactNode> = {
  'cara-membuat-invoice-profesional': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Apa Itu Invoice dan Mengapa Penting?</h2>
      <p>Invoice atau faktur adalah dokumen tagihan resmi yang diterbitkan oleh penjual kepada pembeli. Bagi bisnis kecil, invoice profesional menentukan seberapa cepat Anda dibayar dan kepercayaan klien kepada Anda.</p>
      <h2>Elemen Wajib Invoice</h2>
      <ul>
        <li><strong>Header Jelas:</strong> Logo, nama bisnis, dan kontak.</li>
        <li><strong>Nomor Invoice Unik:</strong> Contoh: INV-2026-001.</li>
        <li><strong>Jatuh Tempo:</strong> Kapan pembayaran terakhir diterima (Net 14 atau Net 30).</li>
        <li><strong>Rincian Pekerjaan:</strong> Deskripsi, Qty, Harga Satuan, dan Subtotal.</li>
        <li><strong>Info Rekening:</strong> Bank, nama pemilik, dan nomor rekening.</li>
      </ul>
      <p>Dengan Invora, Anda tidak perlu pusing memikirkan elemen ini karena semuanya sudah diformat secara otomatis dengan standar internasional.</p>
    </div>
  ),
  'perbedaan-invoice-proforma-dan-invoice-reguler': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Invoice Reguler: Tagihan Resmi</h2>
      <p>Diterbitkan <em>setelah</em> pekerjaan selesai. Memiliki kekuatan hukum sebagai bukti transaksi dan kewajiban pembayaran yang harus dipenuhi oleh klien.</p>
      <h2>Invoice Proforma: Penawaran Tertulis</h2>
      <p>Diterbitkan <em>sebelum</em> transaksi terjadi, sebagai estimasi biaya kepada klien. Tidak mengikat secara hukum dan sering digunakan untuk proses approval internal klien.</p>
      <h2>Kapan Menggunakan Keduanya?</h2>
      <p>Gunakan Proforma untuk mendapatkan persetujuan anggaran di awal proyek besar. Setelah proyek selesai, ubah Proforma tersebut menjadi Invoice Reguler untuk menagih pembayaran.</p>
    </div>
  ),
  'tips-agar-invoice-dibayar-tepat-waktu': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Mengapa Sering Terlambat?</h2>
      <p>Keterlambatan pembayaran adalah keluhan nomor satu dari freelancer. Berikut adalah tips agar tagihan Anda lebih diprioritaskan oleh klien:</p>
      <h3>1. Buat Syarat Pembayaran yang Spesifik</h3>
      <p>Daripada menulis "Pembayaran dalam waktu dekat", cantumkan tanggal jatuh tempo eksplisit: "Jatuh tempo: 15 Juli 2026".</p>
      <h3>2. Terapkan Down Payment (DP)</h3>
      <p>Untuk proyek besar, selalu minta DP 30-50% di awal. Ini melindungi Anda dari risiko tidak dibayar.</p>
      <h3>3. Kirim via Public Link</h3>
      <p>Gunakan fitur Public Link Invora. Klien bisa langsung membuka tagihan di browser dan meneruskannya ke divisi keuangan tanpa harus men-download PDF.</p>
    </div>
  ),
  'panduan-faktur-pajak-dan-npwp-untuk-umkm': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Invoice vs. Faktur Pajak</h2>
      <p>Invoice biasa adalah dokumen tagihan komersial. Faktur pajak (tax invoice) diterbitkan oleh Pengusaha Kena Pajak (PKP) sebagai bukti pemungutan Pajak Pertambahan Nilai (PPN).</p>
      <h2>PPN 11%</h2>
      <p>Sebagai PKP di Indonesia, Anda wajib memungut PPN 11% dari setiap transaksi. Invora menyediakan fitur baris pajak khusus yang otomatis menghitung persentase pajak dari subtotal.</p>
      <h2>NPWP pada Invoice</h2>
      <p>Mencantumkan NPWP di invoice komersial sangat disarankan untuk bertransaksi dengan klien korporat. Anda bisa menambahkannya di deskripsi profil perusahaan Anda di pengaturan Invora.</p>
    </div>
  ),
  'tutorial-membuat-tanda-tangan-digital-di-invora': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Pentingnya Tanda Tangan</h2>
      <p>Invoice yang dibubuhi tanda tangan memberikan kesan autentik dan sah. Invora mempermudah hal ini tanpa mengharuskan Anda mencetak, menandatangani, lalu men-scan dokumen kembali.</p>
      <h2>Langkah-langkah di Invora</h2>
      <ol>
        <li>Buka formulir pembuatan Invoice.</li>
        <li>Scroll ke bagian paling bawah, temukan kotak <strong>Tanda Tangan</strong>.</li>
        <li>Gunakan mouse atau jari Anda (di layar sentuh) untuk menggambar tanda tangan langsung di kanvas yang tersedia.</li>
        <li>Klik tombol 'Bersihkan' jika Anda ingin mengulangnya.</li>
        <li>Anda juga bisa mengetik nama Anda di kolom 'Nama Penanda Tangan'.</li>
      </ol>
      <p>Saat Anda mengunduh PDF, tanda tangan ini akan ditempatkan secara proporsional di sudut kanan bawah dokumen dengan latar belakang transparan.</p>
    </div>
  ),
  'cara-mengelola-database-klien-dan-perusahaan': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Konsep Profil di Invora</h2>
      <p>Invora memisahkan profil Anda (Billed From) dengan profil klien (Billed To). Ini memungkinkan Anda mengelola banyak bisnis dan menagih puluhan klien berbeda tanpa mengetik ulang data.</p>
      <h2>Cara Membuat Profil Perusahaan</h2>
      <p>Klik tombol dropdown <em>Billed From</em> dan pilih <strong>"Manage / Tambah Baru"</strong>. Masukkan nama bisnis, alamat, email, dan unggah logo perusahaan Anda. Profil ini akan tersimpan aman di database cloud.</p>
      <h2>Mencegah Kesalahan Data</h2>
      <p>Sistem Invora memiliki fitur "Safe Delete". Anda tidak akan bisa menghapus profil yang sedang terkait dengan invoice yang sudah terbit, menjaga arsip keuangan Anda tetap utuh selamanya.</p>
    </div>
  ),
  'strategi-diskon-dan-pajak-dalam-invoicing': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Memberikan Diskon kepada Klien</h2>
      <p>Di Invora, Anda bisa memberikan diskon per-item. Di setiap baris item, klik kolom Diskon. Anda bisa memilih memberikan diskon dalam bentuk persentase (misal 10%) atau memotong nominal harga secara langsung.</p>
      <h2>Menambahkan Pajak</h2>
      <p>Untuk menambahkan pajak secara global (seperti PPN atau Tax), gunakan tombol <strong>"Tambah Pajak"</strong> di atas bagian Total. Sistem akan menghitung pajak secara matematis dari Subtotal (setelah diskon) dan menampilkannya dengan rapi di tagihan akhir.</p>
    </div>
  ),
  'berbagi-invoice-melalui-public-link': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Selamat Tinggal Email PDF Berukuran Besar</h2>
      <p>Invora memperkenalkan fitur berbagi via Public Link. Setelah menyimpan invoice, Anda akan mendapatkan URL unik (misal: invora.online/invoices/xyz123/view).</p>
      <h2>Keamanan Link</h2>
      <p>Link ini dihasilkan dengan kombinasi karakter acak kriptografis, sehingga mustahil ditebak orang lain. Hanya klien yang menerima link dari Anda yang bisa membuka invoice tersebut.</p>
      <h2>Tampilan Klien</h2>
      <p>Saat klien membuka link, mereka akan melihat antarmuka yang bersih dan elegan, dilengkapi tombol untuk mengunduh PDF secara instan jika mereka membutuhkannya untuk keperluan arsip lokal perusahaan.</p>
    </div>
  )
};

const articlesEN: Record<string, React.ReactNode> = {
  'cara-membuat-invoice-profesional': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>What is an Invoice and Why is it Important?</h2>
      <p>An invoice is an official billing document issued by a seller to a buyer. For small businesses, a professional invoice determines how fast you get paid and builds client trust.</p>
      <h2>Mandatory Invoice Elements</h2>
      <ul>
        <li><strong>Clear Header:</strong> Logo, business name, and contact details.</li>
        <li><strong>Unique Number:</strong> Example: INV-2026-001.</li>
        <li><strong>Due Date:</strong> When the payment is expected (e.g., Net 14 or Net 30).</li>
        <li><strong>Line Items:</strong> Description, Qty, Unit Price, and Subtotal.</li>
        <li><strong>Banking Info:</strong> Bank name, account holder, and account number.</li>
      </ul>
      <p>With Invora, you don't need to worry about formatting these elements manually as everything is standardized automatically.</p>
    </div>
  ),
  'perbedaan-invoice-proforma-dan-invoice-reguler': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Regular Invoice: The Official Bill</h2>
      <p>Issued <em>after</em> work is completed. It has legal binding power as proof of a transaction and an obligation to pay.</p>
      <h2>Proforma Invoice: The Written Offer</h2>
      <p>Issued <em>before</em> the transaction occurs, as a cost estimate for the client. It is not legally binding and is often used for internal client approval processes.</p>
      <h2>When to use both?</h2>
      <p>Use Proforma to secure budget approval at the start of a project. Once finished, convert that Proforma into a Regular Invoice to collect payment.</p>
    </div>
  ),
  'tips-agar-invoice-dibayar-tepat-waktu': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Why the Delay?</h2>
      <p>Late payments are the number one complaint of freelancers. Here are tips to ensure your bills are prioritized:</p>
      <h3>1. Make Payment Terms Specific</h3>
      <p>Instead of writing "Payment due soon", state the exact date: "Due Date: July 15, 2026".</p>
      <h3>2. Apply Down Payments (DP)</h3>
      <p>For large projects, always request a 30-50% upfront payment to mitigate risk.</p>
      <h3>3. Send via Public Link</h3>
      <p>Use Invora's Public Link feature. Clients can instantly open the bill in their browser and forward it to finance without downloading heavy PDFs.</p>
    </div>
  ),
  'panduan-faktur-pajak-dan-npwp-untuk-umkm': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Commercial Invoice vs. Tax Invoice</h2>
      <p>A regular invoice is a commercial document. A tax invoice is issued by registered tax entrepreneurs to collect VAT.</p>
      <h2>Calculating Taxes</h2>
      <p>As a registered business, you may need to collect VAT. Invora provides dedicated tax rows that automatically calculate percentages from your subtotal.</p>
      <h2>Tax IDs on Invoices</h2>
      <p>Including your Tax ID (NPWP) on commercial invoices is highly recommended when dealing with corporate clients. You can add it seamlessly in Invora's company profile settings.</p>
    </div>
  ),
  'tutorial-membuat-tanda-tangan-digital-di-invora': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>The Importance of Signatures</h2>
      <p>An invoice stamped with a signature gives an authentic and legal impression. Invora makes this easy without requiring you to print, sign, and scan documents.</p>
      <h2>Steps in Invora</h2>
      <ol>
        <li>Open the Invoice Builder form.</li>
        <li>Scroll to the bottom to find the <strong>Signature</strong> box.</li>
        <li>Use your mouse or finger (on touch screens) to draw your signature directly on the canvas.</li>
        <li>Click 'Clear' if you want to retry.</li>
        <li>You can also type your name in the 'Signatory Name' field.</li>
      </ol>
      <p>When you download the PDF, this signature will be placed proportionally at the bottom right corner with a transparent background.</p>
    </div>
  ),
  'cara-mengelola-database-klien-dan-perusahaan': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Profile Concepts in Invora</h2>
      <p>Invora separates your profile (Billed From) and your client's profile (Billed To). This allows you to manage multiple businesses and bill dozens of clients without retyping data.</p>
      <h2>Creating a Company Profile</h2>
      <p>Click the <em>Billed From</em> dropdown and select <strong>"Manage / Add New"</strong>. Enter your business name, address, email, and upload your logo. This is stored securely in the cloud.</p>
      <h2>Preventing Data Loss</h2>
      <p>Invora's system has a "Safe Delete" feature. You cannot accidentally delete a profile that is attached to a published invoice, keeping your financial archives intact forever.</p>
    </div>
  ),
  'strategi-diskon-dan-pajak-dalam-invoicing': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Giving Discounts to Clients</h2>
      <p>In Invora, you can apply discounts per-item. On each item row, click the Discount column. You can choose to apply a percentage-based discount (e.g., 10%) or a flat amount reduction.</p>
      <h2>Adding Global Taxes</h2>
      <p>To add a global tax (like VAT), use the <strong>"Add Tax"</strong> button above the Total section. The system will mathematically calculate the tax from the Subtotal (post-discount) and display it neatly on the final bill.</p>
    </div>
  ),
  'berbagi-invoice-melalui-public-link': (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600">
      <h2>Goodbye Bulky PDF Emails</h2>
      <p>Invora introduces the Public Link sharing feature. After saving an invoice, you get a unique URL (e.g., invora.online/invoices/xyz123/view).</p>
      <h2>Link Security</h2>
      <p>These links are generated using cryptographic random character combinations, making them impossible to guess. Only clients who receive the link from you can view the invoice.</p>
      <h2>Client Experience</h2>
      <p>When clients open the link, they see a clean, elegant interface with a button to instantly download the PDF if they need it for local company archives.</p>
    </div>
  )
};

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useTranslation();
  
  const posts = blogPostsData[lang];
  const post = posts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const content = lang === 'ID' ? articlesID[slug!] : articlesEN[slug!];
  
  const ui = {
    back: lang === 'ID' ? 'Kembali ke Blog' : 'Back to Blog',
    read: lang === 'ID' ? 'baca' : 'read',
    ctaTitle: lang === 'ID' ? 'Siap Membuat Invoice Profesional?' : 'Ready to Create Professional Invoices?',
    ctaDesc: lang === 'ID' ? 'Buat invoice pertama Anda gratis di Invora — tanpa biaya langganan, tanpa batas.' : 'Create your first invoice for free on Invora — no subscription fees, no limits.',
    ctaBtn: lang === 'ID' ? 'Mulai Gratis Sekarang' : 'Start for Free Now'
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F0EDE8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-teal-700 transition-colors mb-8">
            <ArrowLeft size={15} />
            {ui.back}
          </Link>

          {/* Article Header */}
          <div className="bg-white border border-[#E2DED7] rounded-2xl overflow-hidden mb-8">
            <div className="h-64 sm:h-96 w-full border-b border-[#E2DED7]">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
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
                  {post.readTime}
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
          <div className="bg-white border border-[#E2DED7] rounded-2xl p-8 mb-8 shadow-sm">
            {content}
          </div>

          {/* CTA */}
          <div className="bg-teal-700 rounded-2xl p-8 text-center text-white shadow-md">
            <h2 className="text-xl font-bold font-serif mb-2">{ui.ctaTitle}</h2>
            <p className="text-teal-100 text-sm mb-6">{ui.ctaDesc}</p>
            <Link
              to="/register"
              className="inline-block bg-white text-teal-700 font-bold px-6 py-3 rounded-xl text-sm hover:bg-teal-50 transition-colors"
            >
              {ui.ctaBtn}
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
