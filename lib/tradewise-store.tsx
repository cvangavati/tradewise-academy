import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { courses, totalLessons } from "../data/curriculum";
import { syntheticScenarios } from "../data/market-lab";
import { simulatedWatchlist } from "../data/practice";
import { nextReviewAt, type ReviewRating } from "../data/spaced-review";

const STORAGE_KEY = "tradewise-academy-state-v1";
const startingCash = 10_000;

export type Holding = { symbol: string; name: string; quantity: number; averageCost: number };
export type Activity = { id: string; action: "BUY" | "SELL"; symbol: string; quantity: number; price: number; timestamp: string; scenarioId?: string };
export type SavedTerm = { term: string; savedAt: string; dueAt: string; reviewCount: number };
export type TradeReflection = { id: string; activityId: string; scenarioId?: string; thesis: string; discipline: string; emotion: string; lesson: string; createdAt: string };

export type TradeWiseState = {
  completedLessonIds: string[];
  cash: number;
  holdings: Holding[];
  activities: Activity[];
  quizScores: Record<string, boolean>;
  savedTerms: SavedTerm[];
  reflections: TradeReflection[];
};

export type CourseProgress = {
  courseId: string;
  title: string;
  accent: string;
  completed: number;
  total: number;
  completion: number;
  quizAttempts: number;
  quizCorrect: number;
  quizAccuracy: number;
};

export type LearningAnalytics = {
  completedCount: number;
  quizAttempts: number;
  quizCorrect: number;
  quizAccuracy: number;
  courseProgress: CourseProgress[];
};

const defaultState: TradeWiseState = {
  completedLessonIds: [],
  cash: startingCash,
  holdings: [],
  activities: [],
  quizScores: {},
  savedTerms: [],
  reflections: [],
};

type Store = TradeWiseState & {
  isReady: boolean;
  completeLesson: (lessonId: string, passedQuiz: boolean) => void;
  placeOrder: (action: "BUY" | "SELL", symbol: string, quantity: number) => { ok: boolean; message: string; activityId?: string };
  toggleTermBookmark: (term: string) => void;
  rateSavedTerm: (term: string, rating: ReviewRating) => void;
  addReflection: (reflection: Omit<TradeReflection, "id" | "createdAt">) => void;
  resetProgress: () => void;
  portfolioValue: number;
  investedValue: number;
  completedCount: number;
  nextLessonId: string;
  learningAnalytics: LearningAnalytics;
  dueTerms: SavedTerm[];
};

const TradeWiseContext = createContext<Store | null>(null);

export function quoteFor(symbol: string) {
  const watchlistQuote = simulatedWatchlist.find((item) => item.symbol === symbol);
  if (watchlistQuote) return watchlistQuote;
  const scenario = syntheticScenarios.find((item) => item.symbol === symbol);
  if (!scenario) return undefined;
  return {
    symbol: scenario.symbol,
    name: `${scenario.title} scenario`,
    price: scenario.prices[scenario.prices.length - 1],
  };
}

export function getLearningAnalytics(state: Pick<TradeWiseState, "completedLessonIds" | "quizScores">): LearningAnalytics {
  const courseProgress = courses.map((course) => {
    const completedLessons = course.lessons.filter((lesson) => state.completedLessonIds.includes(lesson.id));
    const attempts = course.lessons.filter((lesson) => Object.prototype.hasOwnProperty.call(state.quizScores, lesson.id));
    const quizCorrect = attempts.filter((lesson) => state.quizScores[lesson.id]).length;
    const completion = Math.round((completedLessons.length / course.lessons.length) * 100);
    const quizAccuracy = attempts.length ? Math.round((quizCorrect / attempts.length) * 100) : 0;
    return { courseId: course.id, title: course.title, accent: course.accent, completed: completedLessons.length, total: course.lessons.length, completion, quizAttempts: attempts.length, quizCorrect, quizAccuracy };
  });
  const quizAttempts = courseProgress.reduce((sum, course) => sum + course.quizAttempts, 0);
  const quizCorrect = courseProgress.reduce((sum, course) => sum + course.quizCorrect, 0);
  return { completedCount: state.completedLessonIds.length, quizAttempts, quizCorrect, quizAccuracy: quizAttempts ? Math.round((quizCorrect / quizAttempts) * 100) : 0, courseProgress };
}

export function toggleSavedTerm(state: TradeWiseState, term: string, now = new Date()): TradeWiseState {
  const existing = state.savedTerms.find((item) => item.term === term);
  if (existing) return { ...state, savedTerms: state.savedTerms.filter((item) => item.term !== term) };
  const timestamp = now.toISOString();
  return { ...state, savedTerms: [...state.savedTerms, { term, savedAt: timestamp, dueAt: timestamp, reviewCount: 0 }] };
}

export function applyReviewRating(state: TradeWiseState, term: string, rating: ReviewRating, now = new Date()): TradeWiseState {
  return {
    ...state,
    savedTerms: state.savedTerms.map((item) => item.term === term
      ? { ...item, dueAt: nextReviewAt(rating, now), reviewCount: item.reviewCount + 1 }
      : item),
  };
}

export function appendTradeReflection(state: TradeWiseState, reflection: Omit<TradeReflection, "id" | "createdAt">, now = new Date()): TradeWiseState {
  return {
    ...state,
    reflections: [{ ...reflection, id: `${now.getTime()}-${reflection.activityId}`, createdAt: now.toISOString() }, ...state.reflections].slice(0, 50),
  };
}

export function executeSimulatedOrder(state: TradeWiseState, action: "BUY" | "SELL", symbol: string, quantity: number, now = new Date()): { nextState: TradeWiseState; ok: boolean; message: string } {
  const quote = quoteFor(symbol);
  if (!quote || !Number.isInteger(quantity) || quantity <= 0) return { nextState: state, ok: false, message: "Enter a whole-share quantity greater than zero." };

  const notional = quote.price * quantity;
  const holding = state.holdings.find((item) => item.symbol === symbol);
  if (action === "BUY" && notional > state.cash) return { nextState: state, ok: false, message: "This simulated order exceeds available buying power." };
  if (action === "SELL" && (!holding || holding.quantity < quantity)) return { nextState: state, ok: false, message: "This paper account does not support short selling." };

  const activity: Activity = {
    id: `${now.getTime()}-${symbol}`,
    action,
    symbol,
    quantity,
    price: quote.price,
    timestamp: now.toISOString(),
    scenarioId: syntheticScenarios.find((scenario) => scenario.symbol === symbol)?.id,
  };

  const holdings = action === "BUY"
    ? holding
      ? state.holdings.map((item) => item.symbol === symbol
        ? { ...item, quantity: item.quantity + quantity, averageCost: ((item.averageCost * item.quantity) + notional) / (item.quantity + quantity) }
        : item)
      : [...state.holdings, { symbol, name: quote.name, quantity, averageCost: quote.price }]
    : state.holdings
      .map((item) => item.symbol === symbol ? { ...item, quantity: item.quantity - quantity } : item)
      .filter((item) => item.quantity > 0);

  return {
    ok: true,
    message: `${action === "BUY" ? "Purchased" : "Sold"} ${quantity} ${symbol} in the simulation.`,
    nextState: {
      ...state,
      cash: action === "BUY" ? state.cash - notional : state.cash + notional,
      holdings,
      activities: [activity, ...state.activities].slice(0, 20),
    },
  };
}

export function TradeWiseProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<TradeWiseState>(defaultState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<TradeWiseState>;
          setState({ ...defaultState, ...parsed });
        }
      } finally {
        setIsReady(true);
      }
    }
    void load();
  }, []);

  useEffect(() => {
    if (isReady) void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [isReady, state]);

  const completeLesson = useCallback((lessonId: string, passedQuiz: boolean) => {
    setState((current) => ({
      ...current,
      completedLessonIds: current.completedLessonIds.includes(lessonId)
        ? current.completedLessonIds
        : [...current.completedLessonIds, lessonId],
      quizScores: { ...current.quizScores, [lessonId]: passedQuiz },
    }));
  }, []);

  const placeOrder = useCallback((action: "BUY" | "SELL", symbol: string, quantity: number) => {
    const result = executeSimulatedOrder(state, action, symbol, quantity);
    if (result.ok) setState(result.nextState);
    return { ok: result.ok, message: result.message, activityId: result.ok ? result.nextState.activities[0]?.id : undefined };
  }, [state]);

  const toggleTermBookmark = useCallback((term: string) => {
    setState((current) => toggleSavedTerm(current, term));
  }, []);

  const rateSavedTerm = useCallback((term: string, rating: ReviewRating) => {
    setState((current) => applyReviewRating(current, term, rating));
  }, []);

  const addReflection = useCallback((reflection: Omit<TradeReflection, "id" | "createdAt">) => {
    setState((current) => appendTradeReflection(current, reflection));
  }, []);

  const resetProgress = useCallback(() => setState(defaultState), []);

  const value = useMemo(() => {
    const investedValue = state.holdings.reduce((sum, holding) => sum + (quoteFor(holding.symbol)?.price ?? holding.averageCost) * holding.quantity, 0);
    const portfolioValue = state.cash + investedValue;
    const completedCount = state.completedLessonIds.length;
    const nextLessonId = courses.flatMap((course) => course.lessons).find((lesson) => !state.completedLessonIds.includes(lesson.id))?.id ?? courses[0].lessons[0].id;
    const learningAnalytics = getLearningAnalytics(state);
    const dueTerms = state.savedTerms.filter((term) => new Date(term.dueAt).getTime() <= Date.now());
    return {
      ...state,
      isReady,
      completeLesson,
      placeOrder,
      toggleTermBookmark,
      rateSavedTerm,
      addReflection,
      resetProgress,
      portfolioValue,
      investedValue,
      completedCount,
      nextLessonId,
      learningAnalytics,
      dueTerms,
    };
  }, [state, isReady, completeLesson, placeOrder, toggleTermBookmark, rateSavedTerm, addReflection, resetProgress]);

  return <TradeWiseContext.Provider value={value}>{children}</TradeWiseContext.Provider>;
}

export function useTradeWise() {
  const context = useContext(TradeWiseContext);
  if (!context) throw new Error("useTradeWise must be used within TradeWiseProvider");
  return context;
}

export const learningProgress = (completedCount: number) => Math.round((completedCount / totalLessons) * 100);
