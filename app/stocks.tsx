import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { SyntheticSparkline } from "@/components/stock-learning-charts";
import { Pill, ui } from "@/components/tradewise-ui";
import { searchSyntheticStockProfiles, syntheticStockDisclosure, syntheticStockSectors, type SyntheticStockProfile } from "@/data/synthetic-stocks";
import { haptic } from "@/lib/haptics";

type SectorFilter = "All" | string;

function formatIllustrativeValue(value: number) {
  return `$${value.toFixed(2)}`;
}

function formatMove(values: number[]) {
  const first = values[0];
  const last = values[values.length - 1];
  const change = ((last - first) / first) * 100;
  return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
}

export default function StocksScreen() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<SectorFilter>("All");
  const profiles = useMemo(() => searchSyntheticStockProfiles(query, sector), [query, sector]);
  const filters = useMemo(() => ["All", ...syntheticStockSectors], []);

  return <ScreenContainer><FlatList data={profiles} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} ListHeaderComponent={<ExplorerHeader query={query} setQuery={setQuery} sector={sector} setSector={setSector} filters={filters} count={profiles.length} />} renderItem={({ item }) => <StockCard profile={item} />} ItemSeparatorComponent={() => <View style={{ height: 11 }} />} ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>No synthetic profiles found</Text><Text style={styles.emptyText}>Try a broader search or return to all sectors.</Text></View>} ListFooterComponent={<Text style={[ui.disclaimer, styles.footer]}>{syntheticStockDisclosure}</Text>} /></ScreenContainer>;
}

function ExplorerHeader({ query, setQuery, sector, setSector, filters, count }: { query: string; setQuery: (value: string) => void; sector: SectorFilter; setSector: (value: SectorFilter) => void; filters: string[]; count: number }) {
  return <View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Practice</Text></Pressable><Text style={ui.eyebrow}>Illustrative company lab</Text><Text style={ui.title}>Stock Explorer</Text><Text style={[ui.subtitle, styles.subtitle]}>Compare fictional companies across sectors, then practice reading their price paths, operating metrics, risks, and research prompts.</Text><View style={styles.disclosure}><Text style={styles.disclosureLabel}>EDUCATIONAL SIMULATION</Text><Text style={styles.disclosureText}>All companies and charts are fictional and synthetic. No live quotes, real tickers, or trade calls.</Text></View><TextInput value={query} onChangeText={setQuery} placeholder="Search a company, sector, or topic…" placeholderTextColor="#8B98A6" returnKeyType="search" style={styles.search} /><FlatList horizontal data={filters} keyExtractor={(item) => item} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters} renderItem={({ item }) => <Pressable onPress={() => { haptic.selection(); setSector(item); }} style={({ pressed }) => [styles.filter, item === sector && styles.filterActive, pressed && styles.pressed]}><Text style={[styles.filterLabel, item === sector && styles.filterLabelActive]}>{item === "All" ? "All sectors" : item}</Text></Pressable>} /><View style={styles.countRow}><Text style={styles.count}>{count} synthetic company profiles</Text><Text style={styles.countNote}>{filters.length - 1} sectors</Text></View></View>;
}

function StockCard({ profile }: { profile: SyntheticStockProfile }) {
  const last = profile.priceHistory[profile.priceHistory.length - 1];
  const positive = last >= profile.priceHistory[0];
  return <Pressable onPress={() => { haptic.light(); router.push(`/stock/${profile.id}` as never); }} style={({ pressed }) => [styles.card, pressed && styles.pressed]}><View style={styles.cardTop}><View style={styles.identity}><Text style={[styles.symbol, { color: profile.color }]}>{profile.symbol}</Text><Text style={styles.name}>{profile.name}</Text><Text style={styles.industry}>{profile.sector} · {profile.industry}</Text></View><SyntheticSparkline values={profile.priceHistory} color={profile.color} /></View><View style={styles.cardBottom}><View><Text style={styles.valueLabel}>ILLUSTRATIVE LATEST</Text><Text style={styles.value}>{formatIllustrativeValue(last)}</Text></View><View style={styles.moveAlign}><Text style={[styles.move, positive ? styles.positive : styles.negative]}>{formatMove(profile.priceHistory)}</Text><Text style={styles.moveNote}>Synthetic path</Text></View></View><View style={styles.cardDivider} /><View style={styles.cardFoot}><Pill label="Synthetic profile" tone="gray" /><Text style={styles.openText}>Open details  ›</Text></View></Pressable>;
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 32 },
  header: { gap: 8, paddingBottom: 17 },
  back: { alignSelf: "flex-start", paddingVertical: 9, paddingRight: 16, marginBottom: 1 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  subtitle: { maxWidth: 370 },
  disclosure: { backgroundColor: "#10243E", borderRadius: 16, padding: 14, gap: 3, marginTop: 4 },
  disclosureLabel: { color: "#7EE3DB", fontSize: 10, fontWeight: "900", letterSpacing: 0.85 },
  disclosureText: { color: "#E5F0F6", fontSize: 12, lineHeight: 17, fontWeight: "600" },
  search: { height: 49, backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 1, borderColor: "#DDE5EA", color: "#10243E", paddingHorizontal: 14, fontSize: 14, marginTop: 7 },
  filters: { paddingTop: 6, gap: 8 },
  filter: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 999, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#DDE5EA" },
  filterActive: { backgroundColor: "#10243E", borderColor: "#10243E" },
  filterLabel: { color: "#526276", fontSize: 12, fontWeight: "800" },
  filterLabelActive: { color: "#FFFFFF" },
  countRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  count: { color: "#657488", fontSize: 12, fontWeight: "800" },
  countNote: { color: "#007C78", fontSize: 12, fontWeight: "800" },
  card: { backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#E3E8EC", padding: 16, gap: 12 },
  cardTop: { flexDirection: "row", justifyContent: "space-between", gap: 12, alignItems: "flex-start" },
  identity: { flex: 1, gap: 3 },
  symbol: { fontSize: 11, lineHeight: 15, fontWeight: "900", letterSpacing: 0.75 },
  name: { color: "#10243E", fontSize: 18, lineHeight: 23, fontWeight: "800", letterSpacing: -0.2 },
  industry: { color: "#657488", fontSize: 12, lineHeight: 17 },
  cardBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  valueLabel: { color: "#718191", fontSize: 9, fontWeight: "900", letterSpacing: 0.6 },
  value: { color: "#10243E", fontSize: 20, lineHeight: 25, fontWeight: "800", marginTop: 1 },
  moveAlign: { alignItems: "flex-end" },
  move: { fontSize: 15, fontWeight: "900" },
  moveNote: { color: "#718191", fontSize: 10, marginTop: 2 },
  positive: { color: "#157347" },
  negative: { color: "#C34B45" },
  cardDivider: { height: 1, backgroundColor: "#E7EDEF" },
  cardFoot: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  openText: { color: "#007C78", fontSize: 12, fontWeight: "800" },
  empty: { backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#E3E8EC", padding: 22, alignItems: "center" },
  emptyTitle: { color: "#10243E", fontSize: 16, fontWeight: "800" },
  emptyText: { color: "#657488", fontSize: 13, lineHeight: 19, marginTop: 6, textAlign: "center" },
  footer: { paddingTop: 20, textAlign: "center" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});
