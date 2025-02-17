'use client';

import { usePathname } from 'next/navigation';
import AuthInfo from './auth-info/auth-info';
import Logo from '../../components/shared/logo/logo';
import Navigation from './navigation/navigation';
import { useHeaderHeight } from '../../utils/helpers/HeaderContext';
import { HEADER_HEIGHT } from '../../data/headerData';
import HeaderText from './header-text/header-text';

const allowedRoutes = ['/', '/about', '/articles', '/user', '/add-property'];

const isAllowedRoute = (pathname: string) => {
  return allowedRoutes.some(
    route => route === pathname || pathname.startsWith('/articles')
  );
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
        className="fixed top-0 left-0 w-full z-50 bg-[var(--accent-background)] transition-all duration-300 ease-in-out"
      >
        <div className="container">
          <div className="flex justify-between items-center py-[30px]">
            <div className='flex flex-row file items-center'>
              <Logo width={170} height={40} />
              <span className="text-left text-white ml-[20px]" >{clientHeaderHeight}</span>
            </div>
            <AuthInfo />
          </div>

          <HeaderText />

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
