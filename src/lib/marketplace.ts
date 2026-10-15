import { categoryById, subName } from "./categories";

export interface MarketplaceListing {
  name: string;
  type: string;
  category: string; // category id, or "Organiser"
  description: string;
  rating: string;
  reviews: number;
  city: string;
  price: number;
  priceLabel: string;
  image: string;
  badge?: string | undefined;
  subs?: string[]; // subcategory slugs
  /** Fixed package / per-unit price → "Book Now". Otherwise custom quote only. */
  bookable?: boolean;
  unitLabel?: string; // e.g. "plates"; omitted = package
}

export interface MarketplaceFilters {
  category: string;
  city: string;
  budget: string;
  hasSearched: boolean;
  sub?: string | undefined;
  q?: string | undefined;
}

export const DEPOSIT_RATE = 0.2;

export function bookingQuote(price: number, units: number) {
  const total = price * Math.max(1, Math.floor(units) || 1);
  const deposit = Math.round(total * DEPOSIT_RATE);
  return { total, deposit, balance: total - deposit };
}

export function matchesText(listing: MarketplaceListing, q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const hay = [
    listing.name, listing.description, listing.type,
    categoryById(listing.category)?.name ?? listing.category,
    ...(listing.subs ?? []).map(subName),
  ].join(" ").toLowerCase();
  return needle.split(/\s+/).every((w) => hay.includes(w));
}

export function filterMarketplaceListings<T extends MarketplaceListing>(
  listings: T[],
  filters: MarketplaceFilters,
  listingKind: "vendors" | "organisers",
): T[] {
  if (!filters.hasSearched) return listings;

  return listings.filter((listing) => {
    const matchesCategory =
      listingKind === "organisers" ||
      !filters.category || filters.category === "Any service" ||
      listing.category === filters.category;
    const matchesSub = listingKind === "organisers" || !filters.sub || (listing.subs ?? []).includes(filters.sub);
    const matchesCity = !filters.city || filters.city === "Any city" || listing.city === filters.city;
    const matchesBudget = !filters.budget || listing.price <= Number(filters.budget);

    return matchesCategory && matchesSub && matchesCity && matchesBudget && matchesText(listing, filters.q ?? "");
  });
}
