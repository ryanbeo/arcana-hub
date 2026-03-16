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
const exportDialog = document.getElementById("exportDialog");
const closeExportButton = document.getElementById("closeExportButton");
const cancelExportButton = document.getElementById("cancelExportButton");
const confirmDownloadButton = document.getElementById("confirmDownloadButton");
const exportPreviewImage = document.getElementById("exportPreviewImage");
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
const themeTabs = Array.from(document.querySelectorAll(".theme-tab"));
const activeThemeIcon = document.getElementById("activeThemeIcon");
const activeThemeTitle = document.getElementById("activeThemeTitle");
const themeIntro = document.getElementById("themeIntro");
const themeReading = document.getElementById("themeReading");
const historyList = document.getElementById("historyList");

const THEME_META = {
  general: {
    label: "General",
    icon: "☼",
    intro: "The tone of the day"
  },
  work: {
    label: "Work",
    icon: "✷",
    intro: "How this energy wants to move through your work"
  },
  relationship: {
    label: "Relationship",
    icon: "♡",
    intro: "What this card is saying about connection"
  },
  money: {
    label: "Money",
    icon: "◈",
    intro: "How to handle resources and practical choices"
  },
  mind: {
    label: "Mind",
    icon: "☾",
    intro: "The inner message beneath the surface"
  }
};

const NARRATIVE_GUIDANCE = {
  general: {
    should: "move with intention, stay open to what is unfolding, and let the day meet you before you rush to define it",
    shouldNot: "force an outcome too early or ignore what your intuition is already making obvious"
  },
  work: {
    should: "focus on what truly matters, protect your energy, and make the next clear move instead of trying to solve everything at once",
    shouldNot: "scatter your attention, overpromise, or let pressure make you forget your own rhythm"
  },
  relationship: {
    should: "lead with honesty, listen closely, and notice where tenderness or clearer boundaries would change the whole tone",
    shouldNot: "assume you already know what the other person feels or react from old emotional patterns"
  },
  money: {
    should: "stay grounded, make practical choices, and let your decisions come from clarity rather than urgency",
    shouldNot: "spend, save, or commit from fear alone, because anxiety is not the same thing as wisdom"
  },
  mind: {
    should: "slow the pace of your thoughts, make space to breathe, and choose the story that supports your peace rather than your fear",
    shouldNot: "feed spirals, rehearse worst-case scenarios, or mistake mental noise for truth"
  }
};

let activeTheme = "general";
let currentReading = null;
const revealTextJobs = new WeakMap();
let exportBlobUrl = "";
let exportFileName = "arcana-daily-reading.png";

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

function joinKeywords(keywords) {
  if (keywords.length === 1) {
    return keywords[0];
  }

  if (keywords.length === 2) {
    return `${keywords[0]} and ${keywords[1]}`;
  }

  return `${keywords.slice(0, -1).join(", ")}, and ${keywords[keywords.length - 1]}`;
}

function buildSummaryNarrative(card, orientation) {
  const opening =
    orientation === "reversed"
      ? `Today's card arrives in a reversed posture, so its message feels more inward, tender, and a little more cautionary.`
      : `Today's card arrives upright, and it brings a direct, open current for you to work with.`;
  const summary = orientation === "reversed" ? card.summary.reversed : card.summary.upright;

  return `${opening} The heart of today's reading is ${card.primaryKeyword.toLowerCase()}. ${summary} Let this be the atmosphere you return to whenever the day starts pulling you in too many directions.`;
}

function buildArtworkNarrative(card) {
  return `The artwork shows ${card.artwork.charAt(0).toLowerCase()}${card.artwork.slice(1)} In tarot, that imagery points toward ${joinKeywords(card.keywords.slice(0, 3)).toLowerCase()}, so even before you read the finer details, the card is already asking you to notice that pattern in your own day.`;
}

function buildThemeNarrative(card, orientation, themeName) {
  const theme = THEME_META[themeName];
  const guidance = NARRATIVE_GUIDANCE[themeName];
  const themeCopy = readingCopy(card, orientation, themeName);
  const summary = orientation === "reversed" ? card.summary.reversed : card.summary.upright;
  const orientationNote =
    orientation === "reversed"
      ? `Because the card is reversed, I would read this as an energy that needs extra awareness and gentleness.`
      : `Because the card is upright, I would read this as an energy you can actively lean into today.`;

  return `The ${theme.label.toLowerCase()} theme for today is ${card.primaryKeyword.toLowerCase()}. ${themeCopy} ${orientationNote} This card indicates ${summary.charAt(0).toLowerCase()}${summary.slice(1)} You should ${guidance.should}. You should not ${guidance.shouldNot}.`;
}

function buildThemeSummary(card, orientation, themeName) {
  const theme = THEME_META[themeName];
  const baseCopy = readingCopy(card, orientation, themeName);
  const keyword = card.primaryKeyword.toLowerCase();
  const intros = {
    general: `This card brings ${keyword} into focus today.`,
    work: `In work, ${card.name} highlights ${keyword}.`,
    relationship: `In relationships, ${card.name} points to ${keyword}.`,
    money: `For money matters, ${card.name} favors ${keyword}.`,
    mind: `Mentally, ${card.name} asks for ${keyword}.`
  };

  return `${intros[themeName]} ${baseCopy}`;
}

function buildExportSummary(card, orientation) {
  return Object.keys(THEME_META).map((themeName) => buildThemeSummary(card, orientation, themeName));
}

function trimSentence(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 40 ? lastSpace : maxLength).trim()}.`;
}

function buildExportCopy(card, orientation) {
  const orientationLabel = orientation === "reversed" ? "Reversed" : "Upright";
  const intro = trimSentence(
    `${card.name} brings ${card.primaryKeyword.toLowerCase()} into focus through ${card.keywords[0].toLowerCase()} and ${card.keywords[1].toLowerCase()}.`,
    110
  );
  const artwork = trimSentence(card.artwork, 160);

  return {
    orientationLabel,
    intro,
    keywordLabel: card.primaryKeyword,
    keywordSupport: trimSentence(`Supporting keywords: ${card.keywords.join(", ")}.`, 120),
    artwork: trimSentence(artwork, 150),
    general: trimSentence(buildThemeSummary(card, orientation, "general"), 145),
    work: trimSentence(buildThemeSummary(card, orientation, "work"), 145),
    relationship: trimSentence(buildThemeSummary(card, orientation, "relationship"), 145),
    money: trimSentence(buildThemeSummary(card, orientation, "money"), 145),
    mind: trimSentence(buildThemeSummary(card, orientation, "mind"), 170)
  };
}

function revealText(node, text, speed = 14) {
  const jobId = (revealTextJobs.get(node) || 0) + 1;
  revealTextJobs.set(node, jobId);
  node.classList.add("is-revealing");
  node.textContent = "";

  let index = 0;

  function tick() {
    if (revealTextJobs.get(node) !== jobId) {
      return;
    }

    node.textContent = text.slice(0, index);

    if (index < text.length) {
      index += 1;
      window.setTimeout(tick, speed);
      return;
    }

    node.classList.remove("is-revealing");
  }

  tick();
}

function setThemeTab(themeName) {
  activeTheme = themeName;
  const theme = THEME_META[themeName];

  themeTabs.forEach((tab) => {
    const isActive = tab.dataset.theme === themeName;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  document.getElementById("themePanel").setAttribute("aria-labelledby", `tab-${themeName}`);
  activeThemeIcon.textContent = theme.icon;
  activeThemeTitle.textContent = theme.label;
  themeIntro.textContent = theme.intro;

  if (currentReading) {
    const card = lookupCard(currentReading.cardKey);
    if (card) {
      themeReading.textContent = buildThemeNarrative(card, currentReading.orientation, themeName);
    }
  } else {
    themeReading.textContent = "";
  }
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

  currentReading = reading;
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
  cardSummary.textContent = "";
  primaryKeyword.textContent = card.primaryKeyword;
  keywordSupport.textContent = `Supporting keywords: ${card.keywords.join(", ")}`;
  artworkDescription.textContent = "";

  updateRevealPanel(card);
  redrawButton.classList.remove("hidden");
  shareButton.classList.remove("hidden");
  activeTheme = "general";
  revealText(cardSummary, buildSummaryNarrative(card, orientation), 10);
  artworkDescription.textContent = buildArtworkNarrative(card);
  setThemeTab(activeTheme);
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
  currentReading = null;
  activeTheme = "general";
  readingLayout.classList.add("hidden");
  shareButton.classList.add("hidden");
  redrawButton.classList.add("hidden");
  cardArtwork.removeAttribute("src");
  heroCardArtwork.removeAttribute("src");
  cardSummary.textContent = "";
  artworkDescription.textContent = "";
  themeIntro.textContent = "";
  themeReading.textContent = "";
  revealHeadline.textContent = "";
  revealTags.innerHTML = "";
  renderHistory([]);
  setThemeTab("general");
  resetDeckState();
  if (historyDialog.open) {
    historyDialog.close();
  }
  closeExportDialog();
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

function loadImageForCanvas(source, fallback) {
  return new Promise((resolve, reject) => {
    const art = new Image();
    art.crossOrigin = "anonymous";

    art.onload = () => resolve(art);
    art.onerror = () => {
      if (fallback && source !== fallback) {
        loadImageForCanvas(fallback).then(resolve).catch(reject);
        return;
      }

      reject(new Error("Unable to load artwork for export."));
    };

    art.src = source;
  });
}

function drawRoundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

async function buildShareCanvas(reading) {
  if (!reading) {
    return null;
  }

  const card = lookupCard(reading.cardKey);
  if (!card) {
    return null;
  }

  const orientation = reading.orientation;
  const canvas = document.createElement("canvas");
  canvas.width = 1242;
  canvas.height = 1660;
  const context = canvas.getContext("2d");
  const exportCopy = buildExportCopy(card, orientation);

  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#171021");
  gradient.addColorStop(1, "#09070f");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "rgba(255, 255, 255, 0.03)";
  drawRoundedRect(context, 14, 14, canvas.width - 28, canvas.height - 28, 32);
  context.fill();
  context.strokeStyle = "rgba(255, 223, 165, 0.08)";
  context.lineWidth = 1;
  context.stroke();

  context.fillStyle = "#ffcf78";
  context.font = "700 26px Manrope";
  context.fillText(card.arcanaLabel.toUpperCase(), 46, 58);

  context.fillStyle = "rgba(39, 31, 58, 0.88)";
  drawRoundedRect(context, 1080, 26, 132, 60, 30);
  context.fill();
  context.fillStyle = "#e3c991";
  context.font = "600 24px Manrope";
  context.textAlign = "center";
  context.fillText(exportCopy.orientationLabel, 1146, 66);
  context.textAlign = "left";

  context.fillStyle = "#f8eedb";
  const titleSize = card.name.length > 18 ? 68 : 76;
  context.font = `600 ${titleSize}px Cormorant Garamond`;
  wrapText(context, card.name, 46, 136, 980, 72, `600 ${titleSize}px Cormorant Garamond`, "#f8eedb");

  context.font = "500 34px Manrope";
  wrapText(context, exportCopy.intro, 46, 244, 1120, 54, "500 34px Manrope", "#f2e7d1");

  function drawInfoCard(x, y, width, height, icon, label, heading, body, bodyFont = "500 26px Manrope") {
    context.fillStyle = "rgba(33, 24, 52, 0.96)";
    drawRoundedRect(context, x, y, width, height, 28);
    context.fill();
    context.strokeStyle = "rgba(255, 223, 165, 0.08)";
    context.stroke();

    context.fillStyle = "rgba(57, 44, 76, 1)";
    drawRoundedRect(context, x + 24, y + 24, 54, 54, 27);
    context.fill();
    context.strokeStyle = "rgba(255, 196, 109, 0.24)";
    context.stroke();

    context.fillStyle = "#ffcf78";
    context.font = "600 24px Manrope";
    context.textAlign = "center";
    context.fillText(icon, x + 51, y + 59);
    context.textAlign = "left";

    context.fillStyle = "#d7c186";
    context.font = "700 18px Manrope";
    context.fillText(label.toUpperCase(), x + 100, y + 48);

    if (heading) {
      context.fillStyle = "#f8eedb";
      context.font = "600 42px Cormorant Garamond";
      context.fillText(heading, x + 100, y + 94);
    }

    const bodyY = heading ? y + 146 : y + 110;
    wrapText(context, body, x + 24, bodyY, width - 48, 42, bodyFont, "#dcc89d");
  }

  drawInfoCard(46, 322, 570, 240, "✦", "Core keyword", exportCopy.keywordLabel, exportCopy.keywordSupport);
  drawInfoCard(632, 322, 564, 240, "◌", "Artwork speaks through", "", exportCopy.artwork);
  drawInfoCard(46, 590, 570, 308, "☼", "General", "General", exportCopy.general, "500 25px Manrope");
  drawInfoCard(632, 590, 564, 308, "✷", "Work", "Work", exportCopy.work, "500 25px Manrope");
  drawInfoCard(46, 926, 570, 308, "♡", "Relationship", "Relationship", exportCopy.relationship, "500 25px Manrope");
  drawInfoCard(632, 926, 564, 308, "◈", "Money", "Money", exportCopy.money, "500 25px Manrope");
  drawInfoCard(46, 1262, 1150, 280, "☾", "Mind", "Mind", exportCopy.mind, "500 25px Manrope");

  context.fillStyle = "rgba(255, 255, 255, 0.06)";
  context.fillRect(46, 1578, 1150, 1);
  context.fillStyle = "#ffcf78";
  context.font = "700 28px Manrope";
  context.fillText("✦  Arcana Daily", 46, 1624);
  context.fillStyle = "rgba(235, 224, 202, 0.46)";
  context.font = "600 18px Manrope";
  context.textAlign = "right";
  context.fillText("arcana daily • drawn with intention", 1196, 1624);
  context.textAlign = "left";

  return canvas;
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Could not create image blob."));
        return;
      }

      resolve(blob);
    }, "image/png");
  });
}

function revokeExportPreview() {
  if (!exportBlobUrl) {
    return;
  }

  URL.revokeObjectURL(exportBlobUrl);
  exportBlobUrl = "";
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

  return cursorY;
}

async function handleDownloadCard() {
  try {
    const state = loadState();
    const reading = state.current;
    const canvas = await buildShareCanvas(reading);
    if (!canvas) {
      return;
    }

    const card = reading ? lookupCard(reading.cardKey) : null;
    const safeName = card ? card.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "reading";
    const blob = await canvasToBlob(canvas);
    revokeExportPreview();
    exportBlobUrl = URL.createObjectURL(blob);
    exportFileName = `arcana-daily-${safeName}.png`;
    exportPreviewImage.src = exportBlobUrl;
    exportDialog.showModal();
  } catch (error) {
    console.error(error);
    window.alert("The reading image could not be generated. Please try drawing the card again.");
  }
}

function closeExportDialog() {
  if (exportDialog.open) {
    exportDialog.close();
  }
}

function confirmDownload() {
  if (!exportBlobUrl) {
    return;
  }

  const link = document.createElement("a");
  link.href = exportBlobUrl;
  link.download = exportFileName;
  link.click();
  closeExportDialog();
}

themeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setThemeTab(tab.dataset.theme);
  });
});

deckButton.addEventListener("click", handleDraw);
deckShell.addEventListener("click", handleDraw);
continueButton.addEventListener("click", continueToReading);
redrawButton.addEventListener("click", handleRedraw);
shareButton.addEventListener("click", handleDownloadCard);
historyLink.addEventListener("click", openHistoryDialog);
refreshLink.addEventListener("click", clearAllState);
closeHistoryButton.addEventListener("click", closeHistoryDialog);
closeExportButton.addEventListener("click", closeExportDialog);
cancelExportButton.addEventListener("click", closeExportDialog);
confirmDownloadButton.addEventListener("click", confirmDownload);
exportDialog.addEventListener("close", () => {
  exportPreviewImage.removeAttribute("src");
  revokeExportPreview();
});

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
