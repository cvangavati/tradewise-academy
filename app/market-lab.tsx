import { router } from "expo-router";
import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useMemo, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { SyntheticScenarioChart } from "@/components/synthetic-scenario-chart";
import { AppButton, Pill, SectionHeading, ui } from "@/components/tradewise-ui";
import { marketLabDisclosure, syntheticScenarios, type SyntheticScenario } from "@/data/market-lab";
import { haptic } from "@/lib/haptics";
import { useTradeWise, type Activity, type TradeReflection } from "@/lib/tradewise-store";

function money(value: number) { return value.toLocaleString("en-US", { style: "currency", currency: "USD" }); }

export default function MarketLabScreen() {
  const [scenarioId, setScenarioId] = useState(syntheticScenarios[0].id);
  const [quantity, setQuantity] = useState("1");
  const [lastActivityId, setLastActivityId] = useState<string | null>(null);
  const { placeOrder, cash, activities, reflections, addReflection } = useTradeWise();
  const scenario = useMemo(() => syntheticScenarios.find((item) => item.id === scenarioId) ?? syntheticScenarios[0], [scenarioId]);
  const price = scenario.prices[scenario.prices.length - 1];
  const move = ((price - scenario.prices[0]) / scenario.prices[0]) * 100;
  const reflectionActivity = (lastActivityId ? activities.find((activity) => activity.id === lastActivityId) : undefined) ?? activities.find((activity) => activity.scenarioId === scenario.id);
  const existingReflection = reflectionActivity ? reflections.find((reflection) => reflection.activityId === reflectionActivity.id) : undefined;

  function submitOrder(action: "BUY" | "SELL") {
    const result = placeOrder(action, scenario.symbol, Number(quantity));
    if (result.ok) { haptic.success(); setLastActivityId(result.activityId ?? null); Alert.alert("Synthetic order recorded", `${result.message} Capture a short reflection below while the scenario is fresh.`); }
    else { haptic.error(); Alert.alert("Check your order", result.message); }
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={styles.backText}>‹  Practice</Text></Pressable><Text style={ui.eyebrow}>Scenario simulator</Text><Text style={ui.title}>Market Lab</Text><Text style={ui.subtitle}>Explore hand-authored market regimes that resemble common trend conditions—without live, historical, or forecast market data.</Text><Text style={styles.selectorLabel}>SELECT A SCENARIO</Text></View>
        <FlatList horizontal data={syntheticScenarios} keyExtractor={(item) => item.id} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scenarioList} renderItem={({ item }) => <ScenarioChip scenario={item} active={item.id === scenario.id} onPress={() => { haptic.selection(); setLastActivityId(null); setScenarioId(item.id); }} />} />
        <LabContent scenario={scenario} price={price} move={move} quantity={quantity} setQuantity={setQuantity} cash={cash} onBuy={() => submitOrder("BUY")} onSell={() => submitOrder("SELL")} activity={reflectionActivity} existingReflection={existingReflection} onSaveReflection={(reflection) => { addReflection(reflection); haptic.success(); Alert.alert("Reflection saved", "Your local journal entry is attached to this simulated trade."); }} />
      </ScrollView>
    </ScreenContainer>
  );
}

function ScenarioChip({ scenario, active, onPress }: { scenario: SyntheticScenario; active: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.scenarioChip, active && styles.scenarioChipActive, pressed && styles.pressed]}><View style={[styles.dot, { backgroundColor: scenario.color }]} /><Text style={[styles.scenarioName, active && styles.scenarioNameActive]}>{scenario.title}</Text></Pressable>;
}

function LabContent({ scenario, price, move, quantity, setQuantity, cash, onBuy, onSell, activity, existingReflection, onSaveReflection }: { scenario: SyntheticScenario; price: number; move: number; quantity: string; setQuantity: (value: string) => void; cash: number; onBuy: () => void; onSell: () => void; activity?: Activity; existingReflection?: TradeReflection; onSaveReflection: (reflection: Omit<TradeReflection, "id" | "createdAt">) => void }) {
  return <View style={styles.labContent}><View style={styles.labCard}><View style={styles.labTop}><View><Pill label={scenario.regime} tone="navy" /><Text style={styles.symbol}>{scenario.symbol}</Text></View><View style={styles.alignEnd}><Text style={styles.price}>{money(price)}</Text><Text style={[styles.move, move >= 0 ? styles.positive : styles.negative]}>{move >= 0 ? "+" : ""}{move.toFixed(1)}% synthetic path</Text></View></View><SyntheticScenarioChart prices={scenario.prices} volumes={scenario.volumes} color={scenario.color} /><Text style={styles.description}>{scenario.description}</Text></View><View style={styles.eventCard}><Text style={styles.eventLabel}>SIMULATED CONTEXT CARD</Text><Text style={styles.eventText}>{scenario.event}</Text><Text style={styles.eventLesson}>Study focus: {scenario.lesson}</Text></View><View style={styles.planCard}><SectionHeading title="Practice a plan" /><Text style={styles.planText}>Name your entry condition, invalidation point, and planned size before tapping the trade ticket. The purpose is rehearsal—not prediction.</Text><Text style={styles.fieldLabel}>WHOLE SHARES</Text><TextInput value={quantity} onChangeText={setQuantity} keyboardType="number-pad" returnKeyType="done" placeholder="1" placeholderTextColor="#8B98A6" style={styles.input} /><View style={styles.notional}><Text style={styles.notionalLabel}>Synthetic notional</Text><Text style={styles.notionalValue}>{money(price * (Number(quantity) || 0))}</Text></View><View style={styles.actions}><AppButton label="Buy simulated" onPress={onBuy} style={styles.flexButton} /><AppButton label="Sell simulated" variant="secondary" onPress={onSell} style={styles.flexButton} /></View><Text style={styles.cashNote}>Cash-only practice account: {money(cash)} buying power. This lab does not support margin or short selling.</Text></View><ReflectionPanel activity={activity} scenario={scenario} existingReflection={existingReflection} onSave={onSaveReflection} /><Text style={[ui.disclaimer, styles.disclosure]}>{marketLabDisclosure}</Text></View>;
}

function ReflectionPanel({ activity, scenario, existingReflection, onSave }: { activity?: Activity; scenario: SyntheticScenario; existingReflection?: TradeReflection; onSave: (reflection: Omit<TradeReflection, "id" | "createdAt">) => void }) {
  const [thesis, setThesis] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [emotion, setEmotion] = useState("");
  const [lesson, setLesson] = useState("");
  if (!activity) return <View style={styles.journalMuted}><Text style={styles.journalMutedTitle}>Trade reflection unlocks after a simulated order.</Text><Text style={styles.journalMutedText}>Use a cash-only scenario ticket above, then record what you planned, what you noticed, and what you would improve.</Text></View>;
  if (existingReflection) return <View style={styles.journalSaved}><Text style={styles.eventLabel}>REFLECTION SAVED</Text><Text style={styles.journalSavedTitle}>{activity.action} {activity.quantity} {activity.symbol} at {money(activity.price)}</Text><Text style={styles.journalSavedBody}>{existingReflection.lesson}</Text></View>;
  return <View style={styles.journal}><SectionHeading title="Post-trade reflection" /><Text style={styles.journalIntro}>Review the simulated {activity.action.toLowerCase()} of {activity.quantity} {activity.symbol} at {money(activity.price)}. Record process evidence, not a verdict on yourself.</Text><Text style={styles.fieldLabel}>THESIS / WHAT I EXPECTED</Text><TextInput value={thesis} onChangeText={setThesis} multiline placeholder="What setup or evidence did you see?" placeholderTextColor="#8B98A6" style={[styles.input, styles.textArea]} /><Text style={styles.fieldLabel}>DISCIPLINE / PLAN FOLLOWED</Text><TextInput value={discipline} onChangeText={setDiscipline} multiline placeholder="Did your size and invalidation match the plan?" placeholderTextColor="#8B98A6" style={[styles.input, styles.textArea]} /><Text style={styles.fieldLabel}>EMOTION / ATTENTION</Text><TextInput value={emotion} onChangeText={setEmotion} placeholder="Calm, rushed, uncertain…" placeholderTextColor="#8B98A6" style={styles.input} /><Text style={styles.fieldLabel}>ONE PROCESS IMPROVEMENT</Text><TextInput value={lesson} onChangeText={setLesson} multiline placeholder="What will you do differently next time?" placeholderTextColor="#8B98A6" style={[styles.input, styles.textArea]} /><AppButton label="Save local reflection" disabled={!thesis.trim() || !lesson.trim()} onPress={() => onSave({ activityId: activity.id, scenarioId: scenario.id, thesis: thesis.trim(), discipline: discipline.trim(), emotion: emotion.trim(), lesson: lesson.trim() })} /></View>;
}

const styles = StyleSheet.create({
  screenContent: { paddingBottom: 32 },
  header: { paddingTop: 4, paddingHorizontal: 20, gap: 8 },
  back: { alignSelf: "flex-start", paddingVertical: 10, paddingRight: 14, marginBottom: 2 },
  backText: { color: "#007C78", fontSize: 15, fontWeight: "800" },
  selectorLabel: { color: "#657488", fontSize: 10, letterSpacing: 0.8, fontWeight: "800", marginTop: 10 },
  scenarioList: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10, gap: 8 },
  scenarioChip: { height: 42, paddingHorizontal: 13, borderRadius: 999, borderWidth: 1, borderColor: "#D9E1E6", backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", gap: 7 },
  scenarioChipActive: { borderColor: "#10243E", backgroundColor: "#10243E" },
  dot: { width: 8, height: 8, borderRadius: 4 },
  scenarioName: { color: "#526276", fontSize: 12, fontWeight: "800" },
  scenarioNameActive: { color: "#FFFFFF" },
  labContent: { paddingHorizontal: 20, paddingTop: 10 },
  labCard: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 17, borderWidth: 1, borderColor: "#E4E9ED", gap: 14 },
  labTop: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  symbol: { color: "#10243E", fontSize: 26, fontWeight: "800", letterSpacing: -0.3, marginTop: 8 },
  alignEnd: { alignItems: "flex-end", justifyContent: "flex-end" },
  price: { color: "#10243E", fontSize: 19, fontWeight: "800" },
  move: { fontSize: 11, fontWeight: "800", marginTop: 3 },
  positive: { color: "#15803D" },
  negative: { color: "#D9544D" },
  description: { color: "#526276", fontSize: 13, lineHeight: 20 },
  eventCard: { backgroundColor: "#E9F1F8", borderRadius: 19, padding: 16, marginTop: 14, gap: 5 },
  eventLabel: { color: "#4666B0", fontSize: 10, letterSpacing: 0.8, fontWeight: "800" },
  eventText: { color: "#29465E", fontSize: 14, lineHeight: 20, fontWeight: "700" },
  eventLesson: { color: "#526276", fontSize: 12, marginTop: 3 },
  planCard: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 17, borderWidth: 1, borderColor: "#E4E9ED", marginTop: 14, gap: 11 },
  planText: { color: "#526276", fontSize: 13, lineHeight: 20, marginTop: -2 },
  fieldLabel: { color: "#657488", fontSize: 10, letterSpacing: 0.8, fontWeight: "800", marginTop: 3 },
  input: { height: 47, borderRadius: 12, backgroundColor: "#FCFDFC", borderWidth: 1, borderColor: "#CDD7E0", paddingHorizontal: 14, color: "#10243E", fontSize: 16, fontWeight: "700" },
  notional: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  notionalLabel: { color: "#657488", fontSize: 12 },
  notionalValue: { color: "#10243E", fontSize: 15, fontWeight: "800" },
  actions: { flexDirection: "row", gap: 10 },
  flexButton: { flex: 1, minHeight: 46, paddingHorizontal: 10 },
  cashNote: { color: "#657488", fontSize: 11, lineHeight: 16 },
  journal: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 17, borderWidth: 1, borderColor: "#E4E9ED", marginTop: 14, gap: 10 },
  journalIntro: { color: "#526276", fontSize: 13, lineHeight: 20, marginTop: -2 },
  textArea: { minHeight: 76, paddingTop: 12, textAlignVertical: "top" },
  journalMuted: { backgroundColor: "#F1F4F6", borderRadius: 20, padding: 17, marginTop: 14, gap: 5 },
  journalMutedTitle: { color: "#354A61", fontSize: 15, fontWeight: "800" },
  journalMutedText: { color: "#657488", fontSize: 12, lineHeight: 18 },
  journalSaved: { backgroundColor: "#E8F5EB", borderRadius: 20, padding: 17, marginTop: 14, gap: 5 },
  journalSavedTitle: { color: "#176E3A", fontSize: 14, fontWeight: "800" },
  journalSavedBody: { color: "#3C6850", fontSize: 13, lineHeight: 19 },
  disclosure: { textAlign: "center", marginTop: 17 },
  pressed: { opacity: 0.7 },
});
