'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { ProductCard } from '@/components/portal/product-card';
import { useCart } from '@/components/portal/cart-context';
import { ShopPickupNotice } from '@/components/shop/pickup-notice';
import {
  isCrowMemberForDiscount,
  loadShopCatalog,
  MEMBER_SHOP_DISCOUNT,
  type ShopProduct,
} from '@/lib/portal/store-data';

export default function MemberShopPage() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [isMember, setIsMember] = useState(false);
  const { count, setOpen, total, refreshMember } = useCart();

  useEffect(() => {
    setProducts(loadShopCatalog());
    setIsMember(isCrowMemberForDiscount());
    refreshMember();
  }, [refreshMember]);

  return (
    <div className="space-y-5 pb-24">
      <header>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--portal-brand-light)]">
          Tienda Crow
        </p>
        <h1 className="mt-1 font-display text-3xl font-black uppercase text-white">Merch & gear</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Compra en línea y recoge en sucursal.
          {isMember
            ? ` Descuento socio ${Math.round(MEMBER_SHOP_DISCOUNT * 100)}% activo.`
            : ''}
        </p>
      </header>

      <ShopPickupNotice />

      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Link href="/tienda" className="block text-center text-xs font-bold text-zinc-500 hover:text-white">
        Ver tienda completa
      </Link>

      {count > 0 ? (
        <div className="fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] z-30 px-4">
          <div className="mx-auto flex max-w-lg items-center gap-3 rounded-2xl border border-[var(--portal-brand)]/40 bg-black/95 p-2 pl-4 shadow-2xl backdrop-blur-xl">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                {count} en carrito
              </p>
              <p className="font-display text-lg font-black text-white">
                ${total.toLocaleString('es-MX')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-[var(--portal-brand)] px-5 text-xs font-black uppercase tracking-wider text-white"
            >
              <ShoppingBag className="size-4" />
              Ver carrito
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
