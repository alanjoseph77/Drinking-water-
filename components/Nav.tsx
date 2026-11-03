"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";
import { Logo } from "./Icons";

export function Nav() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="nav">
      <div className="wrap">
        <div className="bar">
          <a href="#top" aria-label="Aqua Mareeba home">
            <Logo />
          </a>
          <nav aria-label="Main">
            <ul>
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={l.href} className={active === l.id ? "on" : undefined} aria-current={active === l.id ? "true" : undefined}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#enquiry" className="btn-a">
            Order now
          </a>
        </div>
      </div>
    </header>
  );
}
