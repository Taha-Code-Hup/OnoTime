export function generateId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
}
