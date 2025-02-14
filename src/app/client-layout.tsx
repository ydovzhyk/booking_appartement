'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { getLoadingAuth } from '@/redux/auth/auth-selectors';
import { getLoadingTechnical } from '@/redux/technical/technical-selectors';
import LoaderSpinner from '@/components/shared/loader/loader';
import ModalWindow from '../components/shared/modal-window-message/modal-window-message';
import MediaQuery from '../utils/helpers/media-query/media-query';
import AuthProvider from '../utils/helpers/auth-provider/auth-provider';
import { HeaderProvider } from '../utils/helpers/HeaderContext';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { useRouter } from 'next/navigation';
import ScrollToTopButton from '@/components/scrollToTopBtn/scrollToTopBtn';
import { setMessage } from '@/redux/technical/technical-slice';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loadingAuth = useSelector(getLoadingAuth);
  const loadingTechnical = useSelector(getLoadingTechnical);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  

  useEffect(() => {
    setLoading(loadingAuth || loadingTechnical);
  }, [loadingAuth, loadingTechnical]);

  useEffect(() => {
    if (message) {
      dispatch(setMessage(message));
      router.replace('/');
    }
  }, [message, dispatch, router]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {loading && <LoaderSpinner />}
      <ModalWindow />
      <MediaQuery />
      <AuthProvider />
      <HeaderProvider>
        <Header />
        <main className="flex-1">
          <Suspense fallback={<LoaderSpinner />}>{children}</Suspense>
        </main>
        <ScrollToTopButton />
        <Footer />
      </HeaderProvider>
    </div>
  );
};

export default ClientLayout;
