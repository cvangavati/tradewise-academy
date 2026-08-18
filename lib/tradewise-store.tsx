import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { courses, totalLessons } from "../data/curriculum";
import { simulatedWatchlist } from "../data/practice";

const STORAGE_KEY = "tradewise-academy-state-v1";
const startingCash = 10_000;

export type Holding = { symbol: string; name: string; quantity: number; averageCost: number };
export type Activity = { id: string; action: "BUY" | "SELL"; symbol: string; quantity: number; price: number; timestamp: string };

export type TradeWiseState = {
  completedLessonIds: string[];
  cash: number;
  holdings: Holding[];
  activities: Activity[];
  quizScores: Record<string, boolean>;
};

const defaultState: TradeWiseState = {
  completedLessonIds: [],
  cash: startingCash,
  holdings: [],
  activities: [],
  quizScores: {},
};

type Store = TradeWiseState & {
  isReady: boolean;
  completeLesson: (lessonId: string, passedQuiz: boolean) => void;
  placeOrder: (action: "BUY" | "SELL", symbol: string, quantity: number) => { ok: boolean; message: string };
  resetProgress: () => void;
  portfolioValue: number;
  investedValue: number;
  completedCount: number;
  nextLessonId: string;
};

const TradeWiseContext = createContext<Store | null>(null);

export function quoteFor(symbol: string) {
  return simulatedWatchlist.find((item) => item.symbol === symbol);
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
    return { ok: result.ok, message: result.message };
  }, [state]);

  const resetProgress = useCallback(() => setState(defaultState), []);

  const value = useMemo(() => {
    const investedValue = state.holdings.reduce((sum, holding) => sum + (quoteFor(holding.symbol)?.price ?? holding.averageCost) * holding.quantity, 0);
    const portfolioValue = state.cash + investedValue;
    const completedCount = state.completedLessonIds.length;
    const nextLessonId = courses.flatMap((course) => course.lessons).find((lesson) => !state.completedLessonIds.includes(lesson.id))?.id ?? courses[0].lessons[0].id;
    return {
      ...state,
      isReady,
      completeLesson,
      placeOrder,
      resetProgress,
      portfolioValue,
      investedValue,
      completedCount,
      nextLessonId,
    };
  }, [state, isReady, completeLesson, placeOrder, resetProgress]);

  return <TradeWiseContext.Provider value={value}>{children}</TradeWiseContext.Provider>;
}

export function useTradeWise() {
  const context = useContext(TradeWiseContext);
  if (!context) throw new Error("useTradeWise must be used within TradeWiseProvider");
  return context;
}

export const learningProgress = (completedCount: number) => Math.round((completedCount / totalLessons) * 100);
