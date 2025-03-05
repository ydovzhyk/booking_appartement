'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';

const HeaderContext = createContext<number | null>(null);

export const useHeaderHeight = () => useContext(HeaderContext);

interface HeaderProviderProps {
  children: ReactNode;
  value?: any;
}

export const HeaderProvider = ({ children, value }: HeaderProviderProps) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/header-height')
      .then(res => res.json())
      .then(data => {
        if (data.headerHeight) {
          setHeaderHeight(data.headerHeight);
        }
      })
      .catch(error => console.error('Error fetching header height:', error));
  }, []);

  useEffect(() => {
    let lastHeight = 0;

    const updateHeaderHeight = () => {
      const header = document.getElementById('header');
      if (header) {
        const height = header.clientHeight;

        if (height !== lastHeight) {
          lastHeight = height;
          setHeaderHeight(height);

          fetch('/api/header-height', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ height }),
          }).catch(error =>
            console.error('Error saving header height:', error)
          );
        }
      }
    };

    const debouncedUpdate = debounce(updateHeaderHeight, 500);

    const observer = new ResizeObserver(debouncedUpdate);
    const headerElement = document.getElementById('header');
    if (headerElement) {
      observer.observe(headerElement);
    }

    window.addEventListener('resize', debouncedUpdate);

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      observer.disconnect();
      debouncedUpdate.cancel();
    };
  }, [value, router]);

  return (
    <HeaderContext.Provider value={headerHeight}>
      {children}
    </HeaderContext.Provider>
  );
};
