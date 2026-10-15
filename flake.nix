{
  description = "The atvari website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = inputs: {
    devShells = builtins.mapAttrs (system: pkgs: {

      default = pkgs.mkShell {
        # dart-sass and esbuild are here for reproducing the compiled
        # Bootstrap subset by hand (see the buildPhase comment below).
        packages = with pkgs; [
          zola
          typescript-language-server
          dart-sass
          esbuild
        ];
      };

    }) inputs.nixpkgs.legacyPackages;

    packages = builtins.mapAttrs (system: pkgs: let
      # Upstream sources for the compiled Bootstrap subset (see the
      # buildPhase of `default`): the npm package provides scss plus the
      # per-component js modules, and Popper backs Dropdown positioning.
      bootstrapSrc = pkgs.fetchurl {
        url = "https://registry.npmjs.org/bootstrap/-/bootstrap-5.3.8.tgz";
        hash = "sha256-iwLUp0guDworHaWPHJyGgw6WzC938JT4nkaBsZiGvDg=";
      };
      popperSrc = pkgs.fetchurl {
        url = "https://registry.npmjs.org/@popperjs/core/-/core-2.11.8.tgz";
        hash = "sha256-jgm9+pEgNWaOYs6mEyG84ny9ARuFZyBV2yXScb1jr0k=";
      };
    in {

      default = pkgs.stdenv.mkDerivation {
        pname = "atvari-eu";
        version = "0.1.0";

        src = ./.;

        nativeBuildInputs = [ pkgs.zola pkgs.jq pkgs.dart-sass pkgs.esbuild ];

        # --skip-external-links so the check runs in the sandbox
        doCheck = true;
        checkPhase = ''
          runHook preCheck
          zola check --drafts --skip-external-links
          runHook postCheck
        '';

        buildPhase = ''
          runHook preBuild

          # ---- compiled Bootstrap subset --------------------------------------
          # The theme ships full Bootstrap css/js (232 KB + 80 KB), but the
          # site's markup only needs grid, reboot/root, a handful of
          # components (breadcrumb, card, buttons, nav/navbar, dropdown,
          # carousel, form-control, helpers) and a slice of the utility
          # families. Instead of vendoring upstream's dist files, compile a
          # curated subset here (same class names => fully compatible) and
          # overwrite the vendored copies before `zola build` sees them:
          # template references and ?h= cache-busting keep working, and the
          # service worker's generated precache picks up the smaller files
          # automatically.
          #
          # The utility-family list in the scss mirrors the classes actually
          # used (audit: distinct class tokens across the built HTML vs
          # upstream's `$utilities` map keys in scss/_utilities.scss). If
          # content starts using p-*/bg-*/negative-margin classes again,
          # extend that list — re-run the class audit first, then add the
          # missing family names to the map-get-multiple filter.

          mkdir -p $TMPDIR/bs $TMPDIR/popper
          tar -xzf ${bootstrapSrc} -C $TMPDIR/bs --strip-components=1
          tar -xzf ${popperSrc} -C $TMPDIR/popper --strip-components=1

          cat > bootstrap-subset.scss <<'EOF'
@import "mixins/banner";
@include bsBanner("atvari subset");

$include-column-box-sizing: true !default;

// Configuration
@import "functions";
@import "variables";
@import "variables-dark";
@import "maps";
@import "mixins";

// Layout & components
@import "root";
@import "reboot";
@import "images";
@import "containers";
@import "grid";
@import "transitions";
@import "buttons";
@import "breadcrumb";
@import "card";
@import "nav";
@import "navbar";
@import "dropdown";
@import "carousel";
@import "forms/form-control";

// Helpers & utilities
@import "helpers";
@import "utilities";

// Utility families actually used by the site's markup (audit-driven);
// everything else (padding, bg-*, negative margins, ...) stays out.
$utilities: map-get-multiple(
    $utilities,
    (
        "display",
        "flex",
        "flex-direction",
        "flex-grow",
        "flex-shrink",
        "flex-wrap",
        "fill",
        "justify-content",
        "align-content",
        "align-items",
        "align-self",
        "margin",
        "margin-x",
        "margin-y",
        "margin-top",
        "margin-bottom",
        "row-gap",
        "height",
        "text-align",
        "text-transform",
        "text-decoration",
        "color",
    )
);

@import "utilities/api";
EOF

          sass --no-source-map --style=compressed --silence-deprecation=import \
            --load-path=$TMPDIR/bs/scss \
            bootstrap-subset.scss \
            themes/portio-zola/static/css/bootstrap.min.css
          # the project's static/css copy shadows the theme's one for Zola
          cp themes/portio-zola/static/css/bootstrap.min.css \
            static/css/bootstrap.min.css

          cat > bootstrap-bundle-entry.js <<'EOF'
//! atvari bootstrap subset: only the interactive components the markup uses.
import Dropdown from 'bootstrap/js/dist/dropdown';
import Carousel from 'bootstrap/js/dist/carousel';

export { Dropdown, Carousel };
EOF

          esbuild bootstrap-bundle-entry.js \
            --bundle --minify --format=iife --global-name=bootstrap \
            --alias:bootstrap=$TMPDIR/bs \
            --alias:@popperjs/core=$TMPDIR/popper/dist/esm/popper.js \
            --target=es2019 \
            '--banner:js=/*! Bootstrap subset v5.3.8 (dropdown, carousel; includes Popper) | MIT | (c) Bootstrap & Popper authors */' \
            --outfile=themes/portio-zola/static/js/bootstrap.bundle.min.js
          cp themes/portio-zola/static/js/bootstrap.bundle.min.js \
            static/js/bootstrap.bundle.min.js

          # ---------------------------------------------------------------------

          zola build --minify
          runHook postBuild
        '';

        # Generate the service worker's priming manifest from the actual
        # build output, and stamp the worker's VERSION with the manifest
        # hash — a changed app shell re-installs and purges its old cache,
        # without any manual version bumps anywhere.
        postBuild = ''
          (
            cd public
            {
              find css js -maxdepth 1 -type f \( -name '*.css' -o -name '*.js' \)
              find fonts -maxdepth 2 -type f -name '*.woff2'
              find images -maxdepth 1 -type f \( -name '*.png' -o -name '*.svg' \)
              printf 'main.css\nfavicon.ico\napple-touch-icon.png\n'
            } | sort -u | sed 's|^|/|' \
              | jq -Rs 'split("\n") | map(select(length > 0)) | (["/", "/de/", "/offline.html"] + .) | unique'
          ) > public/sw-core.json
          coreHash=$(sha256sum public/sw-core.json | cut -c1-8)
          sed -i "s|'dev'|'atvari-core-$coreHash'|" public/sw.js
        '';

        installPhase = ''
          runHook preInstall
          cp -r public $out
          runHook postInstall
        '';
      };

    }) inputs.nixpkgs.legacyPackages;

    apps = builtins.mapAttrs (system: pkgs: {

      default = {
        type = "app";
        program = "${pkgs.writeShellApplication {
          name = "atvari-eu-serve";
          runtimeInputs = [ pkgs.static-web-server ];
          text = ''
            exec static-web-server --root ${inputs.self.packages.${system}.default} "$@"
          '';
        }}/bin/atvari-eu-serve";
      };

    }) inputs.nixpkgs.legacyPackages;
  };
}
