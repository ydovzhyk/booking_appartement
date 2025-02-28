"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from "next/navigation";

const HeaderContext = createContext<number | null>(null);

export const useHeaderHeight = () => useContext(HeaderContext);

interface HeaderProviderProps {
  children: ReactNode;
  value?: any;
}

export const HeaderProvider = ({ children, value }: HeaderProviderProps) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const router = useRouter();

  // ✅ Отримуємо збережену висоту при завантаженні сторінки
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

  // ✅ Оновлення висоти на клієнті
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.getElementById('header');
      if (header) {
        const height = header.clientHeight;
        setHeaderHeight(height);

        fetch('/api/header-height', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ height }),
        }).catch(error => console.error('Error saving header height:', error));
      }
    };

    const timeout = setTimeout(() => {
      updateHeaderHeight();
    }, 300);

    const observer = new ResizeObserver(() => updateHeaderHeight());
    const headerElement = document.getElementById('header');
    if (headerElement) {
      observer.observe(headerElement);
    }

    if (value) {
      updateHeaderHeight();
    }

    window.addEventListener('load', updateHeaderHeight);
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('load', updateHeaderHeight);
      window.removeEventListener('resize', updateHeaderHeight);
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [value, router]);

  return (
    <HeaderContext.Provider value={headerHeight}>
      {children}
    </HeaderContext.Provider>
  );
};


