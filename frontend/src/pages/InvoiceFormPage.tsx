import { useParams } from 'react-router-dom';
import { InvoiceForm } from '../components/InvoiceForm';

export const InvoiceFormPage = () => {
  const { id } = useParams();
  
  return <InvoiceForm invoiceId={id} />;
};
