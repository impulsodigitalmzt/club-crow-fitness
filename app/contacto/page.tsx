'use client';

import { useState } from 'react';
import { Check, Clock3, Instagram, MapPin, MessageCircle, Navigation, Phone, Send, X } from 'lucide-react';
import { PageHero } from '@/components/page-hero';

type Panel = 'chat' | 'phone' | 'instagram' | null;

export default function ContactPage() {
  const [panel, setPanel] = useState<Panel>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    if (!message.trim()) return;
    setMessages((current) => [...current, message.trim()]);
    setMessage('');
  }

  return (
    <>
      <PageHero
        eyebrow="Hablemos"
        title={'TU SIGUIENTE PASO\n*EMPIEZA AQUÍ.*'}
        description="Cuéntanos qué buscas y nuestro equipo te ayudará a elegir la membresía, clase o acompañamiento adecuado."
        image="/fotos/comunidad-tres.jpg"
        imagePosition="center 30%"
        primaryHref="#contacto"
        primaryLabel="Enviar consulta"
      />

      <section id="contacto" className="bg-black py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-brand">Contacto directo</p>
            <h2 className="mt-4 font-display text-4xl font-black uppercase leading-none text-white">Estamos listos para <span className="text-gradient-brand">ayudarte.</span></h2>
            <div className="mt-10 space-y-4">
              <ContactItem icon={MessageCircle} title="WhatsApp" text="669 158 7875" onClick={() => setPanel('chat')} />
              <ContactItem icon={Phone} title="Teléfono" text="669 158 7875" onClick={() => setPanel('phone')} />
              <ContactItem icon={Instagram} title="Instagram" text="@crowfitnessclub" onClick={() => setPanel('instagram')} />
              <ContactItem icon={MapPin} title="Sucursales" text="El Toreo y Real del Valle, Mazatlán" />
              <ContactItem icon={Clock3} title="Horario" text="Lunes a domingo · 5:00 a.m. – 10:00 p.m." />
              <ContactItem icon={Clock3} title="Respuesta" text="Te contactamos dentro de 24 horas" />
            </div>
          </div>

          <form onSubmit={submitContact} className="rounded-3xl border border-brand/30 bg-[#141414] p-7 sm:p-10">
            {submitted ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-brand/15 text-brand"><Check className="size-8" /></span>
                <h2 className="mt-6 font-display text-3xl font-black uppercase text-white">Solicitud recibida</h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">Gracias por contactarnos. Uno de nuestros asesores revisará tus datos y continuará contigo.</p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-7 rounded-full border border-white/15 px-6 py-3 text-xs font-bold text-white hover:border-brand">Enviar otra consulta</button>
              </div>
            ) : (
              <>
                <p className="font-display text-2xl font-black uppercase text-white">Solicita información</p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field label="Nombre" required />
                  <Field label="Teléfono" type="tel" required />
                  <Field label="Correo" type="email" required />
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold text-zinc-300">Me interesa</span>
                    <select className="w-full rounded-xl border border-white/30 bg-zinc-800 px-4 py-4 text-sm text-white outline-none transition-colors hover:border-white/50 focus:border-brand">
                      <option>Membresías</option>
                      <option>Clases</option>
                      <option>Visitar el gimnasio</option>
                      <option>Coaching</option>
                    </select>
                  </label>
                </div>
                <label className="mt-5 block">
                  <span className="mb-2 block text-xs font-semibold text-zinc-300">Mensaje</span>
                  <textarea rows={5} placeholder="Cuéntanos qué estás buscando..." className="w-full resize-none rounded-xl border border-white/30 bg-zinc-800 px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 hover:border-white/50 focus:border-brand" />
                </label>
                <button className="mt-6 flex w-full justify-center rounded-xl bg-brand py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-brand-dark">
                  Enviar solicitud
                </button>
                <button type="button" onClick={() => setPanel('chat')} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-4 text-xs font-black uppercase tracking-wider text-white hover:border-brand">
                  <MessageCircle className="size-4" /> Continuar por WhatsApp
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#090909] py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-brand">Encuéntranos</p>
            <h2 className="mt-4 font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
              Dos sucursales en <span className="text-gradient-brand">Mazatlán.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Elige la más cercana. Ambas abren de 5:00 a.m. a 10:00 p.m.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Sucursal El Toreo */}
            <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-black">
              <div className="overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.8807289422825!2d-106.4389001!3d23.2474269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869f53006009ac9d%3A0xcdbe24509e2288ca!2sCrow%20Fitness%20Club!5e0!3m2!1ses-419!2smx!4v1784277478352!5m2!1ses-419!2smx"
                  title="Crow Fitness Club · Sucursal El Toreo"
                  className="h-56 w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="p-6 sm:p-7">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand">Sucursal 01</p>
                <h3 className="mt-2 font-display text-2xl font-black uppercase text-white">El Toreo</h3>
                <p className="mt-3 flex gap-3 text-sm leading-relaxed text-zinc-400">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                  Silverio Pérez, Ponciano Díaz 132, El Toreo, 82120 Mazatlán, Sin.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/fotos/gym1.JPG" alt="Fachada Crow El Toreo" className="absolute inset-0 size-full object-cover" />
                  </figure>
                  <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/fotos/gym.JPG" alt="Crow El Toreo de noche" className="absolute inset-0 size-full object-cover" />
                  </figure>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=23.2474269,-106.4389001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-brand-dark"
                >
                  <Navigation className="size-4" /> Cómo llegar · El Toreo
                </a>
              </div>
            </article>

            {/* Sucursal Real del Valle */}
            <article className="overflow-hidden rounded-[2rem] border border-brand/30 bg-black shadow-[0_0_40px_rgba(201,54,232,0.12)]">
              <figure className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/fotos/gym3.JPG"
                  alt="Fachada Crow Fitness Club Real del Valle"
                  className="absolute inset-0 size-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <figcaption className="absolute bottom-4 left-5 right-5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand-light">Sucursal 02</p>
                  <p className="mt-1 font-display text-2xl font-black uppercase text-white">Real del Valle</p>
                </figcaption>
              </figure>
              <div className="p-6 sm:p-7">
                <p className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                  Av. Paseo del Atlántico 4214, Real del Valle, 82124 Mazatlán, Sin.
                </p>
                <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                  <iframe
                    src="https://maps.google.com/maps?q=Av.+Paseo+del+Atl%C3%A1ntico+4214,+Real+del+Valle,+82124+Mazatl%C3%A1n,+Sin.&z=16&output=embed"
                    title="Crow Fitness Club · Sucursal Real del Valle"
                    className="h-48 w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                <a
                  href="https://maps.app.goo.gl/7WZFVo7XnTJMJnFY9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-brand-dark"
                >
                  <Navigation className="size-4" /> Cómo llegar · Real del Valle
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {panel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onMouseDown={() => setPanel(null)}>
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[#101010] shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            {panel === 'chat' && (
              <>
                <div className="flex items-center justify-between bg-[#075e54] px-5 py-4">
                  <div>
                    <p className="font-bold text-white">Crow Fitness Club</p>
                    <p className="text-[11px] text-white/70">en línea</p>
                  </div>
                  <button onClick={() => setPanel(null)} aria-label="Cerrar"><X className="size-5 text-white" /></button>
                </div>
                <div className="h-80 space-y-3 overflow-y-auto bg-[#0b141a] p-5">
                  <div className="max-w-[85%] rounded-xl rounded-tl-none bg-[#202c33] p-3 text-sm text-zinc-200">
                    ¡Hola! 👋 Bienvenido a Crow Fitness Club. ¿En qué podemos ayudarte?
                    <p className="mt-1 text-right text-[9px] text-zinc-500">18:42</p>
                  </div>
                  {messages.map((item, index) => (
                    <div key={`${item}-${index}`} className="ml-auto max-w-[85%] rounded-xl rounded-tr-none bg-[#005c4b] p-3 text-sm text-white">
                      {item}<p className="mt-1 text-right text-[9px] text-white/50">18:43 ✓✓</p>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="flex gap-2 bg-[#202c33] p-3">
                  <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Escribe un mensaje" className="min-w-0 flex-1 rounded-full bg-[#2a3942] px-4 py-3 text-sm text-white outline-none" />
                  <button className="flex size-11 items-center justify-center rounded-full bg-[#00a884] text-white" aria-label="Enviar"><Send className="size-4" /></button>
                </form>
              </>
            )}

            {panel === 'phone' && (
              <div className="flex min-h-[520px] flex-col items-center justify-center bg-gradient-to-b from-zinc-800 to-black p-8 text-center">
                <button onClick={() => setPanel(null)} className="absolute right-6 top-6" aria-label="Cerrar"><X className="size-5 text-white" /></button>
                <span className="flex size-24 items-center justify-center rounded-full bg-brand text-3xl font-black text-white">CF</span>
                <h2 className="mt-7 font-display text-2xl font-black text-white">Crow Fitness Club</h2>
                <p className="mt-2 text-sm text-zinc-400">Llamando al 669 158 7875...</p>
                <button onClick={() => setPanel(null)} className="mt-24 flex size-16 items-center justify-center rounded-full bg-red-500 text-white"><Phone className="size-6 rotate-[135deg]" /></button>
              </div>
            )}

            {panel === 'instagram' && (
              <div className="p-7">
                <div className="flex items-center justify-between">
                  <p className="font-display text-xl font-black text-white">Instagram</p>
                  <button onClick={() => setPanel(null)} aria-label="Cerrar"><X className="size-5 text-white" /></button>
                </div>
                <div className="mt-8 flex items-center gap-5">
                  <span className="flex size-20 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 via-fuchsia-500 to-violet-600 p-1">
                    <span className="flex size-full items-center justify-center rounded-full bg-black text-xl font-black text-white">CF</span>
                  </span>
                  <div>
                    <p className="font-bold text-white">@crowfitnessclub</p>
                    <p className="mt-1 text-sm text-zinc-500">Crow Fitness Club · Mazatlán</p>
                  </div>
                </div>
                <div className="mt-7 grid grid-cols-3 gap-3 border-y border-white/10 py-5 text-center text-xs text-zinc-400">
                  <p><strong className="block text-lg text-white">248</strong>publicaciones</p>
                  <p><strong className="block text-lg text-white">8.4K</strong>seguidores</p>
                  <p><strong className="block text-lg text-white">312</strong>seguidos</p>
                </div>
                <button className="mt-6 w-full rounded-lg bg-[#0095f6] py-3 text-sm font-bold text-white">Seguir</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ContactItem({ icon: Icon, title, text, onClick }: { icon: typeof Phone; title: string; text: string; onClick?: () => void }) {
  const className = 'flex w-full gap-4 rounded-2xl border border-white/10 p-5 text-left transition-colors hover:border-brand/30';
  const content = <>
    <Icon className="size-5 shrink-0 text-brand" />
    <span><span className="block text-xs font-bold uppercase tracking-wider text-white">{title}</span><span className="mt-1 block text-sm text-zinc-400">{text}</span></span>
  </>;
  return onClick ? <button type="button" onClick={onClick} className={className}>{content}</button> : <div className={className}>{content}</div>;
}

function Field({ label, type = 'text', required = false }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-zinc-300">{label}</span>
      <input type={type} required={required} className="w-full rounded-xl border border-white/30 bg-zinc-800 px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 hover:border-white/50 focus:border-brand" />
    </label>
  );
}
