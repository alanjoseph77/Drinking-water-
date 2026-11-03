"use client";

import { useState } from "react";
import { stages } from "@/lib/site";
import { IconArrowRight, Logo } from "./Icons";

export function PurifyCard() {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const stage = stages[i];

  const next = () => {
    setFlip(true);
    window.setTimeout(() => {
      setI((v) => (v + 1) % stages.length);
      setFlip(false);
    }, 300);
  };

  return (
    <div className="panel cardp">
      <div className={`pass${flip ? " flip" : ""}`} aria-live="polite">
        <div className="pass-top">
          <Logo />
          <span className="pass-step">
            Step {i + 1} / {stages.length}
          </span>
        </div>
        <h4>{stage.title}</h4>
        <p>{stage.text}</p>
      </div>
      <div className="pass-nav">
        <span className="mono" style={{ color: "var(--muted)" }}>
          Next stage
        </span>
        <button type="button" className="round-a" onClick={next} aria-label="Show next purification stage">
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
}
