import { router } from "expo-router";
import { ActivityIndicator, FlatList, Linking, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

import { AppButton, Pill, ui } from "@/components/tradewise-ui";
import { ScreenContainer } from "@/components/screen-container";
import { trpc } from "@/lib/trpc";

const EXAMPLES = [
  "I want to understand fund fees before reading a prospectus",
  "Teach me the market plumbing behind a stock trade",
  "Help me study company filings without making a trade decision",
];

export default function AiGuideScreen() {
  const [goal, setGoal] = useState("");
  const guide = trpc.catalogGuide.recommend.useMutation();
  const recommendations = guide.data?.recommendations ?? [];

  const submit = () => {
    const trimmed = goal.trim();
    if (trimmed.length < 2 || guide.isPending) return;
    guide.mutate({ goal: trimmed });
  };

  return (
    <ScreenContainer>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Text style={ui.eyebrow}>AI catalog guide</Text>
            <Text style={ui.title}>Tell us what you want to understand.</Text>
            <Text style={[ui.subtitle, styles.subtitle]}>The guide searches the Academy’s existing source-linked lessons, then suggests a focused place to begin.</Text>

            <View style={styles.inputCard}>
              <Text style={styles.inputLabel}>YOUR LEARNING GOAL</Text>
              <TextInput
                value={goal}
                onChangeText={setGoal}
                placeholder="For example, help me understand how ETF fees work"
                placeholderTextColor="#8A98A8"
                multiline
                maxLength={280}
                textAlignVertical="top"
                style={styles.input}
                returnKeyType="done"
                onSubmitEditing={submit}
              />
              <Text style={styles.counter}>{goal.length}/280</Text>
              <AppButton label={guide.isPending ? "Finding the right lessons…" : "Ask the catalog guide"} onPress={submit} disabled={goal.trim().length < 2 || guide.isPending} />
            </View>

            <Text style={styles.exampleLabel}>TRY A STARTER PROMPT</Text>
            <View style={styles.exampleStack}>
              {EXAMPLES.map((example) => (
                <Pressable key={example} onPress={() => setGoal(example)} style={({ pressed }) => [styles.example, pressed && styles.pressed]}>
                  <Text style={styles.exampleText}>{example}</Text><Text style={styles.exampleArrow}>›</Text>
                </Pressable>
              ))}
            </View>

            {guide.isPending ? <View style={styles.loading}><ActivityIndicator color="#007C78" /><Text style={styles.loadingText}>Matching your goal to the source-linked catalog…</Text></View> : null}
            {guide.error ? <View style={styles.error}><Text style={styles.errorTitle}>The guide could not respond just now.</Text><Text style={styles.errorText}>Try again, or search the complete catalog directly while the service reconnects.</Text><Pressable onPress={() => router.push("/catalog" as never)}><Text style={ui.linkText}>Open catalog →</Text></Pressable></View> : null}

            {guide.data ? <View style={styles.resultIntro}><Pill label={guide.data.method === "ai" ? "AI-guided path" : "Catalog-guided path"} tone="teal" /><Text style={styles.resultTitle}>A focused starting path</Text><Text style={styles.resultText}>{guide.data.orientation}</Text></View> : null}
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.recommendation}>
            <View style={styles.number}><Text style={styles.numberText}>{index + 1}</Text></View>
            <View style={styles.recommendationBody}>
              <Pill label={item.domainTitle} tone="navy" />
              <Text style={styles.lessonTitle}>{item.title}</Text>
              <Text style={styles.reason}>{item.reason}</Text>
              <View style={styles.sourceRow}><Text numberOfLines={1} style={styles.sourceLabel}>{item.source.label}</Text><Pressable onPress={() => Linking.openURL(item.source.url)}><Text style={styles.sourceLink}>Source ↗</Text></Pressable></View>
              <Pressable onPress={() => router.push(`/catalog/${item.id}` as never)} style={({ pressed }) => [styles.openLesson, pressed && styles.pressed]}><Text style={styles.openLessonText}>Open lesson</Text><Text style={styles.openLessonArrow}>›</Text></Pressable>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={ui.disclaimer}>Educational catalog guidance only. The guide does not use live market data and does not provide personalized investment, legal, or tax advice.</Text>
            {guide.data ? <Text style={styles.notice}>{guide.data.notice}</Text> : null}
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 36 },
  subtitle: { marginTop: 8, maxWidth: 360 },
  inputCard: { backgroundColor: "#10243E", borderRadius: 22, marginTop: 22, padding: 16 },
  inputLabel: { color: "#9FC4D5", fontSize: 11, fontWeight: "900", letterSpacing: 0.9 },
  input: { minHeight: 112, marginTop: 10, padding: 13, borderRadius: 14, backgroundColor: "#FFFFFF", color: "#10243E", fontSize: 15, lineHeight: 21 },
  counter: { alignSelf: "flex-end", color: "#C9D9E8", fontSize: 11, marginVertical: 8 },
  exampleLabel: { color: "#657488", fontSize: 11, fontWeight: "900", letterSpacing: 0.8, marginTop: 20, marginBottom: 8 },
  exampleStack: { gap: 8 },
  example: { minHeight: 56, borderRadius: 15, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E1E7EC", paddingHorizontal: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  exampleText: { color: "#405166", fontSize: 13, lineHeight: 18, fontWeight: "700", flex: 1, paddingRight: 10 },
  exampleArrow: { color: "#007C78", fontSize: 24, fontWeight: "800" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  loading: { marginTop: 20, padding: 16, borderRadius: 16, flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#E5F0EE" },
  loadingText: { color: "#315F62", fontSize: 13, fontWeight: "700", flex: 1 },
  error: { marginTop: 20, borderRadius: 16, borderWidth: 1, borderColor: "#F0C4BF", backgroundColor: "#FFF4F2", padding: 15, gap: 5 },
  errorTitle: { color: "#A23F38", fontSize: 15, fontWeight: "800" },
  errorText: { color: "#6E514E", fontSize: 13, lineHeight: 18 },
  resultIntro: { marginTop: 26, marginBottom: 12, gap: 7 },
  resultTitle: { color: "#10243E", fontSize: 21, fontWeight: "800", marginTop: 2 },
  resultText: { color: "#526276", fontSize: 14, lineHeight: 20 },
  recommendation: { flexDirection: "row", alignItems: "flex-start", gap: 10, backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#E7E9EC", padding: 15 },
  number: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#E5F0EE", alignItems: "center", justifyContent: "center", marginTop: 2 },
  numberText: { color: "#006663", fontSize: 13, fontWeight: "900" },
  recommendationBody: { flex: 1, gap: 8 },
  lessonTitle: { color: "#10243E", fontSize: 17, lineHeight: 22, fontWeight: "800" },
  reason: { color: "#526276", fontSize: 13, lineHeight: 19 },
  sourceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  sourceLabel: { color: "#657488", fontSize: 11, fontWeight: "700", flex: 1 },
  sourceLink: { color: "#007C78", fontSize: 12, fontWeight: "900" },
  openLesson: { marginTop: 2, borderRadius: 12, backgroundColor: "#E8F2F1", paddingHorizontal: 12, minHeight: 38, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  openLessonText: { color: "#006663", fontSize: 13, fontWeight: "900" },
  openLessonArrow: { color: "#006663", fontSize: 20, fontWeight: "800" },
  footer: { paddingTop: 22, gap: 8 },
  notice: { color: "#657488", fontSize: 11, lineHeight: 16 },
});
