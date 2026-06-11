# Lingroo landing

Statyczny landing dla `lingroo.app`. Wersja zawiera zachowane adresy SEO oraz uproszczoną warstwę utrzymania dla stron głównych i cennika.

## Najważniejsze dane produktu
Źródłem prawdy jest `config/product.json`:
- cena: 4,99 EUR miesięcznie,
- pełny dostęp testowy: 14 dni,
- poziomy: B2 i C1,
- trening mówienia: w budowie.

## Przed publikacją
Uruchom lokalnie:

```bash
python scripts/audit_site.py
```

Audyt sprawdza starą cenę, stary okres testowy, brakujące pliki, podstawowe linki wewnętrzne oraz mieszanie języków na kluczowych stronach.

## Publikacja
Zawartość folderu należy wgrać do katalogu głównego repozytorium GitHub Pages. Nie zmieniaj istniejących adresów URL bez przekierowań.
