# The French edition follows France's typography, as the app's French does
# (immersive-app/immersive#1856): a narrow no-break space (U+202F) before
# ; ! ? and a no-break space (U+00A0) before : and inside « », never a plain
# space and never none; and "e-mail", never "email". The app's linter is
# test/linters/french_typography_test.rb; this is its twin for the docs.
#
# Prose only: front matter values, and body lines outside fenced blocks, with
# inline code, Liquid, HTML tags, link targets and URLs left out. Markdown
# emphasis (* and _) counts as part of the word.
#
# Run: ruby script/french_typography.rb (CI runs it). Exits 1 on a problem.
PROTECTED = /`[^`]*`|\{%.*?%\}|\{\{.*?\}\}|<[^>]*>|\]\([^)]*\)|https?:\/\/\S+|mailto:\S+|&#?\w+;/

CHECKS = {
  "a plain space before ; : ! ? or inside « »" => / [;:!?»]|« /,
  "no space before ; ! ?" => /[^\s  \u0000][;!?](?=[\s"'»)*_\u0000]|\z)/,
  "no space before :" => /[[:alpha:])»*_]:(?=\s|\z)/,
  "a wide no-break space before ; ! ?" => / [;!?]/,
  "no space inside « »" => /«[^ ]|[^ ]»/,
  "email, not e-mail" => /(?<![-\w])[Ee]mails?\b/
}.freeze

problems = []
Dir.glob(File.join(__dir__, "..", "_fr", "**", "*.md")).sort.each do |file|
  lines = File.readlines(file)
  in_front = lines.first&.strip == "---"
  fenced = false
  lines.each_with_index do |line, i|
    text = nil
    if in_front
      in_front = false if i.positive? && line.strip == "---"
      text = line[/\A\s*[\w-]+:\s(.*)\z/m, 1] if in_front
    elsif line.start_with?("```")
      fenced = !fenced
    elsif !fenced && !line.match?(/\A\s*\[[^\]]+\]:\s/)
      text = line
    end
    next unless text
    text = text.chomp.gsub(PROTECTED, "\u0000")
    CHECKS.each do |name, re|
      problems << "#{File.expand_path(file).sub(File.expand_path("..", __dir__) + "/", "")}:#{i + 1}: #{name}" if text.match?(re)
    end
  end
end

if problems.empty?
  puts "French typography: OK"
else
  puts problems
  puts "French typography: #{problems.size} problem(s) (immersive-app/immersive#1856)"
  exit 1
end
