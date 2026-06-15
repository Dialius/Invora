import React, { useEffect, useRef, useState } from 'react';
import { Clock } from 'lucide-react';

interface AdPlayerProps {
  adSlot: string;
  publisherId: string;
  onCompleted: () => void;
}

export const AdPlayer: React.FC<AdPlayerProps> = ({
  adSlot,
  publisherId,
  onCompleted,
}) => {
  const [countdown, setCountdown] = useState(15);
  const [canClose, setCanClose] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Muat iklan Google AdSense ke dalam container
    try {
      const adEl = document.createElement('ins');
      adEl.className = 'adsbygoogle';
      adEl.style.display = 'block';
      adEl.setAttribute('data-ad-client', publisherId);
      adEl.setAttribute('data-ad-slot', adSlot);
      adEl.setAttribute('data-ad-format', 'auto');
      adEl.setAttribute('data-full-width-responsive', 'true');

      if (adRef.current) {
        adRef.current.innerHTML = ''; // bersihkan placeholder
        adRef.current.appendChild(adEl);
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn('AdSense load error:', e);
    }

    // Jalankan timer 15 detik
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setCanClose(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [adSlot, publisherId]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Container Iklan 300x250 */}
      <div
        ref={adRef}
        className="w-[300px] min-h-[250px] bg-stone-100 border border-stone-200 rounded-lg flex items-center justify-center overflow-hidden"
      >
        <span className="text-xs text-stone-400">Memuat iklan...</span>
      </div>

      {!canClose ? (
        <div className="flex items-center gap-2 text-sm text-stone-500 bg-stone-50 px-4 py-2 rounded-lg">
          <Clock className="w-4 h-4 animate-pulse text-stone-600" />
          <span>Tunggu <strong className="text-stone-800">{countdown} detik</strong> untuk melanjutkan...</span>
        </div>
      ) : (
        <button
          onClick={onCompleted}
          className="w-full px-6 py-3 bg-stone-900 text-white rounded-xl font-semibold hover:bg-stone-800 transition-colors shadow-sm"
        >
          ✓ Akses Terbuka — Mulai Buat Invoice
        </button>
      )}
    </div>
  );
};
