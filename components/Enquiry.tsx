"use client";

import { useState } from "react";
import { business } from "@/lib/site";
import { Chars } from "./Chars";
import { IconMail, IconPhone } from "./Icons";

/**
 * Order enquiry form. It opens the visitor's email app with the message filled in,
 * so it works without a server. To receive enquiries directly instead, point the
 * submit handler at a form service or a Next.js route handler (see README).
 */
export function Enquiry() {
  const [msg, setMsg] = useState<{ text: string; err?: boolean }>({ text: "" });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const place = String(data.get("place") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || phone.replace(/\D/g, "").length < 10) {
      setMsg({ text: "Enter your name and a 10-digit phone number so we can call you back.", err: true });
      return;
    }
    const subject = `Order enquiry from ${name}`;
    const lines = [`Name: ${name}`, `Phone: ${phone}`];
    if (place) lines.push(`Place: ${place}`);
    if (message) lines.push("", message);
    const body = lines.join("\n");
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMsg({ text: `Your email app should open now. If it doesn't, call ${business.phone}.` });
  }

  return (
    <section className="enquiry" id="enquiry" aria-labelledby="enq-title">
      <div className="wrap enq-grid">
        <div>
          <div className="eyebrow">05 — Orders &amp; bulk supply</div>
          <h2 className="stencil" id="enq-title" data-chars>
            <Chars text="Order Aqua Mareeba" />
          </h2>
          <p>
            For shops, offices, events and home delivery, send us your requirement and we will call you back. Or call customer
            care directly.
          </p>
          <div className="row">
            <a className="btn-a" href={business.phoneHref}>
              <IconPhone /> Call {business.phone}
            </a>
            <a className="btn-line" href={`mailto:${business.email}`}>
              <IconMail /> Email us
            </a>
          </div>
        </div>
        <form className="enq-form" onSubmit={onSubmit} noValidate>
          <label>
            Name
            <input name="name" id="enq-name" autoComplete="name" required />
          </label>
          <label>
            Phone
            <input name="phone" id="enq-phone" type="tel" inputMode="tel" autoComplete="tel" required />
          </label>
          <label className="full">
            Place / delivery area
            <input name="place" id="enq-place" autoComplete="address-level2" />
          </label>
          <label className="full">
            Requirement
            <textarea name="message" id="enq-message" placeholder="How many bottles or cases, and how often?" />
          </label>
          <div className="enq-actions">
            <button type="submit" className="btn-a">
              Send enquiry
            </button>
          </div>
          <p className={`enq-msg${msg.err ? " err" : ""}`} role="status">
            {msg.text}
          </p>
        </form>
      </div>
    </section>
  );
}
