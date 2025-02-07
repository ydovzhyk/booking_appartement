'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import AuthInfo from './auth-info/auth-info';
import Text from '../shared/text/text';
import Logo from '../../components/shared/logo/logo';
import Navigation from './navigation/navigation';
import { useHeaderHeight } from '../../utils/helpers/HeaderContext';
import { HEADER_HEIGHT } from '../../data/headerData';

const allowedRoutes = ['/', '/about', '/articles', '/user'];

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

  const [headerHeightState, setHeaderHeightState] = useState(0); // ✅ Початкова висота (визначається динамічно)
  const [opacity, setOpacity] = useState(1);
  const headerRef = useRef<HTMLDivElement | null>(null);

  // ✅ Визначаємо початкову висоту після завантаження компонента
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeightState(headerRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDiff = Math.min(currentScroll, 200); // ✅ Максимальне зменшення на 300px

      if (headerRef.current) {
        const initialHeight = headerRef.current.scrollHeight;
        const newHeight = Math.max(initialHeight - scrollDiff, 0); // ✅ Зменшення висоти до 1px
        setHeaderHeightState(newHeight);
        setOpacity(1 - scrollDiff / 200); // ✅ Опасіті змінюється від 1 до 0
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return !showHeaderFooter ? null : (
    <div>
      <header
        id="header"
        className="fixed top-0 left-0 w-full z-50 bg-[var(--accent-background)] transition-all duration-300 ease-in-out"
      >
        <div className="container">
          <div className="flex justify-between items-center py-[30px]">
            <Logo width={170} height={40} />
            <AuthInfo />
          </div>

          <div
            ref={headerRef}
            style={{
              height: `${headerHeightState}px`, // ✅ Змінювана висота
              transition: 'height 0.5s ease-in-out',
              overflow: 'hidden',
            }}
          >
            <div
              className="flex flex-col gap-5"
              style={{
                opacity: opacity,
                transform: `translateY(${(1 - opacity) * -10}px)`,
                transition:
                  'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
              }}
            >
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
                fontWeight="medium"
                className="text-left text-white"
              >
                Find your perfect getaway in any city!
              </Text>
            </div>
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
