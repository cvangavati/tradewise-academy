import { describe, expect, it } from "vitest";

import { searchGlossary } from "../data/glossary";
import { marketLabDisclosure, syntheticScenarios } from "../data/market-lab";
import { getLearningAnalytics, type TradeWiseState } from "../lib/tradewise-store";

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
};

describe("searchable glossary", () => {
  it("searches across terms and definitions while honoring categories", () => {
    expect(searchGlossary("stop order").map((entry) => entry.term)).toContain("Stop order");
    expect(searchGlossary("price", "Options").every((entry) => entry.category === "Options")).toBe(true);
    expect(searchGlossary("nonexistent phrase")).toHaveLength(0);
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
    expect(syntheticScenarios).toHaveLength(3);
    expect(syntheticScenarios.every((scenario) => scenario.prices.length === scenario.volumes.length && scenario.prices.length > 10)).toBe(true);
    expect(marketLabDisclosure.toLowerCase()).toContain("synthetic");
    expect(marketLabDisclosure.toLowerCase()).toContain("does not represent live");
  });
});
