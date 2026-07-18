'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  BadgeCheck,
  Bot,
  Clock3,
  Dumbbell,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  ShoppingBag,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useEffect } from 'react';
import { socialLinks } from './social-links';

const menuItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/gimnasio', label: 'Gimnasio', icon: Dumbbell },
  { href: '/clases', label: 'Clases', icon: Users },
  { href: '/membresias', label: 'Membresías', icon: BadgeCheck },
  { href: '/tienda', label: 'Tienda', icon: ShoppingBag },
  { href: '/coach-ia', label: 'Coach IA', icon: Bot },
  { href: '/pase-digital', label: 'Pase digital', icon: QrCode },
  { href: '/contacto', label: 'Contacto', icon: MessageCircle },
];

type MobileNavMenuProps = {
  open: boolean;
  onClose: () => void;
  memberHref: string;
  memberLabel: string;
  loggedIn: boolean;
};

export function MobileNavMenu({
  open,
  onClose,
  memberHref,
  memberLabel,
  loggedIn,
}: MobileNavMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-[#F3F1EC] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between px-5 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
        <Link href="/" onClick={onClose} className="flex items-center gap-3" aria-label="Crow Fitness Club">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="size-10 object-contain" />
          <div>
            <span className="block font-display text-base font-black leading-none tracking-tight text-zinc-900">
              CROW <span className="text-brand">FITNESS</span>
            </span>
            <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-500">
              Club Mazatlán
            </span>
          </div>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="flex size-11 items-center justify-center rounded-full border border-zinc-300 text-zinc-800"
          aria-label="Cerrar menú"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Featured card */}
        <Link
          href="/membresias"
          onClick={onClose}
          className="relative mb-4 block overflow-hidden rounded-[1.35rem] shadow-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fotos/clase-en-accion.jpg"
            alt=""
            className="h-44 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-brand-light">
              Membresías Crow
            </p>
            <p className="mt-1 font-display text-2xl font-black uppercase leading-none">
              Entrena con garra
            </p>
            <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-zinc-200">
              Planes claros, acceso a sucursales y comunidad que te empuja a avanzar.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-light">
              Ver planes <ArrowUpRight className="size-3.5" />
            </span>
          </div>
        </Link>

        {/* Nav list */}
        <nav className="mb-4 overflow-hidden rounded-[1.35rem] bg-white p-2 shadow-sm">
          {menuItems.map(({ href, label, icon: Icon }) => {
            const active =
              href === '/'
                ? pathname === '/'
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-2xl px-3.5 py-3.5 transition-colors ${
                  active
                    ? 'bg-brand/10 text-brand'
                    : 'text-zinc-800 hover:bg-zinc-50'
                }`}
              >
                <Icon className={`size-5 shrink-0 ${active ? 'text-brand' : 'text-zinc-500'}`} />
                <span className="flex-1 text-[15px] font-semibold tracking-tight">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Visítanos */}
        <div className="mb-4 rounded-[1.35rem] bg-white p-5 shadow-sm">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand">
            Visítanos
          </p>
          <div className="space-y-3.5 text-sm text-zinc-700">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>El Toreo y Real del Valle · Mazatlán</span>
            </p>
            <p className="flex items-start gap-3">
              <Clock3 className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>Lunes a domingo · 5:00 a.m. – 10:00 p.m.</span>
            </p>
            <a href="tel:6691587875" className="flex items-start gap-3 hover:text-brand">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>669 158 7875</span>
            </a>
          </div>
        </div>

        {/* Síguenos */}
        <div className="mb-2 px-1">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand">
            Síguenos
          </p>
          <div className="flex items-center gap-2.5">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-11 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition-colors hover:border-brand hover:bg-brand/10 hover:text-brand"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="shrink-0 border-t border-zinc-200/80 bg-[#F3F1EC] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
        <div className="flex gap-3">
          <Link
            href={memberHref}
            onClick={onClose}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-center text-[11px] font-black uppercase tracking-wider text-white shadow-sm hover:bg-brand-dark"
          >
            {loggedIn ? memberLabel : 'Acceso socios'}
          </Link>
          <Link
            href="/app/registro"
            onClick={onClose}
            className="flex flex-1 items-center justify-center rounded-full border-2 border-brand py-3.5 text-center text-[11px] font-black uppercase tracking-wider text-brand hover:bg-brand/10"
          >
            Inscribirse
          </Link>
        </div>
      </div>
    </div>
  );
}
