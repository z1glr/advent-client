import esbuild from "esbuild";

await esbuild.build({
	entryPoints: ["build-scripts/release.ts"],
	outfile: "build-scripts/release.cjs",
	tsconfig: "build-scripts/tsconfig.json",
	platform: "node",
	bundle: true
});