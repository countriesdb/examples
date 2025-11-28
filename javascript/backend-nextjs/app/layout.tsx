import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CountriesDB Validation API Examples',
  description: 'Next.js API routes demonstrating CountriesDB validation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

