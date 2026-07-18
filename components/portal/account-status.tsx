'use client';

import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Clock3, CreditCard } from 'lucide-react';
import type { MemberProfile } from '@/lib/portal/types';
import { getMembershipLabel, membershipRenewalPrice } from '@/lib/portal/mock-data';
import { buildMembershipPayUrl } from '@/lib/portal/payments';
import { getSubscriptionCheckoutAmount } from '@/lib/portal/subscription-plans';

export function AccountStatusCard({ profile }: { profile: MemberProfile }) {
  const active = profile.status === 'activa';
  const warning = profile.status === 'por_vencer';
  const pending = profile.status === 'pendiente';

  const renew = getSubscriptionCheckoutAmount(profile.planId || 'pase-libre');
  const payAmount = pending ? renew.total : membershipRenewalPrice;
  const payUrl = buildMembershipPayUrl(payAmount, profile.planName, profile.planId);

  const statusLabel = active
    ? 'Activo'
    : warning
      ? 'Por vencer'
      : pending
        ? 'Pendiente'
        : 'Vencido';

  const StatusIcon = active ? CheckCircle2 : pending ? Clock3 : AlertTriangle;

  return (
    <section className="overflow-hidden rounded-[1.75rem] border-2 border-[var(--portal-border)] bg-[var(--portal-card)]">
      <div
        className={`px-5 py-4 ${
          active
            ? 'bg-gradient-to-r from-[var(--portal-brand)]/30 to-transparent'
            : pending
              ? 'bg-gradient-to-r from-sky-500/25 to-transparent'
              : warning
                ? 'bg-gradient-to-r from-amber-500/25 to-transparent'
                : 'bg-gradient-to-r from-rose-500/25 to-transparent'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--portal-brand-light)]">
              Estado de cuenta
            </p>
            <h2 className="mt-2 font-display text-2xl font-black uppercase text-white">
              {statusLabel}
            </h2>
            <p className="mt-2 text-sm font-semibold text-zinc-200">
              {getMembershipLabel(profile)}
            </p>
          </div>
          <span
            className={`mt-1 flex size-11 items-center justify-center rounded-full ${
              active
                ? 'bg-emerald-500/20 text-emerald-400'
                : pending
                  ? 'bg-sky-500/20 text-sky-400'
                  : warning
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-rose-500/20 text-rose-400'
            }`}
          >
            <StatusIcon className="size-6" />
          </span>
        </div>
      </div>

      <div className="space-y-3 px-5 py-5 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-zinc-500">Socio</span>
          <span className="font-semibold text-white">{profile.name}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-zinc-500">Correo</span>
          <span className="truncate font-semibold text-white">{profile.email}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-zinc-500">{pending ? 'Por pagar' : 'Renovación'}</span>
          <span className="font-semibold text-[var(--portal-brand-light)]">
            ${payAmount.toLocaleString('es-MX')} MXN
          </span>
        </div>
      </div>

      <div className="border-t border-white/10 p-4">
        <Link
          href={payUrl}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--portal-brand)] py-4 text-sm font-black uppercase tracking-wider text-white hover:bg-[var(--portal-brand-dark)]"
        >
          <CreditCard className="size-5" />
          {pending ? 'Completar pago' : 'Pagar ahora'}
        </Link>
      </div>
    </section>
  );
}
