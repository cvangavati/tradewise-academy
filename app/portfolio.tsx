import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { AppButton, Pill, SectionHeading, ui } from "@/components/tradewise-ui";
import { simulatedWatchlist } from "@/data/practice";
import { useTradeWise, type Activity, type Holding } from "@/lib/tradewise-store";

function money(value: number) { return value.toLocaleString("en-US", { style: "currency", currency: "USD" }); }

type PortfolioRow = { kind: "holding"; holding: Holding } | { kind: "activity"; activity: Activity };

export default function PortfolioScreen() {
  const { cash, holdings, activities, portfolioValue, investedValue } = useTradeWise();
  const rows: PortfolioRow[] = [...holdings.map((holding) => ({ kind: "holding" as const, holding })), ...activities.map((activity) => ({ kind: "activity" as const, activity }))];

  return (
    <ScreenContainer>
      <FlatList
        data={rows}
        keyExtractor={(row, index) => row.kind === "holding" ? `holding-${row.holding.symbol}` : `${row.activity.id}-${index}`}
        contentContainerStyle={ui.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Header cash={cash} investedValue={investedValue} portfolioValue={portfolioValue} holdingsCount={holdings.length} activitiesCount={activities.length} />}
        renderItem={({ item }) => item.kind === "holding" ? <HoldingRow holding={item.holding} /> : <ActivityRow activity={item.activity} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>Your paper account is ready.</Text><Text style={styles.emptyText}>Choose an illustrative symbol on the Practice tab to record a cash-only simulated trade.</Text><AppButton label="Open practice desk" onPress={() => router.replace("/(tabs)/practice")} style={styles.emptyButton} /></View>}
        ListFooterComponent={<Text style={[ui.disclaimer, styles.footer]}>This is a local educational simulation. Portfolio values use illustrative quotes and are not live market data.</Text>}
      />
    </ScreenContainer>
  );
}

function Header({ cash, investedValue, portfolioValue, holdingsCount, activitiesCount }: { cash: number; investedValue: number; portfolioValue: number; holdingsCount: number; activitiesCount: number }) {
  return <View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Practice</Text></Pressable><Text style={ui.eyebrow}>Local paper account</Text><Text style={ui.title}>Portfolio, simplified.</Text><View style={styles.valueCard}><Text style={styles.valueLabel}>SIMULATED PORTFOLIO VALUE</Text><Text style={styles.value}>{money(portfolioValue)}</Text><View style={styles.valueGrid}><View><Text style={styles.gridLabel}>Buying power</Text><Text style={styles.gridValue}>{money(cash)}</Text></View><View><Text style={styles.gridLabel}>Invested</Text><Text style={styles.gridValue}>{money(investedValue)}</Text></View></View></View>{holdingsCount > 0 && <View style={styles.sectionHeader}><SectionHeading title="Holdings" /></View>}{activitiesCount > 0 && holdingsCount === 0 && <View style={styles.sectionHeader}><SectionHeading title="Activity" /></View>}</View>;
}

function HoldingRow({ holding }: { holding: Holding }) {
  const quote = simulatedWatchlist.find((item) => item.symbol === holding.symbol);
  const price = quote?.price ?? holding.averageCost;
  const marketValue = price * holding.quantity;
  const unrealized = (price - holding.averageCost) * holding.quantity;
  return <View style={styles.holding}><View><Text style={styles.holdingSymbol}>{holding.symbol}</Text><Text style={styles.holdingDetail}>{holding.quantity} shares · avg {money(holding.averageCost)}</Text></View><View style={styles.alignEnd}><Text style={styles.holdingValue}>{money(marketValue)}</Text><Text style={[styles.holdingMove, unrealized >= 0 ? styles.positive : styles.negative]}>{unrealized >= 0 ? "+" : ""}{money(unrealized)}</Text></View></View>;
}

function ActivityRow({ activity }: { activity: Activity }) {
  return <View style={styles.activity}><Pill label={activity.action} tone={activity.action === "BUY" ? "teal" : "coral"} /><View style={styles.activityCopy}><Text style={styles.activityTitle}>{activity.quantity} {activity.symbol} at {money(activity.price)}</Text><Text style={styles.activityDate}>{new Date(activity.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · simulated order</Text></View></View>;
}

const styles = StyleSheet.create({
  header: { paddingTop: 4 },
  back: { alignSelf: "flex-start", paddingVertical: 10, paddingRight: 14, marginBottom: 10 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  valueCard: { backgroundColor: "#10243E", borderRadius: 23, padding: 20, marginTop: 20 },
  valueLabel: { color: "#BBD0E1", fontSize: 10, letterSpacing: 0.9, fontWeight: "800" },
  value: { color: "#FFFFFF", fontSize: 32, fontWeight: "800", letterSpacing: -0.7, marginTop: 4 },
  valueGrid: { flexDirection: "row", marginTop: 19, borderTopWidth: 1, borderTopColor: "#28455F", paddingTop: 14, gap: 34 },
  gridLabel: { color: "#BBD0E1", fontSize: 11, fontWeight: "700" },
  gridValue: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", marginTop: 3 },
  sectionHeader: { marginTop: 28 },
  holding: { backgroundColor: "#FFFFFF", borderRadius: 17, padding: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: "#E7E9EC" },
  holdingSymbol: { color: "#10243E", fontSize: 17, fontWeight: "800" },
  holdingDetail: { color: "#657488", fontSize: 12, marginTop: 3 },
  alignEnd: { alignItems: "flex-end" },
  holdingValue: { color: "#10243E", fontSize: 16, fontWeight: "800" },
  holdingMove: { fontSize: 12, fontWeight: "800", marginTop: 3 },
  positive: { color: "#15803D" },
  negative: { color: "#D9544D" },
  activity: { backgroundColor: "#FFFFFF", borderRadius: 17, padding: 14, flexDirection: "row", alignItems: "center", gap: 10, borderWidth: 1, borderColor: "#E7E9EC" },
  activityCopy: { flex: 1 },
  activityTitle: { color: "#10243E", fontSize: 14, fontWeight: "800" },
  activityDate: { color: "#657488", fontSize: 11, marginTop: 3 },
  empty: { backgroundColor: "#FFFFFF", borderRadius: 21, padding: 22, borderWidth: 1, borderColor: "#E7E9EC", marginTop: 28, alignItems: "center" },
  emptyTitle: { color: "#10243E", fontSize: 18, fontWeight: "800", textAlign: "center" },
  emptyText: { color: "#5C6B7D", fontSize: 14, lineHeight: 20, textAlign: "center", marginTop: 7 },
  emptyButton: { alignSelf: "stretch", marginTop: 17 },
  footer: { textAlign: "center", paddingTop: 18 },
  pressed: { opacity: 0.7 },
});
