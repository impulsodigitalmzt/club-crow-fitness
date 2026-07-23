import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

/**
 * Enlaces de redes en modo demo: llevan a /contacto (paneles simulados).
 * No abren Facebook/Instagram reales.
 */
export const socialLinks = [
  {
    href: '/contacto',
    label: 'Facebook de Crow Fitness Club (demo)',
    icon: Facebook,
  },
  {
    href: '/contacto',
    label: 'Instagram de Crow Fitness Club (demo)',
    icon: Instagram,
  },
] as const;

export function SocialLinks({
  className = '',
  iconClassName = 'size-4',
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socialLinks.map(({ href, label, icon: Icon }, index) => (
        <Link
          key={`${href}-${index}`}
          href={href}
          aria-label={label}
          title="Demo: redes simuladas en Contacto"
          className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-brand/60 hover:bg-brand/15 hover:text-brand-light"
        >
          <Icon className={iconClassName} />
        </Link>
      ))}
    </div>
  );
}
