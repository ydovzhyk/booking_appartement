'use client';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/utils/helpers/hooks';
import { useParams, useRouter } from 'next/navigation';
import LoaderSpinner from '@/components/shared/loader/loader';
import { getDetailProperty } from '@/redux/property/property-operations';
import { getPropertyDetail } from '@/redux/property/property-selectors';
import PropertyDetail from '@/components/property-detail/property-detail';

function DetailPropertyPage() {
  const { propertyName, id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const property = useSelector(getPropertyDetail);

  useEffect(() => {
    if (
      !propertyName ||
      typeof propertyName !== 'string' ||
      !id ||
      typeof id !== 'string'
    ) {
      router.replace('/404');
      return;
    }
    dispatch(getDetailProperty(id));
  }, [dispatch, id, propertyName, router]);

  if (!property) {
    return null;
  } else {
    return (
      <div className='w-full'>
        <div className="container">
          <Suspense fallback={<LoaderSpinner />}>
            <PropertyDetail {...property} />
          </Suspense>
        </div>
      </div>
    );
  }
}

export default DetailPropertyPage;
