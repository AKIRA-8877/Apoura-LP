import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/client/SiteLayout";
import { ListingCard } from "@/components/client/ListingCard";
import { categories, categoryById } from "@/lib/categories";
import { cities, vendors } from "@/lib/listings";
import { filterMarketplaceListings } from "@/lib/marketplace";

interface VendorSearch { category?: string | undefined; sub?: string | undefined; q?: string | undefined; city?: string | undefined; budget?: string | undefined }

export const Route = createFileRoute("/vendors")({
  validateSearch: (s: Record<string, unknown>): VendorSearch => {
    const str = (v: unknown) => (typeof v === "string" && v ? v : typeof v === "number" ? String(v) : undefined);
    return { category: str(s["category"]), sub: str(s["sub"]), q: str(s["q"]), city: str(s["city"]), budget: str(s["budget"]) };
  },
  head: () => ({
    meta: [
      { title: "Discover Event Vendors — Apoura" },
      { name: "description", content: "Search caterers, decorators, photographers, DJs and more. Book standard packages instantly or request custom quotes." },
      { property: "og:title", content: "Discover Event Vendors — Apoura" },
      { property: "og:description", content: "Search event vendors by category, sub-service, city and budget." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VendorsPage,
});

function VendorsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/vendors" });
  const [q, setQ] = useState(search.q ?? "");
  const [saved, setSaved] = useState<string[]>([]);
  const active = categoryById(search.category);
  const results = filterMarketplaceListings(vendors, { category: search.category ?? "", sub: search.sub, q: search.q, city: search.city ?? "", budget: search.budget ?? "", hasSearched: true }, "vendors");
  const set = (patch: Partial<VendorSearch>) => navigate({ search: (prev) => ({ ...prev, ...patch }) });

  return (
    <SiteLayout>
      <section className="section">
        <div className="section-heading"><div><p className="eyebrow">Directory</p><h1 className="page-title">{active ? active.name : "All event vendors"}</h1></div></div>
        <form className="directory-search" onSubmit={(e) => { e.preventDefault(); set({ q: q || undefined }); }}>
          <input aria-label="Search vendors" placeholder="Try “pani puri” or “chocolate fountain”" value={q} onChange={(e) => setQ(e.target.value)} />
          <select aria-label="Category" value={search.category ?? ""} onChange={(e) => set({ category: e.target.value || undefined, sub: undefined })}>
            <option value="">Any service</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select aria-label="City" value={search.city ?? ""} onChange={(e) => set({ city: e.target.value || undefined })}>
            <option value="">Any city</option>
            {cities.map((c) => <option key={c}>{c}</option>)}
          </select>
          <Button type="submit"><Search aria-hidden="true" />Search</Button>
        </form>
        {active && (
          <div className="chip-row" role="group" aria-label="Sub-services">
            <button type="button" className={`chip ${!search.sub ? "is-active" : ""}`} onClick={() => set({ sub: undefined })}>All</button>
            {active.subs.map((s) => (
              <button type="button" key={s.slug} className={`chip ${search.sub === s.slug ? "is-active" : ""}`} onClick={() => set({ sub: s.slug })}>{s.name}</button>
            ))}
          </div>
        )}
        <p className="result-count">{results.length} vendor{results.length === 1 ? "" : "s"} found</p>
        <div className="listing-grid">
          {results.map((item) => (
            <ListingCard key={item.name} listing={item} isSaved={saved.includes(item.name)} onToggleSaved={(n) => setSaved((c) => c.includes(n) ? c.filter((x) => x !== n) : [...c, n])} />
          ))}
          {results.length === 0 && <p className="empty-results">No vendors match yet. <Link to="/vendors">Clear filters</Link></p>}
        </div>
      </section>
    </SiteLayout>
  );
}
