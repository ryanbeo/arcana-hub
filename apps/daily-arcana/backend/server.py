#!/usr/bin/env python3
import hashlib
import hmac
import json
import os
import secrets
import sqlite3
from datetime import datetime, timedelta, timezone
from http import cookies
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
DB_PATH = ROOT / "app.db"
SESSION_COOKIE = "arcana_session"
SESSION_DAYS = 30


MAJOR_ARCANA = [
    {
        "key": "the-fool",
        "name": "The Fool",
        "arcanaLabel": "Major Arcana · 0",
        "keywords": ["Beginnings", "Trust", "Curiosity"],
        "summary": "A new path is opening, and it asks for more openness than certainty.",
        "meaning": "The Fool points to fresh energy, willingness to begin, and the courage to move before the whole map appears.",
        "focus": "Choose one small leap that honors possibility over hesitation.",
        "reflection": "Where would trust help you start instead of waiting for perfect clarity?",
        "affirmation": "I welcome new beginnings with a steady and open heart.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-magician",
        "name": "The Magician",
        "arcanaLabel": "Major Arcana · I",
        "keywords": ["Skill", "Action", "Alignment"],
        "summary": "Your influence grows when your attention, language, and effort point in the same direction.",
        "meaning": "The Magician reminds you that you already hold useful tools. Focus creates momentum.",
        "focus": "Gather your energy around one priority and work it deliberately.",
        "reflection": "What can you shape today with the resources already in your hands?",
        "affirmation": "I turn intention into action with clarity and skill.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-high-priestess",
        "name": "The High Priestess",
        "arcanaLabel": "Major Arcana · II",
        "keywords": ["Intuition", "Stillness", "Inner knowing"],
        "summary": "Quiet insight is more trustworthy today than noise or urgency.",
        "meaning": "The High Priestess favors patience, observation, and honoring what your inner voice already knows.",
        "focus": "Pause before reacting and notice what feels quietly true.",
        "reflection": "What truth have you sensed but not fully named yet?",
        "affirmation": "I trust the wisdom that arrives in stillness.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-empress",
        "name": "The Empress",
        "arcanaLabel": "Major Arcana · III",
        "keywords": ["Nurture", "Abundance", "Care"],
        "summary": "Growth comes from tending what matters with patience and warmth.",
        "meaning": "The Empress speaks to creativity, embodiment, and the kind of care that helps life flourish.",
        "focus": "Support your body, space, or creative work with generosity.",
        "reflection": "What becomes stronger when you treat it with tenderness?",
        "affirmation": "I create room for beauty, growth, and nourishment.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-emperor",
        "name": "The Emperor",
        "arcanaLabel": "Major Arcana · IV",
        "keywords": ["Structure", "Leadership", "Stability"],
        "summary": "Clear structure can protect what matters most today.",
        "meaning": "The Emperor invites steady leadership, strong boundaries, and practical decisions that create security.",
        "focus": "Set the plan, define the limit, or choose the framework that makes the day steadier.",
        "reflection": "Where would more structure help you feel calmer and more capable?",
        "affirmation": "I build supportive structure around what I value.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-hierophant",
        "name": "The Hierophant",
        "arcanaLabel": "Major Arcana · V",
        "keywords": ["Guidance", "Practice", "Tradition"],
        "summary": "Wisdom that has already been tested may serve you well now.",
        "meaning": "The Hierophant points toward teachers, rituals, and grounding practices that help you stay aligned.",
        "focus": "Return to a method, lesson, or ritual that reliably supports you.",
        "reflection": "Which teachings genuinely deepen your integrity?",
        "affirmation": "I learn from wisdom that keeps me grounded and clear.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-lovers",
        "name": "The Lovers",
        "arcanaLabel": "Major Arcana · VI",
        "keywords": ["Choice", "Alignment", "Connection"],
        "summary": "The clearest choice is the one that matches your values.",
        "meaning": "The Lovers asks for congruence between what you feel, what you say, and what you choose.",
        "focus": "Make the decision that feels most honest, even if it asks for courage.",
        "reflection": "What choice would best reflect the person you want to be?",
        "affirmation": "I choose in ways that honor truth and alignment.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-chariot",
        "name": "The Chariot",
        "arcanaLabel": "Major Arcana · VII",
        "keywords": ["Drive", "Focus", "Direction"],
        "summary": "Your strength increases when your effort is pointed in one clear direction.",
        "meaning": "The Chariot is disciplined forward movement and self-leadership in the middle of competing impulses.",
        "focus": "Choose the destination first, then let that direct your actions.",
        "reflection": "Where do you need determination more than indecision?",
        "affirmation": "I move forward with focus, purpose, and self-trust.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "strength",
        "name": "Strength",
        "arcanaLabel": "Major Arcana · VIII",
        "keywords": ["Courage", "Compassion", "Steadiness"],
        "summary": "Real strength looks gentle, regulated, and honest.",
        "meaning": "Strength reminds you that calm persistence and compassion can carry more than force.",
        "focus": "Approach yourself and others with softness that still tells the truth.",
        "reflection": "How can you meet this moment with courage without becoming hard?",
        "affirmation": "My gentleness and my courage support each other.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-hermit",
        "name": "The Hermit",
        "arcanaLabel": "Major Arcana · IX",
        "keywords": ["Solitude", "Insight", "Reflection"],
        "summary": "A little distance can help you hear yourself more clearly.",
        "meaning": "The Hermit favors contemplation, honest self-inquiry, and stepping back from noise to reconnect with truth.",
        "focus": "Protect a pocket of uninterrupted time for reflection.",
        "reflection": "What becomes easier to understand when you stop rushing?",
        "affirmation": "I make space for insight to find me.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "wheel-of-fortune",
        "name": "Wheel of Fortune",
        "arcanaLabel": "Major Arcana · X",
        "keywords": ["Change", "Cycles", "Timing"],
        "summary": "A cycle is turning, and flexibility will help you move with it.",
        "meaning": "The Wheel of Fortune highlights momentum, timing, and the larger patterns shaping your experience.",
        "focus": "Notice what is ending, what is beginning, and where adaptability helps.",
        "reflection": "What shift are you being asked to meet with trust?",
        "affirmation": "I meet change with perspective and steadiness.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "justice",
        "name": "Justice",
        "arcanaLabel": "Major Arcana · XI",
        "keywords": ["Truth", "Balance", "Accountability"],
        "summary": "Honesty creates the cleanest path forward.",
        "meaning": "Justice asks for integrity, fair evaluation, and taking responsibility for what belongs to you.",
        "focus": "Make the choice that is balanced and defensible, not merely convenient.",
        "reflection": "Where would deeper honesty create better results?",
        "affirmation": "I act with integrity and accept what my choices create.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-hanged-man",
        "name": "The Hanged Man",
        "arcanaLabel": "Major Arcana · XII",
        "keywords": ["Pause", "Surrender", "Perspective"],
        "summary": "Progress may come through a changed perspective rather than more force.",
        "meaning": "The Hanged Man invites a deliberate pause so a wiser understanding can emerge.",
        "focus": "Release the urge to control the next step and allow insight to arrive.",
        "reflection": "What changes when you stop treating waiting as wasted time?",
        "affirmation": "I allow stillness to reveal a wiser path.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "death",
        "name": "Death",
        "arcanaLabel": "Major Arcana · XIII",
        "keywords": ["Release", "Transformation", "Transition"],
        "summary": "A healthy ending may be making room for your next beginning.",
        "meaning": "Death points to completion, shedding, and the renewal that becomes possible when something has fully run its course.",
        "focus": "Release one habit, attachment, or expectation that no longer supports you.",
        "reflection": "What are you ready to let go of with respect instead of fear?",
        "affirmation": "I trust healthy endings to make room for renewal.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "temperance",
        "name": "Temperance",
        "arcanaLabel": "Major Arcana · XIV",
        "keywords": ["Balance", "Healing", "Integration"],
        "summary": "The middle path is more useful than extremes right now.",
        "meaning": "Temperance is about emotional regulation, thoughtful blending, and restoring flow through moderation.",
        "focus": "Look for the adjustment that creates more harmony instead of more intensity.",
        "reflection": "What in your life needs rebalancing rather than acceleration?",
        "affirmation": "I create peace through balance, patience, and presence.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-devil",
        "name": "The Devil",
        "arcanaLabel": "Major Arcana · XV",
        "keywords": ["Attachment", "Shadow", "Awareness"],
        "summary": "Honesty about your patterns is the beginning of freedom.",
        "meaning": "The Devil points to fear, looping habits, or dynamics that drain power until they are seen clearly.",
        "focus": "Notice where you feel bound and ask what belief or habit keeps that bond in place.",
        "reflection": "What would reclaiming your power look like today?",
        "affirmation": "Clarity helps me loosen the patterns that limit me.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-tower",
        "name": "The Tower",
        "arcanaLabel": "Major Arcana · XVI",
        "keywords": ["Disruption", "Truth", "Breakthrough"],
        "summary": "A disruption may be revealing what was never stable enough to hold you.",
        "meaning": "The Tower clears false structures so something more honest can be built.",
        "focus": "Meet the shake-up with truth instead of denial.",
        "reflection": "What truth is trying to break through the surface now?",
        "affirmation": "Truth clears the way for stronger foundations.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-star",
        "name": "The Star",
        "arcanaLabel": "Major Arcana · XVII",
        "keywords": ["Hope", "Healing", "Renewal"],
        "summary": "A quiet current of healing and encouragement is available to you.",
        "meaning": "The Star brings restoration, openness, and reconnection with what feels sincere and life-giving.",
        "focus": "Do one small thing that restores hope today.",
        "reflection": "What helps you remember that healing is already underway?",
        "affirmation": "Hope returns to me gently, and I let it stay.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-moon",
        "name": "The Moon",
        "arcanaLabel": "Major Arcana · XVIII",
        "keywords": ["Mystery", "Intuition", "Emotion"],
        "summary": "Not everything is clear yet, so move with sensitivity instead of pressure.",
        "meaning": "The Moon highlights ambiguity, symbolism, dreams, and emotional undercurrents that still need time.",
        "focus": "Trust your instincts while allowing some questions to remain open.",
        "reflection": "What might clarity require from you besides speed?",
        "affirmation": "I can move carefully through uncertainty and still trust myself.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-sun",
        "name": "The Sun",
        "arcanaLabel": "Major Arcana · XIX",
        "keywords": ["Joy", "Clarity", "Vitality"],
        "summary": "This is a day for visibility, warmth, and direct life force.",
        "meaning": "The Sun points to confidence, affirmation, and letting what is good be fully received.",
        "focus": "Share your enthusiasm and allow progress to feel real.",
        "reflection": "Where could you let yourself be more wholehearted today?",
        "affirmation": "I allow joy and clarity to move through me freely.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "judgement",
        "name": "Judgement",
        "arcanaLabel": "Major Arcana · XX",
        "keywords": ["Awakening", "Renewal", "Calling"],
        "summary": "A truer version of you is asking for a more conscious answer.",
        "meaning": "Judgement invites honest evaluation, release of old stories, and a clear response to what feels deeply true.",
        "focus": "Answer the inner call to change something meaningful.",
        "reflection": "What part of your life is asking for a more conscious response?",
        "affirmation": "I release old versions of myself and answer what feels true.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
    {
        "key": "the-world",
        "name": "The World",
        "arcanaLabel": "Major Arcana · XXI",
        "keywords": ["Completion", "Wholeness", "Integration"],
        "summary": "A cycle is reaching completion, and you are allowed to honor how far you have come.",
        "meaning": "The World marks integration, earned perspective, and recognition of a chapter becoming whole.",
        "focus": "Celebrate what has landed before rushing into the next thing.",
        "reflection": "What deserves to be honored before you begin again?",
        "affirmation": "I recognize my growth and carry it forward with gratitude.",
        "palette": ["#ffcf78", "#6b2a88"],
    },
]

SUIT_PROFILES = {
    "Wands": {
        "element": "Fire",
        "palette": ["#ff9a5a", "#7a1f1f"],
        "nouns": ["motivation", "creative spark", "bold momentum"],
        "focusVerb": "act",
    },
    "Cups": {
        "element": "Water",
        "palette": ["#7ce5ff", "#234168"],
        "nouns": ["feeling", "connection", "emotional truth"],
        "focusVerb": "feel",
    },
    "Swords": {
        "element": "Air",
        "palette": ["#cfdaf8", "#344b88"],
        "nouns": ["clarity", "decision", "mental pattern"],
        "focusVerb": "discern",
    },
    "Pentacles": {
        "element": "Earth",
        "palette": ["#a7f0b2", "#285232"],
        "nouns": ["stability", "work", "practical growth"],
        "focusVerb": "build",
    },
}

MINOR_RANKS = [
    {
        "rank": "Ace",
        "numeral": "Ace",
        "keywords": ["Seed", "Potential", "Opening"],
        "summary": "A fresh opening is available if you are willing to meet it.",
        "meaningTemplate": "The Ace of {suit} brings a clean beginning in the realm of {noun}.",
        "focusTemplate": "Choose one simple way to {verb} with intention today.",
        "reflectionTemplate": "What new opening wants your attention right now?",
        "affirmationTemplate": "I welcome new energy and use it well.",
    },
    {
        "rank": "Two",
        "numeral": "II",
        "keywords": ["Balance", "Choice", "Exchange"],
        "summary": "A decision or balancing point is shaping today’s energy.",
        "meaningTemplate": "The Two of {suit} highlights duality, rhythm, and how you are managing {noun}.",
        "focusTemplate": "Notice where thoughtful balance would serve you better than reaction.",
        "reflectionTemplate": "What deserves a more balanced response from you?",
        "affirmationTemplate": "I choose balance without losing momentum.",
    },
    {
        "rank": "Three",
        "numeral": "III",
        "keywords": ["Expansion", "Collaboration", "Movement"],
        "summary": "Energy grows when it is shared, expressed, or set into motion.",
        "meaningTemplate": "The Three of {suit} expands the story around {noun} through movement, support, or expression.",
        "focusTemplate": "Let your next step involve momentum, conversation, or visible progress.",
        "reflectionTemplate": "Where is growth asking for participation rather than waiting?",
        "affirmationTemplate": "I allow growth to move through action and connection.",
    },
    {
        "rank": "Four",
        "numeral": "IV",
        "keywords": ["Foundation", "Containment", "Stability"],
        "summary": "Steadier foundations will serve you more than more noise.",
        "meaningTemplate": "The Four of {suit} asks you to create steadiness around {noun}.",
        "focusTemplate": "Protect your energy by reinforcing what feels stable and supportive.",
        "reflectionTemplate": "What structure helps this part of your life feel safer?",
        "affirmationTemplate": "I strengthen the foundations that support me.",
    },
    {
        "rank": "Five",
        "numeral": "V",
        "keywords": ["Friction", "Challenge", "Change"],
        "summary": "Tension is revealing where growth is being demanded.",
        "meaningTemplate": "The Five of {suit} points to challenge, discomfort, or conflict around {noun}.",
        "focusTemplate": "Meet the friction directly and look for what it is trying to teach.",
        "reflectionTemplate": "What challenge is clarifying what matters most?",
        "affirmationTemplate": "I can grow through tension without losing myself.",
    },
    {
        "rank": "Six",
        "numeral": "VI",
        "keywords": ["Harmony", "Recovery", "Flow"],
        "summary": "A more balanced or supported rhythm is possible now.",
        "meaningTemplate": "The Six of {suit} softens the story and invites renewed flow around {noun}.",
        "focusTemplate": "Accept support, make repairs, or move toward greater harmony.",
        "reflectionTemplate": "Where is balance trying to return?",
        "affirmationTemplate": "I make room for support, repair, and steadier flow.",
    },
    {
        "rank": "Seven",
        "numeral": "VII",
        "keywords": ["Assessment", "Mystery", "Inner testing"],
        "summary": "Today asks for discernment and a closer look beneath the surface.",
        "meaningTemplate": "The Seven of {suit} suggests thoughtful assessment of {noun} before your next move.",
        "focusTemplate": "Pause long enough to notice what is real, what is imagined, and what still needs proof.",
        "reflectionTemplate": "What deserves deeper examination before you commit?",
        "affirmationTemplate": "I trust myself to look deeper before I decide.",
    },
    {
        "rank": "Eight",
        "numeral": "VIII",
        "keywords": ["Movement", "Mastery", "Momentum"],
        "summary": "Steady effort or swift motion is shaping the day.",
        "meaningTemplate": "The Eight of {suit} brings momentum and concentrated energy to {noun}.",
        "focusTemplate": "Use repetition, practice, or decisive movement to create progress.",
        "reflectionTemplate": "What improves when you stay in motion with discipline?",
        "affirmationTemplate": "I build progress through steady and focused effort.",
    },
    {
        "rank": "Nine",
        "numeral": "IX",
        "keywords": ["Near completion", "Insight", "Intensity"],
        "summary": "You are close enough to see the deeper lesson clearly now.",
        "meaningTemplate": "The Nine of {suit} intensifies the experience of {noun} and asks for maturity in how you meet it.",
        "focusTemplate": "Acknowledge what has built up and respond with honesty instead of avoidance.",
        "reflectionTemplate": "What lesson is becoming impossible to ignore?",
        "affirmationTemplate": "I meet this stage with honesty, resilience, and care.",
    },
    {
        "rank": "Ten",
        "numeral": "X",
        "keywords": ["Completion", "Fullness", "Release"],
        "summary": "A cycle is reaching fullness and asking to be understood.",
        "meaningTemplate": "The Ten of {suit} shows the complete weight or reward of {noun}.",
        "focusTemplate": "Notice what has reached completion and what needs release, celebration, or closure.",
        "reflectionTemplate": "What chapter is ready to end or be recognized as complete?",
        "affirmationTemplate": "I honor completion and carry its wisdom forward.",
    },
    {
        "rank": "Page",
        "numeral": "Page",
        "keywords": ["Learning", "Message", "Exploration"],
        "summary": "A beginner’s mindset can reveal an important message today.",
        "meaningTemplate": "The Page of {suit} brings curiosity, learning, and a new message around {noun}.",
        "focusTemplate": "Stay teachable and follow the thread that genuinely interests you.",
        "reflectionTemplate": "What are you being invited to explore with fresh eyes?",
        "affirmationTemplate": "I stay open to learning and welcome new messages.",
    },
    {
        "rank": "Knight",
        "numeral": "Knight",
        "keywords": ["Drive", "Pursuit", "Commitment"],
        "summary": "Energy gathers around action, pursuit, and follow-through.",
        "meaningTemplate": "The Knight of {suit} charges toward a goal connected to {noun}.",
        "focusTemplate": "Move with purpose, but let awareness guide your speed.",
        "reflectionTemplate": "Where would courageous follow-through help most?",
        "affirmationTemplate": "I move with conviction and stay aligned as I go.",
    },
    {
        "rank": "Queen",
        "numeral": "Queen",
        "keywords": ["Embodiment", "Wisdom", "Steadiness"],
        "summary": "Your power today comes through composed presence rather than noise.",
        "meaningTemplate": "The Queen of {suit} embodies mature wisdom in the realm of {noun}.",
        "focusTemplate": "Lead through steadiness, emotional intelligence, and self-respect.",
        "reflectionTemplate": "How can you embody the quality you most need today?",
        "affirmationTemplate": "I trust the grounded wisdom I already carry.",
    },
    {
        "rank": "King",
        "numeral": "King",
        "keywords": ["Authority", "Mastery", "Direction"],
        "summary": "Strong leadership energy is available when it is guided by integrity.",
        "meaningTemplate": "The King of {suit} represents mastery and responsible direction in the realm of {noun}.",
        "focusTemplate": "Make the clear decision, hold the boundary, and lead with maturity.",
        "reflectionTemplate": "Where are you being asked to lead yourself more fully?",
        "affirmationTemplate": "I lead with wisdom, integrity, and grounded confidence.",
    },
]


def build_deck():
    deck = []
    for card in MAJOR_ARCANA:
        deck.append(card)

    for suit, profile in SUIT_PROFILES.items():
        for index, rank_profile in enumerate(MINOR_RANKS):
            noun = profile["nouns"][index % len(profile["nouns"])]
            deck.append(
                {
                    "key": f"{rank_profile['rank'].lower()}-of-{suit.lower()}",
                    "name": f"{rank_profile['rank']} of {suit}",
                    "arcanaLabel": f"Minor Arcana · {rank_profile['numeral']}",
                    "suit": suit,
                    "element": profile["element"],
                    "keywords": rank_profile["keywords"] + [suit],
                    "summary": rank_profile["summary"],
                    "meaning": rank_profile["meaningTemplate"].replace("{suit}", suit).replace("{noun}", noun),
                    "focus": rank_profile["focusTemplate"]
                    .replace("{suit}", suit)
                    .replace("{noun}", noun)
                    .replace("{verb}", profile["focusVerb"]),
                    "reflection": rank_profile["reflectionTemplate"].replace("{noun}", noun),
                    "affirmation": rank_profile["affirmationTemplate"],
                    "palette": profile["palette"],
                }
            )
    return deck


DECK = build_deck()
DECK_BY_KEY = {card["key"]: card for card in DECK}


def connect_db():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    connection = connect_db()
    try:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS sessions (
                token TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                expires_at TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id)
            );

            CREATE TABLE IF NOT EXISTS readings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                draw_date TEXT NOT NULL,
                card_key TEXT NOT NULL,
                orientation TEXT NOT NULL,
                created_at TEXT NOT NULL,
                UNIQUE(user_id, draw_date),
                FOREIGN KEY (user_id) REFERENCES users (id)
            );
            """
        )
        connection.commit()
    finally:
        connection.close()


def utc_now():
    return datetime.now(timezone.utc)


def iso_timestamp(value):
    return value.astimezone(timezone.utc).isoformat()


def hash_password(password, salt=None):
    if salt is None:
        salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 120000)
    return f"{salt}${digest.hex()}"


def verify_password(password, stored):
    salt, digest = stored.split("$", 1)
    candidate = hash_password(password, salt).split("$", 1)[1]
    return hmac.compare_digest(candidate, digest)


def date_key_local():
    return datetime.now().strftime("%Y-%m-%d")


def hash_seed(value):
    return int(hashlib.sha256(value.encode("utf-8")).hexdigest(), 16)


def pick_daily_reading(user_id, draw_date):
    seed = hash_seed(f"{user_id}:{draw_date}")
    card = DECK[seed % len(DECK)]
    orientation = "reversed" if (seed // len(DECK)) % 2 else "upright"
    return card["key"], orientation


def row_to_dict(row):
    return {key: row[key] for key in row.keys()}


class TarotRequestHandler(BaseHTTPRequestHandler):
    server_version = "ArcanaDaily/1.0"

    def log_message(self, format, *args):
        return

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/session":
            self.handle_session()
            return
        if parsed.path == "/api/history":
            self.handle_history()
            return
        if parsed.path == "/api/deck":
            self.send_json(200, {"cards": DECK})
            return
        self.serve_static(parsed.path)

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/signup":
            self.handle_signup()
            return
        if parsed.path == "/api/login":
            self.handle_login()
            return
        if parsed.path == "/api/logout":
            self.handle_logout()
            return
        if parsed.path == "/api/draw":
            self.handle_draw()
            return
        self.send_json(404, {"error": "Not found"})

    def serve_static(self, path):
        if path == "/":
            file_path = ROOT / "index.html"
        else:
            safe_path = path.lstrip("/")
            file_path = ROOT / safe_path

        resolved = file_path.resolve()
        if resolved != ROOT / "index.html" and ROOT not in resolved.parents:
            self.send_json(404, {"error": "Not found"})
            return

        if not resolved.exists() or not resolved.is_file():
            self.send_json(404, {"error": "Not found"})
            return

        content_type = "text/plain; charset=utf-8"
        if file_path.suffix == ".html":
            content_type = "text/html; charset=utf-8"
        elif file_path.suffix == ".css":
            content_type = "text/css; charset=utf-8"
        elif file_path.suffix == ".js":
            content_type = "application/javascript; charset=utf-8"

        data = resolved.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def read_json(self):
        content_length = int(self.headers.get("Content-Length", "0") or "0")
        raw = self.rfile.read(content_length) if content_length else b"{}"
        try:
            return json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            return {}

    def send_json(self, status, payload, extra_headers=None):
        data = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        if extra_headers:
            for key, value in extra_headers.items():
                self.send_header(key, value)
        self.end_headers()
        self.wfile.write(data)

    def get_session_token(self):
        raw_cookie = self.headers.get("Cookie")
        if not raw_cookie:
            return None
        jar = cookies.SimpleCookie()
        jar.load(raw_cookie)
        morsel = jar.get(SESSION_COOKIE)
        return morsel.value if morsel else None

    def get_current_user(self):
        token = self.get_session_token()
        if not token:
            return None

        connection = connect_db()
        try:
            row = connection.execute(
                """
                SELECT users.id, users.name, users.email
                FROM sessions
                JOIN users ON users.id = sessions.user_id
                WHERE sessions.token = ? AND sessions.expires_at > ?
                """,
                (token, iso_timestamp(utc_now())),
            ).fetchone()
            return row_to_dict(row) if row else None
        finally:
            connection.close()

    def create_session(self, user_id):
        token = secrets.token_urlsafe(32)
        expires_at = iso_timestamp(utc_now() + timedelta(days=SESSION_DAYS))
        connection = connect_db()
        try:
            connection.execute(
                "INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)",
                (token, user_id, expires_at),
            )
            connection.commit()
        finally:
            connection.close()

        return f"{SESSION_COOKIE}={token}; HttpOnly; Path=/; SameSite=Lax; Max-Age={SESSION_DAYS * 24 * 60 * 60}"

    def clear_session(self):
        token = self.get_session_token()
        if token:
            connection = connect_db()
            try:
                connection.execute("DELETE FROM sessions WHERE token = ?", (token,))
                connection.commit()
            finally:
                connection.close()
        return f"{SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0"

    def get_today_reading(self, user_id):
        connection = connect_db()
        try:
            row = connection.execute(
                "SELECT id, draw_date, card_key, orientation, created_at FROM readings WHERE user_id = ? AND draw_date = ?",
                (user_id, date_key_local()),
            ).fetchone()
            return row_to_dict(row) if row else None
        finally:
            connection.close()

    def get_history(self, user_id, limit=12):
        connection = connect_db()
        try:
            rows = connection.execute(
                """
                SELECT id, draw_date, card_key, orientation, created_at
                FROM readings
                WHERE user_id = ?
                ORDER BY draw_date DESC
                LIMIT ?
                """,
                (user_id, limit),
            ).fetchall()
            return [row_to_dict(row) for row in rows]
        finally:
            connection.close()

    def handle_session(self):
        user = self.get_current_user()
        if not user:
            self.send_json(200, {"user": None, "today_reading": None, "history": []})
            return

        self.send_json(
            200,
            {
                "user": user,
                "today_reading": self.get_today_reading(user["id"]),
                "history": self.get_history(user["id"]),
            },
        )

    def handle_history(self):
        user = self.get_current_user()
        if not user:
            self.send_json(401, {"error": "Sign in required"})
            return
        self.send_json(200, {"history": self.get_history(user["id"])})

    def handle_signup(self):
        payload = self.read_json()
        email = (payload.get("email") or "").strip().lower()
        password = payload.get("password") or ""
        name = (payload.get("name") or "").strip()

        if not email or "@" not in email:
            self.send_json(400, {"error": "Enter a valid email address"})
            return
        if len(password) < 8:
            self.send_json(400, {"error": "Password must be at least 8 characters"})
            return

        connection = connect_db()
        try:
            connection.execute(
                "INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, ?)",
                (name, email, hash_password(password), iso_timestamp(utc_now())),
            )
            connection.commit()
            user_id = connection.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone()["id"]
        except sqlite3.IntegrityError:
            self.send_json(409, {"error": "An account with that email already exists"})
            return
        finally:
            connection.close()

        session_cookie = self.create_session(user_id)
        self.send_json(
            200,
            {
                "user": {"id": user_id, "name": name, "email": email},
                "today_reading": None,
                "history": [],
            },
            {"Set-Cookie": session_cookie},
        )

    def handle_login(self):
        payload = self.read_json()
        email = (payload.get("email") or "").strip().lower()
        password = payload.get("password") or ""

        connection = connect_db()
        try:
            row = connection.execute(
                "SELECT id, name, email, password_hash FROM users WHERE email = ?",
                (email,),
            ).fetchone()
        finally:
            connection.close()

        if not row or not verify_password(password, row["password_hash"]):
            self.send_json(401, {"error": "Invalid email or password"})
            return

        session_cookie = self.create_session(row["id"])
        self.send_json(
            200,
            {
                "user": {"id": row["id"], "name": row["name"], "email": row["email"]},
                "today_reading": self.get_today_reading(row["id"]),
                "history": self.get_history(row["id"]),
            },
            {"Set-Cookie": session_cookie},
        )

    def handle_logout(self):
        self.send_json(200, {"ok": True}, {"Set-Cookie": self.clear_session()})

    def handle_draw(self):
        user = self.get_current_user()
        if not user:
            self.send_json(401, {"error": "Sign in required"})
            return

        existing = self.get_today_reading(user["id"])
        if existing:
            self.send_json(200, {"reading": existing, "history": self.get_history(user["id"])})
            return

        draw_date = date_key_local()
        card_key, orientation = pick_daily_reading(user["id"], draw_date)
        created_at = iso_timestamp(utc_now())

        connection = connect_db()
        try:
            try:
                connection.execute(
                    """
                    INSERT INTO readings (user_id, draw_date, card_key, orientation, created_at)
                    VALUES (?, ?, ?, ?, ?)
                    """,
                    (user["id"], draw_date, card_key, orientation, created_at),
                )
                connection.commit()
            except sqlite3.IntegrityError:
                pass
            row = connection.execute(
                "SELECT id, draw_date, card_key, orientation, created_at FROM readings WHERE user_id = ? AND draw_date = ?",
                (user["id"], draw_date),
            ).fetchone()
        finally:
            connection.close()

        self.send_json(
            200,
            {"reading": row_to_dict(row), "history": self.get_history(user["id"])},
        )


def main():
    init_db()
    port = int(os.environ.get("PORT", "8000"))
    server = ThreadingHTTPServer(("127.0.0.1", port), TarotRequestHandler)
    print(f"Arcana Daily running at http://127.0.0.1:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
