/**
 * Abstracción de pagos del portal.
 * Conecta después Stripe o Mercado Pago sin cambiar las pantallas.
 */
export type PaymentProvider = 'stripe' | 'mercadopago' | 'crow_checkout';

export type PaymentIntent = {
  kind: 'membership' | 'challenge';
  amount: number;
  currency: 'MXN';
  reference: string;
  successUrl: string;
  cancelUrl: string;
};

export function getConfiguredPaymentProvider(): PaymentProvider {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) return 'stripe';
  if (process.env.NEXT_PUBLIC_MP_PUBLIC_KEY) return 'mercadopago';
  return 'crow_checkout';
}

export function buildMembershipPayUrl(amount: number, planName = 'Pase Libre', planId?: string) {
  const params = new URLSearchParams({
    concepto: 'membresia',
    monto: String(amount),
    titulo: planName,
  });
  if (planId) params.set('planId', planId);
  return `/app/pagar?${params.toString()}`;
}

/** Checkout del flujo Únete al Club (registro → pagar). */
export function buildSubscriptionCheckoutUrl(planId: string, amount: number) {
  const params = new URLSearchParams({
    planId,
    monto: String(amount),
    concepto: 'suscripcion',
  });
  return `/app/pagar?${params.toString()}`;
}

/** @deprecated Prefer buildMembershipPayUrl for portal demo flow */
export function buildMembershipCheckoutUrl(planId: string) {
  return `/checkout?plan=${planId}&tipo=renovar&from=portal`;
}

export function buildChallengeCheckoutUrl(challengeId: string, amount: number) {
  const params = new URLSearchParams({
    reto: challengeId,
    monto: String(amount),
    concepto: 'reto',
  });
  return `/app/pagar?${params.toString()}`;
}

/** Checkout completo de la Tienda Crow (carrito → datos → pasarela). */
export function buildShopCheckoutUrl(_amount?: number, _itemCount?: number, _memberDiscount?: boolean) {
  return `/tienda/checkout`;
}
