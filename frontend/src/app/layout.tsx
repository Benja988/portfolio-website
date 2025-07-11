// app/layout.tsx

import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ReactNode } from 'react';
import SessionWrapper from '@/components/SessionWrapper';

export const metadata = {
  title: 'Benjamin Okumu Portfolio',
  description: 'Portfolio of Benjamin Okumu, Software Engineer & Business Central Consultant',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionWrapper>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}