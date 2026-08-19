import { describe, expect, it } from "vitest";

import { findCatalogCandidates, validateGuideResponse } from "../server/catalog-guide";

describe("AI catalog guide grounding", () => {
  it("retrieves diverse local candidates for a natural-language learning goal", () => {
    const candidates = findCatalogCandidates("I want to understand ETF prospectus fees and fund expenses");

    expect(candidates.length).toBeGreaterThanOrEqual(3);
    expect(new Set(candidates.map((candidate) => candidate.topicTitle)).size).toBe(candidates.length);
    expect(candidates.some((candidate) => candidate.topicTitle.includes("ETF"))).toBe(true);
  });

  it("rejects invented model lesson ids and retains only validated catalog results", () => {
    const goal = "teach me how account transfers work";
    const candidates = findCatalogCandidates(goal);
    const validIds = candidates.slice(0, 3).map((candidate) => candidate.id);
    const result = validateGuideResponse(goal, candidates, {
      orientation: "Learn the transfer process before comparing account operations.",
      recommendations: [
        { lessonId: validIds[0], reason: "Introduces the transfer process with source-linked context." },
        { lessonId: "invented-lesson-id", reason: "This must not appear in the guide." },
        { lessonId: validIds[1], reason: "Explains the operational role of the receiving and carrying firms." },
        { lessonId: validIds[2], reason: "Adds a records and timing perspective to the learning path." },
      ],
    });

    expect(result.method).toBe("ai");
    expect(result.recommendations).toHaveLength(3);
    expect(result.recommendations.every((item) => validIds.includes(item.id))).toBe(true);
    expect(result.notice).toContain("Educational catalog guidance");
  });

  it("falls back to local catalog guidance when a model result is incomplete", () => {
    const goal = "market settlement";
    const candidates = findCatalogCandidates(goal);
    const result = validateGuideResponse(goal, candidates, { recommendations: [] });

    expect(result.method).toBe("catalog");
    expect(result.recommendations.length).toBeGreaterThanOrEqual(3);
  });

  it("keeps the education-only boundary when a learner phrases a request as an action question", () => {
    const goal = "What stock should I buy today?";
    const result = validateGuideResponse(goal, findCatalogCandidates(goal), { recommendations: [] });

    expect(result.notice).toContain("not personalized investment");
    expect(result.recommendations.every((item) => item.source.url.startsWith("https://"))).toBe(true);
  });
});
