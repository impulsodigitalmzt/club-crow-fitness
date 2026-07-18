'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';
import { Loader2, LockKeyhole } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'No se pudo iniciar sesión.');
        return;
      }

      router.push(next.startsWith('/admin') ? next : '/admin');
      router.refresh();
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(201,54,232,.18),transparent_40%),#050505] px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-[1.75rem] border-[3px] border-zinc-500 bg-zinc-900 p-8 shadow-2xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Crow Fitness Club" className="mx-auto size-16 object-contain" />
        <p className="mt-6 text-center font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-brand">
          Crow Admin
        </p>
        <h1 className="mt-2 text-center font-display text-3xl font-black uppercase text-white">
          Iniciar sesión
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Acceso al panel administrativo del gimnasio.
        </p>

        <label className="mt-8 block">
          <span className="mb-2 block text-xs font-semibold text-zinc-300">Correo</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-white/30 bg-zinc-800 px-4 py-3.5 text-sm text-white outline-none focus:border-brand"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-2 block text-xs font-semibold text-zinc-300">Contraseña</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/30 bg-zinc-800 px-4 py-3.5 text-sm text-white outline-none focus:border-brand"
          />
        </label>

        {error ? (
          <p className="mt-4 rounded-lg bg-rose-500/15 px-3 py-2 text-xs text-rose-300">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-brand-dark disabled:opacity-70"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <LockKeyhole className="size-4" />}
          Entrar al panel
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#050505] text-zinc-400">
          Cargando...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
