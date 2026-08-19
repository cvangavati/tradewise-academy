import { describe, expect, it } from "vitest";

import { buildStudyPlanText, catalogPlaylists, getCatalogQuiz, lessonsForPlaylist, nextCatalogReviewAt } from "../data/catalog-learning";
import { allGlossaryEntries, searchGlossary } from "../data/glossary";
import { marketLabDisclosure, syntheticScenarios } from "../data/market-lab";
import { getMicroLesson, microLessonCount, microLessons, migrateLegacyCatalogLessonId, searchMicroLessons } from "../data/micro-curriculum";
import { referenceDomains, referenceTopicCount, searchReferenceTopics } from "../data/reference-library";
import { nextReviewAt } from "../data/spaced-review";
import { getSyntheticStockProfile, searchSyntheticStockProfiles, syntheticStockDisclosure, syntheticStockProfiles, syntheticStockSectors } from "../data/synthetic-stocks";
import { appendTradeReflection, applyCatalogQuizResult, applyReviewRating, getLearningAnalytics, markCatalogLessonComplete, migrateCatalogState, toggleSavedTerm, type TradeWiseState } from "../lib/tradewise-store";

const learnerState: TradeWiseState = {
  completedLessonIds: ["stock-ownership", "order-language", "risk-first", "trend-structure"],
  completedCatalogLessonIds: [],
  catalogQuizScores: {},
  catalogReviews: [],
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
    expect(searchGlossary("municipal bond").map((entry) => entry.term)).toContain("Municipal bond");
    expect(searchGlossary("ACATS").map((entry) => entry.term)).toContain("ACATS");
    expect(allGlossaryEntries.length).toBeGreaterThanOrEqual(144);
    expect(searchGlossary("relative strength index").map((entry) => entry.term)).toContain("Relative strength index (RSI)");
    expect(searchGlossary("nonexistent phrase")).toHaveLength(0);
  });
});

describe("Stock Market Atlas", () => {
  it("organizes a broad source-linked reference library that can be searched across domains", () => {
    expect(referenceDomains).toHaveLength(26);
    expect(referenceTopicCount).toBeGreaterThanOrEqual(168);
    expect(searchReferenceTopics("settlement").map((topic) => topic.title)).toContain("Clearing and settlement");
    expect(searchReferenceTopics("SIPC").map((topic) => topic.title)).toContain("SIPC protection scope");
    expect(searchReferenceTopics("financial stability").map((topic) => topic.title)).toContain("Financial stability");
    expect(searchReferenceTopics("fraud", "governance-protection").every((topic) => topic.domain.id === "governance-protection")).toBe(true);
    expect(searchReferenceTopics("nonsensical phrase")).toHaveLength(0);
    expect(searchReferenceTopics("stochastic", "technical-analysis").map((topic) => topic.title)).toContain("Stochastic oscillator context");
  });
});

describe("2,000-plus consolidated lesson catalog", () => {
  it("creates unique source-linked lessons across the full Atlas and supports scalable search", () => {
    expect(microLessonCount).toBeGreaterThanOrEqual(2016);
    expect(microLessonCount).toBe(referenceTopicCount * 12);
    expect(microLessons).toHaveLength(microLessonCount);
    expect(new Set(microLessons.map((lesson) => lesson.id)).size).toBe(microLessonCount);
    expect(getMicroLesson(microLessons[0].id)?.source.url).toMatch(/^https:\/\//);
    expect(searchMicroLessons("SIPC").length).toBeGreaterThanOrEqual(12);
    expect(searchMicroLessons("ACATS").length).toBeGreaterThanOrEqual(12);
    expect(searchMicroLessons("nonsensical phrase")).toHaveLength(0);
    expect(searchMicroLessons("Fibonacci", "technical-analysis").length).toBeGreaterThanOrEqual(12);
  });

  it("keeps catalog completion separate from core lesson completion and avoids duplicates", () => {
    const lessonId = microLessons[0].id;
    const once = markCatalogLessonComplete(learnerState, lessonId);
    const twice = markCatalogLessonComplete(once, lessonId);

    expect(once.completedCatalogLessonIds).toEqual([lessonId]);
    expect(twice.completedCatalogLessonIds).toEqual([lessonId]);
    expect(twice.completedLessonIds).toEqual(learnerState.completedLessonIds);
  });

  it("maps prior short-frame completions and reviews to their merged learning units", () => {
    const legacyId = "catalog-technical-analysis-rsi-context-orientation";
    const migratedId = "catalog-technical-analysis-rsi-context-foundations-scope";
    const migrated = migrateCatalogState({
      ...learnerState,
      completedCatalogLessonIds: [legacyId],
      catalogQuizScores: { [legacyId]: true },
      catalogReviews: [{ lessonId: legacyId, dueAt: "2026-08-20T12:00:00.000Z", streak: 2, attempts: 2, lastCorrect: true }],
    });

    expect(migrateLegacyCatalogLessonId(legacyId)).toBe(migratedId);
    expect(migrated.completedCatalogLessonIds).toEqual([migratedId]);
    expect(migrated.catalogQuizScores[migratedId]).toBe(true);
    expect(migrated.catalogReviews[0]).toMatchObject({ lessonId: migratedId, attempts: 2 });
  });

  it("creates a transparent one-question check and schedules local adaptive review", () => {
    const lessonId = microLessons[0].id;
    const quiz = getCatalogQuiz(lessonId);
    const base = new Date("2026-08-18T12:00:00.000Z");
    const incorrect = applyCatalogQuizResult(learnerState, lessonId, false, base);
    const corrected = applyCatalogQuizResult(incorrect, lessonId, true, base);

    expect(quiz?.correctIndex).toBe(0);
    expect(incorrect.catalogReviews[0]).toMatchObject({ lessonId, streak: 0, attempts: 1, dueAt: "2026-08-19T12:00:00.000Z" });
    expect(corrected.catalogReviews[0]).toMatchObject({ lessonId, streak: 1, attempts: 2, dueAt: "2026-08-21T12:00:00.000Z" });
    expect(nextCatalogReviewAt(true, 2, base)).toBe("2026-09-01T12:00:00.000Z");
  });

  it("organizes goal playlists and generates an offline education-only plan", () => {
    const playlist = catalogPlaylists.find((item) => item.id === "filing-research");
    const lessons = lessonsForPlaylist("filing-research");
    const text = buildStudyPlanText("filing-research", 6, new Date("2026-08-18T12:00:00.000Z"));

    expect(playlist?.title).toBe("Filing Research");
    expect(lessons.length).toBeGreaterThan(20);
    expect(text).toContain("TRADEWISE ACADEMY — OFFLINE STUDY PLAN");
    expect(text).toContain("Educational material only");
    expect(text).toContain("Source lane:");

    const technicalPlaylist = catalogPlaylists.find((item) => item.id === "technical-analysis-lab");
    expect(technicalPlaylist).toMatchObject({ title: "Technical Analysis Lab", days: 21 });
    expect(lessonsForPlaylist("technical-analysis-lab").length).toBeGreaterThan(100);
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

describe("Synthetic Stock Explorer", () => {
  it("provides diverse, deterministic fictional profiles with complete chart inputs", () => {
    expect(syntheticStockProfiles).toHaveLength(22);
    expect(syntheticStockSectors.length).toBeGreaterThanOrEqual(10);
    expect(new Set(syntheticStockProfiles.map((profile) => profile.id)).size).toBe(syntheticStockProfiles.length);
    expect(syntheticStockProfiles.every((profile) => profile.symbol.startsWith("SIM-") && profile.priceHistory.length >= 20)).toBe(true);
    expect(syntheticStockProfiles.every((profile) => profile.revenueHistory.length === 4 && profile.earningsHistory.length === 4 && profile.operatingMarginHistory.length === 4)).toBe(true);
    expect(syntheticStockProfiles.every((profile) => profile.risks.length >= 3 && profile.researchQuestions.length >= 3 && profile.relatedTopics.length >= 3)).toBe(true);
  });

  it("supports educational discovery while preserving the no-live-data boundary", () => {
    expect(getSyntheticStockProfile("SIM-ARC")?.name).toBe("Arcforge Cloudworks");
    expect(searchSyntheticStockProfiles("health").every((profile) => profile.sector === "Health Care")).toBe(true);
    expect(searchSyntheticStockProfiles("revenue recognition").map((profile) => profile.symbol)).toContain("SIM-ARC");
    expect(syntheticStockDisclosure.toLowerCase()).toContain("synthetic");
    expect(syntheticStockDisclosure.toLowerCase()).toContain("not live");
    expect(syntheticStockDisclosure.toLowerCase()).toContain("not a recommendation");
  });
});
