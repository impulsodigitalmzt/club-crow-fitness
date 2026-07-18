'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { AccountStatusCard } from '@/components/portal/account-status';
import { useMemberPortal } from '@/lib/portal/store';
import { createDemoMember, membershipRenewalPrice } from '@/lib/portal/mock-data';
import { buildMembershipPayUrl } from '@/lib/portal/payments';
import { clearMemberSession } from '@/lib/portal/auth-session';

export default function MemberAccountPage() {
  const router = useRouter();
  const { profile, markExpired, markActive } = useMemberPortal();
  const member = profile ?? createDemoMember();

  async function logout() {
    clearMemberSession();
    await fetch('/api/member/logout', { method: 'POST' });
    router.push('/app/login');
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <header>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--portal-brand-light)]">
          Mi cuenta
        </p>
        <h1 className="mt-1 font-display text-3xl font-black uppercase text-white">{member.name}</h1>
        <p className="mt-1 text-sm text-zinc-400">{member.email}</p>
      </header>

      <AccountStatusCard profile={member} />

      <div className="grid gap-3">
        <Link
          href={buildMembershipPayUrl(membershipRenewalPrice, member.planName)}
          className="flex w-full justify-center rounded-2xl bg-[var(--portal-brand)] py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-[var(--portal-brand-dark)]"
        >
          Pagar / renovar membresía
        </Link>
        {member.status === 'activa' ? (
          <button
            type="button"
            onClick={markExpired}
            className="rounded-2xl border border-white/10 py-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500 hover:text-white"
          >
            Simular membresía vencida
          </button>
        ) : (
          <button
            type="button"
            onClick={markActive}
            className="rounded-2xl border border-white/10 py-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500 hover:text-white"
          >
            Simular membresía activa
          </button>
        )}
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 py-4 text-xs font-black uppercase tracking-wider text-white hover:border-rose-400 hover:text-rose-300"
        >
          <LogOut className="size-4" /> Cerrar sesión
        </button>
      </div>
    </div>
  );
}
