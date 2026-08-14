+++
title = "Nix & NixOS Expertise"
description = "Nix and NixOS consulting: reproducible builds, declarative infrastructure, and reliable dev environments."
template = "expertise.html"

[extra]
benefits_heading = "Why Nix & NixOS"
services_heading = "What We Offer"
cta = "Talk to us about your Nix project"
intro = """
[Nix](https://nixos.org/) is a purely functional package manager, and
[NixOS](https://nixos.org/) is a Linux distribution built on top of it that
configures your entire system — packages, services, users — from a single,
version-controlled description. Together they make builds, deployments, and
development environments genuinely reproducible: what works on one machine
works on every machine, today and years from now.

We've been running Nix and NixOS in production and on our own machines for
years, and we help teams adopt it without the trial and error.
"""

[[extra.benefits]]
icon = "reload"
title = "Reproducible by design"
content = "Every build runs in an isolated sandbox with explicitly declared inputs, so if it works on one machine, it works on every machine — and still works next year."

[[extra.benefits]]
icon = "checkmark-circle"
title = "Atomic upgrades & rollbacks"
content = "System and package changes are transactional. If something goes wrong, roll back to the previous generation in seconds — no broken half-upgrades."

[[extra.benefits]]
icon = "layers"
title = "Declarative infrastructure"
content = "Describe an entire system — packages, services, users, secrets — as version-controlled code, and reproduce it identically anywhere."

[[extra.benefits]]
icon = "code-alt"
title = "Reliable dev environments"
content = "A single command hands every contributor the exact same toolchain, down to the last library version — no more \"works on my machine\"."

[[extra.benefits]]
icon = "package"
title = "One tool, every language"
content = "Nixpkgs packages well over 100,000 pieces of software across ecosystems, so polyglot stacks share a single, consistent build tool."

[[extra.benefits]]
icon = "shield"
title = "No dependency conflicts"
content = "Multiple versions of the same library coexist safely, with automatic garbage collection cleaning up whatever's no longer referenced."

[[extra.services]]
icon = "package"
title = "Nixpkgs packaging"
content = "Getting your software packaged for Nixpkgs, or set up as a private flake or overlay for internal tooling."

[[extra.services]]
icon = "cogs"
title = "Reproducible builds & CI"
content = "Nix-powered build pipelines that produce identical artifacts on every run, on every machine."

[[extra.services]]
icon = "code-alt"
title = "Reproducible dev environments"
content = "Flake-based dev shells so onboarding a new contributor takes minutes, not days."

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
