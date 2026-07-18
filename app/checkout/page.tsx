'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  ChevronLeft,
  CreditCard,
  Loader2,
  LockKeyhole,
  Mail,
  MessageCircle,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { DigitalPassCard } from '@/components/digital-pass-card';
import {
  createDigitalPass,
  loadDigitalPass,
  saveDigitalPass,
  type DigitalPass,
} from '@/lib/digital-pass';
import { enrollmentFee, membershipPlans } from '@/lib/site-data';

type PlanId = (typeof membershipPlans)[number]['id'];
type NotificationStatus = 'idle' | 'sending' | 'sent';
type PayerType = 'nuevo' | 'miembro';

const confettiColors = ['#C936E8', '#F0ABFC', '#ffffff', '#7C4DA4', '#fbbf24'];

function PaymentConfetti() {
  const pieces = Array.from({ length: 90 }, (_, index) => ({
    id: index,
    left: `${(index * 37) % 100}%`,
    delay: `${(index % 15) * 0.06}s`,
    duration: `${2.8 + (index % 7) * 0.25}s`,
    color: confettiColors[index % confettiColors.length],
    rotate: `${(index * 71) % 360}deg`,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute -top-5 h-3 w-2 animate-[checkout-confetti_var(--duration)_cubic-bezier(.2,.7,.3,1)_var(--delay)_forwards] rounded-sm"
          style={{
            left: piece.left,
            backgroundColor: piece.color,
            rotate: piece.rotate,
            '--delay': piece.delay,
            '--duration': piece.duration,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes checkout-confetti {
          0% { transform: translate3d(0, -5vh, 0) rotate(0deg); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate3d(var(--drift, 45px), 110vh, 0) rotate(760deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function CheckoutPage() {
  const [planId, setPlanId] = useState<PlanId>('mensual');
  const [payerType, setPayerType] = useState<PayerType>('nuevo');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [pass, setPass] = useState<DigitalPass | null>(null);
  const [notificationStatus, setNotificationStatus] = useState<NotificationStatus>('idle');
  const [orderId] = useState(() => `CRW-${Math.floor(100000 + Math.random() * 900000)}`);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selected = params.get('plan');
    if (membershipPlans.some((plan) => plan.id === selected)) {
      setPlanId(selected as PlanId);
    }

    const tipo = params.get('tipo');
    const isMemberFlow = tipo === 'renovar' || tipo === 'miembro';
    setPayerType(isMemberFlow ? 'miembro' : 'nuevo');

    const existing = loadDigitalPass();
    if (existing) {
      const [first = '', ...rest] = existing.name.split(' ');
      setFirstName(first);
      setLastName(rest.join(' '));
      setEmail(existing.email);
      if (existing.phone) setPhone(existing.phone);
      if (!selected && existing.planId) {
        const match = membershipPlans.find((plan) => plan.id === existing.planId);
        if (match) setPlanId(match.id);
      }
      if (isMemberFlow || existing.name) setPayerType('miembro');
    }
  }, []);

  const plan = membershipPlans.find((item) => item.id === planId) ?? membershipPlans[1];
  const isMember = payerType === 'miembro';
  const enrollment = plan.id === 'visita' || isMember ? 0 : enrollmentFee;
  const total = plan.price + enrollment;

  const fullName = useMemo(
    () => `${firstName.trim()} ${lastName.trim()}`.trim(),
    [firstName, lastName],
  );

  function formatCard(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(digits.replace(/(\d{4})(?=\d)/g, '$1 '));
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    setExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
  }

  function submitPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProcessing(true);

    window.setTimeout(() => {
      const existing = loadDigitalPass();
      const nextPass = createDigitalPass({
        name: fullName,
        email,
        phone,
        planId: plan.id,
        orderId,
        memberId: isMember && existing?.memberId ? existing.memberId : undefined,
      });

      saveDigitalPass(nextPass);
      setPass(nextPass);
      setProcessing(false);
      setCompleted(true);
    }, 1800);
  }

  useEffect(() => {
    if (!completed) return;
    setNotificationStatus('sending');
    const timer = window.setTimeout(() => setNotificationStatus('sent'), 2200);
    return () => window.clearTimeout(timer);
  }, [completed]);

  if (completed && pass) {
    return (
      <section className="min-h-screen bg-[radial-gradient(circle_at_50%_20%,rgba(201,54,232,.2),transparent_35%),#050505] px-4 pb-24 pt-28 sm:px-5 sm:pt-32">
        <PaymentConfetti />
        <div className="mx-auto w-full max-w-2xl rounded-[1.5rem] border-[3px] border-zinc-500 bg-zinc-900 p-5 text-center shadow-2xl shadow-brand/10 sm:rounded-[2rem] sm:p-10 md:p-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Crow Fitness Club" className="mx-auto mb-6 size-14 object-contain sm:mb-8 sm:size-16" />
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand text-white sm:size-20">
            <Check className="size-8 stroke-[3] sm:size-10" />
          </span>
          <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-brand sm:mt-8">
            Pago aprobado
          </p>
          <h1 className="mt-3 font-display text-3xl font-black uppercase leading-none text-white sm:text-4xl md:text-5xl">
            {isMember ? (
              <>
                Membresía <span className="text-gradient-brand">renovada</span>
              </>
            ) : (
              <>
                Bienvenido a <span className="text-gradient-brand">Crow</span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-zinc-400">
            {isMember
              ? `Tu plan ${plan.title} quedó pagado. Presenta tu pase digital al llegar.`
              : `Tu membresía ${plan.title} quedó registrada. Presenta tu pase digital al llegar.`}
          </p>

          <div className="mt-8 text-left">
            <DigitalPassCard pass={pass} />
          </div>

          <div className="mt-6 rounded-2xl border-[3px] border-zinc-500 bg-zinc-900 p-4 text-left text-sm sm:p-5">
            <div className="flex justify-between gap-3">
              <span className="text-zinc-500">Folio</span>
              <span className="break-all font-mono text-right text-white">{orderId}</span>
            </div>
            <div className="mt-3 flex justify-between gap-3">
              <span className="text-zinc-500">Vigencia</span>
              <span className="font-bold text-brand-light">Hasta {pass.expiresAt}</span>
            </div>
            <div className="mt-3 flex justify-between gap-3 border-t border-white/10 pt-3">
              <span className="font-bold text-white">Total pagado</span>
              <span className="font-display text-xl font-black text-brand sm:text-2xl">
                ${total.toLocaleString('es-MX')} MXN
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border-[3px] border-zinc-500 bg-zinc-900 p-4 text-left sm:p-5" aria-live="polite">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-brand">
              Envío de tarjeta digital
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {notificationStatus === 'sent'
                ? 'Tu tarjeta digital ya fue enviada por WhatsApp y correo electrónico.'
                : 'Estamos enviando tu tarjeta digital por WhatsApp y correo electrónico...'}
            </p>
            <div className="mt-4 space-y-3">
              <NotificationRow
                icon={MessageCircle}
                label="WhatsApp"
                destination={phone}
                status={notificationStatus}
                detail="Tarjeta digital con tu nombre y vigencia"
              />
              <NotificationRow
                icon={Mail}
                label="Correo electrónico"
                destination={email}
                status={notificationStatus}
                detail="Tarjeta digital adjunta en el mensaje"
              />
            </div>
            {notificationStatus === 'sent' ? (
              <p className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-xs font-semibold text-emerald-300">
                <Check className="size-4 shrink-0" />
                Tarjeta digital enviada correctamente
              </p>
            ) : null}
          </div>

          <Link
            href="/pase-digital"
            className="mt-8 flex w-full justify-center rounded-xl bg-brand py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-brand-dark"
          >
            Ver mi pase digital
          </Link>
          <Link href="/" className="mt-4 inline-flex text-xs text-zinc-500 hover:text-white">
            Volver al inicio
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#050505] pb-24 pt-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Link href="/membresias" className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white">
          <ChevronLeft className="size-4" /> Volver a membresías
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
          <form onSubmit={submitPayment} autoComplete="off" className="rounded-[2rem] border-[3px] border-zinc-500 bg-[#141414] p-7 sm:p-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-7">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-brand">
                  {isMember ? 'Pago de membresía' : 'Finalizar inscripción'}
                </p>
                <h1 className="mt-2 font-display text-3xl font-black uppercase text-white">
                  Datos de pago
                </h1>
              </div>
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <LockKeyhole className="size-4 text-brand" /> Pago seguro
              </span>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-2 rounded-2xl border-[3px] border-zinc-500 bg-black/40 p-1.5">
              <button
                type="button"
                onClick={() => setPayerType('nuevo')}
                className={`rounded-xl px-3 py-3 text-xs font-bold uppercase tracking-wider transition ${
                  !isMember ? 'bg-brand text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Soy nuevo
              </button>
              <button
                type="button"
                onClick={() => setPayerType('miembro')}
                className={`rounded-xl px-3 py-3 text-xs font-bold uppercase tracking-wider transition ${
                  isMember ? 'bg-brand text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Ya soy miembro
              </button>
            </div>

            {isMember ? (
              <p className="mt-4 flex items-start gap-2 rounded-xl border border-brand/25 bg-brand/10 px-4 py-3 text-xs leading-relaxed text-zinc-300">
                <UserRound className="mt-0.5 size-4 shrink-0 text-brand" />
                Renueva o paga tu plan actual. No se cobra inscripción adicional.
              </p>
            ) : null}

            <fieldset className="mt-8">
              <legend className="mb-5 text-sm font-bold text-white">1. Información de contacto</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre" value={firstName} onChange={setFirstName} required />
                <Field label="Apellidos" value={lastName} onChange={setLastName} required />
                <Field
                  label="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  required
                  className="sm:col-span-2"
                />
                <Field
                  label="Teléfono"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  required
                  className="sm:col-span-2"
                />
              </div>
            </fieldset>

            <fieldset className="mt-8 border-t border-white/10 pt-8">
              <legend className="mb-5 text-sm font-bold text-white">2. Plan a pagar</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {membershipPlans.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPlanId(item.id)}
                    className={`rounded-2xl border-[3px] px-4 py-4 text-left transition ${
                      planId === item.id
                        ? 'border-brand bg-brand/15'
                        : 'border-zinc-500 bg-zinc-900 hover:border-zinc-400'
                    }`}
                  >
                    <p className="text-xs font-bold uppercase text-white">{item.title}</p>
                    <p className="mt-2 font-display text-2xl font-black text-brand">
                      ${item.price.toLocaleString('es-MX')}
                    </p>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-10 border-t border-white/10 pt-8">
              <legend className="mb-5 text-sm font-bold text-white">3. Tarjeta de crédito o débito</legend>
              <div className="rounded-2xl border-[3px] border-zinc-500 bg-zinc-900 p-5">
                <label className="block">
                  <span className="mb-2 flex items-center justify-between text-xs font-semibold text-zinc-300">
                    Número de tarjeta
                    <span className="flex items-center gap-1 font-mono text-[9px] font-bold text-zinc-400">
                      VISA · MC · AMEX
                    </span>
                  </span>
                  <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-zinc-800 px-4 transition-colors focus-within:border-brand hover:border-white/50">
                    <CreditCard className="size-5 text-zinc-400" />
                    <input
                      value={cardNumber}
                      onChange={(event) => formatCard(event.target.value)}
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-transparent py-4 font-mono text-sm text-white outline-none placeholder:text-zinc-500"
                      required
                      minLength={15}
                    />
                  </div>
                </label>
                <label className="mt-4 block">
                  <span className="mb-2 block text-xs font-semibold text-zinc-300">Nombre en la tarjeta</span>
                  <input
                    placeholder="COMO APARECE EN LA TARJETA"
                    className="w-full rounded-xl border border-white/30 bg-zinc-800 px-4 py-4 text-sm uppercase text-white outline-none transition-colors placeholder:text-zinc-500 hover:border-white/50 focus:border-brand"
                    required
                  />
                </label>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <label>
                    <span className="mb-2 block text-xs font-semibold text-zinc-300">Vencimiento</span>
                    <input
                      value={expiry}
                      onChange={(event) => formatExpiry(event.target.value)}
                      inputMode="numeric"
                      placeholder="MM/AA"
                      className="w-full rounded-xl border border-white/30 bg-zinc-800 px-4 py-4 font-mono text-sm text-white outline-none transition-colors placeholder:text-zinc-500 hover:border-white/50 focus:border-brand"
                      required
                      minLength={5}
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-xs font-semibold text-zinc-300">CVV</span>
                    <input
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="•••"
                      className="w-full rounded-xl border border-white/30 bg-zinc-800 px-4 py-4 font-mono text-sm text-white outline-none transition-colors placeholder:text-zinc-500 hover:border-white/50 focus:border-brand"
                      required
                    />
                  </label>
                </div>
              </div>
            </fieldset>

            <label className="mt-7 flex items-start gap-3 text-xs leading-relaxed text-zinc-300">
              <input type="checkbox" required className="mt-0.5 size-4 accent-[#C936E8]" />
              <span>
                Acepto los términos de membresía, el reglamento de las instalaciones y el cargo
                correspondiente al plan seleccionado.
              </span>
            </label>

            <button
              disabled={processing}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-brand-dark disabled:bg-brand-dark"
            >
              {processing ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Procesando pago...
                </>
              ) : (
                `Pagar $${total.toLocaleString('es-MX')} MXN`
              )}
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-[10px] text-zinc-600">
              <ShieldCheck className="size-3.5" /> Transacción protegida con cifrado SSL de 256 bits
            </p>
          </form>

          <aside className="rounded-[2rem] border-[3px] border-zinc-500 bg-[#141414] p-7 sm:p-9 lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-brand">
                Resumen de compra
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Crow Fitness Club" className="size-10 object-contain" />
            </div>
            <div className="mt-7 rounded-2xl bg-[radial-gradient(circle_at_100%_0%,rgba(201,54,232,.3),transparent_40%),#151515] p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                {isMember ? 'Renovación' : 'Membresía seleccionada'}
              </p>
              <h2 className="mt-2 font-display text-3xl font-black uppercase text-white">{plan.title}</h2>
              <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>
            </div>
            <div className="mt-7 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">{plan.title}</span>
                <span className="text-white">${plan.price.toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Inscripción</span>
                <span className="text-white">
                  {enrollment ? `$${enrollment.toLocaleString('es-MX')}` : isMember ? 'No aplica' : 'Incluida'}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-5">
                <span className="font-bold text-white">Total</span>
                <span className="font-display text-3xl font-black text-brand">
                  ${total.toLocaleString('es-MX')} <small className="text-xs text-zinc-500">MXN</small>
                </span>
              </div>
            </div>
            <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-xs text-zinc-500">
              <p className="flex gap-2">
                <Check className="size-4 text-brand" /> Pase digital con tu nombre y vigencia
              </p>
              <p className="flex gap-2">
                <Check className="size-4 text-brand" /> Confirmación por WhatsApp y correo
              </p>
              <p className="flex gap-2">
                <Check className="size-4 text-brand" /> Activación inmediata al pagar
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function NotificationRow({
  icon: Icon,
  label,
  destination,
  status,
  detail,
}: {
  icon: typeof MessageCircle;
  label: string;
  destination: string;
  status: NotificationStatus;
  detail?: string;
}) {
  const sent = status === 'sent';

  return (
    <div className="flex items-center gap-3 rounded-xl border-[3px] border-zinc-500 bg-zinc-900 p-3.5">
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
          sent ? 'bg-emerald-500/15 text-emerald-400' : 'bg-brand/15 text-brand'
        }`}
      >
        {status === 'sending' ? <Loader2 className="size-5 animate-spin" /> : <Icon className="size-5" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-white">{label}</p>
        <p className="truncate text-[11px] text-zinc-500">{destination}</p>
        {detail ? <p className="mt-0.5 truncate text-[10px] text-zinc-600">{detail}</p> : null}
      </div>
      <span
        className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
          sent ? 'text-emerald-400' : 'text-zinc-500'
        }`}
      >
        {sent ? (
          <>
            <Check className="size-3.5" /> Enviado
          </>
        ) : (
          'Enviando...'
        )}
      </span>
    </div>
  );
}

function Field({
  label,
  type = 'text',
  required = false,
  className = '',
  value,
  onChange,
}: {
  label: string;
  type?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-semibold text-zinc-300">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className="w-full rounded-xl border border-white/30 bg-zinc-800 px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 hover:border-white/50 focus:border-brand"
      />
    </label>
  );
}
