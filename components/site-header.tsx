'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, UserRound } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { BrandLogo } from './brand-logo';
import { MobileNavMenu } from './mobile-nav-menu';
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
  const memberTitle = loggedIn ? 'Mi portal' : 'Iniciar socio';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-3 px-5 sm:px-8">
          <BrandLogo />

          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => {
              const active =
                pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
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

            {/* Redes: a la izquierda del hamburguesa en móvil */}
            <SocialLinks />

            {/* Acceso socio solo en desktop; en móvil va dentro del menú */}
            <Link
              href={memberHref}
              className="hidden items-center gap-2 rounded-full border border-brand/50 bg-brand/15 px-3 py-1.5 text-brand-light transition-colors hover:border-brand hover:bg-brand/25 lg:inline-flex"
              aria-label={loggedIn ? 'Ir a mi portal de socio' : 'Iniciar socio'}
            >
              <UserRound className="size-5 shrink-0" />
              <span className="leading-tight">
                <span className="block text-[11px] font-black uppercase tracking-wider">
                  {memberTitle}
                </span>
                <span className="block text-[10px] font-semibold text-brand-light/80">Cuenta</span>
              </span>
            </Link>

            <Link
              href="/app/registro"
              className="hidden rounded-full border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition-colors hover:border-white/30 hover:bg-white/5 lg:inline-flex"
            >
              Únete
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full border border-white/15 p-2.5 text-white lg:hidden"
              aria-label="Abrir menú"
              aria-expanded={open}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNavMenu
        open={open}
        onClose={() => setOpen(false)}
        memberHref={memberHref}
        memberLabel={memberTitle}
        loggedIn={loggedIn}
      />
    </>
  );
}
