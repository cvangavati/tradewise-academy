# TradeWise Academy — Mobile Interface Plan

## Product Direction

TradeWise Academy is an offline-first learning companion for adults who want to understand stock trading before risking capital. The application is a **simulation and education product**, not a brokerage. It must make the distinction visible wherever users enter the practice portfolio, reinforcing that prices and orders are illustrative and no real-money execution occurs.

The experience is designed for **portrait 9:16 usage** with one-handed interaction. It follows iOS conventions: a four-item bottom tab bar, large page titles, compact contextual actions, generous touch targets, system-aligned typography, and modal sheets for focused decisions.

## Screen List

| Screen | Primary content and functionality |
|---|---|
| Today | Daily learning dashboard with current course progress, a concise market concept, portfolio snapshot, and a primary continue-learning action. |
| Learn | Curriculum paths for fundamentals, technical analysis, fundamental analysis, trading styles, risk management, options basics, and psychology. Users can open lessons and resume progress. |
| Lesson Detail | Readable lesson content, key takeaways, terminology, lesson completion state, and a short knowledge check. |
| Practice | Interactive simulated trade ticket, watchlist quotes, candlestick-pattern challenges, and a paper portfolio. Orders only update local simulation data. |
| Portfolio | Simulated buying power, holdings, open profit/loss, activity history, and portfolio-performance summary. |
| Profile | Learning progress, earned milestones, safety disclaimer, reset-learning action, and application preferences. |

## Primary Navigation and Layout

The bottom tab bar contains **Today, Learn, Practice, and Profile**. Portfolio information is reached from the Practice screen in a pushed detail view, keeping the top-level navigation focused and reachable with the thumb. Today uses a vertical scroll with the next lesson and a small practice summary above the fold. Learn uses filtered course cards with clear difficulty and duration metadata. Practice begins with the paper account and then exposes tools in a segmented layout to minimize screen changes.

Cards use a calm near-white canvas with slate text and a deep navy hierarchy. A directional emerald color is reserved for learning progress and simulated gains; coral is reserved for downside or validation errors. Charts are intentionally high contrast, with educational annotations rather than a live-market visual density.

## Key User Flows

| User goal | Flow |
|---|---|
| Begin a trading topic | Today → tap **Continue learning** → Lesson Detail → read key concept → complete knowledge check → progress updates locally. |
| Explore a methodology | Learn → choose a learning path → select lesson → review explanation and terms → mark lesson complete. |
| Practice a simulated trade | Practice → select a symbol from the watchlist → open trade ticket → choose buy/sell and quantity → preview order → submit simulated order → portfolio refreshes. |
| Check performance | Practice → tap Portfolio → review buying power, holdings, activity, and educational performance note. |
| Build a habit | Today → track streak/progress indicator → resume the next short lesson or practice prompt. |

## Visual Language

| Token | Value | Role |
|---|---:|---|
| Ink Navy | `#10243E` | Primary headings, navigation, and app identity. |
| Signal Teal | `#007C78` | Primary actions and active learning states. |
| Gain Emerald | `#15803D` | Positive simulated movement and completed progress. |
| Loss Coral | `#D9544D` | Loss values, sell emphasis, and validation messages. |
| Warm Canvas | `#F7F6F2` | Main page background, designed to reduce visual fatigue during study. |
| Paper | `#FFFFFF` | Elevated cards and sheets. |
| Fog | `#DCE2E8` | Dividers, inactive components, and subdued progress tracks. |

The app avoids hype-driven market imagery. Instead, it uses restrained diagrammatic elements, clear number formatting, educational callouts, and thoughtful hierarchy to encourage measured decision-making.

## Safety and Content Principles

Every lesson and practice screen makes clear that the content is educational and simulations are not investment recommendations. Examples teach process—thesis, entry, stop, sizing, and review—rather than presenting individual securities as recommendations. The first release stores progress and the practice portfolio on device only, avoiding unnecessary account creation and cloud synchronization.
