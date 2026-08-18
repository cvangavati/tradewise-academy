import { router } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { AppButton, Pill, ProgressBar, SectionHeading, ui } from "@/components/tradewise-ui";
import { courses, totalLessons } from "@/data/curriculum";
import { haptic } from "@/lib/haptics";
import { learningProgress, useTradeWise } from "@/lib/tradewise-store";

export default function ProfileScreen() {
  const { completedCount, activities, resetProgress } = useTradeWise();
  const progress = learningProgress(completedCount);

  function confirmReset() {
    Alert.alert("Reset local progress?", "This removes completed lessons and clears the paper portfolio on this device.", [
      { text: "Cancel", style: "cancel" },
      { text: "Reset", style: "destructive", onPress: () => { haptic.medium(); resetProgress(); } },
    ]);
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={ui.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}><Text style={ui.eyebrow}>Your practice record</Text><Text style={ui.title}>Keep the process honest.</Text><Text style={[ui.subtitle, styles.subtitle]}>Progress is stored on this device. This first version does not require an account or share personal trading data.</Text></View>

        <View style={styles.profileCard}><View style={styles.avatar}><Text style={styles.avatarText}>TW</Text></View><View style={styles.profileCopy}><Text style={styles.profileName}>Independent learner</Text><Text style={styles.profileDetail}>Building a repeatable decision process</Text></View></View>

        <View style={styles.section}><SectionHeading title="Learning progress" /></View>
        <View style={ui.card}><View style={styles.progressTop}><View><Text style={ui.metricLabel}>CURRICULUM</Text><Text style={ui.metricValue}>{completedCount} / {totalLessons}</Text></View><Pill label={`${progress}% complete`} tone="teal" /></View><View style={styles.progressSpace}><ProgressBar value={progress} /></View><Text style={[ui.cardBody, styles.progressCaption]}>Complete each lesson’s knowledge check to build your on-device record.</Text></View>

        <View style={styles.section}><SectionHeading title="Covered skill areas" /></View>
        <View style={styles.skillCard}><Text style={styles.skillText}>{courses.map((course) => course.title).join("  ·  ")}</Text></View>

        <View style={styles.section}><SectionHeading title="Learning tools" /></View>
        <ToolLink title="Progress dashboard" detail="Review completed lessons and knowledge-check accuracy." onPress={() => router.push("/progress" as never)} />
        <View style={{ height: 10 }} />
        <ToolLink title="Trading glossary" detail="Search definitions across 60 essential terms." onPress={() => router.push("/glossary" as never)} />

        <View style={styles.section}><SectionHeading title="Practice record" /></View>
        <View style={ui.card}><Text style={ui.metricLabel}>SIMULATED ORDERS</Text><Text style={ui.metricValue}>{activities.length}</Text><Text style={[ui.cardBody, styles.progressCaption]}>Orders use illustrative quotes. They are not routed to any market or brokerage.</Text></View>

        <View style={styles.section}><SectionHeading title="A note on safety" /></View>
        <View style={styles.safetyCard}><Text style={styles.safetyTitle}>Education is not a recommendation.</Text><Text style={styles.safetyText}>Trading carries risk. Treat strategies as frameworks to study, test, and adapt—not signals to follow. Day trading, margin, short selling, and options can amplify complexity and losses.</Text></View>

        <View style={styles.resetArea}><AppButton label="Reset local progress" variant="danger" onPress={confirmReset} /><Text style={[ui.disclaimer, styles.resetText]}>Resetting clears all completed lessons and simulated trades on this device.</Text></View>
      </ScrollView>
    </ScreenContainer>
  );
}

function ToolLink({ title, detail, onPress }: { title: string; detail: string; onPress: () => void }) {
  return <Pressable onPress={() => { haptic.light(); onPress(); }} style={({ pressed }) => [styles.toolLink, pressed && styles.pressed]}><View style={styles.toolCopy}><Text style={styles.toolTitle}>{title}</Text><Text style={styles.toolDetail}>{detail}</Text></View><Text style={styles.toolArrow}>›</Text></Pressable>;
}

const styles = StyleSheet.create({
  header: { paddingTop: 12, gap: 8 },
  subtitle: { maxWidth: 365 },
  profileCard: { backgroundColor: "#10243E", borderRadius: 22, padding: 18, marginTop: 22, flexDirection: "row", alignItems: "center", gap: 13 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: "#7EE3DB", justifyContent: "center", alignItems: "center" },
  avatarText: { color: "#10243E", fontSize: 15, fontWeight: "900" },
  profileCopy: { flex: 1 },
  profileName: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  profileDetail: { color: "#C9D9E8", fontSize: 12, lineHeight: 17, marginTop: 3 },
  section: { marginTop: 28 },
  progressTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressSpace: { marginTop: 15 },
  progressCaption: { marginTop: 12 },
  skillCard: { backgroundColor: "#E7F0EF", borderRadius: 18, padding: 16 },
  skillText: { color: "#22465B", fontSize: 14, lineHeight: 22, fontWeight: "700" },
  toolLink: { backgroundColor: "#FFFFFF", borderRadius: 18, borderWidth: 1, borderColor: "#E4E9ED", padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  toolCopy: { flex: 1, paddingRight: 12 },
  toolTitle: { color: "#10243E", fontSize: 16, fontWeight: "800" },
  toolDetail: { color: "#657488", fontSize: 12, lineHeight: 17, marginTop: 3 },
  toolArrow: { color: "#007C78", fontSize: 25, fontWeight: "700" },
  safetyCard: { backgroundColor: "#FDEEEB", borderRadius: 20, padding: 18, gap: 7 },
  safetyTitle: { color: "#A44640", fontSize: 16, fontWeight: "800" },
  safetyText: { color: "#714945", fontSize: 13, lineHeight: 20 },
  resetArea: { marginTop: 28, gap: 10 },
  resetText: { textAlign: "center" },
  pressed: { opacity: 0.7 },
});
