import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import { SiteChrome } from '@/components/site-chrome';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Crow Fitness Club | Gimnasio Premium 24/7 en Mazatlán',
  description:
    'Entrena en Crow Fitness Club Mazatlán: equipo de alto nivel, clases, coaching y una comunidad que se mueve contigo.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="bg-[#050505] text-[#f4f4f5] antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
