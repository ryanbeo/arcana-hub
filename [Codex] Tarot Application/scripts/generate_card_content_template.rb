require "csv"
require "fileutils"

ROOT = File.expand_path("..", __dir__)
OUTPUT = File.join(ROOT, "Reference", "tarot-card-content-template.csv")

MAJOR_ARCANA = [
  ["the-fool", "The Fool", "Major Arcana · 0", nil, nil],
  ["the-magician", "The Magician", "Major Arcana · I", nil, nil],
  ["the-high-priestess", "The High Priestess", "Major Arcana · II", nil, nil],
  ["the-empress", "The Empress", "Major Arcana · III", nil, nil],
  ["the-emperor", "The Emperor", "Major Arcana · IV", nil, nil],
  ["the-hierophant", "The Hierophant", "Major Arcana · V", nil, nil],
  ["the-lovers", "The Lovers", "Major Arcana · VI", nil, nil],
  ["the-chariot", "The Chariot", "Major Arcana · VII", nil, nil],
  ["strength", "Strength", "Major Arcana · VIII", nil, nil],
  ["the-hermit", "The Hermit", "Major Arcana · IX", nil, nil],
  ["wheel-of-fortune", "Wheel of Fortune", "Major Arcana · X", nil, nil],
  ["justice", "Justice", "Major Arcana · XI", nil, nil],
  ["the-hanged-man", "The Hanged Man", "Major Arcana · XII", nil, nil],
  ["death", "Death", "Major Arcana · XIII", nil, nil],
  ["temperance", "Temperance", "Major Arcana · XIV", nil, nil],
  ["the-devil", "The Devil", "Major Arcana · XV", nil, nil],
  ["the-tower", "The Tower", "Major Arcana · XVI", nil, nil],
  ["the-star", "The Star", "Major Arcana · XVII", nil, nil],
  ["the-moon", "The Moon", "Major Arcana · XVIII", nil, nil],
  ["the-sun", "The Sun", "Major Arcana · XIX", nil, nil],
  ["judgement", "Judgement", "Major Arcana · XX", nil, nil],
  ["the-world", "The World", "Major Arcana · XXI", nil, nil]
].freeze

SUITS = {
  "Wands" => "Fire",
  "Cups" => "Water",
  "Swords" => "Air",
  "Pentacles" => "Earth"
}.freeze

RANKS = [
  ["Ace", "Ace"],
  ["Two", "II"],
  ["Three", "III"],
  ["Four", "IV"],
  ["Five", "V"],
  ["Six", "VI"],
  ["Seven", "VII"],
  ["Eight", "VIII"],
  ["Nine", "IX"],
  ["Ten", "X"],
  ["Page", "Page"],
  ["Knight", "Knight"],
  ["Queen", "Queen"],
  ["King", "King"]
].freeze

FILLABLE_COLUMNS = %w[
  content_name_en
  content_arcana_label_en
  content_primary_keyword_en
  content_keywords_en
  content_artwork_en
  content_summary_upright_en
  content_summary_reversed_en
  content_theme_general_upright_en
  content_theme_general_reversed_en
  content_theme_work_upright_en
  content_theme_work_reversed_en
  content_theme_relationship_upright_en
  content_theme_relationship_reversed_en
  content_theme_money_upright_en
  content_theme_money_reversed_en
  content_theme_mind_upright_en
  content_theme_mind_reversed_en
  content_name_vi
  content_arcana_label_vi
  content_primary_keyword_vi
  content_keywords_vi
  content_artwork_vi
  content_summary_upright_vi
  content_summary_reversed_vi
  content_theme_general_upright_vi
  content_theme_general_reversed_vi
  content_theme_work_upright_vi
  content_theme_work_reversed_vi
  content_theme_relationship_upright_vi
  content_theme_relationship_reversed_vi
  content_theme_money_upright_vi
  content_theme_money_reversed_vi
  content_theme_mind_upright_vi
  content_theme_mind_reversed_vi
].freeze

HEADERS = %w[
  card_key
  arcana_type
  arcana_number
  suit
  rank
  element
  default_name_en
  default_arcana_label_en
  notes_for_writer
] + FILLABLE_COLUMNS

def blank_content_row(row)
  FILLABLE_COLUMNS.each { |column| row[column] = "" }
  row
end

rows = []

MAJOR_ARCANA.each_with_index do |(key, name, arcana_label, suit, rank), index|
  row = {
    "card_key" => key,
    "arcana_type" => "major",
    "arcana_number" => index.to_s,
    "suit" => suit,
    "rank" => rank,
    "element" => "",
    "default_name_en" => name,
    "default_arcana_label_en" => arcana_label,
    "notes_for_writer" => "Major Arcana. Fill all content_* columns. Use | to separate keyword lists."
  }
  rows << blank_content_row(row)
end

SUITS.each do |suit, element|
  RANKS.each_with_index do |(rank, numeral), index|
    name = "#{rank} of #{suit}"
    key = "#{rank.downcase}-of-#{suit.downcase}"
    row = {
      "card_key" => key,
      "arcana_type" => "minor",
      "arcana_number" => numeral,
      "suit" => suit,
      "rank" => rank,
      "element" => element,
      "default_name_en" => name,
      "default_arcana_label_en" => "Minor Arcana · #{numeral}",
      "notes_for_writer" => "Minor Arcana. Fill all content_* columns. Use | to separate keyword lists."
    }
    rows << blank_content_row(row)
  end
end

FileUtils.mkdir_p(File.dirname(OUTPUT))

CSV.open(OUTPUT, "w", write_headers: true, headers: HEADERS, force_quotes: true) do |csv|
  rows.each do |row|
    csv << HEADERS.map { |header| row[header] || "" }
  end
end

puts "Wrote #{rows.length} rows to #{OUTPUT}"
