import type {
  Challenge,
  DayClass,
  DayRoutine,
  MemberProfile,
  MembershipStatus,
} from '@/lib/portal/types';

/**
 * Datos de simulación de alta calidad para el Portal del Socio (demo / propuesta).
 * Alterna DEMO_MEMBER_STATUS entre 'activa' y 'vencida' para probar ambos flujos.
 */
export const DEMO_MEMBER_STATUS: MembershipStatus = 'activa';

export const demoMember: MemberProfile = {
  id: 'm_usuario_demo',
  name: 'Usuario Demo',
  email: 'socio@crowfitness.mx',
  planId: 'pase-libre',
  planName: 'Pase Libre',
  status: DEMO_MEMBER_STATUS,
  expiresAt: '15/08/2026',
  memberSince: '03/02/2026',
};

/** Precio de renovación del pase libre (para /app/pagar). */
export const membershipRenewalPrice = 1200;

export const todayClass: DayClass = {
  id: 'cls_functional_0830',
  time: '08:30',
  name: 'Functional Training',
  coach: 'Coach Valeria',
  room: 'Sala principal',
  reserved: true,
  wod: "AMRAP 20': 10 KB Swings, 10 Box Jumps, 10 Burpees",
};

export const todayRoutine: DayRoutine = {
  title: 'WOD del día',
  focus: 'Alta intensidad · Full body',
  blocks: [
    { label: 'Warm-up', detail: 'Movilidad de cadera · 2 rondas suaves' },
    {
      label: 'WOD',
      detail: "AMRAP 20': 10 KB Swings, 10 Box Jumps, 10 Burpees",
    },
    { label: 'Cooldown', detail: 'Estiramiento de posterior y core 5 min' },
  ],
};

export const activeChallenges: Challenge[] = [
  {
    id: 'reto-30-dias',
    title: 'Reto 30 días',
    description: 'Transformación total',
    price: 500,
    endsAt: '30/08/2026',
    joined: false,
    image: '/fotos/clase-en-accion.jpg',
    cta: 'Aceptar y Pagar',
  },
  {
    id: 'semana-fuerza',
    title: 'Semana de Fuerza',
    description: 'Supera tus marcas en Back Squat',
    price: 300,
    endsAt: '24/08/2026',
    joined: false,
    image: '/fotos/area-peso-libre.jpg',
    cta: 'Aceptar y Pagar',
  },
  {
    id: 'nutricion-pro',
    title: 'Nutrición Pro',
    description: 'Plan personalizado',
    price: 800,
    endsAt: '10/09/2026',
    joined: false,
    image: '/fotos/comunidad-mujeres.jpg',
    cta: 'Aceptar y Pagar',
  },
];

export function createDemoMember(overrides?: Partial<MemberProfile>): MemberProfile {
  return {
    ...demoMember,
    ...overrides,
  };
}

export function getMembershipLabel(profile: MemberProfile) {
  return `${profile.planName} - Vence ${profile.expiresAt}`;
}
