# Aqua Mareeba website

Website for **Aqua Mareeba** packaged drinking water by M/s. Rain Drops, Kolayad, Kannur, Kerala.

Built with Next.js 15 (App Router), React 19, TypeScript, three.js (the 3D bottle) and GSAP (scroll animations).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Requires Node.js 18.18 or newer.

## Deploy

The easiest option is [Vercel](https://vercel.com/new): import this repository, keep the defaults, and add one environment variable:

| Variable | Example | Used for |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.aquamareeba.in` | Canonical URL, sitemap, social previews, structured data |

Any host that runs Node.js works too (`npm run build && npm start`).

## Where things live

| What | File |
| --- | --- |
| Phone, email, address, licence numbers, FAQ, purification steps | `lib/site.ts` |
| Page sections | `components/*.tsx` |
| 3D bottle (three.js) | `components/BottleStage.tsx` |
| Scroll animations (GSAP) | `components/Motion.tsx` |
| Styles | `app/globals.css` |
| Bottle label artwork used on the 3D bottle | `public/images/label.jpg` |
| Product images | `public/images/*.webp` |
| Social share image | `app/opengraph-image.png`, `app/twitter-image.png` |
| SEO: title, description, sitemap, robots, JSON-LD | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/page.tsx` |

To change the label, replace `public/images/label.jpg` with the new flat sticker artwork (same 3:1 shape).

## Images

All product images are studio renders of the real Aqua Mareeba bottle and label. To use real photos instead, drop them into `public/images/` with the same file names (or update the `src` paths in the components).

## Order enquiry form

The form at the bottom of the page opens the visitor's email app with their enquiry filled in, addressed to `raindrops8161@gmail.com`. It needs no server.

To receive enquiries directly instead, replace the `onSubmit` handler in `components/Enquiry.tsx` with a call to a form service (for example Formspree, Web3Forms or Resend) or a Next.js route handler. If you start storing phone numbers or emails, add a short privacy notice (India's DPDP Act, 2023).

## Before going live

- Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- Check the marketing wording ("Pure", "Fresh") with whoever handles your FSSAI compliance. These words are restricted under the FSSAI Advertising and Claims Regulations, 2018.
- Keep the BIS licence number in `lib/site.ts` current.

## Fonts

Fonts are self-hosted in `app/fonts/` (SIL Open Font License), so the build does not need internet access to Google Fonts.
