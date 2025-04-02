'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { getPaymentData } from '@/redux/technical/technical-selectors';
import LoaderSpinner from '@/components/shared/loader/loader';
import { Suspense } from 'react';

function PaymentPage() {
  const { paymentStage } = useParams();
  const router = useRouter();
  const paymentData = useSelector(getPaymentData);

  useEffect(() => {
    if (paymentData && Object.keys(paymentData).length > 0) return;

    const lastPage = localStorage.getItem('lastPropertyPage');
    if (lastPage?.startsWith('/property/')) {
      router.replace(lastPage);
    } else {
      router.replace('/');
    }
  }, [paymentData, router]);

  return (
    <div className="w-full">
      <div className="container">
        <Suspense fallback={<LoaderSpinner />}>
          <div>Сторінка оплати</div>
        </Suspense>
      </div>
    </div>
  );
}

export default PaymentPage;
