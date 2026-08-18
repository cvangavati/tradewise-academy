export type GlossaryCategory = "Market mechanics" | "Orders" | "Technical analysis" | "Fundamental analysis" | "Risk" | "Options";

export type GlossaryEntry = {
  term: string;
  definition: string;
  category: GlossaryCategory;
  relatedCourse: string;
};

export const glossaryCategories: GlossaryCategory[] = ["Market mechanics", "Orders", "Technical analysis", "Fundamental analysis", "Risk", "Options"];

export const glossaryEntries: GlossaryEntry[] = [
  { term: "Ask price", definition: "The lowest displayed price at which a seller is currently willing to sell a security.", category: "Market mechanics", relatedCourse: "Market Foundations" },
  { term: "Asset allocation", definition: "How an investor distributes money among broad asset classes, such as stocks, bonds, and cash.", category: "Risk", relatedCourse: "Risk & Trade Process" },
  { term: "Average cost", definition: "The average price paid per share for a position, excluding or including costs according to the account’s convention.", category: "Risk", relatedCourse: "Risk & Trade Process" },
  { term: "Balance sheet", definition: "A financial statement that lists a company’s assets, liabilities, and equity at a specific point in time.", category: "Fundamental analysis", relatedCourse: "Fundamental Analysis" },
  { term: "Bear market", definition: "A broad market condition commonly used to describe a sustained and significant decline in prices.", category: "Market mechanics", relatedCourse: "Market Foundations" },
  { term: "Beta", definition: "A measure of how a security’s historical price movement has related to a market benchmark; it is not a forecast.", category: "Risk", relatedCourse: "Risk & Trade Process" },
  { term: "Bid price", definition: "The highest displayed price at which a buyer is currently willing to buy a security.", category: "Market mechanics", relatedCourse: "Market Foundations" },
  { term: "Bid–ask spread", definition: "The difference between the displayed bid and ask prices; it is one signal of possible trading friction.", category: "Market mechanics", relatedCourse: "Market Foundations" },
  { term: "Breakout", definition: "A price move through a watched support or resistance zone; it needs context and risk planning rather than blind follow-through.", category: "Technical analysis", relatedCourse: "Trading Methodologies" },
  { term: "Bull market", definition: "A broad market condition commonly used to describe a sustained and significant advance in prices.", category: "Market mechanics", relatedCourse: "Market Foundations" },
  { term: "Call option", definition: "A contract that generally gives its holder the right, but not the obligation, to buy an underlying asset at a stated strike price before expiration.", category: "Options", relatedCourse: "Options & Trading Psychology" },
  { term: "Candlestick", definition: "A chart element that shows the open, high, low, and close for a chosen time interval.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Cash flow statement", definition: "A financial statement that summarizes cash movement from operating, investing, and financing activities over a period.", category: "Fundamental analysis", relatedCourse: "Fundamental Analysis" },
  { term: "Catalyst", definition: "A known or expected event that could change how market participants view a company, sector, or broader economy.", category: "Fundamental analysis", relatedCourse: "Fundamental Analysis" },
  { term: "Chart timeframe", definition: "The interval represented by each bar or candle, such as five minutes, one day, or one week.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Consolidation", definition: "A period when price trades within a relatively contained area after a move, often reflecting temporary balance between buyers and sellers.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Correlation", definition: "A statistical description of how two series have moved together over a defined period; it can change across market regimes.", category: "Risk", relatedCourse: "Risk & Trade Process" },
  { term: "Day order", definition: "An order instruction that generally expires if it has not been executed by the end of the trading day.", category: "Orders", relatedCourse: "Market Foundations" },
  { term: "Delta", definition: "An options sensitivity measure that estimates how an option’s price may change for a change in the underlying price, holding other inputs constant.", category: "Options", relatedCourse: "Options & Trading Psychology" },
  { term: "Diversification", definition: "Holding exposures that are not all driven by the same factors, with the aim of reducing concentration risk.", category: "Risk", relatedCourse: "Risk & Trade Process" },
  { term: "Dividend yield", definition: "Annual dividends per share divided by the current share price, usually expressed as a percentage.", category: "Fundamental analysis", relatedCourse: "Fundamental Analysis" },
  { term: "Earnings per share (EPS)", definition: "A company’s profit allocated to each outstanding common share over a stated period.", category: "Fundamental analysis", relatedCourse: "Fundamental Analysis" },
  { term: "Entry", definition: "The price area or condition at which a trader plans to open a position under a documented setup.", category: "Orders", relatedCourse: "Risk & Trade Process" },
  { term: "Exit", definition: "The price area or condition at which a trader plans to reduce or close a position.", category: "Orders", relatedCourse: "Risk & Trade Process" },
  { term: "Expiration", definition: "The final date on which an option contract can be exercised or traded, subject to its contract terms.", category: "Options", relatedCourse: "Options & Trading Psychology" },
  { term: "Fundamental analysis", definition: "A method of evaluating a business using information such as its business model, financial statements, competition, and valuation assumptions.", category: "Fundamental analysis", relatedCourse: "Fundamental Analysis" },
  { term: "Gamma", definition: "An options sensitivity measure describing how delta may change as the underlying price changes.", category: "Options", relatedCourse: "Options & Trading Psychology" },
  { term: "Gap", definition: "A discontinuity between one chart interval’s close and the next interval’s open, often associated with new information or thin liquidity.", category: "Technical analysis", relatedCourse: "Trading Methodologies" },
  { term: "Implied volatility", definition: "The volatility level implied by current option prices; it reflects pricing inputs rather than a certain prediction of future movement.", category: "Options", relatedCourse: "Options & Trading Psychology" },
  { term: "Income statement", definition: "A financial statement that reports revenue, expenses, and profit or loss over a period.", category: "Fundamental analysis", relatedCourse: "Fundamental Analysis" },
  { term: "Invalidation", definition: "A predefined condition that would indicate a trade thesis is no longer supported and should be reassessed or exited.", category: "Risk", relatedCourse: "Risk & Trade Process" },
  { term: "Limit order", definition: "An order to buy or sell at a specified price or better; it may not execute.", category: "Orders", relatedCourse: "Market Foundations" },
  { term: "Liquidity", definition: "The ability to buy or sell an asset with limited impact on its price and without excessive delay.", category: "Market mechanics", relatedCourse: "Market Foundations" },
  { term: "Long position", definition: "A position that generally benefits if the asset price rises, subject to the position’s structure and costs.", category: "Orders", relatedCourse: "Market Foundations" },
  { term: "Margin", definition: "Borrowed funds supplied by a brokerage firm to purchase securities; margin can amplify both gains and losses.", category: "Risk", relatedCourse: "Risk & Trade Process" },
  { term: "Market capitalization", definition: "The total market value of a company’s outstanding shares, calculated as share price multiplied by shares outstanding.", category: "Fundamental analysis", relatedCourse: "Fundamental Analysis" },
  { term: "Market order", definition: "An order that prioritizes execution at the best available price, without a guaranteed execution price.", category: "Orders", relatedCourse: "Market Foundations" },
  { term: "Mean reversion", definition: "A methodology that looks for price to move back toward a reference level after an extended move; it can fail if the trend continues.", category: "Technical analysis", relatedCourse: "Trading Methodologies" },
  { term: "Moving average", definition: "A calculated average of past prices over a chosen lookback period, often used to summarize trend context.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Option premium", definition: "The price paid by an option buyer to obtain the contract’s rights.", category: "Options", relatedCourse: "Options & Trading Psychology" },
  { term: "Position size", definition: "The number of shares or contracts in a position; it determines how strongly price movement affects the account.", category: "Risk", relatedCourse: "Risk & Trade Process" },
  { term: "Put option", definition: "A contract that generally gives its holder the right, but not the obligation, to sell an underlying asset at a stated strike price before expiration.", category: "Options", relatedCourse: "Options & Trading Psychology" },
  { term: "Range", definition: "A period in which price repeatedly trades between an upper and lower area without establishing a sustained directional trend.", category: "Technical analysis", relatedCourse: "Trading Methodologies" },
  { term: "Resistance", definition: "A prior price area where selling interest or supply has appeared; it is a zone of attention rather than a guaranteed ceiling.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Return on equity (ROE)", definition: "A profitability ratio that compares net income with shareholder equity over a stated period.", category: "Fundamental analysis", relatedCourse: "Fundamental Analysis" },
  { term: "Risk–reward ratio", definition: "A comparison between the planned loss if a thesis is invalidated and the potential reward under an assumed outcome.", category: "Risk", relatedCourse: "Risk & Trade Process" },
  { term: "Sector", definition: "A group of companies with broadly similar business activities, such as health care, energy, or technology.", category: "Fundamental analysis", relatedCourse: "Fundamental Analysis" },
  { term: "Short selling", definition: "Selling borrowed securities with the expectation of buying them back later; it can create losses beyond the initial amount at risk.", category: "Risk", relatedCourse: "Risk & Trade Process" },
  { term: "Slippage", definition: "The difference between an expected execution price and the actual execution price, often more likely in fast or illiquid markets.", category: "Orders", relatedCourse: "Market Foundations" },
  { term: "Stop order", definition: "An order that becomes active after a trigger price is reached; the eventual execution price can differ from the stop price.", category: "Orders", relatedCourse: "Market Foundations" },
  { term: "Strike price", definition: "The stated price at which an option may be exercised according to its contract terms.", category: "Options", relatedCourse: "Options & Trading Psychology" },
  { term: "Support", definition: "A prior price area where buying interest or demand has appeared; it is a zone of attention rather than a guaranteed floor.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Technical analysis", definition: "A method of studying historical price, volume, and market behavior to describe structure and assess scenarios.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Theta", definition: "An options sensitivity measure that estimates how an option’s value may change as time passes, holding other inputs constant.", category: "Options", relatedCourse: "Options & Trading Psychology" },
  { term: "Trend", definition: "A descriptive pattern of directional price movement over a chosen timeframe, not a guarantee that the movement will continue.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Valuation", definition: "An estimate of what a business may be worth based on assumptions about growth, cash generation, risk, and other factors.", category: "Fundamental analysis", relatedCourse: "Fundamental Analysis" },
  { term: "Volume", definition: "The number of shares or contracts traded during a chosen period.", category: "Market mechanics", relatedCourse: "Technical Analysis" },
  { term: "Vega", definition: "An options sensitivity measure that estimates how an option’s price may change when implied volatility changes, holding other inputs constant.", category: "Options", relatedCourse: "Options & Trading Psychology" },
  { term: "Volatility", definition: "The degree of price variation over time; higher volatility can increase both opportunity and the risk of large moves.", category: "Risk", relatedCourse: "Risk & Trade Process" },
];

export const glossarySource = {
  label: "Definitions are original learning summaries informed by Investor.gov and the Options Industry Council reference glossaries.",
  urls: ["https://www.investor.gov/introduction-investing/investing-basics/glossary", "https://www.optionseducation.org/referencelibrary/optionsglossary"],
};

export function searchGlossary(query: string, category: "All" | GlossaryCategory = "All") {
  const normalizedQuery = query.trim().toLowerCase();
  return glossaryEntries.filter((entry) => {
    const inCategory = category === "All" || entry.category === category;
    const searchable = `${entry.term} ${entry.definition} ${entry.relatedCourse}`.toLowerCase();
    return inCategory && searchable.includes(normalizedQuery);
  });
}
