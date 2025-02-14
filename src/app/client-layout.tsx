'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { getLoadingAuth } from '@/redux/auth/auth-selectors';
import { getLoadingTechnical } from '@/redux/technical/technical-selectors';
import LoaderSpinner from '@/components/shared/loader/loader';
import ModalWindow from '../components/shared/modal-window-message/modal-window-message';
import MediaQuery from '../utils/helpers/media-query/media-query';
import AuthProvider from '../utils/helpers/auth-provider/auth-provider';
import { HeaderProvider } from '../utils/helpers/HeaderContext';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import ScrollToTopButton from '@/components/scrollToTopBtn/scrollToTopBtn';
import SearchParamsHandler from '@/utils/helpers/SearchParamsHandler';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const loadingAuth = useSelector(getLoadingAuth);
  const loadingTechnical = useSelector(getLoadingTechnical);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(loadingAuth || loadingTechnical);
  }, [loadingAuth, loadingTechnical]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {loading && <LoaderSpinner />}
      <ModalWindow />
      <MediaQuery />
      <AuthProvider />
      <HeaderProvider>
        <Suspense fallback={<LoaderSpinner />}>
          <SearchParamsHandler />
        </Suspense>
        <Header />
        <main className="flex-1">{children}</main>
        <ScrollToTopButton />
        <Footer />
      </HeaderProvider>
    </div>
  );
};

export default ClientLayout;
