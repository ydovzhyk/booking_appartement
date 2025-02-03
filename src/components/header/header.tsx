'use client';

import { usePathname } from 'next/navigation';
import AuthInfo from './auth-info/auth-info';
import Text from '../shared/text/text';
import Logo from '../../components/shared/logo/logo';
import Navigation from './navigation/navigation';
import { useHeaderHeight } from '../../utils/helpers/HeaderContext';
import { HEADER_HEIGHT } from '../../data/headerData';

const allowedRoutes = ['/', '/about', '/articles'];

const isAllowedRoute = (pathname: string) => {
  const result = allowedRoutes.some(
    route => route === pathname || pathname.startsWith('/articles')
  );
  return result;
};

const Header = () => {
  const pathname = usePathname();
  const showHeaderFooter = pathname ? isAllowedRoute(pathname) : false;
  const clientHeaderHeight = useHeaderHeight();

  const isServer = typeof window === 'undefined';
  const headerHeight = isServer
    ? HEADER_HEIGHT
    : clientHeaderHeight === 0
      ? HEADER_HEIGHT
      : clientHeaderHeight;

  return !showHeaderFooter ? null : (
    <div>
      <header
        id="header"
        className="fixed top-0 left-0 w-full z-50 bg-[var(--accent-background)]"
      >
        <div className="container">
          <div className="flex justify-between items-center py-5">
            <Logo width={170} height={40} />
            <AuthInfo />
          </div>
          <div className="flex flex-col gap-5 py-5">
            <Text
              type="title"
              as="h1"
              fontWeight="bold"
              className="text-left text-white"
            >
              Discover Ukraine – book the best stays!
            </Text>
            <Text
              type="normal"
              as="p"
              fontWeight="bold"
              className="text-left text-white"
            >
              Find your perfect getaway in any city!
            </Text>
          </div>
          <div className="w-full">
            <Navigation />
          </div>
        </div>
      </header>
      <div style={{ paddingTop: `${headerHeight}px` }}></div>
    </div>
  );
};

export default Header;
