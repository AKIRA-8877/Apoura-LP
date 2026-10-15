import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import logo from "@/assets/apoura-logo.png.asset.json";
import { ThemePicker } from "./ThemePicker";

export function Logo({ subtext = "Plan · Track · Execute" }: { subtext?: string }) {
  return (
    <Link className="brand-lockup" to="/" aria-label="Apoura home">
      <img src={logo.url} alt="Apoura" />
      <span className="brand-wordmark"><strong>APOURA</strong><small>{subtext}</small></span>
    </Link>
  );
}

const faqs: [string, string][] = [
  ["How does booking and payment protection work on Apoura?", "Instant bookings are secured with a 20% token advance. Payments are held in milestone escrow and released to the provider as each stage of your event is delivered."],
  ["Can I book vendors directly or do I need an event organiser?", "Both. Book standalone specialists like caterers or photographers directly, or hire a full-service organiser to coordinate everything."],
  ["What happens if a vendor cancels?", "Apoura's verified replacement guarantee finds you a comparable provider, and your advance is refunded under our refund policy if no replacement suits you."],
  ["How do custom quotes work compared to instant booking?", "\"Book Now\" locks a standard package immediately. Custom quotes let you share bespoke requirements and negotiate line items before you commit."],
  ["How can event vendors and organisers list their business?", "Registration is free via \"For Businesses\". Submit your profile for review and your listing goes live once approved."],
];

export function FAQSection() {
  return (
    <section className="section faq-section" id="faq">
      <div className="section-heading"><div><p className="eyebrow">Help</p><h2>Frequently Asked Questions</h2></div></div>
      <Accordion type="single" collapsible>
        {faqs.map(([q, a]) => (
          <AccordionItem key={q} value={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function SiteLayout({ children, showFaq }: { children: ReactNode; showFaq?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return (
    <div className="apoura-site">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            <Link to="/vendors" onClick={close}>Discover Vendors</Link>
            <a href="/#organisers" onClick={close}>Find Event Organisers</a>
            <Link to="/categories" onClick={close}>Service Categories</Link>
            <a href="/#how-it-works" onClick={close}>How It Works</a>
            <a href="/#businesses" onClick={close}>For Businesses</a>
            <span className="mobile-auth">
              <Button asChild variant="ghost"><Link to="/auth" onClick={close}>Sign In</Link></Button>
              <Button asChild><Link to="/auth" search={{ tab: "signup" }} onClick={close}>Sign Up</Link></Button>
            </span>
          </nav>
          <div className="header-actions">
            <ThemePicker />
            <Button asChild variant="ghost"><Link to="/auth">Sign In</Link></Button>
            <Button asChild className="header-cta"><Link to="/auth" search={{ tab: "signup" }}>Sign Up</Link></Button>
          </div>
          <Button type="button" variant="outline" size="icon" className="mobile-menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>
      <main id="main">
        {children}
        {showFaq && <FAQSection />}
      </main>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-about">
            <Logo />
            <p>Discover the right event professionals. Compare your options. Bring your event together with Apoura.</p>
          </div>
          <FooterGroup title="Explore" links={[["Discover Vendors", "/vendors"], ["Event Organisers", "/#organisers"], ["Service Categories", "/categories"], ["How It Works", "/#how-it-works"]]} />
          <FooterGroup title="Businesses" links={[["List Your Business", "/#businesses"], ["Vendor sign in", "/auth"]]} />
          <FooterGroup title="Company" links={[["About Apoura", "/#top"], ["Frequently Asked Questions", "/#faq"], ["Help & Contact", "/#businesses"], ["Terms and Conditions", "/#top"], ["Privacy Policy", "/#top"]]} />
        </div>
        <div className="footer-bottom">© 2026 Apoura. All rights reserved.</div>
      </footer>
    </div>
  );
}

function FooterGroup({ title, links }: { title: string; links: [string, string][] }) {
  return <div className="footer-group"><p className="eyebrow">{title}</p>{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>;
}
