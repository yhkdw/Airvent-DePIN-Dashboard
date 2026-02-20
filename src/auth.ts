export const TEST_EMAIL = "judge@primer.kr";
export const TEST_PASSWORD = "airvent2026";

const KEY = "airvent_auth_v1";

export function isAuthed(): boolean {
  return localStorage.getItem(KEY) === "1";
}

export function login(email: string, password: string): boolean {
  // Allow any non-empty input or specific test credentials
  const ok =
    (email.length > 0 && password.length > 0) ||
    (email.trim().toLowerCase() === TEST_EMAIL && password === TEST_PASSWORD);

  if (ok) localStorage.setItem(KEY, "1");
  return ok;
}

export function logout(): void {
  localStorage.removeItem(KEY);
}
