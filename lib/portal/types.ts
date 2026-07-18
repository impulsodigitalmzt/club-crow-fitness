/**
 * Portal del Socio — tipos y sesión.
 * Los mocks de demo viven en `lib/portal/mock-data.ts`.
 */

export type MembershipStatus = 'activa' | 'vencida' | 'por_vencer' | 'pendiente';

export type MemberProfile = {
  id: string;
  name: string;
  email: string;
  planId: string;
  planName: string;
  status: MembershipStatus;
  expiresAt: string;
  memberSince: string;
};

export type DayClass = {
  id: string;
  time: string;
  name: string;
  coach: string;
  room: string;
  reserved: boolean;
  /** Texto del WOD del día (demo). */
  wod?: string;
};

export type DayRoutine = {
  title: string;
  focus: string;
  blocks: { label: string; detail: string }[];
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  price: number;
  endsAt: string;
  joined: boolean;
  image: string;
  cta?: string;
};

export const MEMBER_SESSION_COOKIE = 'crow_member_session';
export const MEMBER_PROFILE_KEY = 'crow_member_profile';

export function getMemberSessionToken() {
  return process.env.MEMBER_SESSION_SECRET || 'crow-member-dev-session';
}

export function isValidMemberSession(token: string | undefined | null) {
  return Boolean(token && token === getMemberSessionToken());
}

export function getMemberDemoCredentials() {
  return {
    email: process.env.MEMBER_EMAIL || 'socio@crowfitness.mx',
    password: process.env.MEMBER_PASSWORD || 'crowsocio',
  };
}

export {
  createDemoMember,
  demoMember,
  todayClass,
  todayRoutine,
  activeChallenges,
  membershipRenewalPrice,
  getMembershipLabel,
  DEMO_MEMBER_STATUS,
} from '@/lib/portal/mock-data';
