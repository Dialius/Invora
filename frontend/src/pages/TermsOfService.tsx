import { PublicLayout } from '../components/PublicLayout';
import { FileText, RefreshCw, AlertTriangle, Scale, UserCheck, Ban } from 'lucide-react';

export const TermsOfService = () => {
  const lastUpdated = 'June 15, 2026';

  const sections = [
    {
      icon: UserCheck,
      title: 'Acceptance of Terms',
      content: `By accessing or using Invora at invora.online, you confirm that you are at least 18 years old, have read and understood these Terms of Service, and agree to be bound by them. If you are using Invora on behalf of a business entity, you represent that you have the authority to bind that entity to these terms.\n\nWe reserve the right to update these Terms at any time. Your continued use of the service after changes are posted constitutes your acceptance of the updated Terms.`
    },
    {
      icon: FileText,
      title: 'Description of Service',
      content: `Invora is a cloud-based invoicing platform that allows users to create, manage, and share professional invoices. Core features include:\n\n• Creating multiple invoice types (Regular, Proforma, Down Payment, Settlement)\n• Managing client and company profiles\n• Adding digital signatures to invoices\n• Generating and downloading invoice PDFs\n• Sharing invoices via a public link\n\nInvora is provided as a free service, supported by advertising revenue through Google AdSense. By using Invora, you acknowledge that advertisements may be displayed within the platform.`
    },
    {
      icon: Scale,
      title: 'User Responsibilities',
      content: `As a user of Invora, you agree to:\n\n• Provide accurate, current, and complete information when creating an account\n• Maintain the security of your login credentials and notify us immediately of any unauthorized access\n• Use the service only for lawful purposes and in compliance with all applicable laws and regulations\n• Not attempt to reverse-engineer, decompile, or extract the source code of the platform\n• Not use the service to transmit spam, malware, or any harmful content\n• Not impersonate any person or entity or misrepresent your affiliation with any organization\n• Not use automated scripts or bots to access the service without our prior written consent\n\nYou are solely responsible for the accuracy and legality of the business and client information you enter into Invora, and for the invoices you generate using our platform.`
    },
    {
      icon: AlertTriangle,
      title: 'Data & Content Ownership',
      content: `You retain full ownership of all data and content you input into Invora, including company information, client data, and invoice content. By using the service, you grant Invora a limited, non-exclusive license to store and process this data solely for the purpose of providing the service to you.\n\nWe do not claim any ownership over your business data. We will not access, share, or use your invoice data for any purpose beyond providing and improving the Invora service, except as required by law.`
    },
    {
      icon: Ban,
      title: 'Disclaimer of Warranties',
      content: `Invora is provided on an "AS IS" and "AS AVAILABLE" basis, without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.\n\nWe do not warrant that the service will be uninterrupted, error-free, or completely secure. We are not responsible for any losses resulting from unauthorized access to your account or data. You use the service at your own risk.\n\nInvora is an invoicing tool and does not provide legal, tax, or financial advice. You are responsible for ensuring your invoices comply with applicable laws and regulations in your jurisdiction.`
    },
    {
      icon: RefreshCw,
      title: 'Limitation of Liability',
      content: `To the maximum extent permitted by applicable law, Invora and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, goodwill, or business opportunities, arising from your use of or inability to use the service.\n\nOur total liability to you for any claim arising from your use of Invora shall not exceed the amount you have paid to us in the twelve months preceding the claim. Since Invora is currently a free service, this limit may be zero.\n\nSome jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities, so the above limitations may not apply to you.`
    }
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F0EDE8]">
        {/* Hero */}
        <section className="bg-[#FDFCFA] border-b border-[#E2DED7] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 mb-6">
              <Scale className="text-teal-700" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-stone-900 font-serif mb-4">Terms of Service</h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Please read these terms carefully before using Invora. They govern your access to and use of our platform.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-xs text-stone-400 bg-stone-100 border border-stone-200 px-4 py-2 rounded-full">
              <RefreshCw size={11} />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Quick Summary Banner */}
            <div className="bg-teal-50 border border-teal-200/70 rounded-2xl p-6 mb-8">
              <div className="flex gap-3">
                <FileText className="text-teal-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <h2 className="font-bold text-stone-800 mb-1">Summary (Not a Substitute for the Full Terms)</h2>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    Invora is a free invoicing platform. You own your data. We display ads to fund the service. You are responsible for the legality of your invoices. We provide the service "as is" without guarantees. Please read the full terms below.
                  </p>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section, sIdx) => {
                const Icon = section.icon;
                return (
                  <div key={sIdx} className="bg-white border border-[#E2DED7] rounded-2xl overflow-hidden">
                    <div className="flex items-center gap-3 px-8 py-5 border-b border-[#E2DED7] bg-[#FDFCFA]">
                      <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                        <Icon size={17} className="text-teal-700" />
                      </div>
                      <h2 className="text-lg font-bold text-stone-900 font-serif">{section.title}</h2>
                    </div>
                    <div className="px-8 py-6">
                      {section.content.split('\n').map((paragraph, pIdx) => (
                        paragraph.trim() === '' ? null : (
                          <p
                            key={pIdx}
                            className={`text-sm text-stone-500 leading-relaxed ${paragraph.startsWith('•') ? 'pl-4' : ''} ${pIdx > 0 ? 'mt-3' : ''}`}
                          >
                            {paragraph}
                          </p>
                        )
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Governing Law */}
            <div className="mt-6 bg-white border border-[#E2DED7] rounded-2xl px-8 py-6">
              <h2 className="text-lg font-bold text-stone-900 font-serif mb-3">Governing Law</h2>
              <p className="text-sm text-stone-500 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of Indonesia. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Indonesia.
              </p>
            </div>

            {/* Contact */}
            <div className="mt-6 text-center text-sm text-stone-400">
              Questions about these Terms?{' '}
              <a href="/contact" className="text-teal-700 hover:underline font-medium">Contact us</a>
            </div>

          </div>
        </section>
      </div>
    </PublicLayout>
  );
};
