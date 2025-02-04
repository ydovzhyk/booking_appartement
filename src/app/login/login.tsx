'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import AuthInputForm from '../../components/shared/auth-input-form/auth-input-form';
import { getLogin } from '../../redux/auth/auth-selectors';
import BackLink from '../../components/shared/back-link/back-link';
import { FcGoogle } from 'react-icons/fc';
import Text from '@/components/shared/text/text';
import NavLink from '@/components/shared/navLink/navLink';

const Login = () => {
  const isLogin = useSelector(getLogin);
  const pathname = usePathname();
  const router = useRouter();
  const [currentOrigin, setCurrentOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentOrigin(encodeURIComponent(window.location.origin));
    }
  }, []);

  useEffect(() => {
    if (isLogin) {
      router.replace(`/`);
    }
  }, [isLogin, router]);

  const REACT_APP_API_URL =
    'https://test-task-backend-34db7d47d9c8.herokuapp.com';

  const googleText =
    pathname === '/login'
      ? 'Sign in quickly with Google'
      : 'Sign up quickly with Google';

  return (
    <section className="h-[100vh]">
      <div className="container">
        <div
          className="
            fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            flex flex-col items-center gap-5
            py-[30px] px-[20px] w-full min-w-[280px]
            bg-[var(--background)]
            rounded-lg
            shadow-[10px_10px_30px_rgba(82,85,95,0.4)]
            z-[10]
            md:mx-0 md:py-[40px] md:px-[20px] md:w-[380px]
            lg:py-[40px] lg:px-[20px] lg:w-[450px]
          "
        >
          <div className="w-full flex flex-row justify-around mb-[10px]">
            <NavLink href="/login" isActive={pathname === '/login'}>
              Login
            </NavLink>
            <NavLink
              href="/registration"
              isActive={pathname === '/registration'}
            >
              Registration
            </NavLink>
          </div>
          <div className="flex flex-col items-center gap-5">
            <Text type="regular" as="p" fontWeight="normal">
              {googleText}
            </Text>
            <a
              href={`${REACT_APP_API_URL}/google?origin=${currentOrigin}`}
              className="
                inline-flex justify-center items-center gap-[10px] mx-auto mb-5 cursor-pointer
                regular-border group
                w-[150px] h-[40px] md:w-[170px]
              "
            >
              <FcGoogle size={24} />
              <Text
                type="small"
                as="span"
                fontWeight="normal"
                className="group-hover:font-bold hover-transition"
              >
                Google
              </Text>
            </a>
          </div>
          <AuthInputForm typeOperation="login" />
          <BackLink />
        </div>
      </div>
    </section>
  );
};

export default Login;
