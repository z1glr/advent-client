import esbuild from "esbuild";

await esbuild.build({
	entryPoints: ["build/release.ts"],
	outfile: "build/release.cjs",
	tsconfig: "build/tsconfig.json",
	platform: "node",
	bundle: true
});