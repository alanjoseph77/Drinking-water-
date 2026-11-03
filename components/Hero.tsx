import Image from "next/image";
import { Chars } from "./Chars";
import { IconArrowDown, IconBubbles, IconFilter, IconLeaf, IconShield, IconSun } from "./Icons";

const strip = [
  { Icon: IconShield, label: "BIS certified" },
  { Icon: IconLeaf, label: "FSSAI licensed" },
  { Icon: IconFilter, label: "RO process" },
  { Icon: IconSun, label: "UV treated" },
  { Icon: IconBubbles, label: "Ozonised" },
];

export function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <p className="hero-sub">
        Pure. Refreshing. <b>Triple-purified.</b>
      </p>
      <h1 className="stencil hero-title" id="hero-title">
        <span className="line" data-chars>
          <Chars text="Refreshing" />
        </span>
        <span className="line front" data-chars>
          <Chars text="Hydration" />
        </span>
      </h1>
      <div className="hero-slot slot" id="heroSlot">
        <div className="bottle-fallback">
          <Image src="/images/bottle-studio.webp" alt="Aqua Mareeba 500 ml bottle" fill priority sizes="(max-width: 820px) 60vw, 30vw" />
        </div>
      </div>
      <div className="hero-corner l">
        Packaged drinking water
        <br />
        Kolayad · Kannur · Kerala
      </div>
      <div className="hero-corner r">
        BIS · IS 14543
        <br />
        FSSAI licensed
      </div>
      <a href="#product" className="scroll-cue" aria-label="Scroll down to the product">
        <span>Scroll</span>
        <i>
          <IconArrowDown />
        </i>
      </a>
      <div className="strip">
        <div className="wrap">
          {strip.map(({ Icon, label }) => (
            <span key={label}>
              <Icon />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
