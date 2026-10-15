import type { MarketplaceListing } from "./marketplace";
import cateringPhoto from "@/assets/catering.jpg.asset.json";
import corporatePhoto from "@/assets/corporate.jpg.asset.json";
import decorPhoto from "@/assets/decor.jpg.asset.json";
import heroPhoto from "@/assets/hero.jpg.asset.json";
import musicPhoto from "@/assets/music.jpg.asset.json";
import photographyPhoto from "@/assets/photography.jpg.asset.json";

export const cities = ["Chennai", "Bengaluru", "Mumbai", "Hyderabad", "Delhi", "Kochi", "Jaipur"];
export const eventTypes = ["Wedding", "Engagement", "Birthday", "Corporate", "Concert", "Baby shower", "Anniversary"];

const org = (name: string, description: string, rating: string, reviews: number, city: string, price: number, priceLabel: string, image: string, badge?: string): MarketplaceListing =>
  ({ name, type: "Event organiser", category: "Organiser", description, rating, reviews, city, price, priceLabel, image, badge });

export const organisers: MarketplaceListing[] = [
  org("Meera Raghavan Events", "Full-service weddings, planned to the minute.", "4.9", 128, "Chennai", 350000, "₹3,50,000", heroPhoto.url),
  org("Stagecraft Corporate", "Launches, offsites and conferences that run on time.", "4.7", 86, "Bengaluru", 500000, "₹5,00,000", corporatePhoto.url),
  org("Sunburst Live", "Music nights and big celebrations outdoors.", "4.6", 54, "Chennai", 250000, "₹2,50,000", musicPhoto.url, "Limited dates"),
  org("Shubh Aarambh Planners", "Palace weddings in Rajasthan, with heart.", "4.8", 97, "Jaipur", 800000, "₹8,00,000", decorPhoto.url),
];

export const vendors: MarketplaceListing[] = [
  { name: "Petals & Drapes", type: "Decoration and flowers", category: "decor", description: "Floral stages and fresh-flower mandaps.", rating: "4.9", reviews: 143, city: "Chennai", price: 120000, priceLabel: "₹1,20,000", image: decorPhoto.url, subs: ["floral-mandap", "stage-backdrops", "jasmine-and-traditional-garlands"] },
  { name: "Leela Palace Grand Lawn", type: "Venue and marriage halls", category: "venue", description: "Seafront lawn for up to 1,200 guests.", rating: "4.9", reviews: 310, city: "Chennai", price: 450000, priceLabel: "₹4,50,000", image: heroPhoto.url, subs: ["lawns-and-open-grounds", "banquet-halls"] },
  { name: "Annapoorna Caterers", type: "Catering & Food", category: "catering", description: "Traditional South Indian banana-leaf feasts.", rating: "4.8", reviews: 212, city: "Chennai", price: 650, priceLabel: "₹650 / plate", image: cateringPhoto.url, subs: ["traditional-banana-leaf-sadhya", "north-and-south-indian-buffets"], bookable: true, unitLabel: "plates" },
  { name: "Chaat Street Live Counters", type: "Catering & Food", category: "catering", description: "Pani puri, chaat and dosa live counters with chefs.", rating: "4.7", reviews: 98, city: "Bengaluru", price: 180, priceLabel: "₹180 / guest", image: cateringPhoto.url, subs: ["live-counters-pani-puri-chaat-dosa"], bookable: true, unitLabel: "guests" },
  { name: "Cocoa Cascade", type: "Catering & Food", category: "catering", description: "Chocolate fountains with fruit and marshmallow platters.", rating: "4.6", reviews: 61, city: "Chennai", price: 18000, priceLabel: "₹18,000", image: cateringPhoto.url, subs: ["chocolate-fountain", "sweets-and-mithai-counters"], bookable: true },
  { name: "Lumen Frames Studio", type: "Photography and videography", category: "photography", description: "Candid wedding stories and cinematic films.", rating: "4.8", reviews: 176, city: "Mumbai", price: 90000, priceLabel: "₹90,000", image: photographyPhoto.url, subs: ["candid-wedding-photography", "cinematic-teasers-drone-shoots"], bookable: true },
  { name: "Snap360 Booths", type: "Photography and videography", category: "photography", description: "360 photobooth with instant prints, 4 hours.", rating: "4.5", reviews: 44, city: "Chennai", price: 25000, priceLabel: "₹25,000", image: photographyPhoto.url, subs: ["360-photobooths"], bookable: true },
  { name: "Bassline DJ Co.", type: "Audio, lighting and DJs", category: "audio-dj", description: "4-hour DJ set with dance floor and lights.", rating: "4.7", reviews: 83, city: "Hyderabad", price: 40000, priceLabel: "₹40,000", image: musicPhoto.url, subs: ["dj-and-dance-floors", "ambient-and-up-lighting"], bookable: true },
  { name: "Glow by Kavya", type: "Makeup and Mehendi", category: "makeup-mehendi", description: "Bridal HD makeup package with draping.", rating: "4.9", reviews: 120, city: "Chennai", price: 35000, priceLabel: "₹35,000", image: decorPhoto.url, subs: ["bridal-hd-airbrush-makeup", "saree-draping"], bookable: true },
  { name: "Royal Pandal Works", type: "Shamiyana, stage and furniture", category: "shamiyana", description: "Pandals, German tents and stage builds.", rating: "4.6", reviews: 57, city: "Kochi", price: 150000, priceLabel: "₹1,50,000", image: corporatePhoto.url, subs: ["shamiyana-pandals", "german-tent-structures", "wooden-and-elevated-stages"] },
];
