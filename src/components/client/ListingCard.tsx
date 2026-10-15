import { useState } from "react";
import { Heart, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MarketplaceListing } from "@/lib/marketplace";
import { BookingDialog } from "./BookingDialog";

export function ListingCard({ listing, isSaved, onToggleSaved }: { listing: MarketplaceListing; isSaved: boolean; onToggleSaved: (name: string) => void }) {
  const [mode, setMode] = useState<"book" | "quote" | null>(null);
  return (
    <article className="listing-card">
      <div className="listing-image-wrap">
        <img className="listing-image" src={listing.image} alt={`${listing.name} event`} loading="lazy" />
        {listing.badge && <span className="listing-badge">{listing.badge}</span>}
        <Button type="button" variant="ghost" size="icon" className={`save-button ${isSaved ? "is-saved" : ""}`} onClick={() => onToggleSaved(listing.name)} aria-label={`${isSaved ? "Remove" : "Save"} ${listing.name} ${isSaved ? "from" : "to"} favorites`}>
          <Heart aria-hidden="true" fill={isSaved ? "currentColor" : "none"} />
        </Button>
      </div>
      <div className="listing-info">
        <p className="eyebrow listing-type">{listing.type}</p>
        <h3>{listing.name}</h3>
        <p className="listing-description">{listing.description}</p>
        <div className="listing-meta"><span className="rating"><Star aria-hidden="true" fill="currentColor" />{listing.rating}</span><span>({listing.reviews})</span><span className="listing-city"><MapPin aria-hidden="true" />{listing.city}</span></div>
        <p className="listing-price">From <strong>{listing.priceLabel}</strong></p>
        <div className="card-actions">
          {listing.bookable && <Button size="sm" onClick={() => setMode("book")}>Book Now</Button>}
          <Button size="sm" variant="outline" onClick={() => setMode("quote")}>{listing.bookable ? "Custom Quote" : "Request Custom Quote"}</Button>
        </div>
      </div>
      {mode && <BookingDialog listing={listing} mode={mode} onClose={() => setMode(null)} />}
    </article>
  );
}
