type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, viewBox: "0 0 24 24", "aria-hidden": true } as const;

export const IconShield = (p: P) => (<svg {...base} {...p}><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>);
export const IconLeaf = (p: P) => (<svg {...base} {...p}><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" /></svg>);
export const IconFilter = (p: P) => (<svg {...base} {...p}><path d="M4 6h16l-6 7v5l-4 2v-7z" /></svg>);
export const IconSun = (p: P) => (<svg {...base} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" /></svg>);
export const IconBubbles = (p: P) => (<svg {...base} {...p}><circle cx="8" cy="15" r="4" /><circle cx="16" cy="9" r="3" /><circle cx="17.5" cy="17.5" r="2" /></svg>);
export const IconArrowRight = (p: P) => (<svg {...base} strokeWidth={2} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const IconArrowDown = (p: P) => (<svg {...base} strokeWidth={1.8} {...p}><path d="M12 5v14M6 13l6 6 6-6" /></svg>);
export const IconExternal = (p: P) => (<svg {...base} strokeWidth={2} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>);
export const IconPlus = (p: P) => (<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...p}><path d="M6 1v10M1 6h10" /></svg>);
export const IconPhone = (p: P) => (<svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>);
export const IconMail = (p: P) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`logo ${className ?? ""}`}>
      <span className="aq">AQUA</span>
      <span className="mr">Mareeba</span>
    </span>
  );
}
