import { Suspense } from 'react';
import LoaderSpinner from '@/components/shared/loader/loader';

export default function AboutPage() {
  return (
    <section className="">
      <div className="container">
        <Suspense
          fallback={
            <div className="flex justify-center items-center w-full h-full test-border">
              <LoaderSpinner />
            </div>
          }
        ></Suspense>
      </div>
    </section>
  );
}
