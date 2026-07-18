'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Loader2, LockKeyhole } from 'lucide-react';
import { loginFromLocalStorage } from '@/lib/portal/auth-session';
import { getUserByEmail, loadUsers } from '@/lib/portal/users';
import '@/app/app/portal.css';

function MemberLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/app';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Asegura DB local (seed demo) en este dispositivo
      loadUsers();

      const existing = getUserByEmail(email);
      if (!existing) {
        setError('Este correo no está registrado. Únete al club primero.');
        return;
      }

      const user = loginFromLocalStorage(email, password);
      if (!user) {
        setError('Contraseña incorrecta.');
        return;
      }

      // Cookie solo para middleware de /app (la fuente de verdad es localStorage)
      const response = await fetch('/api/member/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password, name: user.name }),
      });

      if (!response.ok) {
        setError('No se pudo iniciar sesión. Intenta de nuevo.');
        return;
      }

      router.push(next.startsWith('/app') ? next : '/app');
      router.refresh();
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="portal-app flex min-h-dvh items-center justify-center px-5 py-10">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-[1.75rem] border-[3px] border-zinc-500 bg-[var(--portal-card)] p-7"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Crow" className="mx-auto size-14 object-contain" />
        <p className="mt-5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--portal-brand-light)]">
          Acceso socios
        </p>
        <h1 className="mt-2 text-center font-display text-3xl font-black uppercase text-white">
          Entra a Crow App
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Tu sesión se guarda en este dispositivo (localStorage).
        </p>

        <label className="mt-8 block">
          <span className="mb-2 block text-xs font-semibold text-zinc-300">Correo</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="socio@crowfitness.mx"
            className="w-full rounded-xl border border-white/20 bg-zinc-900 px-4 py-3.5 text-sm text-white outline-none focus:border-[var(--portal-brand)]"
          />
        </label>
        <label className="mt-4 block">
          <span className="mb-2 block text-xs font-semibold text-zinc-300">Contraseña</span>
          <input
            type="password"
            required
            minLength={6}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-zinc-900 px-4 py-3.5 text-sm text-white outline-none focus:border-[var(--portal-brand)]"
          />
        </label>

        {error ? (
          <p className="mt-4 rounded-lg bg-rose-500/15 px-3 py-2 text-xs text-rose-300">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--portal-brand)] py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-[var(--portal-brand-dark)] disabled:opacity-70"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <LockKeyhole className="size-4" />}
          Entrar
        </button>

        <Link
          href="/app/registro"
          className="mt-4 flex w-full justify-center rounded-2xl border border-white/15 py-4 text-xs font-black uppercase tracking-wider text-white hover:border-[var(--portal-brand)]"
        >
          Aún no soy socio · Únete
        </Link>
      </form>
    </div>
  );
}

export default function MemberLoginPage() {
  return (
    <Suspense fallback={<div className="portal-app min-h-dvh" />}>
      <MemberLoginForm />
    </Suspense>
  );
}
