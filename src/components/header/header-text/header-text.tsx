'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Text from '../../shared/text/text';
import TextSlider from '../../shared/text-slider/text-slider';

const HeaderText = () => {
  const pathname = usePathname();
  const [opacity, setOpacity] = useState(1);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.height = 'auto'; // Скидаємо висоту перед визначенням нової

      requestAnimationFrame(() => {
        if (headerRef.current) {
          const initialHeight = headerRef.current.scrollHeight;
          headerRef.current.style.height = `${initialHeight}px`;
        }
      });
    }
  }, [pathname]);


  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDiff = Math.min(currentScroll, 200); 

      if (headerRef.current) {
        const initialHeight = headerRef.current.scrollHeight;
        const newHeight = Math.max(initialHeight - scrollDiff, 0); 
        headerRef.current.style.height = `${newHeight}px`;
        setOpacity(1 - scrollDiff / 200);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={headerRef}
      key={pathname}
      style={{
        width: '60%',
        transition: 'height 0.5s ease-in-out',
        overflow: 'hidden',
      }}
    >
      {pathname !== '/add-property' && (
        <div
          className="flex flex-col gap-5"
          style={{
            opacity: opacity,
            transform: `translateY(${(1 - opacity) * -10}px)`,
            transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
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
      )}
      {pathname === '/add-property' && (
        <div
          className="flex flex-col gap-5"
          style={{
            opacity: opacity,
            transform: `translateY(${(1 - opacity) * -10}px)`,
            transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
          }}
        >
          <TextSlider />
          <Text
            type="normal"
            as="p"
            fontWeight="medium"
            className="text-left text-white"
          >
            Whether hosting is your sideline passion or full-time job, list your
            home today and quickly start earning more income.
          </Text>
        </div>
      )}
    </div>
  );
};

export default HeaderText;
