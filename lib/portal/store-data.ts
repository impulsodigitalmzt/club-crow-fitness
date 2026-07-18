/**
 * Catálogo Tienda Crow — público y Portal.
 * Simulación: cualquiera compra; socios activos → 10% de descuento.
 * Sin envío a domicilio: solo recogida en sucursal.
 */

import type { Product } from '@/lib/admin/types';
import { createSeedDatabase } from '@/lib/admin/types';
import { MEMBER_PROFILE_KEY } from '@/lib/portal/types';
import { CURRENT_USER_ID_KEY, getCurrentUser, getUserById } from '@/lib/portal/users';

export const ADMIN_DB_KEY = 'crow-admin-db-v4';
export const CART_STORAGE_KEY = 'crow_portal_cart_v1';

/** Descuento simulado para miembros Crow. */
export const MEMBER_SHOP_DISCOUNT = 0.1;

export type ShopProduct = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  description?: string;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

export const pickupBranches = [
  {
    id: 'el-toreo',
    name: 'El Toreo',
    address: 'Silverio Pérez, Ponciano Díaz 132, El Toreo, 82120 Mazatlán, Sin.',
  },
  {
    id: 'real-del-valle',
    name: 'Real del Valle',
    address: 'Av. Paseo del Atlántico 4214, Real del Valle, 82124 Mazatlán, Sin.',
  },
] as const;

export const NO_DELIVERY_LEGEND =
  'No contamos con servicio a domicilio. Tras pagar en línea, deberás pasar a recoger tu producto en cualquiera de nuestras dos sucursales: El Toreo o Real del Valle.';

/** Mocks de alta calidad para demo (mismas IDs que el seed Admin). */
export const mockShopProducts: ShopProduct[] = [
  {
    id: 'pr1',
    name: 'Remera Crow Fitness',
    price: 399,
    stock: 24,
    image: '/fotos/comunidad-mujeres.jpg',
    description: 'Corte atlético · Algodón premium',
  },
  {
    id: 'pr2',
    name: 'Shaker 750ml',
    price: 249,
    stock: 15,
    image: '/fotos/area-peso-libre.jpg',
    description: 'Antiderrames · Libre de BPA',
  },
  {
    id: 'pr3',
    name: 'Toalla Crow',
    price: 189,
    stock: 30,
    image: '/fotos/clase-en-accion.jpg',
    description: 'Secado rápido · Logo Crow',
  },
  {
    id: 'pr5',
    name: 'Proteína Crow (1kg)',
    price: 899,
    stock: 8,
    image: '/fotos/area-peso-libre.jpg',
    description: 'Whey · Sabor chocolate',
  },
  {
    id: 'pr4',
    name: 'Gorra Crow',
    price: 279,
    stock: 18,
    image: '/fotos/clase-en-accion.jpg',
    description: 'Ajustable · Bordado Crow',
  },
];

function adminProductToShop(product: Product): ShopProduct {
  const mock = mockShopProducts.find((p) => p.id === product.id);
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    image:
      product.image && product.image !== '/logo_negro.png'
        ? product.image
        : mock?.image ?? '/logo.png',
    description: mock?.description,
  };
}

/** Productos activos y públicos: Admin localStorage → fallback mocks. */
export function loadShopCatalog(): ShopProduct[] {
  if (typeof window === 'undefined') {
    return mockShopProducts.filter((p) => p.stock > 0);
  }

  try {
    const raw = window.localStorage.getItem(ADMIN_DB_KEY);
    if (raw) {
      const db = JSON.parse(raw) as { products?: Product[] };
      if (Array.isArray(db.products) && db.products.length > 0) {
        return db.products
          .filter((p) => p.active && p.public && p.stock > 0)
          .map(adminProductToShop);
      }
    }
  } catch {
    // fallback abajo
  }

  try {
    const seed = createSeedDatabase();
    window.localStorage.setItem(ADMIN_DB_KEY, JSON.stringify(seed));
    return seed.products
      .filter((p) => p.active && p.public && p.stock > 0)
      .map(adminProductToShop);
  } catch {
    return mockShopProducts.filter((p) => p.stock > 0);
  }
}

export function getShopProduct(id: string) {
  return loadShopCatalog().find((p) => p.id === id) ?? mockShopProducts.find((p) => p.id === id);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function cartItemCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

/**
 * Socio Crow en este dispositivo (simulación vía localStorage).
 * No exige login en el momento de compra pública; si hay sesión de socio, aplica 10%.
 */
export function isCrowMemberForDiscount(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const current = getCurrentUser();
    if (current && (current.status === 'activo' || current.status === 'pendiente')) {
      return true;
    }

    const id = window.localStorage.getItem(CURRENT_USER_ID_KEY);
    if (id) {
      const user = getUserById(id);
      if (user && (user.status === 'activo' || user.status === 'pendiente')) return true;
    }

    const raw = window.localStorage.getItem(MEMBER_PROFILE_KEY);
    if (!raw) return false;
    const profile = JSON.parse(raw) as { status?: string };
    return (
      profile.status === 'activa' ||
      profile.status === 'por_vencer' ||
      profile.status === 'pendiente'
    );
  } catch {
    return false;
  }
}

export function memberUnitPrice(listPrice: number, isMember: boolean) {
  if (!isMember) return listPrice;
  return Math.round(listPrice * (1 - MEMBER_SHOP_DISCOUNT));
}

export function cartPricing(items: CartItem[], isMember: boolean) {
  const subtotal = cartSubtotal(items);
  if (!isMember || subtotal <= 0) {
    return { subtotal, discount: 0, total: subtotal, isMember: false };
  }
  const discount = Math.round(subtotal * MEMBER_SHOP_DISCOUNT);
  return {
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount),
    isMember: true,
  };
}
