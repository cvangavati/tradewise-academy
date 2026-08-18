import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { Pill, ui } from "@/components/tradewise-ui";
import { getMicroLesson } from "@/data/micro-curriculum";
import { haptic } from "@/lib/haptics";
import { useTradeWise } from "@/lib/tradewise-store";

export default function CatalogReviewScreen() {
  const { dueCatalogReviews } = useTradeWise();
  const items = dueCatalogReviews.map((review) => ({ review, lesson: getMicroLesson(review.lessonId) })).filter((item): item is { review: typeof dueCatalogReviews[number]; lesson: NonNullable<ReturnType<typeof getMicroLesson>> } => Boolean(item.lesson));
  return <ScreenContainer><FlatList data={items} keyExtractor={(item) => item.review.lessonId} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} ListHeaderComponent={<View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Learn</Text></Pressable><Text style={ui.eyebrow}>Adaptive review</Text><Text style={ui.title}>{items.length ? "Ready for recall." : "You’re caught up."}</Text><Text style={[ui.subtitle, styles.subtitle]}>{items.length ? "Review these catalog lessons now. A correct check extends the next interval; a missed check returns sooner." : "Complete catalog quizzes to build a local adaptive-review queue."}</Text></View>} renderItem={({ item }) => <Pressable onPress={() => { haptic.light(); router.push(`/catalog/${item.lesson.id}` as never); }} style={({ pressed }) => [styles.card, pressed && styles.pressed]}><View style={styles.cardTop}><Text style={[styles.domain, { color: item.lesson.domain.accent }]}>{item.lesson.domain.title.toUpperCase()}</Text><Pill label={`Streak ${item.review.streak}`} tone="navy" /></View><Text style={styles.title}>{item.lesson.title}</Text><Text style={styles.meta}>Knowledge check due · {item.review.attempts} prior attempt{item.review.attempts === 1 ? "" : "s"}</Text></Pressable>} ItemSeparatorComponent={() => <View style={{ height: 10 }} />} ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>No catalog reviews due</Text><Text style={styles.emptyText}>Your next catalog quiz will create a local review interval based on your answer.</Text><Pressable onPress={() => router.push("/catalog" as never)} style={styles.emptyButton}><Text style={styles.emptyButtonText}>Explore catalog</Text></Pressable></View>} /></ScreenContainer>;
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 34 },
  header: { gap: 8, paddingBottom: 17 },
  back: { alignSelf: "flex-start", paddingVertical: 9, paddingRight: 16 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  subtitle: { maxWidth: 365 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#E3E8EC", padding: 16, gap: 7 },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  domain: { flex: 1, fontSize: 10, fontWeight: "900", letterSpacing: 0.8 },
  title: { color: "#10243E", fontSize: 17, lineHeight: 23, fontWeight: "800" },
  meta: { color: "#657488", fontSize: 12, fontWeight: "700" },
  empty: { backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#E3E8EC", padding: 22, alignItems: "center", gap: 8 },
  emptyTitle: { color: "#10243E", fontSize: 17, fontWeight: "800" },
  emptyText: { color: "#657488", fontSize: 13, lineHeight: 19, textAlign: "center" },
  emptyButton: { marginTop: 4, backgroundColor: "#EAF3F2", borderRadius: 999, paddingHorizontal: 15, paddingVertical: 10 },
  emptyButtonText: { color: "#007C78", fontSize: 13, fontWeight: "900" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});
