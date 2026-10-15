import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { SiteLayout } from "@/components/client/SiteLayout";
import { categories } from "@/lib/categories";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Service Categories — Apoura" },
      { name: "description", content: "Browse 13 Indian event service categories and their specialist sub-services on Apoura." },
      { property: "og:title", content: "Service Categories — Apoura" },
      { property: "og:description", content: "From kalyana mandapams to chocolate fountains — find every event service." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <SiteLayout showFaq>
      <section className="section">
        <div className="section-heading"><div><p className="eyebrow">13 categories</p><h1 className="page-title">Every service for your event</h1></div></div>
        <div className="category-cards">
          {categories.map(({ id, name, icon: Icon, subs }) => (
            <article key={id} className={`category-card ${open === id ? "is-open" : ""}`}>
              <button type="button" className="category-card-head" aria-expanded={open === id} onClick={() => setOpen(open === id ? null : id)}>
                <span className="category-icon"><Icon aria-hidden="true" /></span>
                <span className="category-card-name">{name}<small>{subs.length} services</small></span>
                <ChevronDown aria-hidden="true" />
              </button>
              {open === id && (
                <div className="chip-row">
                  <Link className="chip" to="/vendors" search={{ category: id }}>All {name}</Link>
                  {subs.map((s) => <Link key={s.slug} className="chip" to="/vendors" search={{ category: id, sub: s.slug }}>{s.name}</Link>)}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
