'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trophy } from 'lucide-react';
import { AccountStatusCard } from '@/components/portal/account-status';
import { ClassOfDayCard } from '@/components/portal/class-of-day';
import { ChallengeCard } from '@/components/portal/challenge-card';
import { portalNavTabs } from '@/components/portal/bottom-nav';
import { useMemberPortal } from '@/lib/portal/store';
import { createDemoMember, todayClass, todayRoutine } from '@/lib/portal/mock-data';

export default function MemberDashboardPage() {
  const { ready, profile, challenges, persistProfile } = useMemberPortal();

  useEffect(() => {
    if (ready && !profile) {
      persistProfile(createDemoMember());
    }
  }, [ready, profile, persistProfile]);

  const member = profile ?? createDemoMember();
  const featured = challenges.filter((c) => !c.joined).slice(0, 3);
  const shortcuts = portalNavTabs.filter((tab) => tab.href !== '/app');

  return (
    <div className="space-y-5">
      <header>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--portal-brand-light)]">
          Hola, {member.name.split(' ')[0]}
        </p>
        <h1 className="mt-1 font-display text-3xl font-black uppercase leading-none text-white">
          Listo para <span className="text-[var(--portal-brand)]">entrenar</span>
        </h1>
      </header>

      {/* Misma barra de opciones que la navegación inferior */}
      <nav aria-label="Opciones principales" className="grid grid-cols-4 gap-2">
        {shortcuts.map((tab) => {
          const Icon = tab.icon;
          const highlight = tab.href === '/app/tienda';
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-2 rounded-2xl border-[3px] px-2 py-3 text-center transition active:scale-[0.98] ${
                highlight
                  ? 'border-brand bg-[var(--portal-brand)]/15'
                  : 'border-zinc-500 bg-[var(--portal-card)] hover:border-zinc-400'
              }`}
            >
              <span
                className={`flex size-10 items-center justify-center rounded-xl ${
                  highlight
                    ? 'bg-[var(--portal-brand)] text-white'
                    : 'bg-white/5 text-[var(--portal-brand-light)]'
                }`}
              >
                <Icon className="size-5" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <AccountStatusCard profile={member} />
      <ClassOfDayCard dayClass={todayClass} routine={todayRoutine} />

      <section className="overflow-hidden rounded-[1.75rem] border-[3px] border-zinc-500 bg-[var(--portal-card)]">
        <Link href="/app/tienda" className="flex items-center gap-4 p-5 active:bg-white/5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--portal-brand)] text-white">
            <ShoppingBag className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--portal-brand-light)]">
              Tienda Crow
            </p>
            <p className="font-display text-xl font-black uppercase text-white">Merch & gear</p>
            <p className="mt-0.5 text-xs text-zinc-500">Remeras, shakers, proteína y más</p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--portal-brand-light)]">
            Ver
          </span>
        </Link>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white">
            <Trophy className="size-4 text-[var(--portal-brand)]" /> Retos vigentes
          </h2>
          <Link href="/app/retos" className="text-xs font-bold text-[var(--portal-brand-light)]">
            Ver todos
          </Link>
        </div>
        {featured.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </section>
    </div>
  );
}
