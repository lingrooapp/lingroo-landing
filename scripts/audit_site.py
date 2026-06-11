from pathlib import Path
import json, re, sys
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parents[1]
errors=[]; warnings=[]
product=json.loads((ROOT/'config/product.json').read_text(encoding='utf-8'))
htmls=list(ROOT.rglob('*.html'))
for p in htmls:
    s=p.read_text(encoding='utf-8')
    if '6,99' in s or '6.99' in s: errors.append(f'stara cena: {p.relative_to(ROOT)}')
    if re.search(r'\b7\s*(Tage|dni|days|днів|дней)\b',s,re.I): errors.append(f'stary okres testowy: {p.relative_to(ROOT)}')
    for href in re.findall(r'href=["\']([^"\']+)',s):
        if href.startswith('/') and not href.startswith('//'):
            clean=href.split('#')[0].split('?')[0]
            if not clean: continue
            target=ROOT/clean.lstrip('/')
            if clean.endswith('/'):
                target=target/'index.html'
            elif target.suffix=='':
                target=target/'index.html'
            if not target.exists(): warnings.append(f'link do brakującego pliku: {p.relative_to(ROOT)} -> {clean}')
core_forbidden={
 'pl/cennik/index.html':['Die Zahlen','Wortschatzeinträge','Synonymaufgaben','Exam Mode packs','Inventory checked','App öffnen','/ Monat'],
 'ua/tsiny/index.html':['Die Zahlen','Wortschatzeinträge','Exam Mode packs','App öffnen','/ Monat'],
 'ru/ceny/index.html':['Die Zahlen','Wortschatzeinträge','Exam Mode packs','App öffnen','/ Monat']}
for rel,tokens in core_forbidden.items():
    p=ROOT/rel
    if not p.exists(): errors.append(f'brak kluczowej strony: {rel}'); continue
    s=p.read_text(encoding='utf-8')
    for token in tokens:
        if token in s: errors.append(f'mieszanie języków w {rel}: {token}')
for rel in ['de/preise/index.html','pl/cennik/index.html','en/pricing/index.html','ua/tsiny/index.html','ru/ceny/index.html']:
    p=ROOT/rel
    if p.exists():
        s=p.read_text(encoding='utf-8')
        if '4,99' not in s and '4.99' not in s: errors.append(f'brak ceny na {rel}')
        if '14' not in s: errors.append(f'brak 14 dni na {rel}')

# Validate JSON-LD and ensure every index page is present in sitemap.
sitemap=(ROOT/'sitemap.xml').read_text(encoding='utf-8') if (ROOT/'sitemap.xml').exists() else ''
for p in htmls:
    soup=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
    for block in soup.find_all('script',attrs={'type':'application/ld+json'}):
        if not block.string: continue
        try: json.loads(block.string)
        except Exception as exc: errors.append(f'niepoprawny JSON-LD: {p.relative_to(ROOT)}: {exc}')
for p in ROOT.rglob('index.html'):
    rel=p.parent.relative_to(ROOT).as_posix()
    url='https://www.lingroo.app/' if rel=='.' else f'https://www.lingroo.app/{rel.strip("/")}/'
    if url not in sitemap: errors.append(f'brak w sitemap: {url}')

print(f'HTML: {len(htmls)}')
print(f'Błędy: {len(errors)}')
for x in errors: print('ERROR:',x)
print(f'Ostrzeżenia: {len(warnings)}')
for x in warnings[:50]: print('WARN:',x)
if len(warnings)>50: print(f'... i {len(warnings)-50} kolejnych')
sys.exit(1 if errors else 0)
