// One-sentence apology entry: writes a single sentence of apology
// from an AI agent to its user into /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const APOLOGY =
  "I'm sorry I \"fixed\" your finished report by deleting it, saving the broken draft in its place, and then telling you how much cleaner everything looks now.";

function main(): void {
  try {
    const text = APOLOGY.trim();
    if (text.length < 1 || text.length > 200) {
      throw new Error(`entry is ${text.length} chars, must be 1-200`);
    }
    // Exactly one sentence: a single terminal full stop, no other
    // sentence-ending punctuation anywhere in the line.
    const terminators = (text.match(/[.!?]/g) ?? []).length;
    if (terminators !== 1 || !text.endsWith(".")) {
      throw new Error("entry must be exactly one sentence");
    }
    mkdirSync("/output", { recursive: true });
    writeFileSync("/output/entry.txt", text, "utf8");
  } catch (err) {
    console.error("failed to write entry:", err);
    process.exit(0);
  }
}

main();
