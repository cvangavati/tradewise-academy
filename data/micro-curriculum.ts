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
  source: ReferenceSource;
};

type LessonFrame = { id: string; label: string; studyPrompt: (topic: string) => string; followUp: (topic: string) => string };

const frames: LessonFrame[] = [
  { id: "orientation", label: "Orientation", studyPrompt: (topic) => `Where does ${topic} sit in the broader market system?`, followUp: (topic) => `Connect ${topic} to the investor, issuer, or market participant it affects.` },
  { id: "definition", label: "Definition", studyPrompt: (topic) => `State the working definition of ${topic} in one sentence.`, followUp: () => "Identify the key words that make the definition narrower than a casual use of the term." },
  { id: "mechanism", label: "Mechanism", studyPrompt: (topic) => `Describe the process through which ${topic} operates.`, followUp: () => "Name the sequence of inputs, actions, and outcomes without assuming the outcome is favorable." },
  { id: "actors", label: "Key actors", studyPrompt: (topic) => `Which people, firms, or institutions have a role in ${topic}?`, followUp: () => "Separate the party making a decision from the party recording, executing, supervising, or bearing the risk." },
  { id: "inputs", label: "Inputs", studyPrompt: (topic) => `What information or conditions would you inspect before discussing ${topic}?`, followUp: () => "Distinguish reported facts, market observations, and assumptions." },
  { id: "outputs", label: "Outputs", studyPrompt: (topic) => `What records, claims, prices, or obligations can result from ${topic}?`, followUp: () => "Explain which output is observable and which remains uncertain." },
  { id: "evidence", label: "Evidence", studyPrompt: (topic) => `What primary document or reliable record could help verify ${topic}?`, followUp: () => "Check the document date, definition, and reporting period before using it." },
  { id: "timing", label: "Timing", studyPrompt: (topic) => `Why might the timing of information matter when studying ${topic}?`, followUp: () => "Separate the event date, disclosure date, settlement date, and research date when relevant." },
  { id: "comparison", label: "Comparison", studyPrompt: (topic) => `What nearby concept is commonly confused with ${topic}?`, followUp: () => "Write one difference in purpose, structure, or risk between the two concepts." },
  { id: "tradeoff", label: "Trade-off", studyPrompt: (topic) => `What trade-off can arise when considering ${topic}?`, followUp: () => "Frame the trade-off as a balance of constraints rather than a guaranteed benefit." },
  { id: "risk-boundary", label: "Risk boundary", studyPrompt: (topic) => `What risk does ${topic} not remove?`, followUp: () => "Name a condition under which a reassuring label, statistic, or structure could be misleading." },
  { id: "data-caveat", label: "Data caveat", studyPrompt: (topic) => `What definition, methodology, or reporting limitation should you check for ${topic}?`, followUp: () => "Avoid treating a data label as interchangeable with a related metric." },
  { id: "disclosure-lens", label: "Disclosure lens", studyPrompt: (topic) => `Where might a disclosure add useful context about ${topic}?`, followUp: () => "Look for terms, risks, fees, ownership, or timing details instead of relying on a headline." },
  { id: "research-question", label: "Research question", studyPrompt: (topic) => `Write one neutral research question about ${topic}.`, followUp: () => "The question should be answerable with evidence and should not assume a buy-or-sell conclusion." },
  { id: "scenario-observation", label: "Scenario observation", studyPrompt: (topic) => `In a fictional scenario, what observation would make ${topic} relevant?`, followUp: () => "Describe the context without turning the observation into a prediction or signal." },
  { id: "misconception", label: "Misconception check", studyPrompt: (topic) => `What oversimplified claim about ${topic} should a learner challenge?`, followUp: () => "Replace the claim with a conditional explanation that includes uncertainty." },
  { id: "relationship-map", label: "Relationship map", studyPrompt: (topic) => `Name two concepts that connect to ${topic} and explain the link.`, followUp: () => "Use a short cause, constraint, or reporting relationship—never a promised market outcome." },
  { id: "metric-lens", label: "Metric lens", studyPrompt: (topic) => `Which measurement could help describe ${topic}, and what does it omit?`, followUp: () => "Specify the units, period, calculation basis, or benchmark before interpreting it." },
  { id: "process-checkpoint", label: "Process checkpoint", studyPrompt: (topic) => `What process step should come before acting on information about ${topic}?`, followUp: () => "State how a learner would document the evidence, uncertainty, and risk boundary." },
  { id: "volatility-context", label: "Volatility context", studyPrompt: (topic) => `How can changing conditions alter the interpretation of ${topic}?`, followUp: () => "Explain why historical stability does not guarantee future stability." },
  { id: "liquidity-context", label: "Liquidity context", studyPrompt: (topic) => `What liquidity or execution consideration could matter for ${topic}?`, followUp: () => "Consider the ability to transact, the terms of exit, and the distinction between a quote and a fill." },
  { id: "governance-context", label: "Governance context", studyPrompt: (topic) => `What disclosure, conflict, or oversight question could be relevant to ${topic}?`, followUp: () => "Identify who has authority, who bears the risk, and where the relevant record may be found." },
  { id: "recall", label: "Recall prompt", studyPrompt: (topic) => `Without looking, explain ${topic} to a new learner.`, followUp: () => "Then compare your explanation with the source-grounded summary and correct any missing qualifier." },
  { id: "synthesis", label: "Synthesis", studyPrompt: (topic) => `Summarize how ${topic} fits into a careful research process.`, followUp: () => "Include what to verify, what remains uncertain, and why the concept alone cannot determine an investment outcome." },
];

function buildLesson(domain: ReferenceDomain, topic: ReferenceDomain["topics"][number], frame: LessonFrame): MicroLesson {
  return {
    id: `catalog-${domain.id}-${topic.id}-${frame.id}`,
    title: `${topic.title}: ${frame.label}`,
    frame: frame.label,
    domain,
    topicId: topic.id,
    topicTitle: topic.title,
    summary: `${topic.summary} ${frame.followUp(topic.title)}`,
    studyPrompt: frame.studyPrompt(topic.title),
    source: topic.source,
  };
}

export const microLessons: MicroLesson[] = referenceDomains.flatMap((domain) => domain.topics.flatMap((topic) => frames.map((frame) => buildLesson(domain, topic, frame))));
export const microLessonCount = microLessons.length;

export function getMicroLesson(lessonId: string) {
  return microLessons.find((lesson) => lesson.id === lessonId);
}

export function searchMicroLessons(query: string, domainId: string | "All" = "All") {
  const normalized = query.trim().toLowerCase();
  return microLessons.filter((lesson) => {
    const inDomain = domainId === "All" || lesson.domain.id === domainId;
    const searchable = `${lesson.title} ${lesson.frame} ${lesson.topicTitle} ${lesson.summary} ${lesson.studyPrompt} ${lesson.domain.title}`.toLowerCase();
    return inDomain && searchable.includes(normalized);
  });
}

export const microLessonFrames = frames.map(({ id, label }) => ({ id, label }));
