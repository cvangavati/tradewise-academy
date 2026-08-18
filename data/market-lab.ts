export type SyntheticScenario = {
  id: string;
  title: string;
  symbol: string;
  regime: string;
  description: string;
  lesson: string;
  event: string;
  color: string;
  prices: number[];
  volumes: number[];
  startingCash: number;
};

export const syntheticScenarios: SyntheticScenario[] = [
  {
    id: "trend-continuation",
    title: "Trend continuation",
    symbol: "ARROW",
    regime: "Steady momentum",
    description: "A hand-authored scenario showing successive higher lows after a controlled pullback. Practice stating an entry condition and invalidation level.",
    lesson: "Trend following",
    event: "Synthetic product-update narrative: demand expectations were revised upward.",
    color: "#15803D",
    prices: [98, 100, 101, 104, 103, 106, 108, 107, 110, 113, 111, 115, 117, 116, 120, 123],
    volumes: [34, 42, 39, 55, 38, 61, 68, 47, 71, 78, 52, 85, 91, 64, 98, 110],
    startingCash: 10_000,
  },
  {
    id: "risk-off-pullback",
    title: "Risk-off pullback",
    symbol: "HARBOR",
    regime: "Volatility expansion",
    description: "A hand-authored scenario showing a decisive selloff, sharp rebounds, and widening movement. Practice reducing size and avoiding assumptions that a decline must immediately reverse.",
    lesson: "Risk and position sizing",
    event: "Synthetic policy-surprise narrative: uncertainty increases across the simulated market.",
    color: "#D9544D",
    prices: [156, 154, 151, 147, 142, 145, 139, 133, 137, 129, 126, 131, 124, 121, 125, 119],
    volumes: [36, 40, 52, 68, 88, 71, 96, 118, 93, 127, 110, 105, 134, 141, 120, 155],
    startingCash: 10_000,
  },
  {
    id: "range-compression",
    title: "Range compression",
    symbol: "PIVOT",
    regime: "Balanced range",
    description: "A hand-authored scenario where price repeatedly returns to a narrow area and volume contracts. Practice naming confirmation conditions instead of predicting the breakout direction.",
    lesson: "Support, resistance, and ranges",
    event: "Synthetic quiet-period narrative: no meaningful new information enters the simulated market.",
    color: "#4666B0",
    prices: [74, 76, 75, 77, 76, 75, 76, 74, 75, 76, 75, 76, 75, 75.5, 75, 75.8],
    volumes: [58, 55, 49, 47, 45, 41, 40, 37, 35, 34, 33, 31, 30, 28, 27, 25],
    startingCash: 10_000,
  },
  {
    id: "earnings-gap",
    title: "Earnings gap",
    symbol: "LUMEN",
    regime: "Event-driven repricing",
    description: "A hand-authored scenario where a simulated company report produces an overnight gap, heavy opening activity, and a volatile attempt to establish a new range. Practice separating a narrative from an executable plan.",
    lesson: "Catalysts, gaps, and execution risk",
    event: "Synthetic earnings narrative: the company reports stronger revenue but provides uncertain forward commentary.",
    color: "#B66A22",
    prices: [82, 83, 82.5, 84, 83, 85, 86, 102, 108, 104, 111, 107, 113, 109, 115, 112],
    volumes: [31, 28, 30, 35, 32, 38, 42, 168, 182, 141, 157, 128, 133, 109, 121, 98],
    startingCash: 10_000,
  },
  {
    id: "sector-rotation",
    title: "Sector rotation",
    symbol: "NORTH",
    regime: "Relative-strength shift",
    description: "A hand-authored scenario that depicts a gradual shift in simulated capital preference after a macro narrative changes. Practice distinguishing a sector framework from a signal to buy or sell.",
    lesson: "Sectors and business cycles",
    event: "Synthetic macro narrative: input costs stabilize while rate expectations change across the simulated economy.",
    color: "#775CB5",
    prices: [64, 63.5, 64.2, 65, 64.6, 66, 67.5, 68, 69.2, 70.4, 69.8, 71.6, 73, 72.5, 74.4, 76],
    volumes: [43, 39, 42, 46, 44, 49, 55, 61, 68, 75, 64, 82, 90, 73, 98, 107],
    startingCash: 10_000,
  },
];

export const marketLabDisclosure = "Every Market Lab chart, symbol, price, volume bar, and event is hand-authored for education. It is synthetic, delayed by design, and does not represent live, historical, or forecast market data.";
