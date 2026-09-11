+++
title = "Rust-Consulting"
description = "Rust-Consulting: speichersichere, performante Systeme in einem idiomatischen, funktional geprägten Stil."
template = "expertise.html"

[extra]
logo = "images/service/rust.svg"
logo_dark = "images/service/rust-white.svg"
credential = "Rust Commercial Network"
benefits_heading = "Warum Rust"
services_heading = "Unsere Leistungen"
cta = "Sprich mit uns über dein Rust-Projekt"
intro = """
[Rust](https://www.rust-lang.org/) ist eine Systemprogrammiersprache, die
Speichersicherheit ohne Garbage Collector bietet. Ownership und der Borrow
Checker erkennen Use-after-free-Fehler, Data Races und Null-Referenzen
bereits zur Compile-Zeit, während das Typsystem (Enums, Pattern Matching,
`Option` und `Result`) einen [unveränderlichen, funktional geprägten
Stil](https://rust-unofficial.github.io/patterns/functional/) fördert, der
auf Iteratoren, Kombinatoren und Closures statt auf veränderliche Schleifen
setzt.

Wir schreiben Rust für Backend-Services, asynchrone Systeme, CLIs und
Systemsoftware, mit Cargo, Fearless Concurrency und Zero-Cost-Abstraktionen
als Standardwerkzeug, und helfen Teams dabei, mit idiomatischem Rust
produktiv zu werden.
"""
intro_business = """
[Rust](https://www.rust-lang.org/) ist eine Programmiersprache für
schnelle, verlässliche Software ohne Abstürze und Speicherfehler: Der
Compiler erkennt ganze Fehlerklassen, bevor Code in Produktion geht.

Das bedeutet weniger Vorfälle, niedrigere Cloud-Kosten durch C-ähnliche
Effizienz und mehr Zeit für Features statt Brandbekämpfung.

Weil Entwickler:innen Rust lieben, hilft es euch zudem, starke Engineers
zu gewinnen und zu halten. Wir helfen euch zu bewerten, wo sich Rust am
schnellsten auszahlt, und entwerfen, bauen oder migrieren dann die
Systeme, die am meisten profitieren.
"""
track_record = """
Wir setzen Rust überall dort ein, wo Verlässlichkeit und Performance zählen,
und bevorzugen dabei seine funktionalen Idiome: Iteratoren statt
Schleifen, `Option`/`Result` statt Exceptions, Unveränderlichkeit per
Default, für Code, der sich leichter nachvollziehen und reviewen lässt.
Unsere öffentliche Arbeit gibt es auf
[GitHub](https://github.com/felschr).

Wir sind Mitglied im [Rust Commercial Network](https://rustfoundation.org/rust-commercial-network/), gelistet im [Mitgliederverzeichnis](https://rust-commercial-network.github.io/rcn/members.html).
Das Netzwerk wird von der Rust Foundation getragen und verbindet Unternehmen, die kommerziell auf Rust setzen, mit dem Rust-Projekt, um Einführung und Produktionseinsatz voranzubringen. [Zur Ankündigung](@/blog/rust-commercial-network.de.md).
"""

[[extra.benefits]]
icon = "shield"
title = "Speichersicherheit ohne Garbage Collector"
content = "Ownership und der Borrow Checker erkennen Use-after-free, Data Races und Nullpointer-Fehler bereits zur Compile-Zeit, nicht erst in Produktion."

[[extra.benefits]]
icon = "rocket"
title = "Performance auf C/C++-Niveau"
content = "Zero-Cost-Abstraktionen werden vollständig wegkompiliert, sodass lesbarer High-Level-Code so schnell läuft wie handgeschriebener Low-Level-Code."

[[extra.benefits]]
icon = "cogs"
title = "Fearless Concurrency"
content = "Das Typsystem erzwingt sicheres Teilen von Daten zwischen Threads bereits zur Compile-Zeit. Eine ganze Klasse von Concurrency-Bugs wird zum Compile-Fehler."

[[extra.benefits]]
icon = "code-alt"
title = "Ein Typsystem, das wie eine Spezifikation liest"
content = "Pattern Matching, algebraische Datentypen und Option/Result machen illegale Zustände unrepräsentierbar und Fehler unmöglich zu übersehen."

[[extra.benefits]]
icon = "checkmark-circle"
title = "Verlässlichkeit per Default"
content = "Kein Null, keine unbehandelten Exceptions, keine impliziten Konvertierungen. Ganze Klassen von Laufzeitabstürzen sind von vornherein ausgeschlossen."

[[extra.benefits]]
icon = "graph"
title = "Eine der beliebtesten Sprachen"
content = "Rust führt seit 2016 jedes Jahr die „most admired language“-Umfrage von Stack Overflow an, das zahlt sich direkt in Team-Geschwindigkeit und -Bindung aus."

[[extra.services]]
icon = "code-alt"
title = "Rust-Entwicklung"
content = "Design und Umsetzung verlässlicher, performanter Backend-Services, CLIs und Systemsoftware in Rust."

[[extra.services]]
icon = "cogs"
title = "Migration & Rewrites"
content = "Portierung performance- oder zuverlässigkeitskritischer Komponenten von Python, Node.js, C++ oder Go nach Rust."

[[extra.services]]
icon = "layers"
title = "Architektur & Code-Reviews"
content = "Review von Designs und Codebasen auf idiomatisches, funktional geprägtes Rust: Ownership-Grenzen, Fehlerbehandlung und API-Ergonomie."

[[extra.services]]
icon = "network"
title = "Asynchrone & nebenläufige Systeme"
content = "Aufbau asynchroner Services und nebenläufiger Pipelines, bei denen das Typsystem Data Races von vornherein ausschließt."

[[extra.services]]
icon = "target"
title = "Schulung & Mentoring"
content = "Praxisnahe Schulungen, die ein Team von null zu produktivem, idiomatischem Rust bringen."

[[extra.services]]
icon = "database"
title = "Laufende Wartung"
content = "Crates, Toolchain und CI dauerhaft aktuell halten und Abhängigkeiten frei von bekannten Sicherheitslücken."
+++
