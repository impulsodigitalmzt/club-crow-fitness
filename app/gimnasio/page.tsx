import { Clock3, Dumbbell, Snowflake, Users } from 'lucide-react';
import { ContactCta } from '@/components/contact-cta';
import { PageHero } from '@/components/page-hero';
import { ReelCard } from '@/components/reel-card';
import { SectionHeading } from '@/components/section-heading';

const gallery = [
  {
    src: '/fotos/area-cardio.jpg',
    tag: 'Cardio',
    title: 'Zona de cardio',
    copy: 'Caminadoras Life Fitness y remo listos para calentar, quemar y sumar kilómetros a tu ritmo.',
  },
  {
    src: '/fotos/area-elipticas.jpg',
    tag: 'Cardio',
    title: 'Elípticas y bicicletas',
    copy: 'Cardio de bajo impacto con vista a todo el club: elípticas, bicicletas y remo en un solo espacio.',
  },
  {
    src: '/fotos/area-peso-libre.jpg',
    tag: 'Fuerza',
    title: 'Peso libre',
    copy: 'Mancuernas hexagonales, bancos y racks organizados para que nunca esperes tu turno.',
  },
  {
    src: '/fotos/610632691_18213791302313204_5607989256195488288_n.jpg',
    tag: 'Fuerza',
    title: 'Máquinas y discos olímpicos',
    copy: 'Prensa, poleas y estaciones de fuerza con discos olímpicos para progresar con seguridad.',
  },
  {
    src: '/fotos/610896148_18213791407313204_8418118301283926365_n.jpg',
    tag: 'Instalaciones',
    title: 'Sala de mancuernas',
    copy: 'Luz natural, espejos y ventilación: un espacio pensado para entrenar cómodo a cualquier hora.',
  },
  {
    src: '/fotos/611002357_18213791350313204_4472171029920670378_n.jpg',
    tag: 'Instalaciones',
    title: 'Bancos ajustables',
    copy: 'Área de bancos ajustables y racks frente al espejo para cuidar cada detalle de tu técnica.',
  },
  {
    src: '/fotos/clase-en-accion.jpg',
    tag: 'Clases',
    title: 'Clases en acción',
    copy: 'Sesiones grupales de alta intensidad guiadas por nuestros coaches: cada repetición cuenta.',
  },
  {
    src: '/fotos/575950585_18208420765313204_2427245055504601786_n.jpg',
    tag: 'Clases',
    title: 'Entrenamiento funcional',
    copy: 'Circuitos que combinan fuerza, movilidad y cardio para llevarte al siguiente nivel.',
  },
  {
    src: '/fotos/576548096_18208420669313204_304944317072570197_n.jpg',
    tag: 'Actitud',
    title: 'Esfuerzo que se nota',
    copy: 'Aquí se suda, se sonríe y se progresa: la actitud Crow en cada entrenamiento.',
  },
  {
    src: '/fotos/clase-grupal-foto.jpg',
    tag: 'Comunidad',
    title: 'Comunidad Crow',
    copy: 'Más que un gimnasio: un equipo completo que celebra cada logro contigo.',
  },
  {
    src: '/fotos/comunidad-mujeres.jpg',
    tag: 'Comunidad',
    title: 'Amistades que entrenan',
    copy: 'El ambiente que nos distingue: apoyo real entre miembros, dentro y fuera del club.',
  },
  {
    src: '/fotos/comunidad-tres.jpg',
    tag: 'Comunidad',
    title: 'Energía después de clase',
    copy: 'Las sonrisas al final de cada sesión también son parte del resultado.',
  },
];

const amenities = [
  { icon: Dumbbell, title: 'Equipo premium', copy: 'Máquinas Life Fitness, peso libre y zonas especializadas.' },
  { icon: Snowflake, title: 'Climatizado', copy: 'Entrena cómodamente en instalaciones frescas y ventiladas.' },
  { icon: Users, title: 'Comunidad Crow', copy: 'Un entorno inclusivo para principiantes y atletas experimentados.' },
  { icon: Clock3, title: 'Horarios amplios', copy: 'Más libertad para integrar el entrenamiento a tu día.' },
];

export default function GymPage() {
  return (
    <>
      <PageHero
        eyebrow="Instalaciones Crow"
        title={'UN ESPACIO HECHO\nPARA *RENDIR.*'}
        description="Cada zona fue pensada para que entrenes con intención: equipo confiable, amplitud, limpieza y la energía de una comunidad en movimiento."
        image="/fotos/area-elipticas.jpg"
        primaryHref="/contacto"
        primaryLabel="Agenda una visita"
      />

      <section className="bg-black py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Dentro de Crow"
            title={'CONOCE TU NUEVO\n*LUGAR FAVORITO.*'}
            description="Grabado directamente en nuestras instalaciones: así se ve y se siente entrenar en Crow."
          />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ReelCard
              src="/videos/recorrido-coach.mp4"
              title="Recorre el club"
              subtitle="Tour con nuestro coach"
              className="min-h-[480px] sm:col-span-2 sm:row-span-2 sm:min-h-0"
            />
            <ReelCard src="/videos/montaje-equipo.mp4" title="Fuerza" subtitle="Peso libre y máquinas" className="aspect-[9/16]" />
            <ReelCard src="/videos/kettlebell.mp4" title="Kettlebells" subtitle="Zona de accesorios" className="aspect-[9/16]" />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0b0b0b] py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Galería Crow"
            title={'ASÍ SE VE\n*ENTRENAR AQUÍ.*'}
            description="Un recorrido por cada zona del club: cardio, fuerza, clases y la comunidad que lo hace diferente."
          />

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((photo) => (
              <figure
                key={photo.src}
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl border-[3px] border-zinc-500 bg-zinc-900"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-brand-light">
                    {photo.tag}
                  </p>
                  <h3 className="font-display text-xl font-black uppercase leading-tight text-white">{photo.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-zinc-300">{photo.copy}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#090909] py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="grid gap-px overflow-hidden rounded-3xl border-[3px] border-zinc-500 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((item) => (
              <article key={item.title} className="bg-[#090909] p-8">
                <item.icon className="size-6 text-brand" />
                <h3 className="mt-8 font-display text-xl font-black uppercase text-white">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-zinc-500">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
