export type PracticeChallenge = {
  id: string;
  title: string;
  prompt: string;
  scenario: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  tag: string;
};

export const practiceChallenges: PracticeChallenge[] = [
  {
    id: "trend-or-range",
    title: "Read the structure",
    prompt: "A chart prints higher highs and higher lows across several sessions, then pauses near a prior high.",
    scenario: "You are documenting structure, not making a prediction.",
    choices: ["Potential uptrend with a nearby decision zone", "Guaranteed breakout", "A reason to ignore risk", "Proof that price cannot fall"],
    answerIndex: 0,
    explanation: "Higher highs and higher lows can describe an uptrend. The prior high is a decision zone, not a guarantee of continuation.",
    tag: "Technical analysis",
  },
  {
    id: "size-before-entry",
    title: "Plan before entry",
    prompt: "Your simulated account is $10,000. You have written an invalidation level, but no position size yet.",
    scenario: "Which next step best demonstrates a risk-first process?",
    choices: ["Choose a loss boundary and calculate a compatible size", "Use the largest position because the setup looks strong", "Remove the invalidation level", "Wait for social-media confirmation"],
    answerIndex: 0,
    explanation: "A risk-first process connects an invalidation level with the amount of account exposure the learner is willing to accept.",
    tag: "Risk management",
  },
  {
    id: "liquidity-question",
    title: "Inspect the spread",
    prompt: "A simulated symbol has a wide bid–ask spread and low displayed volume.",
    scenario: "You are deciding whether the entry and exit are practical.",
    choices: ["Account for higher execution friction and exit difficulty", "Assume the wide spread guarantees upside", "Ignore the exit plan", "Treat it as a deposit account"],
    answerIndex: 0,
    explanation: "A wide spread and low liquidity can make immediate execution more costly and a fast exit harder.",
    tag: "Market mechanics",
  },
];

export type WatchlistItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
};

export const simulatedWatchlist: WatchlistItem[] = [
  { symbol: "ALTA", name: "Alta Systems", price: 184.2, change: 2.36, changePercent: 1.3 },
  { symbol: "VERA", name: "Vera Health", price: 72.84, change: -1.18, changePercent: -1.59 },
  { symbol: "NOVA", name: "Nova Energy", price: 48.65, change: 0.72, changePercent: 1.5 },
  { symbol: "ORBT", name: "Orbit Commerce", price: 126.42, change: -2.04, changePercent: -1.59 },
];
