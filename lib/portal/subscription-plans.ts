/**
 * Planes del flujo "Únete al Club".
 * Edita precios/nombres aquí; el registro y /app/pagar los leen automáticamente.
 */

export type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  /** Incluye cuota de inscripción en el total del checkout. */
  includesEnrollment?: boolean;
};

/** Inscripción única al unirse (planes mensuales / trimestral). */
export const SUBSCRIPTION_ENROLLMENT_FEE = 250;

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'pase-libre',
    name: 'Pase Libre',
    price: 1200,
    period: '/mes',
    description: 'Acceso ilimitado a salas, rutina diaria y coaches en piso.',
    features: ['Acceso ilimitado', 'Rutina diaria Crow', 'Clases y WOD', 'Crow App incluida'],
    popular: true,
    includesEnrollment: true,
  },
  {
    id: '3x-semana',
    name: '3x semana',
    price: 900,
    period: '/mes',
    description: 'Tres visitas por semana con seguimiento de rutina.',
    features: ['3 entradas / semana', 'Rutina diaria', 'Crow App incluida'],
    includesEnrollment: true,
  },
  {
    id: 'trimestral',
    name: 'Plan 3 meses',
    price: 3000,
    period: '/3 meses',
    description: 'Compromiso con tarifa preferencial y acceso a retos.',
    features: ['Todo Pase Libre', 'Ahorro vs mensual', 'Retos Crow'],
    includesEnrollment: true,
  },
  {
    id: 'visita',
    name: 'Visita',
    price: 140,
    period: '/día',
    description: 'Un día completo para conocer Crow.',
    features: ['Acceso por un día', 'Cardio y peso libre', 'Vestidores'],
    includesEnrollment: false,
  },
];

export function getSubscriptionPlan(planId: string) {
  return subscriptionPlans.find((p) => p.id === planId) ?? subscriptionPlans[0];
}

/** Monto a cobrar en checkout (plan + inscripción si aplica). */
export function getSubscriptionCheckoutAmount(planId: string) {
  const plan = getSubscriptionPlan(planId);
  const enrollment = plan.includesEnrollment ? SUBSCRIPTION_ENROLLMENT_FEE : 0;
  return {
    plan,
    planPrice: plan.price,
    enrollment,
    total: plan.price + enrollment,
  };
}
