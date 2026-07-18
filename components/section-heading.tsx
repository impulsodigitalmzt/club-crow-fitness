import { renderHighlightedTitle } from '@/components/title-highlight';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'}>
      <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-brand">{eyebrow}</p>
      <h2 className="whitespace-pre-line font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-white sm:text-6xl">
        {renderHighlightedTitle(title)}
      </h2>
      {description && <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">{description}</p>}
    </div>
  );
}
