import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { Pill, ui } from "@/components/tradewise-ui";
import { catalogPlaylists, lessonsForPlaylist } from "@/data/catalog-learning";
import { haptic } from "@/lib/haptics";
import { useTradeWise } from "@/lib/tradewise-store";

export default function PlaylistDetailScreen() {
  const { playlistId } = useLocalSearchParams<{ playlistId: string }>();
  const playlist = catalogPlaylists.find((item) => item.id === playlistId);
  const lessons = lessonsForPlaylist(playlistId ?? "");
  const { completedCatalogLessonIds } = useTradeWise();
  if (!playlist) return <ScreenContainer><View style={styles.missing}><Text style={styles.missingTitle}>Playlist not found</Text><Pressable onPress={() => router.back()}><Text style={styles.backText}>Back to playlists</Text></Pressable></View></ScreenContainer>;
  return <ScreenContainer><FlatList data={lessons} keyExtractor={(item) => item.id} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} ListHeaderComponent={<View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Playlists</Text></Pressable><Text style={[ui.eyebrow, { color: playlist.accent }]}>{playlist.days}-DAY STUDY PATH</Text><Text style={ui.title}>{playlist.title}</Text><Text style={[ui.subtitle, styles.subtitle]}>{playlist.subtitle}</Text><Text style={styles.lessonCount}>{lessons.length} short lessons · tap any item to study and take its knowledge check</Text></View>} renderItem={({ item, index }) => { const complete = completedCatalogLessonIds.includes(item.id); return <Pressable onPress={() => { haptic.light(); router.push(`/catalog/${item.id}` as never); }} style={({ pressed }) => [styles.lesson, complete && styles.lessonComplete, pressed && styles.pressed]}><View style={[styles.number, { backgroundColor: playlist.accent }]}><Text style={styles.numberText}>{index + 1}</Text></View><View style={styles.lessonText}><Text style={styles.lessonTitle}>{item.title}</Text><Text style={styles.lessonMeta}>{complete ? "Completed" : item.frame} · {item.domain.title}</Text></View><Pill label={complete ? "Done" : "Study"} tone={complete ? "teal" : "navy"} /></Pressable>; }} ItemSeparatorComponent={() => <View style={{ height: 9 }} />} /></ScreenContainer>;
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 34 },
  header: { gap: 8, paddingBottom: 17 },
  back: { alignSelf: "flex-start", paddingVertical: 9, paddingRight: 16 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  subtitle: { maxWidth: 365 },
  lessonCount: { color: "#657488", fontSize: 12, lineHeight: 18, marginTop: 3, fontWeight: "700" },
  lesson: { minHeight: 70, backgroundColor: "#FFFFFF", borderRadius: 18, borderWidth: 1, borderColor: "#E3E8EC", padding: 13, flexDirection: "row", alignItems: "center", gap: 11 },
  lessonComplete: { backgroundColor: "#F5FBF8", borderColor: "#D8EDE2" },
  number: { height: 28, width: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  numberText: { color: "#FFFFFF", fontSize: 11, fontWeight: "900" },
  lessonText: { flex: 1, gap: 3 },
  lessonTitle: { color: "#10243E", fontSize: 14, lineHeight: 19, fontWeight: "800" },
  lessonMeta: { color: "#657488", fontSize: 11, fontWeight: "700" },
  missing: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  missingTitle: { color: "#10243E", fontSize: 20, fontWeight: "800" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});
