import { useState } from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslation } from '../context/i18n';

export const FAQ = () => {
  const { t, lang } = useTranslation();

  const faqs = lang === 'ID' ? [
    { q: 'Bagaimana cara menambahkan logo perusahaan pada invoice?', a: 'Ketika membuat profile perusahaan (Billed From) baru, Anda dapat mengklik area Dropzone Logo untuk mengunggah gambar. Logo akan disimpan secara otomatis di database dan dilampirkan di setiap invoice.' },
    { q: 'Apakah saya bisa menggambar tanda tangan langsung di web?', a: 'Ya! Invora menyediakan fitur canvas menggambar di form pembuatan invoice. Anda dapat menggunakan mouse atau touchscreen perangkat Anda untuk menggambar tanda tangan. Selain itu, Anda juga dapat mengunggah file gambar tanda tangan yang sudah ada.' },
    { q: 'Bagaimana cara mengganti mata uang dan bahasa pada lembar invoice?', a: 'Di bagian atas formulir pembuatan invoice, Anda dapat memilih jenis mata uang (seperti IDR, USD, EUR). Untuk bahasa, Anda dapat menggunakan tombol toggle ID / EN di atas pratinjau invoice untuk menerjemahkan label teks secara instan.' },
    { q: 'Mengapa saya gagal menghapus profile Company atau Client?', a: 'Sistem Invora memiliki fitur Safe Delete. Jika profil perusahaan atau client tersebut sudah dikaitkan dengan invoice masa lalu yang terbit, sistem akan menolak penghapusan untuk mencegah rusaknya data invoice lama.' },
    { q: 'Apakah client saya butuh akun untuk melihat invoice?', a: 'Tidak. Anda cukup membagikan tautan detail invoice publik kepada client Anda. Mereka dapat langsung membuka tautan tersebut untuk melihat detail dan mengunduh format cetak PDF tanpa perlu login.' },
  ] : [
    { q: 'How do I add a company logo to my invoice?', a: 'When creating a new company profile (Billed From), you can click the Logo Dropzone area to upload an image. The logo will be automatically saved to the database and attached to every invoice.' },
    { q: 'Can I draw a signature directly on the web?', a: 'Yes! Invora provides a drawing canvas feature in the invoice creation form. You can use your mouse or device touchscreen to draw your signature. Alternatively, you can also upload an existing signature image file.' },
    { q: 'How do I change the currency and language on an invoice?', a: 'At the top of the invoice creation form, you can select the currency type (such as IDR, USD, EUR). For language, you can use the ID / EN toggle button above the invoice preview to instantly translate text labels.' },
    { q: 'Why can\'t I delete a Company or Client profile?', a: 'Invora has a Safe Delete feature. If the company or client profile is already associated with past issued invoices, the system will reject the deletion to prevent corruption of old invoice data.' },
    { q: 'Does my client need an account to view the invoice?', a: 'No. You just need to share the public invoice detail link with your client. They can open the link directly to view details and download the PDF print format without needing to log in.' },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <PublicLayout>
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 text-teal-700 mb-5">
              <HelpCircle size={26} />
            </div>
            <h1 className="text-4xl font-bold text-stone-900 font-serif tracking-tight">
              {t('faq.title')}{' '}
              <span className="text-teal-700">{t('faq.accent')}</span>
            </h1>
            <p className="mt-4 text-stone-500 text-sm leading-relaxed max-w-lg mx-auto">{t('faq.subtitle')}</p>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="bg-white border border-[#E2DED7] rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left py-4 px-6 flex justify-between items-center hover:bg-stone-50/50 transition-colors focus:outline-none"
                  >
                    <span className="font-semibold text-stone-800 text-sm pr-4">{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`flex-shrink-0 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-teal-600' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ease-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-5 pt-1 border-t border-[#E2DED7] bg-stone-50/30 text-stone-600 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
