import { type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { haptic } from "@/lib/haptics";

export function AppButton({ label, onPress, variant = "primary", disabled = false, style }: { label: string; onPress: () => void; variant?: "primary" | "secondary" | "dark" | "danger"; disabled?: boolean; style?: StyleProp<ViewStyle> }) {
  const palette = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    dark: styles.darkButton,
    danger: styles.dangerButton,
  }[variant];
  const labelStyle = variant === "secondary" ? styles.secondaryLabel : styles.primaryLabel;

  return (
    <Pressable
      disabled={disabled}
      onPress={() => { haptic.light(); onPress(); }}
      style={({ pressed }) => [styles.button, palette, style, (pressed || disabled) && styles.buttonPressed]}
    >
      <Text style={labelStyle}>{label}</Text>
    </Pressable>
  );
}

export function Pill({ label, tone = "teal" }: { label: string; tone?: "teal" | "navy" | "coral" | "gray" }) {
  const toneStyle = { teal: styles.pillTeal, navy: styles.pillNavy, coral: styles.pillCoral, gray: styles.pillGray }[tone];
  const labelStyle = tone === "gray" ? styles.pillDarkLabel : styles.pillLightLabel;
  return <View style={[styles.pill, toneStyle]}><Text style={labelStyle}>{label}</Text></View>;
}

export function SectionHeading({ title, action }: { title: string; action?: ReactNode }) {
  return <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>{title}</Text>{action}</View>;
}

export function ProgressBar({ value, color = "#007C78" }: { value: number; color?: string }) {
  return <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: color }]} /></View>;
}

export const ui = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F6F2" },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  eyebrow: { color: "#007C78", fontSize: 12, fontWeight: "800", letterSpacing: 1.1, textTransform: "uppercase" },
  title: { color: "#10243E", fontSize: 32, lineHeight: 38, fontWeight: "800", letterSpacing: -0.8 },
  subtitle: { color: "#5C6B7D", fontSize: 15, lineHeight: 22 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 18, borderWidth: 1, borderColor: "#E7E9EC" },
  cardTitle: { color: "#10243E", fontSize: 17, lineHeight: 22, fontWeight: "800" },
  cardBody: { color: "#5C6B7D", fontSize: 14, lineHeight: 20 },
  metricLabel: { color: "#657488", fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.7 },
  metricValue: { color: "#10243E", fontSize: 25, fontWeight: "800", letterSpacing: -0.7 },
  divider: { height: 1, backgroundColor: "#E7E9EC" },
  disclaimer: { color: "#5C6B7D", fontSize: 12, lineHeight: 17 },
  linkText: { color: "#007C78", fontSize: 14, fontWeight: "800" },
});

const styles = StyleSheet.create({
  button: { minHeight: 50, borderRadius: 15, alignItems: "center", justifyContent: "center", paddingHorizontal: 18 },
  primaryButton: { backgroundColor: "#007C78" },
  secondaryButton: { backgroundColor: "#E8F2F1", borderWidth: 1, borderColor: "#B7D8D5" },
  darkButton: { backgroundColor: "#10243E" },
  dangerButton: { backgroundColor: "#D9544D" },
  primaryLabel: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  secondaryLabel: { color: "#006663", fontSize: 15, fontWeight: "800" },
  buttonPressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  pill: { alignSelf: "flex-start", paddingVertical: 5, paddingHorizontal: 9, borderRadius: 999 },
  pillTeal: { backgroundColor: "#D9EFED" },
  pillNavy: { backgroundColor: "#DDE6F1" },
  pillCoral: { backgroundColor: "#FBE0DE" },
  pillGray: { backgroundColor: "#EEF0F2" },
  pillLightLabel: { fontSize: 11, fontWeight: "800", color: "#10243E" },
  pillDarkLabel: { fontSize: 11, fontWeight: "800", color: "#526276" },
  sectionHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  sectionTitle: { color: "#10243E", fontSize: 20, fontWeight: "800", letterSpacing: -0.25 },
  progressTrack: { height: 7, borderRadius: 99, backgroundColor: "#E1E7E7", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 99 },
});
