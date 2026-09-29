# Immersive User Guide

The public end-user guide for [Immersive](https://immersive-app.com), published at
https://immersive-app.github.io/user-docs/ via GitHub Pages (Jekyll +
[jekyll-vitepress-theme](https://jekyll-vitepress.dev), immersive#1211).

Six editions, one Jekyll collection each: English in `_en/` (served at the site
root), and Català, Español, Français, Italiano, Português in `_ca/`, `_es/`,
`_fr/`, `_it/`, `_pt/` (served under `/ca/`, `/es/`, `/fr/`, `/it/`, `/pt/`).
Each edition mirrors the English page structure; terminology follows the app's
own locale strings. The app links to each edition's home page
(`user_guide_url` in the immersive repo), so those URLs must not move.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Then open http://127.0.0.1:4000/user-docs/.

## How the site is put together

- **Home pages.** Each edition's `index.md` uses `layout: home`: a hero, one
  card per section, then the getting-started text.
- **Sidebar.** `_data/sidebar.yml` lists one group per edition. The theme
  nests pages by `parent:` (matched by title) and orders them by `nav_order`.
  `_includes/sidebar.html` renders only the page's own edition (immersive#612).
- **Search.** The theme's local search reads one index per edition:
  `search.json` for English and `search/<code>.json` for the others, built by
  `_includes/search_index.json`, so results never mix languages.
- **Language switcher.** `_includes/nav_social_links.html` puts it in the
  navbar, the "..." menu and the phone menu. A page maps to its counterpart by
  swapping the locale prefix, which works because every edition has the same
  pages. `assets/js/guide.js` keeps the links current as the theme swaps pages
  in place, and stores a click in `localStorage` (`guide-lang`).
  `_includes/jekyll_vitepress/head_end.html` redirects a first visit on the
  English edition to the browser's language when we ship that edition; a
  stored choice always wins, and direct links to a locale edition are never
  overridden.
- **Edition labels.** `_data/locales.yml` holds the chrome strings per
  edition (search, outline, menu); pager labels and `lang` are set per
  collection in `_config.yml` defaults.

### Theme overrides

These are copies of the theme's includes with marked edits. When bumping
`jekyll-vitepress-theme`, re-diff them against the new version's files:

- `_includes/sidebar.html` - one edition's group only
- `_includes/search.html` - per-edition index and placeholder
- `_includes/local_nav.html` - per-edition labels
- `_includes/nav_social_links.html` - replaced by the language switcher

## Content currency rule (immersive#612)

The guide documents the shipped app, so it goes stale silently. The rule:
**whenever a documented feature changes in the immersive repo, the same
change set includes (or is paired with) a user-docs PR**. Audits are the
backstop, not the mechanism. Treat any EN change without the five locale
edits as incomplete.

## Conventions

- Learner-facing language; every claim must match the shipped app.
- Headings are one to three words where possible.
- Internal links are relative `.md` links (resolved by jekyll-relative-links).
- A new page is added to all six editions at the same path, or the language
  switcher leads to a missing page.
- In translations, `parent:` front matter must exactly match the translated
  parent `title:` or the page drops to the top level of the sidebar (the
  build warns: "Missing sidebar parent").

Managed from the main app repo's issues (immersive#504).
