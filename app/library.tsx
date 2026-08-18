import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { Pill, ui } from "@/components/tradewise-ui";
import { referenceDomains, referenceTopicCount, searchReferenceTopics, type ReferenceDomain, type ReferenceTopic } from "@/data/reference-library";
import { haptic } from "@/lib/haptics";

type DomainFilter = "All" | string;
type AtlasRow = ReferenceTopic & { domain: ReferenceDomain };

export default function LibraryScreen() {
  const [query, setQuery] = useState("");
  const [domainId, setDomainId] = useState<DomainFilter>("All");
  const rows = useMemo(() => searchReferenceTopics(query, domainId) as AtlasRow[], [query, domainId]);

  return <ScreenContainer><FlatList data={rows} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} ListHeaderComponent={<AtlasHeader query={query} setQuery={setQuery} domainId={domainId} setDomainId={setDomainId} count={rows.length} />} renderItem={({ item }) => <AtlasTopic topic={item} />} ItemSeparatorComponent={() => <View style={{ height: 11 }} />} ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>No matching topics</Text><Text style={styles.emptyText}>Try a broader keyword such as “fund,” “risk,” “filing,” or “order.”</Text></View>} ListFooterComponent={<Text style={[ui.disclaimer, styles.footer]}>The Atlas is an educational map, not a recommendation engine. It explains structures and questions to research; it does not provide trading signals or personalized advice.</Text>} /></ScreenContainer>;
}

function AtlasHeader({ query, setQuery, domainId, setDomainId, count }: { query: string; setQuery: (value: string) => void; domainId: DomainFilter; setDomainId: (value: DomainFilter) => void; count: number }) {
  const filters: { id: DomainFilter; label: string }[] = [{ id: "All", label: "All topics" }, ...referenceDomains.map((domain) => ({ id: domain.id, label: domain.title }))];
  return <View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Learn</Text></Pressable><Text style={ui.eyebrow}>Source-grounded reference</Text><Text style={ui.title}>Stock Market Atlas</Text><Text style={[ui.subtitle, styles.subtitle]}>Browse {referenceTopicCount} concise guides across the systems, products, disclosures, risks, and practices that shape market participation.</Text><TextInput value={query} onChangeText={setQuery} placeholder="Search: clearing, ETF, 10-K, fraud…" placeholderTextColor="#8B98A6" returnKeyType="search" style={styles.search} /><FlatList horizontal data={filters} keyExtractor={(item) => item.id} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters} renderItem={({ item }) => <Pressable onPress={() => { haptic.selection(); setDomainId(item.id); }} style={({ pressed }) => [styles.filter, domainId === item.id && styles.filterActive, pressed && styles.pressed]}><Text style={[styles.filterLabel, domainId === item.id && styles.filterLabelActive]}>{item.label}</Text></Pressable>} /><View style={styles.countRow}><Text style={styles.count}>{count} reference topics</Text><Text style={styles.countNote}>Structured for study</Text></View></View>;
}

function AtlasTopic({ topic }: { topic: AtlasRow }) {
  return <View style={styles.card}><View style={styles.cardTop}><Text style={[styles.domain, { color: topic.domain.accent }]}>{topic.domain.title.toUpperCase()}</Text><Pill label="Reference" tone="navy" /></View><Text style={styles.title}>{topic.title}</Text><Text style={styles.summary}>{topic.summary}</Text><View style={styles.keywordRow}>{topic.keywords.slice(0, 3).map((keyword) => <View key={keyword} style={styles.keyword}><Text style={styles.keywordText}>{keyword}</Text></View>)}</View><Text style={styles.source}>Source: {topic.source.label}</Text></View>;
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 32 },
  header: { gap: 8, paddingBottom: 17 },
  back: { alignSelf: "flex-start", paddingVertical: 9, paddingRight: 16, marginBottom: 1 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  subtitle: { maxWidth: 370 },
  search: { height: 49, backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 1, borderColor: "#DDE5EA", color: "#10243E", paddingHorizontal: 14, fontSize: 14, marginTop: 8 },
  filters: { paddingTop: 6, gap: 8 },
  filter: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 999, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#DDE5EA" },
  filterActive: { backgroundColor: "#10243E", borderColor: "#10243E" },
  filterLabel: { color: "#526276", fontSize: 12, fontWeight: "800" },
  filterLabelActive: { color: "#FFFFFF" },
  countRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  count: { color: "#657488", fontSize: 12, fontWeight: "800" },
  countNote: { color: "#007C78", fontSize: 12, fontWeight: "800" },
  card: { backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#E3E8EC", padding: 16, gap: 8 },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 },
  domain: { flex: 1, fontSize: 10, fontWeight: "900", letterSpacing: 0.85 },
  title: { color: "#10243E", fontSize: 18, lineHeight: 23, fontWeight: "800", letterSpacing: -0.2 },
  summary: { color: "#526276", fontSize: 14, lineHeight: 20 },
  keywordRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 2 },
  keyword: { backgroundColor: "#F0F4F6", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4 },
  keywordText: { color: "#556A7E", fontSize: 10, fontWeight: "800" },
  source: { color: "#007C78", fontSize: 11, lineHeight: 16, fontWeight: "700", marginTop: 2 },
  empty: { backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#E3E8EC", padding: 22, alignItems: "center" },
  emptyTitle: { color: "#10243E", fontSize: 16, fontWeight: "800" },
  emptyText: { color: "#657488", fontSize: 13, lineHeight: 19, marginTop: 6, textAlign: "center" },
  footer: { paddingTop: 20, textAlign: "center" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});
