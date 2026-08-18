import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { AppButton, Pill, ui } from "@/components/tradewise-ui";
import { allGlossaryEntries } from "@/data/glossary";
import { haptic } from "@/lib/haptics";
import { useTradeWise } from "@/lib/tradewise-store";
import type { ReviewRating } from "@/data/spaced-review";

export default function ReviewScreen() {
  const { savedTerms, dueTerms, rateSavedTerm } = useTradeWise();
  const current = dueTerms[0] ?? savedTerms[0];
  const entry = current ? allGlossaryEntries.find((item) => item.term === current.term) : undefined;

  function rate(rating: ReviewRating) {
    if (!current) return;
    haptic.success();
    rateSavedTerm(current.term, rating);
  }

  return <ScreenContainer><View style={styles.screen}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Profile</Text></Pressable><Text style={ui.eyebrow}>Saved terms</Text><Text style={ui.title}>Recall, then schedule.</Text><Text style={[ui.subtitle, styles.subtitle]}>A lightweight local review loop. Rate your recall after revealing the definition and the term will be rescheduled.</Text>{!entry ? <EmptyReview /> : <View style={styles.card}><View style={styles.cardTop}><Pill label={entry.category} tone={entry.category === "Risk" ? "coral" : entry.category === "Options" ? "navy" : "teal"} /><Text style={styles.reviewCount}>Review {current.reviewCount + 1}</Text></View><Text style={styles.term}>{entry.term}</Text><Text style={styles.prompt}>Can you explain this term in your own words?</Text><View style={styles.definitionBox}><Text style={styles.definitionLabel}>DEFINITION</Text><Text style={styles.definition}>{entry.definition}</Text></View><Text style={styles.related}>Related: {entry.relatedCourse}</Text><Text style={styles.ratePrompt}>How well did you recall it?</Text><View style={styles.ratings}><RatingButton label="Again" detail="1 day" tone="again" onPress={() => rate("again")} /><RatingButton label="Good" detail="3 days" tone="good" onPress={() => rate("good")} /><RatingButton label="Easy" detail="7 days" tone="easy" onPress={() => rate("easy")} /></View></View>}<Text style={[ui.disclaimer, styles.note]}>Spaced review schedules local reminders inside the app only. It does not send notifications or use cloud storage.</Text></View></ScreenContainer>;
}

function EmptyReview() {
  return <View style={styles.empty}><Text style={styles.emptyTitle}>No saved terms yet</Text><Text style={styles.emptyText}>Open the glossary and tap Save on any definition you want to revisit.</Text><AppButton label="Open glossary" onPress={() => router.replace("/glossary" as never)} style={styles.emptyButton} /></View>;
}

function RatingButton({ label, detail, tone, onPress }: { label: string; detail: string; tone: "again" | "good" | "easy"; onPress: () => void }) {
  const toneStyle = tone === "again" ? styles.again : tone === "good" ? styles.good : styles.easy;
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.rating, toneStyle, pressed && styles.pressed]}><Text style={styles.ratingLabel}>{label}</Text><Text style={styles.ratingDetail}>{detail}</Text></Pressable>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20, paddingTop: 4 },
  back: { alignSelf: "flex-start", paddingVertical: 10, paddingRight: 14, marginBottom: 2 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  subtitle: { marginTop: 8 },
  card: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E4E9ED", borderRadius: 24, padding: 19, marginTop: 24, gap: 13 },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  reviewCount: { color: "#657488", fontSize: 12, fontWeight: "700" },
  term: { color: "#10243E", fontSize: 27, lineHeight: 34, fontWeight: "800", letterSpacing: -0.5 },
  prompt: { color: "#526276", fontSize: 14, lineHeight: 20 },
  definitionBox: { backgroundColor: "#EAF3F2", padding: 15, borderRadius: 17, gap: 6 },
  definitionLabel: { color: "#007C78", fontSize: 10, letterSpacing: 0.8, fontWeight: "800" },
  definition: { color: "#24475C", fontSize: 14, lineHeight: 21, fontWeight: "600" },
  related: { color: "#007C78", fontSize: 12, fontWeight: "800" },
  ratePrompt: { color: "#10243E", fontSize: 15, fontWeight: "800", marginTop: 3 },
  ratings: { flexDirection: "row", gap: 8 },
  rating: { flex: 1, paddingVertical: 11, borderRadius: 14, alignItems: "center" },
  again: { backgroundColor: "#FDE8E6" },
  good: { backgroundColor: "#E8F1FA" },
  easy: { backgroundColor: "#E3F4E9" },
  ratingLabel: { color: "#10243E", fontSize: 13, fontWeight: "800" },
  ratingDetail: { color: "#526276", fontSize: 10, marginTop: 2 },
  note: { textAlign: "center", marginTop: 17 },
  empty: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E4E9ED", borderRadius: 22, padding: 22, alignItems: "center", marginTop: 26 },
  emptyTitle: { color: "#10243E", fontSize: 18, fontWeight: "800" },
  emptyText: { color: "#657488", fontSize: 14, lineHeight: 20, textAlign: "center", marginTop: 7 },
  emptyButton: { alignSelf: "stretch", marginTop: 16 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});
