# TradeWise Academy

> **TradeWise Academy** is a cross-platform, education-first mobile app for learning how stock markets, financial instruments, market infrastructure, research processes, and simulated trading workflows fit together. It is built for deliberate study—not real-money execution or security-specific recommendations.

The app combines a structured starter curriculum with a searchable **7,200-lesson micro-learning catalog**, a source-linked Stock Market Atlas, adaptive reviews, a local paper-trading lab, goal-based playlists, and an AI Catalog Guide that helps learners find appropriate lessons from the existing catalog.

## Learning Experience

| Area | What it provides |
|---|---|
| **Catalog-first learning** | 7,200 short lessons generated from 150 Atlas topics and 48 instructional frames. Each lesson includes a source link, a focused prompt, a follow-up, and a knowledge check. |
| **Stock Market Atlas** | Searchable, source-linked reference topics covering market structure, execution, filings, funds, fixed income, derivatives, regulation, financial stability, account safeguards, and investor recourse. |
| **Guided courses** | A concise starter curriculum for market foundations, technical and fundamental analysis, risk process, trading styles, options awareness, and trading psychology. |
| **Adaptive review** | Catalog quiz results create a local review schedule designed to revisit concepts after incorrect or successful responses. |
| **Goal-based playlists** | Curated paths for Market Basics, Filing Research, Risk Foundations, and Market Mechanics. |
| **Offline study plans** | Learners can build a study plan and share or download it as a local text document. |
| **Glossary study** | A searchable trading glossary with bookmarks and local spaced-repetition review for saved terms. |
| **Market Lab** | Hand-authored synthetic scenarios, illustrative trend/range exercises, a cash-only paper account, and post-trade reflections. It does not use live, historical, or forecast market data. |
| **AI Catalog Guide** | A natural-language guide that suggests 3–5 source-linked lessons, explains why they fit the learner’s study goal, and always validates results against the local catalog. |

## AI Catalog Guide

The AI Catalog Guide is intentionally designed as a **learning-navigation feature**, not a market-advice tool. A learner can enter a goal such as “help me understand ETF fees before reading a prospectus.” The server first retrieves a small, diverse candidate set from the local lesson catalog. It then asks the server-side model to select only from those candidates. Every returned lesson ID is validated locally before it is shown in the app.

If the model response is unavailable, malformed, or contains an unknown lesson ID, the app falls back to deterministic local catalog recommendations. The guide does not use live market data, does not recommend securities or trades, and presents an explicit education-only boundary in the user interface.

## Content Boundaries

TradeWise Academy is **educational software**, not a broker, adviser, or live market-data terminal. Its paper trades, prices, positions, and scenario charts are illustrative. The app does not place real-money orders, provide individualized investment, legal, or tax advice, or predict market outcomes.

The Atlas stores a direct source link with each topic. Current source lanes include Investor.gov and the SEC, FINRA, the Federal Reserve, the CFTC, SIPC, and the MSRB. These links help learners locate the underlying public educational material, while app copy remains concise and concept-focused.

## Technical Architecture

```text
app/                    Expo Router screens and mobile UI
  (tabs)/               Today, Learn, Practice, and Profile surfaces
  catalog/              Micro-lesson catalog and lesson detail screens
  ai-guide.tsx          AI-assisted catalog navigation screen
components/             Shared native UI components
data/                   Curriculum, Atlas, glossary, scenario, review, and playlist data
lib/                    Local learning state, persistence, haptics, study-plan export, tRPC client
server/                 tRPC API and server-side AI catalog guide
tests/                  Vitest coverage for curriculum, simulation, review, and AI grounding
```

The application uses **Expo Router**, React Native, TypeScript, NativeWind, AsyncStorage, tRPC, and the server-side built-in language-model helper. Learning progress, saved glossary terms, review state, paper portfolio, and reflections are persisted locally on the device. The AI guide sends only the learner’s entered study goal and a small local candidate context to the server-side model.

## Local Development

### Prerequisites

Use Node.js 22+ and pnpm 9. The project uses Expo SDK 54.

```bash
pnpm install
pnpm dev
```

The development command starts the Express/tRPC service and Expo Metro web preview together. For native Expo workflows, use the platform-specific scripts below.

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the API server and Expo Metro preview. |
| `pnpm ios` | Start Expo for iOS. |
| `pnpm android` | Start Expo for Android. |
| `pnpm qr` | Generate an Expo QR code for device testing. |
| `pnpm test` | Run the Vitest suite. |
| `pnpm lint` | Run Expo ESLint checks. |
| `pnpm check` | Run TypeScript validation. |
| `pnpm build` | Bundle the Express/tRPC server for production. |

## Validation

The test suite covers the generated catalog’s size and uniqueness, source-link behavior, glossary search, adaptive review scheduling, paper-trading constraints, synthetic Market Lab scenarios, post-trade reflections, playlist generation, offline study-plan text, and AI Catalog Guide grounding.

```bash
pnpm test
pnpm lint
pnpm check
```

## Contribution Notes

When adding curriculum content, keep the following rules intact:

1. Add source-linked topics to the Atlas rather than unsupported market claims.
2. Preserve the education-only boundary; do not convert a concept into a security-specific recommendation.
3. Keep simulated scenarios synthetic and clearly labeled.
4. Validate changes with the existing test, lint, and TypeScript commands.
5. Add any planned work to `todo.md` before implementation and mark items complete once they are finished.

## Status

The current catalog contains **7,200** short lessons across **150** source-linked topics. The app is designed as an extensible learning platform: adding Atlas topics automatically expands the generated micro-learning catalog while keeping lesson framing and source provenance consistent.
