// Préfixe les chemins d'assets publics avec le basePath (GitHub Pages : /fabiole).
// À utiliser pour tout <img>, <video> et <a href> pointant vers /site/...

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

export function route(path: string): string {
  return `${BASE_PATH}${path}`;
}
