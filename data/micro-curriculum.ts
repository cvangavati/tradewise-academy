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
  { id: "plain-language", label: "Plain language", studyPrompt: (topic) => `Rewrite ${topic} for a learner encountering it for the first time.`, followUp: () => "Keep the essential qualifier and remove any implication that the concept predicts an outcome." },
  { id: "boundary-case", label: "Boundary case", studyPrompt: (topic) => `Describe a situation where ${topic} might not apply in the expected way.`, followUp: () => "State which definition, rule, or condition would need checking before drawing a conclusion." },
  { id: "document-path", label: "Document path", studyPrompt: (topic) => `What document path would you follow to research ${topic}?`, followUp: () => "Start with the relevant primary disclosure or regulator guidance, then compare dates and definitions." },
  { id: "risk-ranking", label: "Risk ranking", studyPrompt: (topic) => `List two risks connected to ${topic} without ranking them as certainties.`, followUp: () => "Explain why materiality, time horizon, and context can change how a risk is viewed." },
  { id: "cost-lens", label: "Cost lens", studyPrompt: (topic) => `What direct or indirect cost could be relevant to ${topic}?`, followUp: () => "Identify where a learner would verify the fee, spread, tax, financing, or opportunity-cost assumption." },
  { id: "claim-check", label: "Claim check", studyPrompt: (topic) => `Choose one claim about ${topic} that needs verification.`, followUp: () => "Name the primary record, methodology note, or disclosure that could confirm or challenge it." },
  { id: "counterargument", label: "Counterargument", studyPrompt: (topic) => `What is a reasonable counterargument to a simple narrative about ${topic}?`, followUp: () => "Use evidence, a different assumption, or a limitation rather than hindsight." },
  { id: "sequence", label: "Sequence", studyPrompt: (topic) => `Put the major steps related to ${topic} in a logical order.`, followUp: () => "Flag any step that can vary by product, venue, legal structure, or account type." },
  { id: "stakeholder-view", label: "Stakeholder view", studyPrompt: (topic) => `How could ${topic} look different to an issuer, investor, intermediary, or regulator?`, followUp: () => "Separate incentives, duties, and exposures for each perspective." },
  { id: "assumption-audit", label: "Assumption audit", studyPrompt: (topic) => `Which assumption commonly appears when people discuss ${topic}?`, followUp: () => "State how you would test whether that assumption is relevant, current, and well-defined." },
  { id: "time-series", label: "Time-series lens", studyPrompt: (topic) => `If you tracked ${topic} over time, what consistency checks would you make?`, followUp: () => "Confirm period alignment, adjustment basis, methodology continuity, and any missing observations." },
  { id: "concentration", label: "Concentration lens", studyPrompt: (topic) => `What concentration or dependency question could be connected to ${topic}?`, followUp: () => "Consider customers, suppliers, issuers, sectors, geographies, or data sources as relevant." },
  { id: "stress-context", label: "Stress context", studyPrompt: (topic) => `How could stressful market conditions change the practical meaning of ${topic}?`, followUp: () => "Focus on liquidity, financing, information gaps, or changing correlations without forecasting a crisis." },
  { id: "comparison-basis", label: "Comparison basis", studyPrompt: (topic) => `What must be held constant when comparing two instances of ${topic}?`, followUp: () => "Check definitions, period, currency, fee basis, risk exposure, and relevant market conditions." },
  { id: "source-conflict", label: "Source conflict", studyPrompt: (topic) => `How would you handle conflicting sources about ${topic}?`, followUp: () => "Trace each claim to its origin, prefer primary evidence when appropriate, and preserve unresolved uncertainty." },
  { id: "calculation-guardrail", label: "Calculation guardrail", studyPrompt: (topic) => `What calculation guardrail could matter for ${topic}?`, followUp: () => "Name the inputs, units, dates, and assumptions that should be visible before interpreting a result." },
  { id: "review-loop", label: "Review loop", studyPrompt: (topic) => `What would you review after using information about ${topic} in a learning exercise?`, followUp: () => "Compare the original question, evidence, assumptions, and result rather than judging only the outcome." },
  { id: "ethical-lens", label: "Ethical lens", studyPrompt: (topic) => `What fairness, disclosure, or conflict concern might arise around ${topic}?`, followUp: () => "Identify the stakeholder affected and the record or rule that could provide context." },
  { id: "system-link", label: "System link", studyPrompt: (topic) => `Which market-system component links to ${topic}?`, followUp: () => "Explain whether the connection is about issuance, trading, custody, reporting, regulation, or a different function." },
  { id: "memory-anchor", label: "Memory anchor", studyPrompt: (topic) => `Create a concise memory anchor for ${topic}.`, followUp: () => "Make it accurate enough to guide later research, not a slogan that erases the concept’s limitations." },
  { id: "quiz-prep", label: "Quiz preparation", studyPrompt: (topic) => `What one fact and one caveat should you recall about ${topic}?`, followUp: () => "Use the source-grounded summary to check that both the fact and caveat are correctly framed." },
  { id: "next-question", label: "Next question", studyPrompt: (topic) => `After understanding the basics of ${topic}, what should you study next?`, followUp: () => "Choose a connected concept that deepens process, risk, disclosure, or measurement understanding." },
  { id: "scope-check", label: "Scope check", studyPrompt: (topic) => `What does ${topic} explain, and what does it leave outside its scope?`, followUp: () => "State the boundary explicitly so the concept is not mistaken for a complete model of a market outcome." },
  { id: "teach-back", label: "Teach-back", studyPrompt: (topic) => `Teach ${topic} through a short, neutral example.`, followUp: () => "Use the example to clarify structure and uncertainty, not to imply a trade or investment conclusion." },
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
