import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TweetMiner - AI-Powered Twitter Research',
  description: 'Unearth insights from Twitter conversations with AI-powered research tools.',
  keywords: ['twitter', 'research', 'ai', 'analytics', 'social media'],
  authors: [{ name: 'TweetMiner Team' }],
  openGraph: {
    title: 'TweetMiner - AI-Powered Twitter Research',
    description: 'Unearth insights from Twitter conversations with AI-powered research tools.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
