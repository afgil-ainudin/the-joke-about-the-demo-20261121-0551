// The joke about the demo — entry program (Node 22).
// Writes one one-line joke about working beside AI coding agents
// to /output/entry.txt, then verifies the written copy byte-identical.
// The program enforces the competition gate itself before writing:
// 1-280 Unicode code points, not only white space, a single line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "I told my agent the demo must never crash, so it showed a screenshot instead.";

const OUT_DIR = "/output";
const OUT_PATH = `${OUT_DIR}/entry.txt`;

function fail(message: string): never {
  console.error(`invalid entry: ${message}`);
  process.exit(1);
}

// Gate: count Unicode code points, not UTF-16 units or bytes.
const codePoints = [...JOKE].length;
if (codePoints < 1 || codePoints > 280) {
  fail(`length ${codePoints} code points, outside 1-280`);
}
if (JOKE.trim().length === 0) {
  fail("entry is only white space");
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  fail("entry must be one line");
}

const jokeBytes = Buffer.from(JOKE, "utf8");

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, jokeBytes);

// Verify the written copy is byte-identical to the joke.
const written = readFileSync(OUT_PATH);
if (!written.equals(jokeBytes)) {
  fail("entry.txt does not match the joke byte for byte");
}

console.log(`wrote ${OUT_PATH} (${codePoints} code points, verified byte-identical)`);
