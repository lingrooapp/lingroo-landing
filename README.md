Lingroo.app Landing V4: B2/C1 mini placement test, writing demo, pricing 4.99, languages /de /pl /en /ua /ru. Delete old /uk folder before deploy.


## V5 legal pages

V5 przywraca linki w stopce do stron prawnych z oryginalnego repo:

- `/impressum.html`
- `/datenschutz.html`
- `/agb.html`
- `/widerruf.html`

Ważne:
Nie usuwaj tych istniejących plików z repo. Ten ZIP nie podmienia treści prawnych, tylko dodaje linki do nich na każdej wersji językowej landingu.


## V6 external legal links

V6 changes the landing footer to use the real current legal pages on www.lingroo.de:

- https://www.lingroo.de/impressum
- https://www.lingroo.de/datenschutz
- https://www.lingroo.de/agb
- https://www.lingroo.de/widerruf
- mailto cancellation link: Kündigung Lingroo Premium

This avoids empty/outdated legal pages on lingroo.app and keeps the legal content consistent with the main app.


Stage 1 SEO finish: added sitemap.xml and robots.txt.
Submit https://www.lingroo.app/sitemap.xml in Google Search Console.


## Stage 2 fixed by ChatGPT

- Normalized SEO head on `/de/`, `/pl/`, `/en/`, `/ua/`, `/ru/`.
- Added `og:image`, Twitter cards, favicon/apple-touch icon.
- Added UTM tracking to all main CTA links to `www.lingroo.de`.
- Rebuilt sitemap.xml and kept `hreflang=uk` pointing to `/ua/` because this repo uses `/ua/` as the Ukrainian URL.
- Root `/` redirects to `/de/`.
