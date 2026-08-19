import { microLessons, type MicroLesson } from "../data/micro-curriculum";
import { invokeLLM } from "./_core/llm";

export type GuideCandidate = Pick<MicroLesson, "id" | "title" | "frame" | "topicTitle" | "summary" | "source"> & {
  domainTitle: string;
};

export type GuideRecommendation = GuideCandidate & {
  reason: string;
};

export type CatalogGuideResult = {
  goal: string;
  orientation: string;
  recommendations: GuideRecommendation[];
  method: "ai" | "catalog";
  notice: string;
};

type ModelRecommendation = { lessonId?: unknown; reason?: unknown };
type ModelResponse = { orientation?: unknown; recommendations?: unknown };

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "about", "for", "from", "how", "i", "in", "is", "learn", "me", "of", "on", "or", "the", "to", "want", "with",
]);

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function goalTokens(goal: string) {
  return [...new Set(normalize(goal).split(" ").filter((token) => token.length > 1 && !STOP_WORDS.has(token)))];
}

function toCandidate(lesson: MicroLesson): GuideCandidate {
  return {
    id: lesson.id,
    title: lesson.title,
    frame: lesson.frame,
    topicTitle: lesson.topicTitle,
    domainTitle: lesson.domain.title,
    summary: lesson.summary,
    source: lesson.source,
  };
}

/**
 * Finds a small, diverse candidate set locally before any model call. This keeps the
 * model grounded in the Academy's catalog and avoids sending the full catalog upstream.
 */
export function findCatalogCandidates(goal: string, limit = 18): GuideCandidate[] {
  const tokens = goalTokens(goal);
  const scored = microLessons
    .map((lesson) => {
      const searchable = normalize(`${lesson.title} ${lesson.topicTitle} ${lesson.domain.title} ${lesson.summary} ${lesson.frame}`);
      const score = tokens.reduce((total, token) => total + (searchable.includes(token) ? 1 : 0), 0);
      return { lesson, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score || left.lesson.title.localeCompare(right.lesson.title));

  const candidates: GuideCandidate[] = [];
  const usedTopics = new Set<string>();
  for (const { lesson } of scored) {
    if (usedTopics.has(lesson.topicId)) continue;
    candidates.push(toCandidate(lesson));
    usedTopics.add(lesson.topicId);
    if (candidates.length === limit) return candidates;
  }

  if (candidates.length > 0) return candidates;

  // A useful, non-empty education path for broad or unfamiliar phrasing.
  for (const lesson of microLessons) {
    if (usedTopics.has(lesson.topicId)) continue;
    candidates.push(toCandidate(lesson));
    usedTopics.add(lesson.topicId);
    if (candidates.length === limit) break;
  }
  return candidates;
}

function fallbackRecommendations(candidates: GuideCandidate[], goal: string): CatalogGuideResult {
  const recommendations = candidates.slice(0, 5).map((candidate) => ({
    ...candidate,
    reason: `Builds a source-linked foundation for “${goal.trim() || "your learning goal"}” through ${candidate.topicTitle}.`,
  }));

  return {
    goal,
    orientation: "These lessons were selected from the Academy’s source-linked catalog. Start with the first item, then use the related source to deepen the topic.",
    recommendations,
    method: "catalog",
    notice: "Educational catalog guidance only — not personalized investment, legal, or tax advice.",
  };
}

function clipText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, maxLength) : "";
}

/** Validates model output against the local candidate set before it reaches a learner. */
export function validateGuideResponse(goal: string, candidates: GuideCandidate[], payload: unknown): CatalogGuideResult {
  const fallback = fallbackRecommendations(candidates, goal);
  if (!payload || typeof payload !== "object") return fallback;

  const response = payload as ModelResponse;
  const byId = new Map(candidates.map((candidate) => [candidate.id, candidate]));
  const recommended = Array.isArray(response.recommendations) ? response.recommendations : [];
  const used = new Set<string>();
  const recommendations: GuideRecommendation[] = [];

  for (const item of recommended.slice(0, 8) as ModelRecommendation[]) {
    const lessonId = clipText(item.lessonId, 180);
    const candidate = byId.get(lessonId);
    const reason = clipText(item.reason, 260);
    if (!candidate || used.has(candidate.id) || !reason) continue;
    used.add(candidate.id);
    recommendations.push({ ...candidate, reason });
    if (recommendations.length === 5) break;
  }

  if (recommendations.length < 3) return fallback;

  return {
    goal,
    orientation: clipText(response.orientation, 320) || fallback.orientation,
    recommendations,
    method: "ai",
    notice: fallback.notice,
  };
}

export async function guideCatalog(goal: string): Promise<CatalogGuideResult> {
  const candidates = findCatalogCandidates(goal);
  const fallback = fallbackRecommendations(candidates, goal);
  const candidateContext = candidates.map((candidate) => ({
    lessonId: candidate.id,
    title: candidate.title,
    topic: candidate.topicTitle,
    domain: candidate.domainTitle,
    summary: candidate.summary,
  }));

  try {
    const response = await invokeLLM({
      model: "gpt-5-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are TradeWise Academy’s education-only catalog guide. Select 3 to 5 lessonIds only from the supplied CANDIDATES. Do not discuss current markets, securities, forecasts, trading actions, or personalized financial advice. Explain why a source-linked lesson serves the learner’s stated educational goal. Return strict JSON with exactly this shape: {\"orientation\": string, \"recommendations\": [{\"lessonId\": string, \"reason\": string}]}. Keep each reason under 32 words.",
        },
        {
          role: "user",
          content: JSON.stringify({ goal, candidates: candidateContext }),
        },
      ],
    });
    const content = response.choices[0]?.message.content;
    if (typeof content !== "string") return fallback;
    return validateGuideResponse(goal, candidates, JSON.parse(content));
  } catch {
    return fallback;
  }
}
