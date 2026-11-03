import { Logo } from "./Icons";

/** Brand splash shown for ~1.3s on first paint. Pure CSS, so it always clears even if JavaScript is slow. */
export function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <Logo />
      <i />
    </div>
  );
}
