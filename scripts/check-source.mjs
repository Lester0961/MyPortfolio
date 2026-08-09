import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const files = ["index.html", "src/App.jsx", "src/data.js", "src/styles.css"];
const requiredIds = ["about", "projects", "skills", "experience", "certifications", "contact"];
const errors = [];

for (const file of files) {
  const path = resolve(file);
  if (!existsSync(path)) {
    errors.push(`Missing required source file: ${file}`);
    continue;
  }
  const source = readFileSync(path, "utf8");
  if (/[—–]/u.test(source)) errors.push(`${file} contains a forbidden long dash character.`);
  if (/window\.addEventListener\(["']scroll["']/u.test(source)) {
    errors.push(`${file} uses a direct window scroll listener.`);
  }
}

const appSource = readFileSync(resolve("src/App.jsx"), "utf8");
for (const id of requiredIds) {
  if (!appSource.includes(`id="${id}"`)) errors.push(`Missing preserved section anchor: #${id}`);
}

const requiredAssets = [
  "assets/images/profile.png",
  "assets/images/systems-engine.jpg",
  "assets/projects/srs.png",
  "assets/projects/sisp.png",
  "assets/projects/lutong-pinoy.png",
  "assets/certificates/Screenshot 2026-06-08 213045.png",
  "assets/resume/John_Lester_Dematera_Resume.pdf",
];

for (const asset of requiredAssets) {
  if (!existsSync(resolve(asset))) errors.push(`Missing required asset: ${asset}`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Source checks passed for ${files.length} files and ${requiredAssets.length} assets.`);
