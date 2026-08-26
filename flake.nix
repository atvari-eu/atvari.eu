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

        nativeBuildInputs = [ pkgs.zola ];

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
