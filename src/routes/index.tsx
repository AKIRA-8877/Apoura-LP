import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Building2, Check, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/client/SiteLayout";
import { ListingCard } from "@/components/client/ListingCard";
import { categories } from "@/lib/categories";
import { cities, eventTypes, organisers, vendors } from "@/lib/listings";
import heroPhoto from "@/assets/hero.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apoura — Find the Right Event Professionals" },
      {
        name: "description",
        content:
          "Discover trusted event vendors and organisers, compare services and bring your next celebration together with Apoura.",
      },
      { property: "og:title", content: "Apoura — Find the Right Event Professionals" },
      {
        property: "og:description",
        content: "Discover trusted event vendors and organisers for every occasion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApouraHome,
});

function ApouraHome() {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState("Wedding");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("Chennai");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  const [keyword, setKeyword] = useState("");
  const [saved, setSaved] = useState<string[]>(["Meera Raghavan Events", "Lumen Frames Studio"]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate({ to: "/vendors", search: { category: category || undefined, city: city === "Any city" ? undefined : city, budget: budget || undefined, q: keyword || undefined } });
  };
  const toggleSaved = (name: string) =>
    setSaved((c) => (c.includes(name) ? c.filter((i) => i !== name) : [...c, name]));

  return (
    <SiteLayout showFaq>
        <section className="hero-section" id="top">
          <img className="hero-image" src={heroPhoto.url} alt="An evening wedding venue with a marigold-decorated mandap" />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">Apoura event marketplace</p>
            <h1>Find the Right Event Professionals for Every Occasion.</h1>
            <p className="hero-copy">
              Discover trusted event vendors and organisers, explore their services, compare quotations and find the right team for your next event.
            </p>
            <form className="event-search" id="search" onSubmit={submitSearch}>
              <label className="search-field">
                <span>Event type</span>
                <span className="select-wrap">
                  <select value={eventType} onChange={(e) => setEventType(e.target.value)} aria-label="Event type">
                    {eventTypes.map((item) => <option key={item}>{item}</option>)}
                  </select><ChevronDown aria-hidden="true" />
                </span>
              </label>
              <label className="search-field">
                <span>Service category</span>
                <span className="select-wrap">
                  <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Service category">
                    <option value="">Any service</option>
                    {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select><ChevronDown aria-hidden="true" />
                </span>
              </label>
              <label className="search-field">
                <span>City</span>
                <span className="select-wrap">
                  <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="City">
                    <option>Any city</option>
                    {cities.map((item) => <option key={item}>{item}</option>)}
                  </select><ChevronDown aria-hidden="true" />
                </span>
              </label>
              <label className="search-field keyword-field">
                <span>Keyword</span>
                <input aria-label="Keyword" placeholder="e.g. pani puri" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              </label>
              <label className="search-field date-field">
                <span>Event date</span>
                <input aria-label="Event date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
              <label className="search-field budget-field">
                <span>Budget up to (₹)</span>
                <input aria-label="Budget up to in rupees" inputMode="numeric" min="0" placeholder="Any" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
              </label>
              <Button type="submit" className="search-button"><Search aria-hidden="true" />Search</Button>
            </form>
            <div className="hero-links">
              <Button asChild className="hero-action"><Link to="/vendors">Explore Vendors <ArrowRight /></Link></Button>
              <Button asChild variant="secondary" className="hero-action hero-action-light"><a href="#organisers">Find an Event Organiser</a></Button>
              <a className="text-action" href="#businesses">List Your Business</a>
            </div>
          </div>
        </section>

        <section className="section categories-section" id="categories">
          <div className="section-heading">
            <div><p className="eyebrow">Book direct</p><h2>Browse by service category</h2></div>
            <Link className="section-link" to="/categories">All 13 categories <ArrowRight /></Link>
          </div>
          <div className="category-grid">
            {categories.map(({ id, name, icon: Icon }) => (
              <Link className="category-tile" key={id} to="/vendors" search={{ category: id }}>
                <span className="category-icon"><Icon aria-hidden="true" /></span><span>{name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section listing-section" id="organisers">
          <div className="section-heading">
            <div><p className="eyebrow">Full service</p><h2>Featured event organisers</h2></div>
            <a className="section-link" href="#organisers">All organisers <ArrowRight /></a>
          </div>
          <div className="listing-grid">
            {organisers.map((item) => (
              <ListingCard key={item.name} listing={item} isSaved={saved.includes(item.name)} onToggleSaved={toggleSaved} />
            ))}
          </div>
        </section>

        <section className="section listing-section vendors-section" id="vendors">
          <div className="section-heading">
            <div><p className="eyebrow">Top rated</p><h2>Featured vendors</h2></div>
            <Link className="section-link" to="/vendors">All vendors <ArrowRight /></Link>
          </div>
          <div className="listing-grid">
            {vendors.slice(0, 8).map((item) => (
              <ListingCard key={item.name} listing={item} isSaved={saved.includes(item.name)} onToggleSaved={toggleSaved} />
            ))}
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="section section-inner">
            <div className="section-heading"><div><p className="eyebrow">How it works</p><h2>Three steps to your event team</h2></div><a className="section-link" href="#search">Learn more <ArrowRight /></a></div>
            <div className="steps-grid">
              {[
                ["Discover", "Browse relevant local vendors and organisers."],
                ["Compare", "Submit your requirements and compare quotations."],
                ["Decide", "Review the proposed services and confirm your chosen provider."],
              ].map(([title = "", text = ""], index) => <StepCard key={title} number={index + 1} title={title} text={text} />)}
            </div>
            <div className="business-steps" id="businesses">
              <p className="eyebrow">For businesses</p><h3>List your services on Apoura</h3>
              <div className="steps-grid">
                {[
                  ["Register your business", "Create your vendor or organiser account."],
                  ["Submit your profile for review", "Tell us about your services, areas and starting prices."],
                  ["Publish and receive enquiries", "Once approved, your listing goes live and enquiries reach your workspace."],
                ].map(([title = "", text = ""], index) => <StepCard key={title} number={index + 1} title={title} text={text} />)}
              </div>
            </div>
          </div>
        </section>

        <section className="business-cta-section">
          <div className="business-cta">
            <div className="business-cta-copy">
              <p className="eyebrow">For vendors &amp; organisers</p>
              <h2>Turn Your Event Services into New Opportunities.</h2>
              <p>Showcase your business, reach customers searching for your services and manage enquiries from one workspace.</p>
            </div>
            <div className="business-cta-actions">
              <Button asChild variant="secondary"><a href="#businesses"><Building2 />Register as a Vendor</a></Button>
              <Button asChild variant="secondary"><a href="#businesses"><Check />Register as an Event Organiser</a></Button>
            </div>
          </div>
        </section>
      </SiteLayout>
  );
}

function StepCard({ number, title, text }: { number: number; title: string; text: string }) {
  return <article className="step-card"><span className="step-number">{number}</span><h4>{title}</h4><p>{text}</p></article>;
}

