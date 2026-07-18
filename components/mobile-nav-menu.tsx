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
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cerrar solo al cambiar de ruta
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#F4F1EC] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
    >
      {/* Header — logo + cerrar */}
      <div className="flex shrink-0 items-center justify-between gap-3 px-5 pb-3 pt-[max(0.85rem,env(safe-area-inset-top))]">
        <Link
          href="/"
          onClick={onClose}
          className="flex min-w-0 items-center gap-2.5"
          aria-label="Crow Fitness Club"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="size-10 shrink-0 object-contain" />
          <div className="min-w-0">
            <span className="block font-display text-[15px] font-black leading-none tracking-tight text-zinc-900">
              CROW <span className="text-brand">FITNESS</span>
            </span>
            <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.22em] text-zinc-500">
              Club Mazatlán
            </span>
          </div>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-zinc-800/80 bg-white text-zinc-900 shadow-sm"
          aria-label="Cerrar menú"
        >
          <X className="size-5" strokeWidth={2.25} />
        </button>
      </div>

      {/* Contenido scroll */}
      <div className="min-h-0 flex-1 space-y-3.5 overflow-y-auto overscroll-contain px-5 pb-3">
        {/* Card destacada */}
        <Link
          href="/membresias"
          onClick={onClose}
          className="relative block overflow-hidden rounded-[1.5rem]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fotos/clase-en-accion.jpg"
            alt=""
            className="h-[11.5rem] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-brand-light">
              Empieza hoy
            </p>
            <p className="mt-1 font-display text-[1.65rem] font-black uppercase leading-[0.95]">
              Tu plan Crow
            </p>
            <p className="mt-2 max-w-[17rem] text-[13px] leading-relaxed text-zinc-200">
              Membresías, visitas y retos. Elige cómo entrenar y paga en línea.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-bold text-brand-light">
              Conocer más <ArrowUpRight className="size-3.5" />
            </span>
          </div>
        </Link>

        {/* Navegación */}
        <nav className="overflow-hidden rounded-[1.5rem] bg-white/80 p-2">
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
                className={`flex items-center gap-3 rounded-[1.1rem] px-3.5 py-3.5 transition-colors ${
                  active ? 'bg-brand/15 text-brand' : 'text-zinc-900 active:bg-black/[0.04]'
                }`}
              >
                <Icon
                  className={`size-[1.15rem] shrink-0 ${active ? 'text-brand' : 'text-zinc-500'}`}
                />
                <span className="flex-1 text-[15px] font-semibold tracking-tight">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Visítanos */}
        <div className="rounded-[1.5rem] bg-white/80 p-5">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand">
            Visítanos
          </p>
          <div className="space-y-3.5 text-[13px] leading-relaxed text-zinc-700">
            <p className="flex items-start gap-3">
              <Clock3 className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>
                Lunes a domingo
                <br />
                5:00 a.m. – 10:00 p.m.
              </span>
            </p>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>El Toreo y Real del Valle, Mazatlán</span>
            </p>
            <a href="tel:6691587875" className="flex items-start gap-3 hover:text-brand">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>669 158 7875</span>
            </a>
          </div>
        </div>

        {/* Síguenos */}
        <div className="flex items-center justify-between gap-3 px-0.5 pb-2">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand">
            Síguenos
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition-colors hover:border-brand hover:text-brand"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Acceso socios / Inscribirse — solo aquí, como en la referencia */}
      <div className="shrink-0 border-t border-zinc-200/80 bg-[#F4F1EC] px-5 pb-[max(1.1rem,env(safe-area-inset-bottom))] pt-3">
        <div className="flex gap-2.5">
          <Link
            href={memberHref}
            onClick={onClose}
            className="flex min-h-12 flex-1 flex-col items-center justify-center rounded-full bg-brand px-3 text-center text-white active:bg-brand-dark"
          >
            <span className="text-[11px] font-black uppercase tracking-wider">
              {loggedIn ? memberLabel : 'Iniciar socio'}
            </span>
            <span className="text-[9px] font-semibold text-white/80">Cuenta</span>
          </Link>
          <Link
            href="/app/registro"
            onClick={onClose}
            className="flex min-h-12 flex-1 items-center justify-center rounded-full border-[2.5px] border-brand bg-white px-3 text-center text-[11px] font-black uppercase tracking-wider text-brand active:bg-brand/10"
          >
            Inscribirse
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
