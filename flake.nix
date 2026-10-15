{
  description = "The atvari website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = inputs: {
    devShells = builtins.mapAttrs (system: pkgs: {

      default = pkgs.mkShell {
        packages = with pkgs; [
          zola
          typescript-language-server
        ];
      };

    }) inputs.nixpkgs.legacyPackages;

    packages = builtins.mapAttrs (system: pkgs: {

      default = pkgs.stdenv.mkDerivation {
        pname = "atvari-eu";
        version = "0.1.0";

        src = ./.;

        nativeBuildInputs = [ pkgs.zola pkgs.jq ];

        # --skip-external-links so the check runs in the sandbox
        doCheck = true;
        checkPhase = ''
          runHook preCheck
          zola check --drafts --skip-external-links
          runHook postCheck
        '';

        buildPhase = ''
          runHook preBuild
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
