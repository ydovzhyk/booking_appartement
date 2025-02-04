'use client';
import { useMediaQuery } from 'react-responsive';
import NotFound from './not-found';
import Logo from '@/components/shared/logo/logo';

const NotFoundPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 425 });
  // const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 1279 });
  // const isDesktop = useMediaQuery({ minWidth: 1280 });
  return (
    <div className="bg-[url('/images/background.webp')] bg-cover bg-no-repeat h-screen">
      {!isMobile && (
        <div className="absolute top-[70px] left-[40px] z-20">
          <Logo width={170} height={40} />
        </div>
      )}
      <div className="container">
        <NotFound />
      </div>
    </div>
  );
};

export default NotFoundPage;
