/**
 * Base de usuarios del Portal (simulación).
 * Persistencia en localStorage; el seed vive en este archivo para edición fácil.
 *
 * Flujo: registro → status 'pendiente' → pago simulado → ACTIVATION_POLICY.postPaymentStatus
 */

import {
  getSubscriptionCheckoutAmount,
  getSubscriptionPlan,
} from '@/lib/portal/subscription-plans';
import type { MemberProfile, MembershipStatus } from '@/lib/portal/types';
import { syncPortalUsersToAdmin } from '@/lib/portal/sync-admin';

export const USERS_STORAGE_KEY = 'crow_portal_users_v1';
export const CURRENT_USER_ID_KEY = 'crow_portal_current_user_id';

/** Estado en la “DB” de socios (JSON). */
export type PortalUserStatus = 'pendiente' | 'activo' | 'vencido';

export type PortalUser = {
  id: string;
  name: string;
  email: string;
  /** Solo demo — nunca uses esto en producción. */
  password: string;
  planId: string;
  planName: string;
  status: PortalUserStatus;
  amountPaid: number;
  createdAt: string;
  activatedAt?: string;
  expiresAt: string;
  memberSince: string;
};

/**
 * Política administrativa post-pago.
 * - 'activo' → entra al dashboard como socio activo
 * - 'pendiente' → pago OK pero espera activación manual (CRM)
 */
export const ACTIVATION_POLICY = {
  postPaymentStatus: 'activo' as Extract<PortalUserStatus, 'activo' | 'pendiente'>,
};

/** Seed editable — usuarios de demo iniciales. */
export const seedUsers: PortalUser[] = [
  {
    id: 'u_demo',
    name: 'Usuario Demo',
    email: 'socio@crowfitness.mx',
    password: 'crowsocio',
    planId: 'pase-libre',
    planName: 'Pase Libre',
    status: 'activo',
    amountPaid: 1200,
    createdAt: '2026-02-03T10:00:00.000Z',
    activatedAt: '2026-02-03T10:05:00.000Z',
    expiresAt: '15/08/2026',
    memberSince: '03/02/2026',
  },
];

function todayLabel() {
  return new Date().toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function defaultExpiryLabel() {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function portalStatusToMembership(status: PortalUserStatus): MembershipStatus {
  if (status === 'activo') return 'activa';
  if (status === 'vencido') return 'vencida';
  return 'pendiente';
}

export function membershipToPortalStatus(status: MembershipStatus): PortalUserStatus {
  if (status === 'activa' || status === 'por_vencer') return 'activo';
  if (status === 'pendiente') return 'pendiente';
  return 'vencido';
}

export function userToMemberProfile(user: PortalUser): MemberProfile {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    planId: user.planId,
    planName: user.planName,
    status: portalStatusToMembership(user.status),
    expiresAt: user.expiresAt,
    memberSince: user.memberSince,
  };
}

function canUseStorage() {
  return typeof window !== 'undefined';
}

function mergeWithSeed(users: PortalUser[]): PortalUser[] {
  const emails = new Set(users.map((u) => u.email.toLowerCase()));
  const merged = [...users];
  for (const seed of seedUsers) {
    if (!emails.has(seed.email.toLowerCase())) {
      merged.unshift(seed);
    }
  }
  return merged;
}

export function loadUsers(): PortalUser[] {
  if (!canUseStorage()) return [...seedUsers];
  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      const seed = [...seedUsers];
      window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(seed));
      syncPortalUsersToAdmin(seed);
      return seed;
    }
    const parsed = JSON.parse(raw) as PortalUser[];
    const list = mergeWithSeed(Array.isArray(parsed) ? parsed : []);
    // Persiste seed si faltaba
    if (list.length !== (Array.isArray(parsed) ? parsed.length : 0)) {
      window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(list));
    }
    return list;
  } catch {
    return [...seedUsers];
  }
}

export function saveUsers(users: PortalUser[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  syncPortalUsersToAdmin(users);
  window.dispatchEvent(new CustomEvent('crow-portal-users-updated'));
}

export function getUserById(id: string) {
  return loadUsers().find((u) => u.id === id) ?? null;
}

export function getUserByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return loadUsers().find((u) => u.email.toLowerCase() === normalized) ?? null;
}

export function getCurrentUserId() {
  if (!canUseStorage()) return null;
  return window.localStorage.getItem(CURRENT_USER_ID_KEY);
}

export function setCurrentUserId(id: string | null) {
  if (!canUseStorage()) return;
  if (!id) {
    window.localStorage.removeItem(CURRENT_USER_ID_KEY);
    return;
  }
  window.localStorage.setItem(CURRENT_USER_ID_KEY, id);
}

export function getCurrentUser() {
  const id = getCurrentUserId();
  if (!id) return null;
  return getUserById(id);
}

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  planId: string;
};

/** Crea registro en estado 'pendiente' (espera pago) y lo persiste en localStorage. */
export function registerUser(input: RegisterUserInput): PortalUser {
  const plan = getSubscriptionPlan(input.planId);
  const existing = getUserByEmail(input.email);

  const user: PortalUser = {
    id: existing?.id ?? `u_${Date.now().toString(36)}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    password: input.password,
    planId: plan.id,
    planName: plan.name,
    status: 'pendiente',
    amountPaid: 0,
    createdAt: new Date().toISOString(),
    expiresAt: defaultExpiryLabel(),
    memberSince: todayLabel(),
  };

  const users = loadUsers().filter((u) => u.email.toLowerCase() !== user.email);
  users.push(user);
  saveUsers(users);
  setCurrentUserId(user.id);

  return user;
}

/** Activa (o deja pendiente) tras pago simulado según política admin. */
export function activateUserAfterPayment(
  userId: string,
  options?: { planId?: string; amountPaid?: number },
): PortalUser | null {
  const users = loadUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index < 0) return null;

  const plan = getSubscriptionPlan(options?.planId ?? users[index].planId);
  const next: PortalUser = {
    ...users[index],
    planId: plan.id,
    planName: plan.name,
    status: ACTIVATION_POLICY.postPaymentStatus,
    amountPaid: options?.amountPaid ?? getSubscriptionCheckoutAmount(plan.id).total,
    activatedAt: new Date().toISOString(),
    expiresAt: defaultExpiryLabel(),
  };

  users[index] = next;
  saveUsers(users);
  setCurrentUserId(next.id);
  return next;
}

export function authenticateUser(email: string, password: string): PortalUser | null {
  const user = getUserByEmail(email);
  if (!user) return null;
  if (user.password !== password) return null;
  setCurrentUserId(user.id);
  return user;
}

/** Actualiza estado desde Admin y refleja en portal users. */
export function updatePortalUserStatus(userId: string, status: PortalUserStatus) {
  const users = loadUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index < 0) return null;
  users[index] = { ...users[index], status };
  saveUsers(users);
  return users[index];
}
