import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────
export type Lang = 'EN' | 'ID';

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

// ─── Translations ────────────────────────────────────────────────────────────
const translations: Record<Lang, Record<string, string>> = {
  EN: {
    // Nav
    'nav.home':     'Home',
    'nav.features': 'Features',
    'nav.pricing':  'Pricing',
    'nav.faq':      'FAQ',
    'nav.blog':     'Blog',
    'nav.contact':  'Contact',
    'nav.login':    'Login',
    'nav.register': 'Register',
    'nav.dashboard':'Dashboard',

    // Footer
    'footer.rights': 'All rights reserved. Designed for modern billing.',

    // Landing — Hero
    'hero.badge':    'New Feature: Signature Canvas Drawing',
    'hero.title':    'Invoicing Platform Designed for',
    'hero.title.accent': 'Modern Businesses',
    'hero.subtitle': 'Create professional bills, manage company profiles, sign dynamically, and export pixel-perfect invoices in seconds. All stored securely on the cloud.',
    'hero.cta.primary':   'Get Started Free',
    'hero.cta.secondary': 'Try Interactive Demo',

    // Landing — Demo
    'demo.title':    'Interactive Invoice Builder Demo',
    'demo.subtitle': 'Test out our design system right now. Toggle the settings in the control panel to see the invoice layout adjust live.',
    'demo.panel.title':      'Live Customizer',
    'demo.client.label':     'Client Name',
    'demo.currency.label':   'Currency',
    'demo.discount.label':   'Discount',
    'demo.lang.label':       'Template Language',
    'demo.type.label':       'Invoice Type',
    'demo.type.reguler':      'Regular',
    'demo.type.proforma':     'Proforma',
    'demo.type.down_payment': 'Down Payment',
    'demo.type.pelunasan':    'Settlement',
    'demo.info':             'Want to upload custom company logos, draw digital signatures, and export PDF documents? Register a free account to unlock all features!',

    // Invoice labels (demo)
    'inv.title':    'INVOICE',
    'inv.from':     'Billed From',
    'inv.to':       'Billed To',
    'inv.date':     'Invoice Date',
    'inv.due':      'Due Date',
    'inv.desc':     'Description',
    'inv.qty':      'Qty',
    'inv.price':    'Unit Price',
    'inv.subtotal': 'Subtotal',
    'inv.discount': 'Discount',
    'inv.tax':      'Tax',
    'inv.total':    'Total Amount',
    'inv.thanks':   'Thank you for your business!',

    // Landing — Highlights
    'highlights.title':    'Built to handle complex requirements',
    'highlights.subtitle': 'From currency configurations to client billing logs, manage it all within one visual board.',
    'highlight1.title': 'Multi-Currency & Conversion',
    'highlight1.desc':  'Support transactions in USD, IDR, EUR, and more. Maintain consistent conversion logs and records across tax codes.',
    'highlight2.title': 'Multi-Language Formatting',
    'highlight2.desc':  'Dynamically switch invoice outputs between English and Indonesian with standard legal terminologies pre-configured.',
    'highlight3.title': 'A4 Export & Digital Sign',
    'highlight3.desc':  'Upload logo headers, draw digital signatures directly on the drawing canvas, and generate print-ready A4 PDF formats.',

    // CTA Section
    'cta.title':    'Start Invoicing Smarter Today',
    'cta.subtitle': 'Create your account now to build custom client lists, manage company databases, and create real invoices.',
    'cta.button':   'Create Your Free Account',

    // Features page
    'features.title':    'Powerful Invoicing',
    'features.accent':   'Features',
    'features.subtitle': 'Explore the advanced features built into Invora to simplify your billing operations and present professional invoices to your clients.',

    // Pricing page
    'pricing.title':    'Flexible',
    'pricing.accent':   'Pricing',
    'pricing.subtitle': 'No hidden fees. Choose a plan that matches your monthly billing needs. Start generating invoices instantly.',

    // FAQ page
    'faq.title':    'Frequently Asked',
    'faq.accent':   'Questions',
    'faq.subtitle': 'Find quick answers to common questions about Invora features, digital signatures, database, and invoice management.',

    // Contact page
    'contact.title':    'Contact',
    'contact.accent':   'Us',
    'contact.subtitle': 'Have feedback or need help? Fill in the form below and our team will get back to you.',
    'contact.name':     'Full Name',
    'contact.email':    'Email',
    'contact.message':  'Your Message',
    'contact.placeholder.name':    'e.g. John Doe',
    'contact.placeholder.email':   'e.g. john@example.com',
    'contact.placeholder.message': 'Write your question or concern here...',
    'contact.submit':   'Send Message',
    'contact.success.title':   'Message Sent Successfully!',
    'contact.success.desc':    'Thank you for contacting us. We will review your message and get back to you shortly.',
    'contact.success.another': 'Send Another Message',

    // Console UI
    'console.navigation': 'Navigation',
    'console.dashboard':  'Dashboard',
    'console.newInvoice': 'New Invoice',
    'console.faq':        'FAQ',
    'console.freePlan':   'Free Plan',
    'console.free':       'Free',
    'console.publicSite': 'Public Site',
    'console.signOut':    'Sign Out',
    'console.backToDash': '← Dashboard',
    'console.language':   'Language',

    // Console Breadcrumbs
    'bc.workspace':  'Workspace',
    'bc.dashboard':  'Dashboard',
    'bc.invoices':   'Invoices',
    'bc.createNew':  'Create New',
    'bc.edit':       'Edit Invoice',
    'bc.support':    'Support',
    'bc.faq':        'FAQ',
    'bc.console':    'Console',
  },

  ID: {
    // Nav
    'nav.home':     'Beranda',
    'nav.features': 'Fitur',
    'nav.pricing':  'Harga',
    'nav.faq':      'FAQ',
    'nav.blog':     'Blog',
    'nav.contact':  'Kontak',
    'nav.login':    'Masuk',
    'nav.register': 'Daftar',
    'nav.dashboard':'Dashboard',

    // Footer
    'footer.rights': 'Seluruh hak dilindungi. Dirancang untuk tagihan modern.',

    // Landing — Hero
    'hero.badge':    'Fitur Baru: Canvas Tanda Tangan Digital',
    'hero.title':    'Platform Invoice Dirancang untuk',
    'hero.title.accent': 'Bisnis Modern',
    'hero.subtitle': 'Buat tagihan profesional, kelola profil perusahaan, tandatangani secara dinamis, dan ekspor invoice piksel-sempurna dalam hitungan detik. Semua tersimpan aman di cloud.',
    'hero.cta.primary':   'Mulai Gratis',
    'hero.cta.secondary': 'Coba Demo Interaktif',

    // Landing — Demo
    'demo.title':    'Demo Pembuat Invoice Interaktif',
    'demo.subtitle': 'Coba sistem desain kami sekarang. Ubah pengaturan di panel kontrol untuk melihat tata letak invoice berubah secara langsung.',
    'demo.panel.title':      'Kustomisasi Langsung',
    'demo.client.label':     'Nama Klien',
    'demo.currency.label':   'Mata Uang',
    'demo.discount.label':   'Diskon',
    'demo.lang.label':       'Bahasa Template',
    'demo.type.label':       'Jenis Invoice',
    'demo.type.reguler':      'Reguler',
    'demo.type.proforma':     'Proforma',
    'demo.type.down_payment': 'Uang Muka',
    'demo.type.pelunasan':    'Pelunasan',
    'demo.info':             'Ingin mengunggah logo perusahaan khusus, menggambar tanda tangan digital, dan mengekspor dokumen PDF? Daftar akun gratis untuk membuka semua fitur!',

    // Invoice labels (demo)
    'inv.title':    'FAKTUR / INVOICE',
    'inv.from':     'Tagihan Dari',
    'inv.to':       'Tagihan Kepada',
    'inv.date':     'Tanggal Invoice',
    'inv.due':      'Jatuh Tempo',
    'inv.desc':     'Deskripsi',
    'inv.qty':      'Jumlah',
    'inv.price':    'Harga Satuan',
    'inv.subtotal': 'Subtotal',
    'inv.discount': 'Diskon',
    'inv.tax':      'Pajak',
    'inv.total':    'Total Tagihan',
    'inv.thanks':   'Terima kasih atas kerja sama Anda!',

    // Landing — Highlights
    'highlights.title':    'Dirancang untuk kebutuhan yang kompleks',
    'highlights.subtitle': 'Dari konfigurasi mata uang hingga log tagihan klien, kelola semuanya dalam satu papan visual.',
    'highlight1.title': 'Multi-Mata Uang & Konversi',
    'highlight1.desc':  'Mendukung transaksi dalam USD, IDR, EUR, dan lainnya. Pertahankan log konversi dan catatan yang konsisten di seluruh kode pajak.',
    'highlight2.title': 'Format Multi-Bahasa',
    'highlight2.desc':  'Beralih output invoice secara dinamis antara Bahasa Inggris dan Indonesia dengan terminologi hukum standar yang telah dikonfigurasi.',
    'highlight3.title': 'Ekspor A4 & Tanda Tangan Digital',
    'highlight3.desc':  'Unggah header logo, gambar tanda tangan digital langsung di kanvas gambar, dan hasilkan format PDF A4 siap cetak.',

    // CTA Section
    'cta.title':    'Mulai Tagih Lebih Cerdas Hari Ini',
    'cta.subtitle': 'Buat akun Anda sekarang untuk membangun daftar klien khusus, mengelola database perusahaan, dan membuat invoice nyata.',
    'cta.button':   'Buat Akun Gratis Anda',

    // Features page
    'features.title':    'Fitur Invoice',
    'features.accent':   'Lengkap',
    'features.subtitle': 'Jelajahi fitur-fitur canggih yang dibangun ke dalam Invora untuk menyederhanakan operasi penagihan Anda dan menyajikan invoice profesional kepada klien Anda.',

    // Pricing page
    'pricing.title':    'Paket Harga',
    'pricing.accent':   'Fleksibel',
    'pricing.subtitle': 'Tanpa biaya tersembunyi. Pilih paket yang sesuai dengan kebutuhan penagihan bulanan Anda. Mulai buat invoice seketika.',

    // FAQ page
    'faq.title':    'Pertanyaan yang',
    'faq.accent':   'Sering Ditanyakan',
    'faq.subtitle': 'Cari jawaban cepat untuk pertanyaan umum seputar fitur, tanda tangan digital, database, dan pengelolaan invoice di Invora.',

    // Contact page
    'contact.title':    'Hubungi',
    'contact.accent':   'Kami',
    'contact.subtitle': 'Ada masukan atau pertanyaan bantuan? Silakan hubungi kami melalui formulir di bawah. Tim kami siap merespons Anda.',
    'contact.name':     'Nama Lengkap',
    'contact.email':    'Email',
    'contact.message':  'Pesan Anda',
    'contact.placeholder.name':    'mis. Budi Santoso',
    'contact.placeholder.email':   'mis. budi@contoh.com',
    'contact.placeholder.message': 'Tuliskan pertanyaan atau kendala Anda di sini...',
    'contact.submit':   'Kirim Pesan',
    'contact.success.title':   'Pesan Berhasil Terkirim!',
    'contact.success.desc':    'Terima kasih telah menghubungi kami. Kami akan meninjau pesan Anda dan segera menghubungi Anda kembali.',
    'contact.success.another': 'Kirim Pesan Lain',

    // Console UI
    'console.navigation': 'Navigasi',
    'console.dashboard':  'Dasbor',
    'console.newInvoice': 'Buat Invoice',
    'console.faq':        'Bantuan',
    'console.freePlan':   'Paket Gratis',
    'console.free':       'Gratis',
    'console.publicSite': 'Situs Publik',
    'console.signOut':    'Keluar',
    'console.backToDash': '← Dasbor',
    'console.language':   'Bahasa',

    // Console Breadcrumbs
    'bc.workspace':  'Workspace',
    'bc.dashboard':  'Dasbor',
    'bc.invoices':   'Invoice',
    'bc.createNew':  'Buat Baru',
    'bc.edit':       'Edit Invoice',
    'bc.support':    'Bantuan',
    'bc.faq':        'FAQ',
    'bc.console':    'Konsol',
  }
};

// ─── Context ─────────────────────────────────────────────────────────────────
const I18nContext = createContext<I18nContextValue>({
  lang: 'EN',
  setLang: () => {},
  t: (key) => key,
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('invora_lang');
    return (stored === 'EN' || stored === 'ID') ? stored : 'EN';
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('invora_lang', newLang);
  };

  const t = (key: string): string => {
    return translations[lang][key] ?? translations['EN'][key] ?? key;
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'ID' ? 'id' : 'en';
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useTranslation = () => useContext(I18nContext);
