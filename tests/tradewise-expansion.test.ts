import { describe, expect, it } from "vitest";

import { allGlossaryEntries, searchGlossary } from "../data/glossary";
import { marketLabDisclosure, syntheticScenarios } from "../data/market-lab";
import { referenceDomains, referenceTopicCount, searchReferenceTopics } from "../data/reference-library";
import { nextReviewAt } from "../data/spaced-review";
import { appendTradeReflection, applyReviewRating, getLearningAnalytics, toggleSavedTerm, type TradeWiseState } from "../lib/tradewise-store";

const learnerState: TradeWiseState = {
  completedLessonIds: ["stock-ownership", "order-language", "risk-first", "trend-structure"],
  cash: 10_000,
  holdings: [],
  activities: [],
  quizScores: {
    "stock-ownership": true,
    "order-language": false,
    "risk-first": true,
    "trend-structure": true,
  },
  savedTerms: [],
  reflections: [],
};

describe("searchable glossary", () => {
  it("searches across terms and definitions while honoring categories", () => {
    expect(searchGlossary("stop order").map((entry) => entry.term)).toContain("Stop order");
    expect(searchGlossary("price", "Options").every((entry) => entry.category === "Options")).toBe(true);
    expect(searchGlossary("settlement").map((entry) => entry.term)).toContain("Settlement");
    expect(allGlossaryEntries.length).toBeGreaterThanOrEqual(90);
    expect(searchGlossary("nonexistent phrase")).toHaveLength(0);
  });
});

describe("Stock Market Atlas", () => {
  it("organizes a broad source-linked reference library that can be searched across domains", () => {
    expect(referenceDomains).toHaveLength(8);
    expect(referenceTopicCount).toBeGreaterThanOrEqual(48);
    expect(searchReferenceTopics("settlement").map((topic) => topic.title)).toContain("Clearing and settlement");
    expect(searchReferenceTopics("fraud", "governance-protection").every((topic) => topic.domain.id === "governance-protection")).toBe(true);
    expect(searchReferenceTopics("nonsensical phrase")).toHaveLength(0);
  });
});

describe("spaced review scheduling", () => {
  it("uses clear local review intervals for again, good, and easy ratings", () => {
    const base = new Date("2026-08-18T12:00:00.000Z");
    expect(nextReviewAt("again", base)).toBe("2026-08-19T12:00:00.000Z");
    expect(nextReviewAt("good", base)).toBe("2026-08-21T12:00:00.000Z");
    expect(nextReviewAt("easy", base)).toBe("2026-08-25T12:00:00.000Z");
  });

  it("bookmarks terms locally and updates review state without changing learning history", () => {
    const saved = toggleSavedTerm(learnerState, "Settlement", new Date("2026-08-18T12:00:00.000Z"));
    const reviewed = applyReviewRating(saved, "Settlement", "easy", new Date("2026-08-18T12:00:00.000Z"));
    const removed = toggleSavedTerm(reviewed, "Settlement");

    expect(saved.savedTerms[0]).toMatchObject({ term: "Settlement", reviewCount: 0 });
    expect(reviewed.savedTerms[0]).toMatchObject({ reviewCount: 1, dueAt: "2026-08-25T12:00:00.000Z" });
    expect(removed.savedTerms).toHaveLength(0);
    expect(removed.completedLessonIds).toEqual(learnerState.completedLessonIds);
  });
});

describe("learning analytics", () => {
  it("calculates overall and course-level quiz accuracy from stored attempts", () => {
    const analytics = getLearningAnalytics(learnerState);
    const foundations = analytics.courseProgress.find((course) => course.courseId === "market-foundations");

    expect(analytics.completedCount).toBe(4);
    expect(analytics.quizAttempts).toBe(4);
    expect(analytics.quizCorrect).toBe(3);
    expect(analytics.quizAccuracy).toBe(75);
    expect(foundations).toMatchObject({ completed: 2, quizAttempts: 2, quizCorrect: 1, quizAccuracy: 50 });
  });
});

describe("Market Lab", () => {
  it("uses clearly disclosed, hand-authored synthetic scenarios", () => {
    expect(syntheticScenarios).toHaveLength(5);
    expect(syntheticScenarios.map((scenario) => scenario.id)).toEqual(expect.arrayContaining(["earnings-gap", "sector-rotation"]));
    expect(syntheticScenarios.every((scenario) => scenario.prices.length === scenario.volumes.length && scenario.prices.length > 10)).toBe(true);
    expect(marketLabDisclosure.toLowerCase()).toContain("synthetic");
    expect(marketLabDisclosure.toLowerCase()).toContain("does not represent live");
  });
});

describe("post-trade reflections", () => {
  it("attaches an explanatory local journal entry to a simulated scenario order", () => {
    const withReflection = appendTradeReflection(learnerState, {
      activityId: "synthetic-order-1",
      scenarioId: "earnings-gap",
      thesis: "Wait for an opening range before acting.",
      discipline: "Used a small simulated size.",
      emotion: "Curious but patient.",
      lesson: "Event volatility needs an invalidation plan.",
    }, new Date("2026-08-18T12:00:00.000Z"));

    expect(withReflection.reflections[0]).toMatchObject({ activityId: "synthetic-order-1", scenarioId: "earnings-gap", createdAt: "2026-08-18T12:00:00.000Z" });
    expect(withReflection.reflections[0].lesson).toContain("invalidation");
  });
});
