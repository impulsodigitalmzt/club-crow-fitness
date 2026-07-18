import { QrCode } from 'lucide-react';
import type { DigitalPass } from '@/lib/digital-pass';

export function DigitalPassCard({ pass }: { pass: DigitalPass }) {
  return (
    <div className="relative mx-auto aspect-[1.58/1] w-full max-w-xl overflow-hidden rounded-[2rem] border border-brand/40 bg-[radial-gradient(circle_at_90%_10%,rgba(201,54,232,.45),transparent_35%),linear-gradient(135deg,#171717,#050505)] p-7 shadow-2xl shadow-brand/15 sm:p-10">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="size-12 object-contain" />
          <div>
            <p className="font-display text-xl font-black text-white">
              CROW <span className="text-brand">FITNESS</span>
            </p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-500">
              Digital member pass
            </p>
          </div>
        </div>
        <QrCode className="size-12 text-white" />
      </div>

      <div className="absolute inset-x-7 bottom-7 sm:inset-x-10 sm:bottom-10">
        <p className="font-display text-2xl font-black uppercase text-white sm:text-4xl">{pass.name}</p>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-brand">{pass.plan}</p>
        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-white/15 pt-4 font-mono text-[10px] text-zinc-400">
          <span>{pass.memberId}</span>
          <span className="text-brand-light">VENCE {pass.expiresAt}</span>
        </div>
      </div>
    </div>
  );
}
