const STORAGE_KEY = "arcana-daily-reading";
const LANGUAGE_STORAGE_KEY = "arcana-daily-language";

const dateHeading = document.getElementById("dateHeading");
const langEnglish = document.getElementById("langEnglish");
const langVietnamese = document.getElementById("langVietnamese");
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
const dailyRevealEyebrow = document.getElementById("dailyRevealEyebrow");
const revealKicker = document.getElementById("revealKicker");
const readingEyebrow = document.getElementById("readingEyebrow");
const coreKeywordEyebrow = document.getElementById("coreKeywordEyebrow");
const artworkEyebrow = document.getElementById("artworkEyebrow");
const detailedReadingEyebrow = document.getElementById("detailedReadingEyebrow");
const historyEyebrow = document.getElementById("historyEyebrow");
const historyHeading = document.getElementById("historyHeading");
const historyEmptyState = document.getElementById("historyEmptyState");
const archiveEyebrow = document.getElementById("archiveEyebrow");
const historyDialogHeading = document.getElementById("historyDialogHeading");
const historyDialogEmptyState = document.getElementById("historyDialogEmptyState");
const previewEyebrow = document.getElementById("previewEyebrow");
const exportHeading = document.getElementById("exportHeading");

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
  mind: {
    should: "slow the pace of your thoughts, make space to breathe, and choose the story that supports your peace rather than your fear",
    shouldNot: "feed spirals, rehearse worst-case scenarios, or mistake mental noise for truth"
  }
};

let activeTheme = "general";
let currentReading = null;
let currentLanguage = loadLanguage();
const revealTextJobs = new WeakMap();
let exportBlobUrl = "";
let exportFileName = "arcana-daily-reading.png";
const UI_COPY = window.APP_LOCALIZATION || { en: {}, vi: {} };

function t(key) {
  return UI_COPY[currentLanguage][key] || UI_COPY.en[key] || key;
}

function themeLabel(themeName) {
  return t(`theme${themeName.charAt(0).toUpperCase()}${themeName.slice(1)}`);
}

function themeIntroLabel(themeName) {
  return t(`theme${themeName.charAt(0).toUpperCase()}${themeName.slice(1)}Intro`);
}

function cardLocaleEntry(card) {
  return (
    window.TAROT_IMPORTED_CARD_CONTENT?.[currentLanguage]?.cards?.[card.key] ||
    window.TAROT_CARD_LOCALIZATION?.[currentLanguage]?.cards?.[card.key] ||
    null
  );
}

function localizedCardValue(card, key) {
  const localeEntry = cardLocaleEntry(card);
  return localeEntry && localeEntry[key] !== undefined ? localeEntry[key] : card[key];
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
  const localized = cardLocaleEntry(card)?.summary?.[orientation];
  return localized || card.summary[orientation];
}

function localizedThemeCopy(card, orientation, themeName) {
  const localized = cardLocaleEntry(card)?.themes?.[themeName]?.[orientation];
  return localized || card.themes[themeName][orientation];
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

  return navigator.language && navigator.language.toLowerCase().startsWith("vi") ? "vi" : "en";
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
  return localizedThemeCopy(card, orientation, themeName);
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

function sentenceCase(text) {
  if (!text) {
    return "";
  }

  return text.charAt(0).toLowerCase() + text.slice(1);
}

function buildSummaryNarrative(card, orientation) {
  const summary = localizedSummary(card, orientation);
  const keyword = localizedPrimaryKeyword(card).toLowerCase();
  const cardTitle = localizedCardName(card);
  const keywordTrail = joinKeywords(localizedKeywords(card).slice(0, 3)).toLowerCase();

  if (currentLanguage === "vi") {
    const tone =
      orientation === "reversed"
      ? `Lá bài ${cardTitle} xuất hiện ở chiều ngược, nên năng lượng hôm nay mang màu sắc hướng nội hơn và đòi hỏi bạn phải đi chậm để nhìn rõ điều gì đang lệch khỏi quỹ đạo.`
      : `Lá bài ${cardTitle} xuất hiện ở chiều thuận, mang theo một dòng năng lượng khá rõ ràng, như thể ngày hôm nay đang mời bạn bước vào bài học này bằng sự chủ động và tỉnh táo.`;
    return `${tone} Chủ đề cốt lõi của bạn hôm nay xoay quanh ${keyword}. ${summary} Nếu lắng nghe kỹ hơn, bạn sẽ thấy lá bài còn nhắc đến ${keywordTrail} qua chính hình ảnh của nó. Điều cần làm không phải là vội kết luận, mà là ở lại với thông điệp này đủ lâu để nó thấm vào cách bạn lựa chọn, phản ứng, và giữ nhịp cho cả ngày.`;
  }

  const opening =
    orientation === "reversed"
      ? `Today's card, ${cardTitle}, arrives reversed, so I would read its message as more inward, more delicate, and a little more cautionary than usual.`
      : `Today's card, ${cardTitle}, arrives upright, and it carries a clear current you can work with consciously throughout the day.`;

  return `${opening} The central theme moving through your day is ${keyword}. ${summary} The imagery of the card also points toward ${keywordTrail}, which tells me this lesson is not only intellectual, but something you may feel through atmosphere, instinct, and timing. Let this be the message you return to whenever the day begins to scatter your attention.`;
}

function buildArtworkNarrative(card) {
  const artwork = localizedArtwork(card);
  const keywords = localizedKeywords(card);
  if (currentLanguage === "vi") {
    return `Hình ảnh trên lá bài cho thấy ${artwork.charAt(0).toLowerCase()}${artwork.slice(1)} Biểu tượng này nhắc bạn chú ý đến ${joinKeywords(keywords.slice(0, 3)).toLowerCase()}, vì đó là manh mối quan trọng của ngày hôm nay.`;
  }

  return `The artwork shows ${artwork.charAt(0).toLowerCase()}${artwork.slice(1)} In tarot, that imagery points toward ${joinKeywords(keywords.slice(0, 3)).toLowerCase()}, so even before you read the finer details, the card is already asking you to notice that pattern in your own day.`;
}

function buildThemeNarrative(card, orientation, themeName) {
  const theme = THEME_META[themeName];
  const guidance = NARRATIVE_GUIDANCE[themeName];
  const themeCopy = readingCopy(card, orientation, themeName);
  const keyword = localizedPrimaryKeyword(card).toLowerCase();
  const cardTitle = localizedCardName(card);
  if (currentLanguage === "vi") {
    const closingMap = {
      general: "Hãy để thông điệp này làm nhịp nền cho cả ngày, thay vì chỉ xem nó như một ý niệm thoáng qua.",
      work: "Bạn không cần xử lý mọi thứ cùng lúc, nhưng bạn cần giữ sự tỉnh táo đủ lâu để chọn đúng bước tiếp theo.",
      relationship: "Điều quan trọng ở đây không phải phản ứng nhanh, mà là phản ứng đúng với sự thật đang hiện ra.",
      money: "Nếu giữ được sự bình tĩnh, bạn sẽ thấy lựa chọn đúng thường đến từ sự rõ ràng chứ không đến từ áp lực.",
      mind: "Hãy xem đây như lời mời trở về với nhịp thở, sự quan sát, và điều bạn thực sự biết là đúng."
    };
    return `${themeCopy} ${closingMap[themeName]}`;
  }

  const summary = localizedSummary(card, orientation);
  const orientationNote =
    orientation === "reversed"
      ? `Because the card is reversed, I would read this as an energy that needs extra awareness and gentleness.`
      : `Because the card is upright, I would read this as an energy you can actively lean into today.`;

  return `In the ${theme.label.toLowerCase()} area, ${cardTitle} places ${keyword} right at the center of the conversation. ${themeCopy} ${orientationNote} To me, this suggests that ${sentenceCase(summary)} You should ${guidance.should}. You should not ${guidance.shouldNot}. If you stay close to this message, the theme becomes much easier to navigate with grace instead of reaction.`;
}

function buildThemeSummary(card, orientation, themeName) {
  const baseCopy = readingCopy(card, orientation, themeName);
  if (currentLanguage === "vi") {
    return baseCopy;
  }

  const keyword = localizedPrimaryKeyword(card).toLowerCase();
  const cardName = localizedCardName(card);
  const intros = {
    general: `This card brings ${keyword} into focus today.`,
    work: `In work, ${cardName} highlights ${keyword}.`,
    relationship: `In relationships, ${cardName} points to ${keyword}.`,
    money: `For money matters, ${cardName} favors ${keyword}.`,
    mind: `Mentally, ${cardName} asks for ${keyword}.`
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
  const orientationLabel = orientation === "reversed" ? t("orientationReversed") : t("orientationUpright");
  const cardName = localizedCardName(card);
  const primaryKeyword = localizedPrimaryKeyword(card);
  const keywords = localizedKeywords(card);
  const intro =
    currentLanguage === "vi"
      ? trimSentence(`${cardName} đưa ${primaryKeyword.toLowerCase()} vào trọng tâm thông qua ${keywords[0].toLowerCase()} và ${keywords[1].toLowerCase()}.`, 120)
      : trimSentence(
          `${cardName} brings ${primaryKeyword.toLowerCase()} into focus through ${keywords[0].toLowerCase()} and ${keywords[1].toLowerCase()}.`,
          110
        );
  const artwork = trimSentence(localizedArtwork(card), 160);

  return {
    orientationLabel,
    intro,
    keywordLabel: primaryKeyword,
    keywordSupport: trimSentence(`${t("supportKeywords")}: ${keywords.join(", ")}.`, 120),
    artwork: trimSentence(artwork, 150),
    general: trimSentence(buildThemeSummary(card, orientation, "general"), 145),
    work: trimSentence(buildThemeSummary(card, orientation, "work"), 145),
    relationship: trimSentence(buildThemeSummary(card, orientation, "relationship"), 145),
    money: trimSentence(buildThemeSummary(card, orientation, "money"), 145),
    mind: trimSentence(buildThemeSummary(card, orientation, "mind"), 170)
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
  activeThemeIcon.textContent = theme.icon;
  activeThemeTitle.textContent = themeLabel(themeName);
  themeIntro.textContent = themeIntroLabel(themeName);

  if (currentReading) {
    const card = lookupCard(currentReading.cardKey);
    if (card) {
      themeReading.textContent = buildThemeNarrative(card, currentReading.orientation, themeName);
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
  historyLink.setAttribute("aria-label", t("cardHistoryAria"));
  refreshLink.setAttribute("aria-label", t("refreshAria"));
  closeHistoryButton.setAttribute("aria-label", t("closeAria"));
  closeExportButton.setAttribute("aria-label", t("closeAria"));

  themeTabs.forEach((tab) => {
    tab.lastElementChild.textContent = themeLabel(tab.dataset.theme);
  });

  if (!loadState().history?.length) {
    historyEmptyState.textContent = t("historyEmpty");
    historyDialogEmptyState.textContent = t("historyEmpty");
  }

  dateHeading.textContent = formatToday();

  if (currentReading) {
    renderReading(currentReading);
  } else {
    setThemeTab(activeTheme);
  }
}

function setLanguage(language) {
  currentLanguage = language;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  renderLanguage();
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
  revealHeadline.textContent = localizedCardName(card);
  revealTags.innerHTML = localizedKeywords(card)
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

  cardArcana.textContent = localizedArcanaLabel(card);
  cardName.textContent = localizedCardName(card);
  cardOrientation.textContent = orientation === "reversed" ? t("orientationReversed") : t("orientationUpright");
  cardSummary.textContent = "";
  primaryKeyword.textContent = localizedPrimaryKeyword(card);
  keywordSupport.textContent = `${t("supportKeywords")}: ${localizedKeywords(card).join(", ")}`;
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
  const localizedName = localizedCardName(card);
  const localizedArcana = localizedArcanaLabel(card);
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
  context.fillText(localizedArcana.toUpperCase(), 46, 58);

  context.fillStyle = "rgba(39, 31, 58, 0.88)";
  drawRoundedRect(context, 1080, 26, 132, 60, 30);
  context.fill();
  context.fillStyle = "#e3c991";
  context.font = "600 24px Manrope";
  context.textAlign = "center";
  context.fillText(exportCopy.orientationLabel, 1146, 66);
  context.textAlign = "left";

  context.fillStyle = "#f8eedb";
  const titleSize = localizedName.length > 18 ? 68 : 76;
  context.font = `600 ${titleSize}px Cormorant Garamond`;
  wrapText(context, localizedName, 46, 136, 980, 72, `600 ${titleSize}px Cormorant Garamond`, "#f8eedb");

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

  drawInfoCard(46, 322, 570, 240, "✦", t("coreKeyword"), exportCopy.keywordLabel, exportCopy.keywordSupport);
  drawInfoCard(632, 322, 564, 240, "◌", t("artworkEyebrow"), "", exportCopy.artwork);
  drawInfoCard(46, 590, 570, 308, "☼", themeLabel("general"), themeLabel("general"), exportCopy.general, "500 25px Manrope");
  drawInfoCard(632, 590, 564, 308, "✷", themeLabel("work"), themeLabel("work"), exportCopy.work, "500 25px Manrope");
  drawInfoCard(46, 926, 570, 308, "♡", themeLabel("relationship"), themeLabel("relationship"), exportCopy.relationship, "500 25px Manrope");
  drawInfoCard(632, 926, 564, 308, "◈", themeLabel("money"), themeLabel("money"), exportCopy.money, "500 25px Manrope");
  drawInfoCard(46, 1262, 1150, 280, "☾", themeLabel("mind"), themeLabel("mind"), exportCopy.mind, "500 25px Manrope");

  context.fillStyle = "rgba(255, 255, 255, 0.06)";
  context.fillRect(46, 1578, 1150, 1);
  context.fillStyle = "#ffcf78";
  context.font = "700 28px Manrope";
  context.fillText("✦  Arcana Daily", 46, 1624);
  context.fillStyle = "rgba(235, 224, 202, 0.46)";
  context.font = "600 18px Manrope";
  context.textAlign = "right";
  context.fillText(currentLanguage === "vi" ? "arcana daily • lá bài được rút có chủ ý" : "arcana daily • drawn with intention", 1196, 1624);
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

themeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setThemeTab(tab.dataset.theme);
  });
});

langEnglish.addEventListener("click", () => setLanguage("en"));
langVietnamese.addEventListener("click", () => setLanguage("vi"));
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

renderLanguage();
syncUi();
