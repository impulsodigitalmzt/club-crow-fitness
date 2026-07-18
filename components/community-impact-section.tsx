'use client';

import { CountUp } from '@/components/count-up';
import { AnimatedTitle, FadeUp } from '@/components/animated-title';
import { ReelCard } from '@/components/reel-card';

/** Bloque comunidad: contador 1000+ + quote con movimiento al scroll. */
export function CommunityImpactSection() {
  return (
    <section className="border-y border-white/10 bg-[#090909] py-24">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <CountUp
            to={1000}
            suffix="+"
            duration={2.2}
            className="inline-block font-display text-7xl font-black leading-none text-brand sm:text-9xl"
          />
          <FadeUp delay={0.15}>
            <p className="mt-3 font-display text-2xl font-black uppercase text-white">
              Entrenamientos que cambian hábitos
            </p>
          </FadeUp>
          <AnimatedTitle
            as="blockquote"
            delay={0.25}
            title={
              '“Persigue el objetivo que suena imposible. Después, hazlo *inevitable.*”'
            }
            className="mt-10 max-w-xl font-display text-3xl font-black uppercase leading-tight text-white sm:text-5xl"
          />
          <FadeUp delay={0.45}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-zinc-400">
              La comunidad Crow también se mueve fuera del gimnasio: retos, carreras al atardecer y
              eventos que convierten el entrenamiento en estilo de vida.
            </p>
          </FadeUp>
        </div>
        <div className="flex justify-center gap-4 sm:gap-5">
          <FadeUp delay={0.2}>
            <ReelCard
              src="/videos/reto-crow.mp4"
              title="Reto Crow"
              subtitle="Eventos de comunidad"
              className="aspect-[9/16] w-[42vw] max-w-[240px] lg:mt-12"
            />
          </FadeUp>
          <FadeUp delay={0.35}>
            <ReelCard
              src="/videos/comunidad-atardecer.mp4"
              title="Comunidad"
              subtitle="Mazatlán al atardecer"
              className="aspect-[9/16] w-[42vw] max-w-[240px]"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
