import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { Pill, ProgressBar, ui } from "@/components/tradewise-ui";
import { courses, type Course } from "@/data/curriculum";
import { microLessonCount } from "@/data/micro-curriculum";
import { haptic } from "@/lib/haptics";
import { useTradeWise } from "@/lib/tradewise-store";

export default function LearnScreen() {
  const { completedLessonIds, catalogCompletedCount, catalogQuizAccuracy, dueCatalogReviews } = useTradeWise();
  const catalogProgress = Math.round((catalogCompletedCount / microLessonCount) * 100);

  return (
    <ScreenContainer>
      <FlatList
        data={courses}
        keyExtractor={(course) => course.id}
        contentContainerStyle={ui.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={ui.eyebrow}>Catalog-first curriculum</Text>
            <Text style={ui.title}>One market concept at a time.</Text>
            <Text style={[ui.subtitle, styles.subtitle]}>The catalog is now your main learning path: search {microLessonCount.toLocaleString()} short lessons, take a knowledge check, and return through adaptive review.</Text>
            <View style={styles.overview}><View style={styles.overviewTop}><Text style={styles.overviewLabel}>CATALOG PROGRESS</Text><Text style={styles.overviewPercent}>{catalogProgress}%</Text></View><ProgressBar value={catalogProgress} /><Text style={styles.overviewText}>{catalogCompletedCount.toLocaleString()} lessons complete · {catalogQuizAccuracy}% quiz accuracy · {dueCatalogReviews.length} review due</Text></View>
            <Pressable onPress={() => { haptic.light(); router.push("/ai-guide" as never); }} style={({ pressed }) => [styles.aiGuide, pressed && styles.cardPressed]}><View><Text style={styles.aiEyebrow}>NEW · AI-ASSISTED DISCOVERY</Text><Text style={styles.aiTitle}>Ask for a learning path</Text><Text style={styles.aiText}>Describe what you want to understand and get validated catalog lessons with reasons.</Text></View><Text style={styles.aiArrow}>›</Text></Pressable>
            <Pressable onPress={() => { haptic.light(); router.push("/catalog" as never); }} style={({ pressed }) => [styles.catalog, pressed && styles.cardPressed]}><View><Text style={styles.catalogEyebrow}>MAIN PATH · {microLessonCount.toLocaleString()} MICRO-LESSONS</Text><Text style={styles.catalogTitle}>Explore the complete catalog</Text><Text style={styles.catalogText}>Search every topic through 48 short study lenses and adaptive checks.</Text></View><Text style={styles.catalogArrow}>›</Text></Pressable>
            <View style={styles.toolRow}><Pressable onPress={() => router.push("/playlists" as never)} style={({ pressed }) => [styles.tool, pressed && styles.cardPressed]}><Text style={styles.toolTitle}>Playlists</Text><Text style={styles.toolText}>Goal-based paths</Text></Pressable><Pressable onPress={() => router.push("/catalog-review" as never)} style={({ pressed }) => [styles.tool, pressed && styles.cardPressed]}><Text style={styles.toolTitle}>Review</Text><Text style={styles.toolText}>{dueCatalogReviews.length ? `${dueCatalogReviews.length} due now` : "Stay fresh"}</Text></Pressable><Pressable onPress={() => router.push("/study-plan" as never)} style={({ pressed }) => [styles.tool, pressed && styles.cardPressed]}><Text style={styles.toolTitle}>Study plan</Text><Text style={styles.toolText}>Download offline</Text></Pressable></View>
            <Pressable onPress={() => { haptic.light(); router.push("/library" as never); }} style={({ pressed }) => [styles.atlas, pressed && styles.cardPressed]}><View><Text style={styles.atlasEyebrow}>NEW · REFERENCE LIBRARY</Text><Text style={styles.atlasTitle}>Browse the Stock Market Atlas</Text><Text style={styles.atlasText}>Search systems, products, disclosures, and risk concepts.</Text></View><Text style={styles.atlasArrow}>›</Text></Pressable>
            <Text style={styles.guidedHeading}>GUIDED STARTER COURSES</Text>
          </View>
        }
        renderItem={({ item }) => <CourseCard course={item} completedLessonIds={completedLessonIds} />}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        ListFooterComponent={<Text style={[ui.disclaimer, styles.footer]}>Educational content only. Lessons explain concepts and process; they do not recommend securities, positions, or strategies.</Text>}
      />
    </ScreenContainer>
  );
}

function CourseCard({ course, completedLessonIds }: { course: Course; completedLessonIds: string[] }) {
  const completed = course.lessons.filter((lesson) => completedLessonIds.includes(lesson.id)).length;
  const nextLesson = course.lessons.find((lesson) => !completedLessonIds.includes(lesson.id)) ?? course.lessons[0];
  const courseProgress = Math.round((completed / course.lessons.length) * 100);

  return (
    <Pressable onPress={() => { haptic.light(); router.push(`/lesson/${nextLesson.id}` as never); }} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.cardTop}><Pill label={course.level} tone={course.level === "Beginner" ? "teal" : course.level === "Intermediate" ? "navy" : "coral"} /><Text style={styles.duration}>{course.lessons.length} lessons</Text></View>
      <View style={[styles.accent, { backgroundColor: course.accent }]} />
      <Text style={styles.cardTitle}>{course.title}</Text>
      <Text style={styles.cardDescription}>{course.description}</Text>
      <View style={styles.courseFooter}><View style={styles.courseProgress}><ProgressBar value={courseProgress} color={course.accent} /><Text style={styles.progressText}>{completed}/{course.lessons.length} complete</Text></View><Text style={styles.openText}>{completed === course.lessons.length ? "Review" : "Open"} ›</Text></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 12, paddingBottom: 22, gap: 8 },
  subtitle: { maxWidth: 365 },
  overview: { backgroundColor: "#E7F0EF", borderRadius: 18, padding: 15, marginTop: 13, gap: 10 },
  overviewTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  overviewLabel: { color: "#006663", fontSize: 11, fontWeight: "800", letterSpacing: 0.8 },
  overviewPercent: { color: "#006663", fontSize: 15, fontWeight: "800" },
  overviewText: { color: "#526276", fontSize: 12, lineHeight: 17 },
  atlas: { backgroundColor: "#10243E", borderRadius: 18, padding: 16, marginTop: 2, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  atlasEyebrow: { color: "#82D8D1", fontSize: 10, fontWeight: "800", letterSpacing: 0.8 },
  atlasTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", marginTop: 5 },
  atlasText: { color: "#C8D6E2", fontSize: 12, marginTop: 3 },
  atlasArrow: { color: "#82D8D1", fontSize: 28, fontWeight: "700", paddingLeft: 10 },
  catalog: { backgroundColor: "#E6F2F8", borderRadius: 18, padding: 16, marginTop: 2, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  catalogEyebrow: { color: "#4066B0", fontSize: 10, fontWeight: "800", letterSpacing: 0.8 },
  catalogTitle: { color: "#183B4E", fontSize: 17, fontWeight: "800", marginTop: 5 },
  catalogText: { color: "#526276", fontSize: 12, marginTop: 3 },
  catalogArrow: { color: "#4066B0", fontSize: 28, fontWeight: "700", paddingLeft: 10 },
  aiGuide: { backgroundColor: "#E5F0EE", borderRadius: 18, padding: 16, marginTop: 2, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  aiEyebrow: { color: "#007C78", fontSize: 10, fontWeight: "800", letterSpacing: 0.8 },
  aiTitle: { color: "#183B4E", fontSize: 17, fontWeight: "800", marginTop: 5 },
  aiText: { color: "#526276", fontSize: 12, marginTop: 3, maxWidth: 300 },
  aiArrow: { color: "#007C78", fontSize: 28, fontWeight: "700", paddingLeft: 10 },
  toolRow: { flexDirection: "row", gap: 8, marginTop: 1 },
  tool: { flex: 1, minHeight: 68, borderRadius: 15, borderWidth: 1, borderColor: "#DDE5EA", backgroundColor: "#FFFFFF", padding: 10, justifyContent: "center" },
  toolTitle: { color: "#10243E", fontSize: 12, fontWeight: "900" },
  toolText: { color: "#657488", fontSize: 10, fontWeight: "700", marginTop: 3 },
  guidedHeading: { color: "#657488", fontSize: 11, fontWeight: "900", letterSpacing: 0.8, marginTop: 10 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 18, borderWidth: 1, borderColor: "#E7E9EC", overflow: "hidden" },
  cardPressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  duration: { color: "#657488", fontSize: 12, fontWeight: "700" },
  accent: { height: 4, width: 42, borderRadius: 99, marginTop: 16, marginBottom: 12 },
  cardTitle: { color: "#10243E", fontSize: 21, lineHeight: 26, fontWeight: "800", letterSpacing: -0.35 },
  cardDescription: { color: "#5C6B7D", fontSize: 14, lineHeight: 20, marginTop: 6 },
  courseFooter: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginTop: 18, gap: 14 },
  courseProgress: { flex: 1, gap: 6 },
  progressText: { color: "#657488", fontSize: 11, fontWeight: "700" },
  openText: { color: "#007C78", fontSize: 14, fontWeight: "800" },
  footer: { paddingTop: 20, textAlign: "center" },
});
