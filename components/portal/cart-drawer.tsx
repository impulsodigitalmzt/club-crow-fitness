'use client';

import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/portal/cart-context';
import { ShopPickupNotice } from '@/components/shop/pickup-notice';
import { MEMBER_SHOP_DISCOUNT } from '@/lib/portal/store-data';

export function CartDrawer() {
  const {
    items,
    open,
    setOpen,
    subtotal,
    discount,
    total,
    isMember,
    setQty,
    removeItem,
    count,
    checkoutUrl,
  } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
        aria-label="Cerrar carrito"
        onClick={() => setOpen(false)}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="relative z-10 flex max-h-[88dvh] w-full max-w-lg flex-col rounded-t-[1.75rem] border border-white/10 bg-[#121214] text-white shadow-2xl sm:mx-4 sm:rounded-[1.75rem]"
      >
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-light">
              Carrito
            </p>
            <h2 id="cart-title" className="font-display text-xl font-black uppercase text-white">
              {count} {count === 1 ? 'artículo' : 'artículos'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-xl border border-white/10 p-2.5 text-zinc-400 hover:text-white"
            aria-label="Cerrar"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="py-10 text-center">
              <ShoppingBag className="mx-auto size-10 text-zinc-600" />
              <p className="mt-3 text-sm text-zinc-500">Tu carrito está vacío</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-light"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-black/40 p-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt=""
                    className="size-16 shrink-0 rounded-xl object-cover bg-zinc-800"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">{item.name}</p>
                    <p className="mt-0.5 text-sm font-semibold text-brand-light">
                      ${item.price.toLocaleString('es-MX')}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/50 p-1">
                        <button
                          type="button"
                          className="flex size-9 items-center justify-center rounded-full text-white active:bg-white/10"
                          onClick={() => setQty(item.productId, item.qty - 1)}
                          aria-label="Menos"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-bold text-white">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          className="flex size-9 items-center justify-center rounded-full text-white active:bg-white/10"
                          onClick={() => setQty(item.productId, item.qty + 1)}
                          aria-label="Más"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="flex size-9 items-center justify-center rounded-full text-zinc-500 hover:text-rose-400"
                        aria-label="Quitar"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <ShopPickupNotice compact />
            </>
          )}
        </div>

        {items.length > 0 ? (
          <footer className="border-t border-white/10 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="mb-2 space-y-1 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toLocaleString('es-MX')}</span>
              </div>
              {isMember ? (
                <div className="flex justify-between text-emerald-400">
                  <span>Descuento socio ({Math.round(MEMBER_SHOP_DISCOUNT * 100)}%)</span>
                  <span>-${discount.toLocaleString('es-MX')}</span>
                </div>
              ) : (
                <p className="text-[11px] text-zinc-500">
                  Socios Crow: {Math.round(MEMBER_SHOP_DISCOUNT * 100)}% off ·{' '}
                  <Link href="/app/login?next=/tienda" className="text-brand-light underline">
                    Entrar
                  </Link>
                </p>
              )}
              <div className="flex items-center justify-between pt-1">
                <span className="font-bold text-white">Total</span>
                <span className="font-display text-2xl font-black text-white">
                  ${total.toLocaleString('es-MX')}{' '}
                  <span className="text-xs font-semibold text-zinc-500">MXN</span>
                </span>
              </div>
            </div>
            <Link
              href={checkoutUrl}
              onClick={() => setOpen(false)}
              className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-brand text-sm font-black uppercase tracking-wider text-white hover:bg-brand-dark"
            >
              Proceder al pago
            </Link>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}

export function CartHeaderButton() {
  const { count, setOpen } = useCart();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="relative flex size-9 items-center justify-center rounded-full border border-white/15 text-zinc-400 transition hover:border-brand/50 hover:text-brand-light"
      aria-label="Abrir carrito"
    >
      <ShoppingBag className="size-4" />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-brand text-[9px] font-black text-white">
          {count > 9 ? '9+' : count}
        </span>
      ) : null}
    </button>
  );
}
