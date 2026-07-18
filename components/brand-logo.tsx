import Link from 'next/link';

export function BrandLogo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Crow Fitness Club">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt=""
        className="size-11 object-contain drop-shadow-[0_0_10px_rgba(201,54,232,.35)] transition-transform group-hover:rotate-6"
      />
      <div>
        <span className="block font-display text-lg font-black leading-none tracking-tight text-white">
          CROW <span className="text-brand">FITNESS</span>
        </span>
        <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-500">
          Club Mazatlán
        </span>
      </div>
    </Link>
  );
}
