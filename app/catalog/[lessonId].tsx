import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { AppButton, Pill, ui } from "@/components/tradewise-ui";
import { getCatalogQuiz } from "@/data/catalog-learning";
import { getMicroLesson, microLessonCount } from "@/data/micro-curriculum";
import { haptic } from "@/lib/haptics";
import { useTradeWise } from "@/lib/tradewise-store";

export default function CatalogLessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const lesson = getMicroLesson(lessonId ?? "");
  const { completedCatalogLessonIds, completeCatalogLesson, recordCatalogQuiz, catalogCompletedCount, catalogQuizScores, catalogReviews } = useTradeWise();
  const [selected, setSelected] = useState<number | null>(null);
  if (!lesson) return <ScreenContainer><View style={styles.missing}><Text style={styles.missingTitle}>Lesson not found</Text><Text style={styles.missingText}>This catalog item may no longer be available.</Text><AppButton label="Back to catalog" onPress={() => router.replace("/catalog" as never)} /></View></ScreenContainer>;
  const quiz = getCatalogQuiz(lesson.id);
  const complete = completedCatalogLessonIds.includes(lesson.id);
  const existingScore = catalogQuizScores[lesson.id];
  const review = catalogReviews.find((item) => item.lessonId === lesson.id);
  const showResult = selected !== null || Object.prototype.hasOwnProperty.call(catalogQuizScores, lesson.id);
  const answeredCorrectly = selected !== null ? selected === quiz?.correctIndex : existingScore;
  const selectAnswer = (index: number) => {
    if (showResult || !quiz) return;
    const correct = index === quiz.correctIndex;
    setSelected(index);
    if (correct) haptic.success(); else haptic.light();
    recordCatalogQuiz(lesson.id, correct);
  };
  const completeLesson = () => { haptic.success(); completeCatalogLesson(lesson.id); };

  return <ScreenContainer><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Catalog</Text></Pressable><Text style={ui.eyebrow}>{lesson.domain.title}</Text><Text style={styles.title}>{lesson.title}</Text><View style={styles.meta}><Pill label={lesson.frame} tone="navy" /><Text style={styles.metaText}>{catalogCompletedCount} of {microLessonCount} catalog lessons completed</Text></View><View style={styles.card}><Text style={styles.sectionLabel}>CONCEPT</Text><Text style={styles.body}>{lesson.summary}</Text></View><View style={styles.detailCard}><Text style={styles.sectionLabel}>HOW TO STUDY THIS</Text><Text style={styles.detailText}>{lesson.explanation}</Text></View><View style={styles.promptCard}><Text style={styles.sectionLabel}>STUDY PROMPT</Text><Text style={styles.prompt}>{lesson.studyPrompt}</Text></View><View style={styles.practiceCard}><Text style={styles.sectionLabel}>PRACTICE LOOP</Text><Text style={styles.practiceText}>{lesson.practiceLoop}</Text></View><View style={styles.limitCard}><Text style={styles.limitLabel}>LIMITATION CHECK</Text><Text style={styles.limitText}>{lesson.limitation}</Text></View><View style={styles.sourceCard}><Text style={styles.sectionLabel}>SOURCE LANE</Text><Text style={styles.sourceName}>{lesson.source.label}</Text><Text style={styles.sourceNote}>Use the cited primary or regulator education source to extend this short lesson. Source context guides research; it is not a trading signal.</Text></View>{quiz && <View style={styles.quizCard}><Text style={styles.sectionLabel}>KNOWLEDGE CHECK</Text><Text style={styles.quizQuestion}>{quiz.question}</Text><View style={styles.choices}>{quiz.choices.map((choice, index) => { const isCorrect = index === quiz.correctIndex; const isSelected = selected === index; return <Pressable key={choice} onPress={() => selectAnswer(index)} style={({ pressed }) => [styles.choice, showResult && isCorrect && styles.choiceCorrect, showResult && isSelected && !isCorrect && styles.choiceIncorrect, pressed && !showResult && styles.pressed]}><Text style={[styles.choiceText, showResult && isCorrect && styles.choiceCorrectText]}>{choice}</Text></Pressable>; })}</View>{showResult && <View style={[styles.feedback, answeredCorrectly ? styles.feedbackGood : styles.feedbackRetry]}><Text style={styles.feedbackTitle}>{answeredCorrectly ? "Correct — review scheduled later" : "Not quite — review scheduled sooner"}</Text><Text style={styles.feedbackText}>{quiz.explanation}</Text>{review && <Text style={styles.reviewNote}>Adaptive review: {review.streak ? `streak ${review.streak}` : "restart the recall cycle"} · due {review.dueAt.slice(0, 10)}</Text>}</View>}</View>}<AppButton label={complete ? "Lesson completed" : "Mark lesson complete"} onPress={completeLesson} disabled={complete} /><Text style={[ui.disclaimer, styles.disclaimer]}>Educational content only. This lesson explains a concept and its research process; it does not recommend securities, transactions, or portfolio changes.</Text></ScrollView></ScreenContainer>;
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 34, gap: 14 },
  back: { alignSelf: "flex-start", paddingVertical: 9, paddingRight: 16, marginBottom: 2 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  title: { color: "#10243E", fontSize: 28, lineHeight: 35, fontWeight: "800", letterSpacing: -0.6 },
  meta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  metaText: { color: "#657488", fontSize: 11, fontWeight: "700", flex: 1, textAlign: "right" },
  card: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 18, borderWidth: 1, borderColor: "#E3E8EC", gap: 8 },
  promptCard: { backgroundColor: "#EAF3F2", borderRadius: 22, padding: 18, gap: 8 },
  detailCard: { backgroundColor: "#F2F5FA", borderRadius: 22, padding: 18, gap: 8 },
  detailText: { color: "#354A61", fontSize: 14, lineHeight: 21, fontWeight: "600" },
  practiceCard: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 18, borderWidth: 1, borderColor: "#D6E2E8", gap: 8 },
  practiceText: { color: "#354A61", fontSize: 14, lineHeight: 22, fontWeight: "600" },
  limitCard: { backgroundColor: "#FFF6EA", borderRadius: 18, padding: 15, gap: 5 },
  limitLabel: { color: "#9A601E", fontSize: 10, fontWeight: "900", letterSpacing: 0.8 },
  limitText: { color: "#704C26", fontSize: 13, lineHeight: 19, fontWeight: "600" },
  sourceCard: { backgroundColor: "#F2F4F8", borderRadius: 22, padding: 18, gap: 7 },
  quizCard: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 18, borderWidth: 1, borderColor: "#D6E2E8", gap: 10 },
  sectionLabel: { color: "#007C78", fontSize: 10, fontWeight: "900", letterSpacing: 0.85 },
  body: { color: "#314A60", fontSize: 16, lineHeight: 25, fontWeight: "500" },
  prompt: { color: "#183B4E", fontSize: 17, lineHeight: 25, fontWeight: "800" },
  sourceName: { color: "#10243E", fontSize: 14, fontWeight: "800" },
  sourceNote: { color: "#596B7E", fontSize: 13, lineHeight: 19 },
  quizQuestion: { color: "#10243E", fontSize: 16, lineHeight: 23, fontWeight: "800" },
  choices: { gap: 8 },
  choice: { borderWidth: 1, borderColor: "#DDE5EA", backgroundColor: "#F9FBFC", borderRadius: 14, padding: 13 },
  choiceCorrect: { backgroundColor: "#EAF7EF", borderColor: "#8ACCA1" },
  choiceIncorrect: { backgroundColor: "#FCEDEC", borderColor: "#E4A5A0" },
  choiceText: { color: "#40576B", fontSize: 13, lineHeight: 19, fontWeight: "600" },
  choiceCorrectText: { color: "#166534" },
  feedback: { borderRadius: 14, padding: 13, gap: 4 },
  feedbackGood: { backgroundColor: "#EAF7EF" },
  feedbackRetry: { backgroundColor: "#FFF4E5" },
  feedbackTitle: { color: "#10243E", fontSize: 13, fontWeight: "900" },
  feedbackText: { color: "#526276", fontSize: 12, lineHeight: 18 },
  reviewNote: { color: "#007C78", fontSize: 11, fontWeight: "800", marginTop: 2 },
  disclaimer: { textAlign: "center", marginTop: 2 },
  missing: { flex: 1, padding: 24, justifyContent: "center", gap: 10 },
  missingTitle: { color: "#10243E", fontSize: 24, fontWeight: "800", textAlign: "center" },
  missingText: { color: "#657488", fontSize: 14, textAlign: "center", lineHeight: 20, marginBottom: 8 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});
