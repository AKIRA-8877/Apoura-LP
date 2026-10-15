import {
  Building2, Bus, Camera, ClipboardList, Flame, Flower2, Gift, Hotel, Music2, Sparkles, Tent, Users, Utensils,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export interface Category { id: string; name: string; icon: LucideIcon; subs: { slug: string; name: string }[] }

const raw: [string, string, LucideIcon, string[]][] = [
  ["venue", "Venue and marriage halls", Building2, ["Kalyana Mandapam", "Banquet Halls", "Lawns & Open Grounds", "Heritage Venues", "Resort & Farmhouses", "Mini Party Halls"]],
  ["shamiyana", "Shamiyana, stage and furniture", Tent, ["Shamiyana / Pandals", "German Tent Structures", "Wooden & Elevated Stages", "VIP Sofas & Banquet Chairs", "Dining Tables & Buffets", "Barricades & Staging"]],
  ["decor", "Decoration and flowers", Flower2, ["Floral Mandap", "Balloon & Theme Decor", "Entrance Gate", "Stage Backdrops", "Jasmine & Traditional Garlands", "Haldi & Mehendi Setups"]],
  ["catering", "Catering & Food", Utensils, ["Traditional Banana Leaf Sadhya", "North & South Indian Buffets", "Live Counters (Pani Puri, Chaat, Dosa)", "Chocolate Fountain", "Mocktail & Juice Bars", "Sweets & Mithai Counters"]],
  ["photography", "Photography and videography", Camera, ["Candid Wedding Photography", "Traditional Photo & Video", "Cinematic Teasers / Drone Shoots", "Pre-Wedding Shoots", "360 Photobooths", "Album Printing"]],
  ["audio-dj", "Audio, lighting and DJs", Music2, ["Concert Sound & PA Systems", "DJ & Dance Floors", "Ambient & Up-Lighting", "Trussing & Moving Heads", "LED Video Walls", "Generator Power Backup"]],
  ["makeup-mehendi", "Makeup and Mehendi", Sparkles, ["Bridal HD / Airbrush Makeup", "Guest Hair & Makeup", "Bridal Mehendi Artists", "Arabic & Organic Henna", "Saree Draping"]],
  ["traditional-priests", "Priests and traditional services", Flame, ["South Indian Vadhyar / Purohit", "North Indian Pandit", "Vedic Chanting / Nadaswaram", "Poornahuti & Homam Setups", "Traditional Turban & Welcoming"]],
  ["transportation", "Transportation", Bus, ["Luxury Bridal Cars", "Vintage Wedding Cars", "Guest AC Buses & Tempo Travellers", "Valet Parking Services"]],
  ["invitations-gifts", "Invitations and return gifts", Gift, ["Printed Traditional & Box Invitations", "Digital & Animated Video Invites", "Return Gifts (Brassware, Bags, Potli)", "Customized Mithai Hampers"]],
  ["event-planning", "Event planning and coordination", ClipboardList, ["End-to-End Wedding Planning", "Corporate Event Coordination", "Day-of Coordination", "Budget Management", "Vendor Management"]],
  ["manpower-rentals", "Manpower and equipment rentals", Users, ["Event Ushers & Hostesses", "Security & Bouncers", "Stage Lights & Mic Rentals", "Walkie-Talkies & PA Sets", "Cleaning Staff"]],
  ["accommodation", "Accommodation", Hotel, ["Hotel Room Block Bookings", "Serviced Apartments & Villas", "Guest Hospitality & Check-in Desks"]],
];

export const categories: Category[] = raw.map(([id, name, icon, subs]) => ({
  id, name, icon, subs: subs.map((n) => ({ slug: slugify(n), name: n })),
}));

export const categoryById = (id?: string) => categories.find((c) => c.id === id);
export const subName = (slug: string) =>
  categories.flatMap((c) => c.subs).find((s) => s.slug === slug)?.name ?? slug;
