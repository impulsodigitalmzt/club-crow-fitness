'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, UserRound, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { BrandLogo } from './brand-logo';
import { SocialLinks } from './social-links';
import { readStoredProfile } from '@/lib/portal/auth-session';
import { getCurrentUser, loadUsers } from '@/lib/portal/users';

const navigation = [
  { href: '/gimnasio', label: 'Gimnasio' },
  { href: '/clases', label: 'Clases' },
  { href: '/membresias', label: 'Membresías' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/coach-ia', label: 'Coach IA' },
  { href: '/pase-digital', label: 'Pase digital' },
  { href: '/contacto', label: 'Contacto' },
];

function useMemberLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const sync = () => {
      loadUsers();
      setLoggedIn(Boolean(getCurrentUser() || readStoredProfile()));
    };

    sync();
    window.addEventListener('crow-member-session', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('crow-member-session', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return loggedIn;
}

export function SiteHeader({ cartSlot }: { cartSlot?: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const loggedIn = useMemberLoggedIn();
  const memberHref = loggedIn ? '/app' : '/app/login';
  const memberLabel = loggedIn ? 'Mi portal' : 'Soy socio';

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8">
        <BrandLogo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
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

        <div className="flex items-center gap-2 sm:gap-3">
          {cartSlot ? <div className="flex items-center">{cartSlot}</div> : null}
          <SocialLinks />

          {/* Acceso rápido para socios — siempre visible, sin abrir el menú */}
          <Link
            href={memberHref}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand/50 bg-brand/15 px-2.5 py-2.5 text-[11px] font-black uppercase tracking-wider text-brand-light transition-colors hover:border-brand hover:bg-brand/25 sm:gap-2 sm:px-4 sm:text-xs"
            aria-label={loggedIn ? 'Ir a mi portal de socio' : 'Entrar como socio'}
          >
            <UserRound className="size-4 shrink-0" />
            <span className="max-sm:hidden">{memberLabel}</span>
            <span className="sm:hidden">{loggedIn ? 'Portal' : 'Socio'}</span>
          </Link>

          <Link
            href="/app/registro"
            className="hidden rounded-full border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition-colors hover:border-white/30 hover:bg-white/5 sm:inline-flex"
          >
            Únete
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
            <p className="pb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Explorar el club
            </p>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-white/10 py-4 font-display text-xl font-black uppercase ${
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                    ? 'text-brand'
                    : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-5">
              <Link
                href={memberHref}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-xs font-black uppercase tracking-wider text-white"
              >
                <UserRound className="size-4" />
                {loggedIn ? 'Ir a mi portal' : 'Soy socio · Entrar'}
              </Link>
              <div className="flex items-center justify-between gap-3">
                {cartSlot}
                <Link
                  href="/app/registro"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/20 px-5 py-3 text-xs font-black uppercase tracking-wider text-white"
                >
                  Únete al club
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
