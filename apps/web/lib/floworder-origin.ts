export function isAllowedFlowOrderOrigin(
  origin: string | null,
  requestOrigin: string,
  publicOrigin: string | undefined,
): boolean {
  if (!origin) return true;
  if (origin === requestOrigin) return true;
  if (!publicOrigin) return false;

  try {
    const configured = new URL(publicOrigin);
    if (!["http:", "https:"].includes(configured.protocol)) return false;
    if (configured.username || configured.password) return false;
    return origin === configured.origin;
  } catch {
    return false;
  }
}
