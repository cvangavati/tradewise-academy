import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { SyntheticBarChart, SyntheticMarginChart, SyntheticPriceChart } from "@/components/stock-learning-charts";
import { AppButton, Pill, SectionHeading, ui } from "@/components/tradewise-ui";
import { getSyntheticStockProfile, syntheticFinancialPeriods, syntheticStockDisclosure, type SyntheticStockProfile } from "@/data/synthetic-stocks";
import { haptic } from "@/lib/haptics";

type PricePeriod = "1M" | "3M" | "1Y";
type DetailSection = "price" | "metrics" | "financials" | "margin" | "risks" | "research";

const sections: DetailSection[] = ["price", "metrics", "financials", "margin", "risks", "research"];
const priceSlices: Record<PricePeriod, number> = { "1M": 8, "3M": 14, "1Y": 24 };

export default function StockDetailScreen() {
  const params = useLocalSearchParams<{ stockId?: string | string[] }>();
  const stockId = Array.isArray(params.stockId) ? params.stockId[0] : params.stockId ?? "";
  const profile = getSyntheticStockProfile(stockId);

  if (!profile) return <MissingProfile />;
  return <StockProfile profile={profile} />;
}

function MissingProfile() {
  return <ScreenContainer><FlatList data={[]} renderItem={() => null} contentContainerStyle={styles.list} ListHeaderComponent={<View style={styles.missing}><Text style={ui.eyebrow}>Stock Explorer</Text><Text style={styles.missingTitle}>Profile not found</Text><Text style={styles.missingText}>This synthetic company profile is not available. Return to Stock Explorer to choose another education case.</Text><AppButton label="Back to Stock Explorer" onPress={() => router.replace("/stocks" as never)} /></View>} /></ScreenContainer>;
}

function StockProfile({ profile }: { profile: SyntheticStockProfile }) {
  const [period, setPeriod] = useState<PricePeriod>("1Y");
  const priceSeries = useMemo(() => profile.priceHistory.slice(-priceSlices[period]), [period, profile.priceHistory]);
  return <ScreenContainer><FlatList data={sections} keyExtractor={(item) => item} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} ListHeaderComponent={<ProfileHeader profile={profile} />} renderItem={({ item }) => <ProfileSection section={item} profile={profile} period={period} setPeriod={setPeriod} priceSeries={priceSeries} />} ItemSeparatorComponent={() => <View style={{ height: 18 }} />} ListFooterComponent={<Text style={[ui.disclaimer, styles.footer]}>{syntheticStockDisclosure}</Text>} /></ScreenContainer>;
}

function ProfileHeader({ profile }: { profile: SyntheticStockProfile }) {
  return <View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Stock Explorer</Text></Pressable><View style={styles.headerTop}><View><Text style={[styles.symbol, { color: profile.color }]}>{profile.symbol}</Text><Text style={styles.title}>{profile.name}</Text><Text style={styles.industry}>{profile.sector} · {profile.industry}</Text></View><Pill label="Synthetic" tone="navy" /></View><Text style={[ui.subtitle, styles.description]}>{profile.businessDescription}</Text><View style={[styles.lens, { borderLeftColor: profile.color }]}><Text style={styles.lensLabel}>LEARNING LENS</Text><Text style={styles.lensText}>{profile.learningLens}</Text></View></View>;
}

function ProfileSection({ section, profile, period, setPeriod, priceSeries }: { section: DetailSection; profile: SyntheticStockProfile; period: PricePeriod; setPeriod: (value: PricePeriod) => void; priceSeries: number[] }) {
  if (section === "price") return <View style={styles.section}><SectionHeading title="Chart practice" /><FlatList horizontal data={["1M", "3M", "1Y"] as PricePeriod[]} keyExtractor={(item) => item} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.periods} renderItem={({ item }) => <Pressable onPress={() => { haptic.selection(); setPeriod(item); }} style={({ pressed }) => [styles.period, period === item && [styles.periodActive, { backgroundColor: profile.color, borderColor: profile.color }], pressed && styles.pressed]}><Text style={[styles.periodText, period === item && styles.periodTextActive]}>{item}</Text></Pressable>} /><SyntheticPriceChart values={priceSeries} color={profile.color} period={period} /></View>;
  if (section === "metrics") return <MetricSection profile={profile} />;
  if (section === "financials") return <View style={styles.section}><SectionHeading title="Financial trends" /><View style={styles.chartStack}><SyntheticBarChart title="Revenue trend" values={profile.revenueHistory} periods={syntheticFinancialPeriods} color={profile.color} unit="billions" /><SyntheticBarChart title="Earnings trend" values={profile.earningsHistory} periods={syntheticFinancialPeriods} color={profile.color} unit="dollars" /></View></View>;
  if (section === "margin") return <View style={styles.section}><SectionHeading title="Margin context" /><SyntheticMarginChart values={profile.operatingMarginHistory} periods={syntheticFinancialPeriods} color={profile.color} /><View style={styles.insight}><Text style={styles.insightLabel}>BUSINESS MODEL</Text><Text style={styles.insightText}>{profile.businessModel}</Text></View></View>;
  if (section === "risks") return <RiskSection profile={profile} />;
  return <ResearchSection profile={profile} />;
}

function MetricSection({ profile }: { profile: SyntheticStockProfile }) {
  const metricRows = [
    ["Illustrative market cap", profile.metrics.marketCap], ["Valuation", profile.metrics.valuation], ["Revenue", profile.metrics.revenue], ["EPS", profile.metrics.eps], ["Operating margin", profile.metrics.operatingMargin], ["Dividend yield", profile.metrics.dividendYield], ["Debt / equity", profile.metrics.debtToEquity], ["Sector", profile.sector],
  ];
  return <View style={styles.section}><SectionHeading title="Key metrics" /><Text style={styles.sectionNote}>These values are fabricated learning inputs. They demonstrate what a metric card can contain; they do not describe a real company.</Text><FlatList data={metricRows} scrollEnabled={false} keyExtractor={([label]) => label} numColumns={2} columnWrapperStyle={styles.metricRow} contentContainerStyle={styles.metrics} renderItem={({ item: [label, value] }) => <View style={styles.metric}><Text style={styles.metricLabel}>{label.toUpperCase()}</Text><Text style={styles.metricValue}>{value}</Text></View>} /></View>;
}

function RiskSection({ profile }: { profile: SyntheticStockProfile }) {
  return <View style={styles.section}><SectionHeading title="Risk factors to investigate" /><FlatList data={profile.risks} scrollEnabled={false} keyExtractor={(item) => item} contentContainerStyle={styles.listStack} renderItem={({ item, index }) => <View style={styles.riskRow}><View style={[styles.riskNumber, { backgroundColor: profile.color }]}><Text style={styles.riskNumberText}>{index + 1}</Text></View><Text style={styles.riskText}>{item}</Text></View>} /></View>;
}

function ResearchSection({ profile }: { profile: SyntheticStockProfile }) {
  return <View style={styles.section}><SectionHeading title="Research practice" /><Text style={styles.sectionNote}>Use these prompts to rehearse a research workflow. The profile is fictional, so the questions teach process rather than direct you to make an investment decision.</Text><FlatList data={profile.researchQuestions} scrollEnabled={false} keyExtractor={(item) => item} contentContainerStyle={styles.listStack} renderItem={({ item, index }) => <View style={styles.questionRow}><Text style={styles.questionNumber}>Q{index + 1}</Text><Text style={styles.questionText}>{item}</Text></View>} /><View style={styles.related}><Text style={styles.relatedLabel}>RELATED STUDY TOPICS</Text><Text style={styles.relatedText}>{profile.relatedTopics.join("  ·  ")}</Text><View style={styles.learningActions}><AppButton label="Browse Atlas" variant="secondary" onPress={() => router.push("/library" as never)} style={styles.flexButton} /><AppButton label="Open catalog" variant="secondary" onPress={() => router.push("/catalog" as never)} style={styles.flexButton} /></View></View></View>;
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 32 },
  header: { gap: 9, paddingBottom: 22 },
  back: { alignSelf: "flex-start", paddingVertical: 9, paddingRight: 16, marginBottom: 1 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  headerTop: { flexDirection: "row", justifyContent: "space-between", gap: 12, alignItems: "flex-start" },
  symbol: { fontSize: 11, fontWeight: "900", letterSpacing: 0.8 },
  title: { color: "#10243E", fontSize: 29, lineHeight: 35, fontWeight: "800", letterSpacing: -0.7, maxWidth: 280, marginTop: 2 },
  industry: { color: "#657488", fontSize: 13, lineHeight: 19, marginTop: 3 },
  description: { maxWidth: 372 },
  lens: { backgroundColor: "#F2F7F7", borderRadius: 14, borderLeftWidth: 4, padding: 14, gap: 3, marginTop: 4 },
  lensLabel: { color: "#657488", fontSize: 9, lineHeight: 13, fontWeight: "900", letterSpacing: 0.7 },
  lensText: { color: "#294055", fontSize: 13, lineHeight: 19, fontWeight: "700" },
  section: { gap: 11 },
  periods: { gap: 8, paddingBottom: 1 },
  period: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 999, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#DDE5EA" },
  periodActive: { backgroundColor: "#10243E", borderColor: "#10243E" },
  periodText: { color: "#526276", fontSize: 12, fontWeight: "900" },
  periodTextActive: { color: "#FFFFFF" },
  sectionNote: { color: "#657488", fontSize: 12, lineHeight: 18, marginTop: -4 },
  metrics: { gap: 9 },
  metricRow: { gap: 9 },
  metric: { backgroundColor: "#FFFFFF", borderRadius: 16, borderWidth: 1, borderColor: "#E3E8EC", padding: 13, flex: 1, minHeight: 82, justifyContent: "center" },
  metricLabel: { color: "#718191", fontSize: 9, lineHeight: 13, fontWeight: "900", letterSpacing: 0.5 },
  metricValue: { color: "#10243E", fontSize: 16, lineHeight: 21, fontWeight: "800", marginTop: 3 },
  chartStack: { gap: 11 },
  insight: { backgroundColor: "#FFFFFF", borderRadius: 16, borderWidth: 1, borderColor: "#E3E8EC", padding: 14, gap: 3 },
  insightLabel: { color: "#718191", fontSize: 9, fontWeight: "900", letterSpacing: 0.6 },
  insightText: { color: "#354A61", fontSize: 13, lineHeight: 19, fontWeight: "600" },
  listStack: { gap: 9 },
  riskRow: { backgroundColor: "#FFFFFF", borderRadius: 16, borderWidth: 1, borderColor: "#E3E8EC", padding: 13, flexDirection: "row", alignItems: "flex-start", gap: 10 },
  riskNumber: { width: 23, height: 23, borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 1 },
  riskNumberText: { color: "#FFFFFF", fontSize: 11, fontWeight: "900" },
  riskText: { color: "#354A61", fontSize: 13, lineHeight: 19, fontWeight: "600", flex: 1 },
  questionRow: { backgroundColor: "#F5F8FA", borderRadius: 16, padding: 13, gap: 5 },
  questionNumber: { color: "#007C78", fontSize: 10, fontWeight: "900", letterSpacing: 0.55 },
  questionText: { color: "#354A61", fontSize: 13, lineHeight: 19, fontWeight: "700" },
  related: { backgroundColor: "#10243E", borderRadius: 18, padding: 15, gap: 6, marginTop: 2 },
  relatedLabel: { color: "#7EE3DB", fontSize: 9, fontWeight: "900", letterSpacing: 0.7 },
  relatedText: { color: "#E5F0F6", fontSize: 13, lineHeight: 19, fontWeight: "700" },
  learningActions: { flexDirection: "row", gap: 9, marginTop: 4 },
  flexButton: { flex: 1, minHeight: 43, paddingHorizontal: 9, backgroundColor: "#EAF2F4" },
  footer: { paddingTop: 22, textAlign: "center" },
  missing: { gap: 12, paddingTop: 22 },
  missingTitle: { color: "#10243E", fontSize: 28, lineHeight: 34, fontWeight: "800" },
  missingText: { color: "#5C6B7D", fontSize: 15, lineHeight: 22 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});
