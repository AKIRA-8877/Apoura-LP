export type RGB = [number, number, number];

export function normalizeRGB(value: unknown): RGB | undefined {
  if (!Array.isArray(value) || value.length !== 3 || !value.every(v => typeof v === "number" && Number.isFinite(v))) return;
  return value.map(v => Math.round(Math.max(0, Math.min(255, v)))) as RGB;
}

export function accentTokens(rgb: RGB) {
  const linearize = (v: number) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
  const r = linearize(rgb[0]);
  const g = linearize(rgb[1]);
  const b = linearize(rgb[2]);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const chroma = Math.hypot(a, bb);
  const hue = (Math.atan2(bb, a) * 180 / Math.PI + 360) % 360;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return { color: `oklch(${lightness} ${chroma} ${hue})`, foreground: luminance > 0.179 ? "oklch(0.12 0 0)" : "oklch(1 0 0)" };
}