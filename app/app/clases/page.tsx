import Link from 'next/link';
import { todayClass, todayRoutine } from '@/lib/portal/mock-data';
import { ClassOfDayCard } from '@/components/portal/class-of-day';

export default function MemberClassesPage() {
  return (
    <div className="space-y-5">
      <header>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--portal-brand-light)]">
          Clases
        </p>
        <h1 className="mt-1 font-display text-3xl font-black uppercase text-white">Tu entrenamiento</h1>
      </header>

      <ClassOfDayCard dayClass={todayClass} routine={todayRoutine} />

      <Link
        href="/clases"
        className="flex w-full justify-center rounded-2xl border border-white/15 py-4 text-xs font-black uppercase tracking-wider text-white hover:border-[var(--portal-brand)]"
      >
        Ver horarios completos
      </Link>
    </div>
  );
}
