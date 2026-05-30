# Lingroo Landing Stage 2.5 SEO Patch

Generated package for `www.lingroo.app`.

## Included changes

- Optimized meta title + description for DE, PL, EN, UA, RU.
- Clean canonical + bidirectional hreflang for all 5 language variants.
- Added JSON-LD schema to each language page:
  - SoftwareApplication
  - Offer
  - FAQPage
  - BreadcrumbList
- No fake ratings, no fake user counts, no fake reviews.
- Added footer language links with SEO anchor text.
- Kept `/ua/` folder, but hreflang is correctly `uk`.
- Kept `RU` as a full language variant.
- Kept CTA/UTM flow to `www.lingroo.de`.
- Confirmed app script loads with `defer`.

## After upload

Check:

- https://www.lingroo.app/de/
- https://www.lingroo.app/pl/
- https://www.lingroo.app/en/
- https://www.lingroo.app/ua/
- https://www.lingroo.app/ru/
- https://www.lingroo.app/sitemap.xml
- https://www.lingroo.app/robots.txt

Then validate schema with https://validator.schema.org/
