const STORAGE_KEY = "arcana-daily-reading";

const dateHeading = document.getElementById("dateHeading");
const dailyStatus = document.getElementById("dailyStatus");
const helperText = document.getElementById("helperText");
const drawButton = document.getElementById("drawButton");
const shareButton = document.getElementById("shareButton");
const readingLayout = document.getElementById("readingLayout");
const tarotCard = document.getElementById("tarotCard");
const cardArtwork = document.getElementById("cardArtwork");
const cardArcana = document.getElementById("cardArcana");
const cardName = document.getElementById("cardName");
const cardOrientation = document.getElementById("cardOrientation");
const cardSummary = document.getElementById("cardSummary");
const primaryKeyword = document.getElementById("primaryKeyword");
const keywordSupport = document.getElementById("keywordSupport");
const artworkDescription = document.getElementById("artworkDescription");
const themeGeneral = document.getElementById("themeGeneral");
const themeWork = document.getElementById("themeWork");
const themeRelationship = document.getElementById("themeRelationship");
const themeMoney = document.getElementById("themeMoney");
const themeMind = document.getElementById("themeMind");
const historyList = document.getElementById("historyList");

function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatToday(date = new Date()) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function hashString(value) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

function drawForDate(dateKey) {
  const deck = window.TAROT_DATABASE.cards;
  const seed = hashString(dateKey);
  return {
    cardKey: deck[seed % deck.length].key,
    orientation: (Math.floor(seed / deck.length) % 2) === 0 ? "upright" : "reversed"
  };
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { history: [] };
  } catch {
    return { history: [] };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function lookupCard(cardKey) {
  return window.TAROT_DATABASE.byKey[cardKey] || null;
}

function createArtworkUri(card, orientation) {
  const palette = card.palette || ["#ffcf78", "#6b2a88"];
  const symbol = card.symbol || "☼";
  const subtitle = card.suit ? `${card.suit} · ${card.element}` : "Major Arcana";
  const orientationLabel = orientation === "reversed" ? "Reversed" : "Upright";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 800" role="img" aria-label="${card.name}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${palette[0]}"/>
          <stop offset="100%" stop-color="${palette[1]}"/>
        </linearGradient>
      </defs>
      <rect width="500" height="800" rx="36" fill="#120f1b"/>
      <rect x="18" y="18" width="464" height="764" rx="28" fill="url(#g)" opacity="0.88"/>
      <rect x="36" y="36" width="428" height="728" rx="22" fill="none" stroke="rgba(255,245,226,0.55)"/>
      <circle cx="250" cy="245" r="130" fill="rgba(255,255,255,0.12)"/>
      <text x="250" y="288" text-anchor="middle" fill="#fff4dc" font-size="138" font-family="Cormorant Garamond, serif">${symbol}</text>
      <text x="250" y="86" text-anchor="middle" fill="#fff4dc" font-size="26" letter-spacing="5" font-family="Manrope, sans-serif">${orientationLabel.toUpperCase()}</text>
      <text x="250" y="560" text-anchor="middle" fill="#fff4dc" font-size="28" letter-spacing="5" font-family="Manrope, sans-serif">${subtitle.toUpperCase()}</text>
      <text x="250" y="636" text-anchor="middle" fill="#ffffff" font-size="54" font-family="Cormorant Garamond, serif">${card.name}</text>
      <text x="250" y="700" text-anchor="middle" fill="#fff4dc" font-size="22" letter-spacing="4" font-family="Manrope, sans-serif">${card.keywords.slice(0, 3).join(" · ").toUpperCase()}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function readingCopy(card, orientation, themeName) {
  const text = card.themes[themeName];
  if (orientation === "upright") {
    return text.upright;
  }

  return text.reversed;
}

function renderReading(reading) {
  const card = lookupCard(reading.cardKey);
  if (!card) {
    return;
  }

  const orientation = reading.orientation;
  readingLayout.classList.remove("hidden");
  tarotCard.style.transform = orientation === "reversed" ? "rotate(180deg)" : "none";
  cardArtwork.src = createArtworkUri(card, orientation);
  cardArtwork.alt = `${card.name} tarot card artwork`;
  cardArcana.textContent = card.arcanaLabel;
  cardName.textContent = card.name;
  cardOrientation.textContent = orientation === "reversed" ? "Reversed" : "Upright";
  cardSummary.textContent = orientation === "reversed" ? card.summary.reversed : card.summary.upright;
  primaryKeyword.textContent = card.primaryKeyword;
  keywordSupport.textContent = `Supporting keywords: ${card.keywords.join(", ")}`;
  artworkDescription.textContent = card.artwork;
  themeGeneral.textContent = readingCopy(card, orientation, "general");
  themeWork.textContent = readingCopy(card, orientation, "work");
  themeRelationship.textContent = readingCopy(card, orientation, "relationship");
  themeMoney.textContent = readingCopy(card, orientation, "money");
  themeMind.textContent = readingCopy(card, orientation, "mind");
  shareButton.classList.remove("hidden");
}

function renderHistory(history) {
  if (!history.length) {
    historyList.innerHTML = '<p class="empty-state">Reveal a card to start your reading history.</p>';
    return;
  }

  historyList.innerHTML = history
    .slice()
    .reverse()
    .map((entry) => {
      const card = lookupCard(entry.cardKey);
      if (!card) {
        return "";
      }

      return `
        <article class="history-card">
          <div class="history-meta">
            <span class="history-date">${entry.date}</span>
            <span class="status-badge muted">${entry.orientation === "reversed" ? "Reversed" : "Upright"}</span>
          </div>
          <h3>${card.name}</h3>
          <p>${entry.orientation === "reversed" ? card.summary.reversed : card.summary.upright}</p>
        </article>
      `;
    })
    .join("");
}

function syncUi() {
  const state = loadState();
  const dateKey = todayKey();
  const todayReading = state.current && state.current.date === dateKey ? state.current : null;

  dateHeading.textContent = formatToday();
  dailyStatus.textContent = todayReading ? "Card revealed" : "One card waiting";
  helperText.textContent = todayReading
    ? "Today’s card is locked in. Come back tomorrow for a fresh draw."
    : "Your daily card stays the same until tomorrow.";
  drawButton.disabled = Boolean(todayReading);
  drawButton.textContent = todayReading ? "Come back tomorrow" : "Reveal today’s card";

  if (todayReading) {
    renderReading(todayReading);
  }

  renderHistory(state.history || []);
}

function handleDraw() {
  const state = loadState();
  const dateKey = todayKey();
  const existing = state.current && state.current.date === dateKey ? state.current : null;

  if (existing) {
    renderReading(existing);
    syncUi();
    return;
  }

  const daily = drawForDate(dateKey);
  const reading = {
    date: dateKey,
    cardKey: daily.cardKey,
    orientation: daily.orientation
  };

  state.current = reading;
  state.history = [...(state.history || []).filter((item) => item.date !== dateKey), reading].slice(-14);
  saveState(state);
  renderReading(reading);
  syncUi();
}

async function buildShareCanvas() {
  const state = loadState();
  if (!state.current) {
    return null;
  }

  const card = lookupCard(state.current.cardKey);
  if (!card) {
    return null;
  }

  const orientation = state.current.orientation;
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1600;
  const context = canvas.getContext("2d");

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#151021");
  gradient.addColorStop(1, "#08070d");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const image = await new Promise((resolve, reject) => {
    const art = new Image();
    art.onload = () => resolve(art);
    art.onerror = reject;
    art.src = createArtworkUri(card, orientation);
  });

  context.drawImage(image, 90, 140, 420, 672);
  context.fillStyle = "#ffcf78";
  context.font = "700 30px Manrope";
  context.fillText("ARCANA DAILY", 580, 200);
  context.fillStyle = "#ffffff";
  context.font = "600 88px Cormorant Garamond";
  context.fillText(card.name, 580, 310);
  context.fillStyle = "#cdbb94";
  context.font = "500 32px Manrope";
  context.fillText(orientation === "reversed" ? "Reversed" : "Upright", 580, 360);
  context.fillText(`Core keyword: ${card.primaryKeyword}`, 580, 420);

  wrapText(context, card.artwork, 580, 520, 500, 42, "500 28px Manrope", "#f6eddc");
  wrapText(
    context,
    `General reading: ${readingCopy(card, orientation, "general")}`,
    90,
    960,
    1010,
    38,
    "500 26px Manrope",
    "#cdbb94"
  );

  context.fillStyle = "#ffcf78";
  context.font = "600 26px Manrope";
  context.fillText(formatToday(), 90, 1490);

  return canvas;
}

function wrapText(context, text, x, y, maxWidth, lineHeight, font, color) {
  context.font = font;
  context.fillStyle = color;
  const words = text.split(" ");
  let line = "";
  let cursorY = y;

  words.forEach((word) => {
    const testLine = `${line}${word} `;
    if (context.measureText(testLine).width > maxWidth && line) {
      context.fillText(line.trim(), x, cursorY);
      line = `${word} `;
      cursorY += lineHeight;
    } else {
      line = testLine;
    }
  });

  if (line) {
    context.fillText(line.trim(), x, cursorY);
  }
}

async function handleDownloadCard() {
  const canvas = await buildShareCanvas();
  if (!canvas) {
    return;
  }

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "arcana-daily-reading.png";
  link.click();
}

drawButton.addEventListener("click", handleDraw);
shareButton.addEventListener("click", handleDownloadCard);

syncUi();
