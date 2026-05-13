import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const oxlint = path.join(__dirname, "node_modules/.bin/oxlint");

function runOxlint(file) {
  const filePath = path.join(__dirname, file);
  try {
    execSync(`${oxlint} ${filePath}`, { encoding: "utf8" });
    return { errors: 0, warnings: 0, output: "" };
  } catch (err) {
    const output = err.stdout + err.stderr;
    const errorMatch = output.match(/Found (\d+) warning(?:s)? and (\d+) error/);
    if (errorMatch) {
      return {
        warnings: parseInt(errorMatch[1], 10),
        errors: parseInt(errorMatch[2], 10),
        output,
      };
    }
    return { errors: -1, warnings: -1, output };
  }
}

// These tests document what Oxlint CAN and CANNOT detect.
// Oxlint intentionally omits pure formatting rules (quotes, semicolons,
// trailing commas, indentation, line length), delegating those to formatters.

describe("Oxlint formatting rule evaluation", () => {
  describe("rules NOT supported by Oxlint (no detection expected)", () => {
    test("single quotes instead of double quotes", () => {
      const result = runOxlint("violations/no-double-quotes.js");
      // Oxlint has no 'quotes' rule — formatting delegated to Prettier/Biome
      assert.equal(result.errors, 0, "Oxlint does not detect single-quote violations");
      assert.equal(result.warnings, 0, "Oxlint does not warn about single-quote violations");
    });

    test("missing semicolons", () => {
      const result = runOxlint("violations/no-semicolons.js");
      // Oxlint has no 'semi' rule — formatting delegated to Prettier/Biome
      assert.equal(result.errors, 0, "Oxlint does not detect missing semicolons");
      assert.equal(result.warnings, 0, "Oxlint does not warn about missing semicolons");
    });

    test("missing trailing commas in multiline object", () => {
      const result = runOxlint("violations/no-trailing-commas.js");
      // Oxlint has no 'comma-dangle' rule — formatting delegated to Prettier/Biome
      assert.equal(result.errors, 0, "Oxlint does not detect missing trailing commas");
      assert.equal(result.warnings, 0, "Oxlint does not warn about missing trailing commas");
    });

    test("bad indentation (4 spaces instead of 2)", () => {
      const result = runOxlint("violations/bad-indent.js");
      // Oxlint has no 'indent' rule — formatting delegated to Prettier/Biome
      assert.equal(result.errors, 0, "Oxlint does not detect indentation violations");
      assert.equal(result.warnings, 0, "Oxlint does not warn about indentation violations");
    });

    test("lines exceeding 80 characters", () => {
      const result = runOxlint("violations/long-lines.js");
      // Oxlint has no 'max-len' rule — formatting delegated to Prettier/Biome
      assert.equal(result.errors, 0, "Oxlint does not detect long lines");
      assert.equal(result.warnings, 0, "Oxlint does not warn about long lines");
    });
  });
});
