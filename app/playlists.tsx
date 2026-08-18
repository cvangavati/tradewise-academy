import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { Pill, ProgressBar, ui } from "@/components/tradewise-ui";
import { catalogPlaylists, lessonsForPlaylist } from "@/data/catalog-learning";
import { haptic } from "@/lib/haptics";
import { useTradeWise } from "@/lib/tradewise-store";

export default function PlaylistsScreen() {
  const { completedCatalogLessonIds } = useTradeWise();
  return <ScreenContainer><FlatList data={catalogPlaylists} keyExtractor={(item) => item.id} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} ListHeaderComponent={<View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Learn</Text></Pressable><Text style={ui.eyebrow}>Curated learning paths</Text><Text style={ui.title}>Choose a study goal.</Text><Text style={[ui.subtitle, styles.subtitle]}>Each playlist arranges short catalog lessons into a focused, source-grounded path.</Text></View>} renderItem={({ item }) => { const lessons = lessonsForPlaylist(item.id); const completed = lessons.filter((lesson) => completedCatalogLessonIds.includes(lesson.id)).length; const progress = lessons.length ? Math.round((completed / lessons.length) * 100) : 0; return <Pressable onPress={() => { haptic.light(); router.push(`/playlist/${item.id}` as never); }} style={({ pressed }) => [styles.card, pressed && styles.pressed]}><View style={[styles.accent, { backgroundColor: item.accent }]} /><View style={styles.cardTop}><Pill label={`${item.days}-day path`} tone="navy" /><Text style={styles.count}>{lessons.length} lessons</Text></View><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardText}>{item.subtitle}</Text><View style={styles.progress}><ProgressBar value={progress} color={item.accent} /><Text style={styles.progressText}>{completed}/{lessons.length} completed · {progress}%</Text></View><Text style={[styles.open, { color: item.accent }]}>Open playlist  ›</Text></Pressable>; }} ItemSeparatorComponent={() => <View style={{ height: 12 }} />} ListFooterComponent={<Text style={[ui.disclaimer, styles.footer]}>Playlists organize education around goals. They do not imply that a product, security, or strategy is suitable for you.</Text>} /></ScreenContainer>;
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 34 },
  header: { gap: 8, paddingBottom: 17 },
  back: { alignSelf: "flex-start", paddingVertical: 9, paddingRight: 16 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  subtitle: { maxWidth: 365 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 17, borderWidth: 1, borderColor: "#E3E8EC", gap: 9 },
  accent: { height: 4, width: 46, borderRadius: 99 },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  count: { color: "#657488", fontSize: 11, fontWeight: "800" },
  cardTitle: { color: "#10243E", fontSize: 20, fontWeight: "800", letterSpacing: -0.25 },
  cardText: { color: "#526276", fontSize: 13, lineHeight: 19 },
  progress: { gap: 6, marginTop: 4 },
  progressText: { color: "#657488", fontSize: 11, fontWeight: "700" },
  open: { fontSize: 13, fontWeight: "900", marginTop: 2 },
  footer: { paddingTop: 20, textAlign: "center" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});
