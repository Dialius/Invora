import { PublicLayout } from '../components/PublicLayout';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Pricing = () => {
  const tiers = [
    {
      name: 'Starter',
      price: '$0',
      desc: 'Perfect for freelancers starting out.',
      features: [
        'Up to 5 invoices per month',
        'Standard PDF templates',
        'Local database storage',
        'Single company profile'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$15',
      desc: 'The best option for growing businesses.',
      features: [
        'Unlimited invoices',
        'Custom Logo & Signature drawing',
        'Multi-currency & PDF print formats',
        'Multi-language output (ID/EN)',
        'Cloud storage backing (Supabase)',
        'Priority support'
      ],
      cta: 'Go Pro Now',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'For organizations needing custom workflows.',
      features: [
        'Dedicated database instance',
        'Custom branding & styling layouts',
        'Automated billing integrations',
        'Team access (multiple logins)',
        'SLA security backing'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <PublicLayout>
      <div className="py-20 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Flexible <span className="text-cyan-400">Pricing</span> Plans
            </h1>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              No hidden fees. Choose a plan that matches your monthly billing needs. Start generating invoices instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col justify-between rounded-2xl p-8 border ${
                  tier.popular
                    ? 'bg-gradient-to-b from-[#1C2541]/80 to-[#0B132B]/95 border-cyan-500 shadow-xl shadow-cyan-600/5 hover:-translate-y-1 transition-transform'
                    : 'bg-[#1C2541]/20 border-slate-800 hover:-translate-y-0.5 transition-transform'
                } duration-300`}
              >
                {tier.popular && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 bg-cyan-600 text-slate-900 font-bold px-3 py-1 rounded-full text-[10px] tracking-wider uppercase">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-slate-200">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{tier.price}</span>
                    {tier.price !== 'Custom' && <span className="text-slate-400 text-xs">/month</span>}
                  </div>
                  <p className="mt-2 text-slate-450 text-xs leading-relaxed">{tier.desc}</p>

                  <ul className="mt-8 space-y-3">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-350">
                        <Check size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  {tier.price === 'Custom' ? (
                    <Link
                      to="/contact"
                      className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors border border-slate-700"
                    >
                      {tier.cta}
                    </Link>
                  ) : (
                    <Link
                      to="/register"
                      className={`block w-full text-center font-bold py-2.5 px-4 rounded-xl text-xs transition-all ${
                        tier.popular
                          ? 'bg-cyan-600 hover:bg-cyan-500 text-slate-900 shadow-md shadow-cyan-600/10'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {tier.cta}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
