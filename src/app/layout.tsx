import { Nunito } from 'next/font/google';
import { type Metadata } from 'next';

import '~/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Google Flights',
    default: 'Google Flights',
  },
  description:
    'This is a simple project to replicate google flight frontend functionalities.',
};

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className={nunito.className}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
