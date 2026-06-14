import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Lang = 'EN' | 'ID';

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set, get) => ({
      lang: 'EN',
      setLang: (lang) => set({ lang }),
      toggle: () => set({ lang: get().lang === 'EN' ? 'ID' : 'EN' }),
    }),
    { name: 'invora-lang' }
  )
);

// ----- Console UI strings -----
export const consoleLang = {
  EN: {
    navigation: 'Navigation',
    dashboard:  'Dashboard',
    newInvoice: 'New Invoice',
    faq:        'FAQ',
    freePlan:   'Free Plan',
    free:       'Free',
    publicSite: 'Public Site',
    signOut:    'Sign Out',
    backToDash: '← Dashboard',
    language:   'Language',
  },
  ID: {
    navigation: 'Navigasi',
    dashboard:  'Dasbor',
    newInvoice: 'Buat Invoice',
    faq:        'Bantuan',
    freePlan:   'Paket Gratis',
    free:       'Gratis',
    publicSite: 'Situs Publik',
    signOut:    'Keluar',
    backToDash: '← Dasbor',
    language:   'Bahasa',
  },
} as const;

// ----- Breadcrumb labels -----
export const breadcrumbLang = {
  EN: {
    workspace:   'Workspace',
    dashboard:   'Dashboard',
    invoices:    'Invoices',
    createNew:   'Create New',
    edit:        'Edit Invoice',
    support:     'Support',
    faq:         'FAQ',
    console:     'Console',
  },
  ID: {
    workspace:   'Workspace',
    dashboard:   'Dasbor',
    invoices:    'Invoice',
    createNew:   'Buat Baru',
    edit:        'Edit Invoice',
    support:     'Bantuan',
    faq:         'FAQ',
    console:     'Konsol',
  },
} as const;
