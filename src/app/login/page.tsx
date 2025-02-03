'use client';
import Login from './login';
import Logo from '@/components/shared/logo/logo';
import { useMediaQuery } from 'react-responsive';

export default function LoginPage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <section className="bg-[url('/images/background.webp')] bg-cover bg-no-repeat h-screen">
      <div>
        {!isMobile && (
          <div className="absolute top-[70px] left-[40px]">
            <Logo width={170} height={40} />
          </div>
        )}
      </div>
      <div className="container">
        <Login />
      </div>
    </section>
  );
}
