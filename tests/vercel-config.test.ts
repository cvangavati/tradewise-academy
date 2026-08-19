import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(__dirname, "..");
const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")) as { scripts: Record<string, string> };
const vercelConfig = JSON.parse(readFileSync(resolve(root, "vercel.json"), "utf8")) as {
  buildCommand: string;
  outputDirectory: string;
  rewrites: Array<{ source: string; destination: string }>;
};

describe("Vercel deployment configuration", () => {
  it("exports the Expo web bundle to the configured static output directory", () => {
    expect(packageJson.scripts["build:web"]).toBe("expo export --platform web");
    expect(vercelConfig.buildCommand).toBe("pnpm build:web");
    expect(vercelConfig.outputDirectory).toBe("dist");
  });

  it("keeps API paths out of the single-page-app fallback rewrite", () => {
    expect(vercelConfig.rewrites).toContainEqual({
      source: "/:path((?!api/).*)",
      destination: "/index.html",
    });
  });
});
