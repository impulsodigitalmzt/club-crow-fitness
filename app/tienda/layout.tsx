'use client';

import { CartProvider } from '@/components/portal/cart-context';
import { CartDrawer } from '@/components/portal/cart-drawer';

/** Tienda pública: carrito compartido con el Portal (localStorage). */
export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
