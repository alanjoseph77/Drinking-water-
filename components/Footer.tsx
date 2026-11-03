import { business } from "@/lib/site";
import { CopyButton } from "./CopyButton";
import { Logo } from "./Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <a href="#top" aria-label="Back to top">
              <Logo />
            </a>
            <p>Packaged drinking water by {business.legalName}. RO process, UV treated, ozonised.</p>
          </div>
          <div>
            <h4 className="eyebrow">Explore</h4>
            <ul>
              <li><a href="#product">Product</a></li>
              <li><a href="#welcome">About</a></li>
              <li><a href="#why">Why us</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#enquiry">Order</a></li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow">Certification</h4>
            <ul>
              <li>BIS · {business.bis.standard}</li>
              <li>{business.bis.licence}</li>
              <li>FSSAI {business.fssai}</li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow">Contact</h4>
            <ul>
              <li><a href={business.phoneHref}>{business.phone}</a></li>
              <li><CopyButton value={business.email} /></li>
              <li>
                {business.address.street}, {business.address.locality}
                <br />
                {business.address.region} {business.address.postalCode}, {business.address.country}
              </li>
              <li>
                <a href={business.mapsDirections} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                  Get directions ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="giant" id="giant" role="img" aria-label="Mareeba">
        {"MAREEBA".split("").map((c, i) => (
          <span key={i} aria-hidden="true">{c}</span>
        ))}
      </div>
      <div className="wrap foot-bottom">
        <span className="mono" style={{ color: "var(--muted)" }}>© {year} {business.legalName} · {business.brand}</span>
        <span className="mono" style={{ color: "var(--muted)" }}>Kolayad · Kannur · Kerala</span>
      </div>
    </footer>
  );
}
