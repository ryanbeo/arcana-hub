# GPT Card Content Brief

Use [tarot-card-content-prefilled.csv](/Users/ryanbeo/Downloads/[Codex] Tarot Application/Reference/tarot-card-content-prefilled.csv) as the working file if you want a starter draft, or [tarot-card-content-template.csv](/Users/ryanbeo/Downloads/[Codex] Tarot Application/Reference/tarot-card-content-template.csv) if you want to start from blank fields.

## Goal

Fill the tarot card content database with polished final copy for all 78 cards in:
- English
- Vietnamese

The output must stay inside the CSV structure and preserve all existing non-content columns.

## Important Constraints

- Do not change `card_key`
- Do not change column names
- Do not remove rows
- Slightly paraphrase any copyrighted source material
- Do not reproduce long passages from reference books
- Keep each field self-contained
- Avoid repetitive phrasing like repeating the card name twice in one sentence
- Vietnamese should sound natural and idiomatic, not like a literal translation

## Content Columns To Fill

- `content_name_en`
- `content_arcana_label_en`
- `content_primary_keyword_en`
- `content_keywords_en`
- `content_artwork_en`
- `content_summary_upright_en`
- `content_summary_reversed_en`
- `content_theme_general_upright_en`
- `content_theme_general_reversed_en`
- `content_theme_work_upright_en`
- `content_theme_work_reversed_en`
- `content_theme_relationship_upright_en`
- `content_theme_relationship_reversed_en`
- `content_theme_money_upright_en`
- `content_theme_money_reversed_en`
- `content_theme_mind_upright_en`
- `content_theme_mind_reversed_en`
- and the same `content_*_vi` fields

## Formatting Rules

- `content_keywords_en` and `content_keywords_vi`
  Use `|` as the separator, for example:
  `Clarity|Truth|Perspective`

- Keep `content_artwork_*` concise:
  Usually 1-2 sentences

- Keep `content_summary_*` concise but evocative:
  Usually 1-2 sentences

- Keep each `content_theme_*` field focused:
  Usually 2-4 sentences

## Tone

- Tarot reader voice
- Insightful and grounded
- Slightly mystical, but not vague
- Clear enough for product UI
- Avoid melodrama and filler

## Preferred Quality Bar

- Major Arcana should feel archetypal and psychologically rich
- Minor Arcana should feel practical, readable, and distinct by suit/rank
- Upright and reversed should feel genuinely different
- Work, relationship, money, and mind should not sound like copy-paste variants

## Delivery

Return the completed CSV with the same headers and row order.
