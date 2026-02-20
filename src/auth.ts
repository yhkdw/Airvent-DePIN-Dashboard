// Credentials are managed via .env
export const TEST_EMAIL = import.meta.env.VITE_JUDGE_EMAIL || "";
export const TEST_PASSWORD = import.meta.env.VITE_JUDGE_PASSWORD || "";

const KEY = "airvent_auth_v1";

export function isAuthed(): boolean {
  return localStorage.getItem(KEY) === "1";
}

export function login(email: string, password: string): boolean {
  // REQUIRE specific credentials. Do not allow empty env vars to match empty inputs.
  if (!TEST_EMAIL || !TEST_PASSWORD) return false;

  const ok = email.trim().toLowerCase() === TEST_EMAIL && password === TEST_PASSWORD;

  if (ok) localStorage.setItem(KEY, "1");
  return ok;
}

export function logout(): void {
  localStorage.removeItem(KEY);
}
