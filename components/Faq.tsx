"use client";

import { useState } from "react";
import { faqs } from "@/lib/site";
import { Chars } from "./Chars";
import { IconPlus } from "./Icons";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <div className="head">
          <div className="eyebrow">04 — Questions</div>
          <h2 className="stencil" id="faq-title" data-chars>
            <Chars text="Frequently asked" />
            <br />
            <Chars text="questions" />
          </h2>
        </div>
        <div className="acc">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`acc-item${isOpen ? " open" : ""}`} key={f.q}>
                <button
                  type="button"
                  className="acc-btn"
                  id={`faq-b${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-p${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="pm">
                    <IconPlus />
                  </span>
                </button>
                <div className="acc-panel" id={`faq-p${i}`} role="region" aria-labelledby={`faq-b${i}`}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
