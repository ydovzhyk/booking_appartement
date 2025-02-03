import type { Metadata } from 'next';
import { Josefin_Sans, Maven_Pro } from 'next/font/google';
import { StoreProvider } from '../redux/store-provider';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import MediaQuery from '../utils/helpers/media-query/media-query';
import AuthProvider from '../utils/helpers/auth-provider/auth-provider';
import { HeaderProvider } from '../utils/helpers/HeaderContext';
import { LanguageProvider } from '../utils/helpers/translating/language-context';
import ModalWindow from '../components/shared/modal-window-message/modal-window-message';

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <LanguageProvider>
          <body className={`${josefin.variable} ${maven.variable}`}>
            <div className="min-h-screen flex flex-col justify-between">
              <ModalWindow />
              <MediaQuery />
              <AuthProvider />
              <HeaderProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </HeaderProvider>
            </div>
          </body>
        </LanguageProvider>
      </StoreProvider>
    </html>
  );
}
