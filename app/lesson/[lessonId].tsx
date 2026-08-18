import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useMemo, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { AppButton, Pill, ui } from "@/components/tradewise-ui";
import { courses, type Lesson } from "@/data/curriculum";
import { haptic } from "@/lib/haptics";
import { useTradeWise } from "@/lib/tradewise-store";

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const lesson = useMemo(() => courses.flatMap((course) => course.lessons).find((item) => item.id === lessonId), [lessonId]);
  const course = useMemo(() => courses.find((item) => item.lessons.some((lessonItem) => lessonItem.id === lessonId)), [lessonId]);
  const [choice, setChoice] = useState<number | null>(null);
  const { completedLessonIds, completeLesson } = useTradeWise();

  if (!lesson || !course) {
    return <ScreenContainer className="items-center justify-center p-6"><Text style={ui.title}>Lesson unavailable</Text><View style={{ height: 14 }} /><AppButton label="Back to learn" onPress={() => router.replace("/(tabs)/learn")} /></ScreenContainer>;
  }

  const completed = completedLessonIds.includes(lesson.id);
  const isCorrect = choice === lesson.quiz.answerIndex;
  const answerStatus = choice === null ? null : isCorrect ? "correct" : "incorrect";

  function finishLesson() {
    if (choice === null || !lesson) return;
    completeLesson(lesson.id, isCorrect);
    if (isCorrect) haptic.success(); else haptic.error();
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={ui.content} showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Learn</Text></Pressable>
        <View style={styles.header}><Pill label={course.title} tone="navy" /><Text style={ui.title}>{lesson.title}</Text><Text style={ui.subtitle}>{lesson.objective}</Text><Text style={styles.duration}>{lesson.duration} study session</Text></View>

        <View style={styles.bodyCard}><Text style={styles.bodyText}>{lesson.body}</Text></View>

        <View style={styles.takeawayCard}><Text style={styles.takeawayLabel}>KEY TAKEAWAYS</Text><Text style={styles.takeawayText}>• {lesson.takeaways.join("\n• ")}</Text></View>

        <View style={styles.sourceCard}><Text style={styles.sourceLabel}>FURTHER READING</Text><Text style={styles.sourceText}>{lesson.source.label}</Text><Text style={styles.sourceUrl}>{lesson.source.url}</Text></View>

        <View style={styles.quizArea}><Text style={styles.quizEyebrow}>KNOWLEDGE CHECK</Text><Text style={styles.quizQuestion}>{lesson.quiz.question}</Text><QuizOptions lesson={lesson} choice={choice} setChoice={setChoice} answerStatus={answerStatus} /></View>

        {choice !== null && <View style={[styles.feedback, isCorrect ? styles.feedbackRight : styles.feedbackWrong]}><Text style={[styles.feedbackTitle, isCorrect ? styles.feedbackRightText : styles.feedbackWrongText]}>{isCorrect ? "That’s right." : "Not quite."}</Text><Text style={[styles.feedbackBody, isCorrect ? styles.feedbackRightText : styles.feedbackWrongText]}>{lesson.quiz.explanation}</Text></View>}

        <AppButton label={completed ? "Lesson complete" : choice === null ? "Choose an answer" : isCorrect ? "Mark lesson complete" : "Record attempt"} disabled={choice === null || completed} onPress={finishLesson} />
        <Text style={[ui.disclaimer, styles.disclaimer]}>This lesson is educational only. It does not provide personalized investment advice or a recommendation to trade.</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

function QuizOptions({ lesson, choice, setChoice, answerStatus }: { lesson: Lesson; choice: number | null; setChoice: (value: number) => void; answerStatus: "correct" | "incorrect" | null }) {
  return <FlatList data={lesson.quiz.options} scrollEnabled={false} keyExtractor={(item, index) => `${index}-${item}`} contentContainerStyle={styles.options} renderItem={({ item, index }) => { const selected = choice === index; const correct = answerStatus !== null && index === lesson.quiz.answerIndex; return <Pressable onPress={() => { haptic.selection(); setChoice(index); }} style={({ pressed }) => [styles.option, selected && styles.optionSelected, correct && styles.optionCorrect, pressed && styles.pressed]}><View style={[styles.optionMark, selected && styles.optionMarkSelected, correct && styles.optionMarkCorrect]}><Text style={[styles.optionLetter, (selected || correct) && styles.optionLetterSelected]}>{String.fromCharCode(65 + index)}</Text></View><Text style={styles.optionText}>{item}</Text></Pressable>; }} />;
}

const styles = StyleSheet.create({
  back: { alignSelf: "flex-start", paddingVertical: 10, paddingRight: 14, marginTop: 4 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  header: { gap: 10, marginTop: 8 },
  duration: { color: "#657488", fontSize: 12, fontWeight: "700" },
  bodyCard: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 20, marginTop: 24, borderWidth: 1, borderColor: "#E7E9EC" },
  bodyText: { color: "#263D55", fontSize: 16, lineHeight: 25 },
  takeawayCard: { backgroundColor: "#E7F0EF", borderRadius: 20, padding: 18, marginTop: 14, gap: 8 },
  takeawayLabel: { color: "#007C78", fontSize: 11, letterSpacing: 0.9, fontWeight: "800" },
  takeawayText: { color: "#22465B", fontSize: 14, lineHeight: 22, fontWeight: "700" },
  sourceCard: { backgroundColor: "#F0F2F4", borderRadius: 18, padding: 15, marginTop: 14, gap: 4 },
  sourceLabel: { color: "#657488", fontSize: 10, letterSpacing: 0.8, fontWeight: "800" },
  sourceText: { color: "#354A61", fontSize: 13, fontWeight: "700" },
  sourceUrl: { color: "#657488", fontSize: 10, lineHeight: 15 },
  quizArea: { marginTop: 28 },
  quizEyebrow: { color: "#007C78", fontSize: 11, fontWeight: "800", letterSpacing: 0.9 },
  quizQuestion: { color: "#10243E", fontSize: 19, lineHeight: 26, fontWeight: "800", marginTop: 6 },
  options: { gap: 10, paddingTop: 16 },
  option: { backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 1, borderColor: "#E1E6EA", padding: 13, flexDirection: "row", alignItems: "center", gap: 11 },
  optionSelected: { borderColor: "#007C78", backgroundColor: "#F3FBFA" },
  optionCorrect: { borderColor: "#15803D", backgroundColor: "#F1FAF3" },
  optionMark: { width: 27, height: 27, borderRadius: 14, backgroundColor: "#EEF1F4", justifyContent: "center", alignItems: "center" },
  optionMarkSelected: { backgroundColor: "#007C78" },
  optionMarkCorrect: { backgroundColor: "#15803D" },
  optionLetter: { color: "#657488", fontSize: 11, fontWeight: "800" },
  optionLetterSelected: { color: "#FFFFFF" },
  optionText: { flex: 1, color: "#354A61", fontSize: 14, lineHeight: 20, fontWeight: "600" },
  feedback: { borderRadius: 16, padding: 15, marginTop: 14, gap: 3 },
  feedbackRight: { backgroundColor: "#E9F7EC" },
  feedbackWrong: { backgroundColor: "#FDECE9" },
  feedbackTitle: { fontSize: 14, fontWeight: "800" },
  feedbackBody: { fontSize: 13, lineHeight: 19 },
  feedbackRightText: { color: "#176E3A" },
  feedbackWrongText: { color: "#A44640" },
  disclaimer: { textAlign: "center", marginTop: 13 },
  pressed: { opacity: 0.7 },
});
