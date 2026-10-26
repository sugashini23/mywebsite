# Dhanalaxmi Bridal Studio — Website (v4, animated redesign)

Static bilingual (English / தமிழ்) site: HTML + CSS + vanilla JS. No npm, no build, no database, no internet needed for fonts.
Run: double-click `index.html` (or `python3 -m http.server 8000`).

## What's new in v4
- New visual identity: silk-saree palette (wine, emerald, marigold, jasmine), woven "zari" temple-border dividers, arch (mandap) shaped frames, Gloock + Instrument Sans fonts.
- Animated hero: arch photo slideshow with slow zoom and progress dots, floating circles that swap photos (nails, bangles, mehendi, jewellery), rotating ring, sparkles, mouse parallax, intro loader.
- Scroll progress bar, section reveals, running services marquee, review screenshots marquee, quote that lights up word by word.
- Services as expanding arch panels (hover/click on desktop, tap on mobile). "Add to my enquiry" fills the form.
- 3-step enquiry form (services → date/place → name/phone) with progress and validation. Opens WhatsApp with a ready message (EN or TA).
- Before/after slider that plays a demo sweep, then follows your drag.
- Map is its own full-width section (address, hours, directions only).
- Footer with Instagram / WhatsApp / Location icon buttons, all 5 Instagram pages, back-to-top.
- Floating WhatsApp button with pulse.
- Language switch keeps the same layout (one font stack, one size scale). Animations stop if the visitor's device has "reduce motion" on.

## Where to edit
| What | File |
|---|---|
| WhatsApp number, directions link, Instagram links, service list | `js/config.js` |
| All text (EN + TA), opening hours (`hours.val`), FAQs | `js/i18n.js` |
| Colours | top of `css/style.css` (`:root`) |
| Photos | `assets/images/` (`-sm.webp` 640px, `-lg.webp` 1400px); originals in `assets/originals/` |
| Hero slideshow photos | the 5 `.slide` images at the top of `index.html` |

## Fonts (bundled)
Gloock, Instrument Sans (SIL OFL), FreeSerif/FreeSans for Tamil glyphs (GPL + font exception). Licences in `fonts/`.

## Confirm before launch
1. WhatsApp number, exact address, real opening hours (now "Open 24 hours").
2. Artist name/biography (not invented).
3. Which services are really offered; prices are not shown ("Contact for pricing").
4. Permission to publish review screenshots and before/after photos.
5. Domain: replace `YOUR-DOMAIN` in `robots.txt`, `sitemap.xml`; add canonical link and absolute `og:image`.

## QA done
Desktop + mobile, EN + TA: no horizontal scroll, no console errors, wizard validation, WhatsApp message (EN/TA), service panels, filters, lightbox, slider, language persistence. Not done: real phones / Safari, Lighthouse, live Google Map (needs internet).
