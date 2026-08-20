# Immersive User Guide

The public end-user guide for [Immersive](https://immersive-app.com), published at
https://immersive-app.github.io/user-docs/ via GitHub Pages (Jekyll + just-the-docs).

Six editions: English at the site root, with Català, Español, Français, Italiano,
and Português as locale collections (`_ca/`, `_es/`, `_fr/`, `_it/`, `_pt/`) served
under `/ca/`, `/es/`, `/fr/`, `/it/`, `/pt/`. Each edition mirrors the English page
structure; terminology follows the app's own locale strings.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

## Language switcher and detection (immersive#612)

Every page shows a language switcher (`_includes/nav_footer_custom.html`,
bottom of the sidebar) linking the six editions; the mapping is a locale-prefix
swap, which works because editions mirror the English structure and
`permalink: pretty` gives every edition the same URL shape. A click stores the
choice in `localStorage` (`guide-lang`). `_includes/head_custom.html` redirects
a first visit on the English edition to the browser's language when we ship
that edition - a stored choice always wins, and direct links to a locale
edition are never overridden.

## Locale-scoped sidebar (immersive#612)

Each page's sidebar lists only its own edition's documents; other languages are
reached through the switcher, not the nav. This is done by overriding three
just-the-docs includes (`_includes/components/site_nav.html`,
`_includes/components/sidebar.html`, `_includes/css/activation.scss.liquid`):
the sidebar and the current-page highlighting pass the page's collection to
`site_nav.html`, while breadcrumb/children lookups still see the full nav.
The overrides are copies from **just-the-docs 0.10.1** with marked edits - when
bumping the theme, re-diff them against the new version's files.

## Conventions

- Learner-facing language; every claim must match the shipped app.
- Internal links are relative `.md` links (resolved by jekyll-relative-links).
- In translations, `parent:` front matter must exactly match the translated
  parent `title:` or the sidebar nav breaks.

Managed from the main app repo's issues (immersive#504).
