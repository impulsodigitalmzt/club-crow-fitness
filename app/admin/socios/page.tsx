'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { ColoredStatCard, PageHeader, StatusBadge } from '@/components/admin/ui';
import { AdminToast } from '@/components/admin/modal';
import { useAdminDb } from '@/hooks/use-admin-db';
import { updateMemberStatus } from '@/lib/admin/store';
import type { MemberStatus } from '@/lib/admin/types';

export default function SociosPage() {
  const { db, busy, toast, run, stats } = useAdminDb();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return db.members;
    return db.members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.plan.toLowerCase().includes(q),
    );
  }, [db.members, query]);

  function cycleStatus(current: MemberStatus): MemberStatus {
    if (current === 'activo') return 'por_vencer';
    if (current === 'por_vencer') return 'vencido';
    return 'activo';
  }

  return (
    <div>
      <PageHeader
        title="Socios"
        subtitle="Incluye registros del Portal (localStorage) y la simulación Crow Admin"
      />

      <div className="space-y-6 p-5 sm:p-8">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, correo o plan..."
            className="w-full rounded-xl border border-zinc-200 bg-white py-3.5 pl-11 pr-4 text-sm text-zinc-700 outline-none focus:border-[var(--admin-brand)]"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ColoredStatCard label="Activos" value={stats.members.active} headerClass="bg-[var(--admin-brand)]" />
          <ColoredStatCard label="Por vencer" value={db.members.filter((m) => m.status === 'por_vencer').length} headerClass="bg-amber-500" />
          <ColoredStatCard label="Vencidos" value={stats.members.overdue} headerClass="bg-zinc-800" />
          <ColoredStatCard label="Pendientes" value={stats.members.pending} headerClass="bg-[var(--admin-brand-dark)]" />
        </div>

        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <header className="border-b border-zinc-100 px-5 py-4">
            <h2 className="text-sm font-bold text-zinc-800">Listado de socios</h2>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Nombre</th>
                  <th className="px-5 py-3 font-semibold">Correo</th>
                  <th className="px-5 py-3 font-semibold">Plan</th>
                  <th className="px-5 py-3 font-semibold">Vence</th>
                  <th className="px-5 py-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((member) => (
                  <tr key={member.id} className="border-t border-zinc-100 hover:bg-zinc-50/80">
                    <td className="px-5 py-3.5 font-semibold text-[var(--admin-brand)]">
                      {member.name}
                      {member.id.startsWith('portal_') ? (
                        <span className="ml-2 rounded-full bg-[var(--admin-brand)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--admin-brand)]">
                          Portal
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-3.5 text-zinc-500">{member.email}</td>
                    <td className="px-5 py-3.5 text-zinc-700">{member.plan}</td>
                    <td className="px-5 py-3.5 text-zinc-500">{member.expiresAt}</td>
                    <td className="px-5 py-3.5">
                      <button
                        type="button"
                        disabled={busy}
                        title="Cambiar estado"
                        onClick={() =>
                          run(
                            () => updateMemberStatus(member.id, cycleStatus(member.status)),
                            `Estado de ${member.name} actualizado`,
                          )
                        }
                      >
                        <StatusBadge status={member.status} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <AdminToast message={toast} />
    </div>
  );
}
