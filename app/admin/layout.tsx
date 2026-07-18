import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/shell';

export const metadata: Metadata = {
  title: 'Crow Admin | Panel administrativo',
  description: 'Panel de administración de Crow Fitness Club.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
