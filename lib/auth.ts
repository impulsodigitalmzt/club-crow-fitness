export const ADMIN_SESSION_COOKIE = 'crow_admin_session';

/** Cookie de sesión demo (sin Supabase ni auth real). */
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
