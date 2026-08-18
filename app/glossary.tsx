import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useMemo, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { Pill, ui } from "@/components/tradewise-ui";
import { glossaryCategories, glossarySource, searchGlossary, type GlossaryCategory, type GlossaryEntry } from "@/data/glossary";
import { haptic } from "@/lib/haptics";

type Filter = "All" | GlossaryCategory;

export default function GlossaryScreen() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const entries = useMemo(() => searchGlossary(query, filter), [filter, query]);
  const filters: Filter[] = ["All", ...glossaryCategories];

  return (
    <ScreenContainer>
      <FlatList
        data={entries}
        keyExtractor={(entry) => entry.term}
        contentContainerStyle={ui.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Profile</Text></Pressable><Text style={ui.eyebrow}>Reference library</Text><Text style={ui.title}>Trading glossary</Text><Text style={ui.subtitle}>Search plain-language definitions across market mechanics, risk, analysis, orders, and options.</Text><TextInput value={query} onChangeText={setQuery} placeholder="Search a term, e.g. stop order" placeholderTextColor="#8B98A6" returnKeyType="search" style={styles.search} /><FlatList horizontal data={filters} keyExtractor={(item) => item} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList} renderItem={({ item }) => <Pressable onPress={() => { haptic.selection(); setFilter(item); }} style={({ pressed }) => [styles.filter, filter === item && styles.filterActive, pressed && styles.pressed]}><Text style={[styles.filterLabel, filter === item && styles.filterLabelActive]}>{item}</Text></Pressable>} /><Text style={styles.resultCount}>{entries.length} terms</Text></View>}
        renderItem={({ item }) => <GlossaryCard entry={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>No matching term</Text><Text style={styles.emptyText}>Try a different word or reset the category filter.</Text></View>}
        ListFooterComponent={<View style={styles.source}><Text style={styles.sourceTitle}>Learning source note</Text><Text style={styles.sourceText}>{glossarySource.label}</Text><Text style={styles.sourceUrl}>{glossarySource.urls.join("\n")}</Text></View>}
      />
    </ScreenContainer>
  );
}

function GlossaryCard({ entry }: { entry: GlossaryEntry }) {
  return <View style={styles.card}><View style={styles.cardTop}><Text style={styles.term}>{entry.term}</Text><Pill label={entry.category} tone={entry.category === "Risk" ? "coral" : entry.category === "Options" ? "navy" : "teal"} /></View><Text style={styles.definition}>{entry.definition}</Text><Text style={styles.related}>Related: {entry.relatedCourse}</Text></View>;
}

const styles = StyleSheet.create({
  header: { paddingTop: 4, gap: 9 },
  back: { alignSelf: "flex-start", paddingVertical: 10, paddingRight: 14, marginBottom: 2 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  search: { height: 50, borderRadius: 14, borderWidth: 1, borderColor: "#CDD7E0", backgroundColor: "#FFFFFF", paddingHorizontal: 15, color: "#10243E", fontSize: 15, marginTop: 9 },
  filterList: { gap: 8, paddingTop: 3, paddingBottom: 3 },
  filter: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, borderColor: "#D9E1E6", backgroundColor: "#FFFFFF" },
  filterActive: { backgroundColor: "#10243E", borderColor: "#10243E" },
  filterLabel: { color: "#526276", fontSize: 12, fontWeight: "800" },
  filterLabelActive: { color: "#FFFFFF" },
  resultCount: { color: "#657488", fontSize: 12, fontWeight: "700", marginTop: 6, marginBottom: 13 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 18, borderWidth: 1, borderColor: "#E4E9ED", padding: 16, gap: 8 },
  cardTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
  term: { color: "#10243E", fontSize: 17, lineHeight: 22, fontWeight: "800", flex: 1 },
  definition: { color: "#46596C", fontSize: 14, lineHeight: 21 },
  related: { color: "#007C78", fontSize: 12, fontWeight: "800", marginTop: 1 },
  empty: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E4E9ED", borderRadius: 18, padding: 20, alignItems: "center" },
  emptyTitle: { color: "#10243E", fontSize: 16, fontWeight: "800" },
  emptyText: { color: "#657488", fontSize: 13, marginTop: 4 },
  source: { backgroundColor: "#EFF4F3", borderRadius: 18, padding: 16, marginTop: 22, gap: 5 },
  sourceTitle: { color: "#007C78", fontSize: 11, letterSpacing: 0.8, fontWeight: "800" },
  sourceText: { color: "#354A61", fontSize: 12, lineHeight: 18 },
  sourceUrl: { color: "#657488", fontSize: 10, lineHeight: 15 },
  pressed: { opacity: 0.72 },
});
