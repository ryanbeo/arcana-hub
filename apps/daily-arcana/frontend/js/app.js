const STORAGE_KEY = "arcana-daily-reading";
const LANGUAGE_STORAGE_KEY = "arcana-daily-language";
const CLIENT_ID_STORAGE_KEY = "arcana-daily-client-id";
const API_BASE_URL = (window.ARCANA_API_BASE_URL || "https://arcana-hub.onrender.com").replace(/\/$/, "");
const FRONTEND_ONLY_MODE = window.ARCANA_FRONTEND_ONLY !== false;
const REVERSED_ORIENTATION_RATE = 0.3;
const USER_AGENT = navigator.userAgent || "";
const IS_MOBILE_SAFARI =
  /AppleWebKit/i.test(USER_AGENT) &&
  !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(USER_AGENT) &&
  (/iPhone|iPad|iPod/i.test(USER_AGENT) || (/Macintosh/i.test(USER_AGENT) && navigator.maxTouchPoints > 1));

const dateHeading = document.getElementById("dateHeading");
const langEnglish = document.getElementById("langEnglish");
const langVietnamese = document.getElementById("langVietnamese");
const languageSwitcher = document.getElementById("languageSwitcher");
const drawStage = document.querySelector(".draw-stage");
const deckButton = document.getElementById("deckButton");
const deckShell = document.getElementById("deckShell");
const deckOracle = document.getElementById("deckOracle");
const deckOrbitField = document.getElementById("deckOrbitField");
const selectionControls = document.getElementById("selectionControls");
const cancelSelectionButton = document.getElementById("cancelSelectionButton");
const parallaxLayers = document.querySelectorAll("[data-parallax-layer]");
const heroPulledCard = document.getElementById("heroPulledCard");
const heroCardArtwork = document.getElementById("heroCardArtwork");
const revealPanel = document.getElementById("revealPanel");
const revealHeadline = document.getElementById("revealHeadline");
const revealTags = document.getElementById("revealTags");
const continueButton = document.getElementById("continueButton");
const summaryViewport = document.getElementById("summaryViewport");
const summaryPanel = document.getElementById("summaryPanel");
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
const limitDialog = document.getElementById("limitDialog");
const closeLimitButton = document.getElementById("closeLimitButton");
const limitHeading = document.getElementById("limitHeading");
const limitMessage = document.getElementById("limitMessage");
const limitPrimaryButton = document.getElementById("limitPrimaryButton");
const limitPrimaryLabel = document.getElementById("limitPrimaryLabel");
const limitSecondaryButton = document.getElementById("limitSecondaryButton");
const limitSecondaryLabel = document.getElementById("limitSecondaryLabel");
const readingLayout = document.getElementById("readingLayout");
const tarotCard = document.getElementById("tarotCard");
const cardFlipButton = document.getElementById("cardFlipButton");
const cardArtwork = document.getElementById("cardArtwork");
const cardArtworkBackText = document.getElementById("cardArtworkBackText");
const cardArcana = document.getElementById("cardArcana");
const cardName = document.getElementById("cardName");
const cardOrientation = document.getElementById("cardOrientation");
const cardSummary = document.getElementById("cardSummary");
const primaryKeyword = document.getElementById("primaryKeyword");
const keywordSupport = document.getElementById("keywordSupport");
const themeTabs = Array.from(document.querySelectorAll(".theme-tab"));
const activeThemeIcon = document.getElementById("activeThemeIcon");
const activeThemeTitle = document.getElementById("activeThemeTitle");
const themeIntro = document.getElementById("themeIntro");
const themeReading = document.getElementById("themeReading");
const historyList = document.getElementById("historyList");
const dailyRevealEyebrow = document.getElementById("dailyRevealEyebrow");
const revealKicker = document.getElementById("revealKicker");
const readingEyebrow = document.getElementById("readingEyebrow");
const coreKeywordEyebrow = document.getElementById("coreKeywordEyebrow");
const detailedReadingEyebrow = document.getElementById("detailedReadingEyebrow");
const historyEyebrow = document.getElementById("historyEyebrow");
const historyHeading = document.getElementById("historyHeading");
const historyEmptyState = document.getElementById("historyEmptyState");
const archiveEyebrow = document.getElementById("archiveEyebrow");
const historyDialogHeading = document.getElementById("historyDialogHeading");
const historyDialogEmptyState = document.getElementById("historyDialogEmptyState");
const previewEyebrow = document.getElementById("previewEyebrow");
const exportHeading = document.getElementById("exportHeading");

const THEME_ICON_CLASS = {
  general: "ph ph-sun-dim",
  work: "ph ph-briefcase",
  relationship: "ph ph-heart",
  money: "ph ph-coins",
  body: "ph ph-person-simple",
  mind: "ph ph-moon-stars"
};

const THEME_META = {
  general: {
    label: "General",
    labelVi: "Tổng quan",
    icon: "☼",
    intro: "The tone of the day",
    introVi: "Năng lượng chung của ngày hôm nay"
  },
  work: {
    label: "Work",
    labelVi: "Công việc",
    icon: "✷",
    intro: "How this energy wants to move through your work",
    introVi: "Năng lượng này đang đi vào công việc của bạn như thế nào"
  },
  relationship: {
    label: "Relationship",
    labelVi: "Tình cảm",
    icon: "♡",
    intro: "What this card is saying about connection",
    introVi: "Lá bài này đang nói gì về sự kết nối"
  },
  money: {
    label: "Money",
    labelVi: "Tài chính",
    icon: "◈",
    intro: "How to handle resources and practical choices",
    introVi: "Cách xử lý tiền bạc và những lựa chọn thực tế"
  },
  body: {
    label: "Body",
    labelVi: "Cơ thể",
    icon: "✦",
    intro: "How this message moves through your body and energy",
    introVi: "Thông điệp này đang đi qua cơ thể và năng lượng của bạn ra sao"
  },
  mind: {
    label: "Mind",
    labelVi: "Tâm trí",
    icon: "☾",
    intro: "The inner message beneath the surface",
    introVi: "Thông điệp bên trong đang muốn được nhìn thấy"
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
  body: {
    should: "listen to your energy honestly, support your body with simple care, and treat physical signals like useful information",
    shouldNot: "override fatigue, ignore tension, or treat your body like an obstacle you need to outwork"
  },
  mind: {
    should: "slow the pace of your thoughts, make space to breathe, and choose the story that supports your peace rather than your fear",
    shouldNot: "feed spirals, rehearse worst-case scenarios, or mistake mental noise for truth"
  }
};

const ORBIT_LAYOUT = [{ count: 78, speed: 0.00011, direction: 1 }];
const ORBIT_SPREAD_DURATION = 960;
const ORBIT_SELECTION_DURATION = 520;
const ORBIT_RETURN_DURATION = 360;
const ORBIT_DISPERSAL_DURATION = 720;
const UI_STAGE_TRANSITION_DURATION = 360;
const ORBIT_SELECTED_SCALE = 1;
const ORBIT_VISIBLE_ARC = 1.16;
const ORBIT_PUSH_DOWN_RATIO = 0.3;
const REVEALED_STACK_VISIBLE_COUNT = 3;
const ORBIT_RENDER_COUNT_DESKTOP = 24;
const ORBIT_RENDER_COUNT_MOBILE = 22;
const ORBIT_RENDER_COUNT_MOBILE_SAFARI = 18;
const REVEALED_STACK_PATTERN = [
  { x: -16, y: 14, rotation: -5 },
  { x: 16, y: 14, rotation: 5 },
  { x: 0, y: 8, rotation: -1 }
];

let activeTheme = "general";
let currentReading = null;
let currentLanguage = loadLanguage();
const revealTextJobs = new WeakMap();
let exportBlobUrl = "";
let exportFileName = "arcana-daily-reading.png";
const UI_COPY = window.APP_LOCALIZATION || { en: {}, vi: {} };
const clientId = loadClientId();
let pendingFallbackReading = null;
let pendingRateLimit = null;
let deckInteraction = createDeckInteractionState();

document.documentElement.classList.toggle("is-mobile-safari", IS_MOBILE_SAFARI);

function setReadingScrollLocked(locked) {
  document.documentElement.classList.toggle("is-reading-locked", locked);
  document.body.classList.toggle("is-reading-locked", locked);
}

function t(key) {
  return UI_COPY[currentLanguage][key] || UI_COPY.en[key] || key;
}

function themeLabel(themeName) {
  return t(`theme${themeName.charAt(0).toUpperCase()}${themeName.slice(1)}`);
}

function themeIntroLabel(themeName) {
  return t(`theme${themeName.charAt(0).toUpperCase()}${themeName.slice(1)}Intro`);
}

function createDeckInteractionState() {
  return {
    phase: "idle",
    cards: [],
    ringAngles: ORBIT_LAYOUT.map(() => Math.random() * Math.PI * 2),
    frameId: 0,
    lastTimestamp: 0,
    spreadStart: 0,
    selectedCard: null,
    metrics: {
      width: 0,
      height: 0,
      baseRadius: 0,
      orbitRadius: 0,
      orbitHubY: 0
    }
  };
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function clampValue(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function mix(start, end, progress) {
  return start + (end - start) * progress;
}

function normalizeAngle(angle) {
  const fullTurn = Math.PI * 2;
  let normalized = angle % fullTurn;

  if (normalized > Math.PI) {
    normalized -= fullTurn;
  }

  if (normalized < -Math.PI) {
    normalized += fullTurn;
  }

  return normalized;
}

function easeOutQuint(value) {
  return 1 - Math.pow(1 - value, 5);
}

function easeInOutCubic(value) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function shuffleItems(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function cardLocaleEntry(card) {
  return window.TAROT_IMPORTED_CARD_CONTENT?.[currentLanguage]?.cards?.[card.key] || null;
}

function localizedCardValue(card, key) {
  const localeEntry = cardLocaleEntry(card);
  if (!localeEntry || localeEntry[key] === undefined) {
    return key === "keywords" ? [] : "";
  }

  return localeEntry[key];
}

function localizedCardName(card) {
  return localizedCardValue(card, "name");
}

function localizedArcanaLabel(card) {
  return localizedCardValue(card, "arcanaLabel");
}

function localizedPrimaryKeyword(card) {
  return localizedCardValue(card, "primaryKeyword");
}

function localizedKeywords(card) {
  return localizedCardValue(card, "keywords");
}

function localizedArtwork(card) {
  return localizedCardValue(card, "artwork");
}

function localizedSummary(card, orientation) {
  return cardLocaleEntry(card)?.summary?.[orientation] || "";
}

function localizedThemeCopy(card, orientation, themeName) {
  return cardLocaleEntry(card)?.themes?.[themeName]?.[orientation] || "";
}

function normalizeCardKey(cardKey) {
  return String(cardKey || "").replace(/^\d+-/, "");
}

function applyLocalizedElements() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = t(key);
  });
}

function loadLanguage() {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "en" || stored === "vi") {
    return stored;
  }

  return "vi";
}

function loadClientId() {
  const stored = localStorage.getItem(CLIENT_ID_STORAGE_KEY);
  if (stored) {
    return stored;
  }

  const generated = window.crypto?.randomUUID
    ? window.crypto.randomUUID()
    : `arcana-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem(CLIENT_ID_STORAGE_KEY, generated);
  return generated;
}

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
  return new Intl.DateTimeFormat(currentLanguage === "vi" ? "vi-VN" : undefined, {
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
    orientation: Math.random() < REVERSED_ORIENTATION_RATE ? "reversed" : "upright"
  };
}

function normalizeApiReading(reading) {
  if (!reading) {
    return null;
  }

  return {
    id: reading.id,
    date: reading.draw_date || reading.date,
    drawDate: reading.draw_date || reading.date,
    cardKey: normalizeCardKey(reading.card_key || reading.cardKey),
    orientation: reading.orientation,
    createdAt: reading.created_at || reading.createdAt,
    interpretation: reading.interpretation || null,
    userContext: reading.user_context || reading.userContext || ""
  };
}

function saveApiState(reading, history) {
  const normalizedReading = normalizeApiReading(reading);
  const normalizedHistory = (history || []).map(normalizeApiReading).filter(Boolean);
  saveState({
    current: normalizedReading,
    history: normalizedHistory
  });
  return { reading: normalizedReading, history: normalizedHistory };
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || `Request failed: ${response.status}`);
    error.payload = payload;
    error.status = response.status;
    throw error;
  }

  return payload;
}

async function fetchSessionState() {
  const params = new URLSearchParams({ client_id: clientId });
  return apiRequest(`/api/session?${params.toString()}`);
}

async function requestDraw({ redraw = false, userContext = "", selectedCardKey = "", selectedOrientation = "" } = {}) {
  return apiRequest("/api/draw", {
    method: "POST",
    body: {
      client_id: clientId,
      redraw,
      user_context: userContext,
      selected_card_key: selectedCardKey || undefined,
      selected_orientation: selectedOrientation || undefined
    }
  });
}

function closeLimitDialog() {
  if (limitDialog.open) {
    limitDialog.close();
  }
  pendingFallbackReading = null;
  pendingRateLimit = null;
}

function saveFallbackReading(reading) {
  const normalized = normalizeApiReading(reading);
  if (!normalized) {
    return null;
  }

  const state = loadState();
  const history = [...(state.history || []).filter((item) => item.date !== normalized.date), normalized].slice(-14);
  saveState({
    current: normalized,
    history
  });
  return { reading: normalized, history };
}

function buildSelectedReading(entry, drawDate = todayKey()) {
  return {
    date: drawDate,
    drawDate,
    cardKey: entry.card.key,
    orientation: entry.orientation
  };
}

function saveLocalReading(reading) {
  if (!reading) {
    return null;
  }

  const normalized = {
    ...reading,
    drawDate: reading.drawDate || reading.date
  };
  const state = loadState();
  const history = [...(state.history || []).filter((item) => item.date !== normalized.date), normalized].slice(-14);
  saveState({
    current: normalized,
    history
  });
  return { reading: normalized, history };
}

function showRateLimitDialog(ratePayload) {
  pendingFallbackReading = ratePayload?.fallback_reading || null;
  pendingRateLimit = ratePayload || null;

  if (!pendingRateLimit) {
    return;
  }

  if (pendingRateLimit.limit_type === "daily") {
    limitHeading.textContent = "The stars have closed the reading room for today";
    limitPrimaryLabel.textContent = "Read structured version";
    limitSecondaryLabel.textContent = "Come back tomorrow";
  } else {
    limitHeading.textContent = "The cosmic line is a little crowded right now";
    limitPrimaryLabel.textContent = "Try again in 1 min";
    limitSecondaryLabel.textContent = "View structured reading";
  }

  limitMessage.textContent = pendingRateLimit.message || "";
  limitDialog.showModal();
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
  const normalizedKey = normalizeCardKey(cardKey);
  return window.TAROT_DATABASE.byKey[normalizedKey] || null;
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

function setDeckShellHidden(hidden) {
  deckShell.classList.toggle("is-hidden", hidden);
}

function updateDeckInteractionMetrics() {
  const width = deckOracle.clientWidth || drawStage?.clientWidth || 0;
  const height = deckOracle.clientHeight || drawStage?.clientHeight || 0;
  const shellWidth = deckShell.getBoundingClientRect().width || 300;
  const isMobile = window.innerWidth < 760;
  const useReducedMobileOrbit = isMobile && IS_MOBILE_SAFARI;
  const baseRadius = Math.min(width, height) * (isMobile ? 0.43 : 0.46);
  const orbitRadius = clampValue(
    Math.min(width * (useReducedMobileOrbit ? 0.7 : isMobile ? 0.78 : 0.68), height * (useReducedMobileOrbit ? 0.72 : isMobile ? 0.82 : 0.9)),
    useReducedMobileOrbit ? 240 : isMobile ? 280 : 560,
    useReducedMobileOrbit ? 380 : isMobile ? 460 : 860
  );
  const orbitHubY = useReducedMobileOrbit ? orbitRadius + height * 0.24 : isMobile ? orbitRadius + height * 0.16 : orbitRadius - height * 0.18;
  const cardWidth = useReducedMobileOrbit ? shellWidth * 0.8 : shellWidth;

  deckInteraction.metrics = {
    width,
    height,
    baseRadius,
    orbitRadius,
    orbitHubY
  };

  deckInteraction.cards.forEach((entry) => {
    entry.element.style.setProperty("--orbit-card-width", `${cardWidth}px`);
  });
}

function orbitVisibleArc() {
  if (window.innerWidth < 760 && IS_MOBILE_SAFARI) {
    return 0.82;
  }

  return ORBIT_VISIBLE_ARC;
}

function renderedOrbitCardCount() {
  if (window.innerWidth < 760 && IS_MOBILE_SAFARI) {
    return ORBIT_RENDER_COUNT_MOBILE_SAFARI;
  }

  if (window.innerWidth < 760) {
    return ORBIT_RENDER_COUNT_MOBILE;
  }

  return ORBIT_RENDER_COUNT_DESKTOP;
}

function selectedCardTargetY() {
  const oracleBounds = deckOracle.getBoundingClientRect();
  const oracleCenterY = oracleBounds.top + oracleBounds.height / 2;
  return window.innerHeight / 2 - oracleCenterY;
}

function selectedCardTargetX() {
  const oracleBounds = deckOracle.getBoundingClientRect();
  const oracleCenterX = oracleBounds.left + oracleBounds.width / 2;
  return window.innerWidth / 2 - oracleCenterX;
}

function revealedCardTargetX() {
  return selectedCardTargetX();
}

function revealedCardTargetY() {
  return -(deckInteraction.metrics.height || 0) * (window.innerWidth < 760 ? 0.08 : 0.14);
}

function animateStageEntrance(...elements) {
  elements.filter(Boolean).forEach((element) => {
    element.classList.remove("hidden", "is-transitioning-out");
    element.classList.add("is-entering");
  });

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      elements.filter(Boolean).forEach((element) => {
        element.classList.remove("is-entering");
      });
    });
  });
}

function revealedStackScaleUnit() {
  return (deckShell.getBoundingClientRect().width || 300) / 300;
}

function revealedStackBaseY() {
  const shellWidth = deckShell.getBoundingClientRect().width || 300;
  return revealedCardTargetY() + shellWidth * (window.innerWidth < 760 ? 0.12 : 0.22);
}

function revealedDeckPosition(entry) {
  if (entry.revealedLayout) {
    return entry.revealedLayout;
  }

  const stackIndex = entry.revealedStackIndex < 0 ? 0 : entry.revealedStackIndex;
  const pattern = REVEALED_STACK_PATTERN[stackIndex % REVEALED_STACK_PATTERN.length];
  const scaleUnit = revealedStackScaleUnit();
  const isVisible = stackIndex < REVEALED_STACK_VISIBLE_COUNT;

  return {
    x: pattern.x * scaleUnit,
    y: revealedStackBaseY() + pattern.y * scaleUnit,
    rotation: pattern.rotation,
    scale: 1,
    opacity: isVisible ? 1 : 0,
    zIndex: 200 + (REVEALED_STACK_VISIBLE_COUNT - Math.min(stackIndex, REVEALED_STACK_VISIBLE_COUNT - 1))
  };
}

function cacheRevealedLayout(selectedEntry) {
  deckInteraction.cards.forEach((entry) => {
    if (entry === selectedEntry) {
      entry.revealedLayout = {
        x: revealedCardTargetX(),
        y: revealedCardTargetY(),
        rotation: 0,
        scale: ORBIT_SELECTED_SCALE,
        opacity: 1,
        zIndex: 10000
      };
      return;
    }

    entry.revealedLayout = revealedDeckPosition(entry);
  });
}

function assignRevealedStackOrder(selectedEntry) {
  let stackIndex = 0;

  deckInteraction.cards.forEach((entry) => {
    if (entry === selectedEntry) {
      entry.revealedStackIndex = -1;
      return;
    }

    entry.revealedStackIndex = stackIndex;
    stackIndex += 1;
  });
}

function animateOrbitSpreadOffset(offsetY = 0, duration = ORBIT_SELECTION_DURATION, easing = easeOutQuint) {
  const selectedEntry = deckInteraction.selectedCard;

  deckInteraction.cards.forEach((entry) => {
    if (entry === selectedEntry) {
      return;
    }

    createOrbitCardAnimation(
      entry,
      {
        x: entry.frozenX,
        y: entry.frozenY + offsetY,
        rotation: entry.frozenRotation,
        scale: entry.frozenScale,
        opacity: entry.frozenOpacity,
        zIndex: entry.frozenZIndex
      },
      duration,
      easing
    );
  });
}

function orbitPushDownOffset() {
  return (deckInteraction.metrics.height || 0) * ORBIT_PUSH_DOWN_RATIO;
}

function resetDeckInteractionState() {
  if (deckInteraction.frameId) {
    window.cancelAnimationFrame(deckInteraction.frameId);
  }

  deckInteraction = createDeckInteractionState();
  deckOrbitField.innerHTML = "";
  deckOracle.classList.add("hidden");
  deckOracle.classList.remove("has-selection", "is-loading", "is-transitioning-out", "is-entering");
  selectionControls.classList.add("hidden");
  cancelSelectionButton.disabled = false;
}

function buildOrbitCardEntry(card, ringIndex, slotIndex, count) {
  const element = document.createElement("button");
  element.className = "orbit-card";
  element.type = "button";
  element.setAttribute("aria-label", t("selectCardAria"));
  element.innerHTML = `
    <span class="orbit-card-inner">
      <span class="orbit-card-face orbit-card-back"></span>
      <span class="orbit-card-face orbit-card-front">
        <img alt="" />
      </span>
    </span>
  `;

  const entry = {
    element,
    frontImage: element.querySelector("img"),
    card,
    orientation: Math.random() < REVERSED_ORIENTATION_RATE ? "reversed" : "upright",
    ringIndex,
    slotIndex,
    baseAngle: (Math.PI * 2 * slotIndex) / count,
    tilt: 0,
    depthBias: 0,
    animation: null,
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    opacity: 0,
    zIndex: 0,
    frozenX: 0,
    frozenY: 0,
    frozenRotation: 0,
    frozenScale: 1,
    frozenOpacity: 1,
    frozenZIndex: 0,
    revealedStackIndex: -1,
    revealedLayout: null
  };

  element.addEventListener("click", () => {
    if (deckInteraction.phase === "selected" && deckInteraction.selectedCard === entry) {
      revealSelectedCard();
      return;
    }

    handleOrbitCardSelection(entry);
  });

  return entry;
}

function buildDeckOrbit() {
  const shuffledDeck = shuffleItems(window.TAROT_DATABASE.cards);
  const visibleDeck = shuffledDeck.slice(0, renderedOrbitCardCount());
  const count = visibleDeck.length;

  visibleDeck.forEach((card, slotIndex) => {
    const entry = buildOrbitCardEntry(card, 0, slotIndex, count);
    deckInteraction.cards.push(entry);
    deckOrbitField.appendChild(entry.element);
  });

  updateDeckInteractionMetrics();
}

function computeOrbitTarget(entry, spreadProgress = 1) {
  const angle = normalizeAngle(entry.baseAngle + deckInteraction.ringAngles[0]);
  const finalX = Math.sin(angle) * deckInteraction.metrics.orbitRadius;
  const finalY = deckInteraction.metrics.orbitHubY - Math.cos(angle) * deckInteraction.metrics.orbitRadius;
  const x = finalX * spreadProgress;
  const y = finalY * spreadProgress;
  const scale = 1;
  const rotation = angle * (180 / Math.PI);
  const visibility = clampValue((orbitVisibleArc() - Math.abs(angle)) / 0.36, 0, 1);
  const opacity = easeOutQuint(visibility) * spreadProgress;
  const zIndex = 1000 + Math.round((x + deckInteraction.metrics.orbitRadius) * 10);

  return {
    x,
    y,
    rotation,
    scale,
    opacity,
    zIndex
  };
}

function applyOrbitCardTransform(entry, props) {
  entry.x = props.x;
  entry.y = props.y;
  entry.rotation = props.rotation;
  entry.scale = props.scale;
  entry.opacity = props.opacity;
  entry.zIndex = props.zIndex;

  entry.element.style.transform = `translate(-50%, -50%) translate3d(${props.x}px, ${props.y}px, 0) rotate(${props.rotation}deg) scale(${props.scale})`;
  entry.element.style.opacity = String(props.opacity);
  entry.element.style.zIndex = String(props.zIndex);
  entry.element.style.pointerEvents = props.opacity > 0.08 ? "auto" : "none";
}

function createOrbitCardAnimation(entry, to, duration, easing = easeOutQuint, onComplete) {
  entry.animation = {
    from: {
      x: entry.x,
      y: entry.y,
      rotation: entry.rotation,
      scale: entry.scale,
      opacity: entry.opacity,
      zIndex: entry.zIndex
    },
    to,
    duration,
    easing,
    start: performance.now(),
    onComplete
  };
}

function advanceOrbitCardAnimation(entry, timestamp) {
  const animation = entry.animation;
  const progress = clampValue((timestamp - animation.start) / animation.duration, 0, 1);
  const eased = animation.easing(progress);
  const current = {
    x: mix(animation.from.x, animation.to.x, eased),
    y: mix(animation.from.y, animation.to.y, eased),
    rotation: mix(animation.from.rotation, animation.to.rotation, eased),
    scale: mix(animation.from.scale, animation.to.scale, eased),
    opacity: mix(animation.from.opacity, animation.to.opacity, eased),
    zIndex: Math.round(mix(animation.from.zIndex, animation.to.zIndex, eased))
  };

  applyOrbitCardTransform(entry, current);

  if (progress >= 1) {
    entry.animation = null;
    if (typeof animation.onComplete === "function") {
      animation.onComplete();
    }
  }
}

function freezeOrbitCards() {
  deckInteraction.cards.forEach((entry) => {
    entry.frozenX = entry.x;
    entry.frozenY = entry.y;
    entry.frozenRotation = entry.rotation;
    entry.frozenScale = entry.scale;
    entry.frozenOpacity = entry.opacity;
    entry.frozenZIndex = entry.zIndex;
    entry.revealedLayout = null;
  });
}

function orbitIdlePosition(entry) {
  if (entry === deckInteraction.selectedCard && ["selected", "flipping"].includes(deckInteraction.phase)) {
    return {
      x: selectedCardTargetX(),
      y: selectedCardTargetY(),
      rotation: 0,
      scale: ORBIT_SELECTED_SCALE,
      opacity: 1,
      zIndex: 10000
    };
  }

  if (entry === deckInteraction.selectedCard && ["revealing", "revealed", "dispersing"].includes(deckInteraction.phase)) {
    return entry.revealedLayout || {
      x: revealedCardTargetX(),
      y: revealedCardTargetY(),
      rotation: 0,
      scale: ORBIT_SELECTED_SCALE,
      opacity: 1,
      zIndex: 10000
    };
  }

  if (deckInteraction.selectedCard && ["selected", "flipping"].includes(deckInteraction.phase)) {
    return {
      x: entry.frozenX,
      y: entry.frozenY + orbitPushDownOffset(),
      rotation: entry.frozenRotation,
      scale: entry.frozenScale,
      opacity: entry.frozenOpacity,
      zIndex: entry.frozenZIndex
    };
  }

  if (deckInteraction.selectedCard && ["revealing", "revealed", "dispersing"].includes(deckInteraction.phase)) {
    return revealedDeckPosition(entry);
  }

  return {
    x: entry.frozenX,
    y: entry.frozenY,
    rotation: entry.frozenRotation,
    scale: entry.frozenScale,
    opacity: entry.frozenOpacity,
    zIndex: entry.frozenZIndex
  };
}

function runDeckInteractionFrame(timestamp) {
  if (!deckInteraction.lastTimestamp) {
    deckInteraction.lastTimestamp = timestamp;
  }

  const delta = Math.min(32, timestamp - deckInteraction.lastTimestamp);
  deckInteraction.lastTimestamp = timestamp;

  if (deckInteraction.phase === "spreading" || deckInteraction.phase === "spinning") {
    ORBIT_LAYOUT.forEach((ring, index) => {
      deckInteraction.ringAngles[index] += delta * ring.speed * ring.direction;
    });
  }

  let spreadProgress = 1;
  if (deckInteraction.phase === "spreading") {
    spreadProgress = easeOutQuint(clampValue((timestamp - deckInteraction.spreadStart) / ORBIT_SPREAD_DURATION, 0, 1));
    if (spreadProgress >= 1) {
      deckInteraction.phase = "spinning";
    }
  }

  deckInteraction.cards.forEach((entry) => {
    if (entry.animation) {
      advanceOrbitCardAnimation(entry, timestamp);
      return;
    }

    if (deckInteraction.phase === "spreading" || deckInteraction.phase === "spinning") {
      applyOrbitCardTransform(entry, computeOrbitTarget(entry, spreadProgress));
      return;
    }

    applyOrbitCardTransform(entry, orbitIdlePosition(entry));
  });

  deckInteraction.frameId = window.requestAnimationFrame(runDeckInteractionFrame);
}

function beginDeckSelection() {
  resetDeckInteractionState();
  setDeckShellHidden(true);
  deckButton.classList.add("hidden");
  revealPanel.classList.add("hidden");
  deckOracle.classList.remove("hidden");
  buildDeckOrbit();
  deckInteraction.phase = "spreading";
  deckInteraction.spreadStart = performance.now();
  deckInteraction.lastTimestamp = 0;
  deckInteraction.frameId = window.requestAnimationFrame(runDeckInteractionFrame);
}

function handleOrbitCardSelection(entry) {
  if (deckInteraction.phase !== "spinning") {
    return;
  }

  deckInteraction.phase = "selecting";
  deckInteraction.selectedCard = entry;
  freezeOrbitCards();
  deckOracle.classList.add("has-selection");
  deckInteraction.cards.forEach((cardEntry) => {
    cardEntry.element.classList.toggle("is-muted", cardEntry !== entry);
  });
  animateOrbitSpreadOffset(orbitPushDownOffset(), ORBIT_SELECTION_DURATION, easeOutQuint);
  entry.element.classList.add("is-selected");
  createOrbitCardAnimation(
    entry,
    {
      x: selectedCardTargetX(),
      y: selectedCardTargetY(),
      rotation: 0,
      scale: ORBIT_SELECTED_SCALE,
      opacity: 1,
      zIndex: 10000
    },
    ORBIT_SELECTION_DURATION,
    easeOutQuint,
    () => {
      deckInteraction.phase = "selected";
      selectionControls.classList.remove("hidden");
    }
  );
}

function cancelSelectedCardSelection() {
  if (deckInteraction.phase !== "selected" || !deckInteraction.selectedCard) {
    return;
  }

  const entry = deckInteraction.selectedCard;
  selectionControls.classList.add("hidden");
  deckInteraction.phase = "returning";
  animateOrbitSpreadOffset(0, ORBIT_RETURN_DURATION, easeInOutCubic);
  createOrbitCardAnimation(
    entry,
    {
      x: entry.frozenX,
      y: entry.frozenY,
      rotation: entry.frozenRotation,
      scale: entry.frozenScale,
      opacity: 1,
      zIndex: entry.frozenZIndex
    },
    ORBIT_RETURN_DURATION,
    easeInOutCubic,
    () => {
      entry.element.classList.remove("is-selected", "is-flipped", "is-revealed");
      deckInteraction.cards.forEach((cardEntry) => {
        cardEntry.element.classList.remove("is-muted", "is-dispersing");
      });
      deckInteraction.selectedCard = null;
      deckInteraction.phase = "spinning";
      deckOracle.classList.remove("has-selection");
    }
  );
}

function prepareOrbitCardArtwork(entry) {
  const fallback = createArtworkUri(entry.card, entry.orientation);
  attachFallback(entry.frontImage);
  entry.frontImage.dataset.fallback = fallback;
  entry.frontImage.src = artworkSource(entry.card, entry.orientation);
  entry.frontImage.alt = `${entry.card.name} tarot card artwork`;
  entry.frontImage.style.transform = entry.orientation === "reversed" ? "rotate(180deg)" : "none";
}

function disperseUnselectedOrbitCards(selectedEntry) {
  deckInteraction.phase = "dispersing";
  deckInteraction.cards.forEach((entry, index) => {
    if (entry === selectedEntry) {
      entry.element.classList.add("is-revealed");
      return;
    }

    entry.element.classList.add("is-dispersing");
    const directionX = entry.frozenX === 0 ? (Math.random() < 0.5 ? -1 : 1) : Math.sign(entry.frozenX);
    const directionY = entry.frozenY === 0 ? (Math.random() < 0.5 ? -1 : 1) : Math.sign(entry.frozenY);
    const target = {
      x: entry.frozenX * randomBetween(1.8, 2.45) + directionX * randomBetween(180, 320),
      y: entry.frozenY * randomBetween(1.6, 2.2) + directionY * randomBetween(120, 240),
      rotation: entry.frozenRotation + randomBetween(-46, 46),
      scale: 1,
      opacity: 0,
      zIndex: 10
    };
    const delay = (index % 9) * 22;

    window.setTimeout(() => {
      createOrbitCardAnimation(entry, target, ORBIT_DISPERSAL_DURATION, easeOutQuint);
    }, delay);
  });
}

async function resolveSelectedReading(entry) {
  const selectedReading = buildSelectedReading(entry);

  if (FRONTEND_ONLY_MODE) {
    return saveLocalReading(selectedReading);
  }

  try {
    const response = await requestDraw({
      selectedCardKey: entry.card.key,
      selectedOrientation: entry.orientation
    });
    return saveApiState(response.reading, response.history);
  } catch (error) {
    if (error.status === 429 && error.payload?.fallback_reading) {
      return { rateLimit: error.payload };
    }

    console.warn("Falling back to a local selected reading.", error);
    return saveLocalReading(selectedReading);
  }
}

async function revealSelectedCard() {
  if (deckInteraction.phase !== "selected" || !deckInteraction.selectedCard) {
    return;
  }

  const selectedEntry = deckInteraction.selectedCard;
  selectionControls.classList.add("hidden");
  cancelSelectionButton.disabled = true;
  deckInteraction.phase = "flipping";
  deckOracle.classList.add("is-loading");
  prepareOrbitCardArtwork(selectedEntry);
  assignRevealedStackOrder(selectedEntry);
  cacheRevealedLayout(selectedEntry);
  deckInteraction.cards.forEach((entry) => {
    if (entry !== selectedEntry) {
      entry.element.classList.remove("is-muted");
    }
  });
  selectedEntry.element.classList.add("is-flipped", "is-revealed");
  await wait(220);
  const outcome = await resolveSelectedReading(selectedEntry);
  deckInteraction.phase = "revealing";
  createOrbitCardAnimation(
    selectedEntry,
    selectedEntry.revealedLayout,
    ORBIT_SELECTION_DURATION,
    easeOutQuint
  );
  deckInteraction.cards.forEach((entry) => {
    if (entry === selectedEntry) {
      return;
    }

    createOrbitCardAnimation(entry, entry.revealedLayout, ORBIT_SELECTION_DURATION, easeOutQuint);
  });
  await wait(ORBIT_SELECTION_DURATION + 80);
  deckOracle.classList.remove("is-loading");

  if (outcome?.rateLimit) {
    resetDeckInteractionState();
    setDeckShellHidden(false);
    deckButton.classList.remove("hidden");
    showRateLimitDialog(outcome.rateLimit);
    return;
  }

  currentReading = outcome.reading;
  deckInteraction.phase = "revealed";
  renderHistory(outcome.history || []);
  const revealedCard = lookupCard(outcome.reading.cardKey);
  if (revealedCard) {
    updateRevealPanel(revealedCard, { animate: true });
  }
}

function buildThemeSummary(card, orientation, themeName, reading = currentReading) {
  const exactThemeCopy = localizedThemeCopy(card, orientation, themeName);
  return exactThemeCopy || "";
}

function buildExportSummary(card, orientation, reading = currentReading) {
  return Object.keys(THEME_META).map((themeName) => buildThemeSummary(card, orientation, themeName, reading));
}

function trimSentence(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 40 ? lastSpace : maxLength).trim()}.`;
}

function buildExportCopy(card, orientation, reading = currentReading) {
  const orientationLabel = orientation === "reversed" ? t("orientationReversed") : t("orientationUpright");
  const primaryKeyword = localizedPrimaryKeyword(card);
  const keywords = localizedKeywords(card).filter(Boolean);
  const readingDate = formatToday();
  return {
    orientationLabel,
    readingDate,
    intro: trimSentence(localizedSummary(card, orientation), 120),
    keywordLabel: primaryKeyword,
    keywordSupport: trimSentence(localizedArtwork(card) || `${t("supportKeywords")}: ${keywords.join(", ")}`, 160),
    general: trimSentence(buildThemeSummary(card, orientation, "general", reading), 118),
    work: trimSentence(buildThemeSummary(card, orientation, "work", reading), 118),
    relationship: trimSentence(buildThemeSummary(card, orientation, "relationship", reading), 118),
    money: trimSentence(buildThemeSummary(card, orientation, "money", reading), 118),
    mind: trimSentence(buildThemeSummary(card, orientation, "mind", reading), 132)
  };
}

function downloadSlug(card) {
  const localizedName = localizedCardName(card) || card.name || "reading";
  const normalized = localizedName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const safe = normalized.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return safe || card.key || "reading";
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
  activeThemeIcon.innerHTML = `<i class="${THEME_ICON_CLASS[themeName]}"></i>`;
  activeThemeTitle.textContent = themeLabel(themeName);
  themeIntro.textContent = themeIntroLabel(themeName);

  if (currentReading) {
    const card = lookupCard(currentReading.cardKey);
    if (card) {
      const exactThemeCopy = localizedThemeCopy(card, currentReading.orientation, themeName);
      themeReading.textContent = exactThemeCopy;
    }
  } else {
    themeReading.textContent = "";
  }
}

function renderLanguage() {
  document.documentElement.lang = currentLanguage === "vi" ? "vi" : "en";
  applyLocalizedElements();
  langEnglish.classList.toggle("is-active", currentLanguage === "en");
  langVietnamese.classList.toggle("is-active", currentLanguage === "vi");
  languageSwitcher.classList.toggle("is-vi", currentLanguage === "vi");
  historyLink.setAttribute("aria-label", t("cardHistoryAria"));
  historyLink.setAttribute("title", t("cardHistoryAria"));
  refreshLink.setAttribute("aria-label", t("refreshAria"));
  refreshLink.setAttribute("title", t("refreshAria"));
  closeHistoryButton.setAttribute("aria-label", t("closeAria"));
  closeExportButton.setAttribute("aria-label", t("closeAria"));
  cancelSelectionButton.setAttribute("aria-label", t("returnToOrbitAria"));
  deckInteraction.cards.forEach((entry) => {
    entry.element.setAttribute("aria-label", t("selectCardAria"));
  });

  themeTabs.forEach((tab) => {
    tab.lastElementChild.textContent = themeLabel(tab.dataset.theme);
  });

  if (!loadState().history?.length) {
    historyEmptyState.textContent = t("historyEmpty");
    historyDialogEmptyState.textContent = t("historyEmpty");
  }

  dateHeading.textContent = formatToday();

  if (currentReading) {
    renderReading(currentReading, { animateRevealPanel: revealPanel && !revealPanel.classList.contains("hidden") });
  } else {
    setThemeTab(activeTheme);
  }
}

function setLanguage(language) {
  currentLanguage = language;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  renderLanguage();
}

function updateHeaderScrollState() {
  document.body.classList.toggle("is-scrolled", window.scrollY > 12);
}

function attachFallback(imageNode) {
  if (imageNode.dataset.fallbackBound === "true") {
    return;
  }

  imageNode.dataset.fallbackBound = "true";
  imageNode.addEventListener("error", () => {
    const fallback = imageNode.dataset.fallback;
    if (fallback && imageNode.src !== fallback) {
      imageNode.src = fallback;
    }
  });
}

attachFallback(cardArtwork);
attachFallback(heroCardArtwork);

function updateRevealPanel(card, { animate = true, lockScroll = true } = {}) {
  setReadingScrollLocked(lockScroll);
  revealHeadline.textContent = localizedCardName(card);
  revealTags.innerHTML = localizedKeywords(card)
    .slice(0, 4)
    .map((keyword) => `<span class="reveal-tag">#${keyword.replace(/\s+/g, "")}</span>`)
    .join("");

  if (animate) {
    animateStageEntrance(revealPanel);
    return;
  }

  revealPanel.classList.remove("hidden");
  revealPanel.classList.remove("is-entering", "is-transitioning-out");
}

function renderReading(reading, { animateIn = false, animateRevealPanel = true } = {}) {
  const card = lookupCard(reading.cardKey);
  if (!card) {
    return;
  }

  setReadingScrollLocked(false);
  resetDeckInteractionState();
  setDeckShellHidden(false);
  currentReading = reading;
  const orientation = reading.orientation;
  const fallback = createArtworkUri(card, orientation);
  const source = artworkSource(card, orientation);

  deckShell.classList.remove("is-drawing", "is-flipping");
  deckShell.classList.add("is-revealed");
  deckButton.classList.add("hidden");
  if (animateIn) {
    animateStageEntrance(summaryPanel, readingLayout);
  } else {
    summaryPanel.classList.remove("hidden");
    readingLayout.classList.remove("hidden");
    summaryPanel.classList.remove("is-entering", "is-transitioning-out");
    readingLayout.classList.remove("is-entering", "is-transitioning-out");
  }
  heroPulledCard.style.transform =
    orientation === "reversed" ? "rotate(180deg) translateY(-26px) scale(1.02)" : "";
  heroCardArtwork.dataset.fallback = fallback;
  heroCardArtwork.src = source;
  heroCardArtwork.alt = `${card.name} tarot card artwork`;

  tarotCard.classList.remove("is-flipped");
  cardArtwork.dataset.fallback = fallback;
  cardArtwork.src = source;
  cardArtwork.style.transform = orientation === "reversed" ? "rotate(180deg)" : "none";
  cardArtwork.alt = `${card.name} tarot card artwork`;

  cardArcana.textContent = localizedArcanaLabel(card);
  cardName.textContent = localizedCardName(card);
  cardOrientation.textContent = orientation === "reversed" ? t("orientationReversed") : t("orientationUpright");
  cardSummary.textContent = "";
  primaryKeyword.textContent = localizedPrimaryKeyword(card);
  keywordSupport.textContent = `${t("supportKeywords")}: ${localizedKeywords(card).filter(Boolean).join(", ")}`;
  cardArtworkBackText.textContent = "";

  updateRevealPanel(card, { animate: animateRevealPanel, lockScroll: animateRevealPanel });
  shareButton.classList.remove("hidden");
  activeTheme = "general";
  revealText(
    cardSummary,
    localizedSummary(card, orientation),
    10
  );
  cardArtworkBackText.textContent = localizedArtwork(card);
  setThemeTab(activeTheme);
}

function renderHistory(history) {
  const markup = !history.length
    ? `<p class="empty-state">${t("historyEmpty")}</p>`
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
                <span class="status-badge muted">${entry.orientation === "reversed" ? t("orientationReversed") : t("orientationUpright")}</span>
              </div>
              <h3>${localizedCardName(card)}</h3>
              <p>${localizedSummary(card, entry.orientation)}</p>
            </article>
          `;
        })
        .join("");

  historyList.innerHTML = markup;
  historyDialogList.innerHTML = markup;
}

async function syncUi() {
  if (FRONTEND_ONLY_MODE) {
    const state = loadState();
    const dateKey = todayKey();
    const todayReading = state.current && state.current.date === dateKey ? state.current : null;

    dateHeading.textContent = formatToday();
    shareButton.classList.toggle("hidden", !todayReading);

    if (todayReading) {
      renderReading(todayReading, { animateRevealPanel: false });
      deckButton.classList.add("hidden");
    }

    renderHistory(state.history || []);
    return;
  }

  try {
    const session = await fetchSessionState();
    const saved = saveApiState(session.today_reading, session.history);
    dateHeading.textContent = formatToday();
    shareButton.classList.toggle("hidden", !saved.reading);

    if (saved.reading) {
      renderReading(saved.reading, { animateRevealPanel: false });
      deckButton.classList.add("hidden");
    }

    renderHistory(saved.history);
    return;
  } catch (error) {
    console.warn("Falling back to local tarot state.", error);
  }

  const state = loadState();
  const dateKey = todayKey();
  const todayReading = state.current && state.current.date === dateKey ? state.current : null;

  dateHeading.textContent = formatToday();
  shareButton.classList.toggle("hidden", !todayReading);

  if (todayReading) {
    renderReading(todayReading, { animateRevealPanel: false });
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
    deckShell.classList.remove("is-drawing");
    renderReading(reading, { animateIn: true, animateRevealPanel: true });
  }, 1280);
}

async function handleDraw() {
  if (deckShell.classList.contains("is-drawing") || deckInteraction.phase !== "idle") {
    return;
  }

  const state = loadState();
  const dateKey = todayKey();
  const existing = state.current && state.current.date === dateKey ? state.current : null;

  if (existing) {
    renderReading(existing, { animateRevealPanel: false });
    return;
  }

  beginDeckSelection();
}

function resetDeckState() {
  setReadingScrollLocked(false);
  resetDeckInteractionState();
  setDeckShellHidden(false);
  revealPanel.classList.add("hidden");
  deckButton.classList.remove("hidden");
  deckShell.classList.remove("is-drawing", "is-flipping", "is-revealed", "is-hidden");
  heroPulledCard.style.transform = "";
}

function clearAllState() {
  setReadingScrollLocked(false);
  localStorage.removeItem(STORAGE_KEY);
  currentReading = null;
  activeTheme = "general";
  summaryPanel.classList.add("hidden");
  readingLayout.classList.add("hidden");
  shareButton.classList.add("hidden");
  tarotCard.classList.remove("is-flipped");
  cardArtwork.removeAttribute("src");
  cardArtwork.style.transform = "";
  heroCardArtwork.removeAttribute("src");
  cardSummary.textContent = "";
  cardArtworkBackText.textContent = "";
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

async function continueToReading() {
  if (currentReading && summaryPanel.classList.contains("hidden")) {
    deckOracle.classList.add("is-transitioning-out");
    revealPanel.classList.add("is-transitioning-out");
    await wait(UI_STAGE_TRANSITION_DURATION - 40);
    renderReading(currentReading, { animateIn: true, animateRevealPanel: false });
  }
  summaryViewport.scrollIntoView({ behavior: "smooth", block: "start" });
}

function toggleCardFlip() {
  if (!currentReading) {
    return;
  }

  tarotCard.classList.toggle("is-flipped");
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
  const localizedName = localizedCardName(card);
  const localizedArcana = localizedArcanaLabel(card);
  const exportCopy = buildExportCopy(card, orientation, reading);
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
  context.fillText(localizedArcana.toUpperCase(), 46, 58);
  context.fillStyle = "rgba(235, 224, 202, 0.72)";
  context.font = "600 18px Manrope";
  context.fillText(exportCopy.readingDate, 46, 92);

  context.fillStyle = "rgba(39, 31, 58, 0.88)";
  drawRoundedRect(context, 1080, 26, 132, 60, 30);
  context.fill();
  context.fillStyle = "#e3c991";
  context.font = "600 24px Manrope";
  context.textAlign = "center";
  context.fillText(exportCopy.orientationLabel, 1146, 66);
  context.textAlign = "left";

  context.fillStyle = "#f8eedb";
  const titleSize = localizedName.length > 18 ? 62 : 72;
  context.font = `600 ${titleSize}px Cormorant Garamond`;
  wrapText(context, localizedName, 46, 150, 1120, 70, `600 ${titleSize}px Cormorant Garamond`, "#f8eedb");

  context.font = "500 30px Manrope";
  wrapText(context, exportCopy.intro, 46, 306, 1120, 48, "500 30px Manrope", "#f2e7d1");

  function drawInfoCard(x, y, width, height, icon, label, body, bodyFont = "500 22px Manrope") {
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

    wrapText(context, body, x + 24, y + 96, width - 48, 36, bodyFont, "#dcc89d");
  }

  drawInfoCard(46, 470, 570, 214, "✦", exportCopy.keywordLabel, exportCopy.keywordSupport, "500 21px Manrope");
  drawInfoCard(632, 470, 564, 214, "☼", themeLabel("general"), exportCopy.general, "500 21px Manrope");
  drawInfoCard(46, 716, 570, 214, "✷", themeLabel("work"), exportCopy.work, "500 21px Manrope");
  drawInfoCard(632, 716, 564, 214, "♡", themeLabel("relationship"), exportCopy.relationship, "500 21px Manrope");
  drawInfoCard(46, 962, 570, 214, "◈", themeLabel("money"), exportCopy.money, "500 21px Manrope");
  drawInfoCard(632, 962, 564, 214, "☾", themeLabel("mind"), exportCopy.mind, "500 21px Manrope");

  context.fillStyle = "rgba(255, 255, 255, 0.06)";
  context.fillRect(46, 1510, 1150, 1);
  context.fillStyle = "#ffcf78";
  context.font = "700 28px Manrope";
  context.fillText("✦  Arcana Daily", 46, 1556);
  context.fillStyle = "rgba(235, 224, 202, 0.46)";
  context.font = "600 18px Manrope";
  context.textAlign = "right";
  context.fillText(currentLanguage === "vi" ? "arcana daily • lá bài được rút có chủ ý" : "arcana daily • drawn with intention", 1196, 1556);
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
    const safeName = card ? downloadSlug(card) : "reading";
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

function handleLimitPrimaryAction() {
  if (!pendingRateLimit) {
    closeLimitDialog();
    return;
  }

  if (pendingRateLimit.limit_type === "daily") {
    const saved = saveFallbackReading(pendingFallbackReading);
    if (saved?.reading) {
      renderHistory(saved.history);
      renderReading(saved.reading);
    }
    closeLimitDialog();
    return;
  }

  const retryDelay = Math.max(60000, (pendingRateLimit.retry_after_seconds || 60) * 1000);
  closeLimitDialog();
  window.setTimeout(() => {
    handleDraw();
  }, retryDelay);
}

function handleLimitSecondaryAction() {
  if (!pendingRateLimit) {
    closeLimitDialog();
    return;
  }

  if (pendingRateLimit.limit_type === "daily") {
    closeLimitDialog();
    return;
  }

  const saved = saveFallbackReading(pendingFallbackReading);
  if (saved?.reading) {
    renderHistory(saved.history);
    renderReading(saved.reading);
  }
  closeLimitDialog();
}

themeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setThemeTab(tab.dataset.theme);
  });
});

langEnglish.addEventListener("click", () => setLanguage("en"));
langVietnamese.addEventListener("click", () => setLanguage("vi"));
deckButton.addEventListener("click", handleDraw);
deckShell.addEventListener("click", handleDraw);
cancelSelectionButton.addEventListener("click", cancelSelectedCardSelection);
continueButton.addEventListener("click", continueToReading);
shareButton.addEventListener("click", handleDownloadCard);
cardFlipButton.addEventListener("click", toggleCardFlip);
tarotCard.addEventListener("click", toggleCardFlip);
historyLink.addEventListener("click", openHistoryDialog);
refreshLink.addEventListener("click", clearAllState);
closeHistoryButton.addEventListener("click", closeHistoryDialog);
closeExportButton.addEventListener("click", closeExportDialog);
cancelExportButton.addEventListener("click", closeExportDialog);
confirmDownloadButton.addEventListener("click", confirmDownload);
closeLimitButton.addEventListener("click", closeLimitDialog);
limitPrimaryButton.addEventListener("click", handleLimitPrimaryAction);
limitSecondaryButton.addEventListener("click", handleLimitSecondaryAction);
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

window.addEventListener("scroll", updateHeaderScrollState, { passive: true });
window.addEventListener("resize", () => {
  if (deckInteraction.phase !== "idle") {
    updateDeckInteractionMetrics();
  }
});
updateHeaderScrollState();

async function initializeApp() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.warn("Service worker registration failed.", error);
    });
  }

  await (window.TAROT_CARD_JSON_READY || Promise.resolve());
  renderLanguage();
  await syncUi();
}

initializeApp();
