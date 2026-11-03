import { About } from "@/components/About";
import { BottleStage } from "@/components/BottleStage";
import { Enquiry } from "@/components/Enquiry";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Loader } from "@/components/Loader";
import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { Product } from "@/components/Product";
import { SourceToSeal } from "@/components/SourceToSeal";
import { WhyUs } from "@/components/WhyUs";
import { SITE_URL, business, faqs } from "@/lib/site";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Aqua Mareeba Drinking Water",
    legalName: business.legalName,
    description: business.description,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    telephone: "+91-490-2551004",
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: "Kannur",
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    hasMap: business.mapsDirections,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function Home() {
  return (
    <>
      <a className="skip" href="#product">
        Skip to content
      </a>
      <Loader />
      <Nav />
      <BottleStage />
      <Motion>
        <main id="top">
          <Hero />
          <Product />
          <About />
          <SourceToSeal />
          <WhyUs />
          <Faq />
          <Enquiry />
        </main>
        <Footer />
      </Motion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
