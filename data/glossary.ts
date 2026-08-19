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

export const extendedGlossaryEntries: GlossaryEntry[] = [
  { term: "Alternative trading system (ATS)", definition: "An SEC-regulated trading system that can match securities orders while operating under an exemption from registering as a national securities exchange.", category: "Market mechanics", relatedCourse: "Market Structure & Trade Lifecycle" },
  { term: "Assets", definition: "Resources a company owns or controls that are expected to provide value, such as cash, inventory, equipment, or investments.", category: "Fundamental analysis", relatedCourse: "Company Reporting & Capital Structure" },
  { term: "Book value", definition: "The accounting value of a company’s equity after subtracting liabilities from assets, subject to the limits of accounting measurements.", category: "Fundamental analysis", relatedCourse: "Company Reporting & Capital Structure" },
  { term: "Broker-dealer", definition: "A firm that handles securities transactions for customers and may also trade from its own inventory, subject to applicable rules.", category: "Market mechanics", relatedCourse: "Market Structure & Trade Lifecycle" },
  { term: "Capital structure", definition: "The mix of financing claims a company uses, commonly including debt and different forms of equity.", category: "Fundamental analysis", relatedCourse: "Financial Systems" },
  { term: "Clearing agency", definition: "A registered market-infrastructure organization that helps compare, clear, and prepare securities transactions for settlement.", category: "Market mechanics", relatedCourse: "Market Structure & Trade Lifecycle" },
  { term: "Coupon", definition: "The stated interest payment rate on a bond, usually expressed as a percentage of face value.", category: "Fundamental analysis", relatedCourse: "Investment Vehicles & Instruments" },
  { term: "Credit spread", definition: "The difference in yield between a debt instrument and a chosen benchmark, often used as one indicator of perceived credit risk and liquidity conditions.", category: "Risk", relatedCourse: "Financial Systems" },
  { term: "Current assets", definition: "Assets a company expects to convert to cash, sell, or use within one year or its operating cycle.", category: "Fundamental analysis", relatedCourse: "Company Reporting & Capital Structure" },
  { term: "Current liabilities", definition: "Obligations a company expects to settle within one year or its operating cycle.", category: "Fundamental analysis", relatedCourse: "Company Reporting & Capital Structure" },
  { term: "Custody", definition: "The safeguarding and recordkeeping function for client assets and securities positions.", category: "Market mechanics", relatedCourse: "Market Structure & Trade Lifecycle" },
  { term: "Debt-to-equity ratio", definition: "A leverage ratio that compares a company’s debt with its shareholders’ equity under a stated accounting basis.", category: "Fundamental analysis", relatedCourse: "Financial Systems" },
  { term: "Dilution", definition: "A reduction in an existing shareholder’s proportional ownership when additional shares are issued, subject to the transaction’s terms and effects.", category: "Fundamental analysis", relatedCourse: "Company Reporting & Capital Structure" },
  { term: "Duration", definition: "A measure of a bond’s sensitivity to changes in interest rates, based on the timing and size of expected cash flows.", category: "Risk", relatedCourse: "Investment Vehicles & Instruments" },
  { term: "Enterprise value", definition: "A valuation framework that starts with equity market value and adjusts for debt, cash, and other claims according to the selected convention.", category: "Fundamental analysis", relatedCourse: "Fundamental Analysis" },
  { term: "Exchange", definition: "A regulated market venue where securities can be bought and sold under a defined rulebook.", category: "Market mechanics", relatedCourse: "Market Structure & Trade Lifecycle" },
  { term: "Free cash flow", definition: "A cash-flow measure often defined as operating cash flow less capital expenditures; definitions can vary and should be checked.", category: "Fundamental analysis", relatedCourse: "Company Reporting & Capital Structure" },
  { term: "Gross margin", definition: "Gross profit divided by revenue, showing the portion of revenue remaining after direct costs of sales under the company’s reporting method.", category: "Fundamental analysis", relatedCourse: "Company Reporting & Capital Structure" },
  { term: "Index", definition: "A calculated measure designed to represent the performance of a defined group of securities or other assets.", category: "Market mechanics", relatedCourse: "Macro & Cross-Asset Context" },
  { term: "Initial public offering (IPO)", definition: "The first public sale of a company’s shares, subject to the offering terms and securities-law disclosures.", category: "Market mechanics", relatedCourse: "Company Reporting & Capital Structure" },
  { term: "Liabilities", definition: "Amounts a company owes to others, including loans, supplier obligations, accrued expenses, and future performance obligations.", category: "Fundamental analysis", relatedCourse: "Company Reporting & Capital Structure" },
  { term: "Maturity", definition: "The date on which a debt instrument’s principal is scheduled to be repaid, subject to its contract terms.", category: "Fundamental analysis", relatedCourse: "Investment Vehicles & Instruments" },
  { term: "Money market fund", definition: "A type of pooled fund that generally invests in short-term debt instruments and has risks and rules distinct from a bank deposit account.", category: "Risk", relatedCourse: "Investment Vehicles & Instruments" },
  { term: "Mutual fund", definition: "A pooled investment vehicle that issues and redeems shares according to its structure and may hold a portfolio of assets.", category: "Fundamental analysis", relatedCourse: "Investment Vehicles & Instruments" },
  { term: "Operating margin", definition: "Operating income divided by revenue, showing operating profitability under a defined reporting basis.", category: "Fundamental analysis", relatedCourse: "Company Reporting & Capital Structure" },
  { term: "Primary market", definition: "The market in which an issuer sells newly created securities to raise capital.", category: "Market mechanics", relatedCourse: "Market Structure & Trade Lifecycle" },
  { term: "Real estate investment trust (REIT)", definition: "A company or trust structure that owns, finances, or operates income-producing real estate under specific legal and tax rules.", category: "Fundamental analysis", relatedCourse: "Investment Vehicles & Instruments" },
  { term: "Secondary market", definition: "The market in which existing securities are traded among investors after issuance.", category: "Market mechanics", relatedCourse: "Market Structure & Trade Lifecycle" },
  { term: "Settlement", definition: "The completion of a securities transaction through the exchange of securities and cash obligations under applicable rules.", category: "Market mechanics", relatedCourse: "Market Structure & Trade Lifecycle" },
  { term: "Shareholders’ equity", definition: "The residual interest in a company’s assets after liabilities are deducted; it represents the accounting claim of owners.", category: "Fundamental analysis", relatedCourse: "Company Reporting & Capital Structure" },
  { term: "Treasury stock", definition: "A company’s own shares that it has repurchased and holds, rather than shares currently outstanding with investors.", category: "Fundamental analysis", relatedCourse: "Company Reporting & Capital Structure" },
  { term: "Working capital", definition: "A liquidity measure commonly calculated as current assets minus current liabilities.", category: "Fundamental analysis", relatedCourse: "Company Reporting & Capital Structure" },
  { term: "Yield curve", definition: "A chart of yields across bonds of different maturities at a point in time, often used to describe the term structure of interest rates.", category: "Risk", relatedCourse: "Macro & Cross-Asset Context" },
];

export const specialistGlossaryEntries: GlossaryEntry[] = [
  { term: "American depositary receipt (ADR)", definition: "A negotiable receipt that represents an interest in shares of a foreign company through a depositary arrangement, subject to the program’s terms.", category: "Market mechanics", relatedCourse: "Global & Cross-Border" },
  { term: "Beneficial ownership", definition: "Direct or indirect voting power or investment power over a security, as defined under applicable SEC rules.", category: "Market mechanics", relatedCourse: "Issuance & Ownership" },
  { term: "Call risk", definition: "The risk that a callable bond will be redeemed before maturity, potentially requiring an investor to reinvest proceeds at a different rate.", category: "Risk", relatedCourse: "Municipal & Public Finance" },
  { term: "Country risk", definition: "The possibility that political, regulatory, economic, legal, or currency conditions in a country can affect an investment or issuer.", category: "Risk", relatedCourse: "Global & Cross-Border" },
  { term: "CUSIP", definition: "A unique nine-character identifier assigned to many financial instruments to help identify a specific security.", category: "Market mechanics", relatedCourse: "Market Data & Benchmarks" },
  { term: "Drawdown", definition: "The decline from a prior peak in a portfolio or security value over a defined period.", category: "Risk", relatedCourse: "Portfolio Measurement" },
  { term: "EMMA", definition: "The Municipal Securities Rulemaking Board’s Electronic Municipal Market Access system, which provides municipal-market data and disclosure documents.", category: "Market mechanics", relatedCourse: "Municipal & Public Finance" },
  { term: "Follow-on offering", definition: "An additional public securities offering by a company that has already completed an initial public offering.", category: "Fundamental analysis", relatedCourse: "Issuance & Ownership" },
  { term: "Free float", definition: "Shares that are available for public trading under a stated definition, rather than shares held by insiders or other restricted holders.", category: "Market mechanics", relatedCourse: "Market Data & Benchmarks" },
  { term: "Initial public offering (IPO)", definition: "The first public offering and sale of a company’s securities, typically accompanied by a registration statement and prospectus.", category: "Market mechanics", relatedCourse: "Issuance & Ownership" },
  { term: "Market capitalization", definition: "A commonly used measure of equity size, calculated as share price multiplied by shares outstanding under a stated convention.", category: "Fundamental analysis", relatedCourse: "Market Data & Benchmarks" },
  { term: "Municipal bond", definition: "A debt security issued by a state or local government, or related entity, with repayment sources and legal terms that vary by issue.", category: "Fundamental analysis", relatedCourse: "Municipal & Public Finance" },
  { term: "Official statement", definition: "A disclosure document that typically describes a municipal offering’s terms, risks, repayment sources, and other information at issuance.", category: "Fundamental analysis", relatedCourse: "Municipal & Public Finance" },
  { term: "Portfolio turnover", definition: "A measure of how frequently a portfolio’s holdings are bought and sold over a stated period; definitions may vary by provider.", category: "Fundamental analysis", relatedCourse: "Portfolio Measurement" },
  { term: "Price return", definition: "A return series that reflects price change while excluding the assumed reinvestment of distributions.", category: "Fundamental analysis", relatedCourse: "Market Data & Benchmarks" },
  { term: "Prospectus", definition: "A document that discloses information about a securities offering or registered fund, including stated objectives, risks, fees, and terms.", category: "Fundamental analysis", relatedCourse: "Issuance & Ownership" },
  { term: "Public float", definition: "The portion of a company’s shares held by public investors under the definition used for a particular reporting or market purpose.", category: "Market mechanics", relatedCourse: "Market Data & Benchmarks" },
  { term: "Reinvestment risk", definition: "The risk that cash received from a bond’s maturity, sale, or early redemption cannot be reinvested at an equivalent rate or under equivalent terms.", category: "Risk", relatedCourse: "Municipal & Public Finance" },
  { term: "SIPC", definition: "The Securities Investor Protection Corporation, which has a defined role in restoring eligible customer assets when a SIPC-member brokerage firm fails and assets are missing.", category: "Risk", relatedCourse: "Account Safeguards" },
  { term: "Total return", definition: "A return series that conventionally combines price change with the assumed reinvestment of distributions under stated assumptions.", category: "Fundamental analysis", relatedCourse: "Market Data & Benchmarks" },
  { term: "Treasury security", definition: "A debt security issued by the U.S. Treasury with terms that vary by instrument type and maturity.", category: "Fundamental analysis", relatedCourse: "Funds & Fixed Income" },
  { term: "Volatility", definition: "The size of observed price variation over a stated period; it is a historical description and not a forecast of future moves.", category: "Risk", relatedCourse: "Portfolio Measurement" },
  { term: "Yield to maturity", definition: "A bond-yield calculation that estimates a return if held to maturity under specified assumptions, including payment timing and price.", category: "Fundamental analysis", relatedCourse: "Municipal & Public Finance" },
];

export const operationsGlossaryEntries: GlossaryEntry[] = [
  { term: "ACATS", definition: "The Automated Customer Account Transfer Service, an electronic system used for many transfers of customer accounts between brokerage firms.", category: "Market mechanics", relatedCourse: "Account Portability" },
  { term: "Arbitration award", definition: "The written decision issued by arbitrators after an arbitration process, subject to the applicable forum rules and review procedures.", category: "Risk", relatedCourse: "Investor Recourse & Records" },
  { term: "Chapter 7 bankruptcy", definition: "A corporate bankruptcy process generally involving liquidation of assets to pay claims under the priority rules that apply.", category: "Risk", relatedCourse: "Securities Lending & Distress" },
  { term: "Chapter 11 bankruptcy", definition: "A corporate bankruptcy process focused on reorganization and debt restructuring under court supervision.", category: "Risk", relatedCourse: "Securities Lending & Distress" },
  { term: "Expense ratio", definition: "A fund’s annual operating expenses expressed as a percentage of its average net assets, as described in its disclosures.", category: "Fundamental analysis", relatedCourse: "Fund Disclosures & Costs" },
  { term: "Fee waiver", definition: "An agreement by a fund or adviser to reduce fees or expenses for a stated period or condition; the terms and potential recoupment should be checked.", category: "Fundamental analysis", relatedCourse: "Fund Disclosures & Costs" },
  { term: "Financial stability", definition: "The capacity of a financial system to keep providing financing and payment services even when it experiences adverse events or stress.", category: "Risk", relatedCourse: "Financial Stability" },
  { term: "Fire sale", definition: "A rapid sale of assets under funding or liquidity stress that can amplify price pressure and losses across connected institutions or markets.", category: "Risk", relatedCourse: "Financial Stability" },
  { term: "Funding risk", definition: "The possibility that a firm or vehicle cannot maintain needed funding when investors or lenders withdraw quickly, especially when assets are difficult to sell.", category: "Risk", relatedCourse: "Financial Stability" },
  { term: "Fund share class", definition: "A class of shares in the same mutual fund that can have different sales loads, operating expenses, or other fee arrangements.", category: "Fundamental analysis", relatedCourse: "Fund Disclosures & Costs" },
  { term: "Payment system", definition: "The network of institutions, rules, and infrastructure that facilitates transfers of value among consumers, businesses, investors, and issuers.", category: "Market mechanics", relatedCourse: "Payment & Settlement Infrastructure" },
  { term: "Securities lending", definition: "The temporary transfer of securities from a lender to a borrower for a fee, typically within an arrangement that addresses collateral and operational terms.", category: "Market mechanics", relatedCourse: "Securities Lending & Distress" },
  { term: "Shareholder fee", definition: "A fund fee charged directly to a shareholder, such as a sales load, redemption fee, exchange fee, or account fee, depending on the fund’s terms.", category: "Fundamental analysis", relatedCourse: "Fund Disclosures & Costs" },
  { term: "Trading delay", definition: "A delay in opening or resuming trading intended to support an orderly market process, often around an order imbalance or material news.", category: "Market mechanics", relatedCourse: "Trading Interruptions" },
  { term: "Trading halt", definition: "A temporary interruption in trading under an exchange or regulatory process, often to allow dissemination of material information or address market conditions.", category: "Market mechanics", relatedCourse: "Trading Interruptions" },
  { term: "Trading suspension", definition: "An SEC action that can suspend trading in a stock for a limited period when the Commission determines it is necessary for the public interest and investor protection.", category: "Market mechanics", relatedCourse: "Trading Interruptions" },
  { term: "Transfer Initiation Form", definition: "A form submitted to a receiving brokerage firm to begin an account-transfer process under the applicable procedures.", category: "Market mechanics", relatedCourse: "Account Portability" },
  { term: "Valuation pressure", definition: "A financial-stability concept describing asset prices that appear high relative to stated fundamentals or historical norms, rather than a timing signal.", category: "Risk", relatedCourse: "Financial Stability" },
];

export const technicalAnalysisGlossaryEntries: GlossaryEntry[] = [
  { term: "Average true range (ATR)", definition: "A volatility measure that summarizes the typical size of price ranges over a selected lookback period; it is a description of past movement, not a forecast.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Candlestick body", definition: "The portion of a candle between its open and close for the selected interval; the wicks show the interval’s high and low beyond that body.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Channel", definition: "A pair of roughly parallel reference lines or zones used to organize repeated price movement around a slope or range; the chosen anchors affect the drawing.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Divergence", definition: "A difference between the direction of price and an indicator over a selected period. It is an observation that needs context, not a stand-alone reversal prediction.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Exponential moving average (EMA)", definition: "A moving average that places more weight on recent observations according to its formula and selected lookback period.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Fibonacci retracement", definition: "A charting tool that applies selected ratios to a chosen price range to create reference levels; different anchors can produce different levels.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "False breakout", definition: "A move outside a watched range or zone that later returns inside it. The label is descriptive and does not guarantee the next direction.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "MACD", definition: "Moving Average Convergence Divergence, an indicator derived from relationships among selected moving averages and often displayed with a signal line or histogram.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Momentum", definition: "The pace and direction of price change over a stated lookback period. Momentum describes past movement under a chosen calculation basis.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "OHLC", definition: "Open, high, low, and close—the four common price observations summarized by a bar or candlestick for a selected interval.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Relative strength index (RSI)", definition: "A bounded oscillator calculated from selected price changes over a stated lookback. It is sensitive to settings and should not be treated as a directive.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Relative volume", definition: "Volume viewed against a defined comparison baseline, such as a recent average for the same session window. The comparison method must be made explicit.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Simple moving average (SMA)", definition: "The arithmetic average of a selected number of past observations, displayed as a rolling series that changes as each new observation enters the window.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Stochastic oscillator", definition: "An indicator comparing a selected close with a recent high-low range. Its output depends on the chosen lookback and smoothing settings.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Trendline", definition: "A line drawn through selected swing points to organize slope and structure. The line depends on the analyst’s chosen anchors and timeframe.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
  { term: "Volume confirmation", definition: "A process of comparing price movement with trading volume under a stated reference period. It can add context but does not establish causation or certainty.", category: "Technical analysis", relatedCourse: "Technical Analysis" },
];

export const allGlossaryEntries = [...glossaryEntries, ...extendedGlossaryEntries, ...specialistGlossaryEntries, ...operationsGlossaryEntries, ...technicalAnalysisGlossaryEntries];

export const glossarySource = {
  label: "Definitions are original learning summaries informed by Investor.gov and the Options Industry Council reference glossaries.",
  urls: ["https://www.investor.gov/introduction-investing/investing-basics/glossary", "https://www.optionseducation.org/referencelibrary/optionsglossary"],
};

export function searchGlossary(query: string, category: "All" | GlossaryCategory = "All") {
  const normalizedQuery = query.trim().toLowerCase();
  return allGlossaryEntries.filter((entry) => {
    const inCategory = category === "All" || entry.category === category;
    const searchable = `${entry.term} ${entry.definition} ${entry.relatedCourse}`.toLowerCase();
    return inCategory && searchable.includes(normalizedQuery);
  });
}
