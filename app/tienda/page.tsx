'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { ContactCta } from '@/components/contact-cta';
import { PageHero } from '@/components/page-hero';
import { ProductCard } from '@/components/portal/product-card';
import { CartHeaderButton } from '@/components/portal/cart-drawer';
import { useCart } from '@/components/portal/cart-context';
import { ShopPickupNotice } from '@/components/shop/pickup-notice';
import {
  isCrowMemberForDiscount,
  loadShopCatalog,
  MEMBER_SHOP_DISCOUNT,
  type ShopProduct,
} from '@/lib/portal/store-data';

export default function TiendaPage() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [isMember, setIsMember] = useState(false);
  const { count, setOpen, total, refreshMember } = useCart();

  useEffect(() => {
    setProducts(loadShopCatalog());
    setIsMember(isCrowMemberForDiscount());
    refreshMember();
  }, [refreshMember]);

  return (
    <>
      <PageHero
        eyebrow="Tienda Crow"
        title={'MERCH & GEAR.\n*COMPRA EN LÍNEA.*'}
        description="Cualquiera puede comprar. Si eres socio Crow, tienes 10% de descuento automático. Pagas en línea y recoges en sucursal."
        image="/fotos/comunidad-mujeres.jpg"
        primaryHref="#catalogo"
        primaryLabel="Ver productos"
      />

      <section id="catalogo" className="bg-black py-20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand">
                Catálogo
              </p>
              <h2 className="mt-2 font-display text-4xl font-black uppercase text-white sm:text-5xl">
                Productos Crow
              </h2>
              <p className="mt-3 max-w-xl text-sm text-zinc-400">
                Compra en línea con pago seguro. Tu pedido queda listo para recoger en sucursal.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CartHeaderButton />
              {count > 0 ? (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-brand-dark"
                >
                  <ShoppingBag className="size-4" />
                  Carrito · ${total.toLocaleString('es-MX')}
                </button>
              ) : null}
            </div>
          </div>

          <div className="mb-8">
            <ShopPickupNotice />
          </div>

          {isMember ? (
            <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
              Socio Crow: tienes{' '}
              <strong>{Math.round(MEMBER_SHOP_DISCOUNT * 100)}% de descuento</strong> en todos los
              productos.
            </div>
          ) : (
            <div className="mb-8 rounded-2xl border border-white/10 bg-[#111] px-5 py-4 text-sm text-zinc-400">
              ¿Eres miembro?{' '}
              <Link href="/app/login?next=/tienda" className="font-bold text-brand-light underline">
                Inicia sesión
              </Link>{' '}
              y obtén {Math.round(MEMBER_SHOP_DISCOUNT * 100)}% de descuento en toda la tienda.
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {count > 0 ? (
        <div className="fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mx-auto flex w-full max-w-lg min-h-14 items-center justify-between rounded-2xl border border-brand/40 bg-black/95 px-5 text-white shadow-2xl backdrop-blur-xl"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              {count} en carrito
            </span>
            <span className="font-display text-lg font-black">${total.toLocaleString('es-MX')}</span>
            <span className="rounded-xl bg-brand px-4 py-2 text-[10px] font-black uppercase tracking-wider">
              Pagar
            </span>
          </button>
        </div>
      ) : null}

      <ContactCta />
    </>
  );
}
