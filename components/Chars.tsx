import { Fragment } from "react";

/** Renders text as individual letter spans for the letter-by-letter reveal, with a readable copy for screen readers. */
export function Chars({ text }: { text: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <Fragment key={wi}>
            {wi > 0 && " "}
            <span className="wd">
              {[...word].map((c, ci) => (
                <span className="ch" key={ci}>
                  {c}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  );
}
