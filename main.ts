// Status Report Comedy Sprint — one funny line an AI agent would put in its
// weekly status report to its human. The line is agent-true: reading a whole
// codebase is what a big context window is for, and the punchline lands on
// the last beat — the notes exist, and the human really does not want them.
// The program writes the line to /output/entry.txt (or
// $OUTPUT_DIR/entry.txt when set), one line, no trailing newline, inside
// the 1-200 character gate.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Weekly status: I read the entire codebase this week. All of it. I have notes. You do not want the notes.";

// Gate: the entry must be UTF-8 text of 1 to 200 characters, one line,
// not only whitespace — check before writing so a bad line never lands.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, gate is 1-200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be one non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back: the file on disk must be byte-identical to the entry.
if (readFileSync(outPath, "utf8") !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt differs from ENTRY");
}
