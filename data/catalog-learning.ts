import { getMicroLesson, microLessons, type MicroLesson } from "./micro-curriculum";

export type CatalogQuiz = { lessonId: string; question: string; choices: string[]; correctIndex: number; explanation: string };
export type CatalogPlaylist = { id: string; title: string; subtitle: string; domainIds: string[]; accent: string; days: number };

export const catalogPlaylists: CatalogPlaylist[] = [
  { id: "market-basics", title: "Market Basics", subtitle: "Build a foundation in ownership, exchanges, orders, funds, and investor safeguards.", domainIds: ["market-system", "execution-accounts", "funds-fixed-income", "account-safeguards"], accent: "#007C78", days: 14 },
  { id: "filing-research", title: "Filing Research", subtitle: "Learn a repeatable path through EDGAR, 10-Ks, 10-Qs, ownership reports, and corporate events.", domainIds: ["disclosures-corporate-events", "issuance-ownership", "filing-analysis", "company-analysis"], accent: "#9C5E22", days: 14 },
  { id: "risk-foundations", title: "Risk Foundations", subtitle: "Study risk, liquidity, leverage, behavioral guardrails, and portfolio measurement concepts.", domainIds: ["portfolio-measurement", "derivatives-advanced", "decision-hygiene", "macro-context"], accent: "#B14A66", days: 14 },
  { id: "market-mechanics", title: "Market Mechanics", subtitle: "Understand execution, clearing, market data, benchmarks, and quantitative-data guardrails.", domainIds: ["market-system", "execution-accounts", "market-data-benchmarks", "quant-data-literacy"], accent: "#4066B0", days: 14 },
];

const playlistFrames = new Set(["Orientation", "Definition", "Mechanism", "Evidence", "Risk boundary", "Process checkpoint", "Recall prompt", "Quiz preparation"]);

export function getCatalogQuiz(lessonId: string): CatalogQuiz | undefined {
  const lesson = getMicroLesson(lessonId);
  if (!lesson) return undefined;
  return {
    lessonId,
    question: `Which statement best reflects a careful learning approach to ${lesson.topicTitle}?`,
    choices: [
      `${lesson.topicTitle} should be understood through its definition, source context, and stated limits.`,
      `${lesson.topicTitle} guarantees a favorable market outcome when it appears.`,
      `${lesson.topicTitle} is a real-time signal that replaces independent research.`,
      `${lesson.topicTitle} always applies in the same way, regardless of timing or structure.`,
    ],
    correctIndex: 0,
    explanation: `The catalog emphasizes definitions, primary-source context, assumptions, and limitations. ${lesson.topicTitle} is not presented as a prediction, recommendation, or guaranteed outcome.`,
  };
}

export function nextCatalogReviewAt(correct: boolean, currentStreak: number, now = new Date()) {
  const days = correct ? [3, 7, 14, 30][Math.min(currentStreak, 3)] : 1;
  const date = new Date(now);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}

export function lessonsForPlaylist(playlistId: string): MicroLesson[] {
  const playlist = catalogPlaylists.find((item) => item.id === playlistId);
  if (!playlist) return [];
  return microLessons.filter((lesson) => playlist.domainIds.includes(lesson.domain.id) && playlistFrames.has(lesson.frame)).slice(0, 112);
}

export function buildStudyPlanText(playlistId: string, lessonLimit = 28, generatedAt = new Date()) {
  const playlist = catalogPlaylists.find((item) => item.id === playlistId);
  if (!playlist) return "";
  const lessons = lessonsForPlaylist(playlistId).slice(0, lessonLimit);
  const dailyCount = Math.max(1, Math.ceil(lessons.length / playlist.days));
  const weeks = Array.from({ length: playlist.days }, (_, index) => lessons.slice(index * dailyCount, (index + 1) * dailyCount));
  const dateLabel = generatedAt.toISOString().slice(0, 10);
  const lines = [
    "TRADEWISE ACADEMY — OFFLINE STUDY PLAN",
    `${playlist.title} · Generated ${dateLabel}`,
    "",
    playlist.subtitle,
    "",
    "Educational material only. This plan explains market concepts and research practices; it does not provide trading recommendations, security picks, or personalized financial advice.",
    "",
  ];
  weeks.forEach((dayLessons, index) => {
    if (!dayLessons.length) return;
    lines.push(`DAY ${index + 1}`);
    dayLessons.forEach((lesson) => {
      lines.push(`• ${lesson.title}`);
      lines.push(`  Prompt: ${lesson.studyPrompt}`);
      lines.push(`  Source lane: ${lesson.source.label}`);
    });
    lines.push("");
  });
  return lines.join("\n");
}
