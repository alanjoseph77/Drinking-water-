import { business } from "@/lib/site";
import { IconExternal } from "./Icons";

export function MapCard() {
  return (
    <a
      className="panel img map"
      href={business.mapsDirections}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get directions to Aqua Mareeba Drinking Water in Google Maps"
    >
      <svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="600" height="420" fill="#e6eaea" />
        <g fill="#d6dfdc">
          <rect x="30" y="30" width="150" height="90" rx="6" />
          <rect x="210" y="40" width="120" height="70" rx="6" />
          <rect x="440" y="30" width="130" height="110" rx="6" />
          <rect x="40" y="260" width="120" height="120" rx="6" />
          <rect x="450" y="250" width="120" height="130" rx="6" />
        </g>
        <g fill="#cfe0cf">
          <path d="M200 150c40-20 90-10 110 20s-10 70-60 70-90-60-50-90z" />
          <circle cx="520" cy="200" r="34" />
        </g>
        <path d="M-10 330C80 300 120 360 210 340S330 250 420 270 560 360 620 330" fill="none" stroke="#b9dcf3" strokeWidth="18" strokeLinecap="round" />
        <g fill="none" stroke="#fff" strokeLinecap="round">
          <path d="M0 200H600" strokeWidth="14" />
          <path d="M390 0V420" strokeWidth="12" />
          <path d="M190 0C200 100 170 160 120 420" strokeWidth="8" />
          <path d="M390 140L600 60" strokeWidth="7" />
          <path d="M0 140H390" strokeWidth="5" />
        </g>
        <g transform="translate(390 170)">
          <circle r="10" fill="#1592dc" opacity=".35">
            <animate attributeName="r" values="10;42" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values=".4;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <ellipse cx="0" cy="2" rx="10" ry="4" fill="#14204d" opacity=".25" />
          <path d="M0 0C-4-12-18-20-18-36a18 18 0 0 1 36 0C18-20 4-12 0 0z" fill="#14204d" />
          <circle cy="-36" r="7" fill="#fff" />
        </g>
        <text x="412" y="138" fontFamily="monospace" fontSize="12" fill="#14204d" letterSpacing="1">
          AQUA MAREEBA
        </text>
      </svg>
      <div className="map-info">
        <span className="eyebrow">Find us</span>
        <b>Aqua Mareeba Drinking Water</b>
        <span>
          {business.address.street}, {business.address.locality}, {business.address.region} {business.address.postalCode}
        </span>
        <span className="mono coords">11.8603° N · 75.6982° E</span>
        <span className="btn-a">
          Get directions <IconExternal />
        </span>
      </div>
    </a>
  );
}
