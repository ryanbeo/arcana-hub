# Card Content Template Guide

Use [tarot-card-content-template.csv](/Users/ryanbeo/Downloads/[Codex] Tarot Application/Reference/tarot-card-content-template.csv) as the blank source-of-truth template for final card copy.

If you want a starter draft based on the app's current content, use [tarot-card-content-prefilled.csv](/Users/ryanbeo/Downloads/[Codex] Tarot Application/Reference/tarot-card-content-prefilled.csv).

## Purpose

This file is meant to be filled by another model or editor, then imported back into the app as a fixed database.

## Row Model

- One row per card
- `card_key` is the stable ID and must not change
- `default_*` columns are reference-only
- `content_*` columns are the final editable fields

## Field Notes

- `content_keywords_en` and `content_keywords_vi`
  Use `|` as the separator, for example:
  `Clarity|Truth|Perspective`

- Theme columns:
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
  - and the same set for `_vi`

## Recommended Writing Rules

- Slightly paraphrase source material
- Do not copy long passages from copyrighted books
- Keep each field self-contained
- Use a consistent tarot-reader tone
- Avoid repeating the card name too often in the same field
- Vietnamese should feel natural, not word-for-word from English

## Workflow

1. Start from either:
   - [tarot-card-content-template.csv](/Users/ryanbeo/Downloads/[Codex] Tarot Application/Reference/tarot-card-content-template.csv)
   - [tarot-card-content-prefilled.csv](/Users/ryanbeo/Downloads/[Codex] Tarot Application/Reference/tarot-card-content-prefilled.csv)
2. Give the CSV plus [gpt-card-content-brief.md](/Users/ryanbeo/Downloads/[Codex] Tarot Application/Reference/gpt-card-content-brief.md) to another model/editor
3. Save the completed CSV back into the project
4. Run:

```bash
ruby scripts/import_card_content_from_csv.rb Reference/your-filled-file.csv
```

5. The importer will write [generated-card-content.js](/Users/ryanbeo/Downloads/[Codex] Tarot Application/generated-card-content.js), which the app already loads automatically

## Helper Scripts

- Generate blank template:

```bash
ruby scripts/generate_card_content_template.rb
```

- Generate starter draft from current app content:

```bash
osascript -l JavaScript scripts/export_prefilled_card_content.jxa
```
