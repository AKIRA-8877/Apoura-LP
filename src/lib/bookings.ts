import { useSyncExternalStore } from "react";

export interface BookingEntry {
  id: string;
  provider: string;
  kind: "booking" | "quote";
  status: "confirmed" | "quote requested";
  date: string;
  units: number;
  total?: number;
  deposit?: number;
  notes?: string;
}

const KEY = "apoura-bookings";
let cache: BookingEntry[] | null = null;
const listeners = new Set<() => void>();

function read(): BookingEntry[] {
  if (cache) return cache;
  try { cache = JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { cache = []; }
  return cache!;
}

export function addBooking(entry: Omit<BookingEntry, "id">) {
  cache = [...read(), { ...entry, id: crypto.randomUUID() }];
  localStorage.setItem(KEY, JSON.stringify(cache));
  listeners.forEach((l) => l());
}

const empty: BookingEntry[] = [];
export function useBookings() {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    read,
    () => empty,
  );
}
