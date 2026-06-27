import { useEffect } from 'react';

export const useAdSense = () => {
  useEffect(() => {
    // Cek apakah script sudah ada agar tidak diduplikasi
    const scriptExists = document.querySelector('script[src*="adsbygoogle.js"]');
    
    if (!scriptExists) {
      const script = document.createElement('script');
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4324051731522137";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, []);
};
