import React from 'react';
import type { Metadata } from 'next';
import { Josefin_Sans, Maven_Pro } from 'next/font/google';
import { StoreProvider } from '../redux/store-provider';
import { LanguageProvider } from '../utils/helpers/translating/language-context';
import ClientLayout from './client-layout';

import '../styles/globals.css';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin',
});
const maven = Maven_Pro({ subsets: ['latin'], variable: '--font-maven' });

export const metadata: Metadata = {
  title: 'Apartment Booking – Find Your Perfect Stay',
  description:
    'Easily book apartments with the best deals. Browse listings, compare prices, and reserve your ideal stay in just a few clicks.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
        <StoreProvider>
          <LanguageProvider>
            <body className={`${josefin.variable} ${maven.variable}`}>
              <ClientLayout>{children}</ClientLayout>
            </body>
          </LanguageProvider>
        </StoreProvider>
    </html>
  );
}
