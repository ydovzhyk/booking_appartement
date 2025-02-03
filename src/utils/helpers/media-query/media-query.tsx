'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { setScreenType } from '../../../redux/technical/technical-slice';

const MediaQuery = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 425px)');
    const tabletQuery = window.matchMedia(
      '(min-width: 426px) and (max-width: 1279px)'
    );
    const desktopQuery = window.matchMedia('(min-width: 1280px)');

    const mobileListener = (e: MediaQueryListEvent) => {
      if (e.matches) dispatch(setScreenType('isMobile'));
    };
    const tabletListener = (e: MediaQueryListEvent) => {
      if (e.matches) dispatch(setScreenType('isTablet'));
    };
    const desktopListener = (e: MediaQueryListEvent) => {
      if (e.matches) dispatch(setScreenType('isDesktop'));
    };

    // Додаємо слухачі
    mobileQuery.addEventListener('change', mobileListener);
    tabletQuery.addEventListener('change', tabletListener);
    desktopQuery.addEventListener('change', desktopListener);

    // Виконуємо один раз при завантаженні
    if (mobileQuery.matches) dispatch(setScreenType('isMobile'));
    if (tabletQuery.matches) dispatch(setScreenType('isTablet'));
    if (desktopQuery.matches) dispatch(setScreenType('isDesktop'));

    // Прибирання слухачів при знищенні компоненту
    return () => {
      mobileQuery.removeEventListener('change', mobileListener);
      tabletQuery.removeEventListener('change', tabletListener);
      desktopQuery.removeEventListener('change', desktopListener);
    };
  }, [dispatch]);

  return null;
};

export default MediaQuery;
