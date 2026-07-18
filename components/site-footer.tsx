import Link from 'next/link';
import { Clock3, Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import { BrandLogo } from './brand-logo';
import { socialLinks } from './social-links';

export function SiteFooter() {
  const facebook = socialLinks[0];
  const instagram = socialLinks[1];

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm space-y-5">
          <BrandLogo />
          <p className="text-sm leading-relaxed text-zinc-500">
            Un espacio creado para moverte mejor, elevar tu rendimiento y formar parte de una comunidad que no se detiene.
          </p>
          <div className="pt-1">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-brand">
              Redes Sociales
            </p>
            <div className="flex items-center gap-2">
              <a
                href={facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={facebook.label}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-brand/60 hover:bg-brand/15 hover:text-brand-light"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={instagram.label}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-brand/60 hover:bg-brand/15 hover:text-brand-light"
              >
                <Instagram className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-brand">Explora</p>
          <div className="grid gap-3 text-sm text-zinc-400">
            <Link href="/gimnasio" className="hover:text-white">Gimnasio</Link>
            <Link href="/clases" className="hover:text-white">Clases</Link>
            <Link href="/membresias" className="hover:text-white">Membresías</Link>
            <Link href="/tienda" className="hover:text-white">Tienda</Link>
            <Link href="/coach-ia" className="hover:text-white">Coach IA</Link>
          </div>
        </div>

        <div>
          <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-brand">Encuéntranos</p>
          <div className="space-y-4 text-sm text-zinc-400">
            <p className="flex gap-3"><MapPin className="size-4 shrink-0 text-brand" /> El Toreo y Real del Valle</p>
            <p className="flex gap-3"><Clock3 className="size-4 shrink-0 text-brand" /> 5:00 a.m. – 10:00 p.m.</p>
            <a href="tel:6691587875" className="flex gap-3 hover:text-white">
              <Phone className="size-4 text-brand" /> 669 158 7875
            </a>
            <a
              href={facebook.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 hover:text-white"
            >
              <Facebook className="size-4 text-brand" /> Crow Fitness Club
            </a>
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 hover:text-white"
            >
              <Instagram className="size-4 text-brand" /> @crowfitnessclub
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-center font-mono text-[10px] uppercase tracking-widest text-zinc-600">
        © {new Date().getFullYear()} Crow Fitness Club. Fuerza, garra y disciplina.
      </div>
    </footer>
  );
}
