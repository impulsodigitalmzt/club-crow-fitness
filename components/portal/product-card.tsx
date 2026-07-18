'use client';

import { CreditCard, ShoppingBag } from 'lucide-react';
import {
  isCrowMemberForDiscount,
  memberUnitPrice,
  MEMBER_SHOP_DISCOUNT,
  type ShopProduct,
} from '@/lib/portal/store-data';
import { useCart } from '@/components/portal/cart-context';

export function ProductCard({ product }: { product: ShopProduct }) {
  const { addItem, setOpen, isMember } = useCart();
  const member = isMember || isCrowMemberForDiscount();
  const displayPrice = memberUnitPrice(product.price, member);

  function addToCart() {
    addItem(product, 1);
    setOpen(true);
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121214]">
      <div className="relative aspect-square bg-[#f3f3f3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 size-full object-contain p-3"
        />
        {member ? (
          <span className="absolute left-2 top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-black">
            -{Math.round(MEMBER_SHOP_DISCOUNT * 100)}% socio
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-black uppercase leading-snug text-white">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-zinc-400">
          {product.description}
        </p>
        <div className="mt-3 flex items-baseline gap-2">
          <p className="font-display text-2xl font-black text-brand-light">
            ${displayPrice.toLocaleString('es-MX')}
          </p>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            MXN
          </span>
          {member ? (
            <p className="text-xs text-zinc-500 line-through">
              ${product.price.toLocaleString('es-MX')}
            </p>
          ) : null}
        </div>

        <div className="mt-auto grid gap-2 pt-4">
          <button
            type="button"
            onClick={addToCart}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand text-[11px] font-black uppercase tracking-wider text-white active:scale-[0.98] hover:bg-brand-dark"
          >
            <ShoppingBag className="size-4" />
            Agregar al carrito
          </button>
          <button
            type="button"
            onClick={addToCart}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15 text-[11px] font-black uppercase tracking-wider text-white active:scale-[0.98] hover:border-brand"
          >
            <CreditCard className="size-3.5" />
            Ver carrito y pagar
          </button>
        </div>
      </div>
    </article>
  );
}
