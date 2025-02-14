'use client';
import { Suspense } from 'react';
import { useAuth } from '../../utils/helpers/useAuth';
import UserPageComponent from './user';
import LoaderSpinner from '@/components/shared/loader/loader';

function UserPage() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <div className="container">
        <Suspense
          fallback={
            <LoaderSpinner />
          }
        >
          <UserPageComponent />
        </Suspense>
      </div>
    </div>
  );
}

export default UserPage;
