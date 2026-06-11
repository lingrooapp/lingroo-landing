# Lingroo final verified landing package

## Verified inventory used
- 997 vocabulary entries
- 750 synonym tasks
- 320 gap/structure items
- 80 reading texts and 450 questions
- 40 primary listening items and 200 questions
- 30 writing topics
- 14 short writing exercises
- 6 original Exam Mode packs

## Access facts reflected on pricing pages
- 14-day tester access after registration
- Premium: EUR 4.99/month
- C1 free limits in the supplied app.js: listening 5, reading 5, writing 1, vocabulary 200, synonyms 100
- C1 Exam Mode requires Premium/tester; B2 Exam Mode is not globally blocked by the same section rule

## Files added
- assets/pricing.css
- de/preise/index.html
- pl/cennik/index.html
- en/pricing/index.html
- ua/tsiny/index.html
- ru/ceny/index.html

## Important product weaknesses still open
1. Speaking is not ready. Do not place it in the paid-feature checklist until it works.
2. The writing feedback is described in app.js as an exam-oriented heuristic, not final expert grading. Keep this wording.
3. B2 and C1 paywall rules are asymmetric. Document this internally or align them intentionally.
4. Some older long-tail pages still contain thin, template-like copy. Replace them gradually with real examples and inventory facts.
5. Social proof is still weak. Do not invent reviews. Collect structured tester feedback inside the app.
6. The product has broad content, but differentiation needs to remain: short daily B2/C1 practice, multilingual vocabulary support, writing feedback and error-driven next focus.
7. Keep price, tester duration and inventory in one source of truth. Current duplication across app, landing, JSON-LD and Stripe creates drift risk.

## Suggested next technical step
Create a small public product-data JSON file and generate price/inventory snippets from it during deployment. That prevents 4.99/6.99 and 7/14-day inconsistencies.
