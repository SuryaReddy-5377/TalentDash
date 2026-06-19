import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar'; // This is correct for default export

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TalentDash - Career Intelligence Platform',
  description: 'Compare salaries, company reviews, and interview experiences across top companies in India.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}