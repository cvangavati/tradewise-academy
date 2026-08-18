import { router } from "expo-router";
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { AppButton, Pill, SectionHeading, ui } from "@/components/tradewise-ui";
import { practiceChallenges, simulatedWatchlist, type WatchlistItem } from "@/data/practice";
import { haptic } from "@/lib/haptics";
import { useTradeWise } from "@/lib/tradewise-store";

function money(value: number) { return value.toLocaleString("en-US", { style: "currency", currency: "USD" }); }

export default function PracticeScreen() {
  const [selectedSymbol, setSelectedSymbol] = useState(simulatedWatchlist[0].symbol);
  const [quantity, setQuantity] = useState("1");
  const [challengeChoice, setChallengeChoice] = useState<number | null>(null);
  const { placeOrder, cash, portfolioValue, completedCount } = useTradeWise();
  const selected = simulatedWatchlist.find((quote) => quote.symbol === selectedSymbol) ?? simulatedWatchlist[0];
  const challenge = practiceChallenges[completedCount % practiceChallenges.length];

  function submitOrder(action: "BUY" | "SELL") {
    const result = placeOrder(action, selected.symbol, Number(quantity));
    if (result.ok) {
      haptic.success();
      Alert.alert("Paper order recorded", result.message);
    } else {
      haptic.error();
      Alert.alert("Check your order", result.message);
    }
  }

  return (
    <ScreenContainer>
      <FlatList
        data={simulatedWatchlist}
        keyExtractor={(item) => item.symbol}
        contentContainerStyle={ui.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={ui.eyebrow}>Simulation laboratory</Text>
            <Text style={ui.title}>Practice the decision.</Text>
            <Text style={[ui.subtitle, styles.subtitle]}>Use simplified, illustrative quotes to rehearse sizing and order mechanics before real capital is ever involved.</Text>

            <View style={styles.accountStrip}><View><Text style={styles.accountLabel}>SIMULATED PORTFOLIO</Text><Text style={styles.accountValue}>{money(portfolioValue)}</Text></View><Pressable onPress={() => router.push("/portfolio" as never)} style={({ pressed }) => [styles.accountLink, pressed && styles.pressed]}><Text style={styles.accountLinkText}>View account →</Text></Pressable></View>

            <View style={styles.challenge}><View style={styles.challengeTop}><Pill label={challenge.tag} tone="navy" /><Text style={styles.challengeStep}>EXERCISE</Text></View><Text style={styles.challengeTitle}>{challenge.title}</Text><Text style={styles.challengePrompt}>{challenge.prompt}</Text><Text style={styles.challengeScenario}>{challenge.scenario}</Text><ChoiceRow index={0} label={challenge.choices[0]} selected={challengeChoice} setSelected={setChallengeChoice} answerIndex={challenge.answerIndex} /><ChoiceRow index={1} label={challenge.choices[1]} selected={challengeChoice} setSelected={setChallengeChoice} answerIndex={challenge.answerIndex} /><ChoiceRow index={2} label={challenge.choices[2]} selected={challengeChoice} setSelected={setChallengeChoice} answerIndex={challenge.answerIndex} /><ChoiceRow index={3} label={challenge.choices[3]} selected={challengeChoice} setSelected={setChallengeChoice} answerIndex={challenge.answerIndex} />{challengeChoice !== null && <Text style={[styles.feedback, challengeChoice === challenge.answerIndex ? styles.feedbackRight : styles.feedbackWrong]}>{challengeChoice === challenge.answerIndex ? "Good process. " : "Try again. "}{challenge.explanation}</Text>}</View>

            <SectionHeading title="Illustrative watchlist" />
          </View>
        }
        renderItem={({ item }) => <WatchlistRow item={item} active={selectedSymbol === item.symbol} onPress={() => { haptic.selection(); setSelectedSymbol(item.symbol); }} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={
          <View style={styles.ticketArea}>
            <SectionHeading title="Paper trade ticket" />
            <View style={styles.ticket}><View style={styles.ticketTop}><View><Text style={styles.selectedSymbol}>{selected.symbol}</Text><Text style={styles.selectedName}>{selected.name}</Text></View><View style={styles.priceAlign}><Text style={styles.selectedPrice}>{money(selected.price)}</Text><Text style={[styles.selectedMove, selected.change >= 0 ? styles.positive : styles.negative]}>{selected.change >= 0 ? "+" : ""}{selected.changePercent.toFixed(2)}%</Text></View></View><View style={styles.quoteRule} /><Text style={styles.fieldLabel}>WHOLE SHARES</Text><TextInput value={quantity} onChangeText={setQuantity} keyboardType="number-pad" returnKeyType="done" placeholder="1" placeholderTextColor="#9AA7B6" style={styles.input} /><View style={styles.estimate}><Text style={styles.estimateLabel}>Estimated notional</Text><Text style={styles.estimateValue}>{money(selected.price * (Number(quantity) || 0))}</Text></View><View style={styles.ticketActions}><AppButton label="Buy simulated" onPress={() => submitOrder("BUY")} style={styles.flexButton} /><AppButton label="Sell simulated" variant="secondary" onPress={() => submitOrder("SELL")} style={styles.flexButton} /></View><Text style={styles.ticketNote}>Buying power: {money(cash)}. The simulation allows only cash purchases and sales of positions you already hold—no margin or short selling.</Text></View>
            <Text style={[ui.disclaimer, styles.footer]}>Practice tools teach a decision framework. Quotes, fills, and results are illustrative and do not reflect live-market conditions.</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}

function ChoiceRow({ index, label, selected, setSelected, answerIndex }: { index: number; label: string; selected: number | null; setSelected: (index: number) => void; answerIndex: number }) {
  const selectedStyle = selected === index ? (index === answerIndex ? styles.choiceCorrect : styles.choiceSelected) : null;
  return <Pressable onPress={() => { haptic.selection(); setSelected(index); }} style={({ pressed }) => [styles.choice, selectedStyle, pressed && styles.pressed]}><View style={[styles.choiceLetter, selected === index && styles.choiceLetterActive]}><Text style={[styles.choiceLetterText, selected === index && styles.choiceLetterTextActive]}>{String.fromCharCode(65 + index)}</Text></View><Text style={styles.choiceText}>{label}</Text></Pressable>;
}

function WatchlistRow({ item, active, onPress }: { item: WatchlistItem; active: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.quoteCard, active && styles.quoteCardActive, pressed && styles.pressed]}><View style={styles.quoteLeft}><Text style={styles.quoteSymbol}>{item.symbol}</Text><Text style={styles.quoteName}>{item.name}</Text></View><View style={styles.priceAlign}><Text style={styles.quotePrice}>{money(item.price)}</Text><Text style={[styles.quoteMove, item.change >= 0 ? styles.positive : styles.negative]}>{item.change >= 0 ? "+" : ""}{item.changePercent.toFixed(2)}%</Text></View></Pressable>;
}

const styles = StyleSheet.create({
  header: { paddingTop: 12, gap: 9 },
  subtitle: { maxWidth: 365 },
  accountStrip: { backgroundColor: "#10243E", borderRadius: 18, padding: 16, marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  accountLabel: { color: "#BBD0E1", fontSize: 10, fontWeight: "800", letterSpacing: 0.8 },
  accountValue: { color: "#FFFFFF", fontSize: 22, fontWeight: "800", marginTop: 3 },
  accountLink: { paddingVertical: 8, paddingLeft: 10 },
  accountLinkText: { color: "#7EE3DB", fontSize: 13, fontWeight: "800" },
  challenge: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 18, borderWidth: 1, borderColor: "#E7E9EC", marginTop: 16, gap: 10 },
  challengeTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  challengeStep: { color: "#657488", fontSize: 10, fontWeight: "800", letterSpacing: 0.8 },
  challengeTitle: { color: "#10243E", fontSize: 19, fontWeight: "800", marginTop: 2 },
  challengePrompt: { color: "#354A61", fontSize: 14, lineHeight: 20 },
  challengeScenario: { color: "#657488", fontSize: 12, lineHeight: 17, fontStyle: "italic" },
  choice: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#E3E8ED", borderRadius: 13, padding: 11, gap: 10 },
  choiceSelected: { borderColor: "#007C78", backgroundColor: "#F2FBFA" },
  choiceCorrect: { borderColor: "#15803D", backgroundColor: "#F0F9F2" },
  choiceLetter: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#EEF1F4", alignItems: "center", justifyContent: "center" },
  choiceLetterActive: { backgroundColor: "#007C78" },
  choiceLetterText: { color: "#526276", fontSize: 11, fontWeight: "800" },
  choiceLetterTextActive: { color: "#FFFFFF" },
  choiceText: { color: "#354A61", fontSize: 13, lineHeight: 18, flex: 1, fontWeight: "600" },
  feedback: { fontSize: 12, lineHeight: 17, paddingTop: 2 },
  feedbackRight: { color: "#16713A" },
  feedbackWrong: { color: "#A44640" },
  quoteCard: { backgroundColor: "#FFFFFF", borderRadius: 17, padding: 15, borderWidth: 1, borderColor: "#E7E9EC", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  quoteCardActive: { borderColor: "#007C78", backgroundColor: "#F5FBFA" },
  quoteLeft: { gap: 3 },
  quoteSymbol: { color: "#10243E", fontSize: 16, fontWeight: "800" },
  quoteName: { color: "#657488", fontSize: 12 },
  priceAlign: { alignItems: "flex-end" },
  quotePrice: { color: "#10243E", fontSize: 15, fontWeight: "800" },
  quoteMove: { fontSize: 12, fontWeight: "800", marginTop: 2 },
  positive: { color: "#15803D" },
  negative: { color: "#D9544D" },
  ticketArea: { paddingTop: 28 },
  ticket: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 18, borderWidth: 1, borderColor: "#E7E9EC", gap: 11 },
  ticketTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  selectedSymbol: { color: "#10243E", fontSize: 20, fontWeight: "800" },
  selectedName: { color: "#657488", fontSize: 12, marginTop: 2 },
  selectedPrice: { color: "#10243E", fontSize: 18, fontWeight: "800" },
  selectedMove: { fontSize: 12, fontWeight: "800", marginTop: 2 },
  quoteRule: { height: 1, backgroundColor: "#E7E9EC", marginVertical: 1 },
  fieldLabel: { color: "#657488", fontSize: 10, fontWeight: "800", letterSpacing: 0.75 },
  input: { height: 48, borderWidth: 1, borderColor: "#CDD7E0", borderRadius: 12, color: "#10243E", fontSize: 16, fontWeight: "700", paddingHorizontal: 14, backgroundColor: "#FCFDFC" },
  estimate: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  estimateLabel: { color: "#657488", fontSize: 12 },
  estimateValue: { color: "#10243E", fontSize: 15, fontWeight: "800" },
  ticketActions: { flexDirection: "row", gap: 10, marginTop: 3 },
  flexButton: { flex: 1, minHeight: 46, paddingHorizontal: 10 },
  ticketNote: { color: "#657488", fontSize: 11, lineHeight: 16, marginTop: 2 },
  footer: { paddingTop: 18, textAlign: "center" },
  pressed: { opacity: 0.7 },
});
