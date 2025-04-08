'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import {
  getPaymentData,
  getPaymentStage,
} from '@/redux/technical/technical-selectors';
import { setPaymentStage } from '@/redux/technical/technical-slice';
import LoaderSpinner from '@/components/shared/loader/loader';
import { Suspense } from 'react';
import StageBar from '@/components/payment-component/stage-bar/stage-bar';
import YourSelection from '@/components/payment-component/your-selection/your-selection';
import PaymentDetails from '@/components/payment-component/payment-details/payment-details';


function PaymentPage() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const paymentData = useSelector(getPaymentData);
  const paymentStage = useSelector(getPaymentStage);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const pathStage = pathname?.split('/').pop();
    if (pathStage?.startsWith('stage-')) {
      dispatch(setPaymentStage(pathStage));
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    if (paymentStage === 'stage-1') setStage(1);
    else if (paymentStage === 'stage-2') setStage(2);
    else if (paymentStage === 'stage-3') setStage(3);
  }, [paymentStage]);

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
          <div className="w-full flex flex-col justify-between gap-[40px] my-[40px] test-border">
            <StageBar />
            {stage === 1 && <YourSelection />}
            {stage === 2 && <PaymentDetails />}
            {stage === 3 && <div>Підтвердження</div>}
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default PaymentPage;
