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
const taxAccounts: ReferenceSource = { label: "Investor.gov — Tax-Advantaged Accounts", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-accounts/tax-advantaged-accounts" };
const filingGuide: ReferenceSource = { label: "Investor.gov — How to Read a 10-K/10-Q", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/how-read" };
const sentiment: ReferenceSource = { label: "FINRA — Social Sentiment Investing Tools", url: "https://www.finra.org/investors/insights/social-sentiment-investing-tools" };
const halts: ReferenceSource = { label: "FINRA — Trading Halts, Delays and Suspensions", url: "https://www.finra.org/investors/investing/investment-products/stocks/trading-halts-delays-suspensions" };
const transfers: ReferenceSource = { label: "FINRA — Customer Account Transfers", url: "https://www.finra.org/rules-guidance/key-topics/customer-account-transfers" };
const fundFees: ReferenceSource = { label: "Investor.gov — Mutual Fund and ETF Fees and Expenses", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/mutual-fund-and-etf-fees-and-expenses-investor-bulletin" };
const payments: ReferenceSource = { label: "Federal Reserve — Payment Systems", url: "https://www.federalreserve.gov/aboutthefed/fedexplained/payment-systems.htm" };
const stability: ReferenceSource = { label: "Federal Reserve — Financial Stability Framework", url: "https://www.federalreserve.gov/publications/2026-may-financial-stability-report-purpose-and-framework.htm" };
const arbitration: ReferenceSource = { label: "FINRA — Arbitration Process", url: "https://www.finra.org/arbitration-mediation/about/arbitration-process" };
const complaints: ReferenceSource = { label: "FINRA — File a Complaint", url: "https://www.finra.org/investors/need-help/file-a-complaint" };
const lending: ReferenceSource = { label: "Investor.gov — Securities Lending", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/securities-lending" };
const bankruptcy: ReferenceSource = { label: "Investor.gov — Bankruptcy for a Public Company", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-84" };

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
  {
    id: "account-structures", title: "Account structures", description: "Account purpose, custody, tax-aware vocabulary, and disclosure concepts without individualized tax planning.", accent: "#2D7D5E", topics: [
      topic("tax-advantaged-accounts", "Tax-advantaged account structures", "Tax-advantaged accounts can have specified features such as deductions, tax-deferred growth, or tax-free withdrawals for stated purposes. Rules and consequences depend on the account and individual facts.", ["tax advantaged", "account", "retirement"], taxAccounts),
      topic("retirement-accounts", "Retirement account vocabulary", "Retirement account types have distinct eligibility, contribution, withdrawal, and tax rules. Learn the structure before treating an account name as a recommendation.", ["IRA", "401(k)", "retirement"], taxAccounts),
      topic("education-health-accounts", "Education and health account concepts", "Some tax-advantaged structures are designed for qualified education, health, or disability-related expenses. Their permitted uses and tax treatment are rule-based.", ["529", "HSA", "ABLE"], taxAccounts),
      topic("tax-lots-cost-basis", "Tax lots and cost basis", "A tax lot records the acquisition details for a quantity of securities. Cost-basis records can affect reporting, but individualized tax treatment requires appropriate professional guidance.", ["tax lot", "cost basis", "recordkeeping"], taxAccounts),
      topic("cash-sweep", "Cash sweep arrangements", "A brokerage account may use a stated arrangement for uninvested cash. Review the program terms, coverage boundaries, interest, and liquidity conditions.", ["cash sweep", "brokerage cash", "terms"], sipc),
      topic("beneficiary-designations", "Beneficiary designations", "Some accounts allow beneficiary designations that can affect transfer arrangements. Keep account documents current and seek qualified advice for personal legal or tax questions.", ["beneficiary", "account transfer", "estate"], taxAccounts),
    ],
  },
  {
    id: "filing-analysis", title: "Filing analysis", description: "A section-by-section framework for researching reported company information without converting disclosure into a trade call.", accent: "#8B5A2B", topics: [
      topic("business-description", "Business description", "A 10-K business section describes products, services, markets, competition, and operating context. Begin by mapping how the company says it earns revenue.", ["10-K", "business", "operations"], filingGuide),
      topic("risk-factors", "Risk factors", "Risk-factor disclosures identify significant risks the company describes. Compare them across periods and avoid assuming their order is a numerical probability ranking.", ["risk factors", "disclosure", "uncertainty"], filingGuide),
      topic("mda", "Management discussion and analysis", "MD&A provides management’s discussion of results, liquidity, capital resources, trends, uncertainties, and critical accounting judgments.", ["MD&A", "liquidity", "management"], filingGuide),
      topic("market-risk-disclosure", "Market-risk disclosure", "A 10-K can include information about exposure to interest-rate, currency, commodity, or equity-price risk under stated methods and assumptions.", ["market risk", "currency", "interest rates"], filingGuide),
      topic("notes-audit", "Notes and audit report", "Financial-statement notes explain accounting policies and amounts. The auditor’s report and internal-control disclosures provide context for how statements were presented.", ["financial notes", "audit", "controls"], filingGuide),
      topic("non-gaap", "GAAP and non-GAAP measures", "Non-GAAP measures differ from the most comparable GAAP measures under a company’s adjustments. Understand the reconciliation, definitions, and limits before comparison.", ["GAAP", "non-GAAP", "reconciliation"], filingGuide),
    ],
  },
  {
    id: "decision-hygiene", title: "Decision hygiene", description: "Behavioral guardrails, source quality, and process discipline for resisting impulsive or misleading market narratives.", accent: "#A64565", topics: [
      topic("source-quality", "Source quality and provenance", "Evaluate who created information, when it was published, what incentives may exist, and whether a primary disclosure can confirm the claim.", ["source", "provenance", "verification"], sentiment),
      topic("social-sentiment", "Social sentiment tools", "Social-sentiment tools can aggregate posts or assign ratings, but the underlying information can be inaccurate, incomplete, stale, or misleading.", ["sentiment", "social media", "tool"], sentiment),
      topic("impulsive-decisions", "Impulsive decision risk", "Urgent headlines, crowd enthusiasm, and real-time feeds can encourage emotionally driven decisions. A pre-defined research process can slow the response.", ["emotion", "impulse", "process"], sentiment),
      topic("conflicts-promotions", "Promotions and conflicts", "Promotional material and crowd discussion can contain conflicts, incentives, or hidden agendas. Review disclosures and independent sources before treating a claim as evidence.", ["conflict", "promotion", "disclosure"], sentiment),
      topic("time-horizon-discipline", "Time-horizon discipline", "A research process should distinguish short-lived information from a learner’s stated time horizon. A topic’s immediacy does not establish its long-term relevance.", ["time horizon", "research", "discipline"], sentiment),
      topic("decision-journal", "Decision journal", "A decision journal records the question, evidence, assumptions, uncertainty, and later review. It supports learning from process rather than retrospective storytelling.", ["journal", "assumptions", "review"], sentiment),
    ],
  },
  {
    id: "quant-data-literacy", title: "Quant & data literacy", description: "Measurement, modeling, data-quality, and backtest vocabulary for evaluating claims without presenting a trading system.", accent: "#4066B0", topics: [
      topic("data-definition", "Data definitions and units", "Before comparing a metric, confirm the definition, units, currency, reporting period, adjustment basis, and whether it is an estimate or reported value.", ["definition", "units", "period"], filingGuide),
      topic("adjusted-unadjusted", "Adjusted and unadjusted series", "Prices and financial series can use different adjustment conventions. Mixing bases across splits, dividends, or reporting adjustments can create misleading comparisons.", ["adjusted", "unadjusted", "split"], finraActions),
      topic("sampling-window", "Sampling windows", "A measurement depends on its selected time window, frequency, and sample. A short or unusual period can change observed results materially.", ["sample", "window", "frequency"], sentiment),
      topic("benchmark-bias", "Benchmark selection bias", "A benchmark comparison needs a clearly defined, relevant benchmark and a consistent period, exposure, fee basis, and return convention.", ["benchmark", "bias", "comparison"], finraCosts),
      topic("correlation-regimes", "Correlation and regime change", "Relationships between assets can change across market environments. Historical correlation describes a past sample, not a promise of diversification in future stress.", ["correlation", "regime", "diversification"], fed),
      topic("backtest-boundaries", "Backtest boundaries", "Any historical test must avoid using information unavailable at the decision date, define its universe and costs, and distinguish a result from a forecast.", ["backtest", "look-ahead bias", "methodology"], sentiment),
    ],
  },
  {
    id: "trading-interruptions", title: "Trading interruptions", description: "Halt, delay, suspension, resumption, and information-dissemination concepts for reading disrupted trading conditions.", accent: "#A24D3D", topics: [
      topic("trading-halts", "Trading halts", "A listed security may be halted to allow dissemination of material information or address an order imbalance. A halt is a market-process event, not a direction signal.", ["halt", "material news", "order imbalance"], halts),
      topic("trading-delays", "Trading delays", "An opening delay can occur when an exchange allows time for buy and sell interest to form a more orderly open after material news or an imbalance.", ["delay", "opening", "imbalance"], halts),
      topic("sec-suspensions", "SEC trading suspensions", "The SEC may suspend trading for up to 10 business days when it determines that a suspension is required in the public interest and for investor protection.", ["suspension", "SEC", "10 business days"], halts),
      topic("halt-quotation-boundaries", "Quotation boundaries during a halt", "During an applicable halt, broker-dealers may be restricted from quoting or trading the security until the relevant notice or rules permit resumption.", ["quotation", "broker-dealer", "resumption"], halts),
      topic("otc-halts", "OTC halt context", "OTC securities can have different halt and quotation processes from exchange-listed securities. The venue, source, and notice should be checked before interpreting a label.", ["OTC", "quotation halt", "venue"], halts),
      topic("resumption-context", "Resumption context", "A trading resumption indicates that the interruption has ended under the applicable process; it does not resolve every information, liquidity, or price-risk question.", ["resumption", "liquidity", "risk"], halts),
    ],
  },
  {
    id: "account-portability", title: "Account portability", description: "Customer account transfers, records, transfer instructions, and operational exceptions without advising a specific account move.", accent: "#33708A", topics: [
      topic("acats", "ACATS account transfers", "ACATS is an electronic system used for many transfers of customer accounts between brokerage firms. Not every asset or firm relationship is eligible for the same path.", ["ACATS", "account transfer", "brokerage"], transfers),
      topic("transfer-initiation-form", "Transfer Initiation Form", "A customer account transfer begins when the customer submits a Transfer Initiation Form to the receiving firm under the applicable process.", ["TIF", "receiving firm", "transfer instruction"], transfers),
      topic("validation-exception", "Validation and exception handling", "After an ACATS instruction is received, the carrying firm validates the instruction or takes an exception under the process. Data completeness and asset eligibility matter.", ["validation", "exception", "carrying firm"], transfers),
      topic("manual-transfers", "Manual transfer context", "When a transfer cannot use ACATS, manual procedures may apply and can take longer. The reason for a different pathway is an operations question, not a market signal.", ["manual transfer", "asset eligibility", "operations"], transfers),
      topic("transfer-portability", "Account portability", "Account portability refers to the ability to move transferable assets and records between firms under applicable processes. Transfer timing can depend on the account and assets involved.", ["portability", "transferable assets", "timing"], transfers),
      topic("transfer-records", "Transfer records and cost basis", "Account transfers can involve records such as positions and cost-basis information. Preserve statements and review records rather than assuming every field moves identically.", ["cost basis", "statement", "records"], transfers),
    ],
  },
  {
    id: "fund-disclosures-costs", title: "Fund disclosures & costs", description: "Prospectus fee tables, shareholder reports, expense categories, and comparison boundaries for mutual funds and ETFs.", accent: "#6E4B9B", topics: [
      topic("prospectus-fee-table", "Prospectus fee table", "Mutual funds and ETFs disclose standardized fee and expense information in prospectus fee tables. Read the date, category definitions, and share-class context.", ["prospectus", "fee table", "expense"], fundFees),
      topic("fund-operating-expenses", "Fund operating expenses", "Annual fund operating expenses can include management, distribution, service, and other expenses. The expense ratio expresses total annual operating expenses relative to average net assets.", ["expense ratio", "management fee", "12b-1"], fundFees),
      topic("shareholder-fees", "Shareholder fees", "Some funds disclose shareholder fees such as sales loads, redemption fees, exchange fees, or account fees. These categories are distinct from recurring operating expenses.", ["sales load", "redemption fee", "account fee"], fundFees),
      topic("fee-waivers", "Fee waivers and reimbursements", "A fund may agree to reduce fees or expenses temporarily or indefinitely. A waiver label should prompt questions about its terms and whether costs may later be recouped.", ["fee waiver", "reimbursement", "expense"], fundFees),
      topic("fund-share-classes", "Fund share classes", "A mutual fund can offer share classes with the same underlying portfolio but different sales loads or operating expenses. Confirm the correct share-class disclosure before comparing costs.", ["share class", "sales load", "mutual fund"], fundFees),
      topic("etf-cost-boundaries", "ETF costs beyond fee tables", "ETF investing can involve transaction costs and market-price differences from net asset value that are not the same as the fund’s published operating expense ratio.", ["ETF", "NAV", "transaction cost"], fundFees),
    ],
  },
  {
    id: "payment-settlement-infrastructure", title: "Payment & settlement infrastructure", description: "The payments, clearing, and settlement systems that support financial transactions and market operations.", accent: "#237566", topics: [
      topic("payment-system-role", "Payment system role", "Payment systems facilitate financial transactions among individuals, institutions, consumers, businesses, investors, and issuers. Their design matters for reliability and operational continuity.", ["payment system", "settlement", "financial transaction"], payments),
      topic("ach-transfers", "ACH transfers", "Automated clearinghouse systems process many small-value electronic credit and debit transfers. Their role differs from securities settlement and from wholesale payment systems.", ["ACH", "electronic transfer", "clearing"], payments),
      topic("fedwire-funds", "Wholesale funds transfers", "Fedwire Funds is a wholesale payment service used for large-value financial transactions. Understand its institutional role rather than treating it as a consumer investing feature.", ["Fedwire Funds", "wholesale", "payment"], payments),
      topic("fedwire-securities", "Securities settlement services", "Fedwire Securities supports certain large-value securities transactions. It illustrates how payment and securities-delivery systems interact in market infrastructure.", ["Fedwire Securities", "delivery", "settlement"], payments),
      topic("financial-market-infrastructure", "Financial market infrastructure", "Payment, clearing, and settlement systems are forms of financial market infrastructure. They connect trading, custody, funding, and the transfer of value.", ["infrastructure", "clearing", "custody"], payments),
      topic("operational-resilience", "Operational resilience", "Safety, efficiency, cybersecurity, and continuity are infrastructure considerations. An operational disruption is not interchangeable with a fundamental assessment of an issuer.", ["resilience", "cybersecurity", "continuity"], payments),
    ],
  },
  {
    id: "financial-stability", title: "Financial stability", description: "System-level vulnerabilities, shocks, leverage, funding, and resilience concepts without producing market forecasts.", accent: "#7C6740", topics: [
      topic("stability-definition", "Financial stability", "A stable financial system can continue providing financing and payment services even when it experiences adverse events. This is a system concept, not a forecast for a specific asset.", ["financial stability", "resilience", "system"], stability),
      topic("shocks-vulnerabilities", "Shocks and vulnerabilities", "Shocks are difficult-to-predict adverse events, while vulnerabilities are conditions that can amplify stress. Monitoring frameworks separate the two concepts.", ["shock", "vulnerability", "stress"], stability),
      topic("valuation-pressures", "Valuation pressures", "Valuation pressures describe situations where asset prices appear high relative to stated fundamentals or historical norms. They are a vulnerability lens, not a timing tool.", ["valuation", "asset prices", "risk appetite"], stability),
      topic("borrower-vulnerabilities", "Borrowing vulnerabilities", "High debt burdens can make borrowers more vulnerable when income falls or asset values decline. The transmission to the broader economy depends on context.", ["debt", "household", "business"], stability),
      topic("financial-sector-leverage", "Financial-sector leverage", "Leverage within financial institutions can make loss absorption more difficult and can contribute to asset sales or reduced lending under stress.", ["leverage", "financial sector", "loss absorption"], stability),
      topic("funding-risks", "Funding risks and fire sales", "Funding risks can arise when investors can withdraw quickly from vehicles holding assets that are difficult to sell. Rapid sales can amplify price pressure in stress.", ["funding risk", "liquidity", "fire sale"], stability),
    ],
  },
  {
    id: "investor-recourse", title: "Investor recourse & records", description: "Complaint, arbitration, documentation, and dispute-process vocabulary for understanding available regulatory and forum processes.", accent: "#A65B48", topics: [
      topic("question-unauthorized-activity", "Questioning unauthorized activity", "If an account transaction is not understood or appears unauthorized, the initial educational step is to identify the record, ask questions, and preserve relevant correspondence.", ["unauthorized trade", "confirmation", "records"], complaints),
      topic("firm-escalation", "Firm escalation pathways", "A concern may be raised with a broker and, if unresolved, with the firm’s branch manager or compliance department. These are process vocabulary concepts, not legal advice.", ["branch manager", "compliance", "firm"], complaints),
      topic("finra-complaint", "FINRA complaint program", "FINRA’s complaint program investigates complaints against brokerage firms and associated persons within its jurisdiction and may take disciplinary action.", ["FINRA complaint", "jurisdiction", "discipline"], complaints),
      topic("arbitration-claim", "Arbitration claim basics", "An arbitration claim includes a statement of the dispute, parties, and requested relief under forum procedures. The process is distinct from a regulator complaint.", ["arbitration", "statement of claim", "dispute"], arbitration),
      topic("discovery-hearing", "Discovery and hearing process", "In an arbitration process, parties exchange documents and identify witnesses before hearings where evidence and arguments are presented to arbitrators.", ["discovery", "hearing", "arbitrator"], arbitration),
      topic("arbitration-award", "Arbitration awards", "An arbitration award is the forum decision after the process. It has specific procedural and review rules; learn the structure rather than assuming a particular outcome.", ["award", "arbitration", "forum"], arbitration),
    ],
  },
  {
    id: "securities-lending-distress", title: "Securities lending & distress", description: "Securities-lending mechanics and public-company distress or bankruptcy vocabulary, with clear risk and claim-priority boundaries.", accent: "#6D3B6F", topics: [
      topic("securities-lending-basics", "Securities lending", "Securities lending temporarily transfers securities from a lender to a borrower for a fee. It is an institutional market practice with collateral and operational context.", ["securities lending", "borrower", "fee"], lending),
      topic("lenders-borrowers", "Lenders and borrowers", "Large institutions often lend securities, while brokers and dealers can borrow for market making, customer activity, or operational needs. The ultimate borrower may not be visible to every participant.", ["lender", "broker-dealer", "market making"], lending),
      topic("collateral-reinvestment", "Collateral and reinvestment", "Securities-lending arrangements can involve cash collateral and reinvestment. The arrangement’s terms, collateral, and risk controls are part of the structure.", ["collateral", "reinvestment", "securities loan"], lending),
      topic("short-sale-connection", "Lending, short sales, and fails", "Borrowed securities can be used in market-making activity or in connection with short sales and fails to deliver. These are related operations, not interchangeable data labels.", ["short sale", "fails to deliver", "borrow"], lending),
      topic("chapter-7-11", "Chapter 7 and Chapter 11", "Chapter 7 generally involves liquidation, while Chapter 11 seeks reorganization and debt restructuring under court supervision. Both are legal processes with different objectives.", ["Chapter 7", "Chapter 11", "reorganization"], bankruptcy),
      topic("claim-priority-old-shares", "Claim priority and old shares", "In public-company bankruptcy, creditors generally rank ahead of common shareholders. Existing shares may continue to trade yet still face cancellation or little residual value under a reorganization plan.", ["claim priority", "common stock", "bankruptcy"], bankruptcy),
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
