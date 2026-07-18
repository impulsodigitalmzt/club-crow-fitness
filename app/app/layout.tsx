import type { Metadata, Viewport } from 'next';
import { PortalShell } from '@/components/portal/portal-shell';

export const metadata: Metadata = {
  title: 'Crow App | Portal del Socio',
  description: 'Tu membresía, clase del día y retos Crow en el celular.',
  manifest: '/portal-manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Crow App',
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function MemberAppLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
