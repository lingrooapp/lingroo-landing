# Lingroo landing — conversion patch

Podmień w aktualnym repo dokładnie trzy pliki:

- `de/index.html`
- `assets/app.js`
- `assets/style.css`

Patch nie usuwa istniejących stron SEO ani cenników.

## Co zmienia

- H1 jasno określa Lingroo jako web-app dla Deutsch B2/C1.
- Hero nie używa `Soft Launch` ani `Testphase` jako głównego komunikatu.
- Głównym CTA jest 14-dniowy pełny dostęp.
- Kurztest losuje 3 zadania z puli 12; ponowne uruchomienie wybiera nowy zestaw.
- Statyczne pole tekstowe udające live feedback zostało zastąpione uczciwymi przykładami korekty.
- Sekcja celów rozróżnia telc, Goethe, TestDaF i B2 → C1 oraz prowadzi do osobnych URL-i.
- FAQ zawiera 10 realnych pytań zakupowych i produktowych.
- Stopka prowadzi do właściwych stron zamiast do jednego adresu telc.
- Pricing jest trial-first: 14 dni pełnego dostępu, potem 4,99 EUR miesięcznie.

## Kontrola przed wysłaniem

W katalogu repo uruchom:

```powershell
node --check .\assets\app.js
python .\scripts\audit_site.py
```

Następnie:

```powershell
git add -A
git commit -m "Improve landing positioning, demo honesty and trial conversion"
git push origin main
```

Po wdrożeniu sprawdź w trybie incognito:

- `https://www.lingroo.app/de/`
- `https://www.lingroo.app/de/preise/`
- `https://www.lingroo.app/de/goethe-c1-vorbereitung/`
- `https://www.lingroo.app/de/testdaf-vorbereitung/`
