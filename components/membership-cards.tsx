import Link from 'next/link';
import { Check, Dumbbell } from 'lucide-react';
import { membershipPlans } from '@/lib/site-data';

export function MembershipCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {membershipPlans.map((plan) => (
        <article
          key={plan.id}
          className={`flex min-h-[520px] flex-col rounded-[2rem] p-7 sm:p-9 ${
            plan.popular
              ? 'border-[3px] border-zinc-400 bg-white text-black shadow-2xl shadow-brand/20 lg:-translate-y-3'
              : 'border-[3px] border-zinc-500 bg-zinc-900 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)]'
          }`}
        >
          <div className="mb-10 flex items-start justify-between">
            <span
              className={`rounded-xl p-3 ${
                plan.popular ? 'bg-brand text-white' : 'bg-brand/20 text-brand-light'
              }`}
            >
              <Dumbbell className="size-5" />
            </span>
            {plan.popular && (
              <span className="rounded-full bg-brand px-4 py-2 text-[10px] font-black uppercase tracking-wider text-white">
                Más popular
              </span>
            )}
          </div>

          <h3 className="font-display text-xl font-black uppercase">{plan.title}</h3>
          <div className="mt-3 flex items-end gap-2">
            <span
              className={`font-display text-6xl font-black tracking-tight ${
                plan.popular ? 'text-brand-dark' : 'text-brand'
              }`}
            >
              ${plan.price.toLocaleString('es-MX')}
            </span>
            <span className={`pb-2 text-sm ${plan.popular ? 'text-black/60' : 'text-zinc-400'}`}>
              {plan.period}
            </span>
          </div>
          <p
            className={`mt-6 text-base leading-relaxed sm:text-lg ${
              plan.popular ? 'text-black/65' : 'text-zinc-200'
            }`}
          >
            {plan.description}
          </p>

          <div className="mt-8 flex-1 space-y-3.5">
            {plan.features.map((feature) => (
              <p key={feature} className="flex gap-3 text-base leading-snug sm:text-[17px]">
                <Check
                  className={`mt-0.5 size-5 shrink-0 ${
                    plan.popular ? 'text-brand-dark' : 'text-brand'
                  }`}
                />
                <span className={plan.popular ? 'text-black/75' : 'text-zinc-100'}>{feature}</span>
              </p>
            ))}
          </div>

          <Link
            href={`/checkout?plan=${plan.id}`}
            className={`mt-9 rounded-xl py-4 text-center text-xs font-black uppercase tracking-wider transition-colors ${
              plan.popular
                ? 'bg-brand text-white hover:bg-brand-dark'
                : 'border-2 border-brand bg-brand/10 text-white hover:bg-brand'
            }`}
          >
            Elegir membresía
          </Link>
        </article>
      ))}
    </div>
  );
}
