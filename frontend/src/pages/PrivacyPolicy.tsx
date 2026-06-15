import { PublicLayout } from '../components/PublicLayout';
import { Shield, Eye, Database, Lock, Mail, RefreshCw } from 'lucide-react';

export const PrivacyPolicy = () => {
  const lastUpdated = 'June 15, 2026';

  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Account Information',
          text: 'When you register for Invora, we collect your name, email address, and a hashed version of your password. This information is necessary to create and manage your account.'
        },
        {
          subtitle: 'Business Information',
          text: 'To generate professional invoices, you may provide company details such as your business name, address, phone number, email, NPWP (tax ID), and bank account information. You may also upload a company logo.'
        },
        {
          subtitle: 'Client Information',
          text: 'You may enter information about your clients, including their name, contact details, and address. This information is used solely to populate your invoices.'
        },
        {
          subtitle: 'Invoice Data',
          text: 'We store the invoices you create, including line items, pricing, taxes, and payment terms. This is core to the service we provide.'
        },
        {
          subtitle: 'Usage Data',
          text: 'We may automatically collect technical information about how you use our service, including your IP address, browser type, pages visited, and timestamps, to maintain service security and improve our platform.'
        }
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Delivery',
          text: 'Your information is used to provide, operate, and maintain the Invora invoicing platform, including generating invoice PDFs, managing your client database, and enabling secure access to your account.'
        },
        {
          subtitle: 'Communication',
          text: 'We may send you service-related communications, such as password reset emails, account security alerts, or important product updates. We will not send unsolicited marketing emails without your explicit consent.'
        },
        {
          subtitle: 'Advertising',
          text: 'We use Google AdSense to display advertisements on our platform. Google AdSense uses cookies and similar technologies to serve ads based on your prior visits to our website and other sites on the internet. You may opt out of personalized advertising by visiting Google\'s Ad Settings.'
        },
        {
          subtitle: 'Security & Fraud Prevention',
          text: 'We use your information to protect the security of our platform, verify your identity, and prevent fraudulent activity.'
        }
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data transmitted between your browser and our servers is encrypted using HTTPS/TLS. Passwords are hashed using industry-standard bcrypt before storage and are never stored in plain text.'
        },
        {
          subtitle: 'Access Control',
          text: 'Access to your account and invoice data is protected by JSON Web Token (JWT) authentication. Your data is logically isolated and only accessible to you after successful authentication.'
        },
        {
          subtitle: 'Data Hosting',
          text: 'Your data is stored on secure cloud infrastructure. We apply technical and organizational measures to protect your data against unauthorized access, alteration, or destruction.'
        }
      ]
    },
    {
      icon: Shield,
      title: 'Cookies & Tracking Technologies',
      content: [
        {
          subtitle: 'Session Cookies',
          text: 'We use essential cookies to maintain your login session. Without these cookies, you would need to re-authenticate on every page visit.'
        },
        {
          subtitle: 'Google AdSense Cookies',
          text: 'Our platform uses Google AdSense, which may set third-party cookies to serve personalized advertisements. These cookies allow Google and its partners to serve ads based on your visit to our and other websites. Google\'s use of advertising cookies enables it and its partners to serve ads based on your prior visits.'
        },
        {
          subtitle: 'Opting Out',
          text: 'You can control cookie behavior through your browser settings. To opt out of Google\'s personalized advertising, visit https://www.google.com/settings/ads. Note that disabling certain cookies may affect the functionality of our service.'
        }
      ]
    },
    {
      icon: RefreshCw,
      title: 'Data Retention & Deletion',
      content: [
        {
          subtitle: 'Retention Period',
          text: 'We retain your account and invoice data for as long as your account is active. Inactive accounts may be retained for up to 2 years after your last login to comply with legal obligations.'
        },
        {
          subtitle: 'Account Deletion',
          text: 'You may request the deletion of your account and all associated data at any time by contacting us at privacy@invora.online. We will process your request within 30 days.'
        }
      ]
    },
    {
      icon: Mail,
      title: 'Third-Party Services',
      content: [
        {
          subtitle: 'Google AdSense',
          text: 'We use Google AdSense to monetize our free service. Google, as a third-party vendor, uses cookies to serve ads on our site. Google\'s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site. Learn more at https://policies.google.com/privacy.'
        },
        {
          subtitle: 'No Data Selling',
          text: 'We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. Your data is yours and is used solely to provide the Invora service to you.'
        }
      ]
    }
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F0EDE8]">
        {/* Hero */}
        <section className="bg-[#FDFCFA] border-b border-[#E2DED7] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 mb-6">
              <Shield className="text-teal-700" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-stone-900 font-serif mb-4">Privacy Policy</h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-2xl mx-auto">
              We are committed to protecting your privacy and handling your data with transparency and care.
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

            {/* Intro */}
            <div className="bg-white border border-[#E2DED7] rounded-2xl p-8 mb-8">
              <p className="text-stone-600 leading-relaxed">
                This Privacy Policy describes how <strong className="text-stone-800">Invora</strong> ("we," "us," or "our"), operated at{' '}
                <a href="https://invora.online" className="text-teal-700 hover:underline">invora.online</a>, collects, uses, and shares information about you when you use our invoicing platform. By using Invora, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section, sIdx) => {
                const Icon = section.icon;
                return (
                  <div key={sIdx} className="bg-white border border-[#E2DED7] rounded-2xl overflow-hidden">
                    {/* Section Header */}
                    <div className="flex items-center gap-3 px-8 py-5 border-b border-[#E2DED7] bg-[#FDFCFA]">
                      <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                        <Icon size={17} className="text-teal-700" />
                      </div>
                      <h2 className="text-lg font-bold text-stone-900 font-serif">{section.title}</h2>
                    </div>

                    {/* Section Body */}
                    <div className="px-8 py-6 space-y-5">
                      {section.content.map((item, iIdx) => (
                        <div key={iIdx}>
                          <h3 className="text-sm font-bold text-stone-800 mb-1.5">{item.subtitle}</h3>
                          <p className="text-sm text-stone-500 leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Box */}
            <div className="mt-8 bg-teal-50 border border-teal-200/70 rounded-2xl p-8 text-center">
              <Mail className="text-teal-600 mx-auto mb-4" size={28} />
              <h2 className="text-lg font-bold text-stone-900 mb-2">Questions About This Policy?</h2>
              <p className="text-sm text-stone-500 mb-4">
                If you have questions about this Privacy Policy or how we handle your data, please contact our privacy team.
              </p>
              <a
                href="mailto:privacy@invora.online"
                className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all"
              >
                <Mail size={15} />
                privacy@invora.online
              </a>
            </div>

          </div>
        </section>
      </div>
    </PublicLayout>
  );
};
