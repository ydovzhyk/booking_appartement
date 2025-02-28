import { Suspense } from 'react';
import LoaderSpinner from '@/components/shared/loader/loader';

export default function AboutPage() {
  return (
    <section className="">
      <div className="container">
        <Suspense fallback={<LoaderSpinner />}></Suspense>
      </div>
    </section>
  );
}
