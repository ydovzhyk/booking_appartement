'use client';
import { Suspense } from 'react';
import { useAuth } from '../../utils/helpers/useAuth';
import AddProperty from './add-property';
import LoaderSpinner from '@/components/shared/loader/loader';

function AddPropertyPage() {
  const authStatus = useAuth();

  if (authStatus === null) {
    return <LoaderSpinner />;
  }

  if (!authStatus) {
    return null;
  }

  return (
    <div>
      <div className="container">
        <Suspense fallback={<LoaderSpinner />}>
          <AddProperty />
        </Suspense>
      </div>
    </div>
  );
}

export default AddPropertyPage;


