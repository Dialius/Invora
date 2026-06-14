import { PublicLayout } from '../components/PublicLayout';
import { ShieldCheck, FileCheck, Layers, Eye, RefreshCw, PenTool } from 'lucide-react';
import { useTranslation } from '../context/i18n';

export const Features = () => {
  const { t } = useTranslation();

  const featuresList = [
    { icon: PenTool,    title: 'Digital Signature Drawing Board', desc: 'Draw signatures directly using your mouse, tablet, or touchscreen. Alternatively, upload an image file of your signature to sign documents on the go.' },
    { icon: ShieldCheck, title: 'Supabase Encrypted Storage', desc: 'All invoice files, client logs, company profiles, and logos are secured on cloud databases, ensuring complete data consistency and access anywhere.' },
    { icon: FileCheck,  title: 'Safe Deletion Checks', desc: 'Smart referential integrity constraints prevent you from deleting profile templates that are actively used in past invoices, preventing database orphan records.' },
    { icon: Eye,        title: 'Instant Live Previews', desc: 'Review document calculations, table listings, and discounts live on screen before committing changes or generating PDFs. No more trial and error.' },
    { icon: RefreshCw,  title: 'Multi-Currency Support', desc: 'Invoice global clients using USD, EUR, IDR, SGD, and more. Track earnings and compile financial summaries in multiple base currencies.' },
    { icon: Layers,     title: 'Billed From / To Customization', desc: 'Quickly modify client and company fields. Add bank accounts, tax details (NPWP), PIC names, and custom thank-you messages per invoice.' },
  ];

  return (
    <PublicLayout>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold text-stone-900 font-serif tracking-tight">
              {t('features.title')}{' '}
              <span className="text-teal-700">{t('features.accent')}</span>
            </h1>
            <p className="mt-4 text-stone-500 text-sm leading-relaxed">{t('features.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuresList.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E2DED7] p-8 rounded-2xl hover:shadow-md hover:border-teal-300/40 transition-all hover:-translate-y-0.5 duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-6 group-hover:scale-105 transition-transform">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mb-2 font-serif">{f.title}</h3>
                  <p className="text-stone-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
