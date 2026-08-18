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
];

export const referenceTopicCount = referenceDomains.reduce((sum, domain) => sum + domain.topics.length, 0);

export function searchReferenceTopics(query: string, domainId: string | "All" = "All") {
  const normalized = query.trim().toLowerCase();
  return referenceDomains
    .filter((domain) => domainId === "All" || domain.id === domainId)
    .flatMap((domain) => domain.topics.map((item) => ({ ...item, domain })))
    .filter(({ title, summary, keywords }) => `${title} ${summary} ${keywords.join(" ")}`.toLowerCase().includes(normalized));
}
