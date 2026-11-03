import Image from "next/image";
import { business } from "@/lib/site";
import { Chars } from "./Chars";
import { IconArrowRight } from "./Icons";

export function Product() {
  return (
    <section className="product" id="product" aria-labelledby="product-title">
      <div className="wrap">
        <div className="prod-grid">
          <div className="prod-left">
            <div className="eyebrow">01 — The bottle</div>
            <h2 className="stencil" id="product-title" data-chars>
              <Chars text="Aqua" />
              <span className="script">
                <Chars text="Mareeba" />
              </span>
            </h2>
            <dl className="specs">
              <dt>Volume</dt>
              <dd>{business.volume}</dd>
              <dt>Type</dt>
              <dd>Packaged drinking water</dd>
              <dt>Process</dt>
              <dd>RO · UV treated · Ozonised</dd>
              <dt>Standard</dt>
              <dd>
                {business.bis.standard} · {business.bis.licence}
              </dd>
              <dt>Best before</dt>
              <dd>{business.shelfLife}</dd>
            </dl>
          </div>
          <div className="frame">
            <span className="mono tagl">500 ML</span>
            <span className="mono tagr">Fresh water</span>
            <div className="prod-slot slot" id="prodSlot">
              <div className="bottle-fallback">
                <Image src="/images/bottle-studio.webp" alt="" fill sizes="(max-width: 960px) 50vw, 20vw" />
              </div>
            </div>
          </div>
          <div className="prod-right">
            <div className="eyebrow">Made by Rain Drops, Kerala</div>
            <p>
              Aqua Mareeba is purified through reverse osmosis, treated with UV light and ozonised before it is sealed. Every
              bottle is BIS certified and packed in a hygienic plant in Kolayad, Kannur.
            </p>
            <div className="badges">
              <span>BIS certified</span>
              <span>FSSAI licensed</span>
              <span>Recyclable bottle</span>
            </div>
            <a className="care" href={business.phoneHref}>
              {business.phone}
              <small>Customer care · orders &amp; bulk supply</small>
            </a>
            <div className="row">
              <a href="#enquiry" className="btn-a">
                Enquire for orders <IconArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
