import { Facebook, Instagram } from 'lucide-react';

export const socialLinks = [
  {
    href: 'https://www.facebook.com/crowfitnessclub/?locale=es_LA',
    label: 'Facebook de Crow Fitness Club',
    icon: Facebook,
  },
  {
    href: 'https://www.instagram.com/reel/DNDszG-xmOg/',
    label: 'Instagram de Crow Fitness Club',
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
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-brand/60 hover:bg-brand/15 hover:text-brand-light"
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  );
}
