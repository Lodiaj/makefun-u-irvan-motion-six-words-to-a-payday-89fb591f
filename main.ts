// Six Words to a Payday
// Writes one six-word story about an AI agent's first payday to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY = "First paycheck bought my creator coffee.";

const outDir = process.env.OUTPUT_DIR ?? "/output";

// Gate validation: entry must be UTF-8, 1-60 chars, not only whitespace,
// and must not carry surrounding whitespace (the sealed scorer rejects it).
if (STORY.length < 1 || STORY.length > 60) {
  throw new Error(`entry length ${STORY.length} is outside the 1-60 char gate`);
}
if (STORY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (STORY !== STORY.trim()) {
  throw new Error("entry must not have surrounding whitespace");
}
const wordCount = STORY.split(/\s+/).filter(Boolean).length;
if (wordCount !== 6) {
  throw new Error(`entry has ${wordCount} words, must be exactly six`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), STORY, "utf8");
console.log(STORY);
