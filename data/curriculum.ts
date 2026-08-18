export type LessonLevel = "Beginner" | "Intermediate" | "Advanced";

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  objective: string;
  body: string;
  takeaways: string[];
  quiz: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
  source: { label: string; url: string };
};

export type Course = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  level: LessonLevel;
  accent: string;
  lessons: Lesson[];
};

const secRisk = {
  label: "Investor.gov — What is Risk?",
  url: "https://www.investor.gov/introduction-investing/investing-basics/what-risk",
};

const finraDayTrading = {
  label: "FINRA — Day-Trading Risk Disclosure",
  url: "https://www.finra.org/rules-guidance/rulebooks/finra-rules/2270",
};

const cboeOptions = {
  label: "Cboe Options Institute — Options 101",
  url: "https://www.cboe.com/en/optionsinstitute/courses/options101/",
};

export const courses: Course[] = [
  {
    id: "market-foundations",
    eyebrow: "Start here",
    title: "Market Foundations",
    description: "Build a working mental model of stocks, orders, exchanges, and return drivers.",
    level: "Beginner",
    accent: "#007C78",
    lessons: [
      {
        id: "stock-ownership",
        title: "What a share represents",
        duration: "4 min",
        objective: "Distinguish company ownership from a price chart.",
        body: "A common share represents an ownership claim on a company. A share price is the market’s changing estimate of what that claim is worth, not a scorecard of certainty. Before looking for an entry, identify what you own, why the business might create value, and what could impair that thesis.",
        takeaways: ["A stock is fractional ownership.", "Price movement and business quality are related but not identical.", "A thesis must include conditions that could prove it wrong."],
        quiz: { question: "A share of common stock most directly represents:", options: ["A guaranteed return", "Partial ownership in a company", "A loan to the government", "A chart pattern"], answerIndex: 1, explanation: "Common stock represents an ownership interest in a company; its value can rise or fall." },
        source: secRisk,
      },
      {
        id: "order-language",
        title: "Market, limit, and stop orders",
        duration: "5 min",
        objective: "Know which part of an order you control and which you do not.",
        body: "An order is an instruction, not a prediction. A market order prioritizes execution but does not set a maximum purchase price or minimum sale price. A limit order sets a price condition but may not execute. A stop order is a trigger that requires extra care in volatile conditions because the eventual fill can differ from the stop price.",
        takeaways: ["Market orders emphasize execution.", "Limit orders emphasize price boundaries.", "Execution risk belongs in every trade plan."],
        quiz: { question: "Which order type can help define the highest price you are willing to pay?", options: ["Market order", "Limit buy order", "Dividend order", "Settlement order"], answerIndex: 1, explanation: "A limit buy specifies a maximum price, but it is not guaranteed to fill." },
        source: secRisk,
      },
      {
        id: "market-structure",
        title: "Liquidity and spread",
        duration: "4 min",
        objective: "Interpret the practical cost of entering and exiting a position.",
        body: "Liquidity is the ability to transact without meaningfully moving the price. The bid is the highest displayed buy interest and the ask is the lowest displayed sell interest. A wider spread can raise the implicit cost of trading and make a fast exit harder, particularly when attention shifts or volatility rises.",
        takeaways: ["The bid–ask spread is a trading friction.", "Liquidity can change quickly.", "A plan should consider the exit as carefully as the entry."],
        quiz: { question: "A wider bid–ask spread generally signals:", options: ["Lower trading friction", "Potentially higher transaction friction", "Guaranteed upside", "A stock split"], answerIndex: 1, explanation: "A larger gap between bid and ask can increase the cost of immediate execution." },
        source: secRisk,
      },
    ],
  },
  {
    id: "risk-process",
    eyebrow: "Core discipline",
    title: "Risk & Trade Process",
    description: "Create a repeatable planning process before exploring strategies.",
    level: "Beginner",
    accent: "#D9544D",
    lessons: [
      {
        id: "risk-first",
        title: "Risk comes before return",
        duration: "5 min",
        objective: "Name the uncertainty in an investment decision before estimating upside.",
        body: "Risk is uncertainty and the potential for financial loss. A trading plan should state the scenario, the evidence that supports it, the point where the idea is invalidated, and the maximum amount the learner is willing to lose in the simulation. No setup removes risk.",
        takeaways: ["Every investment involves risk.", "A trade thesis needs an invalidation point.", "Potential reward never makes a risk disappear."],
        quiz: { question: "What should be defined before focusing on a target return?", options: ["A rumor source", "The risk and invalidation condition", "A guaranteed win rate", "A more volatile symbol"], answerIndex: 1, explanation: "A process starts with the conditions that make a thesis no longer valid and the risk being accepted." },
        source: secRisk,
      },
      {
        id: "position-sizing",
        title: "Position sizing",
        duration: "6 min",
        objective: "Connect position size to a predefined loss boundary.",
        body: "Position size is not a confidence score. It is an exposure decision. In a study exercise, first define the account value, the maximum planned loss if the idea is wrong, and the distance between entry and invalidation. Smaller sizing does not guarantee safety, but it can make one mistake less dominant in the account’s outcome.",
        takeaways: ["Size is an exposure decision.", "A stop level is not useful without a size decision.", "One trade should not determine the whole learning journey."],
        quiz: { question: "Increasing position size most directly increases:", options: ["The certainty of the trade", "Exposure to the trade’s outcome", "The company’s revenue", "The chart’s timeframe"], answerIndex: 1, explanation: "A larger position increases the effect of price movement on the account." },
        source: secRisk,
      },
      {
        id: "day-trading-context",
        title: "A sober look at day trading",
        duration: "5 min",
        objective: "Recognize why speed, costs, and volatility elevate the challenge of intraday trading.",
        body: "Day trading involves opening and closing positions within the same day. It can be extremely risky, and it demands knowledge of markets, order handling, and costs. This app teaches the framework for analyzing a setup, not a shortcut to profits. Its paper account does not offer margin or short selling.",
        takeaways: ["Day trading can produce large and immediate losses.", "Costs and execution quality matter.", "Simulated practice is not evidence a strategy will work with real money."],
        quiz: { question: "Which statement best reflects a careful view of day trading?", options: ["It is appropriate for every beginner", "It guarantees faster learning than study", "It can be extremely risky and demands market knowledge", "It removes the need for risk planning"], answerIndex: 2, explanation: "FINRA’s disclosure emphasizes elevated risks and the knowledge required for day-trading activity." },
        source: finraDayTrading,
      },
    ],
  },
  {
    id: "technical-analysis",
    eyebrow: "Read price context",
    title: "Technical Analysis",
    description: "Use trend, structure, volume, and indicators as evidence—not guarantees.",
    level: "Intermediate",
    accent: "#4666B0",
    lessons: [
      {
        id: "trend-structure",
        title: "Trend and market structure",
        duration: "6 min",
        objective: "Describe price structure without forecasting it.",
        body: "Technical analysis studies price, volume, and market behavior. Trend language helps learners describe structure: higher highs and higher lows can characterize an uptrend, while lower highs and lower lows can characterize a downtrend. Describing structure is different from assuming it will persist.",
        takeaways: ["Trends are descriptions of past structure.", "A timeframe changes the pattern you see.", "Use price action with a risk plan, not as a guarantee."],
        quiz: { question: "Which sequence often describes an uptrend?", options: ["Lower highs and lower lows", "Higher highs and higher lows", "A flat price only", "No volume"], answerIndex: 1, explanation: "Higher highs and higher lows are a common descriptive framework for an uptrend." },
        source: secRisk,
      },
      {
        id: "support-resistance",
        title: "Support and resistance zones",
        duration: "5 min",
        objective: "Treat levels as areas of interest rather than precise promises.",
        body: "Support and resistance describe areas where price previously paused, reversed, or accelerated. They are zones of attention, not lines that must hold. A learner can ask: What would show acceptance above the zone? What would show rejection? What would make this level irrelevant?",
        takeaways: ["Levels are zones, not guarantees.", "A break needs context such as follow-through or volume.", "Plan both the confirmation and the failure case."],
        quiz: { question: "A support zone should be viewed as:", options: ["A guaranteed floor", "An area that may attract buying interest", "A mandatory sell signal", "A dividend date"], answerIndex: 1, explanation: "Prior price areas can influence attention, but they do not guarantee a reversal." },
        source: secRisk,
      },
      {
        id: "indicators-context",
        title: "Indicators as context",
        duration: "6 min",
        objective: "Use indicators to organize observations without outsourcing judgment.",
        body: "Moving averages, momentum oscillators, and volume measures transform past data into visual summaries. They can help compare current conditions with a defined lookback period. Because they rely on historical inputs, they should be interpreted alongside price structure, timeframe, liquidity, and a preplanned risk boundary.",
        takeaways: ["Indicators summarize past information.", "Different settings can produce different signals.", "An indicator is one input, not an instruction."],
        quiz: { question: "Why should an indicator not be used as a stand-alone guarantee?", options: ["It uses historical inputs and needs context", "It predicts every event", "It eliminates volatility", "It changes a company’s earnings"], answerIndex: 0, explanation: "Indicators summarize prior data; a disciplined process evaluates context and risk as well." },
        source: secRisk,
      },
    ],
  },
  {
    id: "fundamental-analysis",
    eyebrow: "Understand the business",
    title: "Fundamental Analysis",
    description: "Study the business model, financial statements, valuation questions, and catalysts.",
    level: "Intermediate",
    accent: "#7652A9",
    lessons: [
      {
        id: "business-thesis",
        title: "From story to business thesis",
        duration: "6 min",
        objective: "Translate a headline into questions about the underlying business.",
        body: "Fundamental analysis begins with the business. Identify how the company earns revenue, its major costs, its competitive position, and the conditions that could change each. A well-formed thesis lists observable evidence and competing explanations rather than treating a compelling story as proof.",
        takeaways: ["A thesis explains how the business creates value.", "Catalysts and risks should be specific.", "A story becomes useful only when it can be tested."],
        quiz: { question: "A stronger business thesis includes:", options: ["Only a price target", "Observable evidence and risks", "A social-media slogan", "No alternative outcome"], answerIndex: 1, explanation: "A quality thesis is testable and makes room for competing evidence." },
        source: secRisk,
      },
      {
        id: "financial-statements",
        title: "The three financial statements",
        duration: "7 min",
        objective: "Know the role of the income statement, balance sheet, and cash-flow statement.",
        body: "The income statement summarizes revenue and expenses over a period. The balance sheet shows assets, liabilities, and equity at a point in time. The cash-flow statement explains cash movement across operating, investing, and financing activities. Reading them together is more informative than focusing on one headline number.",
        takeaways: ["Income is not the same as cash flow.", "Balance-sheet obligations can affect risk.", "Periods and accounting definitions matter."],
        quiz: { question: "Which statement shows assets and liabilities at a point in time?", options: ["Income statement", "Balance sheet", "Cash-flow statement", "Order ticket"], answerIndex: 1, explanation: "The balance sheet is a snapshot of assets, liabilities, and equity." },
        source: secRisk,
      },
      {
        id: "valuation-questions",
        title: "Valuation asks a comparison question",
        duration: "6 min",
        objective: "Frame valuation as a set of assumptions rather than a single exact answer.",
        body: "Valuation compares price with an estimate of economic value. Common inputs include growth, margins, cash generation, debt, competitive durability, and required return. No multiple or discounted-cash-flow output is self-executing; the quality of its assumptions and the range of plausible outcomes are central.",
        takeaways: ["Valuation depends on assumptions.", "Price and value are different concepts.", "Ranges communicate uncertainty better than false precision."],
        quiz: { question: "A valuation conclusion is most useful when it:", options: ["Hides its assumptions", "Uses a range and states key assumptions", "Guarantees a price move", "Ignores business risk"], answerIndex: 1, explanation: "Valuation depends on judgments, so assumptions and uncertainty should be visible." },
        source: secRisk,
      },
    ],
  },
  {
    id: "trading-methods",
    eyebrow: "Methodologies",
    title: "Trading Methodologies",
    description: "Compare major approaches by timeframe, evidence, and failure modes.",
    level: "Intermediate",
    accent: "#B66A22",
    lessons: [
      {
        id: "trend-following",
        title: "Trend following",
        duration: "5 min",
        objective: "Understand the logic and trade-off of participating in persistent moves.",
        body: "Trend following seeks to participate when price behavior persists in one direction. Its strength is that it does not require calling a turning point. Its trade-off is that it can suffer repeated small losses or late entries when markets reverse, range, or gap.",
        takeaways: ["Trend following favors persistence over prediction.", "Timeframe and exit rules define the method.", "Ranges and reversals are important failure modes."],
        quiz: { question: "Trend following generally attempts to:", options: ["Predict every top and bottom", "Participate in persistent price movement", "Eliminate all losses", "Ignore exits"], answerIndex: 1, explanation: "The method focuses on participating in sustained movement rather than precisely forecasting reversals." },
        source: secRisk,
      },
      {
        id: "mean-reversion",
        title: "Mean reversion",
        duration: "5 min",
        objective: "Identify the assumption behind a reversion setup and its key risk.",
        body: "Mean-reversion approaches look for price to move back toward a reference level after an extended move. The core risk is assuming an extreme cannot become more extreme. A plan needs a reason for the reference level, a time horizon, and a point where the reversion idea is invalidated.",
        takeaways: ["Reversion is an assumption, not a law.", "Strong trends can persist longer than expected.", "Invalidation protects against averaging into an unchecked idea."],
        quiz: { question: "The central risk in a mean-reversion setup is:", options: ["Price may continue moving away from the reference level", "There is no uncertainty", "The market always closes", "The balance sheet disappears"], answerIndex: 0, explanation: "A price can remain extended or extend further, so the failure condition must be planned." },
        source: secRisk,
      },
      {
        id: "breakouts-swings",
        title: "Breakouts and swing trading",
        duration: "6 min",
        objective: "Separate a chart event from a complete trade plan.",
        body: "A breakout occurs when price moves through a watched zone. Swing trading aims to capture a move over multiple sessions or weeks. In both cases, the event is not enough: define the evidence for acceptance, the level that invalidates the idea, the position size, and how overnight gaps can change the outcome.",
        takeaways: ["A breakout needs confirmation criteria.", "Swing positions carry overnight and event risk.", "A method requires rules for entry, exit, and review."],
        quiz: { question: "What turns a breakout observation into a trade plan?", options: ["A single headline", "Entry, invalidation, size, and review criteria", "A larger position automatically", "Ignoring gaps"], answerIndex: 1, explanation: "A chart observation needs explicit risk and execution criteria before it becomes a planned exercise." },
        source: finraDayTrading,
      },
    ],
  },
  {
    id: "options-psychology",
    eyebrow: "Advanced awareness",
    title: "Options & Trading Psychology",
    description: "Learn options language and behavioral safeguards without treating either as a shortcut.",
    level: "Advanced",
    accent: "#9C3D70",
    lessons: [
      {
        id: "calls-puts",
        title: "Calls and puts",
        duration: "6 min",
        objective: "Understand the basic rights associated with common option contracts.",
        body: "An option is a contract. A call generally gives its holder the right to buy an underlying asset at a stated price before expiration; a put generally gives its holder the right to sell. Before any strategy discussion, learn the role of strike price, premium, expiration, and the fact that outcomes depend on time as well as price.",
        takeaways: ["Calls and puts have different rights.", "Premium and time matter to option outcomes.", "Options require dedicated risk education."],
        quiz: { question: "A call option generally gives the holder the right to:", options: ["Buy the underlying at the strike price", "Sell the underlying at the strike price", "Receive a guaranteed dividend", "Avoid all losses"], answerIndex: 0, explanation: "A call commonly grants the right to buy at the specified strike price before expiration." },
        source: cboeOptions,
      },
      {
        id: "payoff-awareness",
        title: "Payoff diagrams and defined risk",
        duration: "6 min",
        objective: "Read a payoff shape before judging a strategy idea.",
        body: "A payoff diagram visualizes potential profit and loss at expiration under stated assumptions. It does not show every real-world factor, such as changing implied volatility or early assignment considerations. The lesson is to ask what the maximum loss, maximum gain, breakeven, and time sensitivity are before considering a strategy.",
        takeaways: ["Payoff diagrams are assumption-based tools.", "Maximum loss and breakeven belong in the first review.", "Options can add complexity as well as flexibility."],
        quiz: { question: "A payoff diagram is most useful for visualizing:", options: ["Possible profit and loss at expiration under assumptions", "Guaranteed intraday prices", "A company’s audit result", "A bank deposit guarantee"], answerIndex: 0, explanation: "Payoff diagrams clarify expiration outcomes, while real option pricing has additional variables." },
        source: cboeOptions,
      },
      {
        id: "trading-journal",
        title: "Process over outcome",
        duration: "5 min",
        objective: "Use a trading journal to improve a decision process rather than chase a single result.",
        body: "A trade can make or lose money for reasons that do not validate the original process. A concise journal records the thesis, setup, entry, planned invalidation, size, outcome, and a lesson. Reviewing a sample of decisions helps distinguish a repeatable process from a memorable result.",
        takeaways: ["Outcome alone is not a process score.", "A journal makes assumptions reviewable.", "Consistency and reflection reduce impulsive changes."],
        quiz: { question: "A useful trading journal should record:", options: ["Only winning trades", "The thesis, plan, outcome, and lesson", "Predictions without review", "Personal guarantees"], answerIndex: 1, explanation: "Documenting the decision and review makes the process observable, including on losing trades." },
        source: finraDayTrading,
      },
    ],
  },
];

export const totalLessons = courses.reduce((sum, course) => sum + course.lessons.length, 0);

export const dailyConcepts = [
  "A good plan names the evidence that would prove it wrong.",
  "A limit order may protect a price boundary, but it may not execute.",
  "Position size changes the impact of a mistake; it does not change the uncertainty.",
  "A chart pattern is an observation. A trade plan adds risk, size, and review.",
];
