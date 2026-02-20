export const TEST_EMAIL = "judge@primer.kr";
export const TEST_PASSWORD = "airvent2026";

const KEY = "airvent_hackathon_auth_v1";

export function isAuthed(): boolean {
  return localStorage.getItem(KEY) === "1";
}

export function login(email: string, password: string): boolean {
  const ok =
    email.trim().toLowerCase() === TEST_EMAIL &&
    password === TEST_PASSWORD;

  if (ok) localStorage.setItem(KEY, "1");
  return ok;
}

export function logout(): void {
  localStorage.removeItem(KEY);
}
