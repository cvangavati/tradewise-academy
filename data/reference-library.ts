export type ReferenceSource = { label: string; url: string };
export type ReferenceTopic = { id: string; title: string; summary: string; keywords: string[]; source: ReferenceSource };
export type ReferenceDomain = { id: string; title: string; description: string; accent: string; topics: ReferenceTopic[] };

const investorGov: ReferenceSource = { label: "Investor.gov — How Stock Markets Work", url: "https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work" };
const participants: ReferenceSource = { label: "Investor.gov — Market Participants", url: "https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/market-participants" };
const secStatements: ReferenceSource = { label: "SEC — A Beginner’s Guide to Financial Statements", url: "https://www.sec.gov/about/reports-publications/investorpubsbegfinstmtguide" };
const edgar: ReferenceSource = { label: "Investor.gov — Using EDGAR to Research Investments", url: "https://www.investor.gov/introduction-investing/getting-started/researching-investments/using-edgar-research-investments" };
const finraCosts: ReferenceSource = { label: "FINRA — Fees and Commissions", url: "https://www.finra.org/investors/investing/investing-basics/fees-commissions" };
const finraActions: ReferenceSource = { label: "FINRA — Corporate Actions by Public Companies", url: "https://www.finra.org/investors/insights/corporate-actions-public-companies-what-you-should-know" };
const etfs: ReferenceSource = { label: "Investor.gov — Exchange-Traded Funds", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/mutual-funds-and-exchange-traded-2" };
const reits: ReferenceSource = { label: "Investor.gov — Real Estate Investment Trusts", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/real-estate-investment-trusts-reits" };
const cftc: ReferenceSource = { label: "CFTC — Customer Education and Outreach", url: "https://www.cftc.gov/About/CFTCOrganization/OCEO" };
const fed: ReferenceSource = { label: "Federal Reserve — Monetary Policy", url: "https://www.federalreserve.gov/aboutthefed/fedexplained/monetary-policy.htm" };
const fraud: ReferenceSource = { label: "Investor.gov — Avoiding Investment Fraud", url: "https://www.investor.gov/protect-your-investments/fraud/how-avoid-fraud/what-you-can-do-avoid-investment-fraud" };
const ownership: ReferenceSource = { label: "Investor.gov — Schedules 13D and 13G", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/schedules-13d-and-13g" };
const sipc: ReferenceSource = { label: "SIPC — What SIPC Protects", url: "https://www.sipc.org/for-investors/what-sipc-protects" };
const msrb: ReferenceSource = { label: "MSRB — Municipal Bond Investment Risks", url: "https://www.msrb.org/Education/Municipal-Bond-Investment-Risks" };
const finraShort: ReferenceSource = { label: "FINRA — Short Interest", url: "https://www.finra.org/investors/insights/short-interest" };

const topic = (id: string, title: string, summary: string, keywords: string[], source: ReferenceSource): ReferenceTopic => ({ id, title, summary, keywords, source });

export const referenceDomains: ReferenceDomain[] = [
  {
    id: "market-system", title: "Market system", description: "How securities are issued, traded, cleared, recorded, and supervised.", accent: "#007C78", topics: [
      topic("issuer-public-company", "Issuers and public companies", "An issuer raises capital by offering securities; a public company reports information under the disclosure rules that apply to it.", ["issuer", "public company", "securities"], edgar),
      topic("primary-secondary-market", "Primary and secondary markets", "Primary markets create and sell newly issued securities. Secondary markets are where existing securities trade among investors.", ["IPO", "issuance", "secondary"], investorGov),
      topic("exchanges-ats", "Exchanges and alternative trading systems", "Registered exchanges and alternative trading systems are distinct venues through which securities may trade under different structures and rules.", ["exchange", "ATS", "venue"], participants),
      topic("broker-dealer-role", "Broker-dealers", "Broker-dealers handle transactions for customers and may trade from firm inventory, subject to applicable rules and duties.", ["broker", "dealer", "routing"], participants),
      topic("clearing-settlement", "Clearing and settlement", "Execution matches an order; clearing prepares obligations; settlement completes the exchange of cash and securities under applicable rules.", ["clearing", "settlement", "trade lifecycle"], participants),
      topic("custody-transfer-agents", "Custody and transfer agents", "Custody safeguards positions and records, while transfer agents maintain issuer security-holder records and process ownership changes.", ["custody", "transfer agent", "ownership records"], participants),
    ],
  },
  {
    id: "execution-accounts", title: "Accounts & execution", description: "Account types, order instructions, costs, and the practical mechanics of placing a trade.", accent: "#3C5D95", topics: [
      topic("cash-margin-accounts", "Cash and margin accounts", "A cash account uses available cash. A margin account can involve borrowed funds and carries additional requirements and loss pathways.", ["cash account", "margin", "borrowing"], investorGov),
      topic("market-limit-stop", "Market, limit, and stop orders", "Order types prioritize different objectives: immediacy, price boundaries, or trigger conditions. Each has execution trade-offs.", ["market order", "limit order", "stop order"], investorGov),
      topic("bid-ask-spread", "Bid, ask, and spread", "The bid is displayed buying interest and the ask is displayed selling interest. The gap between them is one form of trading friction.", ["bid", "ask", "spread"], investorGov),
      topic("liquidity-slippage", "Liquidity and slippage", "Liquidity concerns the ability to transact without large price effects; slippage describes fills that differ from an expected price under fast or thin conditions.", ["liquidity", "slippage", "execution"], investorGov),
      topic("fees-commission", "Fees, commissions, and expenses", "Costs can include transaction charges, advisory fees, and ongoing fund or account expenses; zero-commission trading does not mean zero costs.", ["commission", "expense ratio", "markup"], finraCosts),
      topic("short-selling", "Short selling and short interest", "Short selling involves selling stock not owned through a margin account. Short interest is a dated position snapshot, not the same as daily short-sale volume.", ["short sale", "short interest", "margin"], { label: "FINRA — Short Interest", url: "https://www.finra.org/investors/insights/short-interest" }),
    ],
  },
  {
    id: "company-analysis", title: "Company analysis", description: "A structured way to read business models, statements, disclosures, valuation assumptions, and capital structure.", accent: "#7652A9", topics: [
      topic("business-model", "Business model", "Start with how a company earns revenue, its major costs, customer dependencies, competitive context, and the conditions that could change them.", ["revenue", "customers", "competition"], secStatements),
      topic("income-statement", "Income statement", "The income statement reports revenue, expenses, and profit or loss over a period. It answers a different question from the balance sheet or cash-flow statement.", ["revenue", "margin", "earnings"], secStatements),
      topic("balance-sheet", "Balance sheet", "The balance sheet is a point-in-time snapshot of assets, liabilities, and shareholders’ equity.", ["assets", "liabilities", "equity"], secStatements),
      topic("cash-flow-statement", "Cash-flow statement", "Cash-flow reporting explains cash movement through operating, investing, and financing activities over a period.", ["operating cash flow", "capex", "financing"], secStatements),
      topic("capital-structure", "Capital structure", "A company’s mix of debt and equity claims influences financing costs, flexibility, dilution, and the hierarchy of claims in stress.", ["debt", "equity", "leverage"], secStatements),
      topic("valuation-framework", "Valuation frameworks", "Valuation compares price with assumption-based estimates of economic value. Growth, margins, cash generation, debt, and discount rates are inputs, not certainties.", ["P/E", "enterprise value", "DCF"], secStatements),
    ],
  },
  {
    id: "disclosures-corporate-events", title: "Disclosures & corporate events", description: "How to use primary filings and understand events that change company structure or shareholder context.", accent: "#B66A22", topics: [
      topic("edgar-research", "EDGAR research", "EDGAR provides free public access to company and fund filings. Search by company name, ticker, or fund to locate reported information.", ["EDGAR", "filings", "primary source"], edgar),
      topic("forms-10k-10q-8k", "10-K, 10-Q, and 8-K", "Annual reports, quarterly reports, and current reports disclose different periods and material events. Read the relevant period and definitions.", ["10-K", "10-Q", "8-K"], edgar),
      topic("proxy-insider-ownership", "Proxies, insiders, and ownership", "Proxy filings can describe shareholder votes, compensation, and governance. Other forms disclose specified insider and beneficial-ownership information.", ["DEF 14A", "Form 4", "13D"], edgar),
      topic("stock-split-reverse", "Stock and reverse splits", "A split changes share count and per-share price proportionally; a reverse split reduces share count and raises per-share price proportionally.", ["stock split", "reverse split", "shares"], finraActions),
      topic("dividends-rights-offerings", "Dividends and rights offerings", "Dividends distribute cash or shares under stated terms. Rights offerings can let existing holders purchase additional shares on defined terms and timelines.", ["dividend", "ex-date", "rights offering"], finraActions),
      topic("mergers-liquidations", "Mergers, acquisitions, and liquidation", "Business combinations change ownership or control. In liquidation, creditors generally have priority over common shareholders for available proceeds.", ["M&A", "tender offer", "liquidation"], finraActions),
    ],
  },
  {
    id: "funds-fixed-income", title: "Funds & fixed income", description: "Pooled vehicles, debt instruments, real-estate structures, and the questions that distinguish their risk profiles.", accent: "#176E75", topics: [
      topic("mutual-funds", "Mutual funds", "Mutual funds pool money to invest under a stated strategy. Their portfolio, fee table, risks, and share-transaction mechanics are part of the product structure.", ["mutual fund", "NAV", "prospectus"], etfs),
      topic("etfs", "Exchange-traded funds", "ETFs pool holdings and trade on exchanges. Their market price may be above or below net asset value, and their exposures depend on their holdings and rules.", ["ETF", "NAV", "premium discount"], etfs),
      topic("indexes-active-passive", "Indexes and fund management", "Index funds aim to track a selected index before fees. Active funds pursue a stated objective through manager-selected holdings and trades.", ["index fund", "passive", "active management"], etfs),
      topic("bonds-credit", "Bonds and credit", "A bond is a lending claim with payment terms, maturity, issuer-credit considerations, rate sensitivity, and liquidity characteristics.", ["bond", "coupon", "yield"], { label: "Investor.gov — Investment Products", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products" }),
      topic("duration-yield-curve", "Duration and yield curve", "Duration summarizes interest-rate sensitivity for a bond under stated assumptions. A yield curve compares yields across maturities at a point in time.", ["duration", "yield curve", "rates"], fed),
      topic("reits", "REITs", "REITs provide exposure to income-producing real estate. Publicly traded and non-traded REITs can differ materially in liquidity, valuation transparency, fees, and conflicts.", ["REIT", "real estate", "liquidity"], reits),
    ],
  },
  {
    id: "derivatives-advanced", title: "Derivatives & advanced risk", description: "Contract vocabulary and risk boundaries for options, futures, leverage, and complex instruments.", accent: "#9C3D70", topics: [
      topic("options-contracts", "Options contracts", "Calls and puts define rights tied to an underlying asset under stated strike, expiration, and premium terms. Time and volatility can matter alongside price.", ["call", "put", "strike", "premium"], { label: "Cboe Options Institute — Options 101", url: "https://www.cboe.com/en/optionsinstitute/courses/options101/" }),
      topic("payoff-risk", "Payoff and assignment awareness", "Payoff diagrams summarize stated expiration outcomes but do not capture every practical consideration, including volatility changes and assignment features.", ["payoff", "breakeven", "assignment"], { label: "Cboe Options Institute — Options 101", url: "https://www.cboe.com/en/optionsinstitute/courses/options101/" }),
      topic("futures-contracts", "Futures contracts", "Futures are standardized contracts with margin, leverage, and time-limited obligations. Product-specific terms and risk controls are essential to understanding them.", ["futures", "contract", "margin"], cftc),
      topic("commodities", "Commodities and commodity derivatives", "Commodity exposure can be obtained through different structures, each with distinct contract, storage, roll, liquidity, and leverage considerations.", ["commodities", "roll", "spot"], cftc),
      topic("leverage-margin-calls", "Leverage and margin calls", "Borrowed exposure can amplify gains and losses. Margin requirements can change, and a margin call may require more collateral or position reduction.", ["leverage", "margin call", "collateral"], cftc),
      topic("complexity-fraud", "Complexity and fraud risk", "Complexity, time pressure, guaranteed-return claims, and opaque terms can be risk signals. Learn the structure before considering any product.", ["fraud", "guaranteed returns", "complexity"], cftc),
    ],
  },
  {
    id: "macro-context", title: "Macro & cross-asset context", description: "Economic conditions and policy channels that can inform questions without producing a mechanical market forecast.", accent: "#9B4870", topics: [
      topic("central-bank-role", "Central bank role", "In the United States, the Federal Reserve sets the stance of monetary policy to influence short-term rates and financial conditions in pursuit of its stated goals.", ["Federal Reserve", "monetary policy", "central bank"], fed),
      topic("inflation", "Inflation", "Inflation is a broad rise in prices. It can affect household purchasing power, business inputs, wage pressure, and policy decisions in uneven ways.", ["inflation", "prices", "purchasing power"], fed),
      topic("interest-rates", "Interest rates", "Rates influence borrowing costs, returns on some cash and debt instruments, and valuation assumptions. Effects vary by balance sheet and time horizon.", ["interest rate", "discount rate", "borrowing"], fed),
      topic("economic-growth", "Economic growth", "Growth measures describe changes in economic activity. The link from aggregate growth to a particular company can be indirect and uncertain.", ["GDP", "demand", "economy"], fed),
      topic("currency-commodities", "Currency and commodities", "Currencies and commodities can reflect trade, policy, supply, demand, and risk conditions. Cross-asset relationships can shift by regime.", ["currency", "commodity", "correlation"], cftc),
      topic("sectors-cycles", "Sectors and business cycles", "Sector frameworks group companies by activity, but company debt, customers, margins, and cost structures can produce very different outcomes within a sector.", ["sector", "cycle", "relative strength"], fed),
    ],
  },
  {
    id: "governance-protection", title: "Governance & protection", description: "Research discipline, regulation, conflict awareness, and fraud prevention for more informed market participation.", accent: "#4666B0", topics: [
      topic("sec-finra-roles", "SEC, FINRA, and SROs", "The SEC is a federal regulator. FINRA and exchanges are examples of self-regulatory organizations with defined oversight and rule-enforcement roles.", ["SEC", "FINRA", "SRO"], participants),
      topic("prospectus-disclosures", "Prospectuses and disclosures", "A prospectus and recurring disclosures describe a product, company, risks, fees, and stated objectives. Read the actual document and its date.", ["prospectus", "disclosure", "risk factors"], edgar),
      topic("conflicts-compensation", "Conflicts and compensation", "Ask how a broker, adviser, fund manager, or product distributor is paid and whether incentives could shape the recommendation or transaction.", ["conflict", "compensation", "fees"], finraCosts),
      topic("fraud-red-flags", "Fraud red flags", "Unsolicited pitches, pressure to act immediately, opaque information, and claims of guaranteed or extraordinary returns are warning signs worth investigating.", ["fraud", "scam", "red flags"], fraud),
      topic("independent-research", "Independent research", "Use primary disclosures and independent sources. Do not treat posts, messages, or company promotion as sufficient evidence on their own.", ["research", "EDGAR", "verification"], fraud),
      topic("risk-process", "Risk process and review", "A disciplined process states a thesis, evidence, uncertainty, exposure, invalidation condition, and a post-decision review. It does not guarantee an outcome.", ["risk", "thesis", "journal"], fraud),
    ],
  },
  {
    id: "issuance-ownership", title: "Issuance & ownership", description: "How companies raise capital, disclose ownership, and involve shareholders in governance.", accent: "#5E65A8", topics: [
      topic("ipo-registration", "Initial public offerings", "An IPO is a company’s first public offer and sale of securities. A registration statement and prospectus describe the company and offering under the applicable framework.", ["IPO", "registration statement", "prospectus"], edgar),
      topic("follow-on-offerings", "Follow-on offerings", "A reporting company can register additional securities offerings. The structure, use of proceeds, dilution effects, and timing are research questions rather than price signals.", ["follow-on", "secondary offering", "dilution"], edgar),
      topic("exempt-offerings", "Exempt offerings and crowdfunding", "Some offerings use exemptions with different disclosure and eligibility conditions. Understand the legal structure and available information before interpreting the label.", ["Regulation A", "crowdfunding", "private offering"], edgar),
      topic("beneficial-ownership", "Beneficial ownership reports", "Schedules 13D and 13G can disclose specified beneficial ownership. They are reports of ownership and related information, not a recommendation to transact.", ["13D", "13G", "beneficial owner"], ownership),
      topic("insider-forms", "Insider transaction forms", "Forms 3, 4, and 5 are used for specified insider ownership and transaction disclosures. A filing’s timing, role, and context matter when reading it.", ["Form 3", "Form 4", "Form 5"], edgar),
      topic("proxy-voting", "Proxy statements and voting", "Proxy materials describe matters put to shareholder vote and may include governance, compensation, and ownership information.", ["proxy", "DEF 14A", "shareholder vote"], edgar),
    ],
  },
  {
    id: "market-data-benchmarks", title: "Market data & benchmarks", description: "How prices, volume, indexes, and reported short data can be described without confusing data with a signal.", accent: "#197C83", topics: [
      topic("quote-fields", "Quote fields and timestamps", "A quote can include bid, ask, last trade, volume, and a time reference. The field definition and time of observation are essential context.", ["quote", "bid", "ask", "timestamp"], investorGov),
      topic("price-volume", "Price and volume", "Price records the level at which a security last traded, while volume records the quantity traded over a stated interval. Neither explains motivation on its own.", ["price", "volume", "turnover"], investorGov),
      topic("market-cap-float", "Market capitalization and float", "Market capitalization is commonly calculated from share price and shares outstanding. Public float refers to shares available for public trading under a stated definition.", ["market cap", "float", "shares outstanding"], edgar),
      topic("index-construction", "Index construction", "An index follows published inclusion, weighting, rebalancing, and calculation rules. Different weighting methods can create different exposures.", ["index", "weighting", "rebalancing"], etfs),
      topic("price-total-return", "Price return and total return", "A price-return series tracks price change. A total-return series conventionally incorporates reinvested distributions under stated assumptions; compare like with like.", ["total return", "price return", "benchmark"], etfs),
      topic("short-data-interpretation", "Short interest and short-sale volume", "Short interest is a dated snapshot of open short positions, while short-sale volume reflects transaction volume under a different methodology. They should not be treated as interchangeable.", ["short interest", "short volume", "data methodology"], finraShort),
    ],
  },
  {
    id: "portfolio-measurement", title: "Portfolio measurement", description: "Concepts for describing allocation, concentration, volatility, and process without personalized allocation recommendations.", accent: "#6B7B33", topics: [
      topic("goals-time-horizon", "Goals and time horizon", "An investment objective, time horizon, liquidity needs, and risk tolerance provide context for evaluating an instrument’s fit. They are individual considerations, not a product prescription.", ["goal", "time horizon", "liquidity"], { label: "Investor.gov — Investment Products", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products" }),
      topic("asset-allocation", "Asset allocation", "Asset allocation describes how a portfolio is divided among broad asset classes. It changes the mix of risks and return drivers, but does not eliminate loss risk.", ["asset allocation", "stocks", "bonds"], { label: "Investor.gov — Investment Products", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products" }),
      topic("diversification", "Diversification", "Diversification spreads exposure across investments with different characteristics. It can reduce concentration risk but cannot guarantee positive performance.", ["diversification", "concentration", "exposure"], { label: "Investor.gov — Investment Products", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products" }),
      topic("correlation", "Correlation and common exposures", "Correlation describes how two return series moved over a selected period. Relationships can shift, especially when stress changes market behavior.", ["correlation", "regime", "risk"], fed),
      topic("volatility-drawdown", "Volatility and drawdown", "Volatility describes the size of observed price variation. Drawdown describes the decline from a previous peak over a defined period. Both depend on the chosen window.", ["volatility", "drawdown", "risk measure"], fraud),
      topic("benchmark-review", "Benchmarking and review", "A benchmark comparison should identify the benchmark, period, fees, risk profile, and whether the comparison measures the same objective or exposure.", ["benchmark", "performance", "fees"], finraCosts),
    ],
  },
  {
    id: "global-cross-border", title: "Global & cross-border", description: "International issuer, currency, market-access, and cross-border disclosure concepts for context-aware research.", accent: "#6C5AA6", topics: [
      topic("foreign-private-issuers", "Foreign private issuers", "Some companies organized outside the United States report on different SEC forms, such as 20-F and 6-K, under the applicable foreign-private-issuer framework.", ["20-F", "6-K", "foreign private issuer"], edgar),
      topic("adr-ownership", "Depositary receipts", "A depositary receipt can represent an interest in shares of a foreign company through a depositary arrangement. Terms, voting rights, fees, and currency exposure may differ by program.", ["ADR", "depositary receipt", "foreign shares"], edgar),
      topic("currency-exposure", "Currency exposure", "Cross-border investments can be affected by changes in the value of currencies relative to the investor’s home currency, alongside company and market factors.", ["foreign exchange", "currency", "translation"], cftc),
      topic("country-regulatory-risk", "Country and regulatory context", "Legal systems, disclosure practices, capital controls, taxation, and market-access rules can differ across jurisdictions and can change over time.", ["country risk", "regulation", "cross-border"], edgar),
      topic("global-funds", "Global funds and exposures", "A global fund can provide access to multiple markets, but its holdings, currency risks, country concentrations, fees, and underlying liquidity remain relevant.", ["international fund", "country exposure", "ETF"], etfs),
      topic("market-hours-settlement", "Market hours and settlement differences", "Trading calendars, market hours, holidays, settlement practices, and local-currency conventions differ across venues and can affect execution and operational expectations.", ["market hours", "settlement", "time zone"], participants),
    ],
  },
  {
    id: "municipal-public-finance", title: "Municipal & public finance", description: "Municipal-bond structures, official disclosures, and risks without personal tax or bond recommendations.", accent: "#A16827", topics: [
      topic("municipal-bonds", "Municipal bonds", "Municipal securities are debt instruments issued by state and local governments or related entities. Repayment sources and legal pledges can differ by issue.", ["municipal bond", "issuer", "repayment"], msrb),
      topic("official-statements", "Official statements", "An official statement typically describes a municipal offering’s terms, sources of payment, risks, and other disclosures as of issuance.", ["official statement", "disclosure", "municipal"], msrb),
      topic("municipal-credit", "Municipal credit and default risk", "Credit/default risk concerns whether the issuer or obligor can make principal and interest payments when due. Ratings are opinions, not recommendations.", ["credit risk", "default", "rating"], msrb),
      topic("municipal-rate-risk", "Municipal interest-rate risk", "When prevailing rates change, a fixed-rate bond’s market value can change. Sensitivity can differ by maturity and other features.", ["interest rate risk", "maturity", "bond price"], msrb),
      topic("municipal-call-reinvestment", "Call and reinvestment risk", "Callable bonds may be redeemed before maturity. Reinvestment risk is the risk that proceeds cannot be reinvested at a similar rate.", ["callable bond", "reinvestment", "redemption"], msrb),
      topic("municipal-liquidity", "Municipal liquidity and continuing disclosure", "Some bonds can have limited secondary-market trading. Continuing disclosures can provide updated financial, operating, and event information after issuance.", ["liquidity", "EMMA", "continuing disclosure"], msrb),
    ],
  },
  {
    id: "account-safeguards", title: "Account safeguards", description: "Custody, statement-review, protection boundaries, identity awareness, and account-security concepts.", accent: "#1E6478", topics: [
      topic("sipc-scope", "SIPC protection scope", "SIPC addresses missing eligible customer cash and securities when a SIPC-member brokerage firm fails financially. It is not protection against investment-market declines.", ["SIPC", "broker failure", "missing assets"], sipc),
      topic("sipc-fdic-difference", "SIPC and bank-deposit protection", "SIPC protection for brokerage custody is different from FDIC deposit insurance. Both have defined scopes and do not guarantee an investment’s market value.", ["SIPC", "FDIC", "custody"], sipc),
      topic("account-statements", "Account statements and confirmations", "Review statements and trade confirmations for positions, cash, activity, fees, and unexpected changes. Records are a starting point for questions and documentation.", ["statement", "confirmation", "records"], finraCosts),
      topic("broker-adviser-check", "Checking financial professionals", "Use official registration and disciplinary-history resources to verify a broker, adviser, or firm before relying on a sales pitch or relationship.", ["BrokerCheck", "registration", "disciplinary history"], fraud),
      topic("identity-phishing", "Identity and phishing awareness", "Unsolicited messages, urgent payment requests, and requests for credentials can be warning signs. Verify contact channels independently.", ["phishing", "identity", "social engineering"], fraud),
      topic("protection-boundaries", "Protection boundaries", "Protection programs, disclosures, and regulators have specific roles. Learn what each covers, the relevant conditions, and what market or advice losses remain outside the scope.", ["coverage", "risk", "investor protection"], sipc),
    ],
  },
];

export const referenceTopicCount = referenceDomains.reduce((sum, domain) => sum + domain.topics.length, 0);

export function searchReferenceTopics(query: string, domainId: string | "All" = "All") {
  const normalized = query.trim().toLowerCase();
  return referenceDomains
    .filter((domain) => domainId === "All" || domain.id === domainId)
    .flatMap((domain) => domain.topics.map((item) => ({ ...item, domain })))
    .filter(({ title, summary, keywords }) => `${title} ${summary} ${keywords.join(" ")}`.toLowerCase().includes(normalized));
}
