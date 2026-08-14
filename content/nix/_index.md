+++
title = "Nix & NixOS Expertise"
description = "Nix and NixOS consulting: reproducible builds, declarative infrastructure, and reliable dev environments."
template = "expertise.html"

[extra]
benefits_heading = "Why Nix & NixOS"
services_heading = "What We Offer"
cta = "Talk to us about your Nix project"
intro = """
[Nix](https://nixos.org/) is three things at once: a purely functional,
lazily evaluated **language** for describing packages and configurations;
a **build tool** that evaluates those descriptions into reproducible
derivations and builds them in isolated sandboxes; and a **package
manager** that installs, upgrades, and rolls back the results without ever
disturbing what's already on your system. [NixOS](https://nixos.org/) is a
Linux distribution built on all three, configuring your entire system —
packages, services, users — from that same declarative language. Together
they make builds, deployments, and development environments genuinely
reproducible: what works on one machine works on every machine, today and
years from now.

We've been running Nix and NixOS in production and on our own machines for
years, and we help teams adopt them without the trial and error.
"""

[[extra.benefits]]
icon = "reload"
title = "Reproducible by design"
content = "Every package is built from a Nix expression that pins its inputs exactly; the build tool evaluates and builds it in an isolated sandbox, so if it works on one machine, it works on every machine — and still works next year."

[[extra.benefits]]
icon = "checkmark-circle"
title = "Atomic upgrades & rollbacks"
content = "The Nix package manager makes system and package changes transactional. If something goes wrong, roll back to the previous generation in seconds — no broken half-upgrades."

[[extra.benefits]]
icon = "layers"
title = "Declarative infrastructure"
content = "Describe an entire system — packages, services, users, secrets — as Nix language expressions, version-controlled and reproduced identically anywhere."

[[extra.benefits]]
icon = "code-alt"
title = "Reliable dev environments"
content = "`nix develop` uses the Nix build tool to assemble the exact toolchain declared in a single Nix expression, for every contributor — no more \"works on my machine\"."

[[extra.benefits]]
icon = "package"
title = "One tool, every language"
content = "Nixpkgs, the package collection written in the Nix language, bundles well over 100,000 packages across ecosystems — one build tool and package manager for every stack."

[[extra.benefits]]
icon = "shield"
title = "No dependency conflicts"
content = "The Nix package manager keeps multiple versions of the same library side by side in the Nix store, garbage-collecting whatever's no longer referenced."

[[extra.services]]
icon = "package"
title = "Nixpkgs packaging"
content = "Getting your software packaged as a Nix expression for Nixpkgs, or set up as a private flake or overlay for internal tooling."

[[extra.services]]
icon = "cogs"
title = "Reproducible builds & CI"
content = "CI pipelines driven by the Nix build tool, producing identical artifacts on every run, on every machine."

[[extra.services]]
icon = "code-alt"
title = "Reproducible dev environments"
content = "Flake-based dev shells, defined in the Nix language, so onboarding a new contributor takes minutes, not days."

[[extra.services]]
icon = "network"
title = "NixOS infrastructure"
content = "Declarative server fleets deployed and kept in sync via tools like nixos-rebuild, deploy-rs, or colmena — including secrets management."

[[extra.services]]
icon = "target"
title = "Migration & training"
content = "Migrating existing infrastructure or CI to Nix, and hands-on training to get your team productive with it."

[[extra.services]]
icon = "database"
title = "Ongoing maintenance"
content = "Keeping packages, NixOS modules, and flake inputs up to date and secure over time."

track_record = """
Nix and NixOS are more than a service we sell — they're what we run
ourselves. Our founder has been a Nixpkgs contributor since 2019, a
maintainer since 2020, and a committer since 2024, helping maintain the
largest open source package repository. See his contributions on
[GitHub](https://github.com/felschr).
"""
+++
