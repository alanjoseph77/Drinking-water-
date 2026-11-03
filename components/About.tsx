import { Chars } from "./Chars";

export function About() {
  return (
    <section className="welcome" id="welcome" aria-labelledby="about-title">
      <svg className="waves" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 90c180-40 360-40 540 0s360 40 540 0 270-40 360-20v130H0z" fill="#1a2a60" />
        <path d="M0 120c200-30 400-30 600 0s400 30 600 0 180-20 240-10v70H0z" fill="#20357a" />
      </svg>
      <div className="wrap" style={{ position: "relative" }}>
        <div className="eyebrow">About Aqua Mareeba</div>
        <h2 className="stencil" id="about-title" data-chars>
          <Chars text="Fresh water you can trust, from Kerala" />
        </h2>
        <p data-fade>
          Aqua Mareeba is made by M/s. Rain Drops in Kolayad, Kannur. We purify every drop in three stages and check every
          batch, so your family gets clean, safe drinking water in every bottle.
        </p>
      </div>
    </section>
  );
}
