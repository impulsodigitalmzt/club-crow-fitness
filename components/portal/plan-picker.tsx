'use client';

import { Check } from 'lucide-react';
import {
  SUBSCRIPTION_ENROLLMENT_FEE,
  subscriptionPlans,
  type SubscriptionPlan,
} from '@/lib/portal/subscription-plans';

export function PlanPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (planId: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-zinc-300">Selecciona tu plan</p>
      {subscriptionPlans.map((plan) => (
        <PlanOption
          key={plan.id}
          plan={plan}
          selected={value === plan.id}
          onSelect={() => onChange(plan.id)}
        />
      ))}
      <p className="pt-1 text-[11px] leading-relaxed text-zinc-500">
        Planes con inscripción incluyen ${SUBSCRIPTION_ENROLLMENT_FEE.toLocaleString('es-MX')} MXN
        de alta (única).
      </p>
    </div>
  );
}

function PlanOption({
  plan,
  selected,
  onSelect,
}: {
  plan: SubscriptionPlan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-start justify-between gap-3 rounded-2xl border px-4 py-4 text-left transition ${
        selected
          ? 'border-[var(--portal-brand)] bg-[var(--portal-brand)]/15'
          : 'border-white/10 bg-[var(--portal-card)] hover:border-white/25'
      }`}
    >
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="block text-sm font-bold text-white">{plan.name}</span>
          {plan.popular ? (
            <span className="rounded-full bg-[var(--portal-brand)] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
              Popular
            </span>
          ) : null}
        </span>
        <span className="mt-1 block text-xs text-zinc-500">{plan.description}</span>
        <span className="mt-1 block text-[11px] text-zinc-600">{plan.period}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2 font-display text-xl font-black text-[var(--portal-brand-light)]">
        ${plan.price.toLocaleString('es-MX')}
        {selected ? <Check className="size-4 text-[var(--portal-brand)]" /> : null}
      </span>
    </button>
  );
}
