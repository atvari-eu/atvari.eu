# atvari.eu

Source for the [atvari GmbH](https://atvari.eu) website, built with [Zola](https://www.getzola.org/) using the [portio-zola](https://github.com/quentin-rodriguez/portio-zola) theme.

## Prerequisites

- [Nix](https://nixos.org/download) with flakes enabled, plus [direnv](https://direnv.net/) (recommended) — or just install [Zola](https://www.getzola.org/documentation/getting-started/installation/) `0.22.0` directly.
- Git (the theme is pulled in as a submodule).

## Getting started

```sh
git clone --recurse-submodules <repo-url>
cd atvari.eu
direnv allow   # or: nix develop
```

If you already cloned without `--recurse-submodules`:

```sh
git submodule update --init
```

## Development

```sh
zola serve --fast --force   # local preview at http://127.0.0.1:1111 with fast rebuilds
```

Other useful commands:

```sh
zola build --minify   # production build into public/
zola check --drafts   # validate content/links, including drafts
```

## Editing content

- Blog posts, portfolio case studies, and the contact page live under `content/` as Markdown files with TOML front matter.
- Copy for the homepage sections (hero, about, service, resume, skill, testimonial) lives in `static/sections/<section>/en.toml`, not in templates.
- Site-wide settings (nav menus, footer, social links, contact form, translations) are in `zola.toml`.

See `CLAUDE.md` for a deeper look at how the pieces fit together.

## Deployment

Run `zola build --minify` and deploy the resulting `public/` directory to any static host. See [Zola's deployment docs](https://www.getzola.org/documentation/deployment/) for platform-specific guides.

## License

[MIT](LICENSE)
