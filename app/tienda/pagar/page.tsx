'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, Loader2, MapPin, Sparkles } from 'lucide-react';
import { useCart } from '@/components/portal/cart-context';
import { ShopPickupNotice } from '@/components/shop/pickup-notice';
import {
  CART_STORAGE_KEY,
  MEMBER_SHOP_DISCOUNT,
  pickupBranches,
} from '@/lib/portal/store-data';

function ShopPayContent() {
  const router = useRouter();
  const params = useSearchParams();
  const montoParam = Number(params.get('monto') || 0);
  const titulo = params.get('titulo') || 'Pedido Tienda Crow';
  const socioParam = params.get('socio') === '1';

  const { items, clearCart, subtotal, discount, total, isMember, refreshMember } = useCart();
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [branchId, setBranchId] = useState<(typeof pickupBranches)[number]['id']>('el-toreo');

  useEffect(() => {
    refreshMember();
  }, [refreshMember]);

  const amount = total > 0 ? total : montoParam;
  const memberApplied = isMember || socioParam;

  function pay() {
    setProcessing(true);
    window.setTimeout(() => {
      clearCart();
      window.localStorage.setItem(CART_STORAGE_KEY, '[]');
      setProcessing(false);
      setDone(true);
    }, 1400);
  }

  if (done) {
    const branch = pickupBranches.find((b) => b.id === branchId) ?? pickupBranches[0];
    return (
      <div className="mx-auto max-w-lg px-5 py-16">
        <div className="rounded-[1.75rem] border border-emerald-500/30 bg-[#121214] p-8 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <Check className="size-8" />
          </span>
          <h1 className="mt-5 font-display text-3xl font-black uppercase text-white">
            ¡Compra confirmada!
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Pago confirmado por ${amount.toLocaleString('es-MX')} MXN.
            {memberApplied ? ' Incluye descuento de socio.' : ''}
          </p>
          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-4 text-left text-sm text-amber-100">
            <p className="flex items-start gap-2 font-bold uppercase tracking-wider text-amber-200">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              Recoge en {branch.name}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-amber-100/80">{branch.address}</p>
            <p className="mt-3 text-xs text-amber-100/70">
              No hay servicio a domicilio. Presenta este comprobante en recepción.
            </p>
          </div>
          <Link
            href="/tienda"
            className="mt-8 flex w-full justify-center rounded-2xl bg-brand py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-brand-dark"
          >
            Seguir comprando
          </Link>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="mt-3 w-full text-xs font-bold text-zinc-500 hover:text-white"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-5 px-5 py-12 sm:py-16">
      <header>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand-light">
          Pago en línea
        </p>
        <h1 className="mt-1 font-display text-3xl font-black uppercase text-white">Checkout tienda</h1>
        <p className="mt-2 text-sm text-zinc-400">
            Pago seguro con tarjeta. Recoges en la sucursal que elijas.
          </p>
      </header>

      <ShopPickupNotice />

      <div className="rounded-[1.75rem] border border-white/10 bg-[#121214] p-6">
        <p className="text-sm text-zinc-400">Concepto</p>
        <p className="mt-1 font-display text-2xl font-black uppercase text-white">{titulo}</p>

        {items.length > 0 ? (
          <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-zinc-400">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-3">
                <span className="truncate text-zinc-300">
                  {item.qty}× {item.name}
                </span>
                <span className="shrink-0 text-white">
                  ${(item.price * item.qty).toLocaleString('es-MX')}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-4 space-y-1 border-t border-white/10 pt-4 text-sm">
          <div className="flex justify-between text-zinc-400">
            <span>Subtotal</span>
            <span className="text-white">
              ${(subtotal || montoParam).toLocaleString('es-MX')}
            </span>
          </div>
          {memberApplied && discount > 0 ? (
            <div className="flex justify-between text-emerald-400">
              <span>Descuento socio ({Math.round(MEMBER_SHOP_DISCOUNT * 100)}%)</span>
              <span>-${discount.toLocaleString('es-MX')}</span>
            </div>
          ) : null}
        </div>

        <p className="mt-4 font-display text-4xl font-black text-brand-light">
          ${amount.toLocaleString('es-MX')} <span className="text-sm text-zinc-500">MXN</span>
        </p>
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-[#121214] p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Sucursal de recolección
        </p>
        <div className="mt-3 space-y-2">
          {pickupBranches.map((branch) => (
            <button
              key={branch.id}
              type="button"
              onClick={() => setBranchId(branch.id)}
              className={`flex w-full flex-col rounded-xl border px-4 py-3 text-left transition ${
                branchId === branch.id
                  ? 'border-brand bg-brand/15'
                  : 'border-white/10 hover:border-white/25'
              }`}
            >
              <span className="text-sm font-bold text-white">{branch.name}</span>
              <span className="mt-0.5 text-xs text-zinc-500">{branch.address}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={processing || amount <= 0}
        onClick={pay}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand py-4 text-sm font-black uppercase tracking-wider text-white hover:bg-brand-dark disabled:opacity-70"
      >
        {processing ? <Loader2 className="size-5 animate-spin" /> : <Sparkles className="size-5" />}
        {processing ? 'Procesando pago...' : 'Pagar ahora'}
      </button>

      <button
        type="button"
        onClick={() => router.push('/tienda')}
        className="w-full text-center text-xs font-bold text-zinc-500 hover:text-white"
      >
        Volver a la tienda
      </button>
    </div>
  );
}

export default function TiendaPagarPage() {
  return (
    <div className="min-h-[70vh] bg-black">
      <Suspense fallback={<div className="p-10 text-zinc-500">Cargando pago...</div>}>
        <ShopPayContent />
      </Suspense>
    </div>
  );
}
