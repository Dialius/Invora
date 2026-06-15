import React, { useState } from 'react';
import { Shield, Zap, X } from 'lucide-react';
import { AdPlayer } from './AdPlayer';
import { useAdGateStore } from '../store/adGate';

// Publisher ID diambil dari screenshot Anda
const ADSENSE_PUBLISHER_ID = 'ca-pub-4324051731522137';
// Ganti dengan Ad Slot ID setelah Anda membuatnya di dashboard AdSense nanti
const ADSENSE_SLOT_ID = '1234567890'; 

interface AdGateModalProps {
  onClose: () => void;
}

type Step = 'consent' | 'watching' | 'done';

export const AdGateModal: React.FC<AdGateModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<Step>('consent');
  const { grantAccess } = useAdGateStore();

  const handleAdCompleted = () => {
    grantAccess();
    setStep('done');
    // Tutup modal otomatis setelah sukses
    setTimeout(() => onClose(), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative border border-stone-200">
        
        {/* Tombol tutup hanya aktif di langkah persetujuan */}
        {step === 'consent' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* ─── STEP 1: Persetujuan (Consent Screen) ─── */}
        {step === 'consent' && (
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center">
              <Shield className="w-7 h-7 text-stone-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 font-sans">Invora Gratis, Selamanya</h2>
              <p className="text-sm text-stone-500 mt-1">
                Untuk membuat invoice baru, tonton <strong>1 iklan singkat</strong> (±15 detik). 
                Setelah itu, semua fitur terbuka penuh selama <strong>24 jam</strong>.
              </p>
            </div>

            <ul className="text-left text-sm text-stone-600 space-y-2.5 w-full bg-stone-50 rounded-xl p-4 border border-stone-100">
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Buat invoice tak terbatas selama 24 jam</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Ekspor PDF berkualitas tinggi</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Membantu Invora tetap aktif gratis</span>
              </li>
            </ul>

            <p className="text-[11px] text-stone-400 leading-relaxed">
              Dengan mengklik tombol di bawah, Anda menyetujui penayangan iklan pihak ketiga dari Google AdSense.
            </p>

            <button
              onClick={() => setStep('watching')}
              className="w-full py-3 bg-stone-950 text-white rounded-xl font-semibold hover:bg-stone-800 transition-colors shadow-sm"
            >
              Tonton Iklan — Buka Akses
            </button>
          </div>
        )}

        {/* ─── STEP 2: Menonton Iklan (Watching Screen) ─── */}
        {step === 'watching' && (
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="text-center">
              <h2 className="text-base font-bold text-stone-900">Menampilkan Iklan...</h2>
              <p className="text-xs text-stone-400 mt-0.5">Mohon tidak menutup jendela ini</p>
            </div>
            
            <AdPlayer
              adSlot={ADSENSE_SLOT_ID}
              publisherId={ADSENSE_PUBLISHER_ID}
              onCompleted={handleAdCompleted}
            />
          </div>
        )}

        {/* ─── STEP 3: Berhasil (Done Screen) ─── */}
        {step === 'done' && (
          <div className="flex flex-col items-center text-center gap-3 py-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-stone-900">Akses Terbuka!</h2>
            <p className="text-sm text-stone-500">Semua fitur aktif selama 24 jam ke depan.</p>
          </div>
        )}
      </div>
    </div>
  );
};
