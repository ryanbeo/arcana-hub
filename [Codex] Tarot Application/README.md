# Arcana Daily

Arcana Daily is now a static tarot app with:

- One deterministic card draw per day
- Optional redraws that replace today’s saved card
- A local tarot database for all 78 cards
- Local bundled Rider-Waite artwork from the `Artwork` folder
- Artwork explanation for each card
- Core keyword plus supporting keywords
- Detailed reading sections for `general`, `work`, `relationship`, `money`, and `mind`
- A downloadable reading card image

## Run

Open `index.html` directly in your browser.

No sign-in, backend, or fetch-based API is required for this version.

## Files

- `index.html`: page structure
- `styles.css`: visual design and responsive layout
- `card-data.js`: local tarot database and card theme content
- `app.js`: daily draw logic, local history, rendering, and download card generation
