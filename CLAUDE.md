# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The source for the atvari GmbH marketing site (atvari.eu), built with [Zola](https://www.getzola.org/) (static site generator, Rust/Tera templates) using a vendored, locally-customized copy of the `portio-zola` theme (`themes/portio-zola/`, plain tracked files — not a git submodule). This repo owns content and site-specific config/assets; nearly all templates and Sass come from the theme, but theme files can now be edited directly when a project-level `templates/` override isn't enough.

## Commands

Dev environment is a Nix flake (`flake.nix`) providing `zola` and `typescript-language-server`; `.envrc` loads it via direnv (`use flake`). `themes/portio-zola/mise.toml` also defines equivalent `mise` tasks:

```sh
zola serve --fast --force   # local preview with fast rebuilds (mise task: serve)
zola build --minify         # production build, outputs to public/ (mise task: build)
zola check --drafts         # validate links/content including drafts (mise task: check)
```

Run these from the repo root. There is no separate JS build step — `typescript-language-server` in the flake is only for editor tooling.

## Architecture

**Config layering:** `zola.toml` at the repo root is a project-specific copy of the theme's `config.toml` (per the theme's install instructions), not an override file Zola merges automatically — Zola only reads config from the project root. `[extra]` in `zola.toml` drives most site behavior: nav `menus`, footer `sitemaps`, `socials`, `[extra.address]`, `[extra.form]` (Formspree toggle/URL), `[extra.map]`. Translation strings live under `[languages.en.translations]` in the same file.

**Content vs. section data — two different mechanisms:**
- `content/{blog,portfolio,contact}/` are normal Zola content sections (Markdown with TOML front matter). Front matter's `template`/`page_template` keys point at theme templates (e.g. `content/blog/_index.en.md` uses `template = "blog/section.html"`).
- The homepage's other sections (home/hero, about, service, resume, skill, testimonial) are **not** Zola content — they're driven by TOML data files under `static/sections/<section>/<lang>.toml`, loaded at render time via Tera's `load_data()` in each `themes/portio-zola/templates/partials/sections/*.html` partial (e.g. `{% set path = "static/sections/home/" ~ lang ~ ".toml" %}`). To change hero/about/service/resume/skill/testimonial copy, edit the matching `static/sections/*/en.toml`, not a template. `templates/index.html` in the theme assembles the homepage by including these partials in order (home → about → service → resume → portfolio → skill → testimonial → blog); portfolio/blog sections instead pull from real Zola content.
- The project's own `templates/` directory is currently empty — everything renders through the theme's templates. Add a same-named file under the root `templates/` to override a specific theme template (standard Zola theme-override behavior).

**Multilingual:** `default_language = "en"`; content files use the `.en.md` suffix convention (`_index.en.md`, `hello-world.en.md`). Section data TOML files are similarly per-language (`en.toml`). The theme also ships French (`fr`) content/translations, but this project only has `en.toml`/`.en.md` files — French is not currently used here even though the theme supports it.

**Image processing:** `static/processed_images/` and `public/` are gitignored build outputs — don't hand-edit or commit into them. Source images live under `static/images/`.

## Repo-specific gotchas

- `[extra.form].active` and `[extra.map].active` are `false` by default in `zola.toml`; the contact form/map won't render until a Formspree URL / lat-long are set and these are flipped to `true`.
