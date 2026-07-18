export const ADMIN_SESSION_COOKIE = 'crow_admin_session';

/** Token de sesión simple (preparado para reemplazar por Supabase Auth). */
export function getAdminSessionToken() {
  return process.env.ADMIN_SESSION_SECRET || 'crow-admin-dev-session';
}

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || 'admin@crowfitness.mx',
    password: process.env.ADMIN_PASSWORD || 'crowadmin',
  };
}

export function isValidAdminSession(token: string | undefined | null) {
  if (!token) return false;
  return token === getAdminSessionToken();
}
