import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { Pill, ProgressBar, SectionHeading, ui } from "@/components/tradewise-ui";
import { learningProgress, useTradeWise, type CourseProgress } from "@/lib/tradewise-store";

export default function ProgressScreen() {
  const { learningAnalytics } = useTradeWise();
  const overall = learningProgress(learningAnalytics.completedCount);

  return (
    <ScreenContainer>
      <FlatList
        data={learningAnalytics.courseProgress}
        keyExtractor={(item) => item.courseId}
        contentContainerStyle={ui.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Profile</Text></Pressable><Text style={ui.eyebrow}>Learning analytics</Text><Text style={ui.title}>Your progress dashboard</Text><Text style={ui.subtitle}>Measure completion and quiz understanding across the curriculum—without treating one score as a prediction of trading results.</Text><View style={styles.hero}><View style={styles.ring}><Text style={styles.ringValue}>{overall}%</Text><Text style={styles.ringLabel}>complete</Text></View><View style={styles.heroCopy}><Text style={styles.heroTitle}>{learningAnalytics.completedCount} lessons completed</Text><Text style={styles.heroText}>{learningAnalytics.quizAttempts ? `${learningAnalytics.quizCorrect} of ${learningAnalytics.quizAttempts} knowledge checks correct` : "Complete a knowledge check to start your accuracy record."}</Text></View></View><View style={styles.metrics}><Metric label="Quiz accuracy" value={learningAnalytics.quizAttempts ? `${learningAnalytics.quizAccuracy}%` : "—"} detail={learningAnalytics.quizAttempts ? "Across attempted checks" : "No checks yet"} /><Metric label="Checks attempted" value={`${learningAnalytics.quizAttempts}`} detail="One per lesson" /></View><View style={styles.section}><SectionHeading title="Course-level progress" /></View></View>}
        renderItem={({ item }) => <CourseProgressCard item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={<Text style={[ui.disclaimer, styles.footer]}>Scores track the in-app knowledge checks only. They are for learning reflection and do not evaluate financial suitability or predict outcomes.</Text>}
      />
    </ScreenContainer>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <View style={styles.metric}><Text style={styles.metricLabel}>{label}</Text><Text style={styles.metricValue}>{value}</Text><Text style={styles.metricDetail}>{detail}</Text></View>;
}

function CourseProgressCard({ item }: { item: CourseProgress }) {
  return <View style={styles.card}><View style={styles.cardTop}><View style={{ flex: 1 }}><Text style={styles.courseTitle}>{item.title}</Text><Text style={styles.courseDetail}>{item.completed} of {item.total} lessons completed</Text></View><Pill label={`${item.completion}%`} tone={item.completion === 100 ? "teal" : "gray"} /></View><View style={styles.bar}><ProgressBar value={item.completion} color={item.accent} /></View><View style={styles.cardBottom}><View><Text style={styles.smallLabel}>QUIZ ACCURACY</Text><Text style={styles.smallValue}>{item.quizAttempts ? `${item.quizAccuracy}%` : "—"}</Text></View><View style={styles.divider} /><View><Text style={styles.smallLabel}>CHECKS</Text><Text style={styles.smallValue}>{item.quizCorrect}/{item.quizAttempts}</Text></View></View></View>;
}

const styles = StyleSheet.create({
  header: { paddingTop: 4, gap: 8 },
  back: { alignSelf: "flex-start", paddingVertical: 10, paddingRight: 14, marginBottom: 2 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  hero: { backgroundColor: "#10243E", borderRadius: 24, padding: 18, marginTop: 14, flexDirection: "row", alignItems: "center", gap: 15 },
  ring: { width: 82, height: 82, borderRadius: 41, borderWidth: 7, borderColor: "#2B6172", backgroundColor: "#173B52", alignItems: "center", justifyContent: "center" },
  ringValue: { color: "#7EE3DB", fontSize: 19, fontWeight: "800" },
  ringLabel: { color: "#BBD0E1", fontSize: 9, fontWeight: "800", marginTop: 1 },
  heroCopy: { flex: 1 },
  heroTitle: { color: "#FFFFFF", fontSize: 17, lineHeight: 22, fontWeight: "800" },
  heroText: { color: "#C6D8E4", fontSize: 12, lineHeight: 18, marginTop: 5 },
  metrics: { flexDirection: "row", gap: 10, marginTop: 12 },
  metric: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 18, borderWidth: 1, borderColor: "#E4E9ED", padding: 14 },
  metricLabel: { color: "#657488", fontSize: 10, letterSpacing: 0.6, fontWeight: "800", textTransform: "uppercase" },
  metricValue: { color: "#10243E", fontSize: 23, fontWeight: "800", marginTop: 5 },
  metricDetail: { color: "#657488", fontSize: 11, marginTop: 2 },
  section: { marginTop: 26 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#E4E9ED", padding: 16 },
  cardTop: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  courseTitle: { color: "#10243E", fontSize: 17, lineHeight: 22, fontWeight: "800" },
  courseDetail: { color: "#657488", fontSize: 12, marginTop: 3 },
  bar: { marginTop: 15 },
  cardBottom: { flexDirection: "row", alignItems: "center", marginTop: 16, gap: 16 },
  smallLabel: { color: "#657488", fontSize: 10, letterSpacing: 0.65, fontWeight: "800" },
  smallValue: { color: "#10243E", fontSize: 16, fontWeight: "800", marginTop: 3 },
  divider: { width: 1, height: 26, backgroundColor: "#E4E9ED" },
  footer: { paddingTop: 20, textAlign: "center" },
  pressed: { opacity: 0.72 },
});
