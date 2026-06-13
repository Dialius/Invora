import { PublicLayout } from '../components/PublicLayout';
import { ShieldCheck, FileCheck, Layers, Eye, RefreshCw, PenTool } from 'lucide-react';

export const Features = () => {
  const featuresList = [
    {
      icon: <PenTool size={22} className="text-cyan-400" />,
      title: 'Digital Signature Drawing Board',
      desc: 'Draw signatures directly using your mouse, tablet, or touchscreen. Alternatively, upload an image file of your signature to sign documents on the go.'
    },
    {
      icon: <ShieldCheck size={22} className="text-cyan-400" />,
      title: 'Supabase Encrypted Storage',
      desc: 'All invoice files, client logs, company profiles, and logos are secured on cloud databases, ensuring complete data consistency and access anywhere.'
    },
    {
      icon: <FileCheck size={22} className="text-cyan-400" />,
      title: 'Safe Deletion Checks',
      desc: 'Smart referential integrity constraints prevent you from deleting profile templates that are actively used in past invoices, preventing database orphan records.'
    },
    {
      icon: <Eye size={22} className="text-cyan-400" />,
      title: 'Instant Live Previews',
      desc: 'Review document calculations, table listings, and discounts live on screen before committing changes or generating PDFs. No more trial and error.'
    },
    {
      icon: <RefreshCw size={22} className="text-cyan-400" />,
      title: 'Multi-Currency Support',
      desc: 'Invoice global clients using USD, EUR, IDR, SGD, and more. Track earnings and compile financial summaries in multiple base currencies.'
    },
    {
      icon: <Layers size={22} className="text-cyan-400" />,
      title: 'Billed From / To Customization',
      desc: 'Quickly modify client and company fields. Add bank accounts, tax details (NPWP), PIC names, and custom thank-you messages per invoice.'
    }
  ];

  return (
    <PublicLayout>
      <div className="py-20 relative">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Powerful Invoicing <span className="text-cyan-400">Features</span>
            </h1>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Explore the advanced features built into Invora to simplify your billing operations and present professional invoices to your clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresList.map((f, idx) => (
              <div
                key={idx}
                className="bg-[#1C2541]/20 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/20 transition-all hover:-translate-y-0.5 duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-200 mb-2">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
