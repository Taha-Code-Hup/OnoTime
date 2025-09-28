export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJSON<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}
// --- session user helpers for Login integration ---
export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  loggedAt?: string;
};

const CURRENT_USER_KEY = "app_current_user_v1";

export function saveCurrentUser(user: CurrentUser, remember = false) {
  const raw = JSON.stringify(user);
  if (remember) {
    localStorage.setItem(CURRENT_USER_KEY, raw);
  } else {
    sessionStorage.setItem(CURRENT_USER_KEY, raw);
  }
}

export function getCurrentUser(): CurrentUser | null {
  const fromSession = sessionStorage.getItem(CURRENT_USER_KEY);
  const fromLocal = localStorage.getItem(CURRENT_USER_KEY);
  const raw = fromSession ?? fromLocal;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CurrentUser;
  } catch {
    return null;
  }
}

export function removeCurrentUser() {
  sessionStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
}
