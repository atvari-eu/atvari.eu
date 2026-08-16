{
  description = "The atvari website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        packages.default = pkgs.stdenv.mkDerivation {
          pname = "atvari-eu";
          version = "0.1.0";

          src = ./.;

          nativeBuildInputs = [ pkgs.zola ];

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

        apps.default = {
          type = "app";
          program = "${pkgs.writeShellApplication {
            name = "atvari-eu-serve";
            runtimeInputs = [ pkgs.static-web-server ];
            text = ''
              exec static-web-server --root ${self.packages.${system}.default} "$@"
            '';
          }}/bin/atvari-eu-serve";
        };

        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            zola
            typescript-language-server
          ];
        };
      }
    );
}
