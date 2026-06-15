import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { InvoiceForm } from '../components/InvoiceForm';
import { AdGateModal } from '../components/AdGateModal';
import { useAdGate } from '../hooks/useAdGate';

export const InvoiceFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isUnlocked } = useAdGate();
  const [showAdModal, setShowAdModal] = useState(!isUnlocked);

  // Jika sudah terbuka (unlocked), render form secara normal
  if (isUnlocked) {
    return <InvoiceForm invoiceId={id} />;
  }

  return (
    <div className="relative min-h-screen">
      {/* Form tetap di-render di latar belakang untuk pengalaman transisi yang halus */}
      <div className="blur-[2px] pointer-events-none select-none">
        <InvoiceForm invoiceId={id} />
      </div>

      {showAdModal && (
        <AdGateModal
          onClose={() => {
            setShowAdModal(false);
            // Jika user menutup modal tanpa menyelesaikan iklan, kembalikan ke dashboard
            if (!useAdGateStoreStateHelper()) {
              navigate('/dashboard');
            }
          }}
        />
      )}
    </div>
  );
};

// Helper sederhana untuk mengecek state saat modal ditutup
const useAdGateStoreStateHelper = () => {
  try {
    const val = localStorage.getItem('invora_ad_unlocked_until');
    return val ? Date.now() < parseInt(val, 10) : false;
  } catch {
    return false;
  }
};


