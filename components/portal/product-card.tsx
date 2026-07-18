'use client';

import { ShoppingBag, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  isCrowMemberForDiscount,
  memberUnitPrice,
  MEMBER_SHOP_DISCOUNT,
  type ShopProduct,
} from '@/lib/portal/store-data';
import { checkoutUrlFromItems, useCart } from '@/components/portal/cart-context';

export function ProductCard({ product }: { product: ShopProduct }) {
  const { addItem, setOpen, isMember } = useCart();
  const router = useRouter();
  const member = isMember || isCrowMemberForDiscount();
  const displayPrice = memberUnitPrice(product.price, member);

  function buyNow() {
    const next = addItem(product, 1);
    setOpen(false);
    router.push(checkoutUrlFromItems(next, isCrowMemberForDiscount()));
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121214]">
      <div className="relative aspect-square bg-zinc-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {member ? (
          <span className="absolute left-2 top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-black">
            -{Math.round(MEMBER_SHOP_DISCOUNT * 100)}% socio
          </span>
        ) : null}
        {product.stock <= 5 ? (
          <span className="absolute right-2 top-2 rounded-full bg-amber-500/90 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-black">
            Quedan {product.stock}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white">{product.name}</h3>
        {product.description ? (
          <p className="mt-1 line-clamp-1 text-[11px] text-zinc-500">{product.description}</p>
        ) : null}
        <div className="mt-2 flex items-baseline gap-2">
          <p className="font-display text-xl font-black text-brand-light">
            ${displayPrice.toLocaleString('es-MX')}
          </p>
          {member ? (
            <p className="text-xs text-zinc-500 line-through">
              ${product.price.toLocaleString('es-MX')}
            </p>
          ) : null}
        </div>

        <div className="mt-auto grid gap-2 pt-3">
          <button
            type="button"
            onClick={() => addItem(product)}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand text-[11px] font-black uppercase tracking-wider text-white active:scale-[0.98] hover:bg-brand-dark"
          >
            <ShoppingBag className="size-4" />
            Agregar
          </button>
          <button
            type="button"
            onClick={buyNow}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15 text-[11px] font-black uppercase tracking-wider text-white active:scale-[0.98] hover:border-brand"
          >
            <Zap className="size-3.5" />
            Comprar ahora
          </button>
        </div>
      </div>
    </article>
  );
}
