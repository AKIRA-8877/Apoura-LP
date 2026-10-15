import { useEffect, useState } from "react";
import { Monitor, Moon, Palette, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { accentTokens, normalizeRGB, type RGB } from "@/lib/appearance";

type Mode = "light" | "dark" | "system";
type Gradient = "solid" | "brand" | "sunset" | "ocean" | "custom";
type Shape = "sharp" | "round" | "curved";

export function ThemePicker() {
  const [mode, setMode] = useState<Mode>("system");
  const [gradient, setGradient] = useState<Gradient>("brand");
  const [start, setStart] = useState(25);
  const [end, setEnd] = useState(65);
  const [rgb, setRgb] = useState<RGB>([210, 45, 40]);
  const [shape, setShape] = useState<Shape>("round");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("apoura-theme") || "null");
      if (saved) {
        if (["light", "dark", "system"].includes(saved.mode)) setMode(saved.mode);
        if (["solid", "brand", "sunset", "ocean", "custom"].includes(saved.gradient)) setGradient(saved.gradient);
        const restoredRGB = normalizeRGB(saved.rgb);
        if (restoredRGB) setRgb(restoredRGB);
        if (["sharp", "round", "curved"].includes(saved.shape)) setShape(saved.shape);
        if (Number.isFinite(saved.start)) setStart(Math.min(360, Math.max(0, saved.start)));
        if (Number.isFinite(saved.end)) setEnd(Math.min(360, Math.max(0, saved.end)));
      }
    } catch { /* Storage may be unavailable. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = mode === "dark" || (mode === "system" && media.matches);
      root.classList.toggle("dark", dark);
      root.style.colorScheme = dark ? "dark" : "light";
    };
    apply();
    media.addEventListener("change", apply);
    root.dataset["gradient"] = gradient;
    root.dataset["shape"] = shape;
    const tokens = accentTokens(rgb);
    root.style.setProperty("--primary", tokens.color);
    root.style.setProperty("--primary-foreground", tokens.foreground);
    root.style.setProperty("--ring", tokens.color);
    root.style.setProperty("--custom-start", `oklch(0.52 0.13 ${start})`);
    root.style.setProperty("--custom-end", `oklch(0.52 0.13 ${end})`);
    try { localStorage.setItem("apoura-theme", JSON.stringify({ mode, gradient, start, end, rgb, shape })); } catch { /* Keep settings for this visit. */ }
    return () => media.removeEventListener("change", apply);
  }, [mode, gradient, start, end, rgb, shape, ready]);

  const updateChannel = (index: number, value: number) => {
    const next = normalizeRGB(rgb.map((channel, i) => i === index ? value : channel));
    if (next) { setRgb(next); setGradient("solid"); }
  };

  return (
    <Popover>
      <PopoverTrigger asChild><Button variant="ghost" size="icon" aria-label="Theme settings" title="Theme settings"><Palette /></Button></PopoverTrigger>
      <PopoverContent align="end" className="theme-panel w-72 max-h-[calc(100dvh-90px)] overflow-y-auto space-y-4">
        <p className="font-semibold">Appearance</p>
        <div className="grid grid-cols-3 gap-1" aria-label="Color mode">
          {([{ value: "light", Icon: Sun }, { value: "dark", Icon: Moon }, { value: "system", Icon: Monitor }] as const).map(({ value, Icon }) => (
            <Button key={value} variant={mode === value ? "secondary" : "ghost"} className="flex h-auto flex-col gap-1 px-2 py-2 capitalize" aria-pressed={mode === value} onClick={() => setMode(value)}><Icon />{value}</Button>
          ))}
        </div>
        <div className="flex items-center justify-between"><p className="text-sm font-medium">Accent color · RGB</p><span className="accent-preview h-6 w-8 rounded border border-border" aria-label="Accent color preview" /></div>
        <div className="space-y-2">
          {(["Red", "Green", "Blue"] as const).map((channel, index) => <div key={channel} className="grid grid-cols-[40px_1fr_52px] items-center gap-2">
            <label htmlFor={`accent-${channel}`} className="text-xs">{channel}</label>
            <input id={`accent-${channel}`} aria-label={`${channel} slider`} type="range" min="0" max="255" value={rgb[index]} onChange={e => updateChannel(index, Number(e.target.value))} />
            <input aria-label={`${channel} value`} type="number" min="0" max="255" value={rgb[index]} className="w-full rounded border border-input bg-background px-1 py-1 text-center text-xs" onChange={e => updateChannel(index, Number(e.target.value))} />
          </div>)}
        </div>
        <p className="text-sm font-medium">Shape</p>
        <div className="grid grid-cols-3 gap-1">
          {(["sharp", "round", "curved"] as const).map(value => <Button key={value} variant={shape === value ? "secondary" : "ghost"} aria-pressed={shape === value} onClick={() => setShape(value)} className="flex h-auto flex-col gap-2 px-2 py-2 capitalize"><span className={`shape-sample sample-${value}`} />{value}</Button>)}
        </div>
        <p className="text-sm font-medium">Accent finish</p>
        <div className="flex justify-between gap-2">
          {(["solid", "brand", "sunset", "ocean", "custom"] as const).map(value => <Button key={value} variant="outline" size="icon" aria-label={value === "solid" ? "Solid accent" : `${value} gradient`} title={value === "solid" ? "Solid accent" : `${value} gradient`} aria-pressed={gradient === value} className={`theme-swatch swatch-${value}`} onClick={() => setGradient(value)}>{gradient === value && <span className="theme-swatch-dot" />}</Button>)}
        </div>
        {gradient === "custom" && <div className="space-y-3">
          <label className="grid gap-2 text-sm">Start hue<input aria-label="Start hue" type="range" min="0" max="360" value={start} onChange={e => setStart(Number(e.target.value))} /></label>
          <label className="grid gap-2 text-sm">End hue<input aria-label="End hue" type="range" min="0" max="360" value={end} onChange={e => setEnd(Number(e.target.value))} /></label>
        </div>}
        <div className="theme-preview h-6 rounded" aria-label="Gradient preview" />
      </PopoverContent>
    </Popover>
  );
}