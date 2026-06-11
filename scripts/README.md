# Skrypty

`audit_site.py` należy uruchamiać przed każdym wdrożeniem.

Strony główne i cenniki są obecnie traktowane jako warstwa główna. Dane produktu znajdują się w `config/product.json`, a teksty cennika w `content/core-locales.json`. Pełny generator wszystkich podstron long-tail jest następnym etapem migracji; istniejące adresy pozostają statyczne, aby nie ryzykować utraty indeksacji.
