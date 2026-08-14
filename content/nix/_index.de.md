+++
title = "Nix- & NixOS-Expertise"
description = "Nix- und NixOS-Consulting: reproduzierbare Builds, deklarative Infrastruktur und verlässliche Entwicklungsumgebungen."
template = "expertise.html"

[extra]
benefits_heading = "Warum Nix & NixOS"
services_heading = "Unsere Leistungen"
cta = "Sprich mit uns über dein Nix-Projekt"
intro = """
[Nix](https://nixos.org/) ist drei Dinge zugleich: eine rein funktionale,
lazy ausgewertete **Sprache** zur Beschreibung von Paketen und
Konfigurationen; ein **Build-Tool**, das diese Beschreibungen zu
reproduzierbaren Derivationen auswertet und sie in isolierten Sandboxes
baut; und ein **Paketmanager**, der die Ergebnisse installiert,
aktualisiert und zurückrollt, ohne je anzutasten, was bereits auf dem
System liegt. [NixOS](https://nixos.org/) ist eine Linux-Distribution, die
auf allen dreien aufbaut und das gesamte System — Pakete, Dienste, Nutzer —
aus derselben deklarativen Sprache konfiguriert. Zusammen machen sie
Builds, Deployments und Entwicklungsumgebungen wirklich reproduzierbar: Was
auf einer Maschine funktioniert, funktioniert auf jeder Maschine — heute
und in Jahren noch.

Wir betreiben Nix und NixOS seit Jahren produktiv und auf unseren eigenen
Rechnern und helfen Teams dabei, sie ohne Trial-and-Error einzuführen.
"""

[[extra.benefits]]
icon = "reload"
title = "Reproduzierbar per Design"
content = "Jedes Paket wird aus einem Nix-Ausdruck gebaut, der seine Eingaben exakt festlegt; das Build-Tool wertet ihn aus und baut ihn in einer isolierten Sandbox — was auf einer Maschine funktioniert, funktioniert auf jeder und auch noch nächstes Jahr."

[[extra.benefits]]
icon = "checkmark-circle"
title = "Atomare Updates & Rollbacks"
content = "Der Nix-Paketmanager macht System- und Paketänderungen transaktional. Geht etwas schief, ist ein Rollback zur vorherigen Generation in Sekunden erledigt — keine kaputten Halb-Updates."

[[extra.benefits]]
icon = "layers"
title = "Deklarative Infrastruktur"
content = "Ein ganzes System — Pakete, Dienste, Nutzer, Secrets — als Ausdrücke der Nix-Sprache beschreiben, versioniert und überall identisch reproduziert."

[[extra.benefits]]
icon = "code-alt"
title = "Verlässliche Entwicklungsumgebungen"
content = "`nix develop` nutzt das Nix-Build-Tool, um genau die in einem einzigen Nix-Ausdruck deklarierte Toolchain für jeden Mitwirkenden bereitzustellen — kein „läuft bei mir“ mehr."

[[extra.benefits]]
icon = "package"
title = "Ein Tool für jede Sprache"
content = "Nixpkgs, die in der Nix-Sprache geschriebene Paketsammlung, bündelt weit über 100.000 Pakete über alle Ökosysteme hinweg — ein Build-Tool und Paketmanager für jeden Stack."

[[extra.benefits]]
icon = "shield"
title = "Keine Abhängigkeitskonflikte"
content = "Der Nix-Paketmanager hält mehrere Versionen derselben Bibliothek nebeneinander im Nix Store und räumt per Garbage Collection auf, was nicht mehr referenziert wird."

[[extra.services]]
icon = "package"
title = "Nixpkgs-Packaging"
content = "Wir packagen eure Software als Nix-Ausdruck für Nixpkgs oder richten ein privates Flake bzw. Overlay für internes Tooling ein."

[[extra.services]]
icon = "cogs"
title = "Reproduzierbare Builds & CI"
content = "CI-Pipelines, angetrieben vom Nix-Build-Tool, die bei jedem Lauf auf jeder Maschine identische Artefakte erzeugen."

[[extra.services]]
icon = "code-alt"
title = "Reproduzierbare Entwicklungsumgebungen"
content = "Flake-basierte, in der Nix-Sprache definierte Dev-Shells, damit das Onboarding neuer Mitwirkender Minuten statt Tage dauert."

[[extra.services]]
icon = "network"
title = "NixOS-Infrastruktur"
content = "Deklarative Server-Flotten, ausgerollt und synchron gehalten mit Tools wie nixos-rebuild, deploy-rs oder colmena — inklusive Secrets-Management."

[[extra.services]]
icon = "target"
title = "Migration & Schulung"
content = "Migration bestehender Infrastruktur oder CI zu Nix sowie praxisnahe Schulungen, damit euer Team produktiv wird."

[[extra.services]]
icon = "database"
title = "Laufende Wartung"
content = "Pakete, NixOS-Module und Flake-Inputs dauerhaft aktuell und sicher halten."

track_record = """
Nix und NixOS sind für uns mehr als eine Dienstleistung — wir betreiben
sie selbst. Unser Gründer ist seit 2019 Nixpkgs-Contributor, seit 2020
Maintainer und seit 2024 Committer und hilft damit, das größte
Open-Source-Paketarchiv zu pflegen. Seine Beiträge gibt es auf
[GitHub](https://github.com/felschr).
"""
+++
