import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import {
  cpSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
const require = createRequire(import.meta.url);
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist/assets", { recursive: true });
cpSync("public", "dist", { recursive: true });
execFileSync(
  process.platform === "win32"
    ? "npm.cmd"
    : require.resolve("esbuild/bin/esbuild"),
  [
    ...(process.platform === "win32" ? ["exec", "--", "esbuild"] : []),
    "src/main.jsx",
    "--bundle",
    "--minify",
    "--format=esm",
    "--target=es2020",
    '--define:process.env.NODE_ENV="production"',
    "--outfile=dist/assets/app.js",
  ],
  { stdio: "inherit", shell: process.platform === "win32" },
);
const html = readFileSync("index.html", "utf8").replace(
  '<script type="module" src="/src/main.jsx"></script>',
  '<link rel="stylesheet" href="/assets/app.css"><script type="module" src="/assets/app.js"></script>',
);
writeFileSync("dist/index.html", html);
console.log("React production build completed.");
