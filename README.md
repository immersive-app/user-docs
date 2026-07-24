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

## Conventions

- Learner-facing language; every claim must match the shipped app.
- Internal links are relative `.md` links (resolved by jekyll-relative-links).
- In translations, `parent:` front matter must exactly match the translated
  parent `title:` or the sidebar nav breaks.

Managed from the main app repo's issues (immersive#504).
