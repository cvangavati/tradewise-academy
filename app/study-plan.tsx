import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { AppButton, ui } from "@/components/tradewise-ui";
import { buildStudyPlanText, catalogPlaylists, lessonsForPlaylist } from "@/data/catalog-learning";
import { haptic } from "@/lib/haptics";
import { exportStudyPlan } from "@/lib/study-plan-export";

export default function StudyPlanScreen() {
  const [playlistId, setPlaylistId] = useState(catalogPlaylists[0].id);
  const [status, setStatus] = useState("");
  const playlist = catalogPlaylists.find((item) => item.id === playlistId) ?? catalogPlaylists[0];
  const lessons = lessonsForPlaylist(playlist.id);
  const plan = useMemo(() => buildStudyPlanText(playlist.id), [playlist.id]);
  const download = async () => { haptic.light(); setStatus("Preparing your offline plan…"); const result = await exportStudyPlan(playlist.title, plan); setStatus(result.message); };
  return <ScreenContainer><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Learn</Text></Pressable><Text style={ui.eyebrow}>Offline study plan</Text><Text style={ui.title}>Take your plan with you.</Text><Text style={[ui.subtitle, styles.subtitle]}>Choose a curated goal and generate a plain-text schedule of lesson prompts and source lanes.</Text><View style={styles.chooser}>{catalogPlaylists.map((item) => <Pressable key={item.id} onPress={() => { haptic.selection(); setPlaylistId(item.id); setStatus(""); }} style={({ pressed }) => [styles.option, playlist.id === item.id && { borderColor: item.accent, backgroundColor: "#F6FAFC" }, pressed && styles.pressed]}><View style={[styles.dot, { backgroundColor: item.accent }]} /><View style={styles.optionText}><Text style={styles.optionTitle}>{item.title}</Text><Text style={styles.optionMeta}>{item.days}-day path · {lessonsForPlaylist(item.id).length} lessons</Text></View></Pressable>)}</View><View style={styles.preview}><Text style={styles.previewLabel}>PLAN PREVIEW</Text><Text style={styles.previewTitle}>{playlist.title}</Text><Text style={styles.previewText}>A {playlist.days}-day plan with up to 28 study prompts selected from this path. The export includes lesson titles and source lanes, not live data or recommendations.</Text><Text style={styles.previewCount}>{Math.min(28, lessons.length)} planned lessons · plain text</Text></View><AppButton label="Download study plan" onPress={download} /><Text style={styles.status}>{status}</Text><Text style={[ui.disclaimer, styles.disclaimer]}>The exported plan is educational only. It contains no holdings, real-time market data, personalized recommendations, or account information.</Text></ScrollView></ScreenContainer>;
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 34, gap: 14 },
  back: { alignSelf: "flex-start", paddingVertical: 9, paddingRight: 16, marginBottom: 2 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  subtitle: { maxWidth: 365 },
  chooser: { gap: 9, marginTop: 4 },
  option: { minHeight: 64, backgroundColor: "#FFFFFF", borderRadius: 17, borderWidth: 1, borderColor: "#E3E8EC", padding: 13, flexDirection: "row", alignItems: "center", gap: 11 },
  dot: { height: 10, width: 10, borderRadius: 5 },
  optionText: { flex: 1 },
  optionTitle: { color: "#10243E", fontSize: 15, fontWeight: "800" },
  optionMeta: { color: "#657488", fontSize: 11, fontWeight: "700", marginTop: 3 },
  preview: { backgroundColor: "#10243E", borderRadius: 22, padding: 18, gap: 8 },
  previewLabel: { color: "#90DBD5", fontSize: 10, fontWeight: "900", letterSpacing: 0.8 },
  previewTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "800" },
  previewText: { color: "#C6D5E1", fontSize: 13, lineHeight: 20 },
  previewCount: { color: "#90DBD5", fontSize: 12, fontWeight: "800", marginTop: 2 },
  status: { color: "#007C78", fontSize: 13, textAlign: "center", minHeight: 18, fontWeight: "700" },
  disclaimer: { textAlign: "center" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});
