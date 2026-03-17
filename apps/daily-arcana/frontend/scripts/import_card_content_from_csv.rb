require "csv"
require "json"
require "fileutils"

ROOT = File.expand_path("..", __dir__)
INPUT = ARGV[0] ? File.expand_path(ARGV[0], ROOT) : File.join(ROOT, "Reference", "tarot-card-content-template.csv")
OUTPUT = File.join(ROOT, "generated-card-content.js")

LANGUAGES = %w[en vi].freeze
THEMES = %w[general work relationship money mind].freeze
ORIENTATIONS = %w[upright reversed].freeze

def blank?(value)
  value.nil? || value.strip.empty?
end

def parse_keywords(value)
  return nil if blank?(value)

  value.split("|").map(&:strip).reject(&:empty?)
end

def build_card_payload(row, language)
  payload = {}

  {
    "name" => "content_name_#{language}",
    "arcanaLabel" => "content_arcana_label_#{language}",
    "primaryKeyword" => "content_primary_keyword_#{language}",
    "artwork" => "content_artwork_#{language}"
  }.each do |target_key, source_key|
    value = row[source_key]
    payload[target_key] = value unless blank?(value)
  end

  keywords = parse_keywords(row["content_keywords_#{language}"])
  payload["keywords"] = keywords if keywords

  summary = {}
  ORIENTATIONS.each do |orientation|
    value = row["content_summary_#{orientation}_#{language}"]
    summary[orientation] = value unless blank?(value)
  end
  payload["summary"] = summary unless summary.empty?

  themes = {}
  THEMES.each do |theme|
    theme_payload = {}
    ORIENTATIONS.each do |orientation|
      value = row["content_theme_#{theme}_#{orientation}_#{language}"]
      theme_payload[orientation] = value unless blank?(value)
    end
    themes[theme] = theme_payload unless theme_payload.empty?
  end
  payload["themes"] = themes unless themes.empty?

  payload
end

unless File.exist?(INPUT)
  abort("CSV not found: #{INPUT}")
end

result = {
  "en" => { "cards" => {} },
  "vi" => { "cards" => {} }
}

CSV.foreach(INPUT, headers: true) do |row|
  card_key = row["card_key"]
  next if blank?(card_key)

  LANGUAGES.each do |language|
    payload = build_card_payload(row, language)
    next if payload.empty?

    result[language]["cards"][card_key] = payload
  end
end

js = <<~JS
  (function () {
    window.TAROT_IMPORTED_CARD_CONTENT = #{JSON.pretty_generate(result)};
  })();
JS

FileUtils.mkdir_p(File.dirname(OUTPUT))
File.write(OUTPUT, js)

puts "Imported CSV content from #{INPUT}"
puts "Wrote app-ready content file to #{OUTPUT}"
