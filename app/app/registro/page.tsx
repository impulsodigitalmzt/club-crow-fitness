'use client';

import Link from 'next/link';
import { RegisterForm } from '@/components/portal/register-form';
import { SignupProvider } from '@/components/portal/signup-context';
import '@/app/app/portal.css';

/**
 * Flujo Únete al Club — paso 2/3: plan + datos.
 * Al enviar → crea usuario en lib/portal/users.ts → /app/pagar?planId&monto
 */
export default function MemberRegisterPage() {
  return (
    <SignupProvider>
      <div className="portal-app min-h-dvh px-5 py-10">
        <div className="mx-auto w-full max-w-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Crow" className="mx-auto size-14 object-contain" />
          <p className="mt-5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--portal-brand-light)]">
            Únete al club
          </p>
          <h1 className="mt-2 text-center font-display text-3xl font-black uppercase text-white">
            Elige tu plan
          </h1>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Completa tus datos, paga en línea y entra al Portal del Socio.
          </p>

          <RegisterForm />

          <Link
            href="/app/login"
            className="mt-5 block text-center text-xs font-bold text-zinc-500 hover:text-white"
          >
            Ya soy socio · Iniciar sesión
          </Link>
        </div>
      </div>
    </SignupProvider>
  );
}
