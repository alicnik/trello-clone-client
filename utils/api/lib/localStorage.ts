export function setToken(token: string) {
  window.localStorage.setItem("token", token);
}

export function getToken() {
  return window.localStorage.getItem("token");
}

export function removeToken() {
  window.localStorage.removeItem("token");
}

interface JWTPayload {
  sub: string;
  iss: string;
  exp: number;
}

export function getPayload() {
  const token = getToken();
  if (!token) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length < 3) {
    return null;
  }

  return JSON.parse(atob(parts[1])) as JWTPayload;
}

export function isAuthenticated() {
  const payload = getPayload();
  if (!payload) {
    return false;
  }

  const now = Math.round(Date.now() / 1000);
  return now < payload.exp;
}

export function isOwner(username: string) {
  const payload = getPayload();
  if (!payload) {
    return false;
  }

  return username === payload.sub;
}
