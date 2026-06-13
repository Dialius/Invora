import { useParams } from 'react-router-dom';
import { InvoiceForm } from '../components/InvoiceForm';

export const InvoiceFormPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100">
      <InvoiceForm invoiceId={id} />
    </div>
  );
};
