import Image from "next/image";
import { Chars } from "./Chars";
import { MapCard } from "./MapCard";
import { PurifyCard } from "./PurifyCard";

export function SourceToSeal() {
  return (
    <section className="flow" id="flow" aria-labelledby="flow-title">
      <div className="flow-inner">
        <div className="wrap">
          <div className="flow-head">
            <div>
              <div className="eyebrow">02 — How it&apos;s made</div>
              <h2 className="stencil" id="flow-title" style={{ marginTop: 12 }} data-chars>
                <Chars text="Source to seal" />
              </h2>
            </div>
          </div>
          <div className="track">
            <div className="panel img">
              <Image
                src="/images/bottling-line.webp"
                alt="Rows of Aqua Mareeba bottles on the filling and sealing line"
                fill
                sizes="(max-width: 899px) 100vw, 55vw"
              />
              <span className="mono cap">Filling &amp; sealing line</span>
            </div>
            <PurifyCard />
            <div className="panel seal">
              <div className="seal-copy">
                <div className="eyebrow">Check every bottle</div>
                <h3 className="stencil" data-chars>
                  <Chars text="Seal it," />
                  <br />
                  <em>
                    <Chars text="trust it" />
                  </em>
                </h3>
                <p>
                  Batch number, date of manufacture, expiry date and MRP are printed on the bottle neck. Do not accept a bottle if
                  the seal is broken or tampered.
                </p>
                <div className="mini">
                  <div>
                    <b>3</b>
                    <span>purification stages</span>
                  </div>
                  <div>
                    <b>6 mo</b>
                    <span>best before</span>
                  </div>
                  <div>
                    <b>500 ml</b>
                    <span>per bottle</span>
                  </div>
                </div>
              </div>
              <div className="seal-img">
                <Image
                  src="/images/back-label.webp"
                  alt="Back of the Aqua Mareeba label showing the FSSAI licence, ISI mark and BIS licence number"
                  fill
                  sizes="(max-width: 620px) 100vw, 22vw"
                />
              </div>
            </div>
            <MapCard />
          </div>
        </div>
      </div>
    </section>
  );
}
