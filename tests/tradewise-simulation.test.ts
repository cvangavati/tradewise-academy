import { describe, expect, it } from "vitest";

import { courses, totalLessons } from "../data/curriculum";
import { syntheticScenarios } from "../data/market-lab";
import { simulatedWatchlist } from "../data/practice";
import { executeSimulatedOrder, type TradeWiseState } from "../lib/tradewise-store";

const cleanState: TradeWiseState = {
  completedLessonIds: [],
  completedCatalogLessonIds: [],
  catalogQuizScores: {},
  catalogReviews: [],
  cash: 10_000,
  holdings: [],
  activities: [],
  quizScores: {},
  savedTerms: [],
  reflections: [],
};

describe("TradeWise curriculum", () => {
  it("contains a complete, quiz-backed learning path", () => {
    expect(courses.length).toBeGreaterThanOrEqual(11);
    expect(totalLessons).toBeGreaterThanOrEqual(33);
    expect(courses.flatMap((course) => course.lessons).every((lesson) => lesson.quiz.options.length === 4 && lesson.source.url.startsWith("https://"))).toBe(true);
  });
});

describe("cash-only paper-trading simulation", () => {
  it("records a funded buy with a holding and activity", () => {
    const quote = simulatedWatchlist[0];
    const result = executeSimulatedOrder(cleanState, "BUY", quote.symbol, 3, new Date("2026-08-18T12:00:00.000Z"));

    expect(result.ok).toBe(true);
    expect(result.nextState.cash).toBeCloseTo(10_000 - quote.price * 3);
    expect(result.nextState.holdings).toEqual([{ symbol: quote.symbol, name: quote.name, quantity: 3, averageCost: quote.price }]);
    expect(result.nextState.activities[0]).toMatchObject({ action: "BUY", symbol: quote.symbol, quantity: 3 });
  });

  it("rejects orders that exceed buying power and blocks short selling", () => {
    const quote = simulatedWatchlist[0];
    const tooLarge = executeSimulatedOrder(cleanState, "BUY", quote.symbol, 10_000);
    const shortAttempt = executeSimulatedOrder(cleanState, "SELL", quote.symbol, 1);

    expect(tooLarge.ok).toBe(false);
    expect(tooLarge.nextState).toEqual(cleanState);
    expect(shortAttempt.ok).toBe(false);
    expect(shortAttempt.message).toContain("short selling");
  });

  it("sells only a held quantity and returns cash to the paper account", () => {
    const quote = simulatedWatchlist[0];
    const buy = executeSimulatedOrder(cleanState, "BUY", quote.symbol, 2);
    const sell = executeSimulatedOrder(buy.nextState, "SELL", quote.symbol, 2);

    expect(sell.ok).toBe(true);
    expect(sell.nextState.cash).toBeCloseTo(cleanState.cash);
    expect(sell.nextState.holdings).toHaveLength(0);
  });

  it("records Market Lab trades as synthetic scenario activity", () => {
    const scenario = syntheticScenarios.find((item) => item.id === "earnings-gap")!;
    const result = executeSimulatedOrder(cleanState, "BUY", scenario.symbol, 1);

    expect(result.ok).toBe(true);
    expect(result.nextState.activities[0].scenarioId).toBe("earnings-gap");
  });
});
