import Image from "next/image";
import { business } from "@/lib/site";
import { Chars } from "./Chars";

const cards = [
  {
    title: "Certified quality",
    text: `BIS certified to ${business.bis.standard} for packaged drinking water and licensed by FSSAI.`,
    foot: business.bis.licence,
    icon: (
      <>
        <path d="M26 15 17 18v7c0 5 4 9 9 10 5-1 9-5 9-10v-7z" />
        <path d="m22 26 3 3 5-6" />
      </>
    ),
  },
  {
    title: "Triple purified",
    text: "RO process, UV treatment and ozonisation work together to give you clean, fresh-tasting water.",
    foot: "RO · UV · Ozone",
    icon: <path d="M26 14s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z" />,
  },
  {
    title: "Made in Kerala",
    text: "Packed by M/s. Rain Drops in Kolayad, Kannur, close to the homes and shops we serve.",
    foot: `PIN ${business.address.postalCode}`,
    icon: (
      <>
        <path d="M26 37s-8-7-8-13a8 8 0 0 1 16 0c0 6-8 13-8 13z" />
        <circle cx="26" cy="24" r="3" />
      </>
    ),
  },
  {
    title: "Recyclable bottle",
    text: "Our bottle is recyclable. Please crush it after use and don't litter.",
    foot: "Crush after use",
    icon: <path d="M20 22l6-8 6 8M18 30l-3 6h8M34 30l3 6h-8" />,
  },
];

const gallery = [
  { src: "/images/bottles-trio.webp", alt: "Three Aqua Mareeba bottles", cap: "500 ml bottle" },
  { src: "/images/case-pack.webp", alt: "A case of twelve Aqua Mareeba bottles", cap: "Bulk supply" },
  { src: "/images/label-closeup.webp", alt: "Close-up of the Aqua Mareeba label with water droplets", cap: "RO · UV · Ozonised" },
  { src: "/images/bottling-line.webp", alt: "Aqua Mareeba bottles on the bottling line", cap: "Kolayad plant" },
  { src: "/images/back-label.webp", alt: "Aqua Mareeba back label with certification details", cap: "BIS · FSSAI" },
];

export function WhyUs() {
  return (
    <section className="why" id="why" aria-labelledby="why-title">
      <div className="wrap">
        <div className="head">
          <div className="eyebrow">03 — Why Mareeba</div>
          <h2 className="stencil" id="why-title" data-chars>
            <Chars text="Fresh water," />
            <br />
            <Chars text="every day" />
          </h2>
        </div>
        <div className="cards">
          {cards.map((c) => (
            <article className="q" key={c.title}>
              <svg className="badge" viewBox="0 0 52 52" fill="none" stroke="#14204d" strokeWidth="1.4" aria-hidden="true">
                <circle cx="26" cy="26" r="24" />
                <circle cx="26" cy="26" r="19" strokeDasharray="2 3" />
                {c.icon}
              </svg>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <div className="foot">{c.foot}</div>
            </article>
          ))}
        </div>
      </div>
      <div className="gallery-wrap">
        <div className="gallery" id="gallery">
          {gallery.map((g) => (
            <figure className="g" key={g.src}>
              <Image src={g.src} alt={g.alt} fill sizes="(max-width: 600px) 70vw, 380px" />
              <figcaption>{g.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
