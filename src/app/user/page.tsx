'use client';
import { Suspense } from 'react';
import UserPageComponent from './user';

import LoaderSpinner from '@/components/shared/loader/loader';

export default function UserPage() {
  return (
    <div>
      <div className="container">
        <Suspense
          fallback={
            <div className="flex justify-center items-center w-full h-full">
              <LoaderSpinner />
            </div>
          }
        >
          <UserPageComponent />
        </Suspense>
      </div>
    </div>
  );
}
