import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { ContactCta } from '@/components/contact-cta';
import { MembershipCards } from '@/components/membership-cards';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { otherRates } from '@/lib/site-data';
import { activeChallenges } from '@/lib/portal/mock-data';
import { buildChallengeCheckoutUrl } from '@/lib/portal/payments';

export default function MembershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Membresías Crow"
        title={'TU RITMO.\n*TU PLAN.*'}
        description="Opciones simples y transparentes para que elijas cómo empezar. Sin procesos complicados: selecciona tu plan y da el siguiente paso."
        image="/fotos/logo-flatlay.jpg"
        primaryHref="#planes"
        primaryLabel="Ver planes"
      />

      <section id="planes" className="bg-black py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="mb-10 flex items-start gap-4 rounded-2xl border border-brand/40 bg-gradient-to-r from-brand/20 via-brand/10 to-transparent px-5 py-4 sm:px-6">
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-white">
              <CreditCard className="size-5" />
            </span>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand-light">
                Pago en línea disponible
              </p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-200 sm:text-base">
                Ya puedes pagar tu membresía, visita, inscripción o retos en línea con tarjeta, de forma
                segura y con activación inmediata.
              </p>
            </div>
          </div>

          <SectionHeading
            eyebrow="Elige tu membresía"
            title="ENTRENA A *TU MANERA.*"
            description="Precios en pesos mexicanos. Elige tu plan y completa el pago en línea cuando quieras."
          />
          <div className="mt-16">
            <MembershipCards />
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-white/30 bg-[#111] px-6 py-5 sm:flex-row">
            <div>
              <p className="text-sm font-bold text-white">¿Ya eres miembro Crow?</p>
              <p className="mt-1 text-xs text-zinc-400">
                Renueva o paga tu plan en línea sin inscripción adicional.
              </p>
            </div>
            <Link
              href="/checkout?tipo=renovar&plan=mensual"
              className="inline-flex rounded-full bg-brand px-6 py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-brand-dark"
            >
              Pagar como miembro
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#090909] py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Más flexibilidad"
              title={'OTRAS FORMAS\nDE *ENTRENAR.*'}
              description="¿Todavía no quieres una membresía? También contamos con periodos cortos, tarjetas de visitas y retos con inscripción. Todos estos costos se pueden pagar en línea desde la web."
            />
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand/35 bg-brand/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-brand-light">
              <CreditCard className="size-3.5" />
              Pago en línea habilitado
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-brand/50 bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(201,54,232,0.25),0_20px_60px_rgba(201,54,232,0.2)]">
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-brand/25 blur-3xl" />
            <div className="absolute -bottom-12 -left-8 size-36 rounded-full bg-brand-dark/30 blur-3xl" />

            <div className="relative flex items-center justify-between bg-gradient-to-r from-brand to-brand-dark px-7 py-5">
              <h3 className="font-display text-xl font-black uppercase text-white">Costos Crow</h3>
              <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur">
                En línea
              </span>
            </div>

            <div className="relative">
              {otherRates.map((rate) => (
                <div
                  key={rate.id}
                  className="flex items-center justify-between border-t border-white/10 px-7 py-5"
                >
                  <span className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                    {rate.label}
                  </span>
                  <span className="font-mono text-xl font-bold text-white">
                    ${rate.price.toLocaleString('es-MX')}
                  </span>
                </div>
              ))}

              <div className="border-t border-white/10 bg-brand/10 px-7 py-3">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-light">
                  Retos · Inscripción
                </p>
              </div>

              {activeChallenges.map((challenge) => (
                <Link
                  key={challenge.id}
                  href={buildChallengeCheckoutUrl(challenge.id, challenge.price)}
                  className="flex items-center justify-between border-t border-white/10 px-7 py-5 transition-colors hover:bg-white/5"
                >
                  <span className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                    {challenge.title}
                  </span>
                  <span className="font-mono text-xl font-bold text-brand-light">
                    ${challenge.price.toLocaleString('es-MX')}
                  </span>
                </Link>
              ))}
            </div>

            <div className="relative border-t border-white/10 bg-black/40 p-6">
              <p className="mb-4 text-center text-sm leading-relaxed text-zinc-400">
                Paga semana, quincena, tarjeta de visitas, inscripción o retos con tarjeta, sin ir a
                recepción.
              </p>
              <Link
                href="/checkout?tipo=renovar&plan=visita"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-brand/30 transition-colors hover:bg-brand-dark"
              >
                <CreditCard className="size-4" />
                Pagar en línea
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_420px]">
          <div>
            <SectionHeading
              eyebrow="Entrena acompañado"
              title={'INVITA A TUS AMIGOS,\n*ENTRENA GRATIS.*'}
              description="Por cada amigo que invites a inscribirse recibes 25% de descuento en tu mensualidad. Con cuatro amigos, tu mes es gratis."
            />
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['1 amigo', '25% off'],
                ['2 amigos', '50% off'],
                ['3 amigos', '75% off'],
                ['4 amigos', '¡Gratis!'],
              ].map(([friends, discount]) => (
                <div key={friends} className="rounded-2xl border-2 border-brand/45 bg-[#0b0b0b] p-5 text-center">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    {friends}
                  </p>
                  <p className="mt-2 font-display text-2xl font-black uppercase text-brand">{discount}</p>
                </div>
              ))}
            </div>
          </div>
          <figure className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-3xl border-2 border-white/25">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fotos/promo-referidos.jpg"
              alt="Promoción de referidos Crow: descuentos por cada amigo inscrito"
              className="w-full"
            />
          </figure>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
