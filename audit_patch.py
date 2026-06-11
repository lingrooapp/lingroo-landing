from pathlib import Path
from bs4 import BeautifulSoup
import json

root = Path(__file__).resolve().parent
html = (root / 'de/index.html').read_text(encoding='utf-8')
soup = BeautifulSoup(html, 'html.parser')
errors = []

checks = {
    'jasny H1': 'Web-App für Deutsch B2/C1' in soup.h1.get_text(' ', strip=True),
    'brak Soft Launch': 'Soft Launch' not in html,
    'brak starej ceny': '6,99' not in html,
    'trial 14 dni': '14 Tage' in html,
    '10 pytań FAQ': len(soup.select('.faq article')) == 10,
    'brak textarea w demo': soup.select_one('textarea') is None,
    'link Goethe': any(a.get('href') == '/de/goethe-c1-vorbereitung/' for a in soup.find_all('a')),
    'link TestDaF': any(a.get('href') == '/de/testdaf-vorbereitung/' for a in soup.find_all('a')),
    'pula 12 zadań': html.count('"label"') >= 12,
}

for name, ok in checks.items():
    if not ok:
        errors.append(name)

for script in soup.find_all('script', attrs={'type': 'application/ld+json'}):
    try:
        json.loads(script.string)
    except Exception as exc:
        errors.append(f'JSON-LD: {exc}')

if errors:
    print('BŁĘDY:')
    for error in errors:
        print('-', error)
    raise SystemExit(1)

print('Patch audit: 0 błędów')
