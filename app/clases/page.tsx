'use client';

import { useMemo, useState } from 'react';
import { Check, Clock3, UserRound } from 'lucide-react';
import { ContactCta } from '@/components/contact-cta';
import { PageHero } from '@/components/page-hero';
import { ReelCard } from '@/components/reel-card';
import { classes } from '@/lib/site-data';

const days = ['Lunes', 'Martes', 'Miércoles', 'Sábado'];

export default function ClassesPage() {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [selectedClass, setSelectedClass] = useState<(typeof classes)[number] | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const filteredClasses = useMemo(() => classes.filter((item) => item.day === selectedDay), [selectedDay]);

  function reserve(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedClass || !name || !email) return;
    const reservation = { selectedClass, name, email, createdAt: new Date().toISOString() };
    const previous = JSON.parse(localStorage.getItem('crow_bookings') ?? '[]');
    localStorage.setItem('crow_bookings', JSON.stringify([reservation, ...previous]));
    setSuccess(true);
    setName('');
    setEmail('');
  }

  return (
    <>
      <PageHero
        eyebrow="Clases Crow"
        title={'MUÉVETE EN GRUPO.\n*SUPERA TU MARCA.*'}
        description="Sesiones diseñadas para mejorar fuerza, condición, movilidad y confianza, guiadas por coaches que saben cómo llevarte al siguiente nivel."
        image="/fotos/clase-grupal-foto.jpg"
        primaryHref="#horarios"
        primaryLabel="Ver horarios"
      />

      <section className="bg-black pt-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-brand">Así se entrena en Crow</p>
              <h2 className="mt-4 whitespace-pre-line font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-white sm:text-6xl">
                INTENSIDAD REAL,{'\n'}<span className="text-gradient-brand">RESULTADOS REALES.</span>
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                Desde el trabajo enfocado de glúteo y pierna hasta los circuitos funcionales de alta intensidad: cada clase está diseñada y supervisada por nuestros coaches.
              </p>
            </div>
            <div className="flex justify-center gap-4 sm:gap-5">
              <ReelCard
                src="/videos/clases-gluteo-pierna.mp4"
                title="Glúteo & Pierna"
                subtitle="Hipertrofia"
                className="aspect-[9/16] w-[42vw] max-w-[240px] lg:mt-10"
              />
              <ReelCard
                src="/videos/funcional-intenso.mp4"
                title="Cross-Training"
                subtitle="Alta intensidad"
                className="aspect-[9/16] w-[42vw] max-w-[240px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black pt-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-brand">Nuestros coaches</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-white sm:text-6xl">
            EL EQUIPO QUE <span className="text-gradient-brand">TE ACOMPAÑA.</span>
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { src: '/fotos/coach-valeria.jpg', name: 'Coach Valeria', role: 'Cross-Training · Glúteo & Pierna' },
              { src: '/fotos/coach-brandon.jpg', name: 'Coach Brandon', role: 'Powerlifting · Calistenia' },
              { src: '/fotos/coach-sofia.jpg', name: 'Coach Sofía', role: 'HIIT · Funcional' },
              { src: '/fotos/coach-arturo.jpg', name: 'Coach Arturo', role: 'Boxeo · Acondicionamiento' },
            ].map((coach) => (
              <figure key={coach.name} className="group relative aspect-[4/5] overflow-hidden rounded-3xl border-[3px] border-zinc-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coach.src} alt={coach.name} className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-xl font-black uppercase text-white">{coach.name}</p>
                  <p className="mt-1 text-xs text-zinc-400">{coach.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="horarios" className="bg-black py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-8">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => {
                  setSelectedDay(day);
                  setSelectedClass(null);
                  setSuccess(false);
                }}
                className={`rounded-full px-5 py-3 text-xs font-black uppercase tracking-wider ${
                  selectedDay === day ? 'bg-brand text-white' : 'border border-white/15 text-zinc-400 hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_.8fr]">
            <div className="space-y-3">
              {filteredClasses.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setSelectedClass(item);
                    setSuccess(false);
                  }}
                  className={`grid w-full gap-4 rounded-2xl border-[3px] p-6 text-left transition-colors sm:grid-cols-[100px_1fr_auto] sm:items-center ${
                    selectedClass?.name === item.name
                      ? 'border-brand bg-brand/10'
                      : 'border-zinc-500 bg-zinc-900 hover:border-zinc-400'
                  }`}
                >
                  <span className="font-mono text-xl font-bold text-brand">{item.time}</span>
                  <span>
                    <strong className="block font-display text-lg font-black uppercase text-white">{item.name}</strong>
                    <small className="mt-1 block text-zinc-500">{item.type} · {item.coach}</small>
                  </span>
                  <span className="flex items-center gap-2 text-xs text-zinc-500"><Clock3 className="size-4" /> {item.duration}</span>
                </button>
              ))}
            </div>

            <aside className="h-fit rounded-3xl border-[3px] border-zinc-500 bg-[#141414] p-7 lg:sticky lg:top-28">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand">Reserva tu lugar</p>
              <h2 className="mt-3 font-display text-2xl font-black uppercase text-white">
                {selectedClass ? selectedClass.name : 'Selecciona una clase'}
              </h2>

              {success ? (
                <div className="mt-8 rounded-2xl bg-brand/10 p-6 text-center">
                  <Check className="mx-auto size-8 text-brand" />
                  <p className="mt-3 font-bold text-white">¡Lugar reservado!</p>
                  <p className="mt-2 text-xs text-zinc-400">Guardamos tu reserva en este dispositivo.</p>
                </div>
              ) : (
                <form onSubmit={reserve} className="mt-8 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold text-zinc-300">Nombre completo</span>
                    <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-zinc-800 px-4 transition-colors focus-within:border-brand hover:border-white/50">
                      <UserRound className="size-4 text-zinc-400" />
                      <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Tu nombre" className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-zinc-500" required />
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold text-zinc-300">Correo electrónico</span>
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tucorreo@ejemplo.com" className="w-full rounded-xl border border-white/30 bg-zinc-800 px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 hover:border-white/50 focus:border-brand" required />
                  </label>
                  <button disabled={!selectedClass} className="w-full rounded-xl bg-brand py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-zinc-800">
                    Confirmar reserva
                  </button>
                </form>
              )}
            </aside>
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
