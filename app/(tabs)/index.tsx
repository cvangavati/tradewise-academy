import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { AppButton, Pill, ProgressBar, SectionHeading, ui } from "@/components/tradewise-ui";
import { courses, dailyConcepts, totalLessons } from "@/data/curriculum";
import { practiceChallenges } from "@/data/practice";
import { learningProgress, useTradeWise } from "@/lib/tradewise-store";

function money(value: number) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function TodayScreen() {
  const { completedCount, nextLessonId, portfolioValue, cash, isReady } = useTradeWise();
  const progress = learningProgress(completedCount);
  const nextCourse = courses.find((course) => course.lessons.some((lesson) => lesson.id === nextLessonId));
  const nextLesson = nextCourse?.lessons.find((lesson) => lesson.id === nextLessonId) ?? courses[0].lessons[0];
  const challenge = practiceChallenges[completedCount % practiceChallenges.length];
  const concept = dailyConcepts[completedCount % dailyConcepts.length];

  if (!isReady) {
    return <ScreenContainer className="items-center justify-center"><Text style={styles.loading}>Preparing your study desk…</Text></ScreenContainer>;
  }

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView contentContainerStyle={ui.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topSpacing}>
          <Text style={ui.eyebrow}>Your learning desk</Text>
          <Text style={ui.title}>Trade with a plan, not a pulse.</Text>
          <Text style={[ui.subtitle, styles.intro]}>Build fluency across market mechanics, methodologies, risk, and review—at your own pace.</Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.progressTitle}>Learning path</Text>
              <Text style={styles.progressValue}>{completedCount} of {totalLessons} lessons</Text>
            </View>
            <View style={styles.progressBadge}><Text style={styles.progressBadgeText}>{progress}%</Text></View>
          </View>
          <View style={styles.progressSpace}><ProgressBar value={progress} color="#7EE3DB" /></View>
          <Text style={styles.progressHint}>Small, deliberate sessions compound into a clearer process.</Text>
        </View>

        <View style={styles.section}><SectionHeading title="Continue learning" /></View>
        <View style={[ui.card, styles.lessonCard]}>
          <Pill label={nextCourse?.eyebrow ?? "Start here"} tone="teal" />
          <Text style={[ui.cardTitle, styles.lessonTitle]}>{nextLesson.title}</Text>
          <Text style={[ui.cardBody, styles.lessonBody]}>{nextLesson.objective}</Text>
          <View style={styles.lessonMeta}><Text style={styles.metaText}>{nextLesson.duration}</Text><Text style={styles.metaDot}>•</Text><Text style={styles.metaText}>{nextCourse?.title}</Text></View>
          <AppButton label={completedCount === totalLessons ? "Review lesson" : "Continue lesson"} onPress={() => router.push(`/lesson/${nextLesson.id}`)} />
        </View>

        <View style={styles.section}><SectionHeading title="Practice without the pressure" /></View>
        <View style={[ui.card, styles.practiceCard]}>
          <View style={styles.rowBetween}><Pill label={challenge.tag} tone="navy" /><Text style={styles.practiceKicker}>1 question</Text></View>
          <Text style={[ui.cardTitle, styles.challengeTitle]}>{challenge.title}</Text>
          <Text style={ui.cardBody}>{challenge.prompt}</Text>
          <AppButton label="Open practice desk" variant="secondary" onPress={() => router.push("/(tabs)/practice")} style={styles.practiceButton} />
        </View>

        <View style={styles.section}><SectionHeading title="Paper account" /></View>
        <View style={[ui.card, styles.accountCard]}>
          <Text style={ui.metricLabel}>Simulated portfolio value</Text>
          <Text style={ui.metricValue}>{money(portfolioValue)}</Text>
          <View style={styles.accountDivider} />
          <View style={styles.rowBetween}><View><Text style={styles.accountSmallLabel}>Available buying power</Text><Text style={styles.accountSmallValue}>{money(cash)}</Text></View><AppButton label="View account" variant="secondary" onPress={() => router.push("/portfolio" as never)} style={styles.compactButton} /></View>
          <Text style={[ui.disclaimer, styles.disclaimer]}>Illustrative quotes and local paper trades only. No real-money orders or investment recommendations.</Text>
        </View>

        <View style={styles.conceptCard}>
          <Text style={styles.conceptLabel}>TODAY’S PROCESS CUE</Text>
          <Text style={styles.conceptText}>{concept}</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topSpacing: { paddingTop: 12, gap: 8 },
  intro: { maxWidth: 350 },
  loading: { color: "#10243E", fontSize: 16, fontWeight: "700" },
  progressCard: { backgroundColor: "#10243E", borderRadius: 24, marginTop: 26, padding: 20 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressTitle: { color: "#C9D9E8", fontSize: 13, fontWeight: "700" },
  progressValue: { color: "#FFFFFF", fontSize: 21, fontWeight: "800", marginTop: 2 },
  progressBadge: { width: 46, height: 46, borderRadius: 23, backgroundColor: "#1C455B", alignItems: "center", justifyContent: "center" },
  progressBadgeText: { color: "#7EE3DB", fontWeight: "800", fontSize: 13 },
  progressSpace: { marginTop: 18 },
  progressHint: { color: "#C9D9E8", fontSize: 12, lineHeight: 17, marginTop: 12 },
  section: { marginTop: 28 },
  lessonCard: { gap: 12 },
  lessonTitle: { fontSize: 21, lineHeight: 27 },
  lessonBody: { marginTop: -2 },
  lessonMeta: { flexDirection: "row", alignItems: "center", gap: 7 },
  metaText: { color: "#657488", fontSize: 12, fontWeight: "700" },
  metaDot: { color: "#A4B0BC" },
  practiceCard: { gap: 11 },
  practiceKicker: { color: "#657488", fontSize: 12, fontWeight: "700" },
  challengeTitle: { fontSize: 18 },
  practiceButton: { marginTop: 3 },
  accountCard: { gap: 6 },
  accountDivider: { height: 1, backgroundColor: "#E7E9EC", marginVertical: 10 },
  accountSmallLabel: { color: "#657488", fontSize: 12, fontWeight: "700" },
  accountSmallValue: { color: "#10243E", fontSize: 17, fontWeight: "800", marginTop: 2 },
  compactButton: { minHeight: 38, borderRadius: 12, paddingHorizontal: 12 },
  disclaimer: { marginTop: 5 },
  conceptCard: { backgroundColor: "#E5F0EE", borderRadius: 20, padding: 18, marginTop: 22, gap: 5 },
  conceptLabel: { color: "#007C78", fontSize: 11, fontWeight: "800", letterSpacing: 0.9 },
  conceptText: { color: "#183B4E", fontSize: 15, lineHeight: 22, fontWeight: "700" },
});
