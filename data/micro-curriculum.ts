import { referenceDomains, type ReferenceDomain, type ReferenceSource } from "./reference-library";

export type MicroLesson = {
  id: string;
  title: string;
  frame: string;
  domain: ReferenceDomain;
  topicId: string;
  topicTitle: string;
  summary: string;
  studyPrompt: string;
  explanation: string;
  practiceLoop: string;
  limitation: string;
  source: ReferenceSource;
};

type LessonUnit = {
  id: string;
  label: string;
  legacyFrameIds: string[];
  focus: (topic: string) => string;
  studyPrompt: (topic: string) => string;
  practice: (topic: string) => string;
};

/**
 * Earlier catalog versions split every topic into 48 short prompts. These units
 * merge closely related prompts into durable, multi-part lessons while retaining
 * the original instructional coverage and an ID migration path for local state.
 */
const units: LessonUnit[] = [
  {
    id: "foundations-scope", label: "Foundations & scope",
    legacyFrameIds: ["orientation", "definition", "plain-language", "scope-check"],
    focus: (topic) => `Define ${topic}, locate it in the wider market system, and state both the concept’s purpose and what it cannot explain by itself.`,
    studyPrompt: (topic) => `Explain ${topic} in plain language, then identify one connected market function and one question that remains outside its scope.`,
    practice: (topic) => `1. Write a one-sentence definition of ${topic}.\n2. Name the market participant, record, or process it connects to.\n3. State one outcome that cannot be inferred from the concept alone.`,
  },
  {
    id: "mechanics-actors", label: "Mechanics & actors",
    legacyFrameIds: ["mechanism", "actors", "inputs", "outputs", "system-link"],
    focus: (topic) => `Trace how ${topic} works by separating the relevant inputs, actions, participants, outputs, and market-system link.`,
    studyPrompt: (topic) => `Map the inputs, participants, and resulting records or obligations for ${topic}. Which actor makes a decision and which actor records, executes, or bears risk?`,
    practice: (topic) => `1. List the key inputs for ${topic}.\n2. Put the major process steps in order.\n3. Identify who acts, who records, and who bears the remaining risk.`,
  },
  {
    id: "evidence-disclosure", label: "Evidence & disclosure",
    legacyFrameIds: ["evidence", "timing", "disclosure-lens", "document-path", "claim-check"],
    focus: (topic) => `Find the most useful evidence for ${topic}, check the document path and timing, and distinguish a sourced fact from an unsupported claim.`,
    studyPrompt: (topic) => `Choose a primary document or regulator source for ${topic}. What dates, definitions, reporting periods, or disclosure details must be checked before using it?`,
    practice: (topic) => `1. Locate the primary source lane for ${topic}.\n2. Record the document date and applicable period.\n3. Test one claim against the source and preserve any uncertainty.`,
  },
  {
    id: "comparison-relationships", label: "Comparison & relationships",
    legacyFrameIds: ["comparison", "relationship-map", "stakeholder-view", "comparison-basis"],
    focus: (topic) => `Compare ${topic} with nearby concepts and describe how incentives, obligations, or exposure differ across stakeholders.`,
    studyPrompt: (topic) => `Compare ${topic} with one easily confused concept. What must remain consistent in a fair comparison, and how could the issue look different to two stakeholders?`,
    practice: (topic) => `1. Name a related concept.\n2. Write one structural difference.\n3. List the definitions, period, and risk exposure that must be held constant before comparing.`,
  },
  {
    id: "research-process", label: "Research process",
    legacyFrameIds: ["research-question", "process-checkpoint", "assumption-audit", "calculation-guardrail"],
    focus: (topic) => `Turn ${topic} into a neutral research question by documenting assumptions, calculation inputs, and the process step that comes before action.`,
    studyPrompt: (topic) => `Write a neutral research question about ${topic}. Identify the evidence, assumption, units, and timing inputs needed to answer it without implying a trade conclusion.`,
    practice: (topic) => `1. Frame a question about ${topic}.\n2. List the evidence and assumptions required.\n3. Check units, dates, and definitions before interpreting a result.`,
  },
  {
    id: "scenario-context", label: "Scenario & market context",
    legacyFrameIds: ["scenario-observation", "boundary-case", "sequence", "volatility-context", "liquidity-context"],
    focus: (topic) => `Use ${topic} in a fictional scenario while recognizing how timing, volatility, liquidity, and boundary cases can change its practical meaning.`,
    studyPrompt: (topic) => `Describe a fictional observation that makes ${topic} relevant. Which conditions could make the usual interpretation incomplete, and what sequence or liquidity question would you check?`,
    practice: (topic) => `1. State the fictional context.\n2. Describe the sequence of events.\n3. Identify the volatility, liquidity, or boundary condition that could alter the interpretation.`,
  },
  {
    id: "risk-tradeoffs", label: "Risk & trade-offs",
    legacyFrameIds: ["tradeoff", "risk-boundary", "risk-ranking", "stress-context", "cost-lens"],
    focus: (topic) => `Evaluate the trade-offs, costs, and risk boundaries around ${topic}, including how stressful conditions can change the practical result.`,
    studyPrompt: (topic) => `What trade-off does ${topic} involve? List two relevant risks, the cost or friction to verify, and one reason the risk may change under stress.`,
    practice: (topic) => `1. Name the benefit and constraint.\n2. List two non-certain risks.\n3. Check a direct or indirect cost and describe how stress could change the outcome.`,
  },
  {
    id: "data-metrics", label: "Data & metrics",
    legacyFrameIds: ["metric-lens", "data-caveat", "time-series", "concentration"],
    focus: (topic) => `Choose an appropriate metric for ${topic} while checking definitions, calculation limits, time-series consistency, and concentration or dependency.`,
    studyPrompt: (topic) => `Which measure can describe ${topic}, what does it omit, and which definition, period, methodology, or concentration issue must be visible before comparing it?`,
    practice: (topic) => `1. Select a metric.\n2. State its unit, period, and calculation basis.\n3. Identify one limitation and one dependency or concentration question.`,
  },
  {
    id: "critical-thinking", label: "Critical thinking",
    legacyFrameIds: ["misconception", "counterargument", "source-conflict", "ethical-lens"],
    focus: (topic) => `Challenge simplified claims about ${topic} by testing counterarguments, resolving source conflicts, and recognizing fairness or conflict considerations.`,
    studyPrompt: (topic) => `Identify a common oversimplification about ${topic}. What evidence or alternative assumption challenges it, and how would you handle conflicting sources or stakeholder concerns?`,
    practice: (topic) => `1. Write the oversimplified claim.\n2. Add a conditional counterargument.\n3. Trace conflicting evidence to its origin and identify any fairness or conflict issue.`,
  },
  {
    id: "synthesis-review", label: "Synthesis & review",
    legacyFrameIds: ["synthesis", "review-loop", "next-question"],
    focus: (topic) => `Synthesize ${topic} into a careful research process, review the evidence and assumptions used, and choose the next connected question to study.`,
    studyPrompt: (topic) => `Summarize how ${topic} fits into a careful research process. What would you review afterward, and which connected concept would deepen the analysis?`,
    practice: (topic) => `1. Summarize the concept and its caveat.\n2. Review the original question, evidence, assumptions, and result.\n3. Choose the next connected topic to investigate.`,
  },
  {
    id: "memory-teachback", label: "Memory & teach-back",
    legacyFrameIds: ["recall", "memory-anchor", "teach-back"],
    focus: (topic) => `Rehearse ${topic} through recall and a neutral teach-back that preserves the concept’s key qualifier.`,
    studyPrompt: (topic) => `Explain ${topic} to a new learner without looking. What concise memory anchor is accurate enough to guide later research without becoming a misleading slogan?`,
    practice: (topic) => `1. Recall the definition from memory.\n2. Teach it using a neutral example.\n3. Compare your explanation with the source summary and restore any missing qualifier.`,
  },
  {
    id: "assessment-prep", label: "Assessment preparation",
    legacyFrameIds: ["quiz-prep"],
    focus: (topic) => `Prepare to assess ${topic} by pairing one source-grounded fact with one limitation that prevents overconfidence.`,
    studyPrompt: (topic) => `State one fact and one caveat about ${topic}. Why would leaving out either part create an incomplete answer?`,
    practice: (topic) => `1. Write the key fact.\n2. Write the key caveat.\n3. Explain how both belong in a careful answer.`,
  },
];

function buildLesson(domain: ReferenceDomain, topic: ReferenceDomain["topics"][number], unit: LessonUnit): MicroLesson {
  return {
    id: `catalog-${domain.id}-${topic.id}-${unit.id}`,
    title: `${topic.title}: ${unit.label}`,
    frame: unit.label,
    domain,
    topicId: topic.id,
    topicTitle: topic.title,
    summary: `${topic.summary} ${unit.focus(topic.title)}`,
    studyPrompt: unit.studyPrompt(topic.title),
    explanation: `This substantial unit combines closely related learning prompts so you can define, investigate, and explain ${topic.title} as one coherent concept rather than repeat a single idea across short fragments.`,
    practiceLoop: unit.practice(topic.title),
    limitation: `${topic.title} can organize a research question, but it cannot on its own determine a future price path, a transaction, or an appropriate level of risk.`,
    source: topic.source,
  };
}

export const microLessons: MicroLesson[] = referenceDomains.flatMap((domain) => domain.topics.flatMap((topic) => units.map((unit) => buildLesson(domain, topic, unit))));
export const microLessonCount = microLessons.length;

export function getMicroLesson(lessonId: string) {
  return microLessons.find((lesson) => lesson.id === lessonId);
}

/** Converts a legacy 48-frame catalog ID to the appropriate merged-unit ID. */
export function migrateLegacyCatalogLessonId(lessonId: string) {
  const unit = units.find((candidate) => candidate.legacyFrameIds.some((frameId) => lessonId.endsWith(`-${frameId}`)));
  if (!unit) return lessonId;
  const matchedFrameId = unit.legacyFrameIds.find((frameId) => lessonId.endsWith(`-${frameId}`));
  return matchedFrameId ? `${lessonId.slice(0, -matchedFrameId.length)}${unit.id}` : lessonId;
}

export function searchMicroLessons(query: string, domainId: string | "All" = "All") {
  const normalized = query.trim().toLowerCase();
  return microLessons.filter((lesson) => {
    const inDomain = domainId === "All" || lesson.domain.id === domainId;
    const searchable = `${lesson.title} ${lesson.frame} ${lesson.topicTitle} ${lesson.summary} ${lesson.studyPrompt} ${lesson.domain.title}`.toLowerCase();
    return inDomain && searchable.includes(normalized);
  });
}

export const microLessonFrames = units.map(({ id, label }) => ({ id, label }));
