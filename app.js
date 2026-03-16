const STORAGE_KEY = "arcana-daily-reading";

const dateHeading = document.getElementById("dateHeading");
const deckButton = document.getElementById("deckButton");
const deckShell = document.getElementById("deckShell");
const parallaxLayers = document.querySelectorAll("[data-parallax-layer]");
const heroPulledCard = document.getElementById("heroPulledCard");
const heroCardArtwork = document.getElementById("heroCardArtwork");
const revealPanel = document.getElementById("revealPanel");
const revealHeadline = document.getElementById("revealHeadline");
const revealTags = document.getElementById("revealTags");
const continueButton = document.getElementById("continueButton");
const readingViewport = document.getElementById("readingViewport");
const redrawButton = document.getElementById("redrawButton");
const shareButton = document.getElementById("shareButton");
const historyLink = document.getElementById("historyLink");
const refreshLink = document.getElementById("refreshLink");
const historyDialog = document.getElementById("historyDialog");
const closeHistoryButton = document.getElementById("closeHistoryButton");
const historyDialogList = document.getElementById("historyDialogList");
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

function updateParallax(clientX, clientY) {
  const normalizedX = (clientX / window.innerWidth - 0.5) * 2;
  const normalizedY = (clientY / window.innerHeight - 0.5) * 2;

  document.documentElement.style.setProperty("--parallax-x", `${normalizedX * 18}px`);
  document.documentElement.style.setProperty("--parallax-y", `${normalizedY * 18}px`);
}

function resetParallax() {
  document.documentElement.style.setProperty("--parallax-x", "0px");
  document.documentElement.style.setProperty("--parallax-y", "0px");
}

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

function randomDraw() {
  const deck = window.TAROT_DATABASE.cards;
  const cardIndex = Math.floor(Math.random() * deck.length);
  return {
    cardKey: deck[cardIndex].key,
    orientation: Math.random() < 0.5 ? "upright" : "reversed"
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

function artworkSource(card, orientation) {
  if (card.imageUrl) {
    return card.imageUrl;
  }

  return createArtworkUri(card, orientation);
}

function readingCopy(card, orientation, themeName) {
  const text = card.themes[themeName];
  return orientation === "upright" ? text.upright : text.reversed;
}

function attachFallback(imageNode) {
  imageNode.addEventListener("error", () => {
    const fallback = imageNode.dataset.fallback;
    if (fallback && imageNode.src !== fallback) {
      imageNode.src = fallback;
    }
  });
}

attachFallback(cardArtwork);
attachFallback(heroCardArtwork);

function updateRevealPanel(card) {
  revealHeadline.textContent = card.name;
  revealTags.innerHTML = card.keywords
    .slice(0, 4)
    .map((keyword) => `<span class="reveal-tag">#${keyword.replace(/\s+/g, "")}</span>`)
    .join("");
  revealPanel.classList.remove("hidden");
}

function renderReading(reading) {
  const card = lookupCard(reading.cardKey);
  if (!card) {
    return;
  }

  const orientation = reading.orientation;
  const fallback = createArtworkUri(card, orientation);
  const source = artworkSource(card, orientation);

  readingLayout.classList.remove("hidden");
  heroCardArtwork.dataset.fallback = fallback;
  heroCardArtwork.src = source;
  heroCardArtwork.alt = `${card.name} tarot card artwork`;

  tarotCard.style.transform = orientation === "reversed" ? "rotate(180deg)" : "none";
  cardArtwork.dataset.fallback = fallback;
  cardArtwork.src = source;
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

  updateRevealPanel(card);
  redrawButton.classList.remove("hidden");
  shareButton.classList.remove("hidden");
}

function renderHistory(history) {
  const markup = !history.length
    ? '<p class="empty-state">Reveal a card to start your reading history.</p>'
    : history
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

  historyList.innerHTML = markup;
  historyDialogList.innerHTML = markup;
}

function syncUi() {
  const state = loadState();
  const dateKey = todayKey();
  const todayReading = state.current && state.current.date === dateKey ? state.current : null;

  dateHeading.textContent = formatToday();
  redrawButton.classList.toggle("hidden", !todayReading);
  shareButton.classList.toggle("hidden", !todayReading);

  if (todayReading) {
    renderReading(todayReading);
    deckButton.classList.add("hidden");
  }

  renderHistory(state.history || []);
}

function revealAnimation(reading) {
  const card = lookupCard(reading.cardKey);
  if (!card) {
    return;
  }

  const orientation = reading.orientation;
  heroPulledCard.style.transform =
    orientation === "reversed" ? "rotate(180deg) translateY(-26px) scale(1.02)" : "";
  heroCardArtwork.dataset.fallback = createArtworkUri(card, orientation);
  heroCardArtwork.src = artworkSource(card, orientation);
  heroCardArtwork.alt = `${card.name} tarot card artwork`;

  revealPanel.classList.add("hidden");
  deckButton.classList.add("hidden");
  deckShell.classList.add("is-drawing");

  window.setTimeout(() => {
    deckShell.classList.add("is-flipping");
  }, 420);

  window.setTimeout(() => {
    deckShell.classList.add("is-revealed");
    renderReading(reading);
  }, 1280);
}

function handleDraw() {
  if (deckShell.classList.contains("is-drawing")) {
    return;
  }

  const state = loadState();
  const dateKey = todayKey();
  const existing = state.current && state.current.date === dateKey ? state.current : null;

  if (existing) {
    renderReading(existing);
    return;
  }

  const reading = {
    date: dateKey,
    ...randomDraw()
  };

  state.current = reading;
  state.history = [...(state.history || []).filter((item) => item.date !== dateKey), reading].slice(-14);
  saveState(state);
  revealAnimation(reading);
}

function resetDeckState() {
  revealPanel.classList.add("hidden");
  deckButton.classList.remove("hidden");
  deckShell.classList.remove("is-drawing", "is-flipping", "is-revealed");
  heroPulledCard.style.transform = "";
}

function clearAllState() {
  localStorage.removeItem(STORAGE_KEY);
  readingLayout.classList.add("hidden");
  shareButton.classList.add("hidden");
  redrawButton.classList.add("hidden");
  cardArtwork.removeAttribute("src");
  heroCardArtwork.removeAttribute("src");
  revealHeadline.textContent = "";
  revealTags.innerHTML = "";
  renderHistory([]);
  resetDeckState();
  if (historyDialog.open) {
    historyDialog.close();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openHistoryDialog() {
  historyDialog.showModal();
}

function closeHistoryDialog() {
  historyDialog.close();
}

function handleRedraw() {
  if (deckShell.classList.contains("is-drawing")) {
    return;
  }

  const state = loadState();
  const dateKey = todayKey();
  const reading = {
    date: dateKey,
    ...randomDraw()
  };

  state.current = reading;
  state.history = [...(state.history || []).filter((item) => item.date !== dateKey), reading].slice(-14);
  saveState(state);
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.setTimeout(() => {
    resetDeckState();
    revealAnimation(reading);
  }, 280);
}

function continueToReading() {
  readingViewport.scrollIntoView({ behavior: "smooth", block: "start" });
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

deckButton.addEventListener("click", handleDraw);
deckShell.addEventListener("click", handleDraw);
continueButton.addEventListener("click", continueToReading);
redrawButton.addEventListener("click", handleRedraw);
shareButton.addEventListener("click", handleDownloadCard);
historyLink.addEventListener("click", openHistoryDialog);
refreshLink.addEventListener("click", clearAllState);
closeHistoryButton.addEventListener("click", closeHistoryDialog);

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    updateParallax(event.clientX, event.clientY);
  });

  document.body.addEventListener("mouseleave", resetParallax);
  window.addEventListener("blur", resetParallax);
} else {
  resetParallax();
}

syncUi();
