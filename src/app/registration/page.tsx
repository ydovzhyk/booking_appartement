'use client';
import Registration from './registration';
import Logo from '@/components/shared/logo/logo';
import { useMediaQuery } from 'react-responsive';

export default function RegistrationPage() {
  const isMobile = useMediaQuery({ maxWidth: 425 });
  // const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 1279 });
  // const isDesktop = useMediaQuery({ minWidth: 1280 });
  return (
    <section className="bg-[url('/images/background.webp')] bg-cover bg-no-repeat h-screen">
      {!isMobile && (
        <div className="absolute top-[70px] left-[40px]">
          <Logo width={170} height={40} />
        </div>
      )}
      <div className="container">
        <Registration />
      </div>
    </section>
  );
}
