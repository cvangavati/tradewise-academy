import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { Pill, ProgressBar, ui } from "@/components/tradewise-ui";
import { microLessonCount, searchMicroLessons, type MicroLesson } from "@/data/micro-curriculum";
import { referenceDomains } from "@/data/reference-library";
import { haptic } from "@/lib/haptics";
import { useTradeWise } from "@/lib/tradewise-store";

type DomainFilter = "All" | string;
const PAGE_SIZE = 60;

export default function CatalogScreen() {
  const [query, setQuery] = useState("");
  const [domainId, setDomainId] = useState<DomainFilter>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { completedCatalogLessonIds, catalogCompletedCount } = useTradeWise();
  const results = useMemo(() => searchMicroLessons(query, domainId), [query, domainId]);
  const visibleLessons = results.slice(0, visibleCount);
  const progress = Math.round((catalogCompletedCount / microLessonCount) * 100);

  function setFilter(nextDomain: DomainFilter) {
    haptic.selection();
    setDomainId(nextDomain);
    setVisibleCount(PAGE_SIZE);
  }

  return <ScreenContainer><FlatList data={visibleLessons} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} ListHeaderComponent={<CatalogHeader query={query} setQuery={(value) => { setQuery(value); setVisibleCount(PAGE_SIZE); }} domainId={domainId} setDomainId={setFilter} progress={progress} complete={catalogCompletedCount} resultCount={results.length} />} renderItem={({ item }) => <CatalogCard lesson={item} complete={completedCatalogLessonIds.includes(item.id)} />} ItemSeparatorComponent={() => <View style={{ height: 10 }} />} ListEmptyComponent={<EmptyState />} ListFooterComponent={results.length > visibleCount ? <Pressable onPress={() => setVisibleCount((current) => current + PAGE_SIZE)} style={({ pressed }) => [styles.loadMore, pressed && styles.pressed]}><Text style={styles.loadMoreText}>Load 60 more lessons</Text><Text style={styles.loadMoreNote}>{visibleCount} of {results.length} shown</Text></Pressable> : <Text style={[ui.disclaimer, styles.footer]}>Each lesson is a short, source-grounded learning unit. The catalog teaches concepts and research process; it does not offer trade signals, security picks, or personalized advice.</Text>} /></ScreenContainer>;
}

function CatalogHeader({ query, setQuery, domainId, setDomainId, progress, complete, resultCount }: { query: string; setQuery: (value: string) => void; domainId: DomainFilter; setDomainId: (value: DomainFilter) => void; progress: number; complete: number; resultCount: number }) {
  const filters: { id: DomainFilter; label: string }[] = [{ id: "All", label: "All" }, ...referenceDomains.map((domain) => ({ id: domain.id, label: domain.title }))];
  return <View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Learn</Text></Pressable><Text style={ui.eyebrow}>Micro-learning catalog</Text><Text style={ui.title}>{microLessonCount.toLocaleString()} lessons. One study map.</Text><Text style={[ui.subtitle, styles.subtitle]}>Choose a topic, explore it through multiple lenses, and complete short units at your own pace.</Text><View style={styles.progressCard}><View style={styles.progressTop}><Text style={styles.progressLabel}>CATALOG PROGRESS</Text><Text style={styles.progressValue}>{progress}%</Text></View><ProgressBar value={progress} color="#71DAD0" /><Text style={styles.progressText}>{complete} of {microLessonCount} lessons completed</Text></View><TextInput value={query} onChangeText={setQuery} placeholder="Search: bond, proxy, settlement, liquidity…" placeholderTextColor="#8B98A6" returnKeyType="search" style={styles.search} /><FlatList horizontal data={filters} keyExtractor={(item) => item.id} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters} renderItem={({ item }) => <Pressable onPress={() => setDomainId(item.id)} style={({ pressed }) => [styles.filter, domainId === item.id && styles.filterActive, pressed && styles.pressed]}><Text style={[styles.filterText, domainId === item.id && styles.filterTextActive]}>{item.label}</Text></Pressable>} /><Text style={styles.resultCount}>{resultCount} lessons match</Text></View>;
}

function CatalogCard({ lesson, complete }: { lesson: MicroLesson; complete: boolean }) {
  return <Pressable onPress={() => { haptic.light(); router.push(`/catalog/${lesson.id}` as never); }} style={({ pressed }) => [styles.card, complete && styles.cardComplete, pressed && styles.pressed]}><View style={styles.cardTop}><Text style={[styles.domain, { color: lesson.domain.accent }]}>{lesson.domain.title.toUpperCase()}</Text><Pill label={complete ? "Complete" : lesson.frame} tone={complete ? "teal" : "navy"} /></View><Text style={styles.cardTitle}>{lesson.title}</Text><Text style={styles.cardSummary} numberOfLines={2}>{lesson.summary}</Text><Text style={styles.cardPrompt}>Study prompt: {lesson.studyPrompt}</Text></Pressable>;
}

function EmptyState() {
  return <View style={styles.empty}><Text style={styles.emptyTitle}>No lessons found</Text><Text style={styles.emptyText}>Try a broader term or select a different domain.</Text></View>;
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 34 },
  header: { gap: 8, paddingBottom: 17 },
  back: { alignSelf: "flex-start", paddingVertical: 9, paddingRight: 16, marginBottom: 1 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  subtitle: { maxWidth: 370 },
  progressCard: { backgroundColor: "#10243E", borderRadius: 18, padding: 15, marginTop: 8, gap: 9 },
  progressTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressLabel: { color: "#90DBD5", fontSize: 10, fontWeight: "900", letterSpacing: 0.8 },
  progressValue: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  progressText: { color: "#C2D2DF", fontSize: 12, fontWeight: "700" },
  search: { height: 49, backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 1, borderColor: "#DDE5EA", color: "#10243E", paddingHorizontal: 14, fontSize: 14, marginTop: 8 },
  filters: { paddingTop: 6, gap: 8 },
  filter: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 999, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#DDE5EA" },
  filterActive: { backgroundColor: "#10243E", borderColor: "#10243E" },
  filterText: { color: "#526276", fontSize: 12, fontWeight: "800" },
  filterTextActive: { color: "#FFFFFF" },
  resultCount: { color: "#657488", fontSize: 12, fontWeight: "800", marginTop: 4 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 19, borderWidth: 1, borderColor: "#E3E8EC", padding: 15, gap: 7 },
  cardComplete: { backgroundColor: "#F5FBF8", borderColor: "#D8EDE2" },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 },
  domain: { flex: 1, fontSize: 10, fontWeight: "900", letterSpacing: 0.8 },
  cardTitle: { color: "#10243E", fontSize: 17, lineHeight: 23, fontWeight: "800" },
  cardSummary: { color: "#526276", fontSize: 13, lineHeight: 19 },
  cardPrompt: { color: "#007C78", fontSize: 11, lineHeight: 16, fontWeight: "700", marginTop: 1 },
  loadMore: { marginTop: 20, borderRadius: 16, backgroundColor: "#EAF3F2", alignItems: "center", paddingVertical: 14, gap: 3 },
  loadMoreText: { color: "#007C78", fontSize: 14, fontWeight: "900" },
  loadMoreNote: { color: "#617080", fontSize: 11 },
  empty: { backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#E3E8EC", padding: 22, alignItems: "center" },
  emptyTitle: { color: "#10243E", fontSize: 16, fontWeight: "800" },
  emptyText: { color: "#657488", fontSize: 13, lineHeight: 19, marginTop: 6, textAlign: "center" },
  footer: { paddingTop: 20, textAlign: "center" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});
