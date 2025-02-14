import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getLogin } from '@/redux/auth/auth-selectors';

export function useAuth() {
  const router = useRouter();
  const isLogin = useSelector(getLogin);

  useEffect(() => {
    if (!isLogin) {
      router.replace('/');
    }
  }, [isLogin, router]);

  return isLogin;
}