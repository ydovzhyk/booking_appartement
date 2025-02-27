'use client';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/utils/helpers/hooks';
import { useParams, useRouter } from 'next/navigation';
import LoaderSpinner from '@/components/shared/loader/loader';
import { getDetailProperty } from '@/redux/property/property-operations';
import { getPropertyDetail } from '@/redux/property/property-selectors';

function DetaisPropertyPage() {
  const { propertyName, id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  console.log(id, propertyName);

  // useEffect(() => {
  //   if (
  //     !propertyName ||
  //     typeof propertyName !== 'string' ||
  //     !id ||
  //     typeof id !== 'string'
  //   ) {
  //     router.replace('/not-found');
  //     return;
  //   }

  //   dispatch(getDetailProperty(id));
  // }, [dispatch, id, propertyName, router]);

  const property = useSelector(getPropertyDetail);

  // 🔹 Якщо API-запит не повернув property → редіректимо на кастомний 404
  // useEffect(() => {
  //   if (!property) {
  //     router.replace('/not-found');
  //   }
  // }, [property, router]);

  return (
    <div>
      <div className="container">
        <Suspense fallback={<LoaderSpinner />}>
          <h1>{property?.title || 'Loading...'}</h1>
        </Suspense>
      </div>
    </div>
  );
}

export default DetaisPropertyPage;
