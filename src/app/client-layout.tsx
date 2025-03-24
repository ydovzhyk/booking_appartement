'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { getLoadingAuth } from '@/redux/auth/auth-selectors';
import { getLoadingTechnical } from '@/redux/technical/technical-selectors';
import { getLoadingSearch } from '@/redux/search/search-selectors';
import { getLoadingProperty } from '@/redux/property/property-selectors';
import { getLogin } from '@/redux/auth/auth-selectors';
import { getUser } from '@/redux/auth/auth-selectors';
import useSocket from '@/hooks/useSocket';
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
  const loadingSearch = useSelector(getLoadingSearch);
  const loadingProperty = useSelector(getLoadingProperty);
  const [loading, setLoading] = useState(false);
  const isLogin = useSelector(getLogin);
  const user = useSelector(getUser);
  const { initialize, disconnect } = useSocket();

  useEffect(() => {
    setLoading(loadingAuth || loadingTechnical || loadingSearch || loadingProperty);
  }, [loadingAuth, loadingTechnical, loadingSearch, loadingProperty]);

  useEffect(() => {
    if (isLogin && user && user._id) {
      initialize(user._id);
    } else {
      disconnect();
    }
  }, [isLogin, user?._id]);

  return (
    <div className="reletive min-h-screen flex flex-col justify-between">
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
