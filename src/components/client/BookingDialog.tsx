import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { addBooking } from "@/lib/bookings";
import { bookingQuote, type MarketplaceListing } from "@/lib/marketplace";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function BookingDialog({ listing, mode, onClose }: { listing: MarketplaceListing | null; mode: "book" | "quote"; onClose: () => void }) {
  const [date, setDate] = useState("");
  const [units, setUnits] = useState(100);
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);
  if (!listing) return null;
  const perUnit = Boolean(listing.unitLabel);
  const q = bookingQuote(listing.price, perUnit ? units : 1);

  const submit = () => {
    if (!date) return;
    addBooking(mode === "book"
      ? { provider: listing.name, kind: "booking", status: "confirmed", date, units: perUnit ? units : 1, total: q.total, deposit: q.deposit }
      : { provider: listing.name, kind: "quote", status: "quote requested", date, units, notes });
    setDone(true);
  };
  const close = () => { setDone(false); setDate(""); setNotes(""); onClose(); };

  return (
    <Dialog open onOpenChange={(o) => !o && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "book" ? `Book ${listing.name}` : `Request a custom quote from ${listing.name}`}</DialogTitle>
          <DialogDescription>
            {mode === "book" ? "Standard package — confirm instantly with a 20% token advance." : "Describe your requirements; the provider replies with a line-item quotation."}
          </DialogDescription>
        </DialogHeader>
        {done ? (
          <div className="booking-done">
            <p><strong>{mode === "book" ? "Booking confirmed!" : "Quote request sent!"}</strong></p>
            <p>{mode === "book" ? `Advance of ${inr(q.deposit)} reserves ${date}.` : "You'll see the provider's quotation in your workspace."}</p>
            <Button onClick={close}>Done</Button>
          </div>
        ) : (
          <div className="booking-form">
            <label>Event date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></label>
            {(perUnit || mode === "quote") && (
              <label>{perUnit ? `Number of ${listing.unitLabel}` : "Guest count"}
                <input type="number" min={1} value={units} onChange={(e) => setUnits(Number(e.target.value))} />
              </label>
            )}
            {mode === "quote" ? (
              <label>Requirements<textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Theme, number of days, special requests…" /></label>
            ) : (
              <dl className="price-breakdown">
                <div><dt>{perUnit ? `${inr(listing.price)} × ${units}` : "Package price"}</dt><dd>{inr(q.total)}</dd></div>
                <div><dt>Token advance (20%) due now</dt><dd><strong>{inr(q.deposit)}</strong></dd></div>
                <div><dt>Balance before event</dt><dd>{inr(q.balance)}</dd></div>
              </dl>
            )}
            <Button onClick={submit} disabled={!date}>{mode === "book" ? `Confirm & pay ${inr(q.deposit)}` : "Send quote request"}</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
