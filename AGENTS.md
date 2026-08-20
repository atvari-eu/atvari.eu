# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, OpenCode, etc.) when working with code in this repository.

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

The flake also exposes package/app outputs for building and previewing a production build without entering the devShell:

```sh
nix build               # builds the site (zola build --minify) to ./result
nix run .                # serves ./result via static-web-server (pass flags after --, e.g. `nix run . -- --port 8080`)
```

## Architecture

**Config layering:** `zola.toml` at the repo root is a project-specific copy of the theme's `config.toml` (per the theme's install instructions), not an override file Zola merges automatically — Zola only reads config from the project root. `[extra]` in `zola.toml` drives most site behavior: nav `menus`, footer `sitemaps`, `socials`, `[extra.address]`, `[extra.form]` (Formspree toggle/URL), `[extra.map]`, `[extra.booking]` (Proton Calendar booking widget toggle/URL). Translation strings live under `[languages.en.translations]` in the same file.

**Content vs. section data — two different mechanisms:**
- `content/{blog,contact,team,nix,rust,impressum}/` are normal Zola content sections (Markdown with TOML front matter). Front matter's `template`/`page_template` keys point at theme templates for the standard ones (e.g. `content/blog/_index.en.md` uses `template = "blog/section.html"`) or at project-level overrides in `templates/` for the custom page types — see below. There is no `content/portfolio/` (removed) despite a leftover, unused `static/images/portfolio/` directory.
- The homepage's other sections (home/hero, about, service, testimonial) are **not** Zola content — they're driven by TOML data files under `static/sections/<section>/<lang>.toml`, loaded at render time via Tera's `load_data(..., required=false)` in each `themes/portio-zola/templates/partials/sections/*.html` partial (e.g. `{% set path = "static/sections/home/" ~ lang ~ ".toml" %}`). To change hero/about/service/testimonial copy, edit the matching `static/sections/*/en.toml`, not a template. `templates/index.html` in the theme assembles the homepage by including `home`, `about`, `service`, `resume`, `skill`, `testimonial` partials in that order — but **`resume` and `skill` currently render nothing**: their data files only exist under the theme's own `themes/portio-zola/static/sections/{resume,skill}/`, and `load_data()` resolves paths against the project root, not the theme's static tree, so with `required=false` those partials silently no-op. Add real `static/sections/resume/en.toml` / `skill/en.toml` files to bring them back. Portfolio and blog are not part of this homepage assembly at all; blog is a standalone content section reached via nav.
- The project's own `templates/` directory is **not** empty — it has three overrides that back custom content types, all `{% extends "base.html" %}`:
  - `templates/impressum.html` — used by `content/impressum/`; renders `section.content` (plain Markdown body) inside a card.
  - `templates/team.html` — used by `content/team/`; renders a `[[extra.members]]` array from front matter (`name`, `role`, `image`, `bio` (Markdown), `skills`, `[[extra.members.links]]` with `label`/`url`/`icon`).
  - `templates/expertise.html` — used by `content/nix/` and `content/rust/`; renders `[extra]` fields `intro`/`intro_business` (Markdown, with an audience toggle button when both are set — powered by `static/js/expertise-toggle.js`), `benefits`/`services` (icon/title/content grids), `track_record`, and a `cta` link to `/contact/`.
  - Add further same-named files under the root `templates/` to override other theme templates (standard Zola theme-override behavior).
- `static/js/lang-switch.js` and `static/js/expertise-toggle.js` are project-added scripts (not part of the vendored theme) — check there first, not in `themes/portio-zola/static/js/`, when touching language-switch or expertise-toggle behavior.

**Structured data (JSON-LD):** The site-wide `Organization`/`OnlineBusiness` schema.org block lives in `themes/portio-zola/templates/base.html`'s `{% block seo %}` and is emitted on every page (name, address, `founder`/`legalRepresentative`, `makesOffer`, etc., sourced from `[extra.address]`/`[extra.legal]` in `zola.toml`). Page-specific JSON-LD is layered on by child templates that override `{% block seo %}` with `{{ super() }}` first (to keep the global block), followed by an additional `<script type="application/ld+json">`: `templates/team.html` adds one `Person` per team member, `templates/expertise.html` (Nix/Rust) adds a `Service` with `hasOfferCatalog` built from that page's `extra.services`, and `themes/portio-zola/templates/blog/page.html` adds a `BlogPosting`. A shared `macros::breadcrumb_jsonld(items)` macro (`themes/portio-zola/templates/macros.html`) emits a `BreadcrumbList` and is called from every template that renders the HTML breadcrumb (team, expertise, impressum, contact, blog section, blog post). This Tera version has no object/map-literal syntax usable in macro call arguments (`{name: ..., url: ...}` fails to parse), so `items` is a list of `"Name|||https://absolute/url"` strings that the macro splits internally — follow that convention rather than reaching for map literals. Any `Person` reference to Felix Schröter (team page, blog post author, `founder`/`legalRepresentative` in the global schema) derives its `sameAs` by looking up `content/team/_index.md`'s matching member and filtering `member.links` to `url is starting_with("http")` (excludes the `mailto:` entry) — reuse that lookup rather than hardcoding profile URLs again.

**Multilingual:** `default_language = "en"`; per Zola convention, default-language content uses the bare filename with **no** suffix (`_index.md`), while other languages use a `.{lang}.md` suffix (`_index.de.md`). Do not create both a bare and a `.en.md`-suffixed file for the same page — that's duplicate content, not two variants (this happened before; see git history removing redundant `_index.en.md` files). Section data TOML files are per-language (`en.toml`, `de.toml`), one file per language, no bare variant. The theme also ships French (`fr`) content/translations, but this project only has `en`/`de` — French is not currently used here even though the theme supports it.

**Image processing:** `static/processed_images/` and `public/` are gitignored build outputs — don't hand-edit or commit into them. Source images live under `static/images/`.

**Deployment:** `.forgejo/workflows/publish.yaml` runs on every push to `main` — it installs Nix (`DeterminateSystems/nix-installer-action`), runs `nix build .` (the flake's `packages.default`, i.e. `zola build --minify`), and publishes the resulting `result/` to Codeberg Pages under the `atvari.eu` custom domain via `actions/git-pages`. The Zola version used in CI is therefore whatever `flake.lock` pins via `nixpkgs`, not `themes/portio-zola/mise.toml`'s separately-pinned `0.22.0` — keep that in mind if a build depends on a specific Zola version/feature.

## Repo-specific gotchas

- `[extra.form].active` and `[extra.map].active` are `false` by default in `zola.toml`; the contact form/map won't render until a Formspree URL / lat-long are set and these are flipped to `true`.
- `Page.translations`/`Section.translations` do **not** group an `.en.md`-suffixed default-language file with its `.de.md` counterpart as translations of each other (verified against the actual Tera context; blog posts, which use this suffix pattern, come back with only themselves in `.translations`) — this only affects content using the `.en.md` suffix pattern documented above, not `_index.md`/`_index.de.md` pairs, which group fine. `get_page`/`get_section` calls with an explicit `lang=` argument and the file's bare canonical path (e.g. `get_page(path="blog/hello-world.md", lang="de")`) resolve correctly regardless of suffix, so use that instead of `.translations` when you need a page's other-language counterpart. `templates/sitemap.xml` relies on this distinction — see the comment at its top.
