'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BrandLogo } from './brand-logo';
import { SocialLinks } from './social-links';

const navigation = [
  { href: '/gimnasio', label: 'Gimnasio' },
  { href: '/clases', label: 'Clases' },
  { href: '/membresias', label: 'Membresías' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/coach-ia', label: 'Coach IA' },
  { href: '/pase-digital', label: 'Pase digital' },
  { href: '/contacto', label: 'Contacto' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8">
        <BrandLogo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                  active ? 'text-brand' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <SocialLinks className="hidden sm:flex" />

          <Link
            href="/app/registro"
            className="hidden rounded-full bg-brand px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-brand-dark sm:inline-flex"
          >
            Únete ahora
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-white/15 p-2.5 text-white lg:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-black px-5 py-6 lg:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-white/10 py-4 font-display text-xl font-black uppercase ${
                  pathname === item.href ? 'text-brand' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-5">
              <SocialLinks />
              <Link
                href="/app/registro"
                onClick={() => setOpen(false)}
                className="rounded-full bg-brand px-5 py-3 text-xs font-black uppercase tracking-wider text-white"
              >
                Únete ahora
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
