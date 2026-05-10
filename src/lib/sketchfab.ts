// Tries to extract a direct GLB download URL from a Sketchfab page URL.
// Sketchfab requires API auth for downloads, so this is a best-effort helper:
// - If the URL already points to a .glb/.gltf/.usdz, return it as-is.
// - Otherwise return null and let the caller display a guidance message.
export function extractSketchfabUrl(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/\.(glb|gltf|usdz)(\?.*)?$/i.test(trimmed)) return trimmed;
  return null;
}
