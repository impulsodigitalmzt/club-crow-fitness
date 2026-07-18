import Link from 'next/link';
import { ArrowRight, Bot, Dumbbell, HeartPulse, Users } from 'lucide-react';
import { AnimatedTitle, FadeUp } from '@/components/animated-title';
import { ContactCta } from '@/components/contact-cta';
import { CommunityImpactSection } from '@/components/community-impact-section';
import { HeroIntro } from '@/components/hero-intro';
import { HeroVideoWall } from '@/components/hero-video-wall';
import { ReviewsSection } from '@/components/reviews-section';
import { SectionHeading } from '@/components/section-heading';
import { TransformationsCarousel } from '@/components/transformations-carousel';

const experiences = [
  {
    href: '/gimnasio',
    title: 'Gimnasio',
    copy: 'Equipo, espacios e instalaciones creados para rendir.',
    image: '/fotos/area-peso-libre.jpg',
    icon: Dumbbell,
  },
  {
    href: '/clases',
    title: 'Clases',
    copy: 'Entrena en comunidad con coaches que elevan tu nivel.',
    image: '/fotos/clase-en-accion.jpg',
    icon: Users,
  },
  {
    href: '/coach-ia',
    title: 'Coaching',
    copy: 'Un plan inteligente alineado con tus objetivos.',
    image: '/fotos/coach-head.jpg',
    icon: Bot,
  },
  {
    href: '/membresias',
    title: 'Bienestar',
    copy: 'Movimiento, recuperación y hábitos que duran.',
    image: '/fotos/comunidad-mujeres.jpg',
    icon: HeartPulse,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-32">
        {/* Muro de reels a pantalla completa: los clips verticales se ven completos, sin distorsión */}
        <HeroVideoWall />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8">
          {/* Letrero centrado con secuencia de entrada animada */}
          <HeroIntro />
        </div>

        <span className="absolute bottom-6 right-6 z-10 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-brand" /> Club activo
        </span>
      </section>

      <section className="bg-black py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Una experiencia completa"
            title={'TODO LO QUE NECESITAS\nPARA *ELEVAR TU NIVEL.*'}
            description="Explora cada parte de Crow en páginas dedicadas, encuentra lo que buscas y comienza a construir tu siguiente versión."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.map((item) => (
              <Link key={item.href} href={item.href} className="group relative min-h-[500px] overflow-hidden rounded-3xl border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt="" className="absolute inset-0 size-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <item.icon className="mb-5 size-6 text-brand" />
                  <h2 className="font-display text-3xl font-black uppercase text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.copy}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white group-hover:text-brand">
                    Explorar <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0a0a] py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <FadeUp>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-brand">
                Crow App
              </p>
            </FadeUp>
            <AnimatedTitle
              as="h2"
              title={'Acceso a socios. *Únete al club.*'}
              className="mt-4 font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl"
            />
            <FadeUp delay={0.2}>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                Si ya eres miembro, entra a tu portal para ver tu membresía, la clase del día y los retos.
                Si aún no lo eres, elige tu plan y activa tu acceso en minutos.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/app/login"
                  className="inline-flex rounded-full bg-brand px-6 py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-brand-dark"
                >
                  Ya soy socio · Entrar
                </Link>
                <Link
                  href="/app/registro"
                  className="inline-flex rounded-full border border-white/20 px-6 py-4 text-xs font-black uppercase tracking-wider text-white hover:border-brand hover:bg-brand/10"
                >
                  Únete al club
                </Link>
              </div>
            </FadeUp>
          </div>

          <div className="rounded-[2rem] border border-brand/30 bg-[radial-gradient(circle_at_20%_0%,rgba(201,54,232,.25),transparent_45%),#111] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-light">Dentro de la app</p>
            <ul className="mt-5 space-y-4 text-sm text-zinc-300">
              <li className="flex gap-3">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-brand" />
                Estado de membresía y botón de pago inmediato
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-brand" />
                Clase reservada y rutina del día
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-brand" />
                Retos y promociones con pago al aceptar
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-brand" />
                Tienda Crow: merch y gear desde la app
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CommunityImpactSection />

      <section className="bg-black py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Resultados reales"
              title={'*TRANSFORMACIONES*\nHECHAS EN CROW.'}
              description="Miembros reales del club, con constancia, plan y el acompañamiento de nuestros coaches."
            />
            <Link
              href="/membresias"
              className="inline-flex h-fit shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-brand-dark"
            >
              Empieza tu cambio <ArrowRight className="size-4" />
            </Link>
          </div>

        </div>
        <TransformationsCarousel />
      </section>

      <ReviewsSection />
      <ContactCta />
    </>
  );
}
