# Architektura

## Co zostało uproszczone
- Usunięto nieużywane filmy, zrzuty i stare pliki CSS/JS z katalogu głównego.
- Usunięto historyczne notatki etapów z produkcyjnego katalogu.
- Cena, okres testowy, status treningu mówienia i liczby materiałów znajdują się w `config/product.json`.
- Teksty pięciu wersji cennika znajdują się w `content/core-locales.json`.
- Strony cennika są pełnymi stronami, a na stronach głównych pozostaje krótka informacja oraz odnośnik do szczegółów.
- Wszystkie dotychczasowe adresy SEO zostały zachowane.

## Dlaczego nie przebudowano od razu wszystkich stron
Pełna migracja 75 stron na generator w jednym kroku zwiększyłaby ryzyko utraty adresów, metadanych i hreflangów. W tej wersji centralizujemy dane handlowe i kluczowe strony, zachowując działające podstrony long-tail. Kolejny bezpieczny etap to migracja rodzin stron long-tail po jednym szablonie na raz.
