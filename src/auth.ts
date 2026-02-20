// Credentials are managed via .env
// We trim and lowercase here for consistency
export const TEST_EMAIL = (import.meta.env.VITE_JUDGE_EMAIL || "").trim().toLowerCase();
export const TEST_PASSWORD = (import.meta.env.VITE_JUDGE_PASSWORD || "").trim();

const KEY = "airvent_auth_v1";

export function isAuthed(): boolean {
  return localStorage.getItem(KEY) === "1";
}

export function login(email: string, password: string): boolean {
  // REQUIRE specific credentials. Handle local missing env as well.
  if (!TEST_EMAIL || !TEST_PASSWORD) {
    console.error("Critical: Auth credentials missing in .env or environment!");
    return false;
  }

  const inputEmail = email.trim().toLowerCase();
  const inputPassword = password.trim();

  const ok = inputEmail === TEST_EMAIL && inputPassword === TEST_PASSWORD;

  if (ok) {
    localStorage.setItem(KEY, "1");
  }
  return ok;
}

export function logout(): void {
  localStorage.removeItem(KEY);
}
