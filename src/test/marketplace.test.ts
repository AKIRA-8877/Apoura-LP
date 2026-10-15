import { describe, expect, it } from "vitest";

import { categories } from "@/lib/categories";
import { vendors, organisers } from "@/lib/listings";
import { bookingQuote, filterMarketplaceListings, type MarketplaceFilters } from "@/lib/marketplace";

const base: MarketplaceFilters = { category: "", city: "", budget: "", hasSearched: true };
const names = (f: Partial<MarketplaceFilters>) => filterMarketplaceListings(vendors, { ...base, ...f }, "vendors").map((l) => l.name);

describe("marketplace", () => {
  it("has exactly 13 categories", () => expect(categories).toHaveLength(13));

  it("shows the ₹90,000 Mumbai photographer under Photography, Mumbai, ₹100,000 budget", () => {
    expect(names({ category: "photography", city: "Mumbai", budget: "100000" })).toEqual(["Lumen Frames Studio"]);
  });

  it("excludes the ₹120,000 decorator at a ₹100,000 budget", () => {
    expect(names({ category: "decor", city: "Chennai", budget: "100000" })).toHaveLength(0);
  });

  it("finds pani puri counters by keyword", () => expect(names({ q: "pani puri" })).toEqual(["Chaat Street Live Counters"]));

  it("filters by the chocolate-fountain sub-service", () => {
    expect(names({ category: "catering", sub: "chocolate-fountain" })).toEqual(["Cocoa Cascade"]);
  });

  it("ignores category for organisers", () => {
    expect(filterMarketplaceListings(organisers, { ...base, category: "photography", city: "Chennai", budget: "400000" }, "organisers").map((l) => l.name))
      .toEqual(["Meera Raghavan Events", "Sunburst Live"]);
  });

  it("takes a 20% token advance: 200 plates × ₹650 → ₹26,000 deposit", () => {
    expect(bookingQuote(650, 200)).toEqual({ total: 130000, deposit: 26000, balance: 104000 });
  });
});
