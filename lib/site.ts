// All business facts in one place. Everything here comes from the Aqua Mareeba label
// or from the owner. Edit this file to update contact details, FAQ answers, etc.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const business = {
  brand: "Aqua Mareeba",
  legalName: "M/s. Rain Drops",
  tagline: "Packaged drinking water",
  description:
    "Aqua Mareeba packaged drinking water by M/s. Rain Drops, Kolayad, Kannur, Kerala. RO process, UV treated and ozonised. BIS certified (IS 14543) and FSSAI licensed.",
  phone: "0490 2551004",
  phoneHref: "tel:+914902551004",
  email: "raindrops8161@gmail.com",
  address: {
    street: "Kolayad",
    locality: "Kannur Dist.",
    region: "Kerala",
    postalCode: "670650",
    country: "India",
  },
  geo: { lat: 11.8602986, lng: 75.6982499 },
  mapsDirections: "https://www.google.com/maps/dir/?api=1&destination=11.8602986,75.6982499",
  bis: { standard: "IS 14543", licence: "CM/L-6400129276" },
  fssai: "11324999000017",
  volume: "500 ml",
  shelfLife: "6 months from date of packing",
} as const;

export const stages = [
  {
    title: "RO process",
    text: "Reverse osmosis pushes water through a fine membrane that removes dissolved salts, impurities and heavy metals.",
  },
  {
    title: "UV treated",
    text: "Ultraviolet light neutralises bacteria and viruses without adding any chemicals to the water.",
  },
  {
    title: "Ozonised",
    text: "Ozone keeps the water fresh and sterile right up to the moment the bottle is sealed.",
  },
] as const;

export const faqs = [
  {
    q: "How is Aqua Mareeba purified?",
    a: "Every bottle goes through three stages: reverse osmosis (RO), UV treatment and ozonisation, before it is filled and sealed.",
  },
  {
    q: "Is Aqua Mareeba BIS certified?",
    a: `Yes. It is certified under ${business.bis.standard} for packaged drinking water, licence ${business.bis.licence}. You can check certification details at www.bis.gov.in. We are also FSSAI licensed (${business.fssai}).`,
  },
  {
    q: "Where can I find the batch number and expiry date?",
    a: "The batch number, date of manufacture, date of expiry and MRP are printed on the bottle neck.",
  },
  {
    q: "How long does a bottle stay good?",
    a: "Best before six months from the date of packing. Store it in a cool, dry, hygienic place, away from direct sunlight.",
  },
  {
    q: "What should I check before drinking?",
    a: "Make sure the seal is intact. Do not accept a bottle if the seal is broken or tampered.",
  },
  {
    q: "How do I place an order or bulk supply?",
    a: `Call customer care on ${business.phone}, email ${business.email}, or use the enquiry form at the bottom of this page.`,
  },
] as const;

export const navLinks = [
  { href: "#top", label: "Home", id: "hero" },
  { href: "#product", label: "Product", id: "product" },
  { href: "#welcome", label: "About", id: "welcome" },
  { href: "#why", label: "Why us", id: "why" },
  { href: "#faq", label: "FAQ", id: "faq" },
] as const;
