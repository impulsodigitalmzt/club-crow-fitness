/**
 * Catálogo oficial Tienda Crow.
 * Cualquiera compra en línea; socios → 10% descuento.
 * Recogida solo en sucursal (sin domicilio).
 */

import type { Product } from '@/lib/admin/types';
import { MEMBER_PROFILE_KEY } from '@/lib/portal/types';
import { CURRENT_USER_ID_KEY, getCurrentUser, getUserById } from '@/lib/portal/users';

export const ADMIN_DB_KEY = 'crow-admin-db-v4';
export const CART_STORAGE_KEY = 'crow_portal_cart_v2';

/** Descuento para miembros Crow. */
export const MEMBER_SHOP_DISCOUNT = 0.1;

export type ShopProduct = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  category: 'playera' | 'short' | 'gorra' | 'shaker' | 'toalla' | 'suplemento';
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  description: string;
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

const IMG = '/fotos/tienda';

/**
 * Artículos oficiales Crow Fitness Club.
 * Imágenes en public/fotos/tienda.
 */
export const mockShopProducts: ShopProduct[] = [
  {
    id: 'playera-gris',
    name: 'Playera Crow Gris',
    price: 449,
    stock: 20,
    category: 'playera',
    image: `${IMG}/74a6db16-d4d8-49ff-8398-3636c010b788.jpg`,
    description:
      'Playera deportiva color gris con logo Crow. Tela ligera, respirable y corte unisex para entrenar o usar todos los días.',
  },
  {
    id: 'playera-negra',
    name: 'Playera Crow Negra',
    price: 449,
    stock: 22,
    category: 'playera',
    image: `${IMG}/Gemini_Generated_Image_be0h4obe0h4obe0h.png`,
    description:
      'Clásico negro Crow. Algodón premium con estampado del club; ideal para el gym o el día a día.',
  },
  {
    id: 'playera-morada',
    name: 'Playera Crow Morada',
    price: 469,
    stock: 16,
    category: 'playera',
    image: `${IMG}/Gemini_Generated_Image_bhcd1lbhcd1lbhcd.png`,
    description:
      'Edición en morado marca Crow. Soft-touch, cuello redondo y logo frontal para destacar en el box.',
  },
  {
    id: 'playera-blanca',
    name: 'Playera Crow Blanca',
    price: 449,
    stock: 18,
    category: 'playera',
    image: `${IMG}/Gemini_Generated_Image_ff8troff8troff8t.png`,
    description:
      'Playera blanca limpia con branding Crow. Fresca, versátil y lista para combinar con tu outfit de entrenamiento.',
  },
  {
    id: 'playera-salmon',
    name: 'Playera Crow Salmón',
    price: 469,
    stock: 14,
    category: 'playera',
    image: `${IMG}/Gemini_Generated_Image_iuptg3iuptg3iupt.png`,
    description:
      'Tono salmón vibrante con logo Crow. Ligera, cómoda y perfecta para entrenamientos de alta intensidad.',
  },
  {
    id: 'short-gris',
    name: 'Short Crow Gris',
    price: 399,
    stock: 15,
    category: 'short',
    image: `${IMG}/Gemini_Generated_Image_4nszj04nszj04nsz.png`,
    description:
      'Short de entrenamiento gris con cintura elástica y logo Crow. Movilidad total para fuerza, HIIT o cardio.',
  },
  {
    id: 'short-negro',
    name: 'Short Crow Negro',
    price: 399,
    stock: 17,
    category: 'short',
    image: `${IMG}/Gemini_Generated_Image_h1t68sh1t68sh1t6.png`,
    description:
      'Short negro técnico Crow. Secado rápido, bolsillos laterales y ajuste cómodo para sesiones largas.',
  },
  {
    id: 'gorra-azul',
    name: 'Gorra Crow Azul Cielo',
    price: 329,
    stock: 12,
    category: 'gorra',
    image: `${IMG}/Gemini_Generated_Image_hdj8xthdj8xthdj8.png`,
    description:
      'Gorra trucker azul cielo con parche Crow. Visera curva, ajuste trasero y estilo club listo para salir del gym.',
  },
  {
    id: 'gorra-negra',
    name: 'Gorra Crow Negra',
    price: 329,
    stock: 14,
    category: 'gorra',
    image: `${IMG}/Gemini_Generated_Image_pzrqiypzrqiypzrq.png`,
    description:
      'Gorra negra bordada Crow. Perfil clásico, cómoda y con presencia en cualquier look urbano o deportivo.',
  },
  {
    id: 'gorra-blanca',
    name: 'Gorra Crow Blanca',
    price: 329,
    stock: 11,
    category: 'gorra',
    image: `${IMG}/Gemini_Generated_Image_s5g895s5g895s5g8.png`,
    description:
      'Gorra blanca con logo Crow en contraste. Ligera, ajustable y perfecta para protegerte del sol en Mazatlán.',
  },
  {
    id: 'shaker-negro',
    name: 'Shaker Crow Negro 700 ml',
    price: 249,
    stock: 25,
    category: 'shaker',
    image: `${IMG}/Gemini_Generated_Image_10yza110yza110yz.png`,
    description:
      'Shaker negro mate Crow, 700 ml. Libre de BPA, con malla mezcladora y tapa segura anti-derrames.',
  },
  {
    id: 'shaker-transparente',
    name: 'Shaker Crow Transparente 700 ml',
    price: 269,
    stock: 20,
    category: 'shaker',
    image: `${IMG}/Gemini_Generated_Image_id1183id1183id11.png`,
    description:
      'Shaker transparente con medidas mililitros y logo Crow. Ideal para proteína, creatina o pre-entreno.',
  },
  {
    id: 'toalla-negra',
    name: 'Toalla Crow Negra',
    price: 219,
    stock: 28,
    category: 'toalla',
    image: `${IMG}/Gemini_Generated_Image_br50uubr50uubr50.png`,
    description:
      'Toalla de gym negra con branding Crow. Absorbente, compacta y fácil de llevar en tu bolsa de entrenamiento.',
  },
  {
    id: 'toalla-rosa',
    name: 'Toalla Crow Rosa',
    price: 219,
    stock: 24,
    category: 'toalla',
    image: `${IMG}/Gemini_Generated_Image_f80ftsf80ftsf80f.png`,
    description:
      'Toalla rosa intenso Crow. Microfibra de secado rápido para clases, peso libre o baño post-entreno.',
  },
  {
    id: 'toalla-blanca',
    name: 'Toalla Crow Blanca',
    price: 219,
    stock: 26,
    category: 'toalla',
    image: `${IMG}/Gemini_Generated_Image_it71geit71geit71.png`,
    description:
      'Toalla blanca Crow de uso diario en el club. Suave al tacto, resistente y con logo bordado.',
  },
  {
    id: 'proteina-whey',
    name: 'Crow Whey Proteína Chocolate 1 kg',
    price: 949,
    stock: 10,
    category: 'suplemento',
    image: `${IMG}/Gemini_Generated_Image_dy0bmdy0bmdy0bmd.png`,
    description:
      'Proteína whey Crow sabor chocolate, presentación 1 kg. Apoya recuperación muscular y tus metas de fuerza.',
  },
];

/** Catálogo de tienda: siempre los artículos oficiales. */
export function loadShopCatalog(): ShopProduct[] {
  return mockShopProducts.filter((p) => p.stock > 0);
}

export function getShopProduct(id: string) {
  return mockShopProducts.find((p) => p.id === id);
}

/** Convierte catálogo Crow a productos Admin (seed / sync). */
export function shopProductsAsAdminProducts(): Product[] {
  return mockShopProducts.map((p) => ({
    id: p.id,
    name: p.name,
    stock: p.stock,
    price: p.price,
    public: true,
    modifiedBy: 'Admin Crow',
    image: p.image,
    active: p.stock > 0,
  }));
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function cartItemCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

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
